import './style.css'

const icon = (name) => {
  const paths = {
    qi: '<path d="M12 2.7c.7 3.3-.4 5.2-2.2 7.2-1.5 1.8-2.2 3.4-1.4 5.6.5 1.3 1.6 2.4 3 3.1-.3-2.4.8-3.7 2.1-5.2.7-.8 1.4-1.7 1.7-2.8 1.8 1.8 2.8 4 2.8 6.1 0 3.7-2.7 6.3-6.2 6.3S5 20.3 5 16.2c0-4.6 3.4-7.9 7-13.5Z"/><path d="M11.7 18.6c1.2-.7 2.2-1.6 2.9-2.9.3 2.1-.5 4.2-2.6 4.2-1 0-1.5-.6-1.6-1.2.4.1.8.1 1.3-.1Z"/>',
    family: '<path d="M16 21v-2.1c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4V21"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2c0-1.8-1.2-3.4-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    spark: '<path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3Z"/><path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7L19 16ZM5 2l.7 2.3L8 5l-2.3.7L5 8l-.7-2.3L2 5l2.3-.7L5 2Z"/>',
    mountain: '<path d="m3 20 6.2-9 3.2 4.2 2.7-3.4L21 20H3Z"/><path d="m7 14 2.2-3 1.7 2.2M12.8 15.8l2.3-4 2.5 4.5"/>',
    leaf: '<path d="M20.8 3.2C13 3.4 6.2 6.1 4.5 11.1c-1 2.9.2 5.8 3 7.2 2.5 1.2 5.4.2 7-2 2.9-4 3.4-8.4 6.3-13.1Z"/><path d="M3 21c3.7-6 7.8-9.2 12.8-11.8"/>',
    scroll: '<path d="M6 3h12v15a3 3 0 0 1-3 3H6a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Z"/><path d="M6 3a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3ZM18 21a3 3 0 0 0 3-3h-6a3 3 0 0 0 3 3ZM12 10h3M12 14h3"/>',
    dna: '<path d="M4 3c0 8 16 10 16 18M20 3c0 8-16 10-16 18M7 6h10M6 17h12M9 10h6M9 14h6"/>',
    crown: '<path d="m3 7 4 4 5-7 5 7 4-4-2 11H5L3 7Z"/><path d="M5 21h14"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M12 20V4M6 10l6-6 6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  }

  return `<svg class="ui-icon" aria-hidden="true" viewBox="0 0 24 24">${paths[name]}</svg>`
}

const REALMS = [
  { name: '煉氣初期', en: 'Qi Refining · I', cost: 800 },
  { name: '煉氣圓滿', en: 'Qi Refining · IX', cost: 2800 },
  { name: '築基初期', en: 'Foundation · I', cost: 8200 },
  { name: '築基圓滿', en: 'Foundation · IX', cost: 22000 },
  { name: '金丹初期', en: 'Golden Core · I', cost: 62000 },
  { name: '金丹圓滿', en: 'Golden Core · IX', cost: 180000 },
  { name: '元嬰真君', en: 'Nascent Soul', cost: null },
]

const TRAITS = [
  {
    id: 'prosperous',
    name: '多子多福',
    en: 'Flourishing Lineage',
    mark: '昌',
    description: '招募族人所需靈氣降低 20%',
    detail: 'Recruit cost −20%',
    color: 'gold',
  },
  {
    id: 'heavenly-root',
    name: '天靈根血脈',
    en: 'Heavenly Root',
    mark: '靈',
    description: '每位族人的基礎靈氣產出提升 50%',
    detail: 'Qi per member +50%',
    color: 'jade',
  },
  {
    id: 'diligent',
    name: '勤能補拙',
    en: 'Unyielding Resolve',
    mark: '勤',
    description: '每次閉關修煉獲得雙倍靈氣',
    detail: 'Gather Qi ×2',
    color: 'azure',
  },
  {
    id: 'spirit-vein',
    name: '靈脈相承',
    en: 'Spirit Vein Legacy',
    mark: '脈',
    description: '家族所有被動靈氣產出提升 25%',
    detail: 'Idle Qi +25%',
    color: 'violet',
  },
  {
    id: 'guardian',
    name: '玄武庇佑',
    en: 'Black Tortoise Ward',
    mark: '玄',
    description: '突發事件造成的損失降低 30%',
    detail: 'Event loss −30%',
    color: 'azure',
  },
  {
    id: 'treasure-sense',
    name: '尋寶靈覺',
    en: 'Treasure Instinct',
    mark: '寶',
    description: '突發事件獲得的靈氣提升 30%',
    detail: 'Event rewards +30%',
    color: 'gold',
  },
  {
    id: 'sword-heart',
    name: '劍心通明',
    en: 'Lucid Sword Heart',
    mark: '劍',
    description: '閉關修煉所得靈氣額外提升 25%',
    detail: 'Gather Qi +25%',
    color: 'jade',
  },
  {
    id: 'ancestral-wisdom',
    name: '先祖餘蔭',
    en: 'Ancestral Wisdom',
    mark: '祖',
    description: '每位族人的靈氣產出額外提升 20%',
    detail: 'Qi per member +20%',
    color: 'violet',
  },
]

const defaultState = {
  qi: 420,
  members: 3,
  realmIndex: 0,
  traits: [],
  totalQi: 420,
  logs: [
    { time: Date.now() - 45000, type: 'jade', message: '青雲一脈落地生根，家族道統自此開啟。' },
    { time: Date.now() - 25000, type: 'muted', message: '族人開始吐納天地靈氣。' },
    { time: Date.now() - 5000, type: 'gold', message: '老祖出關，距離突破尚需積累修為。' },
  ],
  lastSeen: Date.now(),
}

const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('qingyun-family-save'))
    if (!saved) return structuredClone(defaultState)

    return {
      ...structuredClone(defaultState),
      ...saved,
      qi: Math.max(0, Number(saved.qi) || 0),
      members: Math.max(1, Math.floor(Number(saved.members) || 1)),
      realmIndex: Math.min(REALMS.length - 1, Math.max(0, Number(saved.realmIndex) || 0)),
      traits: Array.isArray(saved.traits)
        ? saved.traits.filter((id) => TRAITS.some((trait) => trait.id === id))
        : [],
      logs: Array.isArray(saved.logs) ? saved.logs.slice(0, 30) : defaultState.logs,
    }
  } catch {
    return structuredClone(defaultState)
  }
}

