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
});
