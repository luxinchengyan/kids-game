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
});
