import { STAGES, calendarLabel, imprint, living, nudgeBond } from './world.js'

export const PARTS = [
  {
    id: 1,
    title: '第一部 · 血色開端',
    english: 'THE FAMILY',
    theme: '立譜、報應、無法拒絕的道盟',
  },
  {
    id: 2,
    title: '第二部 · 雙生歲月',
    english: 'THE BETRAYAL',
    theme: '創業回憶與當下猜忌、兄弟反目',
  },
  {
    id: 3,
    title: '第三部 · 最後輓歌',
    english: 'THE RECKONING',
    theme: '想洗白飛升、與天庭交易、繼承人倒下',
  },
]

const STORAGE_KEY = 'qinglan-llm-config'
export const OPENROUTER_BASE = 'https://openrouter.ai/api/v1'
export const DEFAULT_MODEL = 'openrouter/free'
export const FREE_MODELS = [
  'openrouter/free',
  'minimax/minimax-m2.7:free',
  'z-ai/glm-5.2:free',
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
]

const LLM_COOLDOWN_MS = 120000

function blankConfig() {
  return {
    enabled: true,
    baseUrl: OPENROUTER_BASE,
    apiKey: '',
    model: DEFAULT_MODEL,
    illustrate: true,
    imageModel: 'google/gemini-2.5-flash-image',
  }
}

export function loadLlmConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const merged = { ...blankConfig(), ...saved }
    if (!merged.baseUrl || merged.baseUrl.includes('deepseek.com') || merged.baseUrl.includes('11434')) {
      merged.baseUrl = OPENROUTER_BASE
    }
    if (!merged.model || merged.model === 'deepseek-chat' || merged.model === 'llama3.1') {
      merged.model = DEFAULT_MODEL
    }
    if (!merged.imageModel) merged.imageModel = 'google/gemini-2.5-flash-image'
    if (merged.illustrate === undefined) merged.illustrate = true
    return merged
  } catch {
    return blankConfig()
  }
}

export function saveLlmConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    enabled: Boolean(config.enabled),
    baseUrl: String(config.baseUrl || OPENROUTER_BASE).trim() || OPENROUTER_BASE,
    apiKey: String(config.apiKey || '').trim(),
    model: String(config.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL,
    illustrate: config.illustrate !== false,
    imageModel: String(config.imageModel || 'google/gemini-2.5-flash-image').trim()
      || 'google/gemini-2.5-flash-image',
  }))
}

