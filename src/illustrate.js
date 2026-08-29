import { STAGES } from './world.js'
import { llmReady, loadLlmConfig } from './screenplay.js'

export const DEFAULT_IMAGE_MODEL = 'google/gemini-2.5-flash-image'
export const IMAGE_MODELS = [
  'google/gemini-2.5-flash-image',
  'google/gemini-3.1-flash-image-preview',
  'black-forest-labs/flux.2-flex',
  'openai/gpt-5-image-mini',
  'bytedance-seed/seedream-4.5',
]

const DB_NAME = 'qinglan-art'
const STORE = 'frames'
const MAX_FRAMES = 28
const STYLE = [
  'Cinematic still from a dark xianxia family epic: the Godfather Clan on Qinglan Mountain.',
  'Ink-wash painting with gold leaf, oil-lamp chiaroscuro, restrained Coppola lighting.',
  'Cultivation robes, mountain sect architecture, no modern objects.',
  'Absolutely no text, letters, watermarks, logos, captions, or UI.',
].join(' ')

const LOOKS = {
  青玄機: 'elderly Chinese cultivation patriarch, silver-white hair tied back, gold-trimmed black robes, severe calm face, late sixties',
  沈清梧: 'composed Chinese woman in her forties, dark hair in a bun, ink-blue robes, steady protective eyes',
  葉疏影: 'pale young Chinese woman, long black hair, cold precise gaze, grey-green robes, early twenties',
  白無塵: 'handsome wandering cultivator, white outer robe over travel-worn layers, unreadable smile, late twenties',
  蒼小魚: 'skinny teenage boy, slightly greedy eyes, stained alchemy-brown robes, always alert',
  嵐七七: 'small bright-eyed girl of sixteen, messy hair, pale cyan robes, curious and unafraid',
}

export function imageReady(config = loadLlmConfig()) {
  return llmReady(config) && config.illustrate !== false
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null)
      return
    }
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function idbGet(key) {
  try {
    const db = await openDb()
    if (!db) return null
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => reject(req.error)
    })
  } catch {
    return null
  }
}

async function idbSet(key, value) {
  try {
    const db = await openDb()
    if (!db) return
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      const store = tx.objectStore(STORE)
      store.put(value, key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
    const db2 = await openDb()
    if (!db2) return
    const keys = await new Promise((resolve, reject) => {
      const tx = db2.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).getAllKeys()
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => reject(req.error)
    })
    if (keys.length > MAX_FRAMES) {
      const extra = keys.slice(0, keys.length - MAX_FRAMES)
      const tx = db2.transaction(STORE, 'readwrite')
      extra.forEach((old) => tx.objectStore(STORE).delete(old))
    }
  } catch {
    /* cache is optional */
  }
}

export function toDataUrl(payload) {
  if (!payload) return ''
  if (typeof payload === 'string') {
    if (payload.startsWith('data:')) return payload
    if (payload.startsWith('http')) return payload
    return `data:image/png;base64,${payload}`
  }
  const b64 = payload.b64_json || payload.b64 || payload.base64
  const url = payload.url || payload.image_url?.url
  if (url) return url
  if (!b64) return ''
  const mime = payload.media_type || payload.mime_type || 'image/png'
  const raw = String(b64).replace(/^data:[^;]+;base64,/, '')
  return `data:${mime};base64,${raw}`
}

export function extractImage(json) {
  const fromData = json?.data?.[0]
  if (fromData) {
    const url = toDataUrl(fromData)
    if (url) return url
  }
  const message = json?.choices?.[0]?.message
  const images = message?.images
  if (Array.isArray(images) && images[0]) {
    const url = toDataUrl(images[0].image_url || images[0])
    if (url) return url
  }
  const content = message?.content
  if (Array.isArray(content)) {
    for (const part of content) {
      const url = toDataUrl(part.image_url || part.inline_data || part)
      if (url && url.startsWith('data:')) return url
    }
  }
  return ''
}

function openRouterHeaders(config) {
  const headers = { 'Content-Type': 'application/json' }
  if (config.apiKey) headers.Authorization = `Bearer ${config.apiKey}`
  if (/openrouter\.ai/i.test(config.baseUrl || '')) {
    headers['HTTP-Referer'] = window.location.origin || 'https://yip-lgtm.github.io'
    headers['X-Title'] = 'Godfather Clan'
  }
  return headers
}

async function postJson(url, headers, body, timeoutMs) {
  const ctrl = new AbortController()
  const timer = window.setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: ctrl.signal,
    })
    const json = await response.json().catch(() => ({}))
    if (!response.ok) {
      const detail = json.error?.message || json.message || json.error || `HTTP ${response.status}`
      throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail))
    }
    return json
  } finally {
    window.clearTimeout(timer)
  }
}

