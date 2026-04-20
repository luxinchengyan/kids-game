import { lazy } from 'react';
import { registerGame } from '../registry';

const FrameworkCatalogHub = lazy(() => import('./FrameworkCatalogHub'));
const SchulteGridGame = lazy(() => import('./SchulteGridGame'));
const ReactionChallengeGame = lazy(() => import('./ReactionChallengeGame'));
const MazeAdventureGame = lazy(() => import('./MazeAdventureGame'));

registerGame({
  id: 'framework-hub',
  name: '游戏设计工坊',
  icon: '🛠️',
  description: '把 GAMES 文档变成可体验的游戏框架中心',
  path: '/games/frameworks',
  component: FrameworkCatalogHub,
  category: 'other',
  isThemeHub: true,
  minAge: 3,
  maxAge: 8,
  learningPath: {
    routeOrder: 7,
    levelLabel: '能力工坊 · 认知底盘',
    ageRange: '3-8岁',
    skillFocus: ['专注训练', '反应控制', '玩法框架复用'],
    assessmentScope: ['注意品质', '反应时', '可迁移能力'],
    learningGoal: '把通用认知训练框架沉淀成可跨主题复用的能力底盘。',
    pedagogyTip: '这些框架适合与学科主线交错安排，增强长期可玩性。',
    mapZone: '能力工坊',
    milestoneType: 'hub',
    estimatedDuration: '长期训练',
  },
});

registerGame({
  id: 'schulte-grid',
  name: '舒尔特方格',
  icon: '🧠',
  description: '按顺序点击数字，训练专注力和视觉搜索',
  path: '/games/frameworks/schulte-grid',
  component: SchulteGridGame,
  category: 'other',
  themeId: 'framework-hub',
  minAge: 3,
  maxAge: 8,
  learningPath: {
    routeOrder: 1,
    levelLabel: '能力关 · 专注搜索',
    ageRange: '4-8岁',
    skillFocus: ['视觉搜索', '专注持续', '顺序执行'],
    assessmentScope: ['完成时长', '错误率', '持续专注'],
    learningGoal: '通过数字搜索强化执行控制和视觉扫描效率。',
    pedagogyTip: '适合作为正式学习前的热身或学习后的巩固。',
    mapZone: '能力工坊',
    milestoneType: 'lesson',
    estimatedDuration: '2-3分钟',
  },
});

registerGame({
  id: 'reaction-test',
  name: '反应测试',
  icon: '⚡',
  description: '看到信号马上点，训练反应速度和抑制控制',
  path: '/games/frameworks/reaction-test',
  component: ReactionChallengeGame,
  category: 'other',
  themeId: 'framework-hub',
  minAge: 3,
  maxAge: 8,
  learningPath: {
    routeOrder: 2,
    levelLabel: '能力关 · 抑制反应',
    ageRange: '3-8岁',
    skillFocus: ['反应速度', '抑制控制', '起停节奏'],
    assessmentScope: ['平均反应时', '误触率', '节奏稳定性'],
    learningGoal: '训练孩子看到信号再行动，避免冲动反应。',
    pedagogyTip: '反应训练有助于提升后续学习任务中的规则遵循。',
    mapZone: '能力工坊',
    milestoneType: 'lesson',
    estimatedDuration: '2分钟',
  },
});

registerGame({
  id: 'maze-adventure',
  name: '迷宫探险',
  icon: '🧭',
  description: '穿过迷宫收集星星，训练空间规划和路径选择',
  path: '/games/frameworks/maze-adventure',
  component: MazeAdventureGame,
  category: 'other',
  themeId: 'framework-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 3,
    levelLabel: '能力关 · 路径规划',
    ageRange: '4-8岁',
    skillFocus: ['空间认知', '路径规划', '目标坚持'],
    assessmentScope: ['路径效率', '探索质量', '规则遵循'],
    learningGoal: '通过主题迷宫训练孩子的空间判断和步骤规划。',
    pedagogyTip: '加入可收集目标能让孩子在规划路径时保持更强动机。',
    mapZone: '能力工坊',
    milestoneType: 'challenge',
    estimatedDuration: '4分钟',
  },
});
