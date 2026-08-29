export const STAGES = [
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

export const TRAITS = [
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

export const ROOTS = [
  { id: 'metal', name: '金靈根', hue: '#d7ae5b' },
  { id: 'wood', name: '木靈根', hue: '#77c59c' },
  { id: 'water', name: '水靈根', hue: '#7eb4d4' },
  { id: 'fire', name: '火靈根', hue: '#d48a6a' },
  { id: 'earth', name: '土靈根', hue: '#c4a574' },
  { id: 'heaven', name: '天靈根', hue: '#f3d591' },
  { id: 'mixed', name: '雜靈根', hue: '#8a9a90' },
]

export const NATURES = [
  { id: 'diligent', name: '勤懇', weights: { cultivate: 3.2, study: 1.4, rest: 0.6, adventure: 0.5 } },
  { id: 'ambitious', name: '野心', weights: { cultivate: 1.4, adventure: 2.4, study: 1.2, trade: 0.8 } },
  { id: 'kind', name: '仁善', weights: { social: 2.6, alchemy: 1.3, rest: 1.1, adventure: 0.5 } },
  { id: 'pride', name: '傲骨', weights: { adventure: 2.2, study: 1.4, social: 0.5, trade: 0.6 } },
  { id: 'greed', name: '貪婪', weights: { trade: 2.8, adventure: 1.5, cultivate: 0.7, social: 0.6 } },
  { id: 'caution', name: '謹慎', weights: { rest: 1.8, study: 1.8, cultivate: 1.4, adventure: 0.35 } },
  { id: 'passion', name: '多情', weights: { social: 3.1, trade: 1.1, cultivate: 0.8, adventure: 0.7 } },
  { id: 'demon', name: '魔心', weights: { adventure: 2.3, trade: 1.3, social: 0.4, cultivate: 1.1 } },
]

export const TECHNIQUES = [
  '青嵐吐納訣',
  '蒼梧劍意',
  '雲水心經',
  '焚天掌印',
  '厚土養氣章',
  '百草丹經',
  '問雪無痕步',
]

export const REGIONS = [
  { id: 'nexus', name: '靈樞', hint: '吐納' },
  { id: 'peak', name: '後山', hint: '歷練' },
  { id: 'alchemy', name: '丹房', hint: '煉丹' },
  { id: 'library', name: '藏經閣', hint: '參悟' },
  { id: 'gate', name: '山門', hint: '論道' },
  { id: 'market', name: '雲市', hint: '交易' },
]

export const ACTIONS = {
  cultivate: { label: '吐納修煉', region: 'nexus' },
  adventure: { label: '後山歷練', region: 'peak' },
  alchemy: { label: '煉製丹藥', region: 'alchemy' },
  study: { label: '參悟功法', region: 'library' },
  social: { label: '論道交心', region: 'gate' },
  trade: { label: '雲市交易', region: 'market' },
  rest: { label: '調息養傷', region: 'nexus' },
}

const SURNAMES = ['青', '沈', '葉', '白', '蒼', '嵐', '蘇', '江', '陸', '謝', '韓', '顧']
const GIVEN = ['玄機', '清梧', '疏影', '無塵', '小魚', '七七', '問雪', '承光', '靈犀', '墨白', '青棠', '遠山', '晚晴', '折竹', '聽潮']
const ARTIFACTS = ['青鋒殘劍', '避水珠', '聚氣戒', '蒼梧令', '問心鏡', '焚香爐', '靈犀簪']
const MONTHS = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']

const OMEN_EVENTS = [
  { type: 'good', title: '仙草現世', text: '後山現百年靈芝，靈樞為之一振。', qi: 500 },
  { type: 'good', title: '天作之合', text: '一門親事說成，香火又盛一分。', members: 1 },
  { type: 'good', title: '高人指點', text: '雲遊真人路過，留下一縷修行心得。', qi: 280 },
  { type: 'good', title: '靈脈湧動', text: '地底靈脈復甦，滿院清輝。', qi: 800 },
  { type: 'bad', title: '外敵來襲', text: '敵對家族夜襲山門。', members: -1 },
  { type: 'bad', title: '走火入魔', text: '有人修行冒進，心魔趁虛而入。', qi: -200 },
  { type: 'bad', title: '靈田歉收', text: '山中寒潮突至，靈植凋零。', qi: -350 },
]

let nextId = 1
const uid = () => `c${nextId++}`
const pick = (list) => list[Math.floor(Math.random() * list.length)]
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))

