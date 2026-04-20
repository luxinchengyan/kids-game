import { registerGame } from '../registry';
import { lazy } from 'react';

const MathThemeHub = lazy(() => import('./MathThemeHub'));
const MathGame = lazy(() => import('./MathGame'));
const SudokuGame = lazy(() => import('./SudokuGame'));
const MathWhackAMole = lazy(() => import('../whackamole/MathWhackAMole'));
const MathExam = lazy(() => import('./MathExam'));
const MathPatternGame = lazy(() => import('./MathPatternGame'));
const MathSlideGame = lazy(() => import('./MathSlideGame'));
const MathBalanceGame = lazy(() => import('./MathBalanceGame'));

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
  learningPath: {
    routeOrder: 2,
    levelLabel: '主线 02 · 数感建造',
    ageRange: '4-7岁',
    skillFocus: ['数感建立', '规律发现', '逻辑推理'],
    assessmentScope: ['数量理解', '模式识别', '运算应用'],
    learningGoal: '把数字认知、规律发现和基础推理串成一条循序渐进的数学主线。',
    pedagogyTip: '遵循从具体到抽象、从操作到表达的数学启蒙原则。',
    mapZone: '数字小镇',
    milestoneType: 'hub',
    estimatedDuration: '3-4周',
  },
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
  learningPath: {
    routeOrder: 1,
    levelLabel: 'L1 · 数量启蒙',
    ageRange: '4-6岁',
    skillFocus: ['数数', '比较', '基础加减'],
    assessmentScope: ['数量判断', '基础运算', '题目理解'],
    learningGoal: '通过短任务快速建立数量、大小规律和简单运算的基础。',
    pedagogyTip: '每轮题量小而密，让孩子在频繁成功中建立数感。',
    mapZone: '数字小镇',
    milestoneType: 'lesson',
    estimatedDuration: '4分钟',
  },
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
  learningPath: {
    routeOrder: 4,
    levelLabel: 'L4 · 逻辑格局',
    ageRange: '5-8岁',
    skillFocus: ['排除法', '空间定位', '逻辑推断'],
    assessmentScope: ['规则遵循', '推理深度', '错误修正'],
    learningGoal: '通过儿童数独把“看规律”升级为“按规则推理”。',
    pedagogyTip: '使用低阶棋盘降低认知负担，让逻辑思考更可持续。',
    mapZone: '数字小镇',
    milestoneType: 'challenge',
    estimatedDuration: '5-6分钟',
  },
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
  learningPath: {
    routeOrder: 6,
    levelLabel: 'L6 · 节奏抢答',
    ageRange: '4-7岁',
    skillFocus: ['数值匹配', '快速判断', '反应抑制'],
    assessmentScope: ['命中率', '反应时', '抗干扰能力'],
    learningGoal: '让孩子在快节奏目标选择中巩固数值识别和计算结果匹配。',
    pedagogyTip: '把“思考结果”转化为“即时反应”，提高熟练度。',
    mapZone: '数字小镇',
    milestoneType: 'challenge',
    estimatedDuration: '3分钟',
  },
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
  learningPath: {
    routeOrder: 7,
    levelLabel: 'Checkpoint · 数学测评',
    ageRange: '4-8岁',
    skillFocus: ['数感综合', '运算应用', '规律迁移'],
    assessmentScope: ['阶段掌握度', '错误类型', '后续推荐'],
    learningGoal: '用阶段测评识别已掌握技能和待巩固知识点。',
    pedagogyTip: '测评既是验收，也是后续推荐路线的分流依据。',
    mapZone: '数字小镇',
    milestoneType: 'checkpoint',
    estimatedDuration: '5分钟',
  },
});

registerGame({
  id: 'math-pattern',
  name: '找规律填数',
  icon: '🔍',
  description: '观察数字变化，填入正确答案',
  path: '/games/math/patterns',
  component: MathPatternGame,
  category: 'math',
  themeId: 'math-hub',
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 2,
    levelLabel: 'L2 · 规律工坊',
    ageRange: '4-7岁',
    skillFocus: ['模式观察', '序列推理', '预测能力'],
    assessmentScope: ['规律识别', '延续正确率', '思路稳定性'],
    learningGoal: '帮助孩子学会从具体数字变化中提炼规律。',
    pedagogyTip: '先做可视化模式，再逐步过渡到抽象数列。',
    mapZone: '数字小镇',
    milestoneType: 'lesson',
    estimatedDuration: '4分钟',
  },
});

registerGame({
  id: 'math-balance',
  name: '比大小跷跷板',
  icon: '⚖️',
  description: '挑选数字让左右两边一样重',
  path: '/games/math/balance',
  component: MathBalanceGame,
  category: 'math',
  themeId: 'math-hub',
  minAge: 4,
  maxAge: 7,
  learningPath: {
    routeOrder: 3,
    levelLabel: 'L3 · 比较工坊',
    ageRange: '4-7岁',
    skillFocus: ['数值比较', '等量关系', '组合判断'],
    assessmentScope: ['平衡正确率', '总和意识', '逆向思考'],
    learningGoal: '把“谁大谁小”进一步升级为“怎样才能一样多”的数量关系理解。',
    pedagogyTip: '通过可视化跷跷板让抽象比较变得直观可感。',
    mapZone: '数字小镇',
    milestoneType: 'lesson',
    estimatedDuration: '3分钟',
  },
});

registerGame({
  id: 'math-slide',
  name: '数字华容道',
  icon: '🧱',
  description: '滑动数字方块恢复正确顺序',
  path: '/games/math/slide',
  component: MathSlideGame,
  category: 'math',
  themeId: 'math-hub',
  minAge: 5,
  maxAge: 8,
  learningPath: {
    routeOrder: 5,
    levelLabel: 'L5 · 空间规划',
    ageRange: '5-8岁',
    skillFocus: ['空间想象', '步骤规划', '顺序认知'],
    assessmentScope: ['最优步数', '纠错能力', '空间迁移'],
    learningGoal: '用滑块操作把数字顺序和空间规划能力绑在一起练习。',
    pedagogyTip: '允许孩子先试错再优化，建立“计划—执行—修正”的循环。',
    mapZone: '数字小镇',
    milestoneType: 'challenge',
    estimatedDuration: '4分钟',
  },
});
