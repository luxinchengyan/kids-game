import { describe, expect, it } from 'vitest';
import {
  buildGrowthInsights,
  buildLearningSystemSnapshot,
  buildStudyCalendar,
  getExpandedSubjects,
  getEncyclopediaTopics,
  getJourneyStage,
} from '../data/homeLearningJourney';

const themes = [
  {
    id: 'pinyin-hub',
    name: '拼音星球',
    icon: '🪐',
    learningPath: {
      routeOrder: 1,
      levelLabel: '主线',
      ageRange: '4-6岁',
      skillFocus: ['拼读', '辨音'],
      assessmentScope: ['声母', '韵母'],
      learningGoal: '建立拼音感知',
      pedagogyTip: '先听后说',
      mapZone: '语言港',
      milestoneType: 'hub' as const,
    },
    progress: {
      totalGames: 4,
      playedCount: 3,
      completionRate: 75,
      totalStars: 8,
    },
  },
  {
    id: 'math-hub',
    name: '数学星球',
    icon: '🔢',
    learningPath: {
      routeOrder: 2,
      levelLabel: '主线',
      ageRange: '5-7岁',
      skillFocus: ['数量', '逻辑'],
      assessmentScope: ['数字', '规律'],
      learningGoal: '建立数感',
      pedagogyTip: '边操作边理解',
      mapZone: '逻辑港',
      milestoneType: 'hub' as const,
    },
    progress: {
      totalGames: 5,
      playedCount: 1,
      completionRate: 20,
      totalStars: 2,
    },
  },
];

describe('home learning journey helpers', () => {
  it('selects the right growth stage for the child age', () => {
    expect(getJourneyStage(4).id).toBe('seed');
    expect(getJourneyStage(5).id).toBe('bridge');
    expect(getJourneyStage(6).id).toBe('voyage');
  });

  it('builds a weekly calendar with today marker and streak-based completion', () => {
    const calendar = buildStudyCalendar({
      age: 5,
      streakDays: 3,
      themes,
      selectedThemeId: 'math-hub',
      referenceDate: new Date('2026-04-22T08:00:00.000Z'),
    });

    expect(calendar).toHaveLength(7);
    expect(calendar.filter((day) => day.isToday)).toHaveLength(1);
    expect(calendar.filter((day) => day.completed)).toHaveLength(3);
    expect(calendar.some((day) => day.title.includes('数学星球'))).toBe(true);
  });

  it('filters encyclopedia topics by age while keeping expanded subjects', () => {
    const youngerTopics = getEncyclopediaTopics(4);
    const olderTopics = getEncyclopediaTopics(6);

    expect(youngerTopics.some((topic) => topic.subject === '物理')).toBe(false);
    expect(olderTopics.some((topic) => topic.subject === '物理')).toBe(true);
  });

  it('collects chemistry and physics experiments by principle', () => {
    const subjects = getExpandedSubjects();
    const chemistry = subjects.find((subject) => subject.id === 'chemistry');
    const physics = subjects.find((subject) => subject.id === 'physics');

    expect(chemistry?.experimentCollections?.map((item) => item.principle)).toEqual([
      '溶解与结晶',
      '酸碱指示与产气反应',
      '表面张力与乳化',
      '氧化与材料变化',
    ]);
    expect(physics?.experimentCollections?.map((item) => item.principle)).toEqual([
      '力与运动',
      '空气与压强',
      '光的反射与折射',
      '声音与磁力',
    ]);
    expect(chemistry?.experimentCollections?.every((item) => item.experiments.length >= 4)).toBe(true);
    expect(physics?.experimentCollections?.every((item) => item.experiments.length >= 4)).toBe(true);
    expect(chemistry?.experimentCollections?.every((item) => item.marketInsight.length > 0)).toBe(true);
    expect(physics?.experimentCollections?.every((item) => item.marketInsight.length > 0)).toBe(true);
    expect(chemistry?.experimentCollections?.every((item) => item.designPlan.gameDesign.length > 0)).toBe(true);
    expect(physics?.experimentCollections?.every((item) => item.designPlan.testing.length > 0)).toBe(true);
  });

  it('includes a child-friendly AI learning route', () => {
    const subjects = getExpandedSubjects();
    const ai = subjects.find((subject) => subject.id === 'ai');

    expect(ai?.title).toBe('人工智能探索站');
    expect(ai?.learningRoute).toHaveLength(5);
    expect(ai?.learningRoute?.map((step) => step.title)).toEqual([
      '看见 AI 在哪里',
      '教会 AI 学规则',
      '学会清楚地提问',
      '和 AI 一起创作',
      '做负责任的小小 AI 探险家',
    ]);
  });

  it('summarizes strengths and next focus areas from theme progress', () => {
    const insights = buildGrowthInsights({
      childName: '小米',
      age: 5,
      streakDays: 4,
      themes,
      selectedThemeId: 'pinyin-hub',
    });

    expect(insights.recordSummary).toContain('小米');
    expect(insights.advantageNote).toContain('拼音星球');
    expect(insights.watchoutNote).toContain('数学星球');
    expect(insights.focusSuggestions[0]).toContain('数学星球');
  });

  it('builds a system snapshot with adaptive recommendation and daily plan', () => {
    const snapshot = buildLearningSystemSnapshot({
      childName: '小米',
      age: 5,
      themes,
      weakPointLabels: ['b', 'cat'],
      dueReviewCount: 2,
      coverage: {
        pinyin: 60,
        math: 22,
        english: 30,
        stories: 18,
        total: 130,
      },
    });

    expect(snapshot.recommendedThemeId).toBe('math-hub');
    expect(snapshot.recommendationReason).toContain('数学星球');
    expect(snapshot.systemCards).toHaveLength(4);
    expect(snapshot.systemCards[2].metric).toContain('待复习 2 项');
    expect(snapshot.dailyPlan).toHaveLength(4);
    expect(snapshot.dailyPlan[0].detail).toContain('b');
  });
});
