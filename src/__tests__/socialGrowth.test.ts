import { describe, expect, it } from 'vitest';
import type { Child } from '../types';
import {
  buildGrowthLeaderboard,
  buildMomentsPosterSvg,
  buildMomentsShareText,
  calculateGrowthScore,
  getShareAudienceSize,
  type GrowthSnapshot,
} from '../lib/socialGrowth';

function createChild(id: string, nickname: string): Child {
  return {
    _id: id,
    nickname,
    age: 5,
    gender: 'boy',
    avatarId: 'rocket',
  };
}

function createSnapshot(overrides: Partial<GrowthSnapshot> & { child: Child }): GrowthSnapshot {
  return {
    child: overrides.child,
    stars: 0,
    level: 1,
    streakDays: 0,
    dueReviewCount: 0,
    accuracy: 0,
    tasksCompleted: 0,
    weakPoints: [],
    ...overrides,
  };
}

describe('social growth helpers', () => {
  it('calculates a stable growth score from progress signals', () => {
    expect(
      calculateGrowthScore(
        createSnapshot({
          child: createChild('c1', '小宇'),
          stars: 12,
          level: 3,
          streakDays: 5,
          dueReviewCount: 4,
          accuracy: 0.86,
          tasksCompleted: 30,
        })
      )
    ).toBe(961);
  });

  it('ranks equal-score children by streak first and accuracy second', () => {
    const entries = buildGrowthLeaderboard([
      createSnapshot({
        child: createChild('steady', '稳稳'),
        level: 1,
        streakDays: 1,
      }),
      createSnapshot({
        child: createChild('sharp', '聪聪'),
        level: 1,
        streakDays: 1,
        accuracy: 0.1,
        tasksCompleted: 1,
        dueReviewCount: 10,
      }),
      createSnapshot({
        child: createChild('streak', '冲冲'),
        level: 1,
        streakDays: 2,
        tasksCompleted: 2,
        dueReviewCount: 11,
      }),
    ]);

    expect(entries.map((entry) => entry.childId)).toEqual(['streak', 'sharp', 'steady']);
    expect(entries.map((entry) => entry.rank)).toEqual([1, 2, 3]);
    expect(entries.map((entry) => entry.badge)).toEqual(['🥇', '🥈', '🥉']);
  });

  it('never renders an impossible share audience size', () => {
    const entry = buildGrowthLeaderboard([
      createSnapshot({
        child: createChild('c9', '小光'),
        level: 2,
        streakDays: 4,
        tasksCompleted: 8,
        weakPoints: ['拼音复习'],
      }),
    ])[0];

    expect(getShareAudienceSize(0, entry.rank)).toBe(1);
    expect(buildMomentsShareText({ ...entry, rank: 5 }, 0)).toContain('第 5/5 名');
  });

  it('escapes poster text so special characters stay safe in SVG output', () => {
    const entry = buildGrowthLeaderboard([
      createSnapshot({
        child: createChild('svg', `星<&>"'`),
        level: 2,
        streakDays: 3,
      }),
    ])[0];

    const svg = buildMomentsPosterSvg({ ...entry, rank: 5 }, 0);

    expect(svg).toContain('星&lt;&amp;&gt;&quot;&apos;');
    expect(svg).toContain('全站成长榜第 5/5 名');
  });
});
