/**
 * 每日任务系统（Daily Quest Store）
 * 每日 00:00 重置，完成可叠加星星/XP 奖励，驱动 D1/D7 留存。
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { track } from '../lib/analytics';
import { useRewardStore } from './useRewardStore';

export type QuestType = 'learning' | 'accuracy' | 'explore';

export interface DailyQuest {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  completed: boolean;
  reward: { stars: number; xp: number };
}

interface DailyQuestState {
  quests: DailyQuest[];
  lastResetDate: string; // YYYY-MM-DD
  totalCompletedToday: number;
  accuracyStreak: number;
  exploredWorldIds: string[];

  // Actions
  initOrReset: () => void;
  updateProgress: (questId: string, delta: number) => DailyQuest | null;
  completeQuest: (questId: string, source?: string) => { stars: number; xp: number } | null;
  recordTaskResult: (success: boolean) => void;
  recordExplore: (worldId: string) => void;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildDailyQuests(): DailyQuest[] {
  const dateNum = parseInt(todayStr().replace(/-/g, ''), 10);
  const questGroups: Record<QuestType, DailyQuest[]> = {
    learning: [
      {
        id: 'learn_3',
        type: 'learning',
        title: '学习小达人',
        description: '今天完成 3 次学习练习',
        icon: '📚',
        target: 3,
        current: 0,
        completed: false,
        reward: { stars: 10, xp: 20 },
      },
      {
        id: 'learn_5',
        type: 'learning',
        title: '学习小能手',
        description: '今天完成 5 次学习练习',
        icon: '🎯',
        target: 5,
        current: 0,
        completed: false,
        reward: { stars: 20, xp: 40 },
      },
    ],
    accuracy: [
      {
        id: 'accuracy_5',
        type: 'accuracy',
        title: '神准小射手',
        description: '连续答对 5 题',
        icon: '🏹',
        target: 5,
        current: 0,
        completed: false,
        reward: { stars: 15, xp: 30 },
      },
      {
        id: 'accuracy_10',
        type: 'accuracy',
        title: '百发百中',
        description: '连续答对 10 题',
        icon: '⭐',
        target: 10,
        current: 0,
        completed: false,
        reward: { stars: 30, xp: 60 },
      },
    ],
    explore: [
      {
        id: 'explore_new_world',
        type: 'explore',
        title: '好奇探险家',
        description: '今天进入 1 个新世界',
        icon: '🗺️',
        target: 1,
        current: 0,
        completed: false,
        reward: { stars: 8, xp: 15 },
      },
      {
        id: 'explore_two_worlds',
        type: 'explore',
        title: '世界漫游家',
        description: '今天探索 2 个不同世界',
        icon: '🚀',
        target: 2,
        current: 0,
        completed: false,
        reward: { stars: 16, xp: 28 },
      },
    ],
  };

  return (Object.keys(questGroups) as QuestType[]).map((type, index) => {
    const variants = questGroups[type];
    const raw = Math.sin(dateNum * (index + 1) * 17) * 10000;
    const variantIndex = Math.abs(Math.floor(raw)) % variants.length;
    return { ...variants[variantIndex] };
  });
}

function awardQuestCompletion(quest: DailyQuest, source: string) {
  const { addStars, addXP } = useRewardStore.getState();
  addStars(quest.reward.stars);
  addXP(quest.reward.xp);
  track('daily_quest_completed', {
    questId: quest.id,
    questType: quest.type,
    stars: quest.reward.stars,
    xp: quest.reward.xp,
    source,
  });
}

function isTrackableQuestSet(quests: DailyQuest[] | undefined): quests is DailyQuest[] {
  return Array.isArray(quests) && quests.length === 3 && quests.every((quest) => ['learning', 'accuracy', 'explore'].includes(quest.type));
}

export const useDailyQuestStore = create<DailyQuestState>()(
  persist(
    (set, get) => ({
      quests: buildDailyQuests(),
      lastResetDate: todayStr(),
      totalCompletedToday: 0,
      accuracyStreak: 0,
      exploredWorldIds: [],

      initOrReset: () => {
        const today = todayStr();
        if (get().lastResetDate !== today) {
          set({
            quests: buildDailyQuests(),
            lastResetDate: today,
            totalCompletedToday: 0,
            accuracyStreak: 0,
            exploredWorldIds: [],
          });
        }
      },

      updateProgress: (questId, delta) => {
        get().initOrReset();
        let updated: DailyQuest | null = null;
        let completedQuest: DailyQuest | null = null;
        set((state) => {
          const quests = state.quests.map((q) => {
            if (q.id !== questId || q.completed) return q;
            const next = Math.min(q.current + delta, q.target);
            const completed = next >= q.target;
            updated = { ...q, current: next, completed };
            if (completed) {
              completedQuest = updated;
            }
            return updated;
          });
          return {
            quests,
            totalCompletedToday: state.totalCompletedToday + (completedQuest ? 1 : 0),
          };
        });
        if (completedQuest) {
          awardQuestCompletion(completedQuest, 'progress');
        }
        return updated;
      },

      completeQuest: (questId, source = 'manual') => {
        get().initOrReset();
        const quest = get().quests.find((q) => q.id === questId);
        if (!quest || quest.completed) return null;

        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === questId ? { ...q, completed: true, current: q.target } : q
          ),
          totalCompletedToday: state.totalCompletedToday + 1,
        }));

        awardQuestCompletion(quest, source);
        return quest.reward;
      },

      recordTaskResult: (success) => {
        get().initOrReset();
        const completedQuests: DailyQuest[] = [];

        set((state) => {
          const accuracyStreak = success ? state.accuracyStreak + 1 : 0;
          const quests = state.quests.map((quest) => {
            if (quest.completed) {
              return quest;
            }

            if (quest.type === 'learning') {
              const current = Math.min(quest.current + 1, quest.target);
              const updatedQuest = { ...quest, current, completed: current >= quest.target };
              if (updatedQuest.completed) {
                completedQuests.push(updatedQuest);
              }
              return updatedQuest;
            }

            if (quest.type === 'accuracy') {
              const current = Math.min(accuracyStreak, quest.target);
              const updatedQuest = { ...quest, current, completed: current >= quest.target };
              if (updatedQuest.completed) {
                completedQuests.push(updatedQuest);
              }
              return updatedQuest;
            }

            return quest;
          });

          return {
            quests,
            accuracyStreak,
            totalCompletedToday: state.totalCompletedToday + completedQuests.length,
          };
        });

        completedQuests.forEach((quest) => awardQuestCompletion(quest, 'task_result'));
      },

      recordExplore: (worldId) => {
        get().initOrReset();
        const { exploredWorldIds } = get();
        if (exploredWorldIds.includes(worldId)) {
          return;
        }

        set((state) => ({
          exploredWorldIds: [...state.exploredWorldIds, worldId],
        }));

        const exploreQuest = get().quests.find((quest) => quest.type === 'explore' && !quest.completed);
        if (exploreQuest) {
          get().updateProgress(exploreQuest.id, 1);
        }
      },
    }),
    {
      name: 'kids-game-daily-quests',
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<DailyQuestState> | undefined;
        const today = todayStr();
        const shouldReset = state?.lastResetDate !== today || !isTrackableQuestSet(state?.quests);

        return {
          quests: shouldReset ? buildDailyQuests() : state?.quests ?? buildDailyQuests(),
          lastResetDate: shouldReset ? today : state?.lastResetDate ?? today,
          totalCompletedToday: shouldReset ? 0 : state?.totalCompletedToday ?? 0,
          accuracyStreak: shouldReset ? 0 : state?.accuracyStreak ?? 0,
          exploredWorldIds: shouldReset ? [] : state?.exploredWorldIds ?? [],
        };
      },
    }
  )
);
