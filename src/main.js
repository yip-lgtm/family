import './style.css'
import { createAudio } from './audio.js'
import { createVisualFx } from './fx.js'
import {
  ACTIONS,
  REGIONS,
  STAGES,
  TRAITS,
  assignAction,
  bless,
  bondLine,
  breakthroughCost,
  calendarLabel,
  clickYield,
  corrupt,
  createWorld,
  formatNumber,
  highestRealmName,
  living,
  patriarchBreakthrough,
  peopleIn,
  qiRate,
  recruitCost,
  recruitMember,
  selected,
  simulateMonth,
  tribulate,
  triggerOmen,
} from './world.js'
import { PARTS, createDirector, loadLlmConfig, saveLlmConfig, DEFAULT_MODEL, OPENROUTER_BASE, llmReady } from './screenplay.js'
import { DEFAULT_IMAGE_MODEL, createIllustrator, imageReady } from './illustrate.js'

const audio = createAudio()
const fx = createVisualFx()
const world = createWorld()
const director = createDirector()

const $ = (sel) => document.querySelector(sel)

document.querySelector('#app').innerHTML = `
  <div class="ambient" aria-hidden="true">
    <span class="mist mist-one"></span>
    <span class="mist mist-two"></span>
    <span class="star star-one"></span>
    <span class="star star-two"></span>
    <span class="star star-three"></span>
  </div>

  <div id="toast-region" class="toast-region" aria-live="polite"></div>

  <header class="topbar">
    <a class="brand" href="#" aria-label="教父世家首頁">
      <span class="brand-seal">父</span>
      <span class="brand-copy">
        <strong>教父世家</strong>
        <small>THE FAMILY</small>
      </span>
    </a>
    <div class="fate-chip-row" aria-label="天道總覽">
      <span class="fate-chip"><small>曆法</small><b id="calendar-label">—</b></span>
      <span class="fate-chip"><small>氣運</small><b id="karma-value">0</b></span>
      <span class="fate-chip"><small>人口</small><b id="member-value">0</b></span>
      <span class="fate-chip"><small>最高境界</small><b id="peak-realm">煉氣初期</b></span>
    </div>
    <div class="topbar-end">
      <button type="button" class="time-btn" id="pause-btn">⏸ 暫停</button>
      <button type="button" class="time-btn" id="speed-btn">×1</button>
      <button
        type="button"
        class="music-toggle"
        id="music-toggle"
        aria-pressed="false"
        title="播放 Bilibili《關注塔菲喵》循環歌單（絕世雙萌／永雛塔菲の小曲）"
      >
        🐱 關注塔菲喵
      </button>
    </div>
  </header>

  <main class="game-shell">
    <section class="hero-heading compact-hero">
      <div>
        <span class="eyebrow">蒼梧山 · 教父三部曲連載</span>
        <h1>家族史詩自動開拍，<em>權力、血債與輓歌</em></h1>
        <p>編劇按《教父》三部曲推進：立譜報應、兄弟反目、飛升輓歌。有 OpenRouter Key 就由模型寫場，並自動生成場次插畫與人物畫像；沒有則劇組代班，金漆牌坊照常開拍。</p>
      </div>
      <div class="fortune-mark" aria-label="家族氣運">
        <span>天道視角</span>
        <strong id="fortune-word">觀察</strong>
      </div>
    </section>

    <div class="dashboard-grid sim-grid">
      <aside class="left-column">
        <section class="panel stats-panel">
          <div class="panel-heading">
            <span>
              <small>CLAN VAULT</small>
              <h2>家族總覽</h2>
            </span>
            <span class="live-badge" id="pulse-badge">演化中</span>
          </div>
          <div class="stat-card qi-stat">
            <span class="stat-icon">氣</span>
            <div>
              <small>天地靈氣</small>
              <strong id="qi-value">0</strong>
              <span><b>↗</b> <span id="qi-rate">0</span> / 月</span>
            </div>
          </div>
          <div class="realm-block">
            <div class="realm-label">
              <span><small>老祖境界</small><strong id="realm-name">煉氣初期</strong></span>
              <span id="realm-progress-label">0 / 0</span>
            </div>
            <div class="progress-track"><span id="realm-progress"></span></div>
            <p>突破後可覺醒一項家族傳承，福澤所有自主修士</p>
          </div>
        </section>

        <section class="panel roster-panel">
          <div class="panel-heading">
            <span>
              <small>AVATARS</small>
              <h2>族人名冊</h2>
            </span>
            <span class="live-badge">群像</span>
          </div>
          <div id="roster-list" class="roster-list"></div>
        </section>

        <section class="panel actions-panel">
          <div class="section-title">
            <span>◈</span><h2>家族經營</h2><i></i>
          </div>
          <button id="recruit-button" class="game-button secondary-button" type="button">
            <span class="button-glyph">人</span>
            <span><strong>納入弟子</strong><small>隨機靈根與性格入譜</small></span>
            <span class="cost"><b id="recruit-cost">0</b><small>靈氣</small></span>
          </button>
          <button id="breakthrough-button" class="game-button gold-button" type="button">
            <span class="button-glyph">境</span>
            <span><strong>老祖突破</strong><small id="breakthrough-hint">衝擊下一境界</small></span>
            <span class="cost"><b id="breakthrough-cost">0</b><small>靈氣</small></span>
          </button>
        </section>
      </aside>

      <section class="cultivation-stage world-stage">
        <div class="stage-header">
          <span></span>
          <div><small>QINGLAN MOUNTAIN</small><h2>青嵐山門</h2></div>
          <span></span>
        </div>
        <div id="region-grid" class="region-grid"></div>
        <div class="nexus-wrap compact-nexus">
          <div class="orbit orbit-outer"><i></i><i></i><i></i></div>
          <div class="orbit orbit-inner"></div>
          <button id="gather-button" class="qi-orb" type="button" aria-label="閉關修煉，凝聚靈氣">
            <span class="orb-aura"></span>
            <span class="orb-rune">炁</span>
            <span class="orb-copy"><strong>閉關修煉</strong><small>GATHER QI</small></span>
          </button>
        </div>
        <p class="gather-message">點擊靈樞為天道庫藏凝聚 <strong id="click-yield">+10</strong> 靈氣</p>
      </section>

      <aside class="right-column">
        <section class="panel inspector-panel">
          <div class="panel-heading">
            <span>
              <small>CULTIVATOR</small>
              <h2>角色面板</h2>
            </span>
            <span class="dna-mark">視</span>
          </div>
          <div id="inspector" class="inspector"></div>
        </section>

        <section class="panel heritage-panel compact-heritage">
          <div class="panel-heading">
            <span>
              <small>FAMILY HERITAGE</small>
              <h2>家族傳承</h2>
            </span>
          </div>
          <div id="trait-list" class="trait-list"></div>
          <div id="empty-traits" class="empty-traits">
            <span class="empty-seal">承</span>
            <strong>傳承尚未覺醒</strong>
            <p>老祖突破時，從三項天賦中擇一。</p>
          </div>
        </section>

        <section class="panel screenplay-panel">
          <div class="panel-heading">
            <span>
              <small id="part-english">THE FAMILY</small>
              <h2 id="part-title">第一部 · 血色開端</h2>
            </span>
            <span class="live-badge" id="writer-badge">劇組代班</span>
          </div>
          <p class="part-theme" id="part-theme">立譜、報應、無法拒絕的道盟</p>
          <div class="screenplay-toolbar">
            <button type="button" class="time-btn" id="next-scene-btn">下一場</button>
            <button type="button" class="time-btn" id="llm-settings-btn">模型設定</button>
          </div>
          <div id="screenplay-list" class="screenplay-list"></div>
        </section>

        <section class="panel log-panel">
          <div class="log-heading">
            <span><i></i><strong>事件流</strong><small>WORLD CHRONICLE</small></span>
            <span class="log-live"><i></i> 湧現中</span>
          </div>
          <div id="log-list" class="log-list"></div>
        </section>
      </aside>
    </div>
  </main>

  <footer>
    <span>教父家訓</span>
    <p>修身 · 齊家 · 問道 · 長生</p>
    <span><a class="footer-bgm" href="https://www.bilibili.com/video/BV1kNEP6cEmu" target="_blank" rel="noreferrer">BGM 關注塔菲喵</a></span>
  </footer>

  <div id="trait-modal" class="modal-backdrop" aria-hidden="true">
    <div class="trait-modal" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title">
      <div class="modal-glow"></div>
      <span class="modal-seal">脈</span>
      <small>ANCESTRAL AWAKENING</small>
      <h2 id="trait-modal-title">血脈覺醒</h2>
      <p>老祖踏入新境，三道傳承顯現。<br />擇其一，福澤所有自行演化的族人。</p>
      <div id="trait-choices" class="trait-choices"></div>
      <span class="modal-footnote">此選擇將永久銘刻於族譜</span>
    </div>
  </div>

  <div id="llm-modal" class="modal-backdrop" aria-hidden="true">
    <div class="trait-modal llm-modal" role="dialog" aria-modal="true" aria-labelledby="llm-modal-title">
      <small>SCREENWRITER</small>
      <h2 id="llm-modal-title">OpenRouter 模型與插畫</h2>
      <p>預填 <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">OpenRouter</a> 接口。貼上 <code>sk-or-...</code> 後：編劇用免費文字路由連載，畫師用圖像模型自動出插畫。金鑰只存在你的瀏覽器。沒有金鑰則劇組代班，畫面維持金漆牌坊。</p>
      <form id="llm-form" class="llm-form">
        <label>接口 Base URL<input id="llm-base" value="https://openrouter.ai/api/v1" placeholder="https://openrouter.ai/api/v1" /></label>
        <label>文字模型
          <input id="llm-model" list="llm-free-models" value="openrouter/free" placeholder="openrouter/free" />
          <datalist id="llm-free-models">
            <option value="openrouter/free">openrouter/free 自動揀免費模型</option>
            <option value="minimax/minimax-m2.7:free"></option>
            <option value="z-ai/glm-5.2:free"></option>
            <option value="google/gemma-4-31b-it:free"></option>
            <option value="nvidia/nemotron-3-super-120b-a12b:free"></option>
          </datalist>
        </label>
        <label>插畫模型
          <input id="llm-image-model" list="llm-image-models" value="google/gemini-2.5-flash-image" placeholder="google/gemini-2.5-flash-image" />
          <datalist id="llm-image-models">
            <option value="google/gemini-2.5-flash-image">Nano Banana · 約數美分／張</option>
            <option value="google/gemini-3.1-flash-image-preview"></option>
            <option value="black-forest-labs/flux.2-flex"></option>
            <option value="openai/gpt-5-image-mini"></option>
            <option value="bytedance-seed/seedream-4.5"></option>
          </datalist>
        </label>
        <label>OpenRouter API Key<input id="llm-key" type="password" placeholder="sk-or-v1-… 必填" autocomplete="off" /></label>
        <label class="llm-check"><input id="llm-enabled" type="checkbox" checked /> 允許呼叫 LLM 寫場</label>
        <label class="llm-check"><input id="llm-illustrate" type="checkbox" checked /> 有 Key 時自動生成插畫（場次 16:9、人物 3:4）</label>
        <div class="heaven-row">
          <button type="submit" class="time-btn">儲存並試寫一場</button>
          <button type="button" class="time-btn" id="llm-cancel">關閉</button>
        </div>
      </form>
    </div>
  </div>
`

