/**
 * 关卡进度持久化 Store
 * 按 gameId + levelId 记录每一关的完成状态、最高星数、挑战次数
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LevelRecord {
  /** 最高星数（0 = 未通过，1–3 = 通关） */
  bestStars: number;
  /** 是否曾经通关 */
  completed: boolean;
  /** 总挑战次数 */
  attempts: number;
  /** 最近通关时间 */
  lastCompletedAt?: string;
}

/** key: `${gameId}::${levelId}` */
type LevelKey = string;

interface LevelStoreState {
  records: Record<LevelKey, LevelRecord>;

  /** 读取某一关的进度记录（不存在时返回初始值） */
  getLevelRecord: (gameId: string, levelId: string) => LevelRecord;

  /** 记录一次关卡结果（会更新 bestStars / completed / attempts） */
  recordLevelResult: (
    gameId: string,
    levelId: string,
    stars: number,
    passed: boolean
  ) => void;

  /** 重置某游戏的所有关卡进度（家长用） */
  resetGameProgress: (gameId: string) => void;

  /** 判断某关是否已解锁（解锁条件：前一关已通关 or 是第一关） */
  isLevelUnlocked: (
    gameId: string,
    levelId: string,
    orderedLevelIds: string[]
  ) => boolean;
}

const DEFAULT_RECORD: LevelRecord = {
  bestStars: 0,
  completed: false,
  attempts: 0,
};

function makeKey(gameId: string, levelId: string): LevelKey {
  return `${gameId}::${levelId}`;
}

export const useLevelStore = create<LevelStoreState>()(
  persist(
    (set, get) => ({
      records: {},

      getLevelRecord(gameId, levelId) {
        return get().records[makeKey(gameId, levelId)] ?? { ...DEFAULT_RECORD };
      },

      recordLevelResult(gameId, levelId, stars, passed) {
        const key = makeKey(gameId, levelId);
        const existing = get().records[key] ?? { ...DEFAULT_RECORD };
        set((state) => ({
          records: {
            ...state.records,
            [key]: {
              bestStars: Math.max(existing.bestStars, stars),
              completed: existing.completed || passed,
              attempts: existing.attempts + 1,
              lastCompletedAt: passed ? new Date().toISOString() : existing.lastCompletedAt,
            },
          },
        }));
      },

      resetGameProgress(gameId) {
        set((state) => {
          const prefix = `${gameId}::`;
          const next = { ...state.records };
          for (const k of Object.keys(next)) {
            if (k.startsWith(prefix)) delete next[k];
          }
          return { records: next };
        });
      },

      isLevelUnlocked(gameId, levelId, orderedLevelIds) {
        const index = orderedLevelIds.indexOf(levelId);
        if (index <= 0) return true; // 第一关始终解锁
        const prevId = orderedLevelIds[index - 1];
        return get().getLevelRecord(gameId, prevId).completed;
      },
    }),
    {
      name: 'kids-game-level-progress-v1',
    }
  )
);
