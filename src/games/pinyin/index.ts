import { registerGame } from '../registry';
import { lazy } from 'react';

const PinyinThemeHub = lazy(() => import('./PinyinThemeHub'));
const PinyinWhackAMole = lazy(() => import('./PinyinWhackAMole'));
const PinyinWhackAMoleGeneric = lazy(() => import('../whackamole/PinyinWhackAMoleGeneric'));
const PinyinExam = lazy(() => import('./PinyinExam'));
const PinyinMemoryGame = lazy(() => import('./PinyinMemoryGame'));
const PinyinLinkGame = lazy(() => import('./PinyinLinkGame'));
const PinyinPuzzleGame = lazy(() => import('./PinyinPuzzleGame'));
const PinyinRhythmGame = lazy(() => import('./PinyinRhythmGame'));
const PinyinInitialsLearn = lazy(() => import('./PinyinInitialsLearn'));
const PinyinFinalsLearn = lazy(() => import('./PinyinFinalsLearn'));
const PinyinWholeSyllablesLearn = lazy(() => import('./PinyinWholeSyllablesLearn'));
const PinyinUnifiedPractice = lazy(() => import('./PinyinUnifiedPractice'));
const PinyinTraining = lazy(() => import('./PinyinTraining'));

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
  minAge: 4,
  maxAge: 6,
  learningPath: {
    routeOrder: 1,
    levelLabel: '主线 01 · 语音启航',
    ageRange: '4-6岁',
    skillFocus: ['声母韵母识别', '听觉辨音', '快速检索'],
    assessmentScope: ['音形对应', '声音辨认', '专注反应'],
    learningGoal: '先建立拼音的听觉感知，再逐步进入音节识别与快速提取。',
    pedagogyTip: '采用先听后认、短时高频、及时反馈的启蒙节奏。',
    mapZone: '启航港',
    milestoneType: 'hub',
    estimatedDuration: '2-3周',
  },
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
  learningPath: {
    routeOrder: 6,
    levelLabel: 'L6 · 目标检索',
    ageRange: '4-7岁',
    skillFocus: ['拼音识别', '手眼协调', '注意控制'],
    assessmentScope: ['目标命中率', '反应速度', '干扰抑制'],
    learningGoal: '在动态场景中识别目标拼音，强化检索速度和抗干扰能力。',
    pedagogyTip: '以节奏型反馈帮助孩子把正确识别迁移到快速反应。',
    mapZone: '启航港',
    milestoneType: 'challenge',
    estimatedDuration: '4分钟',
  },
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
  learningPath: {
    routeOrder: 4,
    levelLabel: 'L4 · 快速辨音',
    ageRange: '4-7岁',
    skillFocus: ['声音匹配', '节奏反应', '选择判断'],
    assessmentScope: ['听辨准确率', '即时判断', '持续专注'],
    learningGoal: '用更统一的通用框架练习拼音声音和目标的稳定配对。',
    pedagogyTip: '通过低门槛重复练习，把识别从慢想变成快反。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '3-4分钟',
  },
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
  learningPath: {
    routeOrder: 7,
    levelLabel: 'Checkpoint · 拼音小测',
    ageRange: '4-8岁',
    skillFocus: ['综合辨音', '规则迁移', '稳定作答'],
    assessmentScope: ['掌握度', '薄弱点定位', '连续正确率'],
    learningGoal: '用小测验收听辨、识别与记忆成果，为下一主题提供依据。',
    pedagogyTip: '测试题量适中，让孩子在成功体验中完成阶段复盘。',
    mapZone: '启航港',
    milestoneType: 'checkpoint',
    estimatedDuration: '5分钟',
  },
});

