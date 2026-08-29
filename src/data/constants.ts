import type { RealmInfo, FamilyTrait, Facility, RandomEvent } from '../types/game'

export const REALMS: RealmInfo[] = [
  {
    tier: 1,
    name: '練氣期 (Qi Condensation)',
    subName: '初窺門徑，吞吐天地靈氣',
    reqQi: 100,
    basePassiveGain: 1,
    clickPower: 1,
    maxMembers: 10,
    color: 'from-emerald-900 to-teal-950',
    badgeColor: 'border-emerald-500/50 text-emerald-400',
    description: '引靈氣入體，洗滌經脈。家族根基初立，百廢待興。',
  },
  {
    tier: 2,
    name: '築基期 (Foundation Establishment)',
    subName: '鑄造道基，靈氣化液',
    reqQi: 800,
    basePassiveGain: 5,
    clickPower: 4,
    maxMembers: 25,
    color: 'from-cyan-950 to-blue-950',
    badgeColor: 'border-cyan-500/50 text-cyan-400',
    description: '真元化海，壽元翻倍。家族建立宗堂，開始招攬四方英才。',
  },
  {
    tier: 3,
    name: '金丹期 (Golden Core)',
    subName: '一顆金丹吞入腹，始知我命不由天',
    reqQi: 5000,
    basePassiveGain: 25,
    clickPower: 15,
    maxMembers: 60,
    color: 'from-amber-950 to-yellow-950',
    badgeColor: 'border-amber-400/60 text-amber-300',
    description: '金丹大成，神識外放數十里。家族名震一方仙鄉，開闢靈田藥園。',
  },
  {
    tier: 4,
    name: '元嬰期 (Nascent Soul)',
    subName: '破丹成嬰，神遊太虛',
    reqQi: 30000,
    basePassiveGain: 120,
    clickPower: 60,
    maxMembers: 150,
    color: 'from-purple-950 to-indigo-950',
    badgeColor: 'border-purple-400/60 text-purple-300',
    description: '元嬰不滅則身不死，開闢家族福地洞天，統禦修真界三千宗派。',
  },
  {
    tier: 5,
    name: '化神期 (Soul Formation)',
    subName: '感悟天地法則，神念通玄',
    reqQi: 180000,
    basePassiveGain: 600,
    clickPower: 250,
    maxMembers: 350,
    color: 'from-fuchsia-950 to-pink-950',
    badgeColor: 'border-pink-400/60 text-pink-300',
    description: '調動天地靈威，凡間帝王莫不俯首稱臣，家族血脈誕生異象。',
  },
  {
    tier: 6,
    name: '煉虛期 (Void Refining)',
    subName: '虛懷若谷，返璞歸真',
    reqQi: 1000000,
    basePassiveGain: 3000,
    clickPower: 1200,
    maxMembers: 800,
    color: 'from-rose-950 to-red-950',
    badgeColor: 'border-rose-400/60 text-rose-300',
    description: '窺探虛空奧秘，舉手投足撕裂山川，家族弟子皆具仙風道骨。',
  },
  {
    tier: 7,
    name: '合體期 (Body Integration)',
    subName: '身與道合，不死不滅',
    reqQi: 6000000,
    basePassiveGain: 15000,
    clickPower: 5000,
    maxMembers: 2000,
    color: 'from-amber-900 to-amber-950',
    badgeColor: 'border-yellow-300 text-yellow-300 glow-gold',
    description: '人道合一，自成一方界域，家族傳承橫跨三千大千世界。',
  },
  {
    tier: 8,
    name: '大乘期 (Mahayana)',
    subName: '萬法歸一，超凡入聖',
    reqQi: 35000000,
    basePassiveGain: 80000,
    clickPower: 25000,
    maxMembers: 5000,
    color: 'from-violet-950 to-amber-950',
    badgeColor: 'border-amber-300 text-amber-200 glow-gold',
    description: '紅塵極致，仙氣入髓，靜候九重天劫飛昇真仙界！',
  },
  {
    tier: 9,
    name: '渡劫期 (Tribulation Transcendence)',
    subName: '逆天抗劫，九死一生',
    reqQi: 200000000,
    basePassiveGain: 400000,
    clickPower: 120000,
    maxMembers: 12000,
    color: 'from-red-950 to-yellow-950',
    badgeColor: 'border-yellow-400 text-yellow-100 glow-gold',
    description: '九九天劫臨世，天威浩蕩！渡之則羽化登仙，萬世昌盛。',
  },
  {
    tier: 10,
    name: '真仙老祖 (True Immortal)',
    subName: '不朽仙軀，永恆不滅',
    reqQi: 1000000000,
    basePassiveGain: 2000000,
    clickPower: 600000,
    maxMembers: 50000,
    color: 'from-yellow-950 via-amber-900 to-yellow-950',
    badgeColor: 'border-yellow-200 text-yellow-100 glow-gold',
    description: '位列仙班，家族受萬仙朝拜，立不朽仙族帝國！',
  }
]

