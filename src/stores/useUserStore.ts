import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Parent, Child } from '../types';

interface UserState {
  parent: Parent | null;
  currentChild: Child | null;
  children: Child[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setParent: (parent: Parent | null) => void;
  setCurrentChild: (child: Child | null) => void;
  setChildren: (children: Child[]) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

const defaultParent: Parent = {
  settings: {
    dailyTimeLimit: 15,
    soundEnabled: true,
    musicEnabled: true,
    notificationsEnabled: true,
  },
  children: [],
};

const defaultChild: Child = {
  nickname: '小朋友',
  age: 5,
  birthYearMonth: undefined,
  gender: 'girl',
  avatarId: 'star_girl',
  inferredAge: 5,
  inferredDifficulty: 'easy',
};

function normalizeChildGender(child: Child): Child {
  return ((child.gender as string) === 'other'
    ? { ...child, gender: 'girl' as const }
    : child);
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      parent: defaultParent,
      currentChild: defaultChild,
      children: [defaultChild],
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      setParent: (parent) => set({ parent }),
      setCurrentChild: (currentChild) => {
        set({ currentChild });
        if (currentChild) {
          // Dynamic import to avoid circular dependency
          import('./useGameStore').then(({ useGameStore }) => {
            useGameStore.getState().syncKnowledgeWithAge(currentChild.inferredAge ?? currentChild.age);
          });
        }
      },
      setChildren: (children) => {
        const normalized = children.map(normalizeChildGender);
        let nextCurrent: Child | null = null;
        set((state) => {
          const preferredId = state.currentChild?._id;
          const fallback = normalized[0] ?? null;
          nextCurrent = normalized.find((child) => child._id === preferredId) ?? fallback;
          return {
            children: normalized,
            currentChild: nextCurrent,
          };
        });
        if (nextCurrent) {
          import('./useGameStore').then(({ useGameStore }) => {
            useGameStore.getState().syncKnowledgeWithAge(nextCurrent!.inferredAge ?? nextCurrent!.age);
          });
        }
      },
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      clearUser: () => set({
        parent: defaultParent,
        currentChild: defaultChild,
        children: [defaultChild],
        isAuthenticated: false,
      }),
    }),
    {
      name: 'kids-game-user-storage',
      version: 1,
      migrate: (persisted) => {
        const state = persisted as UserState | undefined
        if (!state?.currentChild) return persisted as UserState
        const fix = (ch: Child) => normalizeChildGender(ch)
        return {
          ...state,
          currentChild: fix(state.currentChild),
          children: state.children.map(fix),
        }
      },
    }
  )
);
