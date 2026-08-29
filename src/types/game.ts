// Types and interfaces for Cultivation Family game

export type RealmTier = 
  | '練氣期 (Qi Condensation)'
  | '築基期 (Foundation Establishment)'
  | '金丹期 (Golden Core)'
  | '元嬰期 (Nascent Soul)'
  | '化神期 (Soul Formation)'
  | '煉虛期 (Void Refining)'
  | '合體期 (Body Integration)'
  | '大乘期 (Mahayana)'
  | '渡劫期 (Tribulation Transcendence)'
  | '真仙老祖 (True Immortal)'

export interface RealmInfo {
  tier: number
  name: string
  subName: string
  reqQi: number
  basePassiveGain: number
  clickPower: number
  maxMembers: number
  color: string
  badgeColor: string
  description: string
  tribulationRisk?: number
}

export interface FamilyTrait {
  id: string
  name: string
  titleEn: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  effectType: 
    | 'recruit_discount' 
    | 'qi_per_member_mult' 
    | 'click_mult' 
    | 'event_good_rate' 
    | 'facility_discount' 
    | 'passive_all_mult'
    | 'breakthrough_cost_reduction'
    | 'alchemy_efficiency'
  value: number // e.g. 0.20 for 20% discount, 1.0 for +100%
}

export interface RandomEvent {
  id: string
  title: string
  description: string
  flavorText: string
  type: 'good' | 'bad' | 'legendary'
  qiDelta?: number | ((state: GameState) => number)
  memberDelta?: number
  spiritStoneDelta?: number
  specialTraitChance?: boolean
  icon: string
}

export interface Facility {
  id: string
  name: string
  nameEn: string
  icon: string
  level: number
  baseCostQi: number
  costMultiplier: number
  baseOutput: number // passive qi / sec
  description: string
}

export interface Disciple {
  id: string
  name: string
  gender: 'male' | 'female'
  root: '天靈根 (Heavenly Root)' | '異靈根 (Mutated Root)' | '雙靈根 (Dual Root)' | '三靈根 (Triple Root)' | '五行雜靈根 (Mortal Root)'
  realm: string
  generation: number
  loyalty: number
  contribution: number
}

export interface LogEntry {
  id: string
  timestamp: string
  text: string
  type: 'info' | 'breakthrough' | 'trait' | 'event_good' | 'event_bad' | 'recruit' | 'facility' | 'achievement'
}

export interface GameState {
  familyName: string
  ancestorName: string
  year: number // In-game cultivation years
  qi: number
  spiritStones: number
  ancestorRealmTier: number
  members: number
  maxMembersCap: number
  activeTraits: FamilyTrait[]
  facilities: Facility[]
  disciples: Disciple[]
  logs: LogEntry[]
  
  // Statistics
  stats: {
    totalQiGathered: number
    totalClicks: number
    totalBreakthroughs: number
    totalEventsEncountered: number
    totalMembersRecruited: number
    highestRealmAchieved: number
  }

  // Audio settings
  soundEnabled: boolean
  autoGatherEnabled: boolean
}

export interface FloatingTextItem {
  id: string
  x: number
  y: number
  text: string
  type?: 'qi' | 'critical' | 'stones' | 'member'
}
