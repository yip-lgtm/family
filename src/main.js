import './style.css'

const icon = (name) => {
  const paths = {
    people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    mountain: '<path d="m3 20 6-10 4 6 2-3 6 7H3Z"/><path d="m7.3 13 1.7-3 1.8 2.7M15 13l1.3 2"/>',
    spark: '<path d="m12 3-1.2 4.2a5 5 0 0 1-3.5 3.5L3 12l4.3 1.2a5 5 0 0 1 3.5 3.5L12 21l1.2-4.3a5 5 0 0 1 3.5-3.5L12 3Z"/>',
    dna: '<path d="M4 3c8 4 8 14 16 18M20 3C12 7 12 17 4 21M7 6h10M6 18h12M9 10h6M9 14h6"/>',
    scroll: '<path d="M8 2h11a3 3 0 0 1 3 3v1H8V2Z"/><path d="M19 6v13a3 3 0 0 1-3 3H5a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v2h5"/><path d="M16 22a3 3 0 0 0 3-3v-1H8v1a3 3 0 0 1-3 3M11 10h5M11 14h5"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`
}

document.querySelector('#app').innerHTML = `
  <div class="ambient" aria-hidden="true">
    <div class="stars stars-one"></div>
    <div class="stars stars-two"></div>
    <div class="mountain mountain-back"></div>
    <div class="mountain mountain-front"></div>
    <div class="mist mist-one"></div>
    <div class="mist mist-two"></div>
  </div>

  <div id="toast-region" class="toast-region" aria-live="polite"></div>

  <header class="topbar">
    <a class="brand" href="#" aria-label="雲隱仙門首頁">
      <span class="brand-mark"><span>雲</span></span>
      <span class="brand-copy">
        <strong>雲隱仙門</strong>
        <small>CULTIVATION FAMILY</small>
      </span>
    </a>
    <div class="season">
      <span class="season-pulse"></span>
      <span>青嵐曆 · <strong id="year">元年</strong></span>
      <span class="divider"></span>
      <span class="save-state">靈契已同步</span>
    </div>
    <button id="reset-btn" class="icon-button" type="button" aria-label="重開家族" title="重開家族">
      ${icon('reset')}
    </button>
  </header>

  <main class="game-shell">
    <section class="intro">
      <div>
        <p class="eyebrow"><span></span> 一脈相承 · 萬世不息</p>
        <h1>問道長生，<em>福澤後人</em></h1>
        <p class="intro-copy">天地靈氣，聚於一念。帶領雲氏一族修行破境，讓每一次抉擇化作後世血脈中的力量。</p>
      </div>
      <div class="realm-seal">
        <span>當前境界</span>
        <strong id="realm-header">煉氣初期</strong>
      </div>
    </section>

    <section class="dashboard-grid">
      <article class="cultivation-card panel">
        <div class="panel-corner top-left"></div><div class="panel-corner top-right"></div>
        <div class="panel-corner bottom-left"></div><div class="panel-corner bottom-right"></div>
        <div class="cultivation-visual" aria-hidden="true">
          <div class="orbit orbit-outer"><i></i><i></i><i></i></div>
          <div class="orbit orbit-inner"><i></i><i></i></div>
          <div class="qi-core"><span class="core-rune">氣</span></div>
          <div class="energy-line line-one"></div>
          <div class="energy-line line-two"></div>
        </div>
        <div class="qi-readout">
          <span>家族靈氣</span>
          <strong id="qi-value">88</strong>
          <small><b id="qi-rate">+1.0</b> 靈氣 / 秒</small>
        </div>
        <button id="gather-btn" class="primary-button" type="button">
          <span class="button-shine"></span>
          ${icon('spark')}
          <span><strong>閉關修煉</strong><small>Gather Qi · 每次 +<b id="click-power">10</b></small></span>
          <kbd>SPACE</kbd>
        </button>
        <p class="action-hint">點擊或按下空白鍵凝聚天地靈氣</p>
      </article>

      <aside class="stats-column">
        <article class="panel family-panel">
          <div class="panel-heading">
            <div><p class="section-kicker">YUN CLAN</p><h2>雲氏家族</h2></div>
            <span class="rank-badge">九品仙族</span>
          </div>
          <div class="stat-list">
            <div class="stat-row">
              <span class="stat-icon jade">${icon('people')}</span>
              <span><small>家族成員</small><strong><b id="members-value">1</b> <i>人</i></strong></span>
              <span class="growth">靈氣產能主力</span>
            </div>
            <div class="stat-row">
              <span class="stat-icon gold">${icon('mountain')}</span>
              <span><small>老祖境界</small><strong id="realm-value">煉氣初期</strong></span>
              <span class="realm-dots" id="realm-dots" aria-hidden="true"></span>
            </div>
          </div>
          <div class="realm-progress">
            <div class="progress-label">
              <span>突破進度</span><span><b id="realm-progress-percent">0</b>%</span>
            </div>
            <div class="progress-track"><span id="realm-progress-bar"></span></div>
            <small>尚需 <b id="realm-remaining">512</b> 靈氣感悟天道</small>
          </div>
        </article>

        <article class="panel actions-panel">
          <div class="action-item">
            <div class="action-title">
              <span class="action-glyph">納</span>
              <span><strong>招募族人</strong><small>壯大家族，提升靈氣產出</small></span>
            </div>
            <button id="recruit-btn" class="secondary-button" type="button">
              <span>招募</span><b><i>◈</i> <span id="recruit-cost">80</span></b>
            </button>
          </div>
          <div class="action-divider"></div>
          <div class="action-item">
            <div class="action-title">
              <span class="action-glyph gold-glyph">破</span>
              <span><strong>老祖突破</strong><small>破境後覺醒一項家族天賦</small></span>
            </div>
            <button id="breakthrough-btn" class="secondary-button breakthrough-button" type="button">
              <span>突破</span><b><i>◈</i> <span id="breakthrough-cost">600</span></b>
            </button>
          </div>
        </article>
      </aside>
    </section>

    <section class="lower-grid">
      <article class="panel heritage-panel">
        <div class="panel-heading compact">
          <div class="heading-with-icon">
            <span class="title-icon">${icon('dna')}</span>
            <div><p class="section-kicker">FAMILY HERITAGE</p><h2>家族傳承</h2></div>
          </div>
          <span id="trait-count" class="count-badge">0 天賦</span>
        </div>
        <div id="trait-list" class="trait-list">
          <div class="empty-traits">
            <span class="empty-seal">承</span>
            <div><strong>血脈尚待覺醒</strong><p>老祖突破境界時，可擇一天賦傳予後世。</p></div>
          </div>
        </div>
      </article>

      <article class="panel chronicle-panel">
        <div class="panel-heading compact">
          <div class="heading-with-icon">
            <span class="title-icon scroll-icon">${icon('scroll')}</span>
            <div><p class="section-kicker">CLAN CHRONICLE</p><h2>家族紀事</h2></div>
          </div>
          <span class="live-badge"><i></i> 記錄中</span>
        </div>
        <div id="log-list" class="log-list" aria-live="polite"></div>
        <div class="log-fade"></div>
      </article>
    </section>

    <footer>
      <span>雲氏族訓</span><i></i><p>心如止水，行若驚雷；一人得道，福澤萬代。</p><i></i><span>第壹卷</span>
    </footer>
  </main>

  <div id="trait-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title" hidden>
    <div class="modal">
      <div class="modal-aura" aria-hidden="true"></div>
      <p class="modal-kicker">BLOODLINE AWAKENED</p>
      <div class="modal-seal">傳</div>
      <h2 id="trait-modal-title">血脈覺醒</h2>
      <p>老祖破境，天地賜福。請選擇一項天賦，銘刻於雲氏血脈之中。</p>
      <div id="trait-choices" class="trait-choices"></div>
      <small class="modal-note">天賦一經選定，將永世流傳</small>
    </div>
  </div>
`

const TRAITS = [
  { id: 'fertile', icon: '福', name: '多子多福', title: 'Prosperous Lineage', description: '招募族人的靈氣消耗降低 20%', effect: '招募成本 −20%' },
  { id: 'heaven-root', icon: '靈', name: '天靈根血脈', title: 'Celestial Spirit Root', description: '純淨靈根流傳後世，每位族人的基礎產氣提升 50%', effect: '族人產氣 +50%' },
  { id: 'diligence', icon: '勤', name: '勤能補拙', title: 'Enduring Resolve', description: '族人以勤補拙，閉關修煉所得靈氣翻倍', effect: '點擊靈氣 ×2' },
  { id: 'harmony', icon: '和', name: '和氣致祥', title: 'Household Harmony', description: '家族同心同德，招募成本額外降低 10%', effect: '招募成本 −10%' },
  { id: 'dao-heart', icon: '道', name: '玲瓏道心', title: 'Lucid Dao Heart', description: '對天道的感悟更敏銳，突破所需靈氣降低 15%', effect: '突破成本 −15%' },
  { id: 'spirit-vein', icon: '脈', name: '靈脈眷族', title: 'Blessed Spirit Vein', description: '祖地靈脈日益昌盛，全族產氣提升 25%', effect: '總產氣 +25%' },
  { id: 'meditation', icon: '定', name: '入定如淵', title: 'Profound Meditation', description: '閉關時心無旁騖，手動修煉所得再提升 50%', effect: '點擊靈氣 +50%' },
  { id: 'fortune', icon: '運', name: '紫氣東來', title: 'Auspicious Fortune', description: '祥瑞護佑家門，正面事件的收益提升 50%', effect: '福緣收益 +50%' },
  { id: 'guardian', icon: '守', name: '玄甲護族', title: 'Ancestral Guardian', description: '祖靈庇佑，突發事件造成的損失降低一半', effect: '災禍損失 −50%' },
  { id: 'insight', icon: '悟', name: '觸類旁通', title: 'Inherited Insight', description: '族人互相印證道法，每位族人額外產出 0.5 靈氣', effect: '每人產氣 +0.5' },
]

const REALMS = ['煉氣初期', '煉氣中期', '煉氣後期', '築基初期', '築基後期', '金丹初期', '金丹後期', '元嬰初期', '元嬰圓滿']
const GOOD_EVENTS = [
  { text: '家族子弟在後山發現百年靈芝！', qi: 500 },
  { text: '家族喜結良緣，枝繁葉茂！', members: 2 },
  { text: '雲海現出七彩祥瑞，族人頓有所悟！', qi: 320 },
  { text: '遠遊族人帶回一袋上品靈石！', qi: 260 },
]
const BAD_EVENTS = [
  { text: '敵對家族趁夜偷襲山門！', members: -1 },
  { text: '族人修煉不慎走火入魔！', qi: -200 },
  { text: '護山陣法出現裂隙，靈氣逸散！', qi: -150 },
  { text: '靈田遭遇罕見寒潮，收成受損！', qi: -120 },
]

const defaultState = {
  qi: 88,
  members: 1,
  realm: 0,
  traits: [],
  logs: [],
  startedAt: Date.now(),
  lastSavedAt: Date.now(),
}

const stored = localStorage.getItem('yun-clan-save')
let state
try {
  state = stored ? { ...defaultState, ...JSON.parse(stored) } : { ...defaultState }
} catch {
  state = { ...defaultState }
}

const $ = (selector) => document.querySelector(selector)
const refs = {
  qi: $('#qi-value'),
  qiRate: $('#qi-rate'),
  clickPower: $('#click-power'),
  members: $('#members-value'),
  realm: $('#realm-value'),
  realmHeader: $('#realm-header'),
  realmDots: $('#realm-dots'),
  progress: $('#realm-progress-bar'),
  progressPercent: $('#realm-progress-percent'),
  remaining: $('#realm-remaining'),
  recruitCost: $('#recruit-cost'),
  breakthroughCost: $('#breakthrough-cost'),
  recruitButton: $('#recruit-btn'),
  breakthroughButton: $('#breakthrough-btn'),
  gatherButton: $('#gather-btn'),
  traitList: $('#trait-list'),
  traitCount: $('#trait-count'),
  logList: $('#log-list'),
  modal: $('#trait-modal'),
  traitChoices: $('#trait-choices'),
  toastRegion: $('#toast-region'),
  year: $('#year'),
}

const hasTrait = (id) => state.traits.includes(id)
const formatNumber = (value) => {
  if (value < 1000) return Math.floor(value).toLocaleString('zh-Hant')
  const units = [['兆', 1e12], ['億', 1e8], ['萬', 1e4]]
  const unit = units.find(([, size]) => value >= size)
  if (!unit) return Math.floor(value).toLocaleString('zh-Hant')
  return `${(value / unit[1]).toFixed(value >= unit[1] * 100 ? 0 : 1)}${unit[0]}`
}

const getQiPerSecond = () => {
  let perMember = 1 + (hasTrait('insight') ? 0.5 : 0)
  if (hasTrait('heaven-root')) perMember *= 1.5
  let total = state.members * perMember * (1 + state.realm * 0.15)
  if (hasTrait('spirit-vein')) total *= 1.25
  return total
}

const getClickPower = () => {
  let power = 10
  if (hasTrait('diligence')) power *= 2
  if (hasTrait('meditation')) power *= 1.5
  return Math.round(power)
}

const getRecruitCost = () => {
  let cost = 80 * Math.pow(1.62, state.members - 1)
  if (hasTrait('fertile')) cost *= 0.8
  if (hasTrait('harmony')) cost *= 0.9
  return Math.max(20, Math.round(cost))
}

const getBreakthroughCost = () => {
  if (state.realm >= REALMS.length - 1) return Infinity
  let cost = 600 * Math.pow(3.2, state.realm)
  if (hasTrait('dao-heart')) cost *= 0.85
  return Math.round(cost)
}

const log = (message, type = 'normal') => {
  const entry = { message, type, time: new Date().toLocaleTimeString('zh-Hant', { hour: '2-digit', minute: '2-digit' }) }
  state.logs.unshift(entry)
  state.logs = state.logs.slice(0, 30)
  renderLogs()
}

const renderLogs = () => {
  refs.logList.innerHTML = state.logs.map((entry, index) => `
    <div class="log-entry ${entry.type}" style="--delay:${Math.min(index, 5) * 35}ms">
      <span class="log-time">${entry.time}</span><i></i><p>${entry.message}</p>
    </div>
  `).join('')
}

const renderTraits = () => {
  const active = state.traits.map((id) => TRAITS.find((trait) => trait.id === id)).filter(Boolean)
  refs.traitCount.textContent = `${active.length} 天賦`
  refs.traitList.innerHTML = active.length ? active.map((trait) => `
    <div class="active-trait">
      <span class="trait-rune">${trait.icon}</span>
      <span><small>${trait.title}</small><strong>${trait.name}</strong><p>${trait.effect}</p></span>
    </div>
  `).join('') : `
    <div class="empty-traits">
      <span class="empty-seal">承</span>
      <div><strong>血脈尚待覺醒</strong><p>老祖突破境界時，可擇一天賦傳予後世。</p></div>
    </div>
  `
}

const render = () => {
  const recruitCost = getRecruitCost()
  const breakthroughCost = getBreakthroughCost()
  const percent = Number.isFinite(breakthroughCost) ? Math.min(100, (state.qi / breakthroughCost) * 100) : 100
  refs.qi.textContent = formatNumber(state.qi)
  refs.qiRate.textContent = `+${getQiPerSecond().toFixed(1)}`
  refs.clickPower.textContent = getClickPower()
  refs.members.textContent = state.members
  refs.realm.textContent = REALMS[state.realm]
  refs.realmHeader.textContent = REALMS[state.realm]
  refs.progress.style.width = `${percent}%`
  refs.progressPercent.textContent = Math.floor(percent)
  refs.remaining.textContent = Number.isFinite(breakthroughCost) ? formatNumber(Math.max(0, breakthroughCost - state.qi)) : '0'
  refs.recruitCost.textContent = formatNumber(recruitCost)
  refs.breakthroughCost.textContent = Number.isFinite(breakthroughCost) ? formatNumber(breakthroughCost) : '圓滿'
  refs.recruitButton.disabled = state.qi < recruitCost
  refs.breakthroughButton.disabled = state.qi < breakthroughCost || !Number.isFinite(breakthroughCost)
  refs.realmDots.innerHTML = REALMS.slice(0, 5).map((_, index) => `<i class="${index <= Math.min(state.realm, 4) ? 'active' : ''}"></i>`).join('')
  const years = Math.max(1, Math.floor((Date.now() - state.startedAt) / 60000) + 1)
  refs.year.textContent = years === 1 ? '元年' : `${years}年`
}

const createFloatingText = (x, y, amount) => {
  const floater = document.createElement('span')
  floater.className = 'floating-qi'
  floater.textContent = `+${amount} Qi`
  floater.style.left = `${x}px`
  floater.style.top = `${y}px`
  document.body.appendChild(floater)
  floater.addEventListener('animationend', () => floater.remove())
}

const gatherQi = (event) => {
  if (refs.modal.hidden === false) return
  const amount = getClickPower()
  state.qi += amount
  const rect = refs.gatherButton.getBoundingClientRect()
  const x = event?.clientX || rect.left + rect.width / 2
  const y = event?.clientY || rect.top + rect.height / 2
  createFloatingText(x, y, amount)
  refs.gatherButton.classList.remove('is-pulsing')
  void refs.gatherButton.offsetWidth
  refs.gatherButton.classList.add('is-pulsing')
  render()
}

const recruit = () => {
  const cost = getRecruitCost()
  if (state.qi < cost) return
  state.qi -= cost
  state.members += 1
  log(`雲氏迎來一位新族人。家族現有 ${state.members} 人。`, 'good')
  render()
}

const getRandomTraits = () => [...TRAITS]
  .filter((trait) => !state.traits.includes(trait.id))
  .sort(() => Math.random() - 0.5)
  .slice(0, 3)

const openTraitModal = () => {
  const choices = getRandomTraits()
  refs.traitChoices.innerHTML = choices.map((trait) => `
    <button class="trait-choice" type="button" data-trait="${trait.id}">
      <span class="choice-rune">${trait.icon}</span>
      <small>${trait.title}</small><strong>${trait.name}</strong>
      <p>${trait.description}</p>
      <span class="choice-effect">${trait.effect}</span>
      <span class="choose-label">選擇此傳承 ${icon('chevron')}</span>
    </button>
  `).join('')
  refs.modal.hidden = false
  requestAnimationFrame(() => refs.modal.classList.add('visible'))
  refs.traitChoices.querySelector('.trait-choice')?.focus()
}

const selectTrait = (traitId) => {
  const trait = TRAITS.find((item) => item.id === traitId)
  if (!trait || state.traits.includes(traitId)) return
  state.traits.push(traitId)
  refs.modal.classList.remove('visible')
  setTimeout(() => { refs.modal.hidden = true }, 300)
  renderTraits()
  render()
  log(`血脈覺醒「${trait.name}」——${trait.effect}。`, 'heritage')
  showToast('血脈傳承', `${trait.name} · ${trait.effect}`, 'good')
  save()
}

const breakthrough = () => {
  const cost = getBreakthroughCost()
  if (state.qi < cost || !Number.isFinite(cost)) return
  state.qi -= cost
  state.realm += 1
  log(`老祖勘破玄關，成功踏入「${REALMS[state.realm]}」！`, 'breakthrough')
  render()
  openTraitModal()
}

const showToast = (title, message, type = 'good') => {
  const toast = document.createElement('div')
  toast.className = `event-toast ${type}`
  toast.innerHTML = `
    <span class="toast-icon">${type === 'good' ? '吉' : '劫'}</span>
    <span><small>${title}</small><strong>${message}</strong></span>
  `
  refs.toastRegion.appendChild(toast)
  requestAnimationFrame(() => toast.classList.add('show'))
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 400)
  }, 3000)
}

