import './style.css'
import { createAudio } from './audio.js'
import { createVisualFx } from './fx.js'

const audio = createAudio()
const fx = createVisualFx()

const TRAITS = [
  {
    id: 'prosperity',
    icon: '囍',
    name: '多子多福',
    english: 'Abundant Descendants',
    description: '招募族人消耗降低 20%',
    modifier: 'Recruit cost −20%',
  },
  {
    id: 'heaven-root',
    icon: '靈',
    name: '天靈根血脈',
    english: 'Heavenly Spirit Root',
    description: '每位族人的基礎靈氣產量提升 50%',
    modifier: 'Member Qi +50%',
  },
  {
    id: 'diligence',
    icon: '勤',
    name: '勤能補拙',
    english: 'Diligence Prevails',
    description: '閉關修煉獲得雙倍靈氣',
    modifier: 'Gather Qi ×2',
  },
  {
    id: 'jade-bones',
    icon: '玉',
    name: '冰肌玉骨',
    english: 'Jade-Boned Lineage',
    description: '全族靈氣產量提升 25%',
    modifier: 'All Qi +25%',
  },
  {
    id: 'merchant',
    icon: '寶',
    name: '奇貨可居',
    english: 'Spirit Merchant',
    description: '招募費用增長速度降低 15%',
    modifier: 'Cost scaling −15%',
  },
  {
    id: 'ancestral',
    icon: '祖',
    name: '先祖庇佑',
    english: 'Ancestor’s Blessing',
    description: '突發事件的靈氣收益提升 50%',
    modifier: 'Event rewards +50%',
  },
]

const EVENTS = [
  { type: 'good', title: '仙草現世', text: '家族子弟在後山發現百年靈芝！', qi: 500, detail: '靈氣 +500' },
  { type: 'good', title: '天作之合', text: '家族喜結良緣，香火愈盛。', members: 2, detail: '族人 +2' },
  { type: 'good', title: '高人指點', text: '雲遊真人傳下一縷修行心得。', qi: 280, detail: '靈氣 +280' },
  { type: 'good', title: '靈脈湧動', text: '地底靈脈忽然復甦，滿院清輝。', qi: 800, detail: '靈氣 +800' },
  { type: 'bad', title: '外敵來襲', text: '敵對家族夜襲山門！', members: -1, detail: '族人 −1' },
  { type: 'bad', title: '走火入魔', text: '一名族人修行冒進，靈氣四散。', qi: -200, detail: '靈氣 −200' },
  { type: 'bad', title: '靈田歉收', text: '山中寒潮突至，靈植盡數凋零。', qi: -350, detail: '靈氣 −350' },
]

const STAGES = [
  '煉氣初期',
  '煉氣中期',
  '煉氣後期',
  '築基初期',
  '築基中期',
  '築基後期',
  '金丹初期',
  '金丹中期',
  '金丹後期',
  '元嬰初期',
]

const state = {
  qi: 680,
  members: 6,
  realm: 0,
  traits: [],
  logs: [
    { time: '辰時', text: '青嵐世家於蒼梧山立下道統。', tone: 'gold' },
    { time: '巳時', text: '靈脈運轉穩定，族人開始吐納。', tone: 'jade' },
  ],
  eventCountdown: 0,
}

