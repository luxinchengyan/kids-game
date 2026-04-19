/**
 * 英语考试
 * 使用通用考试系统框架
 */

import { ExamSystem, ExamConfig, Question } from '../common/ExamSystem';
import { defaultSpeakText } from '../common/WhackAMole';

// ==========================
// 英语题库
// ==========================

const englishQuestions: Question[] = [
  // 动物词汇
  {
    id: 'english-animal-1',
    type: 'choice',
    question: '"Cat"是什么意思？',
    hint: '想想猫咪怎么叫',
    correctAnswer: '猫',
    emoji: '🐱',
    options: [
      { id: '猫', content: '猫', emoji: '🐱' },
      { id: '狗', content: '狗', emoji: '🐶' },
      { id: '鸟', content: '鸟', emoji: '🐦' },
      { id: '鱼', content: '鱼', emoji: '🐟' },
    ],
    explanation: 'Cat = 猫，喵喵叫的小动物',
  },
  {
    id: 'english-animal-2',
    type: 'choice',
    question: '下面哪个是"狗"的英语？',
    hint: '狗狗会汪汪叫',
    correctAnswer: 'Dog',
    emoji: '🐶',
    options: [
      { id: 'Cat', content: 'Cat', emoji: '🐱' },
      { id: 'Dog', content: 'Dog', emoji: '🐶' },
      { id: 'Bird', content: 'Bird', emoji: '🐦' },
      { id: 'Fish', content: 'Fish', emoji: '🐟' },
    ],
    explanation: 'Dog = 狗，汪汪叫的动物',
  },
  {
    id: 'english-animal-3',
    type: 'choice',
    question: '"Bird"是什么动物？',
    hint: '鸟会飞',
    correctAnswer: '鸟',
    emoji: '🐦',
    options: [
      { id: '猫', content: '猫', emoji: '🐱' },
      { id: '狗', content: '狗', emoji: '🐶' },
      { id: '鸟', content: '鸟', emoji: '🐦' },
      { id: '兔子', content: '兔子', emoji: '🐰' },
    ],
    explanation: 'Bird = 鸟，会在天上飞',
  },
  
  // 水果词汇
  {
    id: 'english-fruit-1',
    type: 'choice',
    question: '"Apple"是什么水果？',
    hint: '红红的、圆圆的水果',
    correctAnswer: '苹果',
    emoji: '🍎',
    options: [
      { id: '苹果', content: '苹果', emoji: '🍎' },
      { id: '香蕉', content: '香蕉', emoji: '🍌' },
      { id: '橙子', content: '橙子', emoji: '🍊' },
      { id: '葡萄', content: '葡萄', emoji: '🍇' },
    ],
    explanation: 'Apple = 苹果，红红的很好吃',
  },
  {
    id: 'english-fruit-2',
    type: 'choice',
    question: '下面哪个是"香蕉"的英语？',
    hint: '长长的、黄黄的水果',
    correctAnswer: 'Banana',
    emoji: '🍌',
    options: [
      { id: 'Apple', content: 'Apple', emoji: '🍎' },
      { id: 'Banana', content: 'Banana', emoji: '🍌' },
      { id: 'Orange', content: 'Orange', emoji: '🍊' },
      { id: 'Grape', content: 'Grape', emoji: '🍇' },
    ],
    explanation: 'Banana = 香蕉，长长的黄色水果',
  },
  
  // 颜色词汇
  {
    id: 'english-color-1',
    type: 'choice',
    question: '"Red"是什么颜色？',
    hint: '像苹果一样的颜色',
    correctAnswer: '红色',
    emoji: '🔴',
    options: [
      { id: '红色', content: '红色', emoji: '🔴' },
      { id: '蓝色', content: '蓝色', emoji: '🔵' },
      { id: '绿色', content: '绿色', emoji: '🟢' },
      { id: '黄色', content: '黄色', emoji: '🟡' },
    ],
    explanation: 'Red = 红色，像苹果、像太阳',
  },
  {
    id: 'english-color-2',
    type: 'choice',
    question: '下面哪个是"蓝色"的英语？',
    hint: '像天空一样的颜色',
    correctAnswer: 'Blue',
    emoji: '🔵',
    options: [
      { id: 'Red', content: 'Red', emoji: '🔴' },
      { id: 'Blue', content: 'Blue', emoji: '🔵' },
      { id: 'Green', content: 'Green', emoji: '🟢' },
      { id: 'Yellow', content: 'Yellow', emoji: '🟡' },
    ],
    explanation: 'Blue = 蓝色，像天空、像大海',
  },
  
  // 数字词汇
  {
    id: 'english-number-1',
    type: 'choice',
    question: '"One"是数字几？',
    hint: '最小的数字',
    correctAnswer: '1',
    emoji: '1️⃣',
    options: [
      { id: '1', content: '1', emoji: '1️⃣' },
      { id: '2', content: '2', emoji: '2️⃣' },
      { id: '3', content: '3', emoji: '3️⃣' },
      { id: '4', content: '4', emoji: '4️⃣' },
    ],
    explanation: 'One = 1，第一个数字',
  },
  {
    id: 'english-number-2',
    type: 'choice',
    question: '下面哪个是"三"的英语？',
    hint: '1, 2, 3',
    correctAnswer: 'Three',
    emoji: '3️⃣',
    options: [
      { id: 'One', content: 'One', emoji: '1️⃣' },
      { id: 'Two', content: 'Two', emoji: '2️⃣' },
      { id: 'Three', content: 'Three', emoji: '3️⃣' },
      { id: 'Four', content: 'Four', emoji: '4️⃣' },
    ],
    explanation: 'Three = 三，1-2-3',
  },
  
  // 判断题
  {
    id: 'english-judge-1',
    type: 'judge',
    question: '"Fish"是"鱼"的意思，对吗？',
    hint: 'Fish在水里游',
    correctAnswer: 'true',
    emoji: '🐟',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '正确！Fish = 鱼，在水里游来游去',
  },
  {
    id: 'english-judge-2',
    type: 'judge',
    question: '"Orange"只是水果的意思，对吗？',
    hint: 'Orange有两种意思',
    correctAnswer: 'false',
    emoji: '🍊',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '错误！Orange既是"橙子"（水果），也是"橙色"（颜色）',
  },
  
  // 配对题（通过选择题实现）
  {
    id: 'english-match-1',
    type: 'choice',
    question: '"Rabbit"是什么动物？',
    hint: '蹦蹦跳跳、爱吃胡萝卜',
    correctAnswer: '兔子',
    emoji: '🐰',
    options: [
      { id: '兔子', content: '兔子', emoji: '🐰' },
      { id: '鸭子', content: '鸭子', emoji: '🦆' },
      { id: '猫', content: '猫', emoji: '🐱' },
      { id: '狗', content: '狗', emoji: '🐶' },
    ],
    explanation: 'Rabbit = 兔子，蹦蹦跳跳很可爱',
  },
  {
    id: 'english-match-2',
    type: 'choice',
    question: '下面哪个是"草莓"的英语？',
    hint: '红红的、甜甜的水果',
    correctAnswer: 'Strawberry',
    emoji: '🍓',
    options: [
      { id: 'Apple', content: 'Apple', emoji: '🍎' },
      { id: 'Strawberry', content: 'Strawberry', emoji: '🍓' },
      { id: 'Banana', content: 'Banana', emoji: '🍌' },
      { id: 'Grape', content: 'Grape', emoji: '🍇' },
    ],
    explanation: 'Strawberry = 草莓，红红的很甜',
  },
];

// ==========================
// 英语考试配置
// ==========================

export const englishExamConfig: ExamConfig = {
  examId: 'english-exam',
  examName: '英语水平测试',
  examIcon: '🌍',
  themeColor: '#4CAF50',
  themeGradient: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
  backPath: '/games/english',
  
  getQuestionPool: (category?: string) => {
    if (!category || category === 'all') {
      return [...englishQuestions];
    }
    return englishQuestions.filter(q => q.id.includes(category));
  },
  
  speakText: (text) => {
    // 尝试用英语发音（如果包含英文单词）
    const hasEnglish = /[A-Z][a-z]+/.test(text);
    const lang = hasEnglish ? 'en-US' : 'zh-CN';
    defaultSpeakText(text, lang);
  },
};

// ==========================
// 英语考试组件
// ==========================

export default function EnglishExam() {
  return (
    <ExamSystem
      gameId="english-exam"
      exam={englishExamConfig}
    />
  );
}