export const ALL_FAMILY_TRAITS: FamilyTrait[] = [
  // Required user traits
  {
    id: 'trait_more_sons',
    name: '多子多福',
    titleEn: 'Abundant Progeny',
    description: '家族子嗣繁茂，招募族人/弟子花費減少 20%',
    icon: '👶',
    rarity: 'rare',
    effectType: 'recruit_discount',
    value: 0.20
  },
  {
    id: 'trait_heaven_root',
    name: '天靈根血脈',
    titleEn: 'Heavenly Spirit Root',
    description: '族中血脈純粹通靈，每位族人產出靈氣提升 +50%',
    icon: '⚡',
    rarity: 'epic',
    effectType: 'qi_per_member_mult',
    value: 0.50
  },
  {
    id: 'trait_hardworking',
    name: '勤能補拙',
    titleEn: 'Relentless Cultivation',
    description: '老祖吐納神速，點擊「閉關修煉」獲得靈氣翻倍 (2x Qi)',
    icon: '🧘‍♂️',
    rarity: 'rare',
    effectType: 'click_mult',
    value: 1.0 // +100% (2x)
  },

  // Additional thematic traits
  {
    id: 'trait_alchemy_mastery',
    name: '丹道世家',
    titleEn: 'Alchemy Heritage',
    description: '傳承上古丹道古方，靈田與煉丹閣產出靈氣提升 +40%',
    icon: '💊',
    rarity: 'common',
    effectType: 'facility_discount',
    value: 0.25
  },
  {
    id: 'trait_fortune_blessing',
    name: '氣運所鍾',
    titleEn: 'Karmic Fortune',
    description: '家族受天道眷顧，突發吉祥奇遇機率大幅提升',
    icon: '✨',
    rarity: 'epic',
    effectType: 'event_good_rate',
    value: 0.35
  },
  {
    id: 'trait_dragon_vein',
    name: '龍脈祖地',
    titleEn: 'Dragon Vein Ancestry',
    description: '家族坐落於大地真龍之穴，所有靈氣被動收益 +30%',
    icon: '🐉',
    rarity: 'legendary',
    effectType: 'passive_all_mult',
    value: 0.30
  },
  {
    id: 'trait_dao_heart',
    name: '道心澄澈',
    titleEn: 'Pristine Dao Heart',
    description: '老祖神魂堅定，突破下一境界所需靈氣減少 15%',
    icon: '💠',
    rarity: 'epic',
    effectType: 'breakthrough_cost_reduction',
    value: 0.15
  },
  {
    id: 'trait_sword_intent',
    name: '萬劍歸宗',
    titleEn: 'Sword Grandmastery',
    description: '族人皆修無上劍訣，點擊閉關修煉靈氣 +80%',
    icon: '⚔️',
    rarity: 'rare',
    effectType: 'click_mult',
    value: 0.80
  },
  {
    id: 'trait_immortal_fate',
    name: '仙凡同壽',
    titleEn: 'Immortal Longevity',
    description: '族人得天延壽，每名成員產出靈氣額外 +35%',
    icon: '🏮',
    rarity: 'rare',
    effectType: 'qi_per_member_mult',
    value: 0.35
  },
  {
    id: 'trait_spirit_merchant',
    name: '通天靈商',
    titleEn: 'Celestial Merchant',
    description: '精通靈石商道，所有洞天設施建造與升級花費減少 25%',
    icon: '💎',
    rarity: 'common',
    effectType: 'facility_discount',
    value: 0.25
  }
]

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac_spirit_spring',
    name: '聚靈靈泉',
    nameEn: 'Spirit Spring',
    icon: '💧',
    level: 0,
    baseCostQi: 50,
    costMultiplier: 1.25,
    baseOutput: 2,
    description: '引後山靈泉灌溉洞府，源源不絕匯聚天地微弱靈氣。'
  },
  {
    id: 'fac_herb_garden',
    name: '百草靈田',
    nameEn: 'Spirit Herb Garden',
    icon: '🌿',
    level: 0,
    baseCostQi: 200,
    costMultiplier: 1.30,
    baseOutput: 10,
    description: '栽種黃精、靈芝、朱果等修真藥草，供族人煉氣滋養。'
  },
  {
    id: 'fac_alchemy_pavilion',
    name: '八卦煉丹閣',
    nameEn: 'Alchemy Pavilion',
    icon: '🏺',
    level: 0,
    baseCostQi: 1200,
    costMultiplier: 1.35,
    baseOutput: 60,
    description: '以地心靈火引燃丹鼎，批量煉製聚氣丹與築基靈液。'
  },
  {
    id: 'fac_scripture_tower',
    name: '藏經閣秘藏',
    nameEn: 'Scripture Vault',
    icon: '📜',
    level: 0,
    baseCostQi: 6000,
    costMultiplier: 1.40,
    baseOutput: 320,
    description: '收藏上古殘篇功法，啟發族人悟道，修行進境日行千里。'
  },
  {
    id: 'fac_spirit_mine',
    name: '天元靈石礦脈',
    nameEn: 'Spirit Stone Vein',
    icon: '🔮',
    level: 0,
    baseCostQi: 30000,
    costMultiplier: 1.45,
    baseOutput: 1600,
    description: '深層地底高純度靈脈，每刻噴薄海量實質天地真元。'
  },
  {
    id: 'fac_ascension_altar',
    name: '九天通神祭壇',
    nameEn: 'Nine Heavens Altar',
    icon: '⛩️',
    level: 0,
    baseCostQi: 180000,
    costMultiplier: 1.50,
    baseOutput: 9000,
    description: '直通天外虛空，牽引仙界九霄神曦，照耀全族萬年道基。'
  }
]

