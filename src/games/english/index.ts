import { registerGame } from '../registry';
import { lazy } from 'react';

const EnglishGame = lazy(() => import('./EnglishGame'));
const EnglishWhackAMole = lazy(() => import('../whackamole/EnglishWhackAMole'));
const EnglishExam = lazy(() => import('./EnglishExam'));

registerGame({
  id: 'english-hub',
  name: '英语游乐园',
  icon: '🌍',
  description: '英语主题游戏集合',
  path: '/games/english',
  component: EnglishGame,
  category: 'english',
  isThemeHub: true,
  minAge: 4,
  maxAge: 6,
});

// Whack-a-mole game using generic framework
registerGame({
  id: 'english-whack-a-mole',
  name: '英语打地鼠',
  icon: '🔨',
  description: '敲击正确地鼠学习英语单词',
  path: '/games/english/whack-a-mole',
  component: EnglishWhackAMole,
  category: 'english',
  themeId: 'english-hub',
  minAge: 4,
  maxAge: 8,
});

// 英语考试
registerGame({
  id: 'english-exam',
  name: '英语水平测试',
  icon: '📝',
  description: '测试你的英语词汇水平',
  path: '/games/english/exam',
  component: EnglishExam,
  category: 'english',
  themeId: 'english-hub',
  minAge: 4,
  maxAge: 8,
});
