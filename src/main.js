import './style.css';

// ── Realm names ──
const REALMS = [
  '練氣一層', '練氣二層', '練氣三層', '練氣四層', '練氣五層',
  '築基初期', '築基中期', '築基後期',
  '金丹初期', '金丹中期', '金丹後期',
  '元嬰初期', '元嬰中期', '元嬰後期',
];

// ── Family Traits pool ──
const TRAIT_POOL = [
  {
    id: 'many-children',
    name: '多子多福',
    icon: '👶',
    effect: '招募族人費用 -20%',
    description: '子孫興旺，開枝散葉。',
    modifier: { recruitDiscount: 0.2 },
  },
  {
    id: 'spirit-root',
    name: '天靈根血脈',
    icon: '💎',
    effect: '族人每秒靈氣 +50%',
    description: '血脈中蘊含天靈根之力。',
    modifier: { memberQiBonus: 0.5 },
  },
  {
    id: 'diligence',
    name: '勤能補拙',
    icon: '✊',
    effect: '閉關修煉獲得 2x 靈氣',
    description: '勤修不輟，日積月累。',
    modifier: { clickMultiplier: 2 },
  },
  {
    id: 'ancestral-land',
    name: '萬年祖地',
    icon: '🏔️',
    effect: '被動靈氣產出 +30%',
    description: '祖地靈脈充沛，福澤後人。',
    modifier: { passiveBonus: 0.3 },
  },
  {
    id: 'treasure-path',
    name: '聚財之道',
    icon: '💰',
    effect: '突破所需靈氣 -15%',
    description: '善於經營，以財助道。',
    modifier: { breakthroughDiscount: 0.15 },
  },
  {
    id: 'guardian-array',
    name: '護族大陣',
    icon: '🛡️',
    effect: '族人數量不會低於 2',
    description: '護族法陣庇佑族人安危。',
    modifier: { minMembers: 2 },
  },
];

// ── Random Events ──
const GOOD_EVENTS = [
  { text: '家族子弟在後山發現百年靈芝！', qi: 500, members: 0 },
  { text: '家族喜結良緣！', qi: 0, members: 2 },
  { text: '路過散修贈送靈石！', qi: 300, members: 0 },
  { text: '祖地靈脈湧動，靈氣大增！', qi: 200, members: 0 },
  { text: '遠方親族前來投奔！', qi: 100, members: 1 },
  { text: '悟道石散發道韻，修為精進！', qi: 400, members: 0 },
];

const BAD_EVENTS = [
  { text: '敵對家族偷襲！', qi: 0, members: -1 },
  { text: '走火入魔！', qi: -200, members: 0 },
  { text: '靈田遭蟲害，靈氣流失！', qi: -150, members: 0 },
  { text: '族人外出歷練失蹤…', qi: 0, members: -1 },
  { text: '天雷誤劈藏寶閣！', qi: -300, members: 0 },
  { text: '心魔入侵，修煉受阻！', qi: -100, members: 0 },
];

// ── Game State ──
const state = {
  qi: 0,
  members: 1,
  ancestorLevel: 1,
  traits: [],
  recruitCost: 100,
  breakthroughCost: 100,
  pendingTraitChoice: false,
};

// ── DOM refs ──
const qiDisplay = document.getElementById('qi-display');
const membersDisplay = document.getElementById('members-display');
const levelDisplay = document.getElementById('level-display');
const qpsDisplay = document.getElementById('qps-display');
const gatherBtn = document.getElementById('gather-btn');
const recruitBtn = document.getElementById('recruit-btn');
const breakthroughBtn = document.getElementById('breakthrough-btn');
const gatherHint = document.getElementById('gather-hint');
const recruitHint = document.getElementById('recruit-hint');
const breakthroughHint = document.getElementById('breakthrough-hint');
const logBox = document.getElementById('log-box');
const heritageList = document.getElementById('heritage-list');
const traitModal = document.getElementById('trait-modal');
const traitChoices = document.getElementById('trait-choices');
const floatingLayer = document.getElementById('floating-text-layer');
const toastContainer = document.getElementById('toast-container');

