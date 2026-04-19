/**
 * 故事考试
 * 使用通用考试系统框架
 */

import { ExamSystem, ExamConfig, Question } from '../common/ExamSystem';
import { defaultSpeakText } from '../common/WhackAMole';

// ==========================
// 故事题库
// ==========================

const storyQuestions: Question[] = [
  // 故事排序题
  {
    id: 'story-order-1',
    type: 'choice',
    question: '《龟兔赛跑》中，谁最后赢了比赛？',
    hint: '想想这个故事的结局',
    correctAnswer: '乌龟',
    emoji: '🏆',
    options: [
      { id: '乌龟', content: '乌龟', emoji: '🐢' },
      { id: '兔子', content: '兔子', emoji: '🐰' },
    ],
    explanation: '乌龟赢了！因为兔子太骄傲，在半路睡觉，而乌龟一直坚持爬到终点',
  },
  {
    id: 'story-order-2',
    type: 'choice',
    question: '《狼来了》的故事告诉我们什么道理？',
    hint: '牧童骗人会怎样？',
    correctAnswer: '不要说谎',
    emoji: '🐺',
    options: [
      { id: '不要说谎', content: '不要说谎', emoji: '❌' },
      { id: '要勇敢', content: '要勇敢', emoji: '💪' },
      { id: '要聪明', content: '要聪明', emoji: '🧠' },
      { id: '要勤劳', content: '要勤劳', emoji: '⭐' },
    ],
    explanation: '这个故事告诉我们不能说谎，说谎会失去别人的信任',
  },
  
  // 故事理解题
  {
    id: 'story-understand-1',
    type: 'choice',
    question: '《乌鸦喝水》中，乌鸦是怎么喝到水的？',
    hint: '乌鸦想了一个办法',
    correctAnswer: '往瓶子里丢石子',
    emoji: '🐦',
    options: [
      { id: '往瓶子里丢石子', content: '往瓶子里丢石子', emoji: '🪨' },
      { id: '把瓶子推倒', content: '把瓶子推倒', emoji: '❌' },
      { id: '用吸管喝水', content: '用吸管喝水', emoji: '🥤' },
      { id: '等水蒸发', content: '等水蒸发', emoji: '☀️' },
    ],
    explanation: '聪明的乌鸦往瓶子里丢石子，让水位升高，就喝到水了',
  },
  {
    id: 'story-understand-2',
    type: 'choice',
    question: '《孔融让梨》中，孔融为什么选小的梨？',
    hint: '孔融很懂事',
    correctAnswer: '把大的让给别人',
    emoji: '🍐',
    options: [
      { id: '不喜欢吃梨', content: '不喜欢吃梨', emoji: '❌' },
      { id: '把大的让给别人', content: '把大的让给别人', emoji: '❤️' },
      { id: '小的更甜', content: '小的更甜', emoji: '❌' },
      { id: '大的不好看', content: '大的不好看', emoji: '❌' },
    ],
    explanation: '孔融把大的梨让给哥哥们，自己选小的，表现了谦让的美德',
  },
  
  // 成语理解题
  {
    id: 'story-chengyu-1',
    type: 'choice',
    question: '"守株待兔"是什么意思？',
    hint: '农夫在树桩旁等什么？',
    correctAnswer: '不劳而获',
    emoji: '🌳',
    options: [
      { id: '不劳而获', content: '不劳而获', emoji: '❌' },
      { id: '勤劳致富', content: '勤劳致富', emoji: '💪' },
      { id: '聪明伶俐', content: '聪明伶俐', emoji: '🧠' },
      { id: '勇敢坚强', content: '勇敢坚强', emoji: '⭐' },
    ],
    explanation: '守株待兔比喻不主动努力，想靠运气获得成功',
  },
  {
    id: 'story-chengyu-2',
    type: 'choice',
    question: '"画蛇添足"告诉我们什么道理？',
    hint: '蛇有没有脚？',
    correctAnswer: '不要多此一举',
    emoji: '🐍',
    options: [
      { id: '要画得好', content: '要画得好', emoji: '🎨' },
      { id: '不要多此一举', content: '不要多此一举', emoji: '❌' },
      { id: '要仔细观察', content: '要仔细观察', emoji: '👀' },
      { id: '要快速完成', content: '要快速完成', emoji: '⚡' },
    ],
    explanation: '画蛇添足比喻做了多余的事，反而不合适',
  },
  
  // 判断题
  {
    id: 'story-judge-1',
    type: 'judge',
    question: '《小红帽》中，大灰狼假扮成了外婆，对吗？',
    hint: '想想故事里的情节',
    correctAnswer: 'true',
    emoji: '👧',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '对的！大灰狼吃掉了外婆，然后假扮成外婆等小红帽来',
  },
  {
    id: 'story-judge-2',
    type: 'judge',
    question: '《三只小猪》中，老三用稻草盖房子，对吗？',
    hint: '想想哪只小猪最聪明',
    correctAnswer: 'false',
    emoji: '🐷',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '错误！老三用最坚固的砖头盖房子，老大才用稻草',
  },
  {
    id: 'story-judge-3',
    type: 'judge',
    question: '《丑小鸭》最后变成了美丽的天鹅，对吗？',
    hint: '丑小鸭长大后是什么？',
    correctAnswer: 'true',
    emoji: '🦢',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '对的！丑小鸭长大后发现自己是一只美丽的天鹅',
  },
  
  // 角色配对题
  {
    id: 'story-character-1',
    type: 'choice',
    question: '《白雪公主》中，谁给了白雪公主毒苹果？',
    hint: '一个坏心眼的老太婆',
    correctAnswer: '王后',
    emoji: '🍎',
    options: [
      { id: '王后', content: '王后', emoji: '👸' },
      { id: '猎人', content: '猎人', emoji: '🏹' },
      { id: '小矮人', content: '小矮人', emoji: '⛏️' },
      { id: '王子', content: '王子', emoji: '🤴' },
    ],
    explanation: '恶毒的王后假扮成老太婆，给了白雪公主毒苹果',
  },
  {
    id: 'story-character-2',
    type: 'choice',
    question: '《西游记》中，孙悟空的武器是什么？',
    hint: '一根很重的铁棒',
    correctAnswer: '金箍棒',
    emoji: '🐵',
    options: [
      { id: '金箍棒', content: '金箍棒', emoji: '🔱' },
      { id: '大刀', content: '大刀', emoji: '⚔️' },
      { id: '弓箭', content: '弓箭', emoji: '🏹' },
      { id: '斧头', content: '斧头', emoji: '🪓' },
    ],
    explanation: '孙悟空的武器是如意金箍棒，重达一万三千五百斤',
  },
  
  // 诗词题
  {
    id: 'story-poem-1',
    type: 'choice',
    question: '补全诗句："床前明月光，疑是地上____"',
    hint: '李白《静夜思》',
    correctAnswer: '霜',
    emoji: '🌙',
    options: [
      { id: '霜', content: '霜', emoji: '❄️' },
      { id: '雪', content: '雪', emoji: '❄️' },
      { id: '冰', content: '冰', emoji: '🧊' },
      { id: '水', content: '水', emoji: '💧' },
    ],
    explanation: '床前明月光，疑是地上霜。这是李白的《静夜思》',
  },
  {
    id: 'story-poem-2',
    type: 'choice',
    question: '"春眠不觉晓"的下一句是什么？',
    hint: '孟浩然《春晓》',
    correctAnswer: '处处闻啼鸟',
    emoji: '🌸',
    options: [
      { id: '处处闻啼鸟', content: '处处闻啼鸟', emoji: '🐦' },
      { id: '夜来风雨声', content: '夜来风雨声', emoji: '🌧️' },
      { id: '花落知多少', content: '花落知多少', emoji: '🌺' },
      { id: '日照香炉生紫烟', content: '日照香炉生紫烟', emoji: '☀️' },
    ],
    explanation: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
  },
];

// ==========================
// 故事考试配置
// ==========================

export const storiesExamConfig: ExamConfig = {
  examId: 'stories-exam',
  examName: '故事知识测试',
  examIcon: '📚',
  themeColor: '#9C27B0',
  themeGradient: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
  backPath: '/games/stories',
  
  getQuestionPool: (category?: string) => {
    if (!category || category === 'all') {
      return [...storyQuestions];
    }
    return storyQuestions.filter(q => q.id.includes(category));
  },
  
  speakText: (text) => {
    defaultSpeakText(text, 'zh-CN');
  },
};

// ==========================
// 故事考试组件
// ==========================

export default function StoriesExam() {
  return (
    <ExamSystem
      gameId="stories-exam"
      exam={storiesExamConfig}
    />
  );
}
