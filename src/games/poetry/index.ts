import { registerGame } from '../registry';
import { lazy } from 'react';

const PoetryThemeHub = lazy(() => import('./PoetryThemeHub'));
const PoetryGame = lazy(() => import('./PoetryGame'));

registerGame({
  id: 'poetry-hub',
  name: '古典诗词',
  icon: '🏛️',
  description: '古典诗词主题游戏集合',
  path: '/games/poetry',
  component: PoetryThemeHub,
  category: 'stories',
  isThemeHub: true,
  minAge: 3,
  maxAge: 12,
  learningPath: {
    routeOrder: 5,
    levelLabel: '拓展 01 · 文化浸润',
    ageRange: '3-8岁',
    skillFocus: ['韵律感知', '文化兴趣', '语言审美'],
    assessmentScope: ['朗读参与', '内容理解', '文化记忆'],
    learningGoal: '作为主线之外的文化拓展，让孩子在低压力中建立诗词亲近感。',
    pedagogyTip: '以感受韵律和意境为先，不以死记背诵为唯一目标。',
    mapZone: '诗意花园',
    milestoneType: 'hub',
    estimatedDuration: '长期浸润',
  },
});

registerGame({
  id: 'poetry-reading',
  name: '诗词阅读',
  icon: '📖',
  description: '阅读和学习优美的古诗词',
  path: '/games/poetry/reading',
  component: PoetryGame,
  category: 'stories',
  themeId: 'poetry-hub',
  minAge: 3,
  maxAge: 12,
  learningPath: {
    routeOrder: 1,
    levelLabel: 'L1 · 诗词共读',
    ageRange: '3-8岁',
    skillFocus: ['朗读节奏', '意象理解', '语言积累'],
    assessmentScope: ['跟读参与', '语句理解', '表达兴趣'],
    learningGoal: '通过共读体验让孩子把诗词当成有画面、有声音的语言游戏。',
    pedagogyTip: '适合穿插在主线之间，作为情绪调节和文化积累环节。',
    mapZone: '诗意花园',
    milestoneType: 'creative',
    estimatedDuration: '3-5分钟',
  },
});
