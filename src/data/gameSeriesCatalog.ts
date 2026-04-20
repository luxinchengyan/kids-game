export interface GameSeriesLevel {
  id: string;
  title: string;
  difficultyLabel: string;
  rounds: number;
  bankSize: number;
  summary: string;
}

export interface GameSeriesConfig {
  gameId: string;
  arcTitle: string;
  arcSummary: string;
  progressionLabel: string;
  totalBankSize: number;
  levels: GameSeriesLevel[];
}

export const gameSeriesCatalog: Record<string, GameSeriesConfig> = {
  'math-pattern': {
    gameId: 'math-pattern',
    arcTitle: '规律侦探队',
    arcSummary: '从固定步长到交替、跳跃和混合规则，逐步建立数感与推理能力。',
    progressionLabel: '启蒙观察 → 规律拆解 → 逻辑挑战',
    totalBankSize: 24,
    levels: [
      {
        id: 'sprout',
        title: '第一站：规律起步',
        difficultyLabel: '入门',
        rounds: 5,
        bankSize: 8,
        summary: '先看懂每次加减多少，建立最基础的变化感。',
      },
      {
        id: 'bridge',
        title: '第二站：双规则列车',
        difficultyLabel: '进阶',
        rounds: 6,
        bankSize: 8,
        summary: '开始识别交替、倍数和两步循环的变化方式。',
      },
      {
        id: 'summit',
        title: '第三站：挑战实验室',
        difficultyLabel: '挑战',
        rounds: 7,
        bankSize: 8,
        summary: '把多种规则放进同一关里，学会先观察再推理。',
      },
    ],
  },
  'math-sudoku': {
    gameId: 'math-sudoku',
    arcTitle: '数字迷宫营',
    arcSummary: '用连续棋盘闯关的形式，把观察、排除和空间规划连成完整训练路径。',
    progressionLabel: '热身棋盘 → 专注棋盘 → 冠军棋盘',
    totalBankSize: 18,
    levels: [
      {
        id: 'warmup',
        title: '热身棋盘',
        difficultyLabel: '入门',
        rounds: 2,
        bankSize: 6,
        summary: '缺口更少，先熟悉每行每列不重复的规则。',
      },
      {
        id: 'focus',
        title: '专注棋盘',
        difficultyLabel: '进阶',
        rounds: 2,
        bankSize: 6,
        summary: '空格更多，需要一边试一边排除错误选项。',
      },
      {
        id: 'master',
        title: '冠军棋盘',
        difficultyLabel: '挑战',
        rounds: 3,
        bankSize: 6,
        summary: '连续完成多局难题，训练稳定专注和策略安排。',
      },
    ],
  },
  'english-word-flip': {
    gameId: 'english-word-flip',
    arcTitle: '单词记忆巡游',
    arcSummary: '按主题展开词汇旅程，从高频词到混合场景，形成稳定的音形义映射。',
    progressionLabel: '动物乐园 → 生活派对 → 世界混搭',
    totalBankSize: 30,
    levels: [
      {
        id: 'animals',
        title: '动物乐园',
        difficultyLabel: '入门',
        rounds: 4,
        bankSize: 10,
        summary: '先用最熟悉的小动物建立单词和图像配对感。',
      },
      {
        id: 'daily-life',
        title: '生活派对',
        difficultyLabel: '进阶',
        rounds: 5,
        bankSize: 10,
        summary: '加入食物、玩具和日常物品，让词汇更贴近生活。',
      },
      {
        id: 'world-mix',
        title: '世界混搭',
        difficultyLabel: '挑战',
        rounds: 6,
        bankSize: 10,
        summary: '混合自然、场景和动作词，强化快速识别能力。',
      },
    ],
  },
  'pinyin-link': {
    gameId: 'pinyin-link',
    arcTitle: '拼读连线大冒险',
    arcSummary: '从单韵母到复韵母，再到复杂音节，把“拆开认”和“组合读”连成主线。',
    progressionLabel: '基础拼读 → 复合拼读 → 高阶音节',
    totalBankSize: 24,
    levels: [
      {
        id: 'basic',
        title: '基础拼读岛',
        difficultyLabel: '入门',
        rounds: 5,
        bankSize: 8,
        summary: '先练最常见的声母 + 单韵母组合，建立拼读安全感。',
      },
      {
        id: 'compound',
        title: '复合拼读岛',
        difficultyLabel: '进阶',
        rounds: 6,
        bankSize: 8,
        summary: '加入复韵母和介母组合，听辨和组合同步升级。',
      },
      {
        id: 'mission',
        title: '高阶音节岛',
        difficultyLabel: '挑战',
        rounds: 7,
        bankSize: 8,
        summary: '把更长音节放进连线任务里，训练完整拼音结构感。',
      },
    ],
  },
  'story-sequence': {
    gameId: 'story-sequence',
    arcTitle: '故事时间列车',
    arcSummary: '用“起因-经过-结果”的连续闯关，把理解、复述和表达串成一条线。',
    progressionLabel: '神话启程 → 成长故事 → 经典挑战',
    totalBankSize: 18,
    levels: [
      {
        id: 'myth',
        title: '神话启程站',
        difficultyLabel: '入门',
        rounds: 2,
        bankSize: 6,
        summary: '先从结构清晰的神话故事入手，认识开端和结局。',
      },
      {
        id: 'growth',
        title: '成长故事站',
        difficultyLabel: '进阶',
        rounds: 2,
        bankSize: 6,
        summary: '开始判断人物动机和关键转折，理解“为什么这样发展”。',
      },
      {
        id: 'classic',
        title: '经典挑战站',
        difficultyLabel: '挑战',
        rounds: 2,
        bankSize: 6,
        summary: '面对更长的事件链，练习整段复述与顺序回忆。',
      },
    ],
  },
  'schulte-grid': {
    gameId: 'schulte-grid',
    arcTitle: '专注力冲刺营',
    arcSummary: '把视觉搜索、抑制控制和速度训练拆成连续训练单元，不再只做一局。',
    progressionLabel: '热身扫描 → 稳定追踪 → 极速冲刺',
    totalBankSize: 18,
    levels: [
      {
        id: 'scan',
        title: '热身扫描',
        difficultyLabel: '入门',
        rounds: 2,
        bankSize: 6,
        summary: '用较小方格熟悉顺序搜索，先求稳再提速。',
      },
      {
        id: 'track',
        title: '稳定追踪',
        difficultyLabel: '进阶',
        rounds: 2,
        bankSize: 6,
        summary: '扩大方格密度，训练稳定专注和错误控制。',
      },
      {
        id: 'sprint',
        title: '极速冲刺',
        difficultyLabel: '挑战',
        rounds: 2,
        bankSize: 6,
        summary: '连续挑战高密度数字，兼顾速度和准确率。',
      },
    ],
  },
  'keyboard-scout': {
    gameId: 'keyboard-scout',
    arcTitle: '键位启航任务',
    arcSummary: '从 F/J 定位出发，逐渐扩展到主键区、上排和下排，让孩子先获得稳定的位置感。',
    progressionLabel: '定位起飞 → 主控回家 → 全区巡航',
    totalBankSize: 29,
    levels: [
      {
        id: 'anchor',
        title: '定位起飞',
        difficultyLabel: '入门',
        rounds: 2,
        bankSize: 6,
        summary: '先认识 F 和 J 两个最重要的起点键。',
      },
      {
        id: 'home',
        title: '主控回家',
        difficultyLabel: '进阶',
        rounds: 2,
        bankSize: 8,
        summary: '把 A S D F J K L 练成熟悉的“回家路线”。',
      },
      {
        id: 'scan',
        title: '全区巡航',
        difficultyLabel: '挑战',
        rounds: 2,
        bankSize: 15,
        summary: '上排和下排一起加入，让位置记忆更完整。',
      },
    ],
  },
  'meteor-defense': {
    gameId: 'meteor-defense',
    arcTitle: '宇宙拦截演习',
    arcSummary: '把字母做成一波波陨石，训练孩子看见、判断、按下之间的即时反应。',
    progressionLabel: '单点拦截 → 混合来袭 → 高压守护',
    totalBankSize: 20,
    levels: [
      {
        id: 'warmup',
        title: '单点拦截',
        difficultyLabel: '入门',
        rounds: 1,
        bankSize: 6,
        summary: '先用较少字母感受“看到就按”的节奏。',
      },
      {
        id: 'mix',
        title: '混合来袭',
        difficultyLabel: '进阶',
        rounds: 1,
        bankSize: 7,
        summary: '不同键位交错掉落，更考验注意力分配。',
      },
      {
        id: 'storm',
        title: '高压守护',
        difficultyLabel: '挑战',
        rounds: 1,
        bankSize: 7,
        summary: '面对更快的掉落密度，练速度也练稳定性。',
      },
    ],
  },
  'prompt-workshop': {
    gameId: 'prompt-workshop',
    arcTitle: '小小提示词工坊',
    arcSummary: '从问候语到创作口令，把单个字母串成真正的指令输入体验。',
    progressionLabel: '短词问候 → 两词指令 → 完整口令',
    totalBankSize: 42,
    levels: [
      {
        id: 'hello',
        title: '短词问候',
        difficultyLabel: '入门',
        rounds: 2,
        bankSize: 10,
        summary: '先输入最短的 AI 问候语，认识空格键。',
      },
      {
        id: 'command',
        title: '两词指令',
        difficultyLabel: '进阶',
        rounds: 2,
        bankSize: 16,
        summary: '开始输入 draw、open、find 这类常用动作词。',
      },
      {
        id: 'build',
        title: '完整口令',
        difficultyLabel: '挑战',
        rounds: 2,
        bankSize: 16,
        summary: '把更长短句一口气敲完，建立整句成就感。',
      },
    ],
  },
  'rhythm-assembly': {
    gameId: 'rhythm-assembly',
    arcTitle: '节拍装配实验室',
    arcSummary: '用固定节拍把常见字母组合练顺，让孩子从“找键”走向“顺手连打”。',
    progressionLabel: '单手节奏 → 双手切换 → 单词装配',
    totalBankSize: 22,
    levels: [
      {
        id: 'left-right',
        title: '单手节奏',
        difficultyLabel: '入门',
        rounds: 2,
        bankSize: 8,
        summary: '先用左右手常见键位练稳定拍点。',
      },
      {
        id: 'bridge',
        title: '双手切换',
        difficultyLabel: '进阶',
        rounds: 2,
        bankSize: 8,
        summary: '上排和主键区混合出现，训练顺滑切换。',
      },
      {
        id: 'robot',
        title: '单词装配',
        difficultyLabel: '挑战',
        rounds: 1,
        bankSize: 6,
        summary: '把 ROBOT、AIFUN 这类短词用节奏连起来。',
      },
    ],
  },
};

export function getGameSeriesConfig(gameId: string): GameSeriesConfig | undefined {
  return gameSeriesCatalog[gameId];
}

export function getGameSeriesSnapshot(gameId: string) {
  const config = getGameSeriesConfig(gameId);
  if (!config) {
    return undefined;
  }

  return {
    stageCount: config.levels.length,
    bankLabel: `题库 ${config.totalBankSize}`,
    ladderLabel: config.levels.map((level) => level.difficultyLabel).join(' / '),
    stageLabel: `${config.levels.length} 个级别`,
  };
}