const els = {
  qi: $('#qi-value'),
  qiRate: $('#qi-rate'),
  members: $('#member-value'),
  realm: $('#realm-name'),
  realmProgress: $('#realm-progress'),
  realmProgressLabel: $('#realm-progress-label'),
  recruitCost: $('#recruit-cost'),
  breakthroughCost: $('#breakthrough-cost'),
  breakthroughHint: $('#breakthrough-hint'),
  clickYield: $('#click-yield'),
  recruitButton: $('#recruit-button'),
  breakthroughButton: $('#breakthrough-button'),
  gatherButton: $('#gather-button'),
  traitList: $('#trait-list'),
  emptyTraits: $('#empty-traits'),
  logList: $('#log-list'),
  modal: $('#trait-modal'),
  choices: $('#trait-choices'),
  toastRegion: $('#toast-region'),
  musicToggle: $('#music-toggle'),
  calendar: $('#calendar-label'),
  karma: $('#karma-value'),
  peak: $('#peak-realm'),
  roster: $('#roster-list'),
  regions: $('#region-grid'),
  inspector: $('#inspector'),
  pauseBtn: $('#pause-btn'),
  speedBtn: $('#speed-btn'),
  pulse: $('#pulse-badge'),
  fortune: $('#fortune-word'),
  partTitle: $('#part-title'),
  partEnglish: $('#part-english'),
  partTheme: $('#part-theme'),
  writerBadge: $('#writer-badge'),
  screenplayList: $('#screenplay-list'),
  nextSceneBtn: $('#next-scene-btn'),
  llmSettingsBtn: $('#llm-settings-btn'),
  llmModal: $('#llm-modal'),
  llmForm: $('#llm-form'),
  llmBase: $('#llm-base'),
  llmModel: $('#llm-model'),
  llmKey: $('#llm-key'),
  llmEnabled: $('#llm-enabled'),
  llmIllustrate: $('#llm-illustrate'),
  llmImageModel: $('#llm-image-model'),
  llmCancel: $('#llm-cancel'),
}