export const RANDOM_EVENTS: RandomEvent[] = [
  // Good events (including requested ones)
  {
    id: 'evt_herb_found',
    title: '後山仙緣靈芝',
    flavorText: '天地生靈，福澤庇蔭',
    description: '家族子弟在後山發現百年靈芝！靈氣大幅增長！',
    type: 'good',
    qiDelta: (s) => Math.max(500, Math.floor(s.qi * 0.15 + 500)),
    icon: '🍄'
  },
  {
    id: 'evt_marriage',
    title: '家族喜結良緣',
    flavorText: '秦晉之好，仙侶同心',
    description: '家族子弟與鄰近修仙大族聯姻，家族迎來新族人！族人 +2！',
    type: 'good',
    memberDelta: 2,
    qiDelta: 100,
    icon: '🎎'
  },
  {
    id: 'evt_ancestor_epiphany',
    title: '老祖偶感天道',
    flavorText: '紫氣東來三千里',
    description: '老祖在靜室打坐時忽見天道符文，靈台頓悟！靈氣狂湧！',
    type: 'good',
    qiDelta: (s) => Math.max(800, Math.floor(s.qi * 0.25 + 800)),
    icon: '💫'
  },
  {
    id: 'evt_wandering_cultivator',
    title: '散修前來歸附',
    flavorText: '良禽擇木而棲',
    description: '一名天賦異稟的金丹散修慕名而來，懇請加入家族！族人 +1！',
    type: 'good',
    memberDelta: 1,
    qiDelta: 250,
    icon: '🧑‍🌾'
  },
  {
    id: 'evt_meteor_mineral',
    title: '天降天外隕鐵',
    flavorText: '星辰墜落，異寶現世',
    description: '夜空中一顆流星墜落家族後山，蘊含精純星辰靈能！靈氣 +1500！',
    type: 'good',
    qiDelta: 1500,
    icon: '🌠'
  },
  {
    id: 'evt_spirit_beast',
    title: '護山神獸降臨',
    flavorText: '麒麟祥瑞，瑞雪豐年',
    description: '上古靈獸青鸞飛經家族上空，灑下漫天靈羽神光！靈氣 +2000！',
    type: 'good',
    qiDelta: 2000,
    icon: '🦚'
  },

  // Bad events (including requested ones)
  {
    id: 'evt_enemy_raid',
    title: '敵對家族偷襲',
    flavorText: '仇家尋隙，暗箭難防',
    description: '敵對修仙家族黑夜偷襲巡山隊伍！一名族人不幸負傷隕落！',
    type: 'bad',
    memberDelta: -1,
    qiDelta: -150,
    icon: '⚔️'
  },
  {
    id: 'evt_cultivation_deviation',
    title: '子弟走火入魔',
    flavorText: '心魔作祟，經脈逆亂',
    description: '一名年輕子弟急於求成走火入魔，家族消耗靈氣為其療傷！靈氣 -200！',
    type: 'bad',
    qiDelta: -200,
    icon: '🔥'
  },
  {
    id: 'evt_spirit_tide_leak',
    title: '靈眼洩漏波瀾',
    flavorText: '地脈震盪，真元逸散',
    description: '地底靈脈產生微小裂隙，部分積攢的靈氣逸散於天地之間！',
    type: 'bad',
    qiDelta: (s) => -Math.min(s.qi, Math.max(300, Math.floor(s.qi * 0.12))),
    icon: '💨'
  },
  {
    id: 'evt_tribulation_lightning',
    title: '九天散雷驚煞',
    flavorText: '雷霆之怒，萬物俱寂',
    description: '無名天劫餘波劈中家族靈田，損耗部分靈藥存量！靈氣 -400！',
    type: 'bad',
    qiDelta: -400,
    icon: '⚡'
  }
]

export const CHINESE_SURNAMES = ['姬', '姜', '李', '葉', '林', '蘇', '陸', '顧', '韓', '蕭', '楚', '陳', '東方', '獨孤', '慕容', '司馬', '公孫']
export const DAOIST_FIRST_NAMES = ['塵', '玄', '風', '瀾', '宇', '霄', '青', '凡', '淵', '修', '逸', '天', '昊', '辰', '雪', '靈', '霜', '瑤', '清', '婉', '芷']