let state = loadState()
let traitChoices = []
let eventTimer

const getModifiers = () => ({
  recruitCost: state.traits.includes('prosperous') ? 0.8 : 1,
  idle:
    (state.traits.includes('heavenly-root') ? 1.5 : 1) *
    (state.traits.includes('spirit-vein') ? 1.25 : 1) *
    (state.traits.includes('ancestral-wisdom') ? 1.2 : 1),
  click:
    (state.traits.includes('diligent') ? 2 : 1) *
    (state.traits.includes('sword-heart') ? 1.25 : 1),
  eventGain: state.traits.includes('treasure-sense') ? 1.3 : 1,
  eventLoss: state.traits.includes('guardian') ? 0.7 : 1,
})

const qiPerSecond = () => state.members * 1.4 * getModifiers().idle
const clickValue = () => Math.round(12 * getModifiers().click)
const recruitCost = () =>
  Math.max(100, Math.floor(140 * 1.28 ** Math.max(0, state.members - 3) * getModifiers().recruitCost))
const currentRealm = () => REALMS[state.realmIndex]
const format = (value) =>
  new Intl.NumberFormat('zh-Hant', {
    notation: value >= 100000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value)
const formatClock = (time) =>
  new Intl.DateTimeFormat('zh-Hant', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(time)

document.querySelector('#app').innerHTML = `
  <div class="ambient" aria-hidden="true">
    <div class="moon"></div>
    <div class="mist mist-one"></div>
    <div class="mist mist-two"></div>
    <div class="mountains mountains-back"></div>
    <div class="mountains mountains-front"></div>
    <div class="grain"></div>
  </div>

  <div id="toast-region" class="toast-region" aria-live="assertive" aria-atomic="true"></div>

  <header class="topbar">
    <a class="brand" href="#" aria-label="青雲世家首頁">
      <span class="brand-seal" aria-hidden="true"><span>青</span></span>
      <span class="brand-copy">
        <strong>青雲世家</strong>
        <small>QINGYUN CULTIVATION HOUSE</small>
      </span>
    </a>
    <div class="topbar-center" aria-label="家族狀態">
      <span class="status-dot"></span>
      <span>護山大陣運轉中</span>
    </div>
    <div class="era">
      <span>青雲曆</span>
      <strong id="era-year">第壹年 · 春</strong>
    </div>
  </header>

  <main class="game-shell">
    <section class="hero-copy">
      <div>
        <p class="eyebrow"><span></span> CULTIVATION IDLE GAME <span></span></p>
        <h1>承一脈仙緣，<em>傳百世道統</em></h1>
        <p class="hero-subtitle">Gather the breath of heaven and earth. Let your bloodline outlive the ages.</p>
      </div>
      <div class="realm-pill">
        ${icon('mountain')}
        <span>老祖境界</span>
        <strong id="header-realm">${currentRealm().name}</strong>
      </div>
    </section>

    <section class="stats-grid" aria-label="家族數據">
      <article class="stat-card stat-qi">
        <span class="stat-icon">${icon('qi')}</span>
        <div class="stat-copy">
          <span>家族靈氣 <small>TOTAL QI</small></span>
          <strong id="qi-value">0</strong>
          <small class="stat-delta" id="qi-rate">+0 / 秒</small>
        </div>
        <div class="stat-sparkline" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </article>
      <article class="stat-card">
        <span class="stat-icon">${icon('family')}</span>
        <div class="stat-copy">
          <span>家族成員 <small>MEMBERS</small></span>
          <strong id="members-value">0</strong>
          <small class="stat-delta neutral">血脈綿延</small>
        </div>
        <span class="stat-rune" aria-hidden="true">族</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon">${icon('spark')}</span>
        <div class="stat-copy">
          <span>靈氣產出 <small>QI FLOW</small></span>
          <strong id="flow-value">0</strong>
          <small class="stat-delta neutral">每息自生</small>
        </div>
        <span class="stat-rune" aria-hidden="true">息</span>
      </article>
      <article class="stat-card">
        <span class="stat-icon">${icon('crown')}</span>
        <div class="stat-copy">
          <span>家族聲望 <small>RENOWN</small></span>
          <strong id="renown-value">0</strong>
          <small class="stat-delta neutral">青雲郡 · 初露鋒芒</small>
        </div>
        <span class="stat-rune" aria-hidden="true">望</span>
      </article>
    </section>

    <div class="dashboard-grid">
      <section class="cultivation-panel panel">
        <div class="panel-heading">
          <div>
            <span class="section-kicker">ANCESTOR'S RETREAT</span>
            <h2>老祖洞府</h2>
          </div>
          <div class="breathing"><span></span> 靈息穩定</div>
        </div>

        <div class="cultivation-stage">
          <div class="sigil" aria-hidden="true">
            <span class="sigil-ring sigil-outer"><i>乾</i><i>坎</i><i>艮</i><i>震</i></span>
            <span class="sigil-ring sigil-inner"></span>
            <span class="cultivator">
              <i class="head"></i>
              <i class="body"></i>
              <i class="energy-orb"></i>
            </span>
          </div>
          <div class="realm-details">
            <span>當前境界</span>
            <h3 id="realm-name">${currentRealm().name}</h3>
            <p id="realm-en">${currentRealm().en}</p>
          </div>
        </div>

        <div class="breakthrough-progress">
          <div class="progress-label">
            <span>突破進度</span>
            <span id="progress-label">0 / 0 靈氣</span>
          </div>
          <div class="progress-track"><i id="realm-progress"></i></div>
        </div>

        <div class="primary-actions">
          <button class="game-button gather-button" id="gather-button" type="button">
            <span class="button-aura" aria-hidden="true"></span>
            <span class="button-icon">${icon('leaf')}</span>
            <span class="button-copy">
              <strong>閉關修煉</strong>
              <small>GATHER QI · +<b id="click-value">12</b></small>
            </span>
          </button>
          <button class="game-button breakthrough-button" id="breakthrough-button" type="button">
            <span class="button-icon">${icon('arrow')}</span>
            <span class="button-copy">
              <strong>老祖突破</strong>
              <small id="breakthrough-cost">需 800 靈氣</small>
            </span>
          </button>
        </div>

        <div class="secondary-action">
          <button class="recruit-button" id="recruit-button" type="button">
            <span>${icon('plus')}</span>
            <span class="button-copy">
              <strong>廣納族人</strong>
              <small>延續家族香火，增加靈氣產出</small>
            </span>
            <span class="cost-tag" id="recruit-cost">140 靈氣</span>
          </button>
        </div>
      </section>

      <aside class="side-column">
        <section class="heritage-panel panel">
          <div class="panel-heading">
            <div>
              <span class="section-kicker">BLOODLINE LEGACY</span>
              <h2>${icon('dna')} 家族傳承</h2>
            </div>
            <span class="trait-count" id="trait-count">0 / ${TRAITS.length}</span>
          </div>
          <div class="heritage-list" id="heritage-list"></div>
        </section>

        <section class="chronicle-panel panel">
          <div class="panel-heading">
            <div>
              <span class="section-kicker">CLAN CHRONICLE</span>
              <h2>${icon('scroll')} 家族紀事</h2>
            </div>
            <span class="live-label"><i></i> LIVE</span>
          </div>
          <div class="chronicle" id="chronicle" role="log" aria-live="polite"></div>
          <div class="next-omen">
            ${icon('clock')}
            <span>天機流轉，福禍將至</span>
            <i></i>
          </div>
        </section>
      </aside>
    </div>
  </main>

  <footer>
    <span>青雲一脈 · 生生不息</span>
    <span class="footer-mark">◇</span>
    <span id="save-status">已刻入家譜</span>
  </footer>

  <div class="modal-backdrop" id="trait-modal" aria-hidden="true">
    <section class="trait-modal" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title">
      <div class="modal-rays" aria-hidden="true"></div>
      <span class="modal-seal" aria-hidden="true"><i>承</i></span>
      <p class="section-kicker">ANCESTRAL AWAKENING</p>
      <h2 id="trait-modal-title">血脈覺醒</h2>
      <p class="modal-intro">老祖破境，家族血脈應運而生。<br />選擇一項天賦，世代相傳。</p>
      <div class="trait-options" id="trait-options"></div>
      <p class="modal-hint">天賦一經選定，將永遠銘刻於家族血脈</p>
    </section>
  </div>
`

const elements = {
  qi: document.querySelector('#qi-value'),
  members: document.querySelector('#members-value'),
  flow: document.querySelector('#flow-value'),
  renown: document.querySelector('#renown-value'),
  qiRate: document.querySelector('#qi-rate'),
  realmName: document.querySelector('#realm-name'),
  realmEn: document.querySelector('#realm-en'),
  headerRealm: document.querySelector('#header-realm'),
  progress: document.querySelector('#realm-progress'),
  progressLabel: document.querySelector('#progress-label'),
  gatherButton: document.querySelector('#gather-button'),
  clickValue: document.querySelector('#click-value'),
  breakthroughButton: document.querySelector('#breakthrough-button'),
  breakthroughCost: document.querySelector('#breakthrough-cost'),
  recruitButton: document.querySelector('#recruit-button'),
  recruitCost: document.querySelector('#recruit-cost'),
  heritageList: document.querySelector('#heritage-list'),
  traitCount: document.querySelector('#trait-count'),
  chronicle: document.querySelector('#chronicle'),
  modal: document.querySelector('#trait-modal'),
  traitOptions: document.querySelector('#trait-options'),
  toastRegion: document.querySelector('#toast-region'),
  saveStatus: document.querySelector('#save-status'),
}

const addLog = (message, type = 'muted') => {
  state.logs.unshift({ time: Date.now(), message, type })
  state.logs = state.logs.slice(0, 30)
  renderLog()
}

const renderLog = () => {
  elements.chronicle.innerHTML = state.logs
    .map(
      (entry, index) => `
        <div class="log-entry ${entry.type} ${index === 0 ? 'new' : ''}">
          <time>${formatClock(entry.time)}</time>
          <span class="log-glyph">›</span>
          <p>${entry.message}</p>
        </div>`,
    )
    .join('')
}

const renderHeritage = () => {
  elements.traitCount.textContent = `${state.traits.length} / ${TRAITS.length}`

  if (!state.traits.length) {
    elements.heritageList.innerHTML = `
      <div class="heritage-empty">
        <span class="empty-orbit">${icon('dna')}</span>
        <div>
          <strong>血脈尚未覺醒</strong>
          <p>老祖突破境界時，可擇一天賦傳承後世。</p>
        </div>
      </div>`
    return
  }

  elements.heritageList.innerHTML = state.traits
    .map((traitId) => {
      const trait = TRAITS.find(({ id }) => id === traitId)
      return `
        <article class="heritage-item">
          <span class="trait-mark ${trait.color}"><i>${trait.mark}</i></span>
          <div>
            <strong>${trait.name}</strong>
            <span>${trait.en}</span>
            <p>${trait.detail}</p>
          </div>
        </article>`
    })
    .join('')
}

const renderStats = () => {
  const realm = currentRealm()
  const cost = realm.cost
  const qps = qiPerSecond()
  const recruit = recruitCost()

  elements.qi.textContent = format(Math.floor(state.qi))
  elements.members.textContent = format(state.members)
  elements.flow.textContent = format(qps)
  elements.renown.textContent = format(Math.floor(state.totalQi / 25 + state.realmIndex * 120 + state.members * 8))
  elements.qiRate.textContent = `+${format(qps)} / 秒`
  elements.realmName.textContent = realm.name
  elements.realmEn.textContent = realm.en
  elements.headerRealm.textContent = realm.name
  elements.clickValue.textContent = clickValue()
  elements.recruitCost.textContent = `${format(recruit)} 靈氣`
  elements.recruitButton.disabled = state.qi < recruit

  if (cost) {
    const percentage = Math.min(100, (state.qi / cost) * 100)
    elements.progress.style.width = `${percentage}%`
    elements.progressLabel.textContent = `${format(Math.floor(state.qi))} / ${format(cost)} 靈氣`
    elements.breakthroughCost.textContent = `需 ${format(cost)} 靈氣`
    elements.breakthroughButton.disabled = state.qi < cost
  } else {
    elements.progress.style.width = '100%'
    elements.progressLabel.textContent = '大道已成'
    elements.breakthroughCost.textContent = '已臻化境'
    elements.breakthroughButton.disabled = true
  }
}

const saveGame = () => {
  state.lastSeen = Date.now()
  localStorage.setItem('qingyun-family-save', JSON.stringify(state))
  elements.saveStatus.textContent = '已刻入家譜'
}

const showFloatingQi = (event, amount) => {
  const rect = elements.gatherButton.getBoundingClientRect()
  const x = event.clientX || rect.left + rect.width / 2
  const y = event.clientY || rect.top + rect.height / 2
  const text = document.createElement('span')
  text.className = 'floating-qi'
  text.textContent = `+${amount} 靈氣`
  text.style.left = `${x}px`
  text.style.top = `${y}px`
  document.body.append(text)
  text.addEventListener('animationend', () => text.remove())
}

const gatherQi = (event) => {
  const amount = clickValue()
  state.qi += amount
  state.totalQi += amount
  showFloatingQi(event, amount)
  elements.gatherButton.classList.remove('gather-burst')
  requestAnimationFrame(() => elements.gatherButton.classList.add('gather-burst'))
  renderStats()
}

const recruitMember = () => {
  const cost = recruitCost()
  if (state.qi < cost) return

  state.qi -= cost
  state.members += 1
  addLog('一名身具靈根的族人歸入宗祠。家族成員 +1', 'jade')
  showToast('良才入族', '新族人已入家譜，靈氣產出提升。', 'good', '族')
  renderStats()
  saveGame()
}

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5)

const openTraitModal = () => {
  const available = TRAITS.filter(({ id }) => !state.traits.includes(id))
  traitChoices = shuffle(available).slice(0, 3)

  elements.traitOptions.innerHTML = traitChoices
    .map(
      (trait) => `
        <button class="trait-option" type="button" data-trait="${trait.id}">
          <span class="trait-mark large ${trait.color}"><i>${trait.mark}</i></span>
          <span class="option-index">血脈天賦</span>
          <strong>${trait.name}</strong>
          <small>${trait.en}</small>
          <p>${trait.description}</p>
          <span class="choose-label">銘刻此天賦 ${icon('arrow')}</span>
        </button>`,
    )
    .join('')

  elements.modal.classList.add('open')
  elements.modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
  elements.traitOptions.querySelector('button')?.focus()
}

const selectTrait = (traitId) => {
  const trait = traitChoices.find(({ id }) => id === traitId)
  if (!trait) return

  state.traits.push(trait.id)
  elements.modal.classList.remove('open')
  elements.modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
  addLog(`家族天賦「${trait.name}」已銘刻於血脈：${trait.description}`, 'gold')
  showToast('家族傳承覺醒', `${trait.name} · ${trait.detail}`, 'heritage', trait.mark)
  renderHeritage()
  renderStats()
  saveGame()
  elements.gatherButton.focus()
}

const breakthrough = () => {
  const realm = currentRealm()
  if (!realm.cost || state.qi < realm.cost) return

  state.qi -= realm.cost
  state.realmIndex += 1
  const nextRealm = currentRealm()
  addLog(`老祖引動天地靈機，破境成功！修為晉升「${nextRealm.name}」。`, 'gold')
  renderStats()
  openTraitModal()
}

const goodEvents = [
  {
    title: '後山靈芝',
    glyph: '芝',
    apply: () => {
      const amount = Math.round(500 * getModifiers().eventGain)
      state.qi += amount
      state.totalQi += amount
      return `家族子弟在後山發現百年靈芝！靈氣 +${amount}`
    },
  },
  {
    title: '喜結良緣',
    glyph: '囍',
    apply: () => {
      state.members += 2
      return '家族喜結良緣，兩位有緣人歸入族中！成員 +2'
    },
  },
  {
    title: '靈石礦脈',
    glyph: '礦',
    apply: () => {
      const amount = Math.round(800 * getModifiers().eventGain)
      state.qi += amount
      state.totalQi += amount
      return `族人在山門下尋得一脈靈石！靈氣 +${amount}`
    },
  },
  {
    title: '族學頓悟',
    glyph: '悟',
    apply: () => {
      const amount = Math.round(350 * getModifiers().eventGain)
      state.qi += amount
      state.totalQi += amount
      return `族學講道時眾弟子齊齊頓悟！靈氣 +${amount}`
    },
  },
]

const badEvents = [
  {
    title: '敵族夜襲',
    glyph: '襲',
    apply: () => {
      const lost = state.members > 1 ? 1 : 0
      state.members = Math.max(1, state.members - lost)
      return lost
        ? '敵對家族乘夜偷襲，族人為護山門負傷離去。成員 −1'
        : '敵對家族乘夜偷襲，護山大陣擋下了攻勢。'
    },
  },
  {
    title: '走火入魔',
    glyph: '厄',
    apply: () => {
      const amount = Math.round(200 * getModifiers().eventLoss)
      const actual = Math.min(Math.floor(state.qi), amount)
      state.qi = Math.max(0, state.qi - amount)
      return `族人修行急進，幸得老祖出手平息。靈氣 −${actual}`
    },
  },
  {
    title: '靈脈震盪',
    glyph: '震',
    apply: () => {
      const amount = Math.round(320 * getModifiers().eventLoss)
      const actual = Math.min(Math.floor(state.qi), amount)
      state.qi = Math.max(0, state.qi - amount)
      return `地脈驟然震盪，維持大陣耗去靈氣 −${actual}`
    },
  },
]

const showToast = (title, message, type = 'good', glyph = '吉') => {
  const previous = elements.toastRegion.querySelector('.event-toast')
  previous?.remove()

  const toast = document.createElement('article')
  toast.className = `event-toast ${type}`
  toast.innerHTML = `
    <span class="toast-glyph"><i>${glyph}</i></span>
    <div>
      <small>${type === 'bad' ? '突發劫數' : type === 'heritage' ? '血脈共鳴' : '家族奇遇'}</small>
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
    <span class="toast-line"></span>`
  elements.toastRegion.append(toast)

  window.setTimeout(() => {
    toast.classList.add('leaving')
    toast.addEventListener('animationend', () => toast.remove(), { once: true })
  }, 3000)
}

const triggerRandomEvent = (forcedType) => {
  const isGood = forcedType ? forcedType === 'good' : Math.random() >= 0.42
  const pool = isGood ? goodEvents : badEvents
  const randomEvent = pool[Math.floor(Math.random() * pool.length)]
  const message = randomEvent.apply()

  addLog(message, isGood ? 'jade' : 'red')
  showToast(randomEvent.title, message, isGood ? 'good' : 'bad', randomEvent.glyph)
  renderStats()
  saveGame()
}

const scheduleEvent = () => {
  window.clearTimeout(eventTimer)
  const delay = 15000 + Math.random() * 15000
  eventTimer = window.setTimeout(() => {
    if (Math.random() < 0.5) triggerRandomEvent()
    scheduleEvent()
  }, delay)
}

const addButtonRipple = (event, button) => {
  const rect = button.getBoundingClientRect()
  const ripple = document.createElement('span')
  ripple.className = 'button-ripple'
  ripple.style.left = `${event.clientX - rect.left}px`
  ripple.style.top = `${event.clientY - rect.top}px`
  button.append(ripple)
  ripple.addEventListener('animationend', () => ripple.remove())
}

elements.gatherButton.addEventListener('click', gatherQi)
elements.recruitButton.addEventListener('click', recruitMember)
elements.breakthroughButton.addEventListener('click', breakthrough)
elements.traitOptions.addEventListener('click', (event) => {
  const option = event.target.closest('[data-trait]')
  if (option) selectTrait(option.dataset.trait)
})

document.addEventListener('pointerdown', (event) => {
  const button = event.target.closest('button:not(:disabled)')
  if (button) addButtonRipple(event, button)
})

document.addEventListener('visibilitychange', () => {
  if (document.hidden) saveGame()
})
window.addEventListener('beforeunload', saveGame)

const offlineSeconds = Math.min(
  8 * 60 * 60,
  Math.max(0, (Date.now() - (state.lastSeen || Date.now())) / 1000),
)
if (offlineSeconds > 20) {
  const offlineQi = Math.floor(offlineSeconds * qiPerSecond())
  state.qi += offlineQi
  state.totalQi += offlineQi
  addLog(`護山大陣在你離開時持續聚靈，共凝聚 ${format(offlineQi)} 靈氣。`, 'jade')
  window.setTimeout(
    () => showToast('雲遊歸來', `離線期間獲得 ${format(offlineQi)} 靈氣`, 'good', '歸'),
    600,
  )
}

renderStats()
renderHeritage()
renderLog()
scheduleEvent()

let lastTick = performance.now()
window.setInterval(() => {
  const now = performance.now()
  const elapsed = Math.min(1, (now - lastTick) / 1000)
  lastTick = now
  const generated = qiPerSecond() * elapsed
  state.qi += generated
  state.totalQi += generated
  renderStats()
}, 250)

window.setInterval(saveGame, 5000)

// Intentionally tiny test surface; it does not change the player-facing controls.
window.__cultivationGame = {
  addQi(amount = 1000) {
    const value = Math.max(0, Number(amount) || 0)
    state.qi += value
    state.totalQi += value
    renderStats()
  },
  triggerEvent: triggerRandomEvent,
  getState: () => structuredClone(state),
  reset() {
    localStorage.removeItem('qingyun-family-save')
    window.location.reload()
  },
}
