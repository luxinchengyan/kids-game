import { registerGame } from '../registry';
import { lazy } from 'react';

const EnglishThemeHub = lazy(() => import('./EnglishThemeHub'));
const EnglishGame = lazy(() => import('./EnglishGame'));
const EnglishWhackAMole = lazy(() => import('../whackamole/EnglishWhackAMole'));
const EnglishExam = lazy(() => import('./EnglishExam'));
const WordFlipGame = lazy(() => import('./WordFlipGame'));
const LetterSpellGame = lazy(() => import('./LetterSpellGame'));
const EnglishBingoGame = lazy(() => import('./EnglishBingoGame'));
const EnglishRoleplayGame = lazy(() => import('./EnglishRoleplayGame'));

// Theme Hub - entry point for English games
registerGame({
  id: 'english-hub',
  name: '英语游乐园',
  icon: '🌍',
  description: '英语主题游戏集合',
  path: '/games/english',
  component: EnglishThemeHub,
  category: 'english',
  isThemeHub: true,
  minAge: 4,
  maxAge: 6,
  learningPath: {
    routeOrder: 3,
    levelLabel: '主线 03 · 词汇冒险',
    ageRange: '4-6岁',
    skillFocus: ['词汇识记', '字母拼读', '听说联动'],
    assessmentScope: ['单词识别', '拼写线索', '听义匹配'],
    learningGoal: '通过词汇、拼写和综合任务建立英语启蒙的基础语感。',
    pedagogyTip: '遵循听说先行、图词绑定、少量高频反复的原则。',
    mapZone: '英语游乐园',
    milestoneType: 'hub',
    estimatedDuration: '3周',
  },
});

// 英语任务挑战
registerGame({
  id: 'english-tasks',
  name: '英语任务挑战',
  icon: '🎯',
  description: '词汇、听力、阅读综合练习',
  path: '/games/english/tasks',
  component: EnglishGame,
  category: 'english',
  themeId: 'english-hub',
  minAge: 4,
  maxAge: 6,
  learningPath: {
    routeOrder: 4,
    levelLabel: 'L4 · 综合任务',
    ageRange: '4-6岁',
    skillFocus: ['词义理解', '听力判断', '阅读配对'],
    assessmentScope: ['综合正确率', '情境理解', '持续注意'],
    learningGoal: '把前面学到的词汇和字母能力组合成真实的小任务。',
    pedagogyTip: '综合任务用于检验迁移，而不是单纯重复记忆。',
    mapZone: '英语游乐园',
    milestoneType: 'challenge',
    estimatedDuration: '4-5分钟',
  },
});

// 单词翻翻乐
registerGame({
  id: 'english-word-flip',
  name: '单词翻翻乐',
  icon: '🃏',
  description: '翻牌配对英文单词和图片，训练词汇记忆',
  path: '/games/english/word-flip',
  component: WordFlipGame,
  category: 'english',
  themeId: 'english-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 1,
    levelLabel: 'L1 · 图词配对',
    ageRange: '4-6岁',
    skillFocus: ['词汇记忆', '图像联想', '配对判断'],
    assessmentScope: ['记忆保持', '图词对应', '基础识别'],
    learningGoal: '先用图片和单词配对建立孩子对高频词汇的熟悉感。',
    pedagogyTip: '先认识，再说出，再进入拼写，是更自然的语言路径。',
    mapZone: '英语游乐园',
    milestoneType: 'lesson',
    estimatedDuration: '3分钟',
  },
});

// 字母拼图
registerGame({
  id: 'english-letter-spell',
  name: '字母拼图',
  icon: '🔤',
  description: '看图选字母，拼出正确的英文单词',
  path: '/games/english/letter-spell',
  component: LetterSpellGame,
  category: 'english',
  themeId: 'english-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 2,
    levelLabel: 'L2 · 字母拼装',
    ageRange: '4-7岁',
    skillFocus: ['字母识别', '拼写顺序', '单词构成'],
    assessmentScope: ['拼写正确率', '字母定位', '拼读线索'],
    learningGoal: '帮助孩子理解单词由字母组成，并形成初步拼写意识。',
    pedagogyTip: '通过“看图选字母”降低纯文本拼写带来的压力。',
    mapZone: '英语游乐园',
    milestoneType: 'lesson',
    estimatedDuration: '4分钟',
  },
});

// 英语打地鼠
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
  learningPath: {
    routeOrder: 6,
    levelLabel: 'L6 · 快速识词',
    ageRange: '4-7岁',
    skillFocus: ['高频词提取', '选择抑制', '听词反应'],
    assessmentScope: ['命中率', '反应时', '抗干扰表现'],
    learningGoal: '把词汇识别从静态匹配升级到动态快速判断。',
    pedagogyTip: '动态挑战适合放在记忆和拼装之后，形成熟练度飞轮。',
    mapZone: '英语游乐园',
    milestoneType: 'challenge',
    estimatedDuration: '3分钟',
  },
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
  learningPath: {
    routeOrder: 7,
    levelLabel: 'Checkpoint · 英语测评',
    ageRange: '4-8岁',
    skillFocus: ['词汇综合', '拼写迁移', '听义匹配'],
    assessmentScope: ['阶段掌握度', '词汇覆盖', '推荐分层'],
    learningGoal: '对词汇、拼写与理解做阶段性诊断，为家长和系统提供依据。',
    pedagogyTip: '测评后应给出继续闯关或回补练习的明确建议。',
    mapZone: '英语游乐园',
    milestoneType: 'checkpoint',
    estimatedDuration: '5分钟',
  },
});

registerGame({
  id: 'english-bingo',
  name: '英语宾果',
  icon: '🎯',
  description: '听单词，找图片，连成一条线就获胜',
  path: '/games/english/bingo',
  component: EnglishBingoGame,
  category: 'english',
  themeId: 'english-hub',
  minAge: 4,
  maxAge: 7,
  learningPath: {
    routeOrder: 3,
    levelLabel: 'L3 · 听词宾果',
    ageRange: '4-7岁',
    skillFocus: ['听义匹配', '图词映射', '持续注意'],
    assessmentScope: ['听词命中率', '线索定位', '稳定反应'],
    learningGoal: '通过边听边找的 Bingo 规则，让词汇识别从静态记忆走向动态提取。',
    pedagogyTip: '把听力任务控制在单词层级，让孩子专注于高频输入的快速识别。',
    mapZone: '英语游乐园',
    milestoneType: 'lesson',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'english-roleplay',
  name: '英语角色扮演',
  icon: '🎭',
  description: '在生活场景里选出最合适的英语回答',
  path: '/games/english/roleplay',
  component: EnglishRoleplayGame,
  category: 'english',
  themeId: 'english-hub',
  minAge: 5,
  maxAge: 8,
  learningPath: {
    routeOrder: 5,
    levelLabel: 'L5 · 情景表达',
    ageRange: '5-8岁',
    skillFocus: ['口语反应', '情景理解', '礼貌表达'],
    assessmentScope: ['语境匹配', '回应自然度', '表达迁移'],
    learningGoal: '让孩子把记住的词句放进真实场景中使用，形成初步表达能力。',
    pedagogyTip: '优先使用高频生活场景，降低口语输出焦虑。',
    mapZone: '英语游乐园',
    milestoneType: 'challenge',
    estimatedDuration: '4分钟',
  },
});