const triggerRandomEvent = () => {
  if (Math.random() > 0.5) return
  const good = Math.random() > 0.42
  const events = good ? GOOD_EVENTS : BAD_EVENTS
  const event = events[Math.floor(Math.random() * events.length)]
  let qiChange = event.qi || 0
  let memberChange = event.members || 0
  if (good && hasTrait('fortune')) {
    qiChange = Math.round(qiChange * 1.5)
    memberChange = Math.round(memberChange * 1.5)
  }
  if (!good && hasTrait('guardian')) {
    qiChange = Math.ceil(qiChange * 0.5)
    memberChange = Math.ceil(memberChange * 0.5)
  }
  state.qi = Math.max(0, state.qi + qiChange)
  state.members = Math.max(1, state.members + memberChange)
  const detail = qiChange
    ? `靈氣 ${qiChange > 0 ? '+' : '−'}${Math.abs(qiChange)}`
    : `族人 ${memberChange > 0 ? '+' : '−'}${Math.abs(memberChange)}`
  showToast(good ? '祥瑞降臨' : '突發劫難', `${event.text} ${detail}`, good ? 'good' : 'bad')
  log(`${event.text} ${detail}`, good ? 'event-good' : 'event-bad')
  render()
}

const scheduleEvent = () => {
  const delay = 15000 + Math.random() * 15000
  setTimeout(() => {
    triggerRandomEvent()
    scheduleEvent()
  }, delay)
}

