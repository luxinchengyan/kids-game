import type { LearningPathMeta } from '../games/registry';

export interface JourneyThemeSummary {
  id: string;
  name: string;
  icon: string;
  learningPath?: LearningPathMeta;
  progress: {
    totalGames: number;
    playedCount: number;
    completionRate: number;
    totalStars: number;
  };
}

export interface GrowthStage {
  id: string;
  title: string;
  ageRange: string;
  headline: string;
  mainQuest: string;
  focusModules: string[];
  weeklyRhythm: string[];
  familyTips: string[];
  milestone: string;
}

export interface StudyCalendarDay {
  isoDate: string;
  label: string;
  weekday: string;
  title: string;
  focus: string;
  mission: string;
  checkpoint: string;
  completed: boolean;
  isToday: boolean;
  energy: 'warmup' | 'focus' | 'explore';
}

export interface SubjectExpansion {
  id: string;
  title: string;
  icon: string;
  summary: string;
  routeRole: string;
  skills: string[];
  sampleTopics: string[];
  inspiredBy: string;
  safetyNote?: string;
  learningRoute?: {
    id: string;
    phase: string;
    title: string;
    goal: string;
    activities: string[];
    outcome: string;
  }[];
  experimentCollections?: {
    principle: string;
    description: string;
    marketInsight: string;
    experiments: string[];
    designPlan: {
      product: string;
      testing: string;
      engineering: string;
      ui: string;
      gameDesign: string;
    };
  }[];
}

export interface EncyclopediaTopic {
  id: string;
  subject: string;
  icon: string;
  title: string;
  question: string;
  answer: string;
  extensionPrompt: string;
  ageTag: string;
}

export interface GrowthInsight {
  recordSummary: string;
  strengths: string[];
  focusSuggestions: string[];
  parentTips: string[];
  advantageNote: string;
  watchoutNote: string;
}

export interface LearningCoverageSummary {
  pinyin: number;
  math: number;
  english: number;
  stories: number;
  total: number;
}

export interface LearningSystemCard {
  id: string;
  title: string;
  problem: string;
  fix: string;
  metric: string;
  tone: 'warm' | 'focus' | 'alert' | 'explore';
}

export interface DailyFocusPlanStep {
  id: string;
  stage: 'warmup' | 'core' | 'review' | 'transfer';
  title: string;
  summary: string;
  detail: string;
}

export interface LearningSystemSnapshot {
  recommendedThemeId?: string;
  recommendationReason: string;
  systemCards: LearningSystemCard[];
  dailyPlan: DailyFocusPlanStep[];
}

const growthStages: GrowthStage[] = [
  {
    id: 'seed',
    title: '启航启蒙期',
    ageRange: '3-4岁',
    headline: '先把兴趣点亮，再把习惯种下去。',
    mainQuest: '用拼音、故事、数字和动作游戏建立安全感、节奏感和表达欲。',
    focusModules: ['拼音感知', '数量启蒙', '英语听说', '故事理解'],
    weeklyRhythm: ['4天主线体验', '2天复习回顾', '1天亲子展示'],
    familyTips: ['每天 15 分钟即可', '多鼓励复述和模仿', '优先建立固定学习时间'],
    milestone: '能主动说出今天学了什么，并愿意再次进入学习世界。',
  },
  {
    id: 'bridge',
    title: '连接搭桥期',
    ageRange: '4-5岁',
    headline: '从单点知识迈向主题连接。',
    mainQuest: '主线闯关之外，开始接入地理、历史、科学和百科常识，形成世界图景。',
    focusModules: ['拼音熟练', '数学逻辑', '英语词汇', '常识百科'],
    weeklyRhythm: ['3天核心主线', '2天科学百科', '1天回顾测评', '1天生活迁移'],
    familyTips: ['让孩子讲出原因而不只说答案', '把知识和家庭生活场景联动', '保留一张本周成就清单'],
    milestone: '能把学到的知识和真实生活现象对应起来。',
  },
  {
    id: 'voyage',
    title: '综合远航期',
    ageRange: '5-6岁',
    headline: '从会做题走向会观察、会解释、会表达。',
    mainQuest: '通过主线任务、检查点和百科知识站，训练多学科连接与表达能力。',
    focusModules: ['逻辑推理', '跨学科表达', '知识迁移', '学习复盘'],
    weeklyRhythm: ['3天主线挑战', '2天百科拓展', '1天项目复盘', '1天展示分享'],
    familyTips: ['每周追踪 1 个优势 + 1 个待加强点', '鼓励孩子当“小老师”讲给家人听', '复习比刷新题更重要'],
    milestone: '能完成“主线 + 百科 + 复盘”闭环，并形成自己的学习节奏。',
  },
];

