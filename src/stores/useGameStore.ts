import { create } from 'zustand';

interface GameState {
  currentIsland: 'home' | 'pinyin' | 'math' | 'english' | 'stories' | 'parent';
  isGameLocked: boolean;
  currentQuestion: any;
  feedback: string | null;
  
  setCurrentIsland: (island: GameState['currentIsland']) => void;
  setGameLocked: (locked: boolean) => void;
  setCurrentQuestion: (question: any) => void;
  setFeedback: (feedback: string | null) => void;
  clearGame: () => void;
}

export const useGameStore = create<GameState>()((set) => ({
  currentIsland: 'home',
  isGameLocked: false,
  currentQuestion: null,
  feedback: null,
  
  setCurrentIsland: (currentIsland) => set({ currentIsland }),
  setGameLocked: (isGameLocked) => set({ isGameLocked }),
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
  setFeedback: (feedback) => set({ feedback }),
  
  clearGame: () => set({
    currentIsland: 'home',
    isGameLocked: false,
    currentQuestion: null,
    feedback: null,
  }),
}));