const art = createIllustrator({
  onUpdate: () => render({ inspect: !els.inspector.matches(':hover') }),
})

const logs = [
  { time: calendarLabel(world), text: '教父世家於蒼梧山立下道統。天道臨世，開始觀察族人自行演化。', tone: 'gold' },
  { time: calendarLabel(world), text: '沈清梧入藏經閣，葉疏影在山門等人，白無塵已往後山。', tone: 'jade' },
]

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function addLog(text, tone = '') {
  logs.unshift({ time: calendarLabel(world), text, tone })
  logs.splice(24)
  renderLog()
}

function renderLog() {
  els.logList.innerHTML = logs.map((item) => `
    <div class="log-entry ${item.tone}">
      <time>${item.time.replace('玄元曆 ', '')}</time>
      <span>${item.text}</span>
    </div>
  `).join('')
}

function showToast(event) {
  const toast = document.createElement('div')
  toast.className = `event-toast ${event.type}`
  toast.innerHTML = `
    <span class="toast-icon">${event.type === 'bad' ? '厄' : event.type === 'heritage' ? '脈' : '吉'}</span>
    <div>
      <small>${event.type === 'bad' ? 'TRIBULATION' : event.type === 'heritage' ? 'BREAKTHROUGH' : 'OMEN'}</small>
      <strong>${event.title}</strong>
      <p>${event.text} <b>${event.detail || ''}</b></p>
    </div>
    <span class="toast-timer"></span>
  `
  els.toastRegion.append(toast)
  window.setTimeout(() => toast.classList.add('leaving'), 3000)
  window.setTimeout(() => toast.remove(), 3450)
}

