import { registerGame } from '../registry';
import { lazy } from 'react';

const PinyinThemeHub = lazy(() => import('./PinyinThemeHub'));
const PinyinWhackAMole = lazy(() => import('./PinyinWhackAMole'));
const PinyinWhackAMoleGeneric = lazy(() => import('../whackamole/PinyinWhackAMoleGeneric'));
const PinyinExam = lazy(() => import('./PinyinExam'));

// Theme Hub - Entry point for pinyin games
registerGame({
  id: 'pinyin-hub',
  name: '拼音冒险岛',
  icon: '📖',
  description: '拼音主题游戏集合',
  path: '/games/pinyin',
  component: PinyinThemeHub,
  category: 'pinyin',
  isThemeHub: true,
});

// Individual Games
registerGame({
  id: 'pinyin-whack-a-mole',
  name: '拼音打地鼠',
  icon: '🔨',
  description: '敲击正确地鼠学习拼音',
  path: '/games/pinyin/whack-a-mole',
  component: PinyinWhackAMole,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
});

// Generic framework version
registerGame({
  id: 'pinyin-whack-a-mole-generic',
  name: '拼音打地鼠（新版）',
  icon: '🎯',
  description: '通用框架版 - 敲击正确地鼠学习拼音',
  path: '/games/pinyin/whack-a-mole-generic',
  component: PinyinWhackAMoleGeneric,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
});

// 拼音考试
registerGame({
  id: 'pinyin-exam',
  name: '拼音水平测试',
  icon: '📝',
  description: '测试你的拼音掌握程度',
  path: '/games/pinyin/exam',
  component: PinyinExam,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
});
