import create from 'zustand'

const useGameStore = create((set) => ({
  currentRound: 0,
  score: 0,
  rewards: [],
  parentSummary: null,

  // actions
  addScore: (n = 1) => set((s) => ({ score: s.score + n })),
  pushReward: (r) => set((s) => ({ rewards: [...s.rewards, r] })),
  clearRewards: () => set(() => ({ rewards: [] })),
  setParentSummary: (summary) => set(() => ({ parentSummary: summary })),
  nextRound: () => set((s) => ({ currentRound: s.currentRound + 1 })),
  reset: () => set(() => ({ currentRound: 0, score: 0, rewards: [], parentSummary: null }))
}))

export default useGameStore
