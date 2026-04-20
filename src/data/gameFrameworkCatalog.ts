export type FrameworkStatus = 'playable' | 'framework';

export interface FrameworkCatalogItem {
  id: string;
  name: string;
  description: string;
  goal: string;
  tags: string[];
  status: FrameworkStatus;
  playPath?: string;
}

export interface FrameworkCatalogSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  games: FrameworkCatalogItem[];
}

export const frameworkCatalog: FrameworkCatalogSection[] = [
  {
    id: 'pinyin',
    title: '拼音冒险岛',
    icon: '📖',
    description: '围绕拼读、配对、节奏和视觉记忆，建立拼音识别与组合能力。',
    color: '#FF9800',
    games: [
      {
        id: 'pinyin-whack-a-mole',
        name: '拼音打地鼠',
        description: '敲击正确拼音地鼠，建立快速识别。',
        goal: '声母 / 韵母识别',
        tags: ['反应', '识别'],
        status: 'playable',
        playPath: '/games/pinyin/whack-a-mole-generic',
      },
      {
        id: 'pinyin-memory',
        name: '拼音翻翻乐',
        description: '翻开卡片，找到拼音和对应形象线索。',
        goal: '音形对应记忆',
        tags: ['记忆', '配对'],
        status: 'playable',
        playPath: '/games/pinyin/memory',
      },
      {
        id: 'pinyin-link',
        name: '拼音连连看',
        description: '将声母和韵母连成完整音节。',
        goal: '拼音组合能力',
        tags: ['连线', '组合'],
        status: 'playable',
        playPath: '/games/pinyin/link',
      },
      {
        id: 'pinyin-puzzle',
        name: '拼音拼图',
        description: '拖动碎片拼出完整音节结构。',
        goal: '拼音结构认知',
        tags: ['拼图', '结构'],
        status: 'playable',
        playPath: '/games/pinyin/puzzle',
      },
      {
        id: 'pinyin-rhythm',
        name: '拼音节奏大师',
        description: '按发音节奏点击，强化语感。',
        goal: '节奏与发音',
        tags: ['音乐', '节奏'],
        status: 'playable',
        playPath: '/games/pinyin/rhythm',
      },
    ],
  },
  {
    id: 'math',
    title: '数字小镇',
    icon: '🔢',
    description: '将数感、规律、逻辑和空间操作拆成可复用的数理游戏框架。',
    color: '#2196F3',
    games: [
      {
        id: 'math-pattern',
        name: '找规律填数',
        description: '观察数字变化，补齐缺失答案。',
        goal: '规律识别与推理',
        tags: ['规律', '推理'],
        status: 'playable',
        playPath: '/games/math/patterns',
      },
      {
        id: 'math-sudoku',
        name: '数独儿童版',
        description: '用轻量数独训练逻辑。',
        goal: '逻辑推理',
        tags: ['逻辑', '网格'],
        status: 'playable',
        playPath: '/games/math/sudoku',
      },
      {
        id: 'math-whack-a-mole',
        name: '数学打地鼠',
        description: '在限时内敲击正确答案。',
        goal: '数值判断与反应',
        tags: ['反应', '计算'],
        status: 'playable',
        playPath: '/games/math/whack-a-mole',
      },
      {
        id: 'math-slide',
        name: '数字华容道',
        description: '滑动数字块排回正确顺序。',
        goal: '空间规划',
        tags: ['滑块', '规划'],
        status: 'playable',
        playPath: '/games/math/slide',
      },
      {
        id: 'math-balance',
        name: '比大小跷跷板',
        description: '拖动数字让两端平衡。',
        goal: '数值比较',
        tags: ['比较', '拖拽'],
        status: 'playable',
        playPath: '/games/math/balance',
      },
    ],
  },
  {
    id: 'english',
    title: '英语游乐园',
    icon: '🌍',
    description: '以单词识别、拼写、听辨和快速反应为核心，构建轻量英语玩法矩阵。',
    color: '#4CAF50',
    games: [
      {
        id: 'english-word-flip',
        name: '单词翻翻乐',
        description: '在图片和单词之间建立稳定映射。',
        goal: '词汇记忆',
        tags: ['记忆', '词汇'],
        status: 'playable',
        playPath: '/games/english/word-flip',
      },
      {
        id: 'english-letter-spell',
        name: '字母拼图',
        description: '拼出正确单词，强化拼写意识。',
        goal: '字母拼写',
        tags: ['拼写', '拖拽'],
        status: 'playable',
        playPath: '/games/english/letter-spell',
      },
      {
        id: 'english-whack-a-mole',
        name: '英语打地鼠',
        description: '快节奏识别正确单词或图片。',
        goal: '词汇反应速度',
        tags: ['反应', '识别'],
        status: 'playable',
        playPath: '/games/english/whack-a-mole',
      },
      {
        id: 'english-bingo',
        name: '英语宾果',
        description: '听词并标记 Bingo 卡。',
        goal: '听力理解',
        tags: ['听力', '宾果'],
        status: 'playable',
        playPath: '/games/english/bingo',
      },
      {
        id: 'english-roleplay',
        name: '英语角色扮演',
        description: '在情境里说出合适表达。',
        goal: '口语表达',
        tags: ['对话', '情境'],
        status: 'playable',
        playPath: '/games/english/roleplay',
      },
    ],
  },
  {
    id: 'stories',
    title: '故事王国',
    icon: '📚',
    description: '把故事理解拆成排序、问答、阅读和角色匹配等轻认知任务。',
    color: '#9C27B0',
    games: [
      {
        id: 'story-sequence',
        name: '故事排序',
        description: '按正确发展顺序重建故事。',
        goal: '逻辑顺序与理解',
        tags: ['排序', '理解'],
        status: 'playable',
        playPath: '/games/stories/sequence',
      },
      {
        id: 'story-reading',
        name: '故事阅读',
        description: '沉浸式阅读与朗读引导。',
        goal: '阅读理解',
        tags: ['阅读', '沉浸'],
        status: 'playable',
        playPath: '/games/stories',
      },
      {
        id: 'story-whack-a-mole',
        name: '汉字打地鼠',
        description: '在熟悉故事语境里强化汉字识别。',
        goal: '识字与反应',
        tags: ['识字', '反应'],
        status: 'playable',
        playPath: '/games/stories/whack-a-mole',
      },
      {
        id: 'story-turntable',
        name: '故事问答转盘',
        description: '随机抽题检测故事理解。',
        goal: '理解检测',
        tags: ['问答', '转盘'],
        status: 'playable',
        playPath: '/games/stories/turntable',
      },
      {
        id: 'story-creation',
        name: '故事创作工坊',
        description: '拖拽角色、地点和事件生成新故事。',
        goal: '创造力表达',
        tags: ['创作', '拖拽'],
        status: 'playable',
        playPath: '/games/stories/create',
      },
    ],
  },
  {
    id: 'cross-subject',
    title: '跨学科综合游戏',
    icon: '🧠',
    description: '将注意力、记忆、反应和策略做成跨主题通用能力训练框架。',
    color: '#E91E63',
    games: [
      {
        id: 'schulte-grid',
        name: '舒尔特方格',
        description: '按顺序点数字，训练视觉搜索和专注。',
        goal: '注意力与搜索速度',
        tags: ['专注', '视觉搜索'],
        status: 'playable',
        playPath: '/games/frameworks/schulte-grid',
      },
      {
        id: 'reaction-test',
        name: '反应测试',
        description: '看到信号立即点击，训练抑制与反应。',
        goal: '反应速度',
        tags: ['速度', '控制'],
        status: 'playable',
        playPath: '/games/frameworks/reaction-test',
      },
      {
        id: 'memory-flip',
        name: '记忆翻牌',
        description: '统一翻牌框架可套用到拼音、英语、故事等内容。',
        goal: '工作记忆',
        tags: ['记忆', '复用'],
        status: 'playable',
        playPath: '/games/english/word-flip',
      },
      {
        id: 'pattern-quest',
        name: '找规律',
        description: '统一序列规则框架可复用于数字、颜色和语言。',
        goal: '模式识别',
        tags: ['规律', '复用'],
        status: 'playable',
        playPath: '/games/math/patterns',
      },
      {
        id: 'maze-adventure',
        name: '迷宫探险',
        description: '按主题规则探索路径。',
        goal: '计划能力与空间认知',
        tags: ['迷宫', '空间'],
        status: 'playable',
        playPath: '/games/frameworks/maze-adventure',
      },
    ],
  },
];
