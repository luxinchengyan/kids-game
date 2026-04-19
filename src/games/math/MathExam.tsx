/**
 * 数学考试
 * 使用通用考试系统框架
 */

import { ExamSystem, ExamConfig, Question } from '../common/ExamSystem';
import { defaultSpeakText } from '../common/WhackAMole';

// ==========================
// 数学题库
// ==========================

const mathQuestions: Question[] = [
  // 数字认知
  {
    id: 'math-number-1',
    type: 'choice',
    question: '下面哪个数字是"5"？',
    hint: '找出数字5',
    correctAnswer: '5',
    emoji: '🖐️',
    options: [
      { id: '3', content: '3', emoji: '❌' },
      { id: '5', content: '5', emoji: '✅' },
      { id: '7', content: '7', emoji: '❌' },
      { id: '9', content: '9', emoji: '❌' },
    ],
    explanation: '这是数字5，代表5个手指',
  },
  {
    id: 'math-number-2',
    type: 'choice',
    question: '"八"用阿拉伯数字怎么表示？',
    hint: '八等于几',
    correctAnswer: '8',
    emoji: '8️⃣',
    options: [
      { id: '6', content: '6', emoji: '❌' },
      { id: '7', content: '7', emoji: '❌' },
      { id: '8', content: '8', emoji: '✅' },
      { id: '9', content: '9', emoji: '❌' },
    ],
    explanation: '"八"用阿拉伯数字表示就是8',
  },
  
  // 加法题
  {
    id: 'math-add-1',
    type: 'choice',
    question: '1 + 1 = ?',
    hint: '一个苹果加一个苹果等于几个苹果？',
    correctAnswer: '2',
    emoji: '🍎',
    options: [
      { id: '1', content: '1', emoji: '❌' },
      { id: '2', content: '2', emoji: '✅' },
      { id: '3', content: '3', emoji: '❌' },
      { id: '4', content: '4', emoji: '❌' },
    ],
    explanation: '1 + 1 = 2，一个加一个等于两个',
  },
  {
    id: 'math-add-2',
    type: 'choice',
    question: '2 + 3 = ?',
    hint: '两个加三个等于几个？',
    correctAnswer: '5',
    emoji: '⭐',
    options: [
      { id: '4', content: '4', emoji: '❌' },
      { id: '5', content: '5', emoji: '✅' },
      { id: '6', content: '6', emoji: '❌' },
      { id: '7', content: '7', emoji: '❌' },
    ],
    explanation: '2 + 3 = 5，两个加三个等于五个',
  },
  {
    id: 'math-add-3',
    type: 'choice',
    question: '3 + 4 = ?',
    hint: '三个加四个等于几个？',
    correctAnswer: '7',
    emoji: '🎈',
    options: [
      { id: '5', content: '5', emoji: '❌' },
      { id: '6', content: '6', emoji: '❌' },
      { id: '7', content: '7', emoji: '✅' },
      { id: '8', content: '8', emoji: '❌' },
    ],
    explanation: '3 + 4 = 7，三个加四个等于七个',
  },
  {
    id: 'math-add-4',
    type: 'choice',
    question: '5 + 5 = ?',
    hint: '五个加五个等于几个？',
    correctAnswer: '10',
    emoji: '👐',
    options: [
      { id: '8', content: '8', emoji: '❌' },
      { id: '9', content: '9', emoji: '❌' },
      { id: '10', content: '10', emoji: '✅' },
      { id: '11', content: '11', emoji: '❌' },
    ],
    explanation: '5 + 5 = 10，五个加五个等于十个',
  },
  
  // 减法题
  {
    id: 'math-sub-1',
    type: 'choice',
    question: '5 - 2 = ?',
    hint: '五个减去两个等于几个？',
    correctAnswer: '3',
    emoji: '🍬',
    options: [
      { id: '2', content: '2', emoji: '❌' },
      { id: '3', content: '3', emoji: '✅' },
      { id: '4', content: '4', emoji: '❌' },
      { id: '5', content: '5', emoji: '❌' },
    ],
    explanation: '5 - 2 = 3，五个减去两个等于三个',
  },
  {
    id: 'math-sub-2',
    type: 'choice',
    question: '8 - 3 = ?',
    hint: '八个减去三个等于几个？',
    correctAnswer: '5',
    emoji: '🐟',
    options: [
      { id: '4', content: '4', emoji: '❌' },
      { id: '5', content: '5', emoji: '✅' },
      { id: '6', content: '6', emoji: '❌' },
      { id: '7', content: '7', emoji: '❌' },
    ],
    explanation: '8 - 3 = 5，八个减去三个等于五个',
  },
  
  // 形状认知
  {
    id: 'math-shape-1',
    type: 'choice',
    question: '下面哪个是圆形？',
    hint: '圆形像太阳',
    correctAnswer: 'circle',
    emoji: '⭕',
    options: [
      { id: 'circle', content: '圆形', emoji: '⭕' },
      { id: 'square', content: '正方形', emoji: '⬜' },
      { id: 'triangle', content: '三角形', emoji: '🔺' },
      { id: 'star', content: '星形', emoji: '⭐' },
    ],
    explanation: '圆形是圆圆的，像太阳、像皮球',
  },
  {
    id: 'math-shape-2',
    type: 'choice',
    question: '下面哪个是三角形？',
    hint: '三角形有三个角',
    correctAnswer: 'triangle',
    emoji: '🔺',
    options: [
      { id: 'circle', content: '圆形', emoji: '⭕' },
      { id: 'square', content: '正方形', emoji: '⬜' },
      { id: 'triangle', content: '三角形', emoji: '🔺' },
      { id: 'heart', content: '心形', emoji: '❤️' },
    ],
    explanation: '三角形有三个角、三条边，像小山',
  },
  
  // 判断题
  {
    id: 'math-judge-1',
    type: 'judge',
    question: '2 + 2 = 5，对吗？',
    hint: '想想两个加两个等于几个',
    correctAnswer: 'false',
    emoji: '🤔',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '错误！2 + 2 = 4，不是5',
  },
  {
    id: 'math-judge-2',
    type: 'judge',
    question: '3 + 3 = 6，对吗？',
    hint: '想想三个加三个等于几个',
    correctAnswer: 'true',
    emoji: '🎯',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '正确！3 + 3 = 6',
  },
  {
    id: 'math-judge-3',
    type: 'judge',
    question: '10 - 5 = 6，对吗？',
    hint: '想想十个减去五个等于几个',
    correctAnswer: 'false',
    emoji: '🧮',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '错误！10 - 5 = 5，不是6',
  },
  
  // 比较大小
  {
    id: 'math-compare-1',
    type: 'choice',
    question: '哪个数字更大：3 还是 7？',
    hint: '比较3和7的大小',
    correctAnswer: '7',
    emoji: '⚖️',
    options: [
      { id: '3', content: '3', emoji: '❌' },
      { id: '7', content: '7', emoji: '✅' },
    ],
    explanation: '7比3大，7个苹果比3个苹果多',
  },
  {
    id: 'math-compare-2',
    type: 'choice',
    question: '哪个数字更小：5 还是 9？',
    hint: '比较5和9的大小',
    correctAnswer: '5',
    emoji: '⚖️',
    options: [
      { id: '5', content: '5', emoji: '✅' },
      { id: '9', content: '9', emoji: '❌' },
    ],
    explanation: '5比9小，5个糖果比9个糖果少',
  },
];

// ==========================
// 数学考试配置
// ==========================

export const mathExamConfig: ExamConfig = {
  examId: 'math-exam',
  examName: '数学水平测试',
  examIcon: '🔢',
  themeColor: '#2196F3',
  themeGradient: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
  backPath: '/games/math',
  
  getQuestionPool: (category?: string) => {
    if (!category || category === 'all') {
      return [...mathQuestions];
    }
    return mathQuestions.filter(q => q.id.includes(category));
  },
  
  speakText: (text) => {
    defaultSpeakText(text, 'zh-CN');
  },
};

// ==========================
// 数学考试组件
// ==========================

export default function MathExam() {
  return (
    <ExamSystem
      gameId="math-exam"
      exam={mathExamConfig}
    />
  );
}
