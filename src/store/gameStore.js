import { create } from 'zustand'
import { createInitialKnowledgeState } from '../data/learningContent'
import {
  checkAchievements,
  calculateStarsEarned,
  getLevelProgress,
  achievements
} from '../data/rewards'

const PROFILE_KEY = 'kids-game-profile'
const HISTORY_KEY = 'kids-game-history'
const KNOWLEDGE_KEY = 'kids-game-knowledge'
const ACHIEVEMENT_KEY = 'kids-game-achievements'
const STREAK_KEY = 'kids-game-streak'

function loadJson(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJson(key, value) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
  }
}

const defaultProfile = {
  childName: '',
  ageGroup: '4-5',
  gender: 'girl',
  focus: 'mixed',
  language: 'zh',
  companion: 'elsa'
}

const defaultStats = {
  completedTasks: 0,
  correctAnswers: 0,
  mistakes: 0,
  stars: 0,
  streakDays: 0,
  level: 1,
  xp: 0,
  sessionStartedAt: null,
  history: []
}

function loadKnowledgeState() {
  const defaults = createInitialKnowledgeState()
  const saved = loadJson(KNOWLEDGE_KEY, {})
  return { ...defaults, ...saved }
}

function scheduleNextReview(accuracy, previousNextReviewAt) {
  const now = Date.now()
  const intervals = [10 * 60 * 1000, 24 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000]
  if (accuracy > 0.9 && previousNextReviewAt > now) {
    return previousNextReviewAt + intervals[0]
  }
  if (accuracy > 0.85) return now + intervals[1]
  if (accuracy > 0.6) return now + intervals[0]
  return now + 5 * 60 * 1000
}

function updateStreak() {
  const today = new Date().toDateString()
  const lastPlayDate = loadJson(STREAK_KEY, { date: null, count: 0 })
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  let newStreak = lastPlayDate.count
  if (lastPlayDate.date === today) {
  } else if (lastPlayDate.date === yesterday) {
    newStreak += 1
  } else if (lastPlayDate.date) {
    newStreak = 1
  } else {
    newStreak = 1
  }

  saveJson(STREAK_KEY, { date: today, count: newStreak })
  return newStreak
}

const useGameStore = create((set, get) => ({
  profile: loadJson(PROFILE_KEY, defaultProfile),
  mission: [],
  missionIndex: 0,
  rewards: [],
  newAchievements: [],
  parentSummary: null,
  unlockedAchievements: loadJson(ACHIEVEMENT_KEY, []),
  stats: {
    ...defaultStats,
    history: loadJson(HISTORY_KEY, []),
    streakDays: loadJson(STREAK_KEY, { count: 0 }).count
  },
  knowledge: loadKnowledgeState(),

  setProfile: (profile) => {
    const nextProfile = { ...get().profile, ...profile }
    saveJson(PROFILE_KEY, nextProfile)
    set({ profile: nextProfile })
  },

  startMission: (mission) => {
    const streakDays = updateStreak()
    set((state) => ({
      mission,
      missionIndex: 0,
      parentSummary: null,
      newAchievements: [],
      stats: {
        ...state.stats,
        completedTasks: 0,
        correctAnswers: 0,
        mistakes: 0,
        sessionStartedAt: Date.now(),
        streakDays
      }
    }))
  },

  recordTaskResult: ({ taskId, success, stars = 0, skill, prompt, responseTime, knowledgeUnitId, response }) => {
    set((state) => {
      const completedTasks = state.stats.completedTasks + 1
      const correctAnswers = state.stats.correctAnswers + (success ? 1 : 0)
      const mistakes = state.stats.mistakes + (success ? 0 : 1)
      const earnedStars = success ? calculateStarsEarned({ success, accuracy: 1 }) : 0
      const totalStars = state.stats.stars + earnedStars
      const gainedXp = success ? 12 + earnedStars * 4 : 4
      const totalXp = state.stats.xp + gainedXp
      const levelProgress = getLevelProgress(totalXp)

      const historyEntry = {
        taskId,
        skill,
        knowledgeUnitId,
        prompt,
        success,
        stars: earnedStars,
        response,
        responseTime,
        completedAt: new Date().toISOString()
      }
      const history = [...state.stats.history, historyEntry].slice(-50)

      const nextKnowledge = { ...state.knowledge }

      if (knowledgeUnitId && nextKnowledge[knowledgeUnitId]) {
        const unit = nextKnowledge[knowledgeUnitId]
        const seenCount = unit.seenCount + 1
        const correctCount = unit.correctCount + (success ? 1 : 0)
        const accuracy = correctCount / seenCount
        nextKnowledge[knowledgeUnitId] = {
          ...unit,
          seenCount,
          correctCount,
          accuracy,
          errorCount: unit.errorCount + (success ? 0 : 1),
          lastReviewedAt: Date.now(),
          nextReviewAt: scheduleNextReview(accuracy, unit.nextReviewAt)
        }
        saveJson(KNOWLEDGE_KEY, nextKnowledge)
      }

      saveJson(HISTORY_KEY, history)

      const currentStats = {
        ...state.stats,
        completedTasks,
        correctAnswers,
        mistakes,
        stars: totalStars,
        xp: totalXp,
        level: levelProgress.level,
        history
      }

      const newAchievements = checkAchievements(
        currentStats,
        history,
        state.unlockedAchievements
      )

      let updatedAchievements = [...state.unlockedAchievements]
      if (newAchievements.length > 0) {
        updatedAchievements = [
          ...state.unlockedAchievements,
          ...newAchievements.map(a => a.id)
        ]
        saveJson(ACHIEVEMENT_KEY, updatedAchievements)
      }

      const rewards = []
      if (earnedStars > 0) {
        rewards.push({ type: 'star', amount: earnedStars })
      }
      newAchievements.forEach(achievement => {
        rewards.push({ type: 'achievement', achievement })
      })

      return {
        knowledge: nextKnowledge,
        stats: currentStats,
        newAchievements: [...state.newAchievements, ...newAchievements],
        unlockedAchievements: updatedAchievements,
        rewards: [...state.rewards, ...rewards]
      }
    })
  },

  queueReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
  clearRewards: () => set({ rewards: [] }),
  clearNewAchievements: () => set({ newAchievements: [] }),
  nextTask: () => set((state) => ({ missionIndex: Math.min(state.missionIndex + 1, state.mission.length) })),
  setParentSummary: (parentSummary) => set({ parentSummary }),

  resetMission: () =>
    set((state) => ({
      mission: [],
      missionIndex: 0,
      rewards: [],
      newAchievements: [],
      parentSummary: null,
      stats: {
        ...state.stats,
        completedTasks: 0,
        correctAnswers: 0,
        mistakes: 0,
        sessionStartedAt: null
      }
    }))
}))

export default useGameStore