const hasTrait = (id) => state.traits.includes(id)
const clickYield = () => 10 * (hasTrait('diligence') ? 2 : 1)
const qiRate = () => {
  const rootBonus = hasTrait('heaven-root') ? 1.5 : 1
  const familyBonus = hasTrait('jade-bones') ? 1.25 : 1
  return state.members * rootBonus * familyBonus
}
const recruitCost = () => {
  const scaling = hasTrait('merchant') ? 1.2975 : 1.35
  const discount = hasTrait('prosperity') ? 0.8 : 1
  return Math.round(80 * scaling ** (state.members - 1) * discount)
}
const breakthroughCost = () => Math.round(500 * 2.15 ** state.realm)
const formatNumber = (value) => new Intl.NumberFormat('zh-Hant', {
  maximumFractionDigits: value < 100 ? 1 : 0,
}).format(value)

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
    <a class="brand" href="#" aria-label="青嵐世家首頁">
      <span class="brand-seal">嵐</span>
      <span class="brand-copy">
        <strong>青嵐世家</strong>
        <small>CULTIVATION FAMILY</small>
      </span>
    </a>
    <div class="topbar-end">
      <button
        type="button"
        class="music-toggle"
        id="music-toggle"
        aria-pressed="false"
        title="坂本龍一風格原創鋼琴曲《關注塔菲貓》。點擊後播放。"
      >
        🎹 關注塔菲貓
      </button>
      <div class="world-state">
        <span class="pulse-dot"></span>
        <span>靈脈穩定</span>
        <i></i>
        <span>玄元曆 146 年</span>
      </div>
    </div>
  </header>

  <main class="game-shell">
    <section class="hero-heading">
      <div>
        <span class="eyebrow">蒼梧山 · 青嵐血脈</span>
        <h1>一脈承仙途，<em>百世鑄道統</em></h1>
        <p>引天地之靈氣，興家族之氣運。你的每一次抉擇，都將流傳於後世。</p>
      </div>
      <div class="fortune-mark" aria-label="家族氣運昌盛">
        <span>家族氣運</span>
        <strong>昌盛</strong>
      </div>
    </section>

    <div class="dashboard-grid">
      <aside class="left-column">
        <section class="panel stats-panel">
          <div class="panel-heading">
            <span>
              <small>FAMILY LEDGER</small>
              <h2>家族總覽</h2>
            </span>
            <span class="live-badge">生生不息</span>
          </div>

          <div class="stat-card qi-stat">
            <span class="stat-icon">氣</span>
            <div>
              <small>天地靈氣</small>
              <strong id="qi-value">0</strong>
              <span><b>↗</b> <span id="qi-rate">0</span> / 秒</span>
            </div>
          </div>
          <div class="stat-card">
            <span class="stat-icon member-icon">族</span>
            <div>
              <small>家族族人</small>
              <strong><span id="member-value">0</span><i>位</i></strong>
              <span>同心修煉，共築仙途</span>
            </div>
          </div>

          <div class="realm-block">
            <div class="realm-label">
              <span><small>老祖境界</small><strong id="realm-name">煉氣初期</strong></span>
              <span id="realm-progress-label">0 / 0</span>
            </div>
            <div class="progress-track"><span id="realm-progress"></span></div>
            <p>突破後可覺醒一項家族傳承</p>
          </div>
        </section>

        <section class="panel actions-panel">
          <div class="section-title">
            <span>◈</span><h2>家族經營</h2><i></i>
          </div>
          <button id="recruit-button" class="game-button secondary-button" type="button">
            <span class="button-glyph">人</span>
            <span><strong>招募族人</strong><small>延續香火，壯大家族</small></span>
            <span class="cost"><b id="recruit-cost">0</b><small>靈氣</small></span>
          </button>
          <button id="breakthrough-button" class="game-button gold-button" type="button">
            <span class="button-glyph">境</span>
            <span><strong>老祖突破</strong><small id="breakthrough-hint">衝擊下一境界</small></span>
            <span class="cost"><b id="breakthrough-cost">0</b><small>靈氣</small></span>
          </button>
        </section>
      </aside>

      <section class="cultivation-stage">
        <div class="stage-header">
          <span></span>
          <div><small>SPIRIT NEXUS</small><h2>家族靈樞</h2></div>
          <span></span>
        </div>

        <div class="nexus-wrap">
          <div class="orbit orbit-outer"><i></i><i></i><i></i></div>
          <div class="orbit orbit-inner"></div>
          <button id="gather-button" class="qi-orb" type="button" aria-label="閉關修煉，凝聚靈氣">
            <span class="orb-aura"></span>
            <span class="orb-rune">炁</span>
            <span class="orb-copy"><strong>閉關修煉</strong><small>GATHER QI</small></span>
          </button>
          <span class="nexus-particle particle-one"></span>
          <span class="nexus-particle particle-two"></span>
          <span class="nexus-particle particle-three"></span>
        </div>
        <p class="gather-message">點擊靈樞凝聚 <strong id="click-yield">+10</strong> 靈氣</p>
        <span class="meditation-note">「 心若止水，氣自歸元 」</span>
      </section>

      <aside class="right-column">
        <section class="panel heritage-panel">
          <div class="panel-heading">
            <span>
              <small>FAMILY HERITAGE</small>
              <h2>家族傳承</h2>
            </span>
            <span class="dna-mark">⌘</span>
          </div>
          <div id="trait-list" class="trait-list"></div>
          <div id="empty-traits" class="empty-traits">
            <span class="empty-seal">承</span>
            <strong>傳承尚未覺醒</strong>
            <p>老祖突破境界時，可從三項家族天賦中擇一，福澤後世。</p>
          </div>
        </section>

        <section class="panel log-panel">
          <div class="log-heading">
            <span><i></i><strong>家族志</strong><small>CLAN CHRONICLE</small></span>
            <span class="log-live"><i></i> 載錄中</span>
          </div>
          <div id="log-list" class="log-list"></div>
          <div class="scroll-end"><i></i><span>卷</span><i></i></div>
        </section>

        <div class="omen-timer">
          <span>✦</span>
          <p><small>天機流轉</small><strong id="event-timer">下一次天象：-- 秒</strong></p>
        </div>
      </aside>
    </div>
  </main>

  <footer>
    <span>青嵐家訓</span>
    <p>修身 · 齊家 · 問道 · 長生</p>
    <span>BGM《關注塔菲貓》· 坂本風</span>
  </footer>

  <div id="trait-modal" class="modal-backdrop" aria-hidden="true">
    <div class="trait-modal" role="dialog" aria-modal="true" aria-labelledby="trait-modal-title">
      <div class="modal-glow"></div>
      <span class="modal-seal">脈</span>
      <small>ANCESTRAL AWAKENING</small>
      <h2 id="trait-modal-title">血脈覺醒</h2>
      <p>老祖踏入新境，冥冥中三道傳承顯現。<br />擇其一，福澤青嵐後世。</p>
      <div id="trait-choices" class="trait-choices"></div>
      <span class="modal-footnote">此選擇將永久銘刻於族譜</span>
    </div>
  </div>
