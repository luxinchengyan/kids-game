export interface KeyboardScoutMission {
  id: string;
  title: string;
  focus: string;
  coachLine: string;
  keys: string[];
}

export interface TypingPromptMission {
  id: string;
  title: string;
  prompt: string;
  coachLine: string;
}

export interface RhythmMission {
  id: string;
  title: string;
  focus: string;
  pattern: string;
  targetGap: number;
}

export const aiTypingDesignNotes = [
  {
    title: '像产品经理一样拆练习',
    detail: '先练键位定位，再练反应、短句和节奏，让孩子每次都知道自己在练什么。',
  },
  {
    title: '像测试工程师一样给反馈',
    detail: '每次按对都会亮键、加星、出提示；按错也会立即标红，不让孩子“按了但不知道对不对”。',
  },
  {
    title: '像游戏策划一样做动机',
    detail: '把练字母包装成 AI 小队修机器人、挡陨石、发指令、装配芯片的连续任务。',
  },
  {
    title: '像 UI 工程师一样做低门槛',
    detail: '大按钮、大字母、高对比配色，操作路径尽量短，适合刚接触键盘的小朋友。',
  },
] as const;

export const keyboardScoutMissions: KeyboardScoutMission[] = [
  {
    id: 'anchor',
    title: 'AI 起飞校准',
    focus: '先找 F 和 J 两个定位键',
    coachLine: '摸到小凸点，像给机器人找到左右手的起点。',
    keys: ['F', 'J', 'F', 'J', 'F', 'J'],
  },
  {
    id: 'home-left-right',
    title: '主控台回家',
    focus: '熟悉 A S D F 和 J K L',
    coachLine: '左右手机械臂回到主控区，打字会更稳。',
    keys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', 'J'],
  },
  {
    id: 'top-row',
    title: '星轨扫描',
    focus: '从上排找到常用字母',
    coachLine: '眼睛看任务，手指去找 Q W E R T Y。',
    keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I'],
  },
  {
    id: 'bottom-row',
    title: '探测车巡航',
    focus: '下排键位也要认识',
    coachLine: 'Z X C V B N M 像一排小车站，依次发车。',
    keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  },
];

export const typingMeteorWave = [
  'F',
  'J',
  'D',
  'K',
  'A',
  'L',
  'S',
  'Q',
  'W',
  'E',
  'R',
  'U',
  'I',
  'O',
  'P',
  'Z',
  'X',
  'C',
  'V',
  'B',
];

export const typingPromptMissions: TypingPromptMission[] = [
  {
    id: 'hello-ai',
    title: '唤醒助手',
    prompt: 'HI AI',
    coachLine: '先学会简单问候，打字时别忘了按空格。',
  },
  {
    id: 'draw-cat',
    title: '发出创作指令',
    prompt: 'DRAW A CAT',
    coachLine: '一句短短的创作指令，就是一次完整的键盘路线练习。',
  },
  {
    id: 'open-map',
    title: '打开导航台',
    prompt: 'OPEN MAP',
    coachLine: '把字母分成小段来找，像走迷你迷宫一样。',
  },
  {
    id: 'build-robot',
    title: '启动机器人',
    prompt: 'BUILD ROBOT',
    coachLine: '左右手轮流合作，打完整句会很有成就感。',
  },
  {
    id: 'find-star',
    title: '寻找星星',
    prompt: 'FIND STAR',
    coachLine: '看清字母顺序，比一味求快更重要。',
  },
];

export const rhythmMissions: RhythmMission[] = [
  {
    id: 'left-hand',
    title: '左手齿轮',
    focus: '用均匀节奏敲出左手主控键',
    pattern: 'ASDF',
    targetGap: 680,
  },
  {
    id: 'right-hand',
    title: '右手齿轮',
    focus: '右手保持同样节奏',
    pattern: 'JKLJ',
    targetGap: 680,
  },
  {
    id: 'top-bridge',
    title: '上排巡线',
    focus: '切换到上排时也要稳',
    pattern: 'QWER',
    targetGap: 700,
  },
  {
    id: 'robot-core',
    title: '核心装配',
    focus: '把机器人单词一口气拼出来',
    pattern: 'ROBOT',
    targetGap: 720,
  },
  {
    id: 'ai-party',
    title: '派对收尾',
    focus: '最后连打一组快乐口令',
    pattern: 'AIFUN',
    targetGap: 640,
  },
];
