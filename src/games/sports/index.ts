import { registerGame } from '../registry';
import { lazy } from 'react';

const SportsThemeHub = lazy(() => import('./SportsThemeHub'));

// Theme Hub - Entry point for sports games
registerGame({
  id: 'sports-hub',
  name: '体育健将',
  icon: '🏅',
  description: '探索各种运动项目和著名运动员',
  path: '/games/sports',
  component: SportsThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 6,
    levelLabel: '拓展 02 · 体能认知',
    ageRange: '4-8岁',
    skillFocus: ['运动认知', '规则理解', '榜样激励'],
    assessmentScope: ['项目识别', '规则记忆', '兴趣偏好'],
    learningGoal: '作为拓展世界帮助孩子认识运动项目与运动员，丰富成长地图。',
    pedagogyTip: '适合与主线穿插，提供主题切换和成就感恢复。',
    mapZone: '冠军训练营',
    milestoneType: 'hub',
    estimatedDuration: '每周主题体验',
  },
});
