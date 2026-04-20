import { lazy } from 'react';
import { registerGame } from '../registry';

const HistoryTimelineExplorer = lazy(() => import('./HistoryTimelineExplorer'));

registerGame({
  id: 'history-timeline',
  name: '历史故事时间轴',
  icon: '🕰️',
  description: '沿着年代旅行，用人物、重大事件、行政区与地图示意串起中国和世界历史故事。',
  path: '/games/history/timeline',
  component: HistoryTimelineExplorer,
  category: 'other',
  themeId: 'history-hub',
  minAge: 5,
  maxAge: 12,
  learningPath: {
    routeOrder: 1,
    levelLabel: '历史主线 · 时间旅行',
    ageRange: '5-12岁',
    skillFocus: ['时间顺序', '人物线索', '事件因果', '地图理解'],
    assessmentScope: ['中国古今', '世界文明', '行政区变化', '地形地势'],
    learningGoal: '让孩子把历史当成可以听、可以看、可以比较的故事长河，而不是零散年份。',
    pedagogyTip: '始终把人物、事件与地图放在一起讲，帮助儿童从“记住”走向“理解”。',
    mapZone: '文明时光馆',
    milestoneType: 'lesson',
    estimatedDuration: '8-12分钟',
  },
});
