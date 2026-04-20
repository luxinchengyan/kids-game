import { lazy } from 'react';
import { registerGame } from '../registry';

const SubjectThemeHub = lazy(() => import('./SubjectThemeHub'));

// ── 历史故事馆 ────────────────────────────────────────────────
registerGame({
  id: 'history-hub',
  name: '历史故事馆',
  icon: '🏺',
  description: '通过人物、发明和重要事件，感受"以前的人怎么生活、怎么解决问题"。',
  path: '/games/history',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 10,
    levelLabel: '探索 · 历史故事',
    ageRange: '4-8岁',
    skillFocus: ['时间线认知', '人物理解', '因果表达', '文化认同'],
    assessmentScope: ['古代人物', '中国节日来源', '重要发明', '文明小故事'],
    learningGoal: '建立时间顺序感和文明故事感，让课程不只停留在记忆层。',
    pedagogyTip: '借鉴常识题中的历史母题，改造成故事化、启发式内容。',
    mapZone: '文明时光馆',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});

// ── 化学小实验坊 ──────────────────────────────────────────────
registerGame({
  id: 'chemistry-hub',
  name: '化学小实验坊',
  icon: '🧪',
  description: '从溶解、颜色变化、气味与材料差异入手，让孩子知道"物质会变化"。',
  path: '/games/chemistry',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 11,
    levelLabel: '探索 · 化学实验',
    ageRange: '4-8岁',
    skillFocus: ['观察记录', '分类比较', '现象描述', '安全意识'],
    assessmentScope: ['溶解与结晶', '酸碱变色', '表面张力', '氧化变化'],
    learningGoal: '把抽象科学降维到厨房、餐桌和手工材料里的真实体验。',
    pedagogyTip: '以安全、低门槛的生活场景替代题海，用生活实验启蒙科学思维。',
    mapZone: '奇妙实验室',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});

// ── 物理发现营 ────────────────────────────────────────────────
registerGame({
  id: 'physics-hub',
  name: '物理发现营',
  icon: '🚀',
  description: '把力、光、声音、运动做成"看见现象—说出原因—试着解释"的小挑战。',
  path: '/games/physics',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 5,
  maxAge: 8,
  learningPath: {
    routeOrder: 12,
    levelLabel: '探索 · 物理发现',
    ageRange: '5-8岁',
    skillFocus: ['因果推理', '规律发现', '实验提问', '语言解释'],
    assessmentScope: ['力与运动', '空气与压强', '光与影', '声音与磁力'],
    learningGoal: '把游戏里的动作反馈连接到现实世界的规律感知。',
    pedagogyTip: '从综合常识中的基础物理概念提炼出儿童探究式任务。',
    mapZone: '物理探索营',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});

// ── 生物探秘园 ────────────────────────────────────────────────
registerGame({
  id: 'biology-hub',
  name: '生物探秘园',
  icon: '🌱',
  description: '围绕人体、植物、动物和生态链，建立"生命会成长、需要环境、彼此有关系"的认知。',
  path: '/games/biology',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 13,
    levelLabel: '探索 · 生物世界',
    ageRange: '4-8岁',
    skillFocus: ['分类能力', '生命认知', '比较观察', '表达与关怀'],
    assessmentScope: ['人体五官', '种子发芽', '动物习性', '食物链启蒙'],
    learningGoal: '把孩子的好奇心引向生命观察和爱护自然。',
    pedagogyTip: '借用百科常识中的生命科学主题，改为亲近自然的儿童版本。',
    mapZone: '生命花园',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});

// ── 人工智能探索站 ──────────────────────────────────────────────
registerGame({
  id: 'ai-hub',
  name: '人工智能探索站',
  icon: '🤖',
  description: '从生活里的智能小帮手出发，学习观察、提问、创作和安全使用 AI。',
  path: '/games/ai',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 5,
  maxAge: 8,
  learningPath: {
    routeOrder: 14,
    levelLabel: '探索 · 人工智能',
    ageRange: '5-8岁',
    skillFocus: ['观察与提问', '分类与规则', '提示表达', '安全判断'],
    assessmentScope: ['什么是人工智能', '分类与训练', '清楚提问', '安全使用'],
    learningGoal: '让孩子把人工智能当成可观察、可提问、可共创也要会判断的新工具。',
    pedagogyTip: '先从生活中的智能现象入手，再过渡到规则、提问和安全边界，不把 AI 神秘化。',
    mapZone: '未来发明站',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});

// ── 百科知识站 ────────────────────────────────────────────────
registerGame({
  id: 'encyclopedia-hub',
  name: '百科知识站',
  icon: '📚',
  description: '把地理、历史、科学和生活规则串成"今日小知识 + 一问一答 + 生活延伸"的知识站。',
  path: '/games/encyclopedia',
  component: SubjectThemeHub,
  category: 'other',
  isThemeHub: true,
  minAge: 4,
  maxAge: 8,
  learningPath: {
    routeOrder: 15,
    levelLabel: '探索 · 综合百科',
    ageRange: '4-8岁',
    skillFocus: ['常识积累', '问答表达', '迁移应用', '自主复盘'],
    assessmentScope: ['节日由来', '国家象征', '自然现象', '生活规则'],
    learningGoal: '衔接主线世界与长期积累，让孩子每天都能新增一个小认知点。',
    pedagogyTip: '参考综合常识考点框架组织主题，全部使用原创儿童表达与例子。',
    mapZone: '知识百宝箱',
    milestoneType: 'hub',
    estimatedDuration: '自由探索',
  },
});