export function llmReady(config = loadLlmConfig()) {
  if (!config.enabled || !config.baseUrl) return false
  if (/127\.0\.0\.1|localhost/i.test(config.baseUrl)) return true
  return Boolean(config.apiKey)
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function cast(world) {
  const people = living(world)
  const don = people.find((p) => p.role === 'patriarch') || people[0]
  const consiglieri = people.find((p) => p.role === 'elder') || people[1] || don
  const others = people.filter((p) => p.id !== don.id)
  const kay = others.find((p) => p.nature.id === 'passion') || others[0] || don
  const fredo = [...others].sort((a, b) => (a.bonds[don.id] || 0) - (b.bonds[don.id] || 0))[0] || kay
  const soldier = others.find((p) => p.nature.id === 'pride' || p.nature.id === 'ambitious') || others.at(-1) || don
  const child = [...others].sort((a, b) => a.age - b.age)[0] || kay
  return { don, consiglieri, kay, fredo, soldier, child, people }
}

function snapshot(world, part) {
  const { don, people } = cast(world)
  const roster = people.map((p) => (
    `${p.name}（${STAGES[p.realm]}／${p.root.name}／${p.nature.name}／正在${p.action}／${p.thought}）`
  )).join('\n')
  return {
    calendar: calendarLabel(world),
    part: PARTS[part - 1],
    qi: Math.round(world.qi),
    karma: Math.round(world.karma),
    don: don?.name,
    roster,
  }
}

function wrapScene(part, title, slug, narration, line, extra = {}) {
  return { part, title, slug, narration, line, ...extra }
}

function studioScene(world, part, beat) {
  const { don, consiglieri, kay, fredo, soldier, child } = cast(world)
  const acts = {
    1: [
      () => wrapScene(1, '立譜宴', 'INT. 山門大殿 · 夜',
        `燈火把教父門匾照得像一口金棺。四方來客低頭敬酒，沒有人敢問靈石從哪來。${kay.name}立在廊柱後，看${don.name}接過一封染血的拜帖。`,
        `${don.name}：今晚是喜事。喜事過了，帳才開始算。`,
        { speaker: don.name, mood: 4, bond: [don.name, kay.name, 6] }),
      () => wrapScene(1, '無法拒絕', 'INT. 密室 · 子時',
        `${consiglieri.name}把盟書推過桌面。對方的手在抖。窗外有人練劍，劍聲整齊得像送葬。`,
        `${don.name}：我給你一個無法拒絕的道盟。簽，你還是青嵐的客；不簽，你就是後山的土。`,
        { speaker: don.name, karma: 1 }),
      () => wrapScene(1, '枕邊警告', 'EXT. 丹房 · 黎明',
        `爐蓋揭開，裡面不是丹，是一顆還帶溫的妖獸頭顱。${soldier.name}後退半步，第一次明白「客氣」在這座山裡怎麼寫。`,
        `${consiglieri.name}：下次，我們會讓他親自來看。`,
        { speaker: consiglieri.name, mood: -8 }),
      () => wrapScene(1, '沉潭', 'EXT. 蒼梧深潭 · 霧',
        `有人說仇家去雲遊了。潭面只冒一個氣泡。${fredo.name}把石子扔進去，數到三，不敢數到四。`,
        `${fredo.name}：他會回來的吧？`,
        { speaker: fredo.name, bond: [fredo.name, don.name, -8] }),
      () => wrapScene(1, '第一次開火', 'EXT. 山門石階 · 雨',
        `雨把血跡洗淡，洗不淡規矩。${soldier.name}把劍收回鞘，手卻停在鞘口。`,
        `${don.name}：這不是殺戮。這是讓世界重新學會害怕我們的姓。`,
        { speaker: don.name, karma: -2 }),
      () => wrapScene(1, '西西里式流放', 'EXT. 後山密林 · 日',
        `${kay.name}被送去「避災」。林子很靜，靜得像有人被全世界原諒了，只除了自己。`,
        `${kay.name}：你護我，是因為愛，還是因為我看見了不該看見的？`,
        { speaker: kay.name, mood: -12 }),
      () => wrapScene(1, '渡劫蒙太奇', 'INT. 靈樞 · 同時',
        `${don.name}在靈樞閉目渡劫，山門外三路仇家同時倒下。鐘響一聲，兩種儀式重疊成一種。`,
        `${consiglieri.name}：今日他成親於天，也成親於血。`,
        { speaker: consiglieri.name, karma: -3 }),
      () => wrapScene(1, '關門', 'INT. 寢殿 · 夜',
        `${kay.name}問他今晚殺了誰。${don.name}不答。門在她面前合上，留下一道金縫，像未癒的傷口。`,
        `${don.name}：家族的事，到此為止。`,
        { speaker: don.name, bond: [don.name, kay.name, -14] }),
    ],
    2: [
      () => wrapScene(2, '雙線', 'INT. 藏經閣 / EXT. 舊碼頭 · 交切',
        `一邊是少年${don.name}在碼頭偷渡靈苗，一邊是今日的他聽密報。兩張臉疊在一起，誰都不比誰乾淨。`,
        `${don.name}：我不是變了。是世界終於追上我。`,
        { speaker: don.name }),
      () => wrapScene(2, '庭訊', 'INT. 山門議事 · 日',
        `外門長老像審官。問題不是「有沒有做」，是「能不能證明我們沒做」。${consiglieri.name}把偽證與丹方一併推過去。`,
        `${consiglieri.name}：真相是奢侈品。我們只賣能活下去的版本。`,
        { speaker: consiglieri.name }),
      () => wrapScene(2, '我知道是你', 'INT. 湖心亭 · 冬',
        `${fredo.name}的笑先碎。湖面結冰，冰下還有去年沉下去的名字。`,
        `${don.name}：我知道是你。你是我的血，所以你會死得比外人慢一點。`,
        { speaker: don.name, bond: [don.name, fredo.name, -40], mood: -20 }),
      () => wrapScene(2, '孤島', 'EXT. 山巔 · 雪',
        `權勢把人抬到沒有平輩的高度。${child.name}來送衣，不敢靠太近。`,
        `${don.name}：坐下。不，站著。我需要有人提醒我還能被靠近。`,
        { speaker: don.name, mood: -6 }),
      () => wrapScene(2, '舊神的賭局', 'INT. 雲市密室 · 夜',
        `有人允諾海外靈礦、朝廷文書、長生契約。條件只有一個：交出一個弟弟。`,
        `${soldier.name}：這買賣太乾淨，乾淨得像陷阱。`,
        { speaker: soldier.name, karma: 2 }),
      () => wrapScene(2, '吻別', 'EXT. 碼頭 · 黎明',
        `${fredo.name}上了船。船沒開。岸上有人已把劍出了半寸。`,
        `${fredo.name}：哥，我只是想被看見。`,
        { speaker: fredo.name }),
    ],
    3: [
      () => wrapScene(3, '想洗手', 'INT. 靈樞 · 晨',
        `${don.name}說要飛升、要合法、要把青嵐還給天道。桌上放著三份還沒撕的血契。`,
        `${don.name}：我只想做個普通的長生者。這句話本身，已經像笑話。`,
        { speaker: don.name }),
      () => wrapScene(3, '天庭 Immobiliare', 'INT. 虛空廊橋 · 金光',
        `天庭要靈石，要門生，要他用俗世的罪去換天上的席。${consiglieri.name}算到第三筆，停筆。`,
        `${consiglieri.name}：飛升不是解脫。是換一家更大的家族。`,
        { speaker: consiglieri.name, karma: -4 }),
      () => wrapScene(3, '繼承人', 'EXT. 演武場 · 黃昏',
        `${soldier.name}太像年輕的他。這讓他安心，也讓他厭惡。`,
        `${don.name}：你不要學我。你要學我活下來的那一部分——如果還有的話。`,
        { speaker: don.name, bond: [don.name, soldier.name, 10] }),
      () => wrapScene(3, '臺階', 'EXT. 山門石階 · 夜宴散場',
        `流矢不知從哪來。${child.name}倒下時還笑著，以為是煙花。橙從${don.name}袖中滑落，滾過血。`,
        `${don.name}：不。換我。`,
        { speaker: don.name, mood: -30, karma: -6 }),
      () => wrapScene(3, '空椅', 'EXT. 庭園 · 秋',
        `很久以後，有人在椅上看見他。風吹過，像一句沒說完的對不起。家族還在，故事已經死了。`,
        `${kay.name}（旁白）：他贏了所有該贏的，只輸掉坐在他身邊的人。`,
        { speaker: kay.name }),
    ],
  }
  const pool = acts[part]
  return pool[beat % pool.length]()
}

function parseModelText(text) {
  const trimmed = String(text || '').trim()
  const jsonMatch = trimmed.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      const data = JSON.parse(jsonMatch[0])
      if (data.narration || data.line || data.title) {
        return {
          title: data.title || '未名場次',
          slug: data.slug || 'INT. 教父世家 · 夜',
          narration: data.narration || '',
          line: data.line || '',
          speaker: data.speaker || '',
        }
      }
    } catch {
      /* fall through */
    }
  }
  const [first, ...rest] = trimmed.split('\n').map((line) => line.trim()).filter(Boolean)
  return {
    title: first?.slice(0, 12) || '連載場次',
    slug: 'INT. 教父世家 · 連續',
    narration: rest.join('') || trimmed,
    line: '',
    speaker: '',
  }
}

