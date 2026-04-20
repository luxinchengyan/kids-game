import { registerGame } from '../registry';
import { lazy } from 'react';

const StoriesGame = lazy(() => import('./StoriesGame'));
const ChineseWhackAMole = lazy(() => import('../whackamole/ChineseWhackAMole'));
const StoriesExam = lazy(() => import('./StoriesExam'));
const StorySequenceGame = lazy(() => import('./StorySequenceGame'));
const StoryTurntableGame = lazy(() => import('./StoryTurntableGame'));
const StoryCreationGame = lazy(() => import('./StoryCreationGame'));

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
  learningPath: {
    routeOrder: 4,
    levelLabel: '主线 04 · 理解表达',
    ageRange: '3-6岁',
    skillFocus: ['故事理解', '顺序表达', '汉字兴趣'],
    assessmentScope: ['情节理解', '顺序复述', '字词辨识'],
    learningGoal: '通过故事阅读和小游戏，把理解、表达与汉字兴趣连接起来。',
    pedagogyTip: '先沉浸听读，再做复述和重组，更符合儿童语言发展规律。',
    mapZone: '故事王国',
    milestoneType: 'hub',
    estimatedDuration: '2周',
  },
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
  learningPath: {
    routeOrder: 3,
    levelLabel: 'L3 · 字词追击',
    ageRange: '5-8岁',
    skillFocus: ['汉字识别', '快速定位', '视觉注意'],
    assessmentScope: ['识字命中率', '反应稳定性', '干扰抑制'],
    learningGoal: '在故事主题中巩固孩子对高频汉字和词语的敏感度。',
    pedagogyTip: '把识字任务嵌入故事世界，能减少机械记忆感。',
    mapZone: '故事王国',
    milestoneType: 'challenge',
    estimatedDuration: '3分钟',
  },
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
  learningPath: {
    routeOrder: 5,
    levelLabel: 'Checkpoint · 故事理解测评',
    ageRange: '5-8岁',
    skillFocus: ['情节理解', '因果判断', '细节记忆'],
    assessmentScope: ['理解深度', '复述线索', '薄弱环节'],
    learningGoal: '检查孩子是否真正理解故事，而不只是记住片段。',
    pedagogyTip: '问题设计要兼顾情节、人物和因果，避免只考死记。',
    mapZone: '故事王国',
    milestoneType: 'checkpoint',
    estimatedDuration: '5分钟',
  },
});

registerGame({
  id: 'story-sequence',
  name: '故事排序',
  icon: '🪄',
  description: '把故事情节按正确顺序排出来',
  path: '/games/stories/sequence',
  component: StorySequenceGame,
  category: 'stories',
  themeId: 'stories-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 1,
    levelLabel: 'L1 · 情节重建',
    ageRange: '4-7岁',
    skillFocus: ['顺序感', '故事结构', '因果理解'],
    assessmentScope: ['排序正确率', '情节理解', '语言组织'],
    learningGoal: '让孩子通过整理故事顺序理解“开始-经过-结果”的结构。',
    pedagogyTip: '顺序任务是阅读理解和口头表达之间的重要桥梁。',
    mapZone: '故事王国',
    milestoneType: 'lesson',
    estimatedDuration: '4分钟',
  },
});

registerGame({
  id: 'story-turntable',
  name: '故事问答转盘',
  icon: '🎡',
  description: '转出题目，回答人物、情节、原因和结局',
  path: '/games/stories/turntable',
  component: StoryTurntableGame,
  category: 'stories',
  themeId: 'stories-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 2,
    levelLabel: 'L2 · 随机问答',
    ageRange: '4-8岁',
    skillFocus: ['细节回忆', '因果理解', '分类提问'],
    assessmentScope: ['问答正确率', '线索提取', '理解深度'],
    learningGoal: '通过随机问题抽取，让孩子从不同角度回忆和理解故事。',
    pedagogyTip: '把问题分类明确化，能帮助儿童建立阅读理解的提问框架。',
    mapZone: '故事王国',
    milestoneType: 'lesson',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'story-creation',
  name: '故事创作工坊',
  icon: '🪄',
  description: '拖拽式选择角色和事件，创作自己的故事',
  path: '/games/stories/create',
  component: StoryCreationGame,
  category: 'stories',
  themeId: 'stories-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 4,
    levelLabel: 'L4 · 创作表达',
    ageRange: '4-8岁',
    skillFocus: ['创造力', '故事结构', '口头表达'],
    assessmentScope: ['要素完整度', '故事连贯性', '表达意愿'],
    learningGoal: '把阅读输入转化为表达输出，让孩子尝试自己组织故事结构。',
    pedagogyTip: '用固定要素支架帮助低龄儿童完成创作，避免完全开放带来的压力。',
    mapZone: '故事王国',
    milestoneType: 'creative',
    estimatedDuration: '4分钟',
  },
});