const save = () => {
  state.lastSavedAt = Date.now()
  localStorage.setItem('yun-clan-save', JSON.stringify(state))
  const saveState = $('.save-state')
  saveState.textContent = '靈契已同步'
  saveState.classList.add('saved')
  setTimeout(() => saveState.classList.remove('saved'), 800)
}

refs.gatherButton.addEventListener('click', gatherQi)
refs.recruitButton.addEventListener('click', recruit)
refs.breakthroughButton.addEventListener('click', breakthrough)
refs.traitChoices.addEventListener('click', (event) => {
  const choice = event.target.closest('[data-trait]')
  if (choice) selectTrait(choice.dataset.trait)
})
$('#reset-btn').addEventListener('click', () => {
  if (!window.confirm('確定要斷開靈契，讓雲氏家族重新起步嗎？')) return
  localStorage.removeItem('yun-clan-save')
  window.location.reload()
})
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !event.repeat && event.target.tagName !== 'BUTTON') {
    event.preventDefault()
    gatherQi()
  }
})

if (stored) {
  const elapsed = Math.min(4 * 60 * 60, Math.max(0, (Date.now() - state.lastSavedAt) / 1000))
  const offlineQi = Math.floor(elapsed * getQiPerSecond())
  if (offlineQi > 0) {
    state.qi += offlineQi
    log(`靈契於離線期間自行運轉，積聚了 ${formatNumber(offlineQi)} 靈氣。`, 'good')
  } else {
    log('靈契重新連結，雲氏族運流轉如常。')
  }
} else {
  log('雲氏老祖於青嵐山開宗立族，長生之路自此而始。', 'heritage')
  log('點擊「閉關修煉」凝聚靈氣，或招募族人自動修行。')
}

renderTraits()
render()
let previousTick = performance.now()
setInterval(() => {
  const now = performance.now()
  const delta = Math.min(1, (now - previousTick) / 1000)
  previousTick = now
  state.qi += getQiPerSecond() * delta
  render()
}, 100)
setInterval(save, 5000)
window.addEventListener('beforeunload', save)
scheduleEvent()
