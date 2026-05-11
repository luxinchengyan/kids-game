import React from 'react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import HomePage from '../pages/HomePage';

const navigateMock = vi.fn();

const themeHubs = [
  {
    id: 'pinyin-hub',
    name: '拼音星球',
    icon: '🔤',
    path: '/games/pinyin',
    category: 'pinyin' as const,
    isThemeHub: true,
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
  },
  {
    id: 'math-hub',
    name: '数学星球',
    icon: '🔢',
    path: '/games/math',
    category: 'math' as const,
    isThemeHub: true,
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
  },
  {
    id: 'english-hub',
    name: '英语星球',
    icon: '🔠',
    path: '/games/english',
    category: 'english' as const,
    isThemeHub: true,
    learningPath: {
      routeOrder: 3,
      levelLabel: '主线',
      ageRange: '4-7岁',
      skillFocus: ['单词', '听辨'],
      assessmentScope: ['词汇', '分类'],
      learningGoal: '建立英语兴趣',
      pedagogyTip: '先听后认',
      mapZone: '语言港',
      milestoneType: 'hub' as const,
    },
  },
  {
    id: 'stories-hub',
    name: '故事剧场',
    icon: '📖',
    path: '/games/stories',
    category: 'stories' as const,
    isThemeHub: true,
    learningPath: {
      routeOrder: 4,
      levelLabel: '主线',
      ageRange: '4-7岁',
      skillFocus: ['表达', '理解'],
      assessmentScope: ['复述', '理解'],
      learningGoal: '训练表达',
      pedagogyTip: '先讲再选',
      mapZone: '表达港',
      milestoneType: 'hub' as const,
    },
  },
];

const themeMap = [
  { hub: themeHubs[0], games: [{ id: 'pinyin-lesson-1' }, { id: 'pinyin-lesson-2' }] },
  { hub: themeHubs[1], games: [{ id: 'math-lesson-1' }, { id: 'math-lesson-2' }] },
  { hub: themeHubs[2], games: [{ id: 'english-lesson-1' }] },
  { hub: themeHubs[3], games: [{ id: 'stories-lesson-1' }] },
];

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const createMotionComponent = (tag: string) =>
    ReactModule.forwardRef<HTMLElement, Record<string, unknown>>(({ children, ...props }, ref) => {
      const domProps = { ...props };
      delete domProps.whileHover;
      delete domProps.whileTap;
      delete domProps.animate;
      delete domProps.initial;
      delete domProps.exit;
      delete domProps.transition;

      return ReactModule.createElement(tag, { ref, ...domProps }, children);
    });

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: createMotionComponent('div'),
      section: createMotionComponent('section'),
      button: createMotionComponent('button'),
    },
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../components/GameNavigation/GameGrid', () => ({
  GameGrid: ({ games }: { games: Array<{ name: string }> }) => (
    <div>{games.map((game) => game.name).join(' / ')}</div>
  ),
}));

vi.mock('../components/ShipLogo', () => ({
  ShipLogo: ({ size }: { size: number }) => <div>Ship {size}</div>,
}));

vi.mock('../components/ParentZone/ParentalGate', () => ({
  ParentalGate: () => <div>ParentalGate</div>,
}));

vi.mock('../components/CompanionBubble', () => ({
  CompanionBubble: ({ message }: { message: string }) => <div>{message}</div>,
}));

vi.mock('../components/ChildSwitcher', () => ({
  ChildSwitcher: () => <div>ChildSwitcher</div>,
}));

vi.mock('../lib/analytics', () => ({
  track: vi.fn(),
}));

vi.mock('../games/registry', () => ({
  getThemeHubs: () => themeHubs,
  getThemeHub: (themeId: string) => themeHubs.find((hub) => hub.id === themeId || hub.id.replace(/-hub$/, '') === themeId),
  getLearningMap: () => themeMap,
}));

