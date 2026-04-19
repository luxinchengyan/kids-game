import { registerGame } from '../registry';
import { lazy } from 'react';

const StoriesGame = lazy(() => import('./StoriesGame'));
const ChineseWhackAMole = lazy(() => import('../whackamole/ChineseWhackAMole'));
const StoriesExam = lazy(() => import('./StoriesExam'));

registerGame({
  id: 'stories-hub',
  name: '故事王国',
  icon: '📚',
  description: '故事主题游戏集合',
  path: '/games/stories',
  component: StoriesGame,
  category: 'stories',
  isThemeHub: true,
  minAge: 3,
  maxAge: 6,
});

// Chinese character whack-a-mole game using generic framework
registerGame({
  id: 'chinese-whack-a-mole',
  name: '汉字打地鼠',
  icon: '🔨',
  description: '敲击正确地鼠学习汉字',
  path: '/games/stories/whack-a-mole',
  component: ChineseWhackAMole,
  category: 'stories',
  themeId: 'stories-hub',
  minAge: 5,
  maxAge: 9,
});

// 故事考试
registerGame({
  id: 'stories-exam',
  name: '故事知识测试',
  icon: '📝',
  description: '测试你的故事理解能力',
  path: '/games/stories/exam',
  component: StoriesExam,
  category: 'stories',
  themeId: 'stories-hub',
  minAge: 5,
  maxAge: 9,
});
