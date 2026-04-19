import { registerGame } from '../registry';
import { lazy } from 'react';

const MathThemeHub = lazy(() => import('./MathThemeHub'));
const MathGame = lazy(() => import('./MathGame'));
const SudokuGame = lazy(() => import('./SudokuGame'));
const MathWhackAMole = lazy(() => import('../whackamole/MathWhackAMole'));
const MathExam = lazy(() => import('./MathExam'));

registerGame({
  id: 'math-hub',
  name: '数字小镇',
  icon: '🔢',
  description: '数学主题游戏集合',
  path: '/games/math',
  component: MathThemeHub,
  category: 'math',
  isThemeHub: true,
  minAge: 4,
  maxAge: 8,
});

registerGame({
  id: 'math-tasks',
  name: '数学挑战',
  icon: '🎯',
  description: '数数、比较、加减法练习',
  path: '/games/math/tasks',
  component: MathGame,
  category: 'math',
  themeId: 'math-hub',
  minAge: 4,
  maxAge: 6,
});

registerGame({
  id: 'math-sudoku',
  name: '数独游戏',
  icon: '🧩',
  description: '4x4 儿童数独，训练逻辑思维',
  path: '/games/math/sudoku',
  component: SudokuGame,
  category: 'math',
  themeId: 'math-hub',
  minAge: 4,
  maxAge: 8,
});

// Whack-a-mole game using generic framework
registerGame({
  id: 'math-whack-a-mole',
  name: '数学打地鼠',
  icon: '🔨',
  description: '敲击正确地鼠学习数学',
  path: '/games/math/whack-a-mole',
  component: MathWhackAMole,
  category: 'math',
  themeId: 'math-hub',
  minAge: 4,
  maxAge: 8,
});

// 数学考试
registerGame({
  id: 'math-exam',
  name: '数学水平测试',
  icon: '📝',
  description: '测试你的数学计算能力',
  path: '/games/math/exam',
  component: MathExam,
  category: 'math',
  themeId: 'math-hub',
  minAge: 4,
  maxAge: 8,
});