registerGame({
  id: 'pinyin-memory',
  name: '拼音翻翻乐',
  icon: '🃏',
  description: '翻开卡片，匹配拼音和对应线索',
  path: '/games/pinyin/memory',
  component: PinyinMemoryGame,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 1,
    levelLabel: 'L1 · 声韵认知',
    ageRange: '4-6岁',
    skillFocus: ['图像记忆', '声音联想', '配对匹配'],
    assessmentScope: ['配对准确率', '短时记忆', '基础识记'],
    learningGoal: '从静态翻牌开始，帮助孩子建立拼音与线索的初次连接。',
    pedagogyTip: '先用静态低压力任务建立信心，再进入动态挑战。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'pinyin-link',
  name: '拼音连连看',
  icon: '🪢',
  description: '选择声母和韵母，连成完整拼音',
  path: '/games/pinyin/link',
  component: PinyinLinkGame,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 7,
  learningPath: {
    routeOrder: 2,
    levelLabel: 'L2 · 声韵连接',
    ageRange: '4-7岁',
    skillFocus: ['声母韵母组合', '拼读准备', '选择判断'],
    assessmentScope: ['组合正确率', '声韵分辨', '迁移能力'],
    learningGoal: '让孩子从单个拼音识别过渡到主动组合完整音节。',
    pedagogyTip: '把组合动作拆成两步选择，降低初学者的认知负担。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'pinyin-puzzle',
  name: '拼音拼图',
  icon: '🧩',
  description: '把拼音碎片按顺序拼成完整音节',
  path: '/games/pinyin/puzzle',
  component: PinyinPuzzleGame,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 7,
  learningPath: {
    routeOrder: 3,
    levelLabel: 'L3 · 结构拼装',
    ageRange: '4-7岁',
    skillFocus: ['拼音结构', '顺序感', '整体编码'],
    assessmentScope: ['拼装正确率', '结构稳定性', '视觉分块'],
    learningGoal: '帮助孩子理解一个完整音节是由多个拼音部件组成的。',
    pedagogyTip: '通过“拼块”形式把抽象结构变成可触摸的形状组合。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '4分钟',
  },
});

registerGame({
  id: 'pinyin-rhythm',
  name: '拼音节奏大师',
  icon: '🥁',
  description: '听节奏、拍节奏，让拼音发音更有感觉',
  path: '/games/pinyin/rhythm',
  component: PinyinRhythmGame,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 7,
  learningPath: {
    routeOrder: 5,
    levelLabel: 'L5 · 节奏辨音',
    ageRange: '4-7岁',
    skillFocus: ['音节节奏', '听觉记忆', '序列模仿'],
    assessmentScope: ['节奏还原', '听觉注意', '模仿稳定度'],
    learningGoal: '在节奏模仿里建立音节的韵律感，帮助孩子更自然地发音。',
    pedagogyTip: '先示范再模仿，保持任务节奏短促，适合低龄儿童专注跨度。',
    mapZone: '启航港',
    milestoneType: 'challenge',
    estimatedDuration: '3分钟',
  },
});

// ── 新增：系统学习模块 ─────────────────────────────────────────

registerGame({
  id: 'pinyin-initials-learn',
  name: '声母学习',
  icon: '🔤',
  description: '认识全部23个声母，按发音部位分组学习',
  path: '/games/pinyin/initials-learn',
  component: PinyinInitialsLearn,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 8,
    levelLabel: 'L8 · 声母全览',
    ageRange: '4-8岁',
    skillFocus: ['声母识别', '发音部位', '分类记忆'],
    assessmentScope: ['23声母掌握', '发音口型', '分组记忆'],
    learningGoal: '系统认识23个声母，理解各发音部位分类，建立声母全局认知。',
    pedagogyTip: '按发音部位分组呈现，降低记忆负担，重点提示口型变化。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '8分钟',
  },
});

registerGame({
  id: 'pinyin-finals-learn',
  name: '韵母学习',
  icon: '🎵',
  description: '学习单韵母、复韵母和鼻韵母，共24个韵母',
  path: '/games/pinyin/finals-learn',
  component: PinyinFinalsLearn,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 9,
    levelLabel: 'L9 · 韵母全览',
    ageRange: '4-8岁',
    skillFocus: ['韵母识别', '音节收尾', '分类记忆'],
    assessmentScope: ['24韵母掌握', '单复鼻分类', '发音准确'],
    learningGoal: '系统认识24个韵母，区分单韵母、复韵母和鼻韵母的特征。',
    pedagogyTip: '用颜色区分三类韵母，帮助孩子建立视觉化分类记忆。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '8分钟',
  },
});

registerGame({
  id: 'pinyin-whole-syllables-learn',
  name: '整体认读音节',
  icon: '🔮',
  description: '学习16个整体认读音节，直接认读无需拼读',
  path: '/games/pinyin/whole-syllables-learn',
  component: PinyinWholeSyllablesLearn,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 10,
    levelLabel: 'L10 · 整体认读',
    ageRange: '4-8岁',
    skillFocus: ['整体认读', '记忆识别', '直觉感知'],
    assessmentScope: ['16音节掌握', '直接认读', '不拼读能力'],
    learningGoal: '掌握16个整体认读音节，形成直接认读的条件反射，为流畅拼读奠基。',
    pedagogyTip: '翻卡片的互动形式帮助孩子主动探索，强化"整体感知"的认知策略。',
    mapZone: '启航港',
    milestoneType: 'lesson',
    estimatedDuration: '6分钟',
  },
});

registerGame({
  id: 'pinyin-unified-practice',
  name: '统一练习',
  icon: '📝',
  description: '声母、韵母、整体认读混合练习，巩固所学',
  path: '/games/pinyin/unified-practice',
  component: PinyinUnifiedPractice,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 11,
    levelLabel: 'L11 · 综合练习',
    ageRange: '4-8岁',
    skillFocus: ['综合识别', '声韵整体认读', '选择判断'],
    assessmentScope: ['混合正确率', '知识迁移', '随机应变'],
    learningGoal: '将声母、韵母、整体认读融合在随机题库中，检验综合掌握程度。',
    pedagogyTip: '随机出题避免孩子形成固定顺序记忆，真正测试理解而非机械背诵。',
    mapZone: '启航港',
    milestoneType: 'challenge',
    estimatedDuration: '5分钟',
  },
});

registerGame({
  id: 'pinyin-training',
  name: '拼音训练',
  icon: '⚡',
  description: '60秒极速训练，看拼音点汉字，连击加分！',
  path: '/games/pinyin/training',
  component: PinyinTraining,
  category: 'pinyin',
  themeId: 'pinyin',
  minAge: 5,
  maxAge: 8,
  learningPath: {
    routeOrder: 12,
    levelLabel: 'L12 · 极速反应',
    ageRange: '5-8岁',
    skillFocus: ['快速识别', '反应速度', '连击稳定'],
    assessmentScope: ['单位时间得分', '连击数', '准确率'],
    learningGoal: '在限时竞速中将拼音识别从"慢想"变成"快反"，建立流畅的直觉识别。',
    pedagogyTip: '计分和连击系统激发内在动力，帮助孩子在游戏中不知不觉地大量练习。',
    mapZone: '启航港',
    milestoneType: 'challenge',
    estimatedDuration: '1分钟',
  },
});