function applyReports(reports) {
  for (const report of reports) {
    if (report.text) addLog(report.text, report.tone)
    if (report.toast) {
      showToast(report.toast)
      audio.playEvent(report.toast.type !== 'bad')
    } else if (report.sfx === true) audio.playEvent(true)
    else if (report.sfx === false) audio.playEvent(false)
    if (report.flash) fx.flashScreen()
  }
}

function renderTraits() {
  els.emptyTraits.hidden = world.traits.length > 0
  els.traitList.innerHTML = world.traits.map((traitId) => {
    const trait = TRAITS.find((item) => item.id === traitId)
    return `
      <div class="active-trait">
        <span>${trait.icon}</span>
        <div><strong>${trait.name}</strong><small>${trait.modifier}</small></div>
      </div>
    `
  }).join('')
}

function sealMarkup(person, className) {
  if (person.artUrl) {
    return `<img class="${className} has-art" src="${person.artUrl}" alt="" />`
  }
  if (person.artStatus === 'pending' && imageReady()) {
    return `<span class="${className} art-pending" aria-hidden="true"></span>`
  }
  return `<span class="${className}" style="border-color:${person.root.hue};color:${person.root.hue}">${person.name.slice(-1)}</span>`
}

function sceneArtMarkup(scene) {
  if (scene.artUrl) {
    return `<img class="scene-art" src="${scene.artUrl}" alt="${escapeHtml(scene.title)}" />`
  }
  if (scene.artStatus === 'pending') {
    return `<div class="scene-art art-pending" role="img" aria-label="插畫生成中"></div>`
  }
  if (scene.artStatus === 'error') {
    return `<button type="button" class="scene-art art-retry" data-retry-art="${escapeHtml(scene.id || '')}">插畫未成 · 點此重試</button>`
  }
  return ''
}