// ── Trait modifier helpers ──
function getTraitModifier(key) {
  let total = 0;
  let hasGuardian = false;
  for (const trait of state.traits) {
    const def = TRAIT_POOL.find((t) => t.id === trait.id);
    if (!def) continue;
    if (key === 'recruitDiscount' && def.modifier.recruitDiscount) total += def.modifier.recruitDiscount;
    if (key === 'memberQiBonus' && def.modifier.memberQiBonus) total += def.modifier.memberQiBonus;
    if (key === 'passiveBonus' && def.modifier.passiveBonus) total += def.modifier.passiveBonus;
    if (key === 'breakthroughDiscount' && def.modifier.breakthroughDiscount) total += def.modifier.breakthroughDiscount;
    if (key === 'clickMultiplier' && def.modifier.clickMultiplier) total = def.modifier.clickMultiplier;
    if (key === 'minMembers' && def.modifier.minMembers) hasGuardian = true;
  }
  if (key === 'minMembers') return hasGuardian ? 2 : 1;
  if (key === 'clickMultiplier') return total || 1;
  return total;
}

function getBaseClickQi() {
  return 10 + state.ancestorLevel * 5;
}

function getClickQi() {
  return Math.floor(getBaseClickQi() * getTraitModifier('clickMultiplier'));
}

function getMemberQiPerSecond() {
  const base = state.members * 2;
  const bonus = 1 + getTraitModifier('memberQiBonus');
  const passiveBonus = 1 + getTraitModifier('passiveBonus');
  return base * bonus * passiveBonus;
}

function getRecruitCost() {
  const discount = 1 - getTraitModifier('recruitDiscount');
  return Math.floor(state.recruitCost * discount);
}

function getBreakthroughCost() {
  const discount = 1 - getTraitModifier('breakthroughDiscount');
  return Math.floor(state.breakthroughCost * discount);
}

function getRealmName() {
  const idx = Math.min(state.ancestorLevel - 1, REALMS.length - 1);
  return REALMS[idx];
}

// ── UI updates ──
function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 10_000) return (n / 1_000).toFixed(1) + 'K';
  return Math.floor(n).toLocaleString();
}

function updateUI() {
  qiDisplay.textContent = formatNumber(state.qi);
  membersDisplay.textContent = state.members;
  levelDisplay.textContent = getRealmName();
  qpsDisplay.textContent = formatNumber(getMemberQiPerSecond()) + '/s';

  gatherHint.textContent = `+${getClickQi()} Qi`;
  recruitHint.textContent = `${formatNumber(getRecruitCost())} Qi`;
  breakthroughHint.textContent = `${formatNumber(getBreakthroughCost())} Qi`;

  recruitBtn.disabled = state.qi < getRecruitCost();
  breakthroughBtn.disabled = state.qi < getBreakthroughCost() || state.pendingTraitChoice;
}

