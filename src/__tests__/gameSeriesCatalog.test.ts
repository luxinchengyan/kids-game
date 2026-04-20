import { describe, expect, it } from 'vitest';
import {
  getGameSeriesConfig,
  getGameSeriesSnapshot,
} from '../data/gameSeriesCatalog';

describe('game series catalog', () => {
  it('returns staged progression metadata for framework games', () => {
    const config = getGameSeriesConfig('math-pattern');

    expect(config?.arcTitle).toBe('规律侦探队');
    expect(config?.levels).toHaveLength(3);
    expect(config?.levels.map((level) => level.difficultyLabel)).toEqual([
      '入门',
      '进阶',
      '挑战',
    ]);
  });

  it('builds lightweight snapshots for hub cards', () => {
    const snapshot = getGameSeriesSnapshot('english-word-flip');

    expect(snapshot).toEqual({
      stageCount: 3,
      bankLabel: '题库 30',
      ladderLabel: '入门 / 进阶 / 挑战',
      stageLabel: '3 个级别',
    });
  });

  it('exposes progression metadata for typing games', () => {
    const config = getGameSeriesConfig('prompt-workshop');

    expect(config?.arcTitle).toBe('小小提示词工坊');
    expect(config?.levels.map((level) => level.title)).toEqual(['短词问候', '两词指令', '完整口令']);
  });

  it('returns undefined for games without series metadata', () => {
    expect(getGameSeriesConfig('non-existent-game')).toBeUndefined();
    expect(getGameSeriesSnapshot('non-existent-game')).toBeUndefined();
  });
});