const subjectExpansionCatalog: SubjectExpansion[] = [
  {
    id: 'geography',
    title: '地理观察站',
    icon: '🗺️',
    summary: '把方向、天气、地形、城市与国家这些大世界概念，拆成孩子看得见、摸得着的观察任务。',
    routeRole: '负责把“我家附近”慢慢扩展成“城市-中国-世界”的空间认知。',
    skills: ['空间感', '方向感', '地图意识', '环境观察'],
    sampleTopics: ['四季和天气', '山川河流', '中国省份印象', '世界地标'],
    inspiredBy: '参考综合常识中的地理脉络，重构为儿童可理解的世界认知路线。',
  },
  {
    id: 'history',
    title: '历史故事馆',
    icon: '🏺',
    summary: '通过人物、发明和重要事件，让孩子感受“以前的人怎么生活、怎么解决问题”。',
    routeRole: '负责建立时间顺序感和文明故事感，让课程不只停留在记忆层。',
    skills: ['时间线认知', '人物理解', '因果表达', '文化认同'],
    sampleTopics: ['古代人物', '中国节日来源', '重要发明', '文明小故事'],
    inspiredBy: '借鉴常识题中的历史母题，但改造成故事化、启发式内容。',
  },
  {
    id: 'chemistry',
    title: '化学小实验坊',
    icon: '🧪',
    summary: '从溶解、颜色变化、气味与材料差异入手，让孩子知道“物质会变化”。',
    routeRole: '负责把抽象科学降维到厨房、餐桌和手工材料里的真实体验。',
    skills: ['观察记录', '分类比较', '现象描述', '安全意识'],
    sampleTopics: ['溶解与结晶', '酸碱变色', '表面张力', '氧化变化'],
    inspiredBy: '以科学常识框架为骨架，用安全、低门槛的生活场景替代题海。',
    safetyNote: '优先使用食材级和文具级材料，避免明火、强酸强碱与入口操作，实验后及时洗手。',
    experimentCollections: [
      {
        principle: '溶解与结晶',
        description: '观察物质进入水中后的变化，再对比蒸发后重新出现的晶体。',
        marketInsight: '市面科学盒子里常见的“盐去哪了”“晶体生长”“冷热水溶解赛跑”，都围绕溶解速度和结晶回归展开。',
        experiments: ['盐在水里去哪了', '糖水蒸发长晶体', '冷热水谁溶得更快', '冰糖晶体小吊坠'],
        designPlan: {
          product: '先让孩子看到“看不见不等于消失”，再把等待晶体长出来做成连续打卡任务，兼顾即时反馈和延迟惊喜。',
          testing: '重点验证容器防倾倒、热水使用提醒、等待天数提示和观察记录是否清晰，避免孩子误以为没有变化就是失败。',
          engineering: '统一采用“材料 - 步骤 - 今日观察 - 明天变化”四段式结构，支持按家庭材料自动替换盐、糖、冰糖等版本。',
          ui: '界面用水滴、晶体、进度日历做视觉锚点，观察入口放大成单独按钮，让孩子每天一眼就知道要看哪里。',
          gameDesign: '把晶体长大设计成“实验宠物养成”，每天完成观察就点亮 1 颗结晶星，强化持续探索动机。',
        },
      },
      {
        principle: '酸碱指示与产气反应',
        description: '利用酸碱相遇后的变色和冒泡现象，建立“看见变化就能提问”的意识。',
        marketInsight: '当前儿童化学课最常见的是“火山喷发、气球自吹、魔法变色水”，因为冒泡和变色在 3 秒内就能带来强反馈。',
        experiments: ['小苏打白醋火山', '气球吹起来的瓶子', '紫甘蓝酸碱变色', '泡腾片熔岩灯'],
        designPlan: {
          product: '优先选择能快速冒泡和变色的实验，先抓住孩子注意力，再引导说出“什么东西变了、为什么会变”。',
          testing: '需要覆盖液体比例、容器容量、泡沫外溢、安全告知和误食提醒，确保高反馈实验不演变成清理灾难。',
          engineering: '把反应类实验抽象为“加入材料 - 等待反应 - 记录结果 - 对比下一次”的模板，便于同一引擎承载不同配方。',
          ui: '采用气泡弹出、颜色渐变和大图步骤卡，关键步骤配倒计时和安全图标，让低龄儿童也能跟着图示完成。',
          gameDesign: '把每次反应做成“猜猜会发生什么”的闯关，猜对现象得预测星，复述原因得观察星，形成双奖励。',
        },
      },
      {
        principle: '表面张力与乳化',
        description: '通过液面被“拉住”或被洗洁精打散的效果，理解液体也有自己的规则。',
        marketInsight: '彩虹牛奶、胡椒粉快跑和泡泡魔法是科学秀里的常驻项目，核心价值在于视觉冲击大、家庭材料易得、复刻门槛低。',
        experiments: ['牛奶彩虹', '胡椒粉快跑', '洗洁精赶走油膜', '不破泡泡挑战'],
        designPlan: {
          product: '把“液体也有规则”转成可看见的魔法感，让孩子从惊讶出发，再建立表面张力和乳化的初步概念。',
          testing: '重点检查色素量、洗洁精滴入位置、牛奶类型差异和桌面清洁提示，避免因材料差异导致效果不明显。',
          engineering: '实验卡片要支持对同一现象做多轮变量替换，比如换全脂奶、换清水、换油膜，帮助后续扩展成对比任务。',
          ui: '主视觉强调扩散轨迹和液面波纹，步骤区用颜色编号，避免孩子分不清“先滴色素还是先碰洗洁精”。',
          gameDesign: '设计成“魔法破局”玩法：先观察静止液面，再用正确工具触发变化，完成后解锁不同颜色和液体皮肤。',
        },
      },
      {
        principle: '氧化与材料变化',
        description: '让孩子慢慢观察颜色和材质变化，知道有些变化不是马上发生的。',
        marketInsight: '苹果变色、铁钉生锈和铜币清洁常被放进“时间会让材料变化”的主题课里，适合训练长期观察和对照实验。',
        experiments: ['苹果切面为什么会变色', '铁钉生锈观察瓶', '铜币清洁小对比', '柠檬汁防氧化比赛'],
        designPlan: {
          product: '这组实验主打“不是所有变化都马上发生”，帮助孩子从追求即时刺激转向理解时间和环境也会影响结果。',
          testing: '要验证记录周期、拍照对比入口、不同材料差异提示和家长陪伴说明，避免孩子因为等待过久失去兴趣。',
          engineering: '适合接入连续观察数据结构，支持上传第 1 天、第 3 天、第 5 天的状态，形成时间轴式实验档案。',
          ui: '用前后对比卡和时间轴表现材料变化，颜色变化区要高对比显示，帮助孩子快速注意到微小差异。',
          gameDesign: '把它做成“时间侦探任务”，孩子需要每天收集线索，最后回答“谁变得最快、为什么会这样”。',
        },
      },
    ],
  },
  {
    id: 'physics',
    title: '物理发现营',
    icon: '🚀',
    summary: '把力、光、声音、运动这些概念做成“看见现象—说出原因—试着解释”的小挑战。',
    routeRole: '负责把游戏里的动作反馈连接到现实世界的规律感知。',
    skills: ['因果推理', '规律发现', '实验提问', '语言解释'],
    sampleTopics: ['力与运动', '空气与压强', '光与影', '声音与磁力'],
    inspiredBy: '从综合常识中的基础物理概念提炼出儿童探究式任务。',
    safetyNote: '以纸杯、吸管、手电和磁铁等低风险材料为主，避免高速弹射、破损玻璃和市电接触。',
    experimentCollections: [
      {
        principle: '力与运动',
        description: '让孩子看见推、拉、摩擦和反冲如何改变物体的快慢与方向。',
        marketInsight: '气球火箭、斜坡小车、纸飞机对比是低龄物理课的高频主题，因为动作感强、规则变化明显，特别适合做挑战赛。',
        experiments: ['气球火箭', '斜坡小车赛', '纸飞机调翼', '硬币掉进水杯'],
        designPlan: {
          product: '用“快不快、远不远、会不会拐弯”这类孩子天然关心的问题切入，把抽象力学变成可挑战的运动任务。',
          testing: '需重点检查弹射方向、安全距离、桌边跌落提醒和材料稳固度，保证速度类实验在家庭环境可控。',
          engineering: '所有运动类实验都可复用“预测 - 发射/推动 - 测量结果 - 再调整”的交互骨架，便于后续做排行榜和对比。',
          ui: '用跑道、箭头、速度条强化方向和距离反馈，结果页优先展示“更远了多少”“更稳了没有”这类儿童化指标。',
          gameDesign: '设计成分轮挑战：第一轮随手试，第二轮改一个变量，第三轮冲击最佳成绩，让孩子自然进入迭代思维。',
        },
      },
      {
        principle: '空气与压强',
        description: '通过空气看不见却能“托住、推出、吸住”的效果，感受压强存在。',
        marketInsight: '倒扣水杯、吸管喷泉、悬浮小球经常出现在科学营“空气魔法”单元，因为效果反直觉，最容易触发提问。',
        experiments: ['倒扣水杯不漏水', '吸管喷泉', '纸团为什么进不了瓶子', '吹气悬浮乒乓球'],
        designPlan: {
          product: '抓住“明明看不见却能把东西托住”的反差感，让孩子主动提出“空气真的在用力吗”。',
          testing: '必须验证纸片尺寸、容器密封性、吹气难度和水量上限，避免因条件不满足导致实验失败率过高。',
          engineering: '适合把关键条件做成动态提示，例如“纸片要盖满杯口”“吹嘴离球多远”，降低家庭复现门槛。',
          ui: '视觉上用气流线、压力波和悬浮动画表达空气存在，步骤卡强调手部位置，减少操作姿势错误。',
          gameDesign: '玩法上采用“空气守护者”任务，孩子需要找到正确吹气角度或密封方式，解锁无形力量徽章。',
        },
      },
      {
        principle: '光的反射与折射',
        description: '借助手电和清水观察光线如何拐弯、反弹，理解影子和彩虹背后的线索。',
        marketInsight: '影子、潜望镜、光盘彩虹是儿童光学课的经典组合，因为“看得见变化、讲得出原因、还能做作品”三点兼备。',
        experiments: ['影子变长变短', '铅笔在水里弯了', '镜子小潜望镜', '光盘彩虹'],
        designPlan: {
          product: '让孩子先通过影子和弯曲错觉获得“哇”的瞬间，再连接到反射、折射和观察角度这些基础概念。',
          testing: '要覆盖室内外光源差异、镜面边缘包裹、手电亮度和用眼距离提醒，保证效果稳定且不刺眼。',
          engineering: '光学类内容适合叠加示意图层，把光线路径和真实画面同步展示，帮助孩子把现象和原理对应起来。',
          ui: '用高对比暗色背景衬托光线轨迹，交互上允许拖动光源方向，让孩子直接看到影子和反射角度变化。',
          gameDesign: '设计成“光线解谜”，通过摆正镜子或改变光源位置完成照亮目标、找到隐藏图案等任务。',
        },
      },
      {
        principle: '声音与磁力',
        description: '从“振动会发声、磁铁会吸引”出发，把抽象规律变成可操作的小发现。',
        marketInsight: '纸杯电话、橡皮筋小琴和磁铁迷宫在亲子科学课里非常常见，原因是材料简单、互动性强，还容易做双人合作。',
        experiments: ['纸杯电话', '橡皮筋小琴', '磁铁找朋友', '磁力迷宫运球'],
        designPlan: {
          product: '把“我能听到你的声音”“这个东西怎么自己动了”做成双人协作体验，让孩子在合作中理解振动和磁力。',
          testing: '需验证绳子长度、杯底打孔牢固度、磁铁封装安全和小零件防吞咽提示，兼顾互动效果与儿童安全。',
          engineering: '声音和磁力模块可以复用“尝试 - 变化 - 解释”记录模板，同时支持双人模式和材料识别小游戏。',
          ui: '界面采用声波、磁力线和合作连线动画，按钮尺寸偏大，便于孩子和家长并肩操作时快速理解当前状态。',
          gameDesign: '玩法上分为“合作传声”和“磁力寻宝”两类，前者强调配合，后者强调闯关收集，形成动静搭配。',
        },
      },
    ],
  },
  {
    id: 'biology',
    title: '生物探秘园',
    icon: '🌱',
    summary: '围绕人体、植物、动物和生态链，建立“生命会成长、需要环境、彼此有关系”的认知。',
    routeRole: '负责把孩子的好奇心引向生命观察和爱护自然。',
    skills: ['分类能力', '生命认知', '比较观察', '表达与关怀'],
    sampleTopics: ['人体五官', '种子发芽', '动物习性', '食物链启蒙'],
    inspiredBy: '借用百科常识中的生命科学主题，改为亲近自然的儿童版本。',
  },
  {
    id: 'ai',
    title: '人工智能探索站',
    icon: '🤖',
    summary: '把“会听、会看、会推荐、会聊天”的智能现象，变成孩子能观察、会提问、敢创作、懂判断的未来启蒙路线。',
    routeRole: '负责把“人工智能很神奇”变成“我知道它怎么帮忙、怎么提问、怎么安全使用”的未来工具素养。',
    skills: ['观察与提问', '分类与规则', '提示表达', '创意协作', '安全判断'],
    sampleTopics: ['身边的智能帮手', '机器人怎么学会分类', '我该怎么问 AI', '和 AI 一起创作'],
    inspiredBy: '结合儿童编程启蒙、信息素养和生成式 AI 入门思路，重构成低门槛、强互动的原创学习路线。',
    safetyNote: '始终由家长陪伴使用，不输入姓名、电话、住址等隐私信息；看到奇怪答案先停下来，一起核对再继续。',
    learningRoute: [
      {
        id: 'ai-see',
        phase: '第 1 站',
        title: '看见 AI 在哪里',
        goal: '先从生活里的智能现象入手，知道 AI 不是魔法，而是会帮忙识别、推荐和回答问题的工具。',
        activities: ['找一找家里的智能语音、导航、推荐内容', '说出“机器擅长什么，人更擅长什么”', '试玩一句话指令：请它讲一个动物小故事'],
        outcome: '能举出 2-3 个身边的 AI 场景，并知道 AI 是“根据信息帮忙判断”的小助手。',
      },
      {
        id: 'ai-train',
        phase: '第 2 站',
        title: '教会 AI 学规则',
        goal: '通过分类、对比和找规律，理解 AI 需要很多例子和清楚规则，才会越来越会帮忙。',
        activities: ['把水果、交通工具、动物做分类卡片', '玩“如果...那么...”机器人指令游戏', '比较好例子和坏例子，看看机器人为什么会弄错'],
        outcome: '知道 AI 需要“看很多例子”来学习，分类越清楚，结果通常越稳定。',
      },
      {
        id: 'ai-prompt',
        phase: '第 3 站',
        title: '学会清楚地提问',
        goal: '把模糊提问变成清楚表达，学会告诉 AI “你是谁、要做什么、有什么要求”。',
        activities: ['把“讲故事”升级成“讲一个 3 句、主角是小鲸鱼的故事”', '给 AI 加上角色：老师、导游、画家', '比较不同问法，看看答案为什么会变化'],
        outcome: '理解“问得越清楚，AI 越容易帮上忙”，并能说出一个完整的小提示语。',
      },
      {
        id: 'ai-create',
        phase: '第 4 站',
        title: '和 AI 一起创作',
        goal: '把 AI 当作创作搭档，而不是替代者，练习提出想法、修改结果、说出自己的选择。',
        activities: ['和 AI 共编一个结局可以选择的冒险故事', '让 AI 帮忙生成画面点子，再自己补充细节', '做一次“我最满意的修改”展示'],
        outcome: '能和 AI 完成一次共同创作，并表达“哪些是 AI 帮的、哪些是我自己决定的”。',
      },
      {
        id: 'ai-safe',
        phase: '第 5 站',
        title: '做负责任的小小 AI 探险家',
        goal: '建立最基础的 AI 安全意识：会核对、会保护隐私、会在不确定时求助大人。',
        activities: ['把 AI 回答和书本、老师、家长的说法做对比', '练习“不说名字电话住址”的安全口令', '遇到奇怪答案时练习“停一下 - 问家长 - 再判断”'],
        outcome: '知道 AI 也会说错，需要核对和保护自己，形成安全、礼貌、会判断的使用习惯。',
      },
    ],
  },
  {
    id: 'encyclopedia',
    title: '百科知识站',
    icon: '📚',
    summary: '把地理、历史、科学和生活规则串成“今日小知识 + 一问一答 + 生活延伸”的知识站。',
    routeRole: '负责衔接主线世界与长期积累，让孩子每天都能新增一个小认知点。',
    skills: ['常识积累', '问答表达', '迁移应用', '自主复盘'],
    sampleTopics: ['节日由来', '国家象征', '自然现象', '生活规则'],
    inspiredBy: '参考综合常识考点框架组织主题，但全部使用原创儿童表达与例子。',
  },
];