export const formatNumber = (value) => new Intl.NumberFormat('zh-Hant', {
  maximumFractionDigits: value < 100 ? 1 : 0,
}).format(value)

export const hasTrait = (world, id) => world.traits.includes(id)
export const living = (world) => world.people.filter((p) => p.alive)
export const selected = (world) => world.people.find((p) => p.id === world.selectedId) || living(world)[0]

export function lifespanFor(realm) {
  return 90 + realm * 36
}

export function clickYield(world) {
  return 10 * (hasTrait(world, 'diligence') ? 2 : 1)
}

export function qiRate(world) {
  const rootBonus = hasTrait(world, 'heaven-root') ? 1.5 : 1
  const familyBonus = hasTrait(world, 'jade-bones') ? 1.25 : 1
  const cultivating = living(world).filter((p) => p.action === 'cultivate').length
  const idle = Math.max(1, living(world).length * 0.35)
  return (cultivating * 1.8 + idle) * rootBonus * familyBonus
}

export function recruitCost(world) {
  const scaling = hasTrait(world, 'merchant') ? 1.2975 : 1.35
  const discount = hasTrait(world, 'prosperity') ? 0.8 : 1
  return Math.round(80 * scaling ** Math.max(0, living(world).length - 1) * discount)
}

export function breakthroughCost(world) {
  return Math.round(500 * 2.15 ** world.patriarchRealm)
}

export function calendarLabel(world) {
  return `玄元曆 ${world.year} 年${MONTHS[world.month]}月`
}

function uniqueName(world) {
  const used = new Set(world.people.map((p) => p.name))
  for (let i = 0; i < 40; i += 1) {
    const name = `${pick(SURNAMES)}${pick(GIVEN)}`
    if (!used.has(name)) return name
  }
  return `${pick(SURNAMES)}${pick(GIVEN)}${world.people.length}`
}

function makePerson(world, preset = {}) {
  const nature = preset.nature || pick(NATURES.filter((n) => n.id !== 'demon' || Math.random() > 0.82))
  const root = preset.root || pick(ROOTS.slice(0, 6).concat(Math.random() > 0.88 ? [ROOTS[5]] : [ROOTS[6]]))
  const realm = preset.realm ?? Math.floor(Math.random() * 3)
  const person = {
    id: preset.id || uid(),
    name: preset.name || uniqueName(world),
    role: preset.role || 'disciple',
    root,
    nature,
    technique: preset.technique || pick(TECHNIQUES),
    realm,
    personalQi: preset.personalQi ?? Math.round(20 + Math.random() * 80),
    age: preset.age ?? 16 + Math.floor(Math.random() * 28),
    lifespan: preset.lifespan ?? lifespanFor(realm),
    mood: preset.mood ?? 10 + Math.floor(Math.random() * 30),
    hp: 100,
    bonds: {},
    location: preset.location || 'nexus',
    action: preset.action || 'cultivate',
    lockedAction: null,
    thought: preset.thought || '山門初立，心緒未定。',
    memory: [],
    nickname: preset.nickname || '',
    pills: 0,
    artifacts: preset.artifacts || [],
    alive: true,
  }
  return person
}

function remember(person, line) {
  person.memory.unshift(line)
  person.memory = person.memory.slice(0, 4)
}

function think(person, line) {
  person.thought = line
  remember(person, line)
}

function chooseAction(person) {
  if (person.hp < 42) return 'rest'
  if (person.lockedAction) {
    const forced = person.lockedAction
    person.lockedAction = null
    return forced
  }
  const weights = { ...person.nature.weights }
  if (person.mood < -20) weights.rest = (weights.rest || 1) + 1.6
  if (person.personalQi > 70 + person.realm * 18) weights.cultivate = (weights.cultivate || 1) + 1.2
  const entries = Object.entries(weights)
  const total = entries.reduce((sum, [, w]) => sum + w, 0)
  let roll = Math.random() * total
  for (const [action, weight] of entries) {
    roll -= weight
    if (roll <= 0) return action
  }
  return 'cultivate'
}

