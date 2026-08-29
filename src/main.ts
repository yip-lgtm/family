import './style.css'

type TraitId =
  | 'many-heirs'
  | 'heavenly-root'
  | 'diligent'
  | 'spirit-array'
  | 'iron-clan'
  | 'fortunate-star'

type LogType = 'system' | 'good' | 'bad' | 'heritage'

interface LogEntry {
  time: string
  message: string
  type: LogType
}

interface GameState {
  qi: number
  members: number
  realm: number
  traits: Partial<Record<TraitId, number>>
  logs: LogEntry[]
  pendingTraitChoice: boolean
  lastSavedAt: number
}

interface TraitDefinition {
  id: TraitId
  name: string
  english: string
  icon: string
  description: string
  detail: string
}

interface FamilyEvent {
  tone: 'good' | 'bad'
  icon: string
  title: string
  apply: () => string
}

const STORAGE_KEY = 'eternal-clan-save-v1'
const REALMS = [
  { name: '煉氣境', english: 'Qi Refining', glyph: '氣' },
  { name: '築基境', english: 'Foundation', glyph: '基' },
  { name: '金丹境', english: 'Golden Core', glyph: '丹' },
  { name: '元嬰境', english: 'Nascent Soul', glyph: '嬰' },
  { name: '化神境', english: 'Soul Formation', glyph: '神' },
  { name: '煉虛境', english: 'Void Refining', glyph: '虛' },
  { name: '合體境', english: 'Body Integration', glyph: '合' },
  { name: '大乘境', english: 'Mahayana', glyph: '道' },
]

const TRAITS: Record<TraitId, TraitDefinition> = {
  'many-heirs': {
    id: 'many-heirs',
    name: '多子多福',
    english: 'Many Heirs',
    icon: '枝',
    description: '招募族人的靈氣消耗降低 20%。',
    detail: '每重額外降低 20%，最高 60%。',
  },
  'heavenly-root': {
    id: 'heavenly-root',
    name: '天靈根血脈',
    english: 'Heavenly Root',
    icon: '靈',
    description: '每位族人的基礎靈氣產量提升 50%。',
    detail: '血脈越純，族人的吐納效率越高。',
  },
  diligent: {
    id: 'diligent',
    name: '勤能補拙',
    english: 'Relentless Practice',
    icon: '勤',
    description: '每次「閉關修煉」獲得 2 倍靈氣。',
    detail: '每重令手動修煉效果再次翻倍。',
  },
  'spirit-array': {
    id: 'spirit-array',
    name: '聚靈祖陣',
    english: 'Ancestral Array',
    icon: '陣',
    description: '全族每秒靈氣產量提升 25%。',
    detail: '陣紋可疊加，生生不息。',
  },
  'iron-clan': {
    id: 'iron-clan',
    name: '鐵血宗族',
    english: 'Ironblood Clan',
    icon: '盾',
    description: '抵擋敵襲造成的族人損失。',
    detail: '祖訓森嚴，族人同心守望。',
  },
  'fortunate-star': {
    id: 'fortunate-star',
    name: '福星高照',
    english: 'Fortune’s Favor',
    icon: '福',
    description: '正面家族事件的收益提升 50%。',
    detail: '家運昌盛，所遇之事皆有轉機。',
  },
}

const defaultState = (): GameState => ({
  qi: 108,
  members: 1,
  realm: 0,
  traits: {},
  pendingTraitChoice: false,
  lastSavedAt: Date.now(),
  logs: [
    {
      time: new Date().toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }),
      message: '青雲山脈靈霧初開，家族傳承自此刻延續。',
      type: 'system',
    },
  ],
})

const loadState = (): GameState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const saved = JSON.parse(raw) as Partial<GameState>
    return {
      qi: Math.max(0, Number(saved.qi) || 0),
      members: Math.max(1, Math.floor(Number(saved.members) || 1)),
      realm: Math.min(REALMS.length - 1, Math.max(0, Math.floor(Number(saved.realm) || 0))),
      traits: saved.traits ?? {},
      pendingTraitChoice: Boolean(saved.pendingTraitChoice),
      logs: Array.isArray(saved.logs) ? saved.logs.slice(0, 40) : [],
      lastSavedAt: Number(saved.lastSavedAt) || Date.now(),
    }
  } catch {
    return defaultState()
  }
}