const encyclopediaCatalog: EncyclopediaTopic[] = [
  {
    id: 'geo-compass',
    subject: '地理',
    icon: '🧭',
    title: '方向为什么能帮我们找路？',
    question: '为什么地图上总会告诉我们东南西北？',
    answer: '因为方向像地图的语言。知道方向后，我们就能分清“前后左右”和“从哪里到哪里”，走路、看地图都会更清楚。',
    extensionPrompt: '和家人一起在家里找一找：窗户、门、书桌分别朝哪个方向？',
    ageTag: '4-6岁',
  },
  {
    id: 'history-paper',
    subject: '历史',
    icon: '📜',
    title: '纸出现后，学习为什么更方便？',
    question: '古人为什么会觉得纸很重要？',
    answer: '因为纸轻、能写字、好保存。它让故事、知识和想法更容易传给更多人，学习就不只靠口口相传了。',
    extensionPrompt: '想一想：如果没有纸，我们今天会怎么记住自己的故事？',
    ageTag: '4-6岁',
  },
  {
    id: 'chem-dissolve',
    subject: '化学',
    icon: '🥄',
    title: '盐跑到水里去了吗？',
    question: '把盐放进水里看不见了，是不是消失了？',
    answer: '不是消失了，而是溶解了。盐变成很小很小的颗粒，分散在水里，所以眼睛不容易看到。',
    extensionPrompt: '试试看糖和盐分别放进水里，它们变化一样吗？',
    ageTag: '4-6岁',
  },
  {
    id: 'physics-shadow',
    subject: '物理',
    icon: '🌤️',
    title: '影子为什么会变长变短？',
    question: '为什么早上和傍晚的影子更长？',
    answer: '因为太阳照过来的角度变了。角度斜的时候，影子就会拉得更长；太阳高的时候，影子就会变短。',
    extensionPrompt: '观察一天里自己的影子，什么时候最短？',
    ageTag: '5-6岁',
  },
  {
    id: 'biology-seed',
    subject: '生物',
    icon: '🌿',
    title: '种子为什么会发芽？',
    question: '小小的种子怎么会长成植物？',
    answer: '种子里面藏着“小生命”和营养。遇到合适的水分、空气和温度，它就会慢慢长出根和芽。',
    extensionPrompt: '选一颗豆子，试着做一周发芽观察记录。',
    ageTag: '4-6岁',
  },
  {
    id: 'civics-flag',
    subject: '百科',
    icon: '🇨🇳',
    title: '国旗为什么重要？',
    question: '为什么很多重要场合都会升国旗？',
    answer: '国旗代表一个国家，也提醒大家尊重共同的家园和规则。它像一个会说话的标志，让人知道“我们是一家人”。',
    extensionPrompt: '和孩子聊聊：除了国旗，学校里还有哪些大家都要一起遵守的规则？',
    ageTag: '4-6岁',
  },
  {
    id: 'geo-river',
    subject: '地理',
    icon: '🏞️',
    title: '河流为什么总往低处走？',
    question: '山上的水为什么会流到下面去？',
    answer: '因为地面有高低差，水会顺着更低的地方流动。很多河流就是这样慢慢形成的。',
    extensionPrompt: '用积木搭一个高低不同的小坡，看看水会往哪里流。',
    ageTag: '5-6岁',
  },
  {
    id: 'history-festival',
    subject: '历史',
    icon: '🏮',
    title: '节日为什么能把大家连在一起？',
    question: '为什么每年我们都会过同样的传统节日？',
    answer: '因为节日会把过去的故事、家人的习惯和大家共同重视的情感保存下来，让文化一直传下去。',
    extensionPrompt: '让孩子选一个喜欢的节日，说说它最重要的画面是什么。',
    ageTag: '4-6岁',
  },
];