function renderRoster() {
  els.roster.innerHTML = living(world).map((person) => `
    <button type="button" class="roster-card ${person.id === world.selectedId ? 'is-selected' : ''}" data-id="${person.id}">
      ${sealMarkup(person, 'roster-seal')}
      <span>
        <strong>${person.name}${person.role === 'patriarch' ? ' · 老祖' : ''}</strong>
        <small>${STAGES[person.realm]} · ${ACTIONS[person.action].label}</small>
      </span>
      <i>${person.hp}%</i>
    </button>
  `).join('')
}

function renderMap() {
  els.regions.innerHTML = REGIONS.map((region) => {
    const here = peopleIn(world, region.id)
    const tokens = here.map((p) => `
      <button type="button" class="region-token ${p.id === world.selectedId ? 'is-on' : ''}" data-id="${p.id}" title="${p.name}">
        ${p.name.slice(-1)}
      </button>
    `).join('')
    return `
      <article class="region-cell">
        <header><strong>${region.name}</strong><small>${region.hint}</small></header>
        <div class="token-row">${tokens || '<span class="token-empty">空</span>'}</div>
      </article>
    `
  }).join('')
}

function renderInspector() {
  const person = selected(world)
  if (!person) {
    els.inspector.innerHTML = '<p class="empty-inspect">山門已空。</p>'
    return
  }
  const memories = person.memory.length
    ? person.memory.map((line) => `<li>${line}</li>`).join('')
    : '<li>尚無記憶殘片</li>'
  const arts = person.artifacts.length ? person.artifacts.join('、') : '無'
  const portrait = person.artUrl
    ? `<img class="inspect-portrait" src="${person.artUrl}" alt="${escapeHtml(person.name)}" />`
    : person.artStatus === 'pending' && imageReady()
      ? '<span class="inspect-portrait art-pending" aria-hidden="true"></span>'
      : `<span class="inspect-seal">${person.name.slice(-1)}</span>`
  els.inspector.innerHTML = `
    <div class="inspect-name">
      ${portrait}
      <div>
        <strong>${person.name}</strong>
        <small>${person.nickname || '尚無江湖綽號'} · ${person.role === 'patriarch' ? '老祖' : person.role === 'elder' ? '長老' : '弟子'}</small>
      </div>
    </div>
    <div class="inspect-tags">
      <span>${person.root.name}</span>
      <span>${person.nature.name}</span>
      <span>《${person.technique}》</span>
    </div>
    <div class="inspect-grid">
      <div><small>境界</small><b>${STAGES[person.realm]}</b></div>
      <div><small>年齡 / 壽元</small><b>${person.age} / ${person.lifespan}</b></div>
      <div><small>傷勢</small><b>${person.hp}%</b></div>
      <div><small>心情</small><b>${person.mood > 20 ? '暢快' : person.mood < -15 ? '陰鬱' : '平淡'}</b></div>
      <div><small>丹藥</small><b>${person.pills}</b></div>
      <div><small>人際</small><b>${bondLine(person, world)}</b></div>
    </div>
    <p class="thought-box">「${person.thought}」</p>
    <p class="inspect-gear">法寶：${arts}</p>
    <ul class="memory-list">${memories}</ul>
    <div class="heaven-actions">
      <small>天道干預 · 消耗氣運</small>
      <div class="heaven-row">
        <button type="button" data-heaven="bless">賜福 · 8</button>
        <button type="button" data-heaven="tribulate">天劫 · 12</button>
        <button type="button" data-heaven="corrupt">心魔 · 10</button>
      </div>
      <div class="heaven-row">
        <button type="button" data-assign="cultivate">令其修煉 · 3</button>
        <button type="button" data-assign="adventure">令其歷練 · 3</button>
        <button type="button" data-assign="alchemy">令其煉丹 · 3</button>
      </div>
    </div>
  `
}