let state = loadState()
let traitChoices: TraitId[] = []
let nextEventAt = Date.now() + randomBetween(15_000, 30_000)
let lastTick = performance.now()
let lastRender = 0
let logDirty = true

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="atmosphere" aria-hidden="true">
    <div class="stars stars-a"></div>
    <div class="stars stars-b"></div>
    <div class="mist mist-a"></div>
    <div class="mist mist-b"></div>
  </div>
  <div id="toast-region" class="toast-region" aria-live="polite"></div>

  <header class="topbar">
    <div class="top-left">
      <span class="app-title">萬古仙族</span>
      <span class="status-dot" title="天道運轉中"></span>
    </div>
    <div class="top-center">
      <span class="status-widget" style="color:#d2c5a3">📅 青雲紀</span>
      <span class="widget-divider">|</span>
      <span class="status-widget" style="color:#e1ab52">✨ 下次天機 <b id="event-countdown">-- 秒</b></span>
      <span class="widget-divider">|</span>
      <span class="status-widget" style="color:#e1b680">🏛 玄微一脈</span>
      <span class="widget-divider">|</span>
      <span class="status-widget" id="ranking-widget" style="color:#cfa53a">🏆 人榜未入</span>
    </div>
    <div class="top-right">
      <span id="save-status">傳承已銘刻</span>
      <button id="reset-button" class="icon-button game-button" type="button" aria-label="重開家族" title="重開家族">重開</button>
    </div>
  </header>

  <main class="hud">
    <aside class="panel info-panel" aria-labelledby="overview-heading">
      <div class="panel-header">
        <div>
          <div class="main-title" id="overview-heading">玄微一脈</div>
          <div class="sub-title">老祖道號 · 玄微</div>
        </div>
        <span id="realm-badge" class="realm-badge">煉氣 · 一重</span>
      </div>
      <div class="panel-body">
        <section class="section">
          <div class="ancestor-stage">
            <div class="ancestor-core"><span id="realm-glyph">氣</span></div>
            <div class="realm-copy">
              <small id="realm-english">QI REFINING</small>
              <strong id="realm-name">煉氣境</strong>
            </div>
          </div>
          <div class="stat-grid">
            <article class="stat-card">
              <small>家族靈氣</small>
              <strong id="qi-value">0</strong>
            </article>
            <article class="stat-card">
              <small>家族成員</small>
              <strong id="member-value">1</strong>
            </article>
            <article class="stat-card wide">
              <small>吐納效率</small>
              <strong id="rate-value">+1 / 秒</strong>
              <span id="rate-detail" class="stat-note">1 人修煉中</span>
            </article>
          </div>
          <div class="progress-block">
            <div class="progress-label">
              <span>距離下次突破</span>
              <b id="progress-copy">108 / 360</b>
            </div>
            <div class="progress-track" role="progressbar" aria-label="突破進度" aria-valuemin="0" aria-valuemax="100">
              <span id="realm-progress"></span>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-title">修煉行動</div>
          <button id="gather-button" class="gather-button game-button" type="button">
            <span class="gather-aura"></span>
            <strong>閉關修煉 Gather Qi</strong>
            <small>GATHER QI · <b id="click-gain">+10</b></small>
          </button>
          <div class="action-stack">
            <button id="recruit-button" class="action-button jade game-button" type="button">
              <span><strong>招募族人 Recruit</strong><small><b id="recruit-cost">100 靈氣</b></small></span>
            </button>
            <button id="breakthrough-button" class="action-button gold game-button" type="button">
              <span><strong>老祖突破 Breakthrough</strong><small><b id="breakthrough-cost">360 靈氣</b></small></span>
            </button>
          </div>
        </section>

        <section class="section heritage-panel" aria-labelledby="heritage-heading">
          <div class="section-title" id="heritage-heading">🧬 家族傳承 Family Heritage</div>
          <p class="panel-intro">老祖每次破境，都能將一縷道韻刻入後世血脈。</p>
          <div id="trait-list" class="trait-list"></div>
          <small id="heritage-count">0 道傳承已覺醒</small>
        </section>
      </div>
    </aside>

    <section class="world-map" aria-label="祖地">
      <div class="map-mist" aria-hidden="true"></div>
      <div class="estate-plaque">
        <div class="estate-name">玄微祖地</div>
        <div class="estate-sub" id="estate-sub">散修世家 · 煉氣境</div>
      </div>
      <div id="member-layer" class="member-layer"></div>
    </section>

    <aside class="panel event-panel" aria-labelledby="chronicle-heading">
      <div class="sidebar-header">
        <h3 id="chronicle-heading">經歷</h3>
        <span class="event-scope">家族</span>
      </div>
      <div id="log-list" class="log-list" aria-live="polite"></div>
    </aside>
  </main>

  <div id="trait-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title" hidden>
    <div class="trait-modal">
      <div class="modal-ornament" aria-hidden="true"><span></span><b>承</b><span></span></div>
      <span class="eyebrow">A LEGACY AWAKENS</span>
      <h2 id="trait-modal-title">擇一道韻，傳予後世</h2>
      <p>老祖破境之時，血脈與天地共鳴。三道天賦浮現，只可取其一。</p>
      <div id="trait-choices" class="trait-choices"></div>
      <small class="modal-note">選擇一經銘刻，不可更改</small>
    </div>
  </div>