`

const elements = {
  qi: document.querySelector('#qi-value'),
  qiRate: document.querySelector('#qi-rate'),
  members: document.querySelector('#member-value'),
  realm: document.querySelector('#realm-name'),
  realmProgress: document.querySelector('#realm-progress'),
  realmProgressLabel: document.querySelector('#realm-progress-label'),
  recruitCost: document.querySelector('#recruit-cost'),
  breakthroughCost: document.querySelector('#breakthrough-cost'),
  breakthroughHint: document.querySelector('#breakthrough-hint'),
  clickYield: document.querySelector('#click-yield'),
  recruitButton: document.querySelector('#recruit-button'),
  breakthroughButton: document.querySelector('#breakthrough-button'),
  gatherButton: document.querySelector('#gather-button'),
  traitList: document.querySelector('#trait-list'),
  emptyTraits: document.querySelector('#empty-traits'),
  logList: document.querySelector('#log-list'),
  modal: document.querySelector('#trait-modal'),
  choices: document.querySelector('#trait-choices'),
  toastRegion: document.querySelector('#toast-region'),
  eventTimer: document.querySelector('#event-timer'),
  musicToggle: document.querySelector('#music-toggle'),
}

function timeLabel() {
  return new Intl.DateTimeFormat('zh-Hant', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

function addLog(text, tone = '') {
  state.logs.unshift({ time: timeLabel(), text, tone })
  state.logs = state.logs.slice(0, 10)
  renderLog()
}

function renderLog() {
  elements.logList.innerHTML = state.logs.map((item) => `
    <div class="log-entry ${item.tone}">
      <time>${item.time}</time>
      <span>${item.text}</span>
    </div>
  `).join('')
}

function renderTraits() {
  elements.emptyTraits.hidden = state.traits.length > 0
  elements.traitList.innerHTML = state.traits.map((traitId) => {
    const trait = TRAITS.find((item) => item.id === traitId)
    return `
      <div class="active-trait">
        <span>${trait.icon}</span>
        <div><strong>${trait.name}</strong><small>${trait.modifier}</small></div>
      </div>
    `
  }).join('')
}

function render() {
  const cost = breakthroughCost()
  const atMaxRealm = state.realm >= STAGES.length - 1
  elements.qi.textContent = formatNumber(state.qi)
  elements.qiRate.textContent = formatNumber(qiRate())
  elements.members.textContent = formatNumber(state.members)
  elements.realm.textContent = STAGES[Math.min(state.realm, STAGES.length - 1)]
  elements.realmProgressLabel.textContent = atMaxRealm
    ? '道心圓滿'
    : `${formatNumber(Math.min(state.qi, cost))} / ${formatNumber(cost)}`
  elements.realmProgress.style.width = atMaxRealm ? '100%' : `${Math.min((state.qi / cost) * 100, 100)}%`
  elements.recruitCost.textContent = formatNumber(recruitCost())
  elements.breakthroughCost.textContent = atMaxRealm ? '—' : formatNumber(cost)
  elements.breakthroughHint.textContent = atMaxRealm ? '此界已臻圓滿' : `衝擊 ${STAGES[state.realm + 1]}`
  elements.clickYield.textContent = `+${formatNumber(clickYield())}`
  elements.recruitButton.disabled = state.qi < recruitCost()
  elements.breakthroughButton.disabled = atMaxRealm || state.qi < cost
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

function pickTraitChoices() {
  const available = TRAITS.filter((trait) => !state.traits.includes(trait.id))
  const pool = available.length >= 3 ? available : TRAITS
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3)
}

function openTraitModal() {
  const choices = pickTraitChoices()
  elements.choices.innerHTML = choices.map((trait) => `
    <button class="trait-choice" type="button" data-trait="${trait.id}">
      <span class="choice-icon">${trait.icon}</span>
      <small>${trait.english}</small>
      <strong>${trait.name}</strong>
      <p>${trait.description}</p>
      <i>${trait.modifier}</i>
      <b>選擇此傳承 <span>→</span></b>
    </button>
  `).join('')
  elements.modal.classList.add('visible')
  elements.modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
  elements.choices.querySelector('button')?.focus()
}

function chooseTrait(traitId) {
  const trait = TRAITS.find((item) => item.id === traitId)
  if (!trait) return
  if (!state.traits.includes(traitId)) state.traits.push(traitId)
  elements.modal.classList.remove('visible')
  elements.modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
  addLog(`血脈覺醒「${trait.name}」，${trait.description}。`, 'gold')
  showToast({
    type: 'heritage',
    title: '家族傳承已覺醒',
    text: trait.name,
    detail: trait.modifier,
  })
  renderTraits()
  render()
}

function showToast(event) {
  const toast = document.createElement('div')
  toast.className = `event-toast ${event.type}`
  toast.innerHTML = `
    <span class="toast-icon">${event.type === 'bad' ? '厄' : event.type === 'heritage' ? '脈' : '吉'}</span>
    <div>
      <small>${event.type === 'bad' ? 'UNEXPECTED TRIBULATION' : 'AUSPICIOUS OMEN'}</small>
      <strong>${event.title}</strong>
      <p>${event.text} <b>${event.detail}</b></p>
    </div>
    <span class="toast-timer"></span>
  `
  elements.toastRegion.append(toast)
  window.setTimeout(() => toast.classList.add('leaving'), 3000)
  window.setTimeout(() => toast.remove(), 3450)
}

function triggerRandomEvent(force = false) {
  if (!force && Math.random() > 0.5) {
    addLog('天機掠過，一夜無事，族人修行如常。')
    return
  }
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)]
  const eventQiBonus = hasTrait('ancestral') && event.qi > 0 ? 1.5 : 1
  if (event.qi) state.qi = Math.max(0, state.qi + event.qi * eventQiBonus)
  if (event.members) state.members = Math.max(1, state.members + event.members)
  const detail = event.qi > 0 && eventQiBonus > 1
    ? `靈氣 +${formatNumber(event.qi * eventQiBonus)}`
    : event.detail
  audio.playEvent(event.type !== 'bad')
  showToast({ ...event, detail })
  addLog(`${event.title}：${event.text}（${detail}）`, event.type === 'bad' ? 'danger' : 'jade')
  render()
}

function scheduleEvent() {
  state.eventCountdown = Math.floor(15 + Math.random() * 16)
  elements.eventTimer.textContent = `下一次天象：${state.eventCountdown} 秒`
}

elements.gatherButton.addEventListener('click', (event) => {
  const amount = clickYield()
  state.qi += amount
  const { x, y } = pointerPoint(event)
  floatingQi(x, y, amount)
  fx.burst(x, y)
  audio.playQing()
  pressEffect(elements.gatherButton)
  render()
})

elements.recruitButton.addEventListener('click', () => {
  const cost = recruitCost()
  if (state.qi < cost) return
  state.qi -= cost
  state.members += 1
  audio.playRise()
  pressEffect(elements.recruitButton)
  addLog(`一名懷有靈根的後輩歸入族譜。族人增至 ${state.members} 位。`, 'jade')
  render()
})

elements.breakthroughButton.addEventListener('click', () => {
  const cost = breakthroughCost()
  if (state.qi < cost || state.realm >= STAGES.length - 1) return
  state.qi -= cost
  state.realm += 1
  const nextRealm = STAGES[state.realm]
  audio.playRise()
  if (/金丹|元嬰/.test(nextRealm)) {
    fx.flashScreen()
  }
  pressEffect(elements.breakthroughButton)
  addLog(`老祖破境成功，踏入「${nextRealm}」！`, 'gold')
  render()
  window.setTimeout(openTraitModal, 350)
})

document.addEventListener('pointerdown', () => {
  audio.unlock()
}, { once: true })

elements.musicToggle.addEventListener('click', async () => {
  const on = await audio.setMusic(!audio.isMusicOn())
  elements.musicToggle.setAttribute('aria-pressed', String(on))
  elements.musicToggle.classList.toggle('is-on', on)
  elements.musicToggle.textContent = on ? '🎹 塔菲貓播放中' : '🔇 關注塔菲貓'
})

elements.choices.addEventListener('click', (event) => {
  const choice = event.target.closest('[data-trait]')
  if (choice) chooseTrait(choice.dataset.trait)
})

window.setInterval(() => {
  state.qi += qiRate() / 4
  render()
}, 250)

window.setInterval(() => {
  state.eventCountdown -= 1
  if (state.eventCountdown <= 0) {
    triggerRandomEvent()
    scheduleEvent()
  } else {
    elements.eventTimer.textContent = `下一次天象：${state.eventCountdown} 秒`
  }
}, 1000)

// Public verification hook; gameplay still uses the full random event cadence.
window.__cultivationFamily = { triggerRandomEvent: () => triggerRandomEvent(true), state }

document.addEventListener('pointerdown', () => {
  audio.unlock()
}, { once: true })

renderLog()
renderTraits()
render()
scheduleEvent()