function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatLabel(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatWeekday(date: Date) {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
}

export function getGrowthStages() {
  return growthStages;
}

export function getJourneyStage(age: number): GrowthStage {
  if (age <= 4) {
    return growthStages[0];
  }

  if (age === 5) {
    return growthStages[1];
  }

  return growthStages[2];
}

export function getExpandedSubjects() {
  return subjectExpansionCatalog;
}

export function getEncyclopediaTopics(age: number) {
  return encyclopediaCatalog.filter((topic) => {
    if (age <= 4) {
      return topic.subject !== '物理';
    }

    return true;
  });
}

function orderThemes(themes: JourneyThemeSummary[], selectedThemeId?: string) {
  const copied = [...themes];
  copied.sort((a, b) => {
    if (a.id === selectedThemeId) {
      return -1;
    }

    if (b.id === selectedThemeId) {
      return 1;
    }

    if (b.progress.completionRate !== a.progress.completionRate) {
      return b.progress.completionRate - a.progress.completionRate;
    }

    return b.progress.totalStars - a.progress.totalStars;
  });

  return copied;
}

export function buildStudyCalendar({
  age,
  streakDays,
  themes,
  selectedThemeId,
  referenceDate = new Date(),
}: {
  age: number;
  streakDays: number;
  themes: JourneyThemeSummary[];
  selectedThemeId?: string;
  referenceDate?: Date;
}): StudyCalendarDay[] {
  const stage = getJourneyStage(age);
  const orderedThemes = orderThemes(themes, selectedThemeId);
  const subjects = getExpandedSubjects();
  const today = normalizeDate(referenceDate);
  const weekStart = new Date(today);
  const mondayOffset = (today.getDay() + 6) % 7;
  weekStart.setDate(today.getDate() - mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + index);

    const theme = orderedThemes[index % Math.max(orderedThemes.length, 1)];
    const subject = subjects[index % subjects.length];
    const isToday = normalizeDate(dayDate).getTime() === today.getTime();
    const diffDays = Math.round((today.getTime() - normalizeDate(dayDate).getTime()) / 86400000);
    const completed = diffDays >= 0 && diffDays < Math.max(streakDays, 0);

    const title = index < 3 || !theme ? `${subject.icon} ${subject.title}` : `${theme.icon} ${theme.name}`;
    const focus = theme?.learningPath?.skillFocus.slice(0, 2).join(' / ') || subject.skills.slice(0, 2).join(' / ');
    const mission =
      index === 5
        ? `完成 1 个主线关卡后，再挑战 1 个${subject.title}小知识。`
        : index === 6
          ? `做一次“我来讲给家人听”，把本周学到的内容复述出来。`
          : `主线任务围绕${title}展开，配套 1 个知识点复习与表达练习。`;
    const checkpoint =
      index === 3
        ? '检查点：说出“我今天知道了什么、为什么会这样”。'
        : index === 6
          ? `周总结：对照${stage.milestone}`
          : `记录点：完成后贴 1 个“已点亮”标记，巩固${focus}。`;

    return {
      isoDate: dayDate.toISOString(),
      label: formatLabel(dayDate),
      weekday: formatWeekday(dayDate),
      title,
      focus,
      mission,
      checkpoint,
      completed,
      isToday,
      energy: index < 2 ? 'warmup' : index < 5 ? 'focus' : 'explore',
    };
  });
}