function otherLiving(world, person) {
  return living(world).filter((p) => p.id !== person.id)
}

function shiftBond(a, b, delta) {
  a.bonds[b.id] = clamp((a.bonds[b.id] || 0) + delta, -100, 100)
  b.bonds[a.id] = clamp((b.bonds[a.id] || 0) + delta * 0.85, -100, 100)
}

function notableBond(person, world) {
  const entries = Object.entries(person.bonds)
  if (!entries.length) return '尚無深交'
  entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
  const [id, value] = entries[0]
  const other = world.people.find((p) => p.id === id)
  if (!other) return '尚無深交'
  if (value >= 35) return `與${other.name}交好`
  if (value <= -35) return `與${other.name}交惡`
  return `與${other.name}相識`
}

function resolveAction(world, person, reports) {
  const rootBoost = person.root.id === 'heaven' ? 1.6 : person.root.id === 'mixed' ? 0.75 : 1
  const familyBoost = (hasTrait(world, 'heaven-root') ? 1.5 : 1) * (hasTrait(world, 'jade-bones') ? 1.25 : 1)

  if (person.action === 'cultivate') {
    const gain = (8 + person.realm * 3) * rootBoost * familyBoost
    person.personalQi += gain
    world.qi += gain * 0.45
    person.mood += 2
    if (Math.random() < 0.22) {
      think(person, `${person.name}於靈樞吐納，只覺${person.root.name}隱隱共鳴。`)
    } else {
      person.thought = `${person.name}閉目調息，一呼一吸皆在青嵐之中。`
    }
    if (person.personalQi > 85 + person.realm * 22 && person.realm < STAGES.length - 1 && Math.random() < 0.28) {
      attemptRealm(world, person, reports, 0.62)
    }
    return
  }

  if (person.action === 'adventure') {
    const roll = Math.random()
    if (roll < 0.42) {
      const loot = pick(ARTIFACTS)
      if (!person.artifacts.includes(loot)) person.artifacts.push(loot)
      world.qi += 90
      world.karma += 1
      think(person, `${person.name}於後山得「${loot}」，喜不自勝。`)
      reports.push({ text: `${person.name}後山歷練，覓得${loot}。`, tone: 'jade' })
      if (!person.nickname && Math.random() < 0.4) {
        person.nickname = pick(['青嵐遊俠', '後山夜行', '尋寶散人', '蒼梧獵手'])
        reports.push({ text: `江湖開始稱${person.name}為「${person.nickname}」。`, tone: 'gold' })
      }
    } else if (roll < 0.7) {
      person.hp -= 18 + Math.floor(Math.random() * 16)
      person.mood -= 8
      think(person, `${person.name}遇着猛獸機關，帶傷而返。`)
      reports.push({ text: `${person.name}歷練受挫，帶傷回山。`, tone: 'danger' })
    } else {
      person.personalQi += 12
      think(person, `${person.name}在後山走了一遭，收獲平平，心卻定了些。`)
    }
    return
  }

  if (person.action === 'alchemy') {
    if (Math.random() < 0.55) {
      person.pills += 1
      world.qi += 40
      think(person, `${person.name}煉成一枚養氣丹，丹香滿室。`)
      reports.push({ text: `${person.name}於丹房煉成養氣丹。`, tone: 'jade' })
    } else {
      person.hp -= 8
      think(person, `${person.name}火候偏差，丹爐一震，只得作罷。`)
    }
    return
  }

  if (person.action === 'study') {
    person.personalQi += 6 * rootBoost
    if (Math.random() < 0.18) {
      person.technique = pick(TECHNIQUES)
      think(person, `${person.name}於藏經閣改修《${person.technique}》。`)
      reports.push({ text: `${person.name}改修功法《${person.technique}》。`, tone: 'gold' })
    } else {
      think(person, `${person.name}反覆推演《${person.technique}》，隱有所得。`)
    }
    return
  }

  if (person.action === 'social') {
    const peers = otherLiving(world, person)
    if (!peers.length) return
    const other = pick(peers)
    const warmth = person.nature.id === 'demon' || other.nature.id === 'demon' ? -18 : 14
    const swing = warmth + Math.floor(Math.random() * 10) - 4
    shiftBond(person, other, swing)
    if (swing > 0) {
      think(person, `${person.name}與${other.name}月下論道，頗為投契。`)
      if ((person.bonds[other.id] || 0) > 55 && Math.random() < 0.35) {
        reports.push({ text: `${person.name}與${other.name}結為道友，約共證長生。`, tone: 'jade' })
      }
    } else {
      think(person, `${person.name}與${other.name}言語不合，各懷心事。`)
      if ((person.bonds[other.id] || 0) < -50 && Math.random() < 0.4) {
        person.hp -= 12
        other.hp -= 12
        reports.push({ text: `${person.name}與${other.name}山門內鬥，拳腳相向。`, tone: 'danger' })
      }
    }
    return
  }

  if (person.action === 'trade') {
    const gain = Math.round((40 + Math.random() * 160) * (person.nature.id === 'greed' ? 1.4 : 1))
    const curse = Math.random() < 0.18
    if (curse) {
      world.qi = Math.max(0, world.qi - 70)
      person.mood -= 6
      think(person, `${person.name}在雲市被人坑了一筆靈石。`)
      reports.push({ text: `${person.name}雲市折本而歸。`, tone: 'danger' })
    } else {
      world.qi += gain
      world.karma += Math.random() < 0.25 ? 1 : 0
      think(person, `${person.name}以物易物，為家族帶回靈石。`)
    }
    return
  }

  person.hp = clamp(person.hp + 22, 0, 100)
  person.mood += 6
  if (person.pills > 0 && person.hp < 80) {
    person.pills -= 1
    person.hp = clamp(person.hp + 18, 0, 100)
    person.personalQi += 8
    think(person, `${person.name}服下養氣丹，傷勢漸穩。`)
  } else {
    think(person, `${person.name}靜室調息，把心火慢慢壓了下去。`)
  }
}