export async function requestImage(config, prompt, aspect = '16:9') {
  const base = String(config.baseUrl || '').replace(/\/$/, '')
  const model = config.imageModel || DEFAULT_IMAGE_MODEL
  const headers = openRouterHeaders(config)
  const errors = []

  try {
    const json = await postJson(`${base}/images`, headers, {
      model,
      prompt,
      n: 1,
      aspect_ratio: aspect,
    }, 75000)
    const url = extractImage(json)
    if (url) return url
    errors.push('Image API 沒有返回圖片')
  } catch (error) {
    errors.push(error.message || String(error))
  }

  try {
    const json = await postJson(`${base}/images/generations`, headers, {
      model,
      prompt,
      n: 1,
      size: aspect === '3:4' ? '768x1024' : '1024x576',
    }, 75000)
    const url = extractImage(json)
    if (url) return url
    errors.push('images/generations 沒有返回圖片')
  } catch (error) {
    errors.push(error.message || String(error))
  }

  try {
    const json = await postJson(`${base}/chat/completions`, headers, {
      model,
      modalities: ['image', 'text'],
      messages: [{ role: 'user', content: prompt }],
    }, 75000)
    const url = extractImage(json)
    if (url) return url
    errors.push('Chat 圖像接口沒有返回圖片')
  } catch (error) {
    errors.push(error.message || String(error))
  }

  throw new Error(errors[0] || '插畫生成失敗')
}

export function scenePrompt(scene) {
  return [
    STYLE,
    `Widescreen 16:9 narrative illustration.`,
    `Beat title in English sense only, do not paint the words: ${scene.title}.`,
    `Setting: ${scene.slug || 'Qinglan sect hall at night'}.`,
    `Action: ${scene.narration || ''}`,
    scene.line ? `Mood of the unspoken line: ${scene.line}` : '',
    'Show two or three cultivators in a gold-and-ink interior or mountain night, faces readable, family tension.',
  ].filter(Boolean).join('\n')
}

export function portraitPrompt(person) {
  const look = LOOKS[person.name] || [
    `Chinese cultivator, ${person.nature?.name || 'tempered'} temperament,`,
    `${person.root?.name || 'mixed'} spirit-root coloring in the wardrobe,`,
    `apparent age ${person.age}, realm presence of ${STAGES[person.realm] || 'Qi Refining'}.`,
  ].join(' ')
  const role = person.role === 'patriarch' ? 'sect patriarch' : person.role === 'elder' ? 'clan elder' : 'disciple'
  return [
    STYLE,
    'Vertical 3:4 character portrait, bust, eye-level, shallow depth of field.',
    `Subject is the ${role}: ${look}`,
    person.thought ? `Inner weather: ${person.thought}` : '',
    'Do not paint any name, seal text, or calligraphy that forms readable characters.',
  ].filter(Boolean).join('\n')
}

export function sceneKey(scene) {
  return `scene:${scene.id || scene.title}:${scene.slug || ''}`
}

export function portraitKey(person) {
  return `face:${person.id}:${person.realm}:${person.name}`
}

export function createIllustrator({ onUpdate } = {}) {
  const memory = new Map()
  const inflight = new Set()
  const queue = []
  let pumping = false
  let lastError = ''
  let busy = 0

  function notify() {
    onUpdate?.()
  }

  async function pump() {
    if (pumping) return
    pumping = true
    while (queue.length) {
      const job = queue.shift()
      busy += 1
      notify()
      try {
        const url = await requestImage(job.config, job.prompt, job.aspect)
        memory.set(job.key, url)
        await idbSet(job.key, url)
        job.apply(url)
        lastError = ''
      } catch (error) {
        lastError = error.message || '插畫失敗'
        job.fail?.(lastError)
      } finally {
        inflight.delete(job.key)
        busy = Math.max(0, busy - 1)
        notify()
      }
    }
    pumping = false
  }

  async function enqueue(job) {
    if (inflight.has(job.key) || memory.has(job.key)) return
    inflight.add(job.key)
    const cached = await idbGet(job.key)
    if (cached) {
      memory.set(job.key, cached)
      inflight.delete(job.key)
      job.apply(cached)
      notify()
      return
    }
    queue.push(job)
    pump()
  }

  return {
    get lastError() { return lastError },
    get busy() { return busy > 0 },
    cached(key) { return memory.get(key) || '' },
    paintScene(scene, config = loadLlmConfig()) {
      if (!scene || !imageReady(config)) return
      const key = sceneKey(scene)
      if (scene.artUrl) return
      scene.artStatus = 'pending'
      enqueue({
        key,
        config,
        aspect: '16:9',
        prompt: scenePrompt(scene),
        apply: (url) => {
          scene.artUrl = url
          scene.artStatus = 'ready'
        },
        fail: (message) => {
          scene.artStatus = 'error'
          scene.artError = message
        },
      })
    },
    paintPerson(person, config = loadLlmConfig()) {
      if (!person || !imageReady(config)) return
      const key = portraitKey(person)
      if (person.artUrl && person.artKey === key) return
      const hit = memory.get(key)
      if (hit) {
        person.artUrl = hit
        person.artKey = key
        person.artStatus = 'ready'
        return
      }
      person.artStatus = person.artStatus === 'ready' ? 'ready' : 'pending'
      enqueue({
        key,
        config,
        aspect: '3:4',
        prompt: portraitPrompt(person),
        apply: (url) => {
          person.artUrl = url
          person.artKey = key
          person.artStatus = 'ready'
        },
        fail: (message) => {
          person.artStatus = 'error'
          person.artError = message
        },
      })
    },
    retryScene(scene, config = loadLlmConfig()) {
      if (!scene) return
      memory.delete(sceneKey(scene))
      scene.artUrl = ''
      scene.artStatus = 'pending'
      this.paintScene(scene, config)
    },
  }
}