vi.mock('../lib/gameHelpers', () => ({
  loadGameProgress: (gameId: string) => {
    if (gameId === 'pinyin-lesson-1') {
      return { completedSessions: 3, bestStars: 3 };
    }

    if (gameId === 'english-lesson-1') {
      return { completedSessions: 1, bestStars: 2 };
    }

    return null;
  },
}));

vi.mock('../stores/useUserStore', () => ({
  useUserStore: (selector: (state: unknown) => unknown) =>
    selector({
      currentChild: {
        _id: 'child-1',
        nickname: '小米',
        age: 5,
        inferredAge: 5,
        inferredDifficulty: 'easy',
      },
    }),
}));

vi.mock('../stores/useRewardStore', () => ({
  useRewardStore: (selector: (state: unknown) => unknown) =>
    selector({
      rewards: {
        stars: 12,
        level: 3,
        streakDays: 4,
      },
    }),
}));

vi.mock('../stores/useGameStore', () => ({
  useGameStore: (selector: (state: unknown) => unknown) =>
    selector({
      profile: {
        language: 'zh',
        companion: 'aisha',
      },
      knowledge: {
        number_5: {
          id: 'number_5',
          type: 'number',
          content: '5',
          nextReviewAt: Date.now() - 1000,
        },
        word_cat: {
          id: 'word_cat',
          type: 'english',
          content: 'cat',
          nextReviewAt: Date.now() - 1000,
        },
      },
    }),
}));

vi.mock('../data/learningContent', () => ({
  getLearningContentSummary: () => ({
    pinyin: 60,
    math: 24,
    english: 18,
    stories: 12,
    total: 114,
  }),
  getWeakKnowledgePoints: () => [
    { id: 'number_5', type: 'number', content: '5' },
    { id: 'word_cat', type: 'english', content: 'cat' },
  ],
  createMission: () => [
    {
      id: 'task-1',
      prompt: '数字小镇：5 训练',
      skill: 'math',
      missionRole: 'review',
      recommendedIntervalMinutes: 0,
      systemNote: '先修复薄弱点，再进入新内容。',
    },
    {
      id: 'task-2',
      prompt: '拼音打怪：用正确拼音打败怪物',
      skill: 'pinyin',
      missionRole: 'warmup',
      recommendedIntervalMinutes: 10,
      systemNote: '先做一题热身，快速进入状态。',
    },
    {
      id: 'task-3',
      prompt: '英语游乐园：找到 🐱',
      skill: 'english',
      missionRole: 'core',
      recommendedIntervalMinutes: 45,
      systemNote: '中段负责推进新主线。',
    },
  ],
}));

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement | null = null;
let root: Root | null = null;

async function renderHomePage() {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  await act(async () => {
    root!.render(<HomePage />);
  });

  return container;
}

afterEach(async () => {
  navigateMock.mockReset();
  if (root) {
    await act(async () => {
      root!.unmount();
    });
  }
  container?.remove();
  container = null;
  root = null;
});

describe('HomePage', () => {
  it('plans a personalized daily path before entering the first station', async () => {
    window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    HTMLElement.prototype.scrollIntoView = vi.fn();

    const app = await renderHomePage();
    expect(app.textContent).toContain('开始今日任务');
    expect(app.textContent).not.toContain('今日学习路径已规划');

    const startButton = Array.from(app.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('开始今日任务')
    );
    expect(startButton).not.toBeUndefined();

    await act(async () => {
      startButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(app.textContent).toContain('今日学习路径已规划');
    expect(app.textContent).toContain('数学星球 当前最值得推进');
    expect(app.textContent).toContain('数字小镇：5 训练');
    expect(app.textContent).toContain('进入第一站：数学星球');

    const firstStationButton = Array.from(app.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('进入第一站：数学星球')
    );
    expect(firstStationButton).not.toBeUndefined();

    await act(async () => {
      firstStationButton!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(navigateMock).toHaveBeenCalledWith('/games/math');
  }, 15000);
});
