import { lazy } from 'react';
import { registerGame } from '../registry';

const TypingThemeHub = lazy(() => import('./TypingThemeHub'));
const KeyboardScoutGame = lazy(() => import('./KeyboardScoutGame'));
const MeteorDefenseGame = lazy(() => import('./MeteorDefenseGame'));
const PromptWorkshopGame = lazy(() => import('./PromptWorkshopGame'));
const RhythmAssemblyGame = lazy(() => import('./RhythmAssemblyGame'));

registerGame({
  id: 'ai-typing-hub',
  name: 'AI 打字训练营',
  icon: '🤖',
  description: '用 AI 控制台故事把键位定位、反应击打、短句输入和节奏连打串成一条孩子愿意重复练的打字主线。',
  path: '/games/ai-typing',
  component: TypingThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 5,
  maxAge: 10,
  learningPath: {
    routeOrder: 8,
    levelLabel: '能力工坊 · 键盘启蒙',
    ageRange: '5-10岁',
    skillFocus: ['键位定位', '双手协同', '打字反应', '短句输入'],
    assessmentScope: ['主键区熟悉度', '按键准确率', '节奏稳定性', '整句输入'],
    learningGoal: '把孩子从“会找字母”带到“能顺手输入”，为后续正式打字打底。',
    pedagogyTip: '按照单键、掉落、短句、节奏的顺序训练，能显著降低初学键盘的挫败感。',
    mapZone: 'AI 指挥舱',
    milestoneType: 'hub',
    estimatedDuration: '5-10分钟',
  },
});

registerGame({
  id: 'keyboard-scout',
  name: 'AI 键位巡航',
  icon: '🛰️',
  description: '跟着大字母提示逐个找键，把主键区的位置感先建立起来。',
  path: '/games/ai-typing/keyboard-scout',
  component: KeyboardScoutGame,
  category: 'other',
  themeId: 'ai-typing-hub',
  minAge: 5,
  maxAge: 8,
  learningPath: {
    routeOrder: 1,
    levelLabel: '键位热身 · 定位校准',
    ageRange: '5-8岁',
    skillFocus: ['F/J 定位', '主键区熟悉', '字母搜索'],
    assessmentScope: ['单键识别', '左右手起点', '基础准确率'],
    learningGoal: '先让孩子建立“键在哪里”的空间记忆。',
    pedagogyTip: '一开始不要追求速度，先把按对率拉高。',
    mapZone: 'AI 指挥舱',
    milestoneType: 'lesson',
    estimatedDuration: '2分钟',
  },
});

registerGame({
  id: 'meteor-defense',
  name: '字母陨石防线',
  icon: '☄️',
  description: '像经典打字游戏一样挡住掉落字母，把眼睛和手指反应连起来。',
  path: '/games/ai-typing/meteor-defense',
  component: MeteorDefenseGame,
  category: 'other',
  themeId: 'ai-typing-hub',
  minAge: 5,
  maxAge: 10,
  learningPath: {
    routeOrder: 2,
    levelLabel: '反应训练 · 字母拦截',
    ageRange: '5-10岁',
    skillFocus: ['按键反应', '目标选择', '视觉追踪'],
    assessmentScope: ['击中率', '漏按率', '应激准确性'],
    learningGoal: '把键位识别提升到看到就能打出来。',
    pedagogyTip: '先优先打离底部最近的字母，比随便乱打更能建立策略感。',
    mapZone: 'AI 指挥舱',
    milestoneType: 'challenge',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'prompt-workshop',
  name: 'AI 指令工坊',
  icon: '💬',
  description: '把字母变成完整短句，顺手练会空格和常见词块输入。',
  path: '/games/ai-typing/prompt-workshop',
  component: PromptWorkshopGame,
  category: 'other',
  themeId: 'ai-typing-hub',
  minAge: 6,
  maxAge: 10,
  learningPath: {
    routeOrder: 3,
    levelLabel: '短句训练 · 指令输入',
    ageRange: '6-10岁',
    skillFocus: ['短句输入', '空格使用', '字符顺序'],
    assessmentScope: ['整句准确率', '词块连续性', '节奏保持'],
    learningGoal: '让孩子第一次感受到“我能真的打完一句话”。',
    pedagogyTip: '短句要短而熟悉，让孩子把注意力放在键盘路径，不放在理解难度上。',
    mapZone: 'AI 指挥舱',
    milestoneType: 'creative',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'rhythm-assembly',
  name: '节奏装配舱',
  icon: '🎵',
  description: '跟着均匀节奏连打字母和单词，把“会找键”练成“手上有顺序”。',
  path: '/games/ai-typing/rhythm-assembly',
  component: RhythmAssemblyGame,
  category: 'other',
  themeId: 'ai-typing-hub',
  minAge: 6,
  maxAge: 10,
  learningPath: {
    routeOrder: 4,
    levelLabel: '节奏训练 · 连打装配',
    ageRange: '6-10岁',
    skillFocus: ['节奏稳定', '连击输入', '左右手切换'],
    assessmentScope: ['连击长度', '节拍稳定性', '连续准确率'],
    learningGoal: '把离散按键练成流畅的连续输入动作。',
    pedagogyTip: '适当的节奏反馈会让孩子更容易形成手指运动记忆。',
    mapZone: 'AI 指挥舱',
    milestoneType: 'challenge',
    estimatedDuration: '2-3分钟',
  },
});