export function buildGrowthInsights({
  childName,
  age,
  streakDays,
  themes,
  selectedThemeId,
}: {
  childName: string;
  age: number;
  streakDays: number;
  themes: JourneyThemeSummary[];
  selectedThemeId?: string;
}): GrowthInsight {
  const stage = getJourneyStage(age);
  const ordered = orderThemes(themes, selectedThemeId);
  const strongest = ordered[0];
  const weakest = [...themes]
    .filter((theme) => theme.progress.totalGames > 0)
    .sort((a, b) => a.progress.completionRate - b.progress.completionRate)[0];
  const totalStars = themes.reduce((sum, theme) => sum + theme.progress.totalStars, 0);
  const exploredThemes = themes.filter((theme) => theme.progress.playedCount > 0).length;

  const strengths = [
    streakDays >= 3
      ? `已经形成连续 ${streakDays} 天的学习节奏，习惯建设表现突出。`
      : '正在建立稳定节奏，建议把学习时间固定在每天同一时段。',
    strongest
      ? `${strongest.name} 目前完成度最高，说明孩子对“${strongest.learningPath?.skillFocus[0] ?? strongest.name}”的接受度更好。`
      : '建议先从一条最喜欢的主线世界出发，建立第一份成就感。',
    totalStars >= 6
      ? '已经出现稳定的任务完成反馈，适合加入更多复述与展示环节。'
      : '先把“完成一关 + 说出收获”做扎实，再逐步提高挑战密度。',
  ];

  const focusSuggestions = [
    weakest
      ? `优先补齐 ${weakest.name} 的入口关卡，把知识地图补圆，而不是只反复玩熟悉世界。`
      : '优先点亮 1 个世界入口关卡，让路线真正开始滚动。',
    '每次主线任务后追加 1 个百科知识站问题，把“会做”升级成“会讲”。',
    `本阶段推荐遵循“${stage.weeklyRhythm.join(' - ')}”的节奏安排。`,
  ];

  return {
    recordSummary: `${childName} 已探索 ${exploredThemes}/${themes.length} 个世界，累计获得 ${totalStars} 颗世界星星，当前处于“${stage.title}”。`,
    strengths,
    focusSuggestions,
    parentTips: stage.familyTips,
    advantageNote: strongest
      ? `当前优势：${strongest.name} 进度领先，说明孩子更容易在 ${strongest.learningPath?.skillFocus.slice(0, 2).join('、') ?? '该主题'} 上获得成功体验。`
      : '当前优势：孩子对新内容保持好奇，适合用短时、高反馈的内容持续点亮兴趣。',
    watchoutNote: weakest
      ? `待加强点：${weakest.name} 进度偏慢，建议减少跳关，先完成入口关卡和基础检查点。`
      : '待加强点：还没有形成明显薄弱项，但要避免只追求星星数量而忽视复盘。',
  };
}

