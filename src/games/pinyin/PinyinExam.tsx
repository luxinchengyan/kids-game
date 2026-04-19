/**
 * 拼音考试
 * 使用通用考试系统框架
 */

import { ExamSystem, ExamConfig, Question } from '../common/ExamSystem';
import { defaultSpeakText } from '../common/WhackAMole';

// ==========================
// 拼音题库
// ==========================

const pinyinQuestions: Question[] = [
  // 声母题目
  {
    id: 'pinyin-shengmu-1',
    type: 'choice',
    question: '下面哪个是"菠萝"的声母？',
    hint: '菠萝（bō luó）',
    correctAnswer: 'b',
    emoji: '🍍',
    options: [
      { id: 'b', content: 'b', emoji: '✅' },
      { id: 'p', content: 'p', emoji: '❌' },
      { id: 'm', content: 'm', emoji: '❌' },
      { id: 'f', content: 'f', emoji: '❌' },
    ],
    explanation: '菠萝的拼音是"bō luó"，声母是"b"',
  },
  {
    id: 'pinyin-shengmu-2',
    type: 'choice',
    question: '找出"苹果"的声母',
    hint: '苹果（píng guǒ）',
    correctAnswer: 'p',
    emoji: '🍎',
    options: [
      { id: 'p', content: 'p', emoji: '✅' },
      { id: 'b', content: 'b', emoji: '❌' },
      { id: 'm', content: 'm', emoji: '❌' },
      { id: 'f', content: 'f', emoji: '❌' },
    ],
    explanation: '苹果的拼音是"píng guǒ"，声母是"p"',
  },
  {
    id: 'pinyin-shengmu-3',
    type: 'choice',
    question: '"妈妈"的第一个拼音是什么？',
    hint: '妈妈（mā ma）',
    correctAnswer: 'm',
    emoji: '👩',
    options: [
      { id: 'm', content: 'm', emoji: '✅' },
      { id: 'n', content: 'n', emoji: '❌' },
      { id: 'l', content: 'l', emoji: '❌' },
      { id: 'f', content: 'f', emoji: '❌' },
    ],
    explanation: '妈妈的拼音是"mā ma"，第一个声母是"m"',
  },
  
  // 韵母题目
  {
    id: 'pinyin-yunmu-1',
    type: 'choice',
    question: '"啊"的韵母是哪个？',
    hint: '啊（ā）',
    correctAnswer: 'a',
    emoji: '😮',
    options: [
      { id: 'a', content: 'a', emoji: '✅' },
      { id: 'o', content: 'o', emoji: '❌' },
      { id: 'e', content: 'e', emoji: '❌' },
      { id: 'i', content: 'i', emoji: '❌' },
    ],
    explanation: '啊的拼音是"ā"，韵母是"a"',
  },
  {
    id: 'pinyin-yunmu-2',
    type: 'choice',
    question: '"鹅"的韵母是哪个？',
    hint: '鹅（é）',
    correctAnswer: 'e',
    emoji: '🦢',
    options: [
      { id: 'e', content: 'e', emoji: '✅' },
      { id: 'a', content: 'a', emoji: '❌' },
      { id: 'o', content: 'o', emoji: '❌' },
      { id: 'i', content: 'i', emoji: '❌' },
    ],
    explanation: '鹅的拼音是"é"，韵母是"e"',
  },
  {
    id: 'pinyin-yunmu-3',
    type: 'choice',
    question: '找出"阿姨"的韵母',
    hint: '阿姨（ā yí）',
    correctAnswer: 'ai',
    emoji: '👩',
    options: [
      { id: 'ai', content: 'ai', emoji: '✅' },
      { id: 'ei', content: 'ei', emoji: '❌' },
      { id: 'ui', content: 'ui', emoji: '❌' },
      { id: 'ao', content: 'ao', emoji: '❌' },
    ],
    explanation: '阿姨的拼音是"ā yí"，第一个韵母是"ai"',
  },
  
  // 整体认读音节
  {
    id: 'pinyin-zhengti-1',
    type: 'choice',
    question: '"蜘蛛"的拼音是什么？',
    hint: '蜘（zhī）蛛（zhū）',
    correctAnswer: 'zhi',
    emoji: '🕷️',
    options: [
      { id: 'zhi', content: 'zhi', emoji: '✅' },
      { id: 'chi', content: 'chi', emoji: '❌' },
      { id: 'shi', content: 'shi', emoji: '❌' },
      { id: 'ri', content: 'ri', emoji: '❌' },
    ],
    explanation: '蜘蛛的拼音是"zhī zhū"，声母是"zh"',
  },
  {
    id: 'pinyin-zhengti-2',
    type: 'choice',
    question: '"狮子"的拼音是什么？',
    hint: '狮（shī）子（zi）',
    correctAnswer: 'shi',
    emoji: '🦁',
    options: [
      { id: 'shi', content: 'shi', emoji: '✅' },
      { id: 'chi', content: 'chi', emoji: '❌' },
      { id: 'zhi', content: 'zhi', emoji: '❌' },
      { id: 'ri', content: 'ri', emoji: '❌' },
    ],
    explanation: '狮子的拼音是"shī zi"，声母是"sh"',
  },
  
  // 判断题
  {
    id: 'pinyin-judge-1',
    type: 'judge',
    question: '"飞机"的拼音是"fēi jī"，对吗？',
    hint: '想想飞机的发音',
    correctAnswer: 'true',
    emoji: '✈️',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '正确！飞机的拼音就是"fēi jī"',
  },
  {
    id: 'pinyin-judge-2',
    type: 'judge',
    question: '"兔子"的拼音是"tù zi"，对吗？',
    hint: '想想兔子的发音',
    correctAnswer: 'true',
    emoji: '🐰',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '正确！兔子的拼音就是"tù zi"',
  },
  {
    id: 'pinyin-judge-3',
    type: 'judge',
    question: '"大象"的拼音是"diàn xiàng"，对吗？',
    hint: '想想大象的发音',
    correctAnswer: 'false',
    emoji: '🐘',
    options: [
      { id: 'true', content: '对 ✓', emoji: '✅' },
      { id: 'false', content: '错 ✗', emoji: '❌' },
    ],
    explanation: '错误！大象的拼音是"dà xiàng"，不是"diàn xiàng"',
  },
  
  // 更多选择题
  {
    id: 'pinyin-choice-1',
    type: 'choice',
    question: '"老虎"的拼音是什么？',
    hint: '想想老虎怎么读',
    correctAnswer: 'l',
    emoji: '🐯',
    options: [
      { id: 'l', content: 'l', emoji: '✅' },
      { id: 'n', content: 'n', emoji: '❌' },
      { id: 'r', content: 'r', emoji: '❌' },
      { id: 'd', content: 'd', emoji: '❌' },
    ],
    explanation: '老虎的拼音是"lǎo hǔ"，声母是"l"',
  },
  {
    id: 'pinyin-choice-2',
    type: 'choice',
    question: '"河马"的声母是什么？',
    hint: '河马（hé mǎ）',
    correctAnswer: 'h',
    emoji: '🦛',
    options: [
      { id: 'h', content: 'h', emoji: '✅' },
      { id: 'k', content: 'k', emoji: '❌' },
      { id: 'g', content: 'g', emoji: '❌' },
      { id: 'f', content: 'f', emoji: '❌' },
    ],
    explanation: '河马的拼音是"hé mǎ"，声母是"h"',
  },
];

// ==========================
// 拼音考试配置
// ==========================

export const pinyinExamConfig: ExamConfig = {
  examId: 'pinyin-exam',
  examName: '拼音水平测试',
  examIcon: '📝',
  themeColor: '#FF9800',
  themeGradient: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
  backPath: '/games/pinyin',
  
  getQuestionPool: (category?: string) => {
    if (!category || category === 'all') {
      return [...pinyinQuestions];
    }
    return pinyinQuestions.filter(q => q.id.includes(category));
  },
  
  speakText: (text) => {
    defaultSpeakText(text, 'zh-CN');
  },
};

// ==========================
// 拼音考试组件
// ==========================

export default function PinyinExam() {
  return (
    <ExamSystem
      gameId="pinyin-exam"
      exam={pinyinExamConfig}
    />
  );
}