function renderHud() {
  const cost = breakthroughCost(world)
  const atMax = world.patriarchRealm >= STAGES.length - 1
  els.qi.textContent = formatNumber(world.qi)
  els.qiRate.textContent = formatNumber(qiRate(world))
  els.members.textContent = `${living(world).length}`
  els.realm.textContent = STAGES[world.patriarchRealm]
  els.realmProgressLabel.textContent = atMax ? '道心圓滿' : `${formatNumber(Math.min(world.qi, cost))} / ${formatNumber(cost)}`
  els.realmProgress.style.width = atMax ? '100%' : `${Math.min((world.qi / cost) * 100, 100)}%`
  els.recruitCost.textContent = formatNumber(recruitCost(world))
  els.breakthroughCost.textContent = atMax ? '—' : formatNumber(cost)
  els.breakthroughHint.textContent = atMax ? '此界已臻圓滿' : `衝擊 ${STAGES[world.patriarchRealm + 1]}`
  els.clickYield.textContent = `+${formatNumber(clickYield(world))}`
  els.recruitButton.disabled = world.qi < recruitCost(world)
  els.breakthroughButton.disabled = atMax || world.qi < cost
  els.calendar.textContent = calendarLabel(world)
  els.karma.textContent = formatNumber(world.karma)
  els.peak.textContent = highestRealmName(world)
  els.pulse.textContent = world.paused ? '時停' : '演化中'
  els.fortune.textContent = world.paused ? '時停' : world.karma > 40 ? '昌盛' : world.karma < 12 ? '式微' : '觀察'
  els.pauseBtn.textContent = world.paused ? '▶ 繼續' : '⏸ 暫停'
  els.speedBtn.textContent = `×${world.speed}`
}

function renderScreenplay() {
  const part = PARTS[director.state.part - 1]
  els.partTitle.textContent = part.title
  els.partEnglish.textContent = part.english
  els.partTheme.textContent = part.theme
  els.writerBadge.textContent = director.state.busy
    ? '執筆中…'
    : art.busy
      ? '畫師執筆中…'
      : director.state.source === 'llm'
        ? 'OpenRouter'
        : llmReady(director.state.config) ? '劇組代班' : '欠 API Key'
  els.writerBadge.title = director.state.error || art.lastError || ''
  els.screenplayList.innerHTML = director.state.scenes.map((scene) => `
    <article class="scene-card">
      ${sceneArtMarkup(scene)}
      <header>
        <small>${escapeHtml(scene.slug)}</small>
        <b>${escapeHtml(scene.title)}</b>
        <i>${scene.source === 'llm' ? 'LLM' : '劇組'}${scene.artUrl ? ' · 插畫' : ''}</i>
      </header>
      <p>${escapeHtml(scene.narration)}</p>
      ${scene.line ? `<blockquote>${escapeHtml(scene.line)}</blockquote>` : ''}
    </article>
  `).join('') || '<p class="token-empty">劇本尚未開場。</p>'
}

function render(opts = {}) {
  const inspect = opts.inspect ?? true
  renderHud()
  renderRoster()
  renderMap()
  renderScreenplay()
  if (inspect) renderInspector()
  const person = selected(world)
  if (person) queueMicrotask(() => art.paintPerson(person))
}

function pickTraitChoices() {
  const available = TRAITS.filter((trait) => !world.traits.includes(trait.id))
  const pool = available.length >= 3 ? available : TRAITS
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3)
}