`

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) throw new Error(`Missing element: ${selector}`)
  return element
}

const elements = {
  qi: getElement<HTMLElement>('#qi-value'),
  members: getElement<HTMLElement>('#member-value'),
  rate: getElement<HTMLElement>('#rate-value'),
  rateDetail: getElement<HTMLElement>('#rate-detail'),
  realmName: getElement<HTMLElement>('#realm-name'),
  realmEnglish: getElement<HTMLElement>('#realm-english'),
  realmGlyph: getElement<HTMLElement>('#realm-glyph'),
  realmBadge: getElement<HTMLElement>('#realm-badge'),
  progress: getElement<HTMLElement>('#realm-progress'),
  progressTrack: getElement<HTMLElement>('.progress-track'),
  progressCopy: getElement<HTMLElement>('#progress-copy'),
  recruitButton: getElement<HTMLButtonElement>('#recruit-button'),
  recruitCost: getElement<HTMLElement>('#recruit-cost'),
  breakthroughButton: getElement<HTMLButtonElement>('#breakthrough-button'),
  breakthroughCost: getElement<HTMLElement>('#breakthrough-cost'),
  gatherButton: getElement<HTMLButtonElement>('#gather-button'),
  clickGain: getElement<HTMLElement>('#click-gain'),
  traitList: getElement<HTMLElement>('#trait-list'),
  heritageCount: getElement<HTMLElement>('#heritage-count'),
  logList: getElement<HTMLElement>('#log-list'),
  eventCountdown: getElement<HTMLElement>('#event-countdown'),
  saveStatus: getElement<HTMLElement>('#save-status'),
  modal: getElement<HTMLElement>('#trait-modal'),
  traitChoices: getElement<HTMLElement>('#trait-choices'),
  toastRegion: getElement<HTMLElement>('#toast-region'),
  memberLayer: getElement<HTMLElement>('#member-layer'),
  rankingWidget: getElement<HTMLElement>('#ranking-widget'),
  estateSub: getElement<HTMLElement>('#estate-sub'),
}

function formatNumber(value: number, precision = 0): string {
  if (value < 1_000) {
    return value.toLocaleString('zh-HK', {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    })
  }
  const units = [
    { size: 1e12, suffix: '兆' },
    { size: 1e8, suffix: '億' },
    { size: 1e4, suffix: '萬' },
    { size: 1e3, suffix: '千' },
  ]
  const unit = units.find(({ size }) => value >= size)!
  const scaled = value / unit.size
  return `${scaled.toFixed(scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2)}${unit.suffix}`
}

function traitLevel(id: TraitId): number {
  return Math.max(0, Number(state.traits[id]) || 0)
}

function qiPerSecond(): number {
  const bloodline = 1 + traitLevel('heavenly-root') * 0.5
  const arrayBonus = 1 + traitLevel('spirit-array') * 0.25
  const realmBonus = 1 + state.realm * 0.1
  return state.members * bloodline * arrayBonus * realmBonus
}

function clickGain(): number {
  return 10 * 2 ** traitLevel('diligent')
}

function recruitCost(): number {
  const discount = Math.max(0.4, 1 - traitLevel('many-heirs') * 0.2)
  return Math.floor(100 * 1.52 ** (state.members - 1) * discount)
}

function breakthroughCost(): number {
  return Math.floor(360 * 3.35 ** state.realm)
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function escapeHtml(value: string): string {
  const wrapper = document.createElement('span')
  wrapper.textContent = value
  return wrapper.innerHTML
}

function addLog(message: string, type: LogType = 'system'): void {
  state.logs.unshift({
    time: new Date().toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }),
    message,
    type,
  })
  state.logs = state.logs.slice(0, 40)
  logDirty = true
}

function renderLogs(): void {
  if (!logDirty) return
  elements.logList.innerHTML = state.logs
    .map(
      (entry) => `
        <article class="log-entry ${entry.type}">
          <time>${escapeHtml(entry.time)}</time>
          <p>${escapeHtml(entry.message)}</p>
        </article>`,
    )
    .join('')
  logDirty = false
}

function renderTraits(): void {
  const active = (Object.entries(state.traits) as [TraitId, number][])
    .filter(([, level]) => level > 0)
    .sort((a, b) => b[1] - a[1])

  if (!active.length) {
    elements.traitList.innerHTML = `
      <div class="heritage-empty">
        <div class="empty-sigil"><span>脈</span></div>
        <strong>血脈尚未覺醒</strong>
        <p>讓老祖突破境界，開啟家族的第一道傳承。</p>
      </div>`
  } else {
    elements.traitList.innerHTML = active
      .map(([id, level]) => {
        const trait = TRAITS[id]
        return `
          <article class="active-trait">
            <span class="trait-sigil">${trait.icon}</span>
            <span class="trait-copy">
              <small>${trait.english}</small>
              <strong>${trait.name}</strong>
              <p>${trait.description}</p>
            </span>
            <b>第 ${toChineseNumber(level)} 重</b>
          </article>`
      })
      .join('')
  }
  const total = active.reduce((sum, [, level]) => sum + level, 0)
  elements.heritageCount.textContent = `${total} 道傳承已覺醒`
}

function toChineseNumber(value: number): string {
  return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'][value] ?? String(value)
}

function realmHudColor(realmIndex: number): string {
  if (realmIndex >= 6) return '#fddc88'
  if (realmIndex >= 4) return '#c488fd'
  if (realmIndex >= 2) return '#88fdc4'
  return '#cccccc'
}

function rankingLabel(realmIndex: number): string {
  if (realmIndex >= 3) return '天榜'
  if (realmIndex >= 2) return '地榜'
  if (realmIndex >= 1) return '人榜'
  return '人榜未入'
}

let lastTokenSig = ''

function renderMemberTokens(): void {
  const sig = `${state.members}:${state.realm}`
  if (sig === lastTokenSig) return
  lastTokenSig = sig
  const count = Math.min(state.members, 20)
  const color = realmHudColor(state.realm)
  elements.memberLayer.innerHTML = Array.from({ length: count }, (_, index) => {
    const ring = index === 0 ? 0 : 1 + Math.floor((index - 1) / 8)
    const slot = index === 0 ? 0 : (index - 1) % 8
    const angle = (slot / 8) * Math.PI * 2 - Math.PI / 2
    const radius = index === 0 ? 0 : 16 + ring * 10
    const x = 50 + Math.cos(angle) * radius
    const y = 54 + Math.sin(angle) * radius * 0.7
    const name = index === 0 ? '老祖' : `族人${index}`
    const glyph = index === 0 ? '祖' : String(index)
    return `<button type="button" class="member-token${index === 0 ? ' ancestor' : ''}" style="left:${x}%;top:${Math.min(86, Math.max(22, y))}%;color:${color}"><span class="token-avatar">${glyph}</span><span class="token-name">${name}</span></button>`
  }).join('')
}

function render(): void {
  const realm = REALMS[state.realm]
  const rate = qiPerSecond()
  const nextCost = breakthroughCost()
  const isMaxRealm = state.realm >= REALMS.length - 1
  const progress = isMaxRealm ? 100 : Math.min(100, (state.qi / nextCost) * 100)
  const recruit = recruitCost()

  elements.qi.textContent = formatNumber(state.qi, state.qi < 100 ? 1 : 0)
  elements.qi.title = `${Math.floor(state.qi).toLocaleString('zh-HK')} 靈氣`
  elements.members.textContent = state.members.toLocaleString('zh-HK')
  elements.rate.textContent = `+${formatNumber(rate, rate < 10 ? 1 : 0)} / 秒`
  elements.rateDetail.textContent = `${state.members} 人修煉中`
  elements.realmName.textContent = realm.name
  elements.realmEnglish.textContent = realm.english.toUpperCase()
  elements.realmGlyph.textContent = realm.glyph
  elements.realmBadge.textContent = `${realm.name.replace('境', '')} · ${toChineseNumber(state.realm + 1)}重`
  elements.progress.style.width = `${progress}%`
  elements.progressTrack.setAttribute('aria-valuenow', String(Math.round(progress)))
  elements.progressCopy.textContent = isMaxRealm
    ? '已臻化境'
    : `${formatNumber(state.qi)} / ${formatNumber(nextCost)}`
  elements.recruitCost.textContent = `${formatNumber(recruit)} 靈氣`
  elements.recruitButton.disabled = state.qi < recruit
  elements.breakthroughCost.textContent = isMaxRealm ? '道法圓滿' : `${formatNumber(nextCost)} 靈氣`
  elements.breakthroughButton.disabled = isMaxRealm || state.qi < nextCost || state.pendingTraitChoice
  elements.clickGain.textContent = `+${formatNumber(clickGain())}`
  elements.rankingWidget.textContent = `🏆 ${rankingLabel(state.realm)}`
  elements.rankingWidget.style.color = realmHudColor(state.realm)
  elements.estateSub.textContent = `散修世家 · ${realm.name}`
  elements.realmBadge.style.color = realmHudColor(state.realm)
  renderMemberTokens()
  renderLogs()
}

function bump(element: HTMLElement): void {
  element.classList.remove('value-bump')
  void element.offsetWidth
  element.classList.add('value-bump')
}

function spawnFloatingText(event: MouseEvent, amount: number): void {
  const floating = document.createElement('span')
  floating.className = 'floating-qi'
  floating.textContent = `+${formatNumber(amount)} 靈氣`
  floating.style.left = `${event.clientX}px`
  floating.style.top = `${event.clientY}px`
  document.body.append(floating)
  floating.addEventListener('animationend', () => floating.remove(), { once: true })
}

function gatherQi(event: MouseEvent): void {
  const gained = clickGain()
  state.qi += gained
  spawnFloatingText(event, gained)
  bump(elements.qi)
  render()
}

function recruitMember(): void {
  const cost = recruitCost()
  if (state.qi < cost) return
  state.qi -= cost
  state.members += 1
  addLog(`耗費 ${formatNumber(cost)} 靈氣，一名族人引氣入體，正式列入族譜。`, 'good')
  bump(elements.members)
  render()
}

function chooseTraitOptions(): TraitId[] {
  const ids = Object.keys(TRAITS) as TraitId[]
  const shuffled = [...ids].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

function openTraitModal(): void {
  traitChoices = chooseTraitOptions()
  elements.traitChoices.innerHTML = traitChoices
    .map((id) => {
      const trait = TRAITS[id]
      const level = traitLevel(id)
      return `
        <button class="trait-choice game-button" type="button" data-trait="${id}">
          <span class="choice-level">${level ? `升至第 ${toChineseNumber(level + 1)} 重` : '新傳承'}</span>
          <span class="choice-sigil">${trait.icon}</span>
          <small>${trait.english}</small>
          <strong>${trait.name}</strong>
          <p>${trait.description}</p>
          <span class="choice-detail">${trait.detail}</span>
          <span class="choice-select">銘刻此傳承 <b>→</b></span>
        </button>`
    })
    .join('')
  elements.modal.hidden = false
  requestAnimationFrame(() => elements.modal.classList.add('visible'))
  getElement<HTMLButtonElement>('.trait-choice').focus()
}

function closeTraitModal(): void {
  elements.modal.classList.remove('visible')
  window.setTimeout(() => {
    elements.modal.hidden = true
  }, 250)
}

function selectTrait(id: TraitId): void {
  if (!traitChoices.includes(id) || !state.pendingTraitChoice) return
  const newLevel = traitLevel(id) + 1
  state.traits[id] = newLevel
  state.pendingTraitChoice = false
  const trait = TRAITS[id]
  addLog(`家族天賦「${trait.name}」已銘刻至血脈（第 ${toChineseNumber(newLevel)} 重）。`, 'heritage')
  renderTraits()
  closeTraitModal()
  saveGame()
  showToast('good', '傳承已銘刻', `${trait.name} · 第 ${toChineseNumber(newLevel)} 重`, trait.icon)
  render()
}

function breakthrough(): void {
  const cost = breakthroughCost()
  if (state.qi < cost || state.realm >= REALMS.length - 1 || state.pendingTraitChoice) return
  state.qi -= cost
  state.realm += 1
  state.pendingTraitChoice = true
  addLog(`天地異象驟現！老祖成功踏入${REALMS[state.realm].name}，一道血脈傳承正等待抉擇。`, 'heritage')
  saveGame()
  render()
  openTraitModal()
}

function showToast(tone: 'good' | 'bad', title: string, message: string, icon: string): void {
  const toast = document.createElement('article')
  toast.className = `event-toast ${tone}`
  toast.innerHTML = `
    <span class="toast-icon">${escapeHtml(icon)}</span>
    <span><small>${tone === 'good' ? '吉兆 · FORTUNE' : '凶兆 · CALAMITY'}</small><strong>${escapeHtml(title)}</strong><p>${escapeHtml(message)}</p></span>
    <i class="toast-timer"></i>`
  elements.toastRegion.append(toast)
  requestAnimationFrame(() => toast.classList.add('visible'))
  window.setTimeout(() => {
    toast.classList.remove('visible')
    window.setTimeout(() => toast.remove(), 350)
  }, 3_000)
}

function fortuneMultiplier(): number {
  return 1 + traitLevel('fortunate-star') * 0.5
}

function createEvents(): FamilyEvent[] {
  return [
    {
      tone: 'good',
      icon: '芝',
      title: '後山靈藥現世',
      apply: () => {
        const gain = Math.floor(500 * fortuneMultiplier())
        state.qi += gain
        return `族中子弟發現百年靈芝，靈氣 +${formatNumber(gain)}`
      },
    },
    {
      tone: 'good',
      icon: '囍',
      title: '良緣天成',
      apply: () => {
        const gain = Math.max(2, Math.floor(2 * fortuneMultiplier()))
        state.members += gain
        return `家族喜結良緣，新添族人 +${gain}`
      },
    },
    {
      tone: 'good',
      icon: '脈',
      title: '靈脈潮汐',
      apply: () => {
        const gain = Math.floor(qiPerSecond() * 45 * fortuneMultiplier())
        state.qi += gain
        return `地脈噴湧，全族沐浴靈潮，靈氣 +${formatNumber(gain)}`
      },
    },
    {
      tone: 'bad',
      icon: '襲',
      title: '敵族夜襲',
      apply: () => {
        if (traitLevel('iron-clan') > 0) {
          return '護族大陣亮起，鐵血宗族成功擊退來敵'
        }
        const before = state.members
        state.members = Math.max(1, state.members - 1)
        return before === 1 ? '老祖親自鎮守山門，家族有驚無險' : '山門受襲，一名族人不幸離散，族人 -1'
      },
    },
    {
      tone: 'bad',
      icon: '厄',
      title: '走火入魔',
      apply: () => {
        const loss = Math.min(200, Math.floor(state.qi))
        state.qi = Math.max(0, state.qi - loss)
        return `運功行岔，平復經脈耗去靈氣 -${formatNumber(loss)}`
      },
    },
    {
      tone: 'bad',
      icon: '劫',
      title: '丹爐炸裂',
      apply: () => {
        const loss = Math.min(Math.floor(state.qi * 0.12), 600)
        state.qi = Math.max(0, state.qi - loss)
        return `煉丹出了差錯，修繕丹房耗去靈氣 -${formatNumber(loss)}`
      },
    },
  ]
}

function scheduleNextEvent(): void {
  nextEventAt = Date.now() + randomBetween(15_000, 30_000)
}

function maybeTriggerEvent(): void {
  if (Date.now() < nextEventAt) return
  if (Math.random() <= 0.5) {
    const events = createEvents()
    const event = events[Math.floor(Math.random() * events.length)]
    const result = event.apply()
    addLog(`${event.title}：${result}`, event.tone)
    showToast(event.tone, event.title, result, event.icon)
    bump(event.tone === 'good' && result.includes('族人') ? elements.members : elements.qi)
  }
  scheduleNextEvent()
}

function saveGame(): void {
  state.lastSavedAt = Date.now()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  elements.saveStatus.textContent = '傳承已銘刻'
}

function applyOfflineProgress(): void {
  const elapsed = Math.min(8 * 60 * 60, Math.max(0, (Date.now() - state.lastSavedAt) / 1000))
  if (elapsed < 30) return
  const gained = qiPerSecond() * elapsed
  state.qi += gained
  addLog(`老祖歸來，族人閉關期間共凝聚 ${formatNumber(gained)} 靈氣。`, 'good')
  showToast('good', '閉關有成', `離線修煉獲得 ${formatNumber(gained)} 靈氣`, '歸')
}

function resetGame(): void {
  if (!window.confirm('確定要讓萬古仙族重入輪迴？所有傳承與修為都會消散。')) return
  localStorage.removeItem(STORAGE_KEY)
  state = defaultState()
  lastTokenSig = ''
  closeTraitModal()
  renderTraits()
  logDirty = true
  scheduleNextEvent()
  saveGame()
  render()
  showToast('bad', '輪迴重啟', '舊世已逝，一脈新生。', '輪')
}

elements.gatherButton.addEventListener('click', gatherQi)
elements.recruitButton.addEventListener('click', recruitMember)
elements.breakthroughButton.addEventListener('click', breakthrough)
getElement<HTMLButtonElement>('#reset-button').addEventListener('click', resetGame)
elements.traitChoices.addEventListener('click', (event) => {
  const choice = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-trait]')
  if (choice) selectTrait(choice.dataset.trait as TraitId)
})

document.addEventListener('pointerdown', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.game-button')
  if (!button || button.disabled) return
  const rect = button.getBoundingClientRect()
  const ripple = document.createElement('span')
  ripple.className = 'button-ripple'
  ripple.style.left = `${event.clientX - rect.left}px`
  ripple.style.top = `${event.clientY - rect.top}px`
  button.append(ripple)
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
})

window.addEventListener('beforeunload', saveGame)
window.setInterval(() => {
  elements.saveStatus.textContent = '正在銘刻…'
  saveGame()
}, 5_000)

window.setInterval(() => {
  const remaining = Math.max(0, Math.ceil((nextEventAt - Date.now()) / 1000))
  elements.eventCountdown.textContent = `${remaining} 秒`
  maybeTriggerEvent()
}, 500)

function gameLoop(now: number): void {
  const delta = Math.min(1, (now - lastTick) / 1000)
  lastTick = now
  state.qi += qiPerSecond() * delta
  if (now - lastRender > 150) {
    render()
    lastRender = now
  }
  requestAnimationFrame(gameLoop)
}

applyOfflineProgress()
renderTraits()
render()
if (state.pendingTraitChoice) openTraitModal()
requestAnimationFrame(gameLoop)