function attemptRealm(world, person, reports, chance) {
  if (person.realm >= STAGES.length - 1) return false
  const pillBoost = person.pills > 0 ? 0.12 : 0
  if (person.pills > 0) person.pills -= 1
  if (Math.random() < chance + pillBoost) {
    person.realm += 1
    person.personalQi = 12
    person.lifespan = Math.max(person.lifespan, lifespanFor(person.realm))
    const stage = STAGES[person.realm]
    think(person, `${person.name}突破至「${stage}」，天地為之側目。`)
    reports.push({
      text: `${person.name}破境成功，踏入「${stage}」。`,
      tone: 'gold',
      flash: /金丹|元嬰/.test(stage),
      toast: { type: 'heritage', title: '族人破境', text: person.name, detail: stage },
    })
    if (person.role === 'patriarch') world.patriarchRealm = person.realm
    return true
  }
  person.hp -= 24
  person.mood -= 14
  person.personalQi *= 0.55
  think(person, `${person.name}衝擊失敗，經脈隱隱作痛。`)
  reports.push({ text: `${person.name}破境失敗，經脈受損。`, tone: 'danger' })
  return false
}

function ageAndDeath(world, person, reports) {
  if (world.month === 0) person.age += 1
  person.mood = clamp(person.mood + (Math.random() * 6 - 3), -80, 80)
  if (person.hp <= 0 && person.role !== 'patriarch') {
    person.alive = false
    think(person, `${person.name}傷重不治，魂歸蒼梧。`)
    reports.push({
      text: `${person.name}傷重坐化。族譜又添一筆哀榮。`,
      tone: 'danger',
      toast: { type: 'bad', title: '族人隕落', text: person.name, detail: '傷重不治' },
    })
    return
  }
  if (person.age >= person.lifespan && person.role !== 'patriarch') {
    person.alive = false
    think(person, `${person.name}壽元將盡，化清風而去。`)
    reports.push({
      text: `${person.name}壽元耗盡，坐化於${ACTIONS[person.action]?.label || '山門'}。`,
      tone: 'danger',
      toast: { type: 'bad', title: '壽元耗盡', text: person.name, detail: `${person.age}歲` },
    })
  }
  if (person.role === 'patriarch') {
    person.hp = Math.max(person.hp, 35)
    person.alive = true
  }
}