function openTraitModal() {
  const choices = pickTraitChoices()
  els.choices.innerHTML = choices.map((trait) => `
    <button class="trait-choice" type="button" data-trait="${trait.id}">
      <span class="choice-icon">${trait.icon}</span>
      <small>${trait.english}</small>
      <strong>${trait.name}</strong>
      <p>${trait.description}</p>
      <i>${trait.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join('')
  els.modal.classList.add('visible')
  els.modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
  els.choices.querySelector('button')?.focus()
}

function chooseTrait(traitId) {
  const trait = TRAITS.find((item) => item.id === traitId)
  if (!trait) return
  if (!world.traits.includes(traitId)) world.traits.push(traitId)
  els.modal.classList.remove('visible')
  els.modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
  addLog(`血脈覺醒「${trait.name}」，${trait.description}。`, 'gold')
  showToast({ type: 'heritage', title: '家族傳承已覺醒', text: trait.name, detail: trait.modifier })
  renderTraits()
  render()
}

function floatingQi(x, y, amount) {
  const float = document.createElement('span')
  float.className = 'floating-qi'
  float.textContent = `+${formatNumber(amount)} 靈氣`
  float.style.left = `${x}px`
  float.style.top = `${y}px`
  document.body.append(float)
  float.addEventListener('animationend', () => float.remove(), { once: true })
  window.setTimeout(() => float.remove(), 1400)
}

function pointerPoint(event) {
  const target = event.currentTarget
  const rect = target instanceof HTMLElement ? target.getBoundingClientRect() : null
  const x = event.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2)
  const y = event.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight / 2)
  return { x, y }
}

function pressEffect(button) {
  button.classList.remove('is-pressed')
  void button.offsetWidth
  button.classList.add('is-pressed')
  window.setTimeout(() => button.classList.remove('is-pressed'), 260)
}

function selectPerson(id) {
  if (!id) return
  world.selectedId = id
  render()
}

els.screenplayList.addEventListener('click', (event) => {
  const retry = event.target.closest('[data-retry-art]')
  if (!retry) return
  const scene = director.state.scenes.find((item) => item.id === retry.dataset.retryArt)
  if (scene) art.retryScene(scene, director.state.config)
})

els.roster.addEventListener('click', (event) => {
  const card = event.target.closest('[data-id]')
  if (card) selectPerson(card.dataset.id)
})

els.regions.addEventListener('click', (event) => {
  const token = event.target.closest('[data-id]')
  if (token) selectPerson(token.dataset.id)
})

els.inspector.addEventListener('click', (event) => {
  const heaven = event.target.closest('[data-heaven]')
  const assign = event.target.closest('[data-assign]')
  const id = world.selectedId
  if (heaven) {
    const kind = heaven.dataset.heaven
    const result = kind === 'bless' ? bless(world, id)
      : kind === 'tribulate' ? tribulate(world, id)
        : corrupt(world, id)
    if (!result.ok) {
      addLog(result.reason || '氣運不足，天道暫時不可妄動。', 'danger')
      render()
      return
    }
    audio.playRise()
    if (kind === 'tribulate') applyReports(result.reports || [])
    addLog(result.text, 'gold')
    showToast({
      type: kind === 'tribulate' ? 'heritage' : kind === 'corrupt' ? 'bad' : 'good',
      title: kind === 'bless' ? '天道賜福' : kind === 'tribulate' ? '天劫降臨' : '心魔翻湧',
      text: selected(world)?.name || '',
      detail: result.text,
    })
    render()
    return
  }
  if (assign) {
    const result = assignAction(world, id, assign.dataset.assign)
    if (!result.ok) addLog(result.reason || '氣運不足。', 'danger')
    else {
      audio.playQing()
      addLog(result.text, 'jade')
    }
    render()
  }
})

els.gatherButton.addEventListener('click', (event) => {
  const amount = clickYield(world)
  world.qi += amount
  const { x, y } = pointerPoint(event)
  floatingQi(x, y, amount)
  fx.burst(x, y)
  audio.playQing()
  pressEffect(els.gatherButton)
  renderHud()
})

els.recruitButton.addEventListener('click', () => {
  const result = recruitMember(world)
  if (!result.ok) return
  audio.playRise()
  pressEffect(els.recruitButton)
  addLog(`${result.person.name}拜入教父世家，靈根為${result.person.root.name}，性${result.person.nature.name}。`, 'jade')
  render()
})

els.breakthroughButton.addEventListener('click', () => {
  const result = patriarchBreakthrough(world)
  if (!result.ok) return
  audio.playRise()
  if (result.flash) fx.flashScreen()
  pressEffect(els.breakthroughButton)
  addLog(`老祖破境成功，踏入「${result.stage}」！`, 'gold')
  render()
  window.setTimeout(openTraitModal, 350)
})

els.choices.addEventListener('click', (event) => {
  const choice = event.target.closest('[data-trait]')
  if (choice) chooseTrait(choice.dataset.trait)
})

async function publishScene(scene) {
  if (!scene) return
  addLog(`【${PARTS[scene.part - 1].title}／${scene.title}】${scene.line || scene.narration}`, 'gold')
  art.paintScene(scene)
  const person = selected(world)
  if (person) art.paintPerson(person)
  render()
}

els.nextSceneBtn.addEventListener('click', async () => {
  els.nextSceneBtn.disabled = true
  const scene = await director.writeScene(world, true)
  els.nextSceneBtn.disabled = false
  await publishScene(scene)
})

function openLlmModal() {
  const config = loadLlmConfig()
  els.llmBase.value = config.baseUrl || OPENROUTER_BASE
  els.llmModel.value = config.model || DEFAULT_MODEL
  els.llmImageModel.value = config.imageModel || DEFAULT_IMAGE_MODEL
  els.llmKey.value = config.apiKey || ''
  els.llmEnabled.checked = config.enabled !== false
  els.llmIllustrate.checked = config.illustrate !== false
  els.llmModal.classList.add('visible')
  els.llmModal.setAttribute('aria-hidden', 'false')
}

function closeLlmModal() {
  els.llmModal.classList.remove('visible')
  els.llmModal.setAttribute('aria-hidden', 'true')
}

els.llmSettingsBtn.addEventListener('click', openLlmModal)
els.llmCancel.addEventListener('click', closeLlmModal)
els.llmForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  saveLlmConfig({
    enabled: els.llmEnabled.checked,
    illustrate: els.llmIllustrate.checked,
    baseUrl: els.llmBase.value,
    apiKey: els.llmKey.value,
    model: els.llmModel.value,
    imageModel: els.llmImageModel.value,
  })
  director.reloadConfig()
  closeLlmModal()
  const scene = await director.writeScene(world, llmReady(director.state.config))
  await publishScene(scene)
})

els.pauseBtn.addEventListener('click', () => {
  world.paused = !world.paused
  renderHud()
})

els.speedBtn.addEventListener('click', () => {
  world.speed = world.speed === 1 ? 3 : world.speed === 3 ? 8 : 1
  restartClock()
  renderHud()
})

els.musicToggle.addEventListener('click', async () => {
  const on = await audio.setMusic(!audio.isMusicOn())
  els.musicToggle.setAttribute('aria-pressed', String(on))
  els.musicToggle.classList.toggle('is-on', on)
  els.musicToggle.textContent = on ? '🐱 塔菲喵播放中' : '🔇 關注塔菲喵'
})

document.addEventListener('pointerdown', () => audio.unlock(), { once: true })

let clock = 0
function restartClock() {
  window.clearInterval(clock)
  clock = window.setInterval(() => {
    const reports = simulateMonth(world)
    applyReports(reports)
    director.onMonth(world).then((scene) => {
      if (scene) {
        addLog(`【${PARTS[scene.part - 1].title}／${scene.title}】${scene.line || scene.narration}`, 'gold')
        art.paintScene(scene)
      }
      render({ inspect: !els.inspector.matches(':hover') })
    })
  }, Math.round(1600 / world.speed))
}

window.__jiaofuFamily = window.__cultivationFamily = {
  triggerRandomEvent: () => {
    const reports = triggerOmen(world, true)
    applyReports(reports)
    render()
  },
  state: world,
  director,
  art,
  tick: () => {
    const reports = simulateMonth(world)
    applyReports(reports)
    render()
  },
}

renderLog()
renderTraits()
render()
restartClock()
director.writeScene(world, false).then(publishScene)