function addLog(message, type = 'system') {
  const p = document.createElement('p');
  p.className = `log-entry log-${type}`;
  const time = new Date().toLocaleTimeString('zh-Hant', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  p.textContent = `【${time}】${message}`;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}

function renderHeritage() {
  heritageList.innerHTML = '';
  if (state.traits.length === 0) {
    const li = document.createElement('li');
    li.className = 'heritage-empty';
    li.textContent = '尚無天賦傳承。老祖突破後可覺醒家族天賦。';
    heritageList.appendChild(li);
    return;
  }
  for (const trait of state.traits) {
    const def = TRAIT_POOL.find((t) => t.id === trait.id);
    if (!def) continue;
    const li = document.createElement('li');
    li.className = 'heritage-item';
    li.innerHTML = `
      <span class="heritage-item-icon">${def.icon}</span>
      <div>
        <div class="heritage-item-name">${def.name}</div>
        <div class="heritage-item-desc">${def.effect}</div>
      </div>
    `;
    heritageList.appendChild(li);
  }
}

// ── Floating text ──
function spawnFloatingText(x, y, text) {
  const el = document.createElement('span');
  el.className = 'floating-text';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  floatingLayer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ── Toast ──
function showToast(message, isGood) {
  const toast = document.createElement('div');
  toast.className = `toast ${isGood ? 'toast-good' : 'toast-bad'}`;
  toast.textContent = (isGood ? '✨ ' : '⚠️ ') + message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2700);
}

// ── Trait modal ──
function pickRandomTraits(count) {
  const available = TRAIT_POOL.filter(
    (t) => !state.traits.some((active) => active.id === t.id)
  );
  const pool = available.length >= count ? available : TRAIT_POOL;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function showTraitModal() {
  state.pendingTraitChoice = true;
  updateUI();

  const choices = pickRandomTraits(3);
  traitChoices.innerHTML = '';

  for (const trait of choices) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'trait-choice';
    btn.innerHTML = `
      <span class="trait-choice-name">${trait.icon} ${trait.name}</span>
      <span class="trait-choice-effect">${trait.effect}</span>
      <span class="trait-choice-desc">${trait.description}</span>
    `;
    btn.addEventListener('click', () => selectTrait(trait));
    traitChoices.appendChild(btn);
  }

  traitModal.classList.remove('hidden');
}

function selectTrait(trait) {
  state.traits.push({ id: trait.id, acquiredAt: Date.now() });
  state.pendingTraitChoice = false;
  traitModal.classList.add('hidden');

  addLog(`覺醒家族天賦「${trait.name}」— ${trait.effect}`, 'trait');
  renderHeritage();
  updateUI();
}

function hideTraitModal() {
  traitModal.classList.add('hidden');
}

// ── Actions ──
function gatherQi(e) {
  const amount = getClickQi();
  state.qi += amount;
  spawnFloatingText(e.clientX, e.clientY, `+${amount} Qi`);
  addLog(`老祖閉關修煉，獲得 ${amount} 靈氣。`);
  updateUI();
}

function recruitMember() {
  const cost = getRecruitCost();
  if (state.qi < cost) return;
  state.qi -= cost;
  state.members += 1;
  state.recruitCost = Math.floor(state.recruitCost * 1.5);
  addLog(`招募新族人，家族壯大至 ${state.members} 人！`, 'good');
  updateUI();
}

function breakthrough() {
  const cost = getBreakthroughCost();
  if (state.qi < cost || state.pendingTraitChoice) return;

  state.qi -= cost;
  state.ancestorLevel += 1;
  state.breakthroughCost = Math.floor(state.breakthroughCost * 2);

  addLog(`老祖突破至「${getRealmName()}」！天地為之一震！`, 'breakthrough');
  updateUI();
  showTraitModal();
}

// ── Random events ──
function applyEvent(event, isGood) {
  if (event.qi) state.qi = Math.max(0, state.qi + event.qi);
  if (event.members) {
    const minMembers = getTraitModifier('minMembers');
    state.members = Math.max(minMembers, state.members + event.members);
  }
  showToast(event.text + (event.qi ? ` Qi ${event.qi > 0 ? '+' : ''}${event.qi}` : '') + (event.members ? ` Members ${event.members > 0 ? '+' : ''}${event.members}` : ''), isGood);
  addLog(`突發事件：${event.text}`, isGood ? 'good' : 'bad');
  updateUI();
}

function triggerRandomEvent() {
  if (Math.random() > 0.5) return;

  const isGood = Math.random() > 0.4;
  const pool = isGood ? GOOD_EVENTS : BAD_EVENTS;
  const event = pool[Math.floor(Math.random() * pool.length)];
  applyEvent(event, isGood);
}

function scheduleNextEvent() {
  const delay = 15000 + Math.random() * 15000;
  setTimeout(() => {
    triggerRandomEvent();
    scheduleNextEvent();
  }, delay);
}

// ── Passive tick ──
function tick() {
  if (!state.pendingTraitChoice) {
    state.qi += getMemberQiPerSecond();
  }
  updateUI();
}

// ── Init ──
gatherBtn.addEventListener('click', gatherQi);
recruitBtn.addEventListener('click', recruitMember);
breakthroughBtn.addEventListener('click', breakthrough);

traitModal.querySelector('.modal-backdrop').addEventListener('click', () => {
  /* modal must be dismissed by choosing a trait */
});

renderHeritage();
updateUI();
setInterval(tick, 1000);
scheduleNextEvent();