export function buildLearningSystemSnapshot({
  childName,
  age,
  themes,
  selectedThemeId,
  weakPointLabels,
  dueReviewCount,
  coverage,
}: {
  childName: string;
  age: number;
  themes: JourneyThemeSummary[];
  selectedThemeId?: string;
  weakPointLabels: string[];
  dueReviewCount: number;
  coverage: LearningCoverageSummary;
}): LearningSystemSnapshot {
  const ordered = orderThemes(themes, selectedThemeId);
  const selected = themes.find((theme) => theme.id === selectedThemeId) ?? ordered[0];
  const weakest = [...themes]
    .filter((theme) => theme.progress.totalGames > 0)
    .sort((a, b) => a.progress.completionRate - b.progress.completionRate)[0];
  const unexplored = [...themes]
    .filter((theme) => theme.progress.totalGames > 0 && theme.progress.playedCount === 0)
    .sort((a, b) => (a.learningPath?.routeOrder ?? 999) - (b.learningPath?.routeOrder ?? 999))[0];
  const recommended = weakest && weakest.progress.completionRate < 55 ? weakest : unexplored ?? selected;
  const stage = getJourneyStage(age);
  const weakText = weakPointLabels.length > 0 ? weakPointLabels.join(' / ') : '暂时没有明显薄弱点';

  const systemCards: LearningSystemCard[] = [
    {
      id: 'coverage',
      title: '知识覆盖',
      problem: '过去容易停留在少量高频题，知识面不够展开。',
      fix: '现在把拼音、数学、英语、故事题库统一纳入同一学习系统，主线不再只靠几个老题循环。',
      metric: `当前可调度 ${coverage.total} 个知识单元`,
      tone: 'warm',
    },
    {
      id: 'continuity',
      title: '前后承接',
      problem: '孩子容易只玩熟悉世界，主线会断层。',
      fix: recommended
        ? `系统已把下一站锁定为 ${recommended.name}，优先补齐最该推进的世界。`
        : '系统会优先补齐未探索或完成度最低的世界，不让路线断开。',
      metric: recommended ? `下一站：${recommended.name}` : '等待进入下一站',
      tone: 'focus',
    },
    {
      id: 'review',
      title: '复习闭环',
      problem: '做完即结束，错误点没有被稳定拉回。',
      fix:
        dueReviewCount > 0
          ? `今天已有 ${dueReviewCount} 个待复习点，系统会先复习 ${weakPointLabels[0] ?? '薄弱点'} 再进新任务。`
          : '系统会持续追踪易错点，并把下一次复习插回日程而不是让它消失。',
      metric: dueReviewCount > 0 ? `待复习 ${dueReviewCount} 项` : '今日暂无到期复习',
      tone: dueReviewCount > 0 ? 'alert' : 'focus',
    },
    {
      id: 'transfer',
      title: '迁移训练',
      problem: '学科任务和表达、复盘、能力热身之间脱节。',
      fix: `本周按照“${stage.weeklyRhythm.join(' - ')}”安排，把主线、复习、百科和表达串成闭环。`,
      metric: `薄弱点：${weakText}`,
      tone: 'explore',
    },
  ];

  const dailyPlan: DailyFocusPlanStep[] = [
    {
      id: 'warmup',
      stage: 'warmup',
      title: '1. 热身进入状态',
      summary: dueReviewCount > 0 ? '先复习再进新关' : '先做一题低门槛热身',
      detail:
        dueReviewCount > 0
          ? `${childName} 先回顾 ${weakPointLabels[0] ?? '最近的薄弱点'}，把最容易忘的内容重新点亮。`
          : `${childName} 先从已熟悉的短任务入手，快速建立成功感和节奏感。`,
    },
    {
      id: 'core',
      stage: 'core',
      title: '2. 推进主线世界',
      summary: recommended ? `核心主线放在 ${recommended.name}` : '推进当前主线世界',
      detail: recommended
        ? `优先补齐 ${recommended.name} 的关键关卡，让学习路线持续往前而不是原地打转。`
        : '先推进当前世界的下一个关键关卡，再决定是否切到新主题。',
    },
    {
      id: 'review',
      stage: 'review',
      title: '3. 做一次检查点回看',
      summary: selected ? `围绕 ${selected.name} 做稳定度检查` : '对当天主线做小复盘',
      detail: selected
        ? `在 ${selected.name} 里确认今天最关键的能力有没有真正掌握，而不是只完成按钮点击。`
        : '把今天的新内容再说一遍，检查是否已经能讲出来。',
    },
    {
      id: 'transfer',
      stage: 'transfer',
      title: '4. 接一题百科或表达',
      summary: '把“会做题”变成“会讲出来”',
      detail: `结束前补 1 个百科问题或家庭复述，把知识迁移到真实表达，帮助 ${childName} 形成长期积累。`,
    },
  ];

  return {
    recommendedThemeId: recommended?.id,
    recommendationReason: recommended
      ? `${recommended.name} 当前最值得推进：要么还没真正启动，要么完成度最低，先补它能让整条路线更完整。`
      : '优先补齐尚未稳定的世界，再进入新的知识扩展。',
    systemCards,
    dailyPlan,
  };
}
