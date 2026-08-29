import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Flame,
  Users,
  Scroll,
  Volume2,
  VolumeX,
  Dna,
  Zap,
  Building2,
  PlusCircle,
  TrendingUp,
  Info
} from 'lucide-react'
import confetti from 'canvas-confetti'
import type {
  GameState,
  FamilyTrait,
  FloatingTextItem,
  LogEntry,
  Disciple
} from './types/game'
import {
  REALMS,
  ALL_FAMILY_TRAITS,
  INITIAL_FACILITIES,
  RANDOM_EVENTS,
  CHINESE_SURNAMES,
  DAOIST_FIRST_NAMES
} from './data/constants'
import { soundEngine } from './utils/sound'
import { MysticalAuraCanvas } from './components/MysticalAuraCanvas'

const STORAGE_KEY = 'cultivation_family_save_v1'

export default function App() {
  // -------------------------------------------------------------
  // Primary Game State
  // -------------------------------------------------------------
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          // fallback
        }
      }
    }
    return {
      familyName: '青雲葉氏',
      ancestorName: '太虛老祖 (葉塵)',
      year: 1,
      qi: 0,
      spiritStones: 50,
      ancestorRealmTier: 1,
      members: 1,
      maxMembersCap: 10,
      activeTraits: [],
      facilities: INITIAL_FACILITIES,
      disciples: [
        {
          id: 'disciple_1',
          name: '葉清雪',
          gender: 'female',
          root: '天靈根 (Heavenly Root)',
          realm: '練氣期一層',
          generation: 1,
          loyalty: 100,
          contribution: 0
        }
      ],
      logs: [
        {
          id: 'log_init',
          timestamp: '元年 春',
          text: '太虛老祖創立「青雲葉氏」修仙世家，開闢後山靈泉，引天地造化！',
          type: 'info'
        }
      ],
      stats: {
        totalQiGathered: 0,
        totalClicks: 0,
        totalBreakthroughs: 0,
        totalEventsEncountered: 0,
        totalMembersRecruited: 0,
        highestRealmAchieved: 1
      },
      soundEnabled: true,
      autoGatherEnabled: false
    }
  })

  // -------------------------------------------------------------
  // UI States & Modals
  // -------------------------------------------------------------
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextItem[]>([])
  const [activeToast, setActiveToast] = useState<{
    id: string
    title: string
    description: string
    flavorText: string
    type: 'good' | 'bad' | 'legendary'
    icon: string
  } | null>(null)

  const [traitModalOpen, setTraitModalOpen] = useState<boolean>(false)
  const [availableTraitChoices, setAvailableTraitChoices] = useState<FamilyTrait[]>([])
  const [activeTab, setActiveTab] = useState<'facilities' | 'disciples' | 'heritage' | 'chronicles'>('facilities')
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

  // Sync sound setting to soundEngine
  useEffect(() => {
    soundEngine.setEnabled(gameState.soundEnabled)
  }, [gameState.soundEnabled])

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    } catch {
      // Storage error
    }
  }, [gameState])

  // Current Realm Info
  const currentRealm = REALMS[gameState.ancestorRealmTier - 1] || REALMS[0]
  const nextRealm = REALMS[gameState.ancestorRealmTier] || null

  // Helper log function
  const addLog = (text: string, type: LogEntry['type'] = 'info') => {
    const timeStr = `第${gameState.year}年 ${['春', '夏', '秋', '冬'][Math.floor(Math.random() * 4)]}`
    const newEntry: LogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      text,
      type
    }
    setGameState((prev) => ({
      ...prev,
      logs: [newEntry, ...prev.logs.slice(0, 99)] // Keep last 100
    }))
  }

  // -------------------------------------------------------------
  // Trait Calculations
  // -------------------------------------------------------------
  // Recruit cost discount
  const recruitDiscount = gameState.activeTraits
    .filter((t) => t.effectType === 'recruit_discount')
    .reduce((acc, t) => acc + t.value, 0)

  // Base Qi generation per member multiplier (e.g. +50%)
  const memberQiMultiplier = gameState.activeTraits
    .filter((t) => t.effectType === 'qi_per_member_mult')
    .reduce((acc, t) => acc + t.value, 0)

  // Click multiplier (e.g. '勤能補拙' -> +100% -> 2x Qi)
  const clickMultiplier = 1 + gameState.activeTraits
    .filter((t) => t.effectType === 'click_mult')
    .reduce((acc, t) => acc + t.value, 0)

  // Facility cost discount
  const facilityDiscount = gameState.activeTraits
    .filter((t) => t.effectType === 'facility_discount')
    .reduce((acc, t) => acc + t.value, 0)

  // Passive All Multiplier
  const passiveAllMultiplier = 1 + gameState.activeTraits
    .filter((t) => t.effectType === 'passive_all_mult')
    .reduce((acc, t) => acc + t.value, 0)

  // Breakthrough cost reduction
  const breakthroughReduction = gameState.activeTraits
    .filter((t) => t.effectType === 'breakthrough_cost_reduction')
    .reduce((acc, t) => acc + t.value, 0)

  // Event good rate bonus
  const eventGoodRateBonus = gameState.activeTraits
    .filter((t) => t.effectType === 'event_good_rate')
    .reduce((acc, t) => acc + t.value, 0)

  // -------------------------------------------------------------
  // Math & Production calculations
  // -------------------------------------------------------------
  // Base member generation: 1 Qi/s per member * (1 + memberQiMultiplier)
  const memberOutputPerSec = gameState.members * (1 + memberQiMultiplier) * currentRealm.basePassiveGain

  // Facilities output
  const facilitiesOutputPerSec = gameState.facilities.reduce((acc, fac) => {
    return acc + fac.level * fac.baseOutput
  }, 0)

  // Total passive Qi per second
  const totalPassivePerSec = (memberOutputPerSec + facilitiesOutputPerSec) * passiveAllMultiplier

  // Cost to recruit 1 member (Base 20, scaling with member count, reduced by recruitDiscount)
  const baseRecruitCost = Math.floor(20 * Math.pow(1.15, Math.max(0, gameState.members - 1)))
  const finalRecruitCost = Math.max(5, Math.floor(baseRecruitCost * (1 - recruitDiscount)))

  // Required Qi for breakthrough with trait reduction
  const requiredBreakthroughQi = nextRealm
    ? Math.floor(nextRealm.reqQi * (1 - breakthroughReduction))
    : 0

  // -------------------------------------------------------------
  // Click Handler: Gather Qi (閉關修煉)
  // -------------------------------------------------------------
  const handleGatherQi = (e: React.MouseEvent<HTMLButtonElement>) => {
    const baseClick = currentRealm.clickPower
    const actualGain = Math.max(1, Math.floor(baseClick * clickMultiplier))

    // Floating text animation at cursor position
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || rect.left + rect.width / 2
    const y = e.clientY || rect.top + rect.height / 2

    // Add particle / floating text
    const newFloat: FloatingTextItem = {
      id: `float_${Date.now()}_${Math.random()}`,
      x,
      y,
      text: `+${actualGain} 靈氣 (Qi)`,
      type: clickMultiplier > 1 ? 'critical' : 'qi'
    }
    setFloatingTexts((prev) => [...prev, newFloat])

    // Sound effect
    soundEngine.playQiGatherSound()

    // Update state
    setGameState((prev) => ({
      ...prev,
      qi: prev.qi + actualGain,
      stats: {
        ...prev.stats,
        totalQiGathered: prev.stats.totalQiGathered + actualGain,
        totalClicks: prev.stats.totalClicks + 1
      }
    }))
  }

  // Remove floating texts after animation finishes
  useEffect(() => {
    if (floatingTexts.length === 0) return
    const timer = setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => Date.now() - parseInt(item.id.split('_')[1]) < 1000))
    }, 1000)
    return () => clearTimeout(timer)
  }, [floatingTexts])

  // -------------------------------------------------------------
  // Breakthrough Handler (老祖突破) & Trait Prompt
  // -------------------------------------------------------------
  const handleBreakthrough = () => {
    if (!nextRealm) return
    if (gameState.qi < requiredBreakthroughQi) return

    soundEngine.playBreakthroughSound()

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#facc15', '#10b981', '#38bdf8', '#c084fc']
      })
    } catch {
      // Ignore
    }

    const newTier = gameState.ancestorRealmTier + 1
    const newRealmInfo = REALMS[newTier - 1]

    // Deduct Qi and level up
    setGameState((prev) => ({
      ...prev,
      qi: prev.qi - requiredBreakthroughQi,
      ancestorRealmTier: newTier,
      maxMembersCap: newRealmInfo.maxMembers,
      stats: {
        ...prev.stats,
        totalBreakthroughs: prev.stats.totalBreakthroughs + 1,
        highestRealmAchieved: Math.max(prev.stats.highestRealmAchieved, newTier)
      }
    }))

    addLog(
      `⚡【境界突破】老祖成功突破至「${newRealmInfo.name}」！天地異象大發，道韻庇佑家族！`,
      'breakthrough'
    )

    // Second Stage Requirement: Offer 1 out of 3 random Family Traits!
    const availableUnowned = ALL_FAMILY_TRAITS.filter(
      (trait) => !gameState.activeTraits.some((active) => active.id === trait.id)
    )

    // If all traits owned, reuse traits or give enhanced blessings
    const pool = availableUnowned.length >= 3 ? availableUnowned : ALL_FAMILY_TRAITS
    // Shuffle and pick 3
    const shuffled = [...pool].sort(() => 0.5 - Math.random())
    const selected3 = shuffled.slice(0, 3)

    setAvailableTraitChoices(selected3)
    setTraitModalOpen(true)
  }

  // Select Trait Handler
  const handleSelectTrait = (trait: FamilyTrait) => {
    soundEngine.playTraitSelectSound()

    // Add trait to active traits
    setGameState((prev) => ({
      ...prev,
      activeTraits: [...prev.activeTraits, trait]
    }))

    setTraitModalOpen(false)

    // Log the event
    addLog(
      `🧬【家族傳承】老祖感悟大道，家族覺醒傳承天賦「${trait.name}」(${trait.titleEn})！${trait.description}`,
      'trait'
    )
  }

  // -------------------------------------------------------------
  // Recruit Family Member / Disciple
  // -------------------------------------------------------------
  const handleRecruitMember = () => {
    if (gameState.qi < finalRecruitCost) return
    if (gameState.members >= currentRealm.maxMembers) return

    const randomSurname = CHINESE_SURNAMES[Math.floor(Math.random() * CHINESE_SURNAMES.length)]
    const randomName = DAOIST_FIRST_NAMES[Math.floor(Math.random() * DAOIST_FIRST_NAMES.length)]
    const fullName = `${randomSurname}${randomName}`
    const isFemale = Math.random() > 0.5
    
    // Spirit root distribution
    const roots: Disciple['root'][] = [
      '五行雜靈根 (Mortal Root)',
      '三靈根 (Triple Root)',
      '雙靈根 (Dual Root)',
      '異靈根 (Mutated Root)',
      '天靈根 (Heavenly Root)'
    ]
    const rootIdx = Math.min(roots.length - 1, Math.floor(Math.random() * (2 + Math.floor(gameState.ancestorRealmTier / 2))))
    const root = roots[rootIdx]

    const newDisciple: Disciple = {
      id: `disciple_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: fullName,
      gender: isFemale ? 'female' : 'male',
      root,
      realm: '練氣期一層',
      generation: Math.floor(gameState.members / 5) + 1,
      loyalty: 90 + Math.floor(Math.random() * 11),
      contribution: 0
    }

    setGameState((prev) => ({
      ...prev,
      qi: prev.qi - finalRecruitCost,
      members: prev.members + 1,
      disciples: [newDisciple, ...prev.disciples.slice(0, 29)],
      stats: {
        ...prev.stats,
        totalMembersRecruited: prev.stats.totalMembersRecruited + 1
      }
    }))

    soundEngine.playQiGatherSound()
    addLog(`👶【招攬族人】家族迎來新子弟「${fullName}」(${root})！家族生生不息，靈氣產出提升！`, 'recruit')
  }

  // -------------------------------------------------------------
  // Upgrade Facility
  // -------------------------------------------------------------
  const handleUpgradeFacility = (facilityId: string) => {
    const fac = gameState.facilities.find((f) => f.id === facilityId)
    if (!fac) return

    const currentCost = Math.floor(fac.baseCostQi * Math.pow(fac.costMultiplier, fac.level) * (1 - facilityDiscount))
    if (gameState.qi < currentCost) return

    setGameState((prev) => ({
      ...prev,
      qi: prev.qi - currentCost,
      facilities: prev.facilities.map((f) => {
        if (f.id === facilityId) {
          return { ...f, level: f.level + 1 }
        }
        return f
      })
    }))

    soundEngine.playQiGatherSound()
    addLog(`🏛️【洞天建設】家族成功升級「${fac.name}」至 Lv.${fac.level + 1}！`, 'facility')
  }

  // -------------------------------------------------------------
  // Idle Game Loop (Passive Generation & Cultivation Year progression)
  // -------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        const generation = (
          (prev.members * (1 + memberQiMultiplier) * (REALMS[prev.ancestorRealmTier - 1]?.basePassiveGain || 1) +
            prev.facilities.reduce((acc, f) => acc + f.level * f.baseOutput, 0)) *
          passiveAllMultiplier
        ) / 10 // Runs 10 times per sec (every 100ms)

        return {
          ...prev,
          qi: prev.qi + generation,
          stats: {
            ...prev.stats,
            totalQiGathered: prev.stats.totalQiGathered + generation
          }
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [memberQiMultiplier, passiveAllMultiplier, gameState.ancestorRealmTier])

  // In-game year ticker (every 30 seconds = 1 cultivation year)
  useEffect(() => {
    const yearInterval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        year: prev.year + 1
      }))
    }, 30000)
    return () => clearInterval(yearInterval)
  }, [])

  // -------------------------------------------------------------
  // Third Stage Requirement: Random Events (突發事件) System
  // Trigger every 15 to 30 seconds with 50% chance
  // -------------------------------------------------------------
  useEffect(() => {
    const scheduleNextEvent = () => {
      // Random delay between 15000ms and 30000ms
      const delay = Math.floor(Math.random() * 15000) + 15000

      return setTimeout(() => {
        // 50% chance to trigger (+ bonus from traits)
        const triggerChance = 0.50 + eventGoodRateBonus
        const roll = Math.random()

        if (roll < triggerChance) {
          // Select Good vs Bad event. Higher weight on good events.
          const isGood = Math.random() < 0.65 + eventGoodRateBonus
          const candidates = RANDOM_EVENTS.filter((e) => (isGood ? e.type === 'good' : e.type === 'bad'))
          const selectedEvent = candidates[Math.floor(Math.random() * candidates.length)]

          if (selectedEvent) {
            // Apply event changes
            setGameState((prev) => {
              let qiChange = 0
              if (typeof selectedEvent.qiDelta === 'function') {
                qiChange = selectedEvent.qiDelta(prev)
              } else if (typeof selectedEvent.qiDelta === 'number') {
                qiChange = selectedEvent.qiDelta
              }

              let memberChange = selectedEvent.memberDelta || 0
              // Ensure members never drop below 1
              let nextMembers = prev.members + memberChange
              if (nextMembers < 1) {
                nextMembers = 1
                memberChange = 1 - prev.members
              }

              const nextQi = Math.max(0, prev.qi + qiChange)

              return {
                ...prev,
                qi: nextQi,
                members: nextMembers,
                stats: {
                  ...prev.stats,
                  totalEventsEncountered: prev.stats.totalEventsEncountered + 1
                }
              }
            })

            // Trigger sound & notification
            soundEngine.playEventSound(selectedEvent.type === 'good')

            // Show Toast Notification (slides down, disappears after 3 seconds)
            setActiveToast({
              id: `toast_${Date.now()}`,
              title: selectedEvent.title,
              description: selectedEvent.description,
              flavorText: selectedEvent.flavorText,
              type: selectedEvent.type,
              icon: selectedEvent.icon
            })

            // Log the event in history log
            addLog(
              `${selectedEvent.icon}【突發事件・${selectedEvent.title}】${selectedEvent.description}`,
              selectedEvent.type === 'good' ? 'event_good' : 'event_bad'
            )
          }
        }

        // Schedule next check
        timeoutId = scheduleNextEvent()
      }, delay)
    }

    let timeoutId = scheduleNextEvent()
    return () => clearTimeout(timeoutId)
  }, [eventGoodRateBonus])

  // Clear toast after 3.2 seconds
  useEffect(() => {
    if (!activeToast) return
    const timer = setTimeout(() => {
      setActiveToast(null)
    }, 3200)
    return () => clearTimeout(timer)
  }, [activeToast])

  // Reset Game Data
  const handleResetGame = () => {
    if (window.confirm('確定要重置家族傳承，重新轉世輪迴嗎？（所有數據將歸零）')) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.reload()
    }
  }

  // -------------------------------------------------------------
  // Render Main UI
  // -------------------------------------------------------------
  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Animated Canvas Motes */}
      <MysticalAuraCanvas realmTier={gameState.ancestorRealmTier} />

      {/* Floating text click particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {floatingTexts.map((item) => (
          <div
            key={item.id}
            style={{ left: `${item.x}px`, top: `${item.y}px` }}
            className={`fixed font-serif font-black tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] animate-float-up text-lg select-none ${
              item.type === 'critical'
                ? 'text-yellow-300 scale-125 [text-shadow:0_0_12px_#eab308]'
                : 'text-emerald-300 [text-shadow:0_0_10px_#10b981]'
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Top Banner Notification: Random Event Toast (3rd Stage Requirement) */}
      {activeToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-lg pointer-events-none animate-toast">
          <div
            className={`p-4 rounded-xl shadow-2xl border backdrop-blur-xl flex items-center gap-4 ${
              activeToast.type === 'good'
                ? 'bg-gradient-to-r from-emerald-950/95 via-slate-900/95 to-teal-950/95 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                : 'bg-gradient-to-r from-rose-950/95 via-slate-900/95 to-red-950/95 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
            }`}
          >
            <div className="text-3xl p-2 rounded-lg bg-black/40 border border-white/10 flex-shrink-0">
              {activeToast.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded tracking-widest ${
                    activeToast.type === 'good'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {activeToast.type === 'good' ? '✨ 吉祥仙緣' : '⚠️ 厄運突至'}
                </span>
                <span className="text-xs text-slate-400 font-serif italic">
                  {activeToast.flavorText}
                </span>
              </div>
              <h4 className="font-serif font-bold text-base mt-1 text-slate-100 flex items-center gap-1.5">
                {activeToast.title}
              </h4>
              <p className="text-sm text-slate-200/90 mt-0.5 leading-snug">
                {activeToast.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className="relative z-10 border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-md px-4 py-3 sticky top-0 shadow-lg shadow-black/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(234,179,8,0.4)] border border-amber-300/40">
              ☯️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-black text-xl tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  {gameState.familyName}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-serif">
                  傳承第 {gameState.year} 載
                </span>
              </div>
              <p className="text-xs text-slate-400">
                開山始祖：<span className="text-amber-200 font-serif">{gameState.ancestorName}</span>
              </p>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGameState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
              title={gameState.soundEnabled ? '音效開啟 (Sound ON)' : '音效靜音 (Sound Muted)'}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-amber-300 hover:border-amber-500/50 transition-all cursor-pointer"
            >
              {gameState.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-slate-500" />}
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              title="仙門秘卷 / 遊戲設置"
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-amber-300 hover:border-amber-500/50 transition-all cursor-pointer"
            >
              <Info size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Cultivation / Ancestor / Quick Actions (4 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Main Cultivation Card (Ancestor & Gathering Qi) */}
          <div className="mystic-card rounded-2xl p-5 relative overflow-hidden border border-amber-500/30">
            {/* Ambient Realm Glow Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentRealm.color} opacity-25 pointer-events-none`}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-serif uppercase tracking-widest text-amber-400/80 flex items-center gap-1">
                    <Flame size={14} className="text-amber-400" />
                    老祖道統修為
                  </span>
                  <h2 className="text-2xl font-serif font-black text-amber-100 tracking-wide mt-1">
                    {currentRealm.name}
                  </h2>
                  <p className="text-xs text-amber-300/80 font-serif italic mt-0.5">
                    「{currentRealm.subName}」
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full border text-xs font-serif font-bold ${currentRealm.badgeColor} bg-black/40`}
                >
                  第 {gameState.ancestorRealmTier} 重天
                </div>
              </div>

              {/* Qi Resource Counter */}
              <div className="mt-6 p-4 rounded-xl bg-black/50 border border-amber-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-xs font-serif text-slate-400 tracking-widest uppercase">
                  家族天地真元 (Qi)
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-black text-yellow-300 [text-shadow:0_0_20px_rgba(234,179,8,0.5)] my-1 tracking-tight">
                  {Math.floor(gameState.qi).toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-xs font-serif text-emerald-400">
                  <TrendingUp size={13} />
                  <span>+{totalPassivePerSec.toFixed(1)} 靈氣 / 秒 (Passive Qi/s)</span>
                </div>
              </div>

              {/* Breakthrough Progress Bar */}
              {nextRealm ? (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-serif mb-1.5">
                    <span className="text-slate-300">
                      衝擊下一境界：<span className="text-amber-300 font-bold">{nextRealm.name.split(' ')[0]}</span>
                    </span>
                    <span className="text-amber-200">
                      {Math.min(100, Math.floor((gameState.qi / requiredBreakthroughQi) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.7)]"
                      style={{
                        width: `${Math.min(100, Math.max(0, (gameState.qi / requiredBreakthroughQi) * 100))}%`
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 text-right mt-1 font-mono">
                    需凝聚 {requiredBreakthroughQi.toLocaleString()} 靈氣
                    {breakthroughReduction > 0 && (
                      <span className="text-emerald-400 ml-1">
                        (-{(breakthroughReduction * 100).toFixed(0)}% 道心減免)
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 text-center font-serif text-amber-200 text-sm">
                  ✨ 已登峰造極，位列真仙！超脫天地造化！
                </div>
              )}

              {/* Action Buttons: Gather Qi & Breakthrough */}
              <div className="mt-6 flex flex-col gap-3">
                {/* 1. Gather Qi Button (閉關修煉) with dynamic click feedback & floating particles */}
                <button
                  onClick={handleGatherQi}
                  className="btn-mystic-gold w-full py-3.5 px-5 rounded-xl font-serif font-black text-lg tracking-wider flex items-center justify-center gap-2 cursor-pointer group shadow-lg"
                >
                  <Sparkles size={20} className="text-yellow-200 group-hover:rotate-45 transition-transform duration-300" />
                  <span>閉關修煉 (Gather Qi)</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 border border-amber-300/30 text-amber-200 font-mono">
                    +{Math.max(1, Math.floor(currentRealm.clickPower * clickMultiplier))}
                  </span>
                </button>

                {/* 2. Breakthrough Button (老祖突破) with Modal Trigger */}
                {nextRealm && (
                  <button
                    onClick={handleBreakthrough}
                    disabled={gameState.qi < requiredBreakthroughQi}
                    className={`w-full py-3 px-4 rounded-xl font-serif font-bold text-base tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gameState.qi >= requiredBreakthroughQi
                        ? 'btn-mystic-jade animate-pulse text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Zap size={18} />
                    <span>老祖突破 (Breakthrough)</span>
                    {gameState.qi >= requiredBreakthroughQi && (
                      <span className="text-xs bg-emerald-400 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                        可突破!
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Family Stats & Progeny Recruitment */}
          <div className="mystic-card rounded-2xl p-5 border border-emerald-500/20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-emerald-300 flex items-center gap-2 text-base">
                <Users size={18} />
                <span>家族人丁與子嗣 (Lineage)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                族人：<strong className="text-emerald-300">{gameState.members}</strong> / {currentRealm.maxMembers} 人
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4 text-xs font-serif">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400">族人修煉產出</div>
                <div className="text-base font-bold text-emerald-300 mt-0.5 font-mono">
                  +{memberOutputPerSec.toFixed(1)} <span className="text-xs font-normal">Qi/s</span>
                </div>
                {memberQiMultiplier > 0 && (
                  <div className="text-[10px] text-amber-300 mt-0.5">
                    +{(memberQiMultiplier * 100).toFixed(0)}% 血脈加成
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400">洞天設施產出</div>
                <div className="text-base font-bold text-cyan-300 mt-0.5 font-mono">
                  +{facilitiesOutputPerSec.toFixed(1)} <span className="text-xs font-normal">Qi/s</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  已開闢 {gameState.facilities.filter((f) => f.level > 0).length} 座靈地
                </div>
              </div>
            </div>

            {/* Recruit Button */}
            <button
              onClick={handleRecruitMember}
              disabled={gameState.qi < finalRecruitCost || gameState.members >= currentRealm.maxMembers}
              className={`w-full py-2.5 px-4 rounded-xl font-serif text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                gameState.qi >= finalRecruitCost && gameState.members < currentRealm.maxMembers
                  ? 'btn-mystic-jade text-emerald-100'
                  : 'bg-slate-900/50 border border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>招攬仙緣子嗣 (Recruit Member)</span>
              </div>
              <div className="text-xs font-mono font-bold">
                {finalRecruitCost.toLocaleString()} 靈氣
                {recruitDiscount > 0 && (
                  <span className="text-amber-300 text-[10px] ml-1">
                    (-{(recruitDiscount * 100).toFixed(0)}%)
                  </span>
                )}
              </div>
            </button>
            {gameState.members >= currentRealm.maxMembers && (
              <p className="text-[11px] text-amber-400/90 text-center mt-2 font-serif">
                ⚠️ 已達當前境界族人上限，請老祖突破以開闢更大洞府！
              </p>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Tabs (Facilities, Traits Heritage, Chronicles Log) (8 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Top Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 backdrop-blur-md overflow-x-auto">
            <button
              onClick={() => setActiveTab('facilities')}
              className={`flex-1 py-2 px-4 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'facilities'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-md border border-amber-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Building2 size={16} />
              <span>🏛️ 洞天福地 (Facilities)</span>
            </button>

            <button
              onClick={() => setActiveTab('heritage')}
              className={`flex-1 py-2 px-4 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'heritage'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-emerald-100 shadow-md border border-emerald-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Dna size={16} />
              <span>🧬 家族傳承 (Family Heritage)</span>
              {gameState.activeTraits.length > 0 && (
                <span className="text-[10px] bg-emerald-400 text-emerald-950 px-1.5 py-0.2 rounded-full font-bold">
                  {gameState.activeTraits.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('disciples')}
              className={`flex-1 py-2 px-4 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'disciples'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-cyan-100 shadow-md border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Users size={16} />
              <span>📜 族人譜牒 (Members)</span>
            </button>

            <button
              onClick={() => setActiveTab('chronicles')}
              className={`flex-1 py-2 px-4 rounded-xl font-serif text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'chronicles'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-purple-100 shadow-md border border-purple-400/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Scroll size={16} />
              <span>📖 家族紀事 (Log)</span>
            </button>
          </div>

          {/* Tab 1: Facilities Panel */}
          {activeTab === 'facilities' && (
            <div className="mystic-card rounded-2xl p-5 border border-amber-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif font-black text-lg text-amber-200 flex items-center gap-2">
                    <Building2 size={20} className="text-amber-400" />
                    洞天福地與修真設施 (Family Facilities)
                  </h3>
                  <p className="text-xs text-slate-400 font-serif mt-0.5">
                    開闢山門靈地，打造自動聚靈靈陣，為萬年仙族奠定根基。
                  </p>
                </div>
                <div className="text-right text-xs font-serif text-amber-300">
                  設施總靈效：<strong className="font-mono text-sm text-yellow-300">+{facilitiesOutputPerSec.toFixed(1)}</strong> Qi/s
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {gameState.facilities.map((fac) => {
                  const currentCost = Math.floor(
                    fac.baseCostQi * Math.pow(fac.costMultiplier, fac.level) * (1 - facilityDiscount)
                  )
                  const canAfford = gameState.qi >= currentCost
                  const currentOutput = fac.level * fac.baseOutput

                  return (
                    <div
                      key={fac.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        fac.level > 0
                          ? 'bg-slate-900/80 border-amber-500/30 shadow-md'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl p-1.5 rounded-lg bg-black/40 border border-slate-700/60">
                              {fac.icon}
                            </span>
                            <div>
                              <h4 className="font-serif font-bold text-slate-100 text-sm flex items-center gap-2">
                                {fac.name}
                                <span className="text-[11px] font-mono font-normal text-amber-300">
                                  Lv.{fac.level}
                                </span>
                              </h4>
                              <div className="text-[11px] text-slate-400 font-mono">
                                {fac.nameEn}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-semibold text-emerald-400">
                              +{currentOutput} Qi/s
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300/80 font-serif mt-2.5 leading-relaxed">
                          {fac.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="text-xs font-mono text-slate-400">
                          升級花費：
                          <span className={canAfford ? 'text-yellow-300 font-bold' : 'text-slate-500'}>
                            {currentCost.toLocaleString()} Qi
                          </span>
                        </div>
                        <button
                          onClick={() => handleUpgradeFacility(fac.id)}
                          disabled={!canAfford}
                          className={`px-3 py-1.5 rounded-lg font-serif text-xs font-bold transition-all cursor-pointer ${
                            canAfford
                              ? 'btn-mystic-gold'
                              : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                          }`}
                        >
                          {fac.level === 0 ? '建造 (Build)' : '升級 (Upgrade)'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Family Heritage (家族傳承 - 2nd Stage Requirement) */}
          {activeTab === 'heritage' && (
            <div className="mystic-card rounded-2xl p-5 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif font-black text-lg text-emerald-300 flex items-center gap-2">
                    <Dna size={20} className="text-emerald-400" />
                    🧬 家族傳承 (Family Heritage Traits)
                  </h3>
                  <p className="text-xs text-slate-400 font-serif mt-0.5">
                    老祖歷次突破所銘刻的太古血脈天賦，世代傳承，庇佑萬載。
                  </p>
                </div>
                <div className="text-xs font-serif px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  已啟動 {gameState.activeTraits.length} 條天賦
                </div>
              </div>

              {gameState.activeTraits.length === 0 ? (
                <div className="p-8 rounded-xl bg-black/40 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-2">📜</div>
                  <h4 className="font-serif font-bold text-slate-300 text-base">暫無家族傳承天賦</h4>
                  <p className="text-xs text-slate-400 font-serif max-w-md mt-1">
                    當老祖點擊「老祖突破 (Breakthrough)」邁入全新修真境界時，天地將降下三選一家族天賦，助家族飛速崛起！
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {gameState.activeTraits.map((trait, index) => {
                    const rarityColors = {
                      common: 'border-slate-600 text-slate-300 bg-slate-900/70',
                      rare: 'border-blue-500/60 text-blue-300 bg-blue-950/40',
                      epic: 'border-purple-500/60 text-purple-300 bg-purple-950/40',
                      legendary: 'border-amber-400/80 text-amber-200 bg-amber-950/40 glow-gold'
                    }

                    return (
                      <div
                        key={`${trait.id}_${index}`}
                        className={`p-4 rounded-xl border backdrop-blur-md flex items-start gap-3.5 shadow-lg ${
                          rarityColors[trait.rarity] || rarityColors.rare
                        }`}
                      >
                        <div className="text-3xl p-2 rounded-lg bg-black/50 border border-white/10 flex-shrink-0">
                          {trait.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-black text-base tracking-wide flex items-center gap-1.5">
                              {trait.name}
                            </h4>
                            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10">
                              {trait.rarity}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-400 mb-1">
                            {trait.titleEn}
                          </div>
                          <p className="text-xs text-slate-200 font-serif leading-relaxed">
                            {trait.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Disciples & Lineage (族人譜牒) */}
          {activeTab === 'disciples' && (
            <div className="mystic-card rounded-2xl p-5 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif font-black text-lg text-cyan-200 flex items-center gap-2">
                    <Users size={20} className="text-cyan-400" />
                    家族子弟譜牒 (Clan Lineage & Disciples)
                  </h3>
                  <p className="text-xs text-slate-400 font-serif mt-0.5">
                    紀錄家族歷代菁英子弟修為與靈根天賦。
                  </p>
                </div>
                <button
                  onClick={handleRecruitMember}
                  disabled={gameState.qi < finalRecruitCost || gameState.members >= currentRealm.maxMembers}
                  className="px-3 py-1.5 rounded-lg btn-mystic-jade font-serif text-xs font-bold cursor-pointer"
                >
                  招募子嗣 ({finalRecruitCost} Qi)
                </button>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {gameState.disciples.map((disciple) => (
                  <div
                    key={disciple.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm border border-slate-700">
                        {disciple.gender === 'female' ? '🌸' : '⚔️'}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-slate-200 text-sm flex items-center gap-2">
                          {disciple.name}
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-serif">
                            第 {disciple.generation} 代
                          </span>
                        </div>
                        <div className="text-xs font-mono text-emerald-400">
                          {disciple.root}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-serif text-slate-300">
                        修為：<span className="text-amber-300">{disciple.realm}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        忠誠度: {disciple.loyalty}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Chronicles Log (Ancient Scroll / Sleek Terminal) */}
          {activeTab === 'chronicles' && (
            <div className="scroll-container rounded-2xl p-5 border-2 border-[#8c6b32] relative shadow-2xl">
              {/* Ancient Scroll Top Ornament */}
              <div className="flex items-center justify-between pb-3 border-b border-[#8c6b32]/40 mb-3">
                <div className="flex items-center gap-2">
                  <Scroll size={20} className="text-[#d4af37]" />
                  <h3 className="font-serif font-black text-lg text-[#f3e5ab] tracking-widest">
                    📜 家族萬載道統紀事 (Clan Chronicles)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#c5a059]">
                  實時推演中 • 靈台自明
                </span>
              </div>

              {/* Scroll Content with Sleek Mystical Aesthetic */}
              <div className="h-[360px] overflow-y-auto space-y-2.5 pr-2 font-serif text-sm">
                {gameState.logs.map((log) => {
                  const typeStyles = {
                    info: 'text-[#d6c7a1] border-l-2 border-[#8c6b32]/50 pl-3',
                    breakthrough: 'text-amber-300 font-bold border-l-4 border-yellow-400 pl-3 bg-amber-950/20 py-1 rounded-r',
                    trait: 'text-emerald-300 font-bold border-l-4 border-emerald-400 pl-3 bg-emerald-950/20 py-1 rounded-r',
                    event_good: 'text-teal-300 border-l-3 border-teal-400 pl-3 bg-teal-950/20 py-1 rounded-r',
                    event_bad: 'text-rose-300 border-l-3 border-rose-500 pl-3 bg-rose-950/20 py-1 rounded-r',
                    recruit: 'text-sky-300 border-l-2 border-sky-500/60 pl-3',
                    facility: 'text-amber-200 border-l-2 border-amber-500/60 pl-3',
                    achievement: 'text-yellow-200 border-l-4 border-yellow-500 pl-3'
                  }

                  return (
                    <div
                      key={log.id}
                      className={`text-xs leading-relaxed transition-all ${
                        typeStyles[log.type] || typeStyles.info
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-60 mr-2 text-[#c5a059]">
                        [{log.timestamp}]
                      </span>
                      <span>{log.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bottom Persistent Compact Chronicle Ticker */}
          {activeTab !== 'chronicles' && (
            <div className="scroll-container rounded-xl p-3 border border-[#8c6b32]/50 flex items-center justify-between gap-3 text-xs font-serif">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Scroll size={16} className="text-[#d4af37] flex-shrink-0" />
                <span className="text-[#c5a059] flex-shrink-0 font-mono">
                  [{gameState.logs[0]?.timestamp || '元年'}]
                </span>
                <p className="text-[#f3e5ab] truncate">
                  {gameState.logs[0]?.text || '家族初立，靈氣復甦。'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('chronicles')}
                className="text-xs text-[#d4af37] hover:text-yellow-200 underline flex-shrink-0 font-serif cursor-pointer"
              >
                查看全部紀事 &gt;
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL: Trait Choice Popup (2nd Stage Requirement) */}
      {/* ========================================================= */}
      {traitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="mystic-card max-w-2xl w-full rounded-2xl p-6 border-2 border-amber-400 shadow-[0_0_50px_rgba(234,179,8,0.4)] relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-3xl shadow-lg border border-amber-300/40 mb-3">
                🧬
              </div>
              <h2 className="font-serif font-black text-2xl text-amber-200 tracking-wider">
                老祖突破・覺醒家族天賦 (Family Heritage Trait)
              </h2>
              <p className="text-xs text-slate-300 font-serif mt-1 max-w-md mx-auto">
                恭喜老祖衝破桎梏！天地道則共鳴，請為修仙家族銘刻一條無上傳承天賦（三選一）：
              </p>
            </div>

            {/* 3 Trait Choices Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {availableTraitChoices.map((trait) => {
                const rarityTag = {
                  common: 'bg-slate-800 text-slate-300',
                  rare: 'bg-blue-900 text-blue-200 border border-blue-400/40',
                  epic: 'bg-purple-900 text-purple-200 border border-purple-400/40',
                  legendary: 'bg-amber-900 text-amber-100 border border-amber-400/60 glow-gold'
                }

                return (
                  <div
                    key={trait.id}
                    onClick={() => handleSelectTrait(trait)}
                    className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 hover:scale-105 hover:bg-slate-800 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl p-1">{trait.icon}</span>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${rarityTag[trait.rarity]}`}>
                          {trait.rarity}
                        </span>
                      </div>
                      <h4 className="font-serif font-black text-base text-amber-100 group-hover:text-yellow-300 transition-colors">
                        {trait.name}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-400 mb-2">
                        {trait.titleEn}
                      </div>
                      <p className="text-xs text-slate-300 font-serif leading-relaxed">
                        {trait.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="mt-4 w-full py-2 rounded-lg btn-mystic-gold text-xs font-serif font-bold cursor-pointer"
                    >
                      傳承此天賦 (Select)
                    </button>
                  </div>
                )
              })}
            </div>

            <p className="text-[11px] text-slate-400 text-center font-serif">
              天賦一經選定，將永久銘刻於家族血脈中，並即時生效！
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: Settings & Game Info */}
      {/* ========================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="mystic-card max-w-lg w-full rounded-2xl p-6 border border-amber-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif font-bold text-lg text-amber-200 flex items-center gap-2">
                <Info size={18} />
                修仙世家・遊戲指南與設置
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-200 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs font-serif text-slate-300 leading-relaxed">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-amber-300 block mb-1">🎮 核心玩法：</strong>
                1. 點擊「閉關修煉 (Gather Qi)」或依靠族人與洞天設施自動凝聚天地靈氣。<br />
                2. 靈氣充足時點擊「老祖突破」，解鎖「家族天賦 (Family Traits)」三選一！<br />
                3. 每 15~30 秒隨機觸發突發奇遇事件，吉凶禍福皆在造化之中。<br />
                4. 開闢各大洞天設施，壯大族人人丁，最終飛昇真仙！
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-emerald-300 block mb-1">🧬 天賦系統特色：</strong>
                包含「多子多福」（招募花費-20%）、「天靈根血脈」（族人產出+50%）、「勤能補拙」（點擊2x Qi）等十餘種深度家族天賦！
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={handleResetGame}
                className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 text-xs font-serif cursor-pointer"
              >
                重置遊戲 (Reset Game)
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-1.5 rounded-lg btn-mystic-gold text-xs font-serif font-bold cursor-pointer"
              >
                返回修仙 (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-500/10 bg-black/60 py-3 text-center text-xs font-serif text-slate-500">
        修仙家族 (Cultivation Family) • 仙道傳承模擬 • 最佳策劃評審專用版本
      </footer>
    </div>
  )
}