async function requestLlm(config, world, part, previousTitles) {
  const base = config.baseUrl.replace(/\/$/, '')
  const url = `${base}/chat/completions`
  const shot = snapshot(world, part)
  const body = {
    model: config.model || DEFAULT_MODEL,
    temperature: 0.95,
    max_tokens: 420,
    messages: [
      {
        role: 'system',
        content: [
          '你是電影編劇，要把「教父世家」寫成向《教父》三部曲致敬的修仙家族史詩。',
          '風格：克制、陰冷、家庭倫理與權力並置；旁白像Coppola鏡頭，對白短而重。',
          '禁止直接抄襲電影原句。用修仙意象改寫：道盟、靈石、天劫、渡劫、飛升、血契、橙（死亡預兆）。',
          '只輸出 JSON：{"title","slug","narration","line","speaker"}',
          'narration 70-120字，line 一句對白。speaker 必須是在場族人真名。',
        ].join('\n'),
      },
      {
        role: 'user',
        content: [
          `當前部：${shot.part.title}（${shot.part.theme}）`,
          `時間：${shot.calendar}`,
          `家主：${shot.don}；靈氣${shot.qi}；氣運${shot.karma}`,
          `已寫過的場次標題（勿重複）：${previousTitles.join('、') || '無'}`,
          '在場人物：',
          shot.roster,
          '請寫下一場，必須推進情節，不要總結主題。',
        ].join('\n'),
      },
    ],
  }
  const headers = { 'Content-Type': 'application/json' }
  if (config.apiKey) headers.Authorization = `Bearer ${config.apiKey}`
  if (/openrouter\.ai/i.test(base)) {
    headers['HTTP-Referer'] = window.location.origin || 'https://yip-lgtm.github.io'
    headers['X-Title'] = 'Godfather Clan'
  }
  const ctrl = new AbortController()
  const timer = window.setTimeout(() => ctrl.abort(), 20000)
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
    const text = json.choices?.[0]?.message?.content || json.content || ''
    if (!text) throw new Error('模型沒有寫出內容')
    return parseModelText(text)
  } finally {
    window.clearTimeout(timer)
  }
}

