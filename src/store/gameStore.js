import { create } from 'zustand'
import { createInitialKnowledgeState } from '../data/learningContent'

const PROFILE_KEY = 'kids-game-profile'
const HISTORY_KEY = 'kids-game-history'
const KNOWLEDGE_KEY = 'kids-game-knowledge'

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
    // Ignore persistence failures in constrained browsers.
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
  streakDays: 3,
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

const useGameStore = create((set, get) => ({
  profile: loadJson(PROFILE_KEY, defaultProfile),
  mission: [],
  missionIndex: 0,
  rewards: [],
  parentSummary: null,
  stats: {
    ...defaultStats,
    history: loadJson(HISTORY_KEY, [])
  },
  knowledge: loadKnowledgeState(),

  setProfile: (profile) => {
    const nextProfile = { ...get().profile, ...profile }
    saveJson(PROFILE_KEY, nextProfile)
    set({ profile: nextProfile })
  },

  startMission: (mission) => {
    set((state) => ({
      mission,
      missionIndex: 0,
      parentSummary: null,
      stats: {
        ...state.stats,
        completedTasks: 0,
        correctAnswers: 0,
        mistakes: 0,
        sessionStartedAt: Date.now()
      }
    }))
  },

  recordTaskResult: ({ taskId, success, stars = 0, skill, prompt, responseTime, knowledgeUnitId, response }) => {
    set((state) => {
      const completedTasks = state.stats.completedTasks + 1
      const correctAnswers = state.stats.correctAnswers + (success ? 1 : 0)
      const mistakes = state.stats.mistakes + (success ? 0 : 1)
      const gainedXp = success ? 12 + stars * 4 : 4
      const totalXp = state.stats.xp + gainedXp
      const nextLevel = Math.max(1, Math.floor(totalXp / 60) + 1)
      const historyEntry = {
        taskId,
        skill,
        knowledgeUnitId,
        prompt,
        success,
        stars,
        response,
        responseTime,
        completedAt: new Date().toISOString()
      }
      const history = [...state.stats.history, historyEntry].slice(-30)
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

      return {
        knowledge: nextKnowledge,
        stats: {
          ...state.stats,
          completedTasks,
          correctAnswers,
          mistakes,
          stars: state.stats.stars + stars,
          xp: totalXp,
          level: nextLevel,
          history
        }
      }
    })
  },

  queueReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
  clearRewards: () => set({ rewards: [] }),
  nextTask: () => set((state) => ({ missionIndex: Math.min(state.missionIndex + 1, state.mission.length) })),
  setParentSummary: (parentSummary) => set({ parentSummary }),

  resetMission: () =>
    set((state) => ({
      mission: [],
      missionIndex: 0,
      rewards: [],
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