export function createWorld() {
  const world = {
    qi: 680,
    karma: 36,
    year: 146,
    month: 2,
    patriarchRealm: 0,
    traits: [],
    people: [],
    selectedId: 'patriarch',
    paused: false,
    speed: 1,
    omenIn: 18,
  }

  world.people = [
    makePerson(world, {
      id: 'patriarch',
      name: '青玄機',
      role: 'patriarch',
      root: ROOTS[5],
      nature: NATURES[0],
      technique: '青嵐吐納訣',
      realm: 0,
      age: 62,
      lifespan: 180,
      nickname: '青嵐老祖',
      location: 'nexus',
      action: 'cultivate',
      thought: '青嵐一脈，當以我為骨。',
      artifacts: ['蒼梧令'],
    }),
    makePerson(world, { name: '沈清梧', role: 'elder', root: ROOTS[0], nature: NATURES[5], realm: 1, age: 44, action: 'study', location: 'library' }),
    makePerson(world, { name: '葉疏影', root: ROOTS[1], nature: NATURES[6], realm: 0, age: 19, action: 'social', location: 'gate' }),
    makePerson(world, { name: '白無塵', root: ROOTS[2], nature: NATURES[3], realm: 1, age: 27, action: 'adventure', location: 'peak' }),
    makePerson(world, { name: '蒼小魚', root: ROOTS[3], nature: NATURES[1], realm: 0, age: 17, action: 'alchemy', location: 'alchemy' }),
    makePerson(world, { name: '嵐七七', root: ROOTS[4], nature: NATURES[2], realm: 0, age: 16, action: 'cultivate', location: 'nexus' }),
  ]

  shiftBond(world.people[0], world.people[1], 28)
  shiftBond(world.people[2], world.people[5], 22)
  shiftBond(world.people[3], world.people[4], -12)
  return world
}

export function simulateMonth(world) {
  const reports = []
  if (world.paused) return reports

  world.month = (world.month + 1) % 12
  if (world.month === 0) world.year += 1
  world.karma = clamp(world.karma + 0.35, 0, 99)

  for (const person of living(world)) {
    person.action = chooseAction(person)
    person.location = ACTIONS[person.action].region
    resolveAction(world, person, reports)
    ageAndDeath(world, person, reports)
  }

  world.omenIn -= 1
  if (world.omenIn <= 0) {
    world.omenIn = 8 + Math.floor(Math.random() * 10)
    reports.push(...triggerOmen(world, false))
  }

  return reports
}

export function triggerOmen(world, force = false) {
  const reports = []
  if (!force && Math.random() > 0.55) {
    reports.push({ text: '天機掠過，此月山門無事。', tone: '' })
    return reports
  }
  const event = pick(OMEN_EVENTS)
  const qiBonus = hasTrait(world, 'ancestral') && event.qi > 0 ? 1.5 : 1
  if (event.qi) world.qi = Math.max(0, world.qi + event.qi * qiBonus)
  if (event.members > 0) {
    for (let i = 0; i < event.members; i += 1) recruitMember(world, true)
  }
  if (event.members < 0) {
    const victims = living(world).filter((p) => p.role !== 'patriarch')
    if (victims.length) {
      const victim = pick(victims)
      victim.hp = Math.max(0, victim.hp - 55)
      if (victim.hp <= 0) {
        victim.alive = false
        reports.push({ text: `夜襲之中，${victim.name}為護山門而隕。`, tone: 'danger' })
      }
    }
  }
  const detail = event.qi
    ? `靈氣 ${event.qi > 0 ? '+' : ''}${formatNumber(event.qi * qiBonus)}`
    : event.members > 0
      ? '族人 +1'
      : '山門動盪'
  reports.push({
    text: `${event.title}：${event.text}（${detail}）`,
    tone: event.type === 'bad' ? 'danger' : 'jade',
    toast: { type: event.type, title: event.title, text: event.text, detail },
    sfx: event.type !== 'bad',
  })
  return reports
}