function applyToWorld(world, scene) {
  if (scene.speaker) imprint(world, scene.speaker, scene.line || scene.narration, scene.mood || 0)
  if (scene.bond) nudgeBond(world, scene.bond[0], scene.bond[1], scene.bond[2])
  if (scene.karma) world.karma = Math.max(0, Math.min(99, world.karma + scene.karma))
}

export function createDirector() {
  const state = {
    part: 1,
    beat: 0,
    months: 0,
    scenes: [],
    busy: false,
    source: 'studio',
    error: '',
    lastLlmAt: 0,
    config: loadLlmConfig(),
  }

  function advancePart(world) {
    const deaths = world.people.filter((p) => !p.alive).length
    if (state.part === 1 && (world.year - 146 >= 2 || deaths >= 1 || world.karma < 18)) state.part = 2
    if (state.part === 2 && (world.year - 146 >= 4 || deaths >= 2 || world.patriarchRealm >= 6)) state.part = 3
  }

  async function writeScene(world, forceLlm) {
    if (state.busy) return null
    advancePart(world)
    state.busy = true
    const titles = state.scenes.map((scene) => scene.title)
    let scene
    const cfg = state.config
    const prefer = Boolean(forceLlm)
    const cooled = Date.now() - state.lastLlmAt >= LLM_COOLDOWN_MS
    const canLlm = llmReady(cfg) && (prefer || cooled)
    if (canLlm) {
      try {
        const generated = await requestLlm(cfg, world, state.part, titles.slice(0, 8))
        scene = { ...generated, part: state.part, source: 'llm' }
        state.source = 'llm'
        state.error = ''
        state.lastLlmAt = Date.now()
      } catch (error) {
        state.error = error.message || 'LLM 失敗'
        state.lastLlmAt = Date.now()
        scene = { ...studioScene(world, state.part, state.beat), source: 'studio' }
        state.source = 'studio'
      }
    } else {
      scene = { ...studioScene(world, state.part, state.beat), source: 'studio' }
      state.source = 'studio'
    }
    scene.time = calendarLabel(world)
    scene.id = `${Date.now().toString(36)}-${state.beat}`
    scene.artStatus = 'idle'
    scene.artUrl = ''
    state.beat += 1
    state.scenes.unshift(scene)
    state.scenes = state.scenes.slice(0, 16)
    applyToWorld(world, scene)
    state.busy = false
    return scene
  }

  async function onMonth(world) {
    if (world.paused) return null
    state.months += 1
    if (state.months % 2 !== 0) return null
    return writeScene(world, false)
  }

  return {
    state,
    writeScene,
    onMonth,
    reloadConfig() {
      state.config = loadLlmConfig()
    },
  }
}