export function recruitMember(world, free = false) {
  const cost = recruitCost(world)
  if (!free) {
    if (world.qi < cost) return { ok: false }
    world.qi -= cost
  }
  const person = makePerson(world, { role: 'disciple', age: 15 + Math.floor(Math.random() * 12), realm: 0 })
  world.people.push(person)
  world.selectedId = person.id
  think(person, `${person.name}拜入青嵐，眼底還有凡塵未褪。`)
  return { ok: true, person }
}

export function patriarchBreakthrough(world) {
  const cost = breakthroughCost(world)
  const patriarch = world.people.find((p) => p.role === 'patriarch')
  if (!patriarch || world.qi < cost || world.patriarchRealm >= STAGES.length - 1) return { ok: false }
  world.qi -= cost
  world.patriarchRealm += 1
  patriarch.realm = world.patriarchRealm
  patriarch.personalQi = 20
  patriarch.lifespan = Math.max(patriarch.lifespan, lifespanFor(patriarch.realm))
  const stage = STAGES[world.patriarchRealm]
  think(patriarch, `老祖青玄機突破至「${stage}」，青嵐氣運陡然一振。`)
  return { ok: true, stage, flash: /金丹|元嬰/.test(stage) }
}

export function bless(world, id) {
  const person = world.people.find((p) => p.id === id && p.alive)
  if (!person || world.karma < 8) return { ok: false, reason: '氣運不足' }
  world.karma -= 8
  person.mood += 24
  person.hp = clamp(person.hp + 20, 0, 100)
  person.personalQi += 28
  think(person, `天道賜福於${person.name}，周身金光一閃，心魔暫退。`)
  return { ok: true, text: `天道賜福「${person.name}」，傷勢與道心皆有進益。` }
}

export function tribulate(world, id) {
  const person = world.people.find((p) => p.id === id && p.alive)
  if (!person || world.karma < 12) return { ok: false, reason: '氣運不足' }
  world.karma -= 12
  const reports = []
  attemptRealm(world, person, reports, 0.48)
  return { ok: true, reports, text: `天劫劈向${person.name}。` }
}

export function assignAction(world, id, action) {
  const person = world.people.find((p) => p.id === id && p.alive)
  if (!person || world.karma < 3) return { ok: false, reason: '氣運不足' }
  if (!ACTIONS[action]) return { ok: false, reason: '無此律令' }
  world.karma -= 3
  person.lockedAction = action
  person.action = action
  person.location = ACTIONS[action].region
  think(person, `天道令${person.name}去「${ACTIONS[action].label}」，不敢不從。`)
  return { ok: true, text: `已令${person.name}改行「${ACTIONS[action].label}」。` }
}

export function corrupt(world, id) {
  const person = world.people.find((p) => p.id === id && p.alive)
  if (!person || world.karma < 10) return { ok: false, reason: '氣運不足' }
  world.karma -= 10
  person.nature = person.nature.id === 'demon' ? pick(NATURES.filter((n) => n.id !== 'demon')) : NATURES.find((n) => n.id === 'demon')
  person.mood -= 10
  think(person, person.nature.id === 'demon'
    ? `${person.name}心魔大盛，眸中多了一絲戾氣。`
    : `${person.name}心魔被強行剝去，整個人空了一截。`)
  return { ok: true, text: `${person.name}性情轉為「${person.nature.name}」。` }
}

export function bondLine(person, world) {
  return notableBond(person, world)
}

export function highestRealmName(world) {
  const best = living(world).reduce((a, b) => (a.realm >= b.realm ? a : b))
  return STAGES[best.realm]
}

export function peopleIn(world, regionId) {
  return living(world).filter((p) => p.location === regionId)
}
