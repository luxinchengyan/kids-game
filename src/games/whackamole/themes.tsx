/**
 * 打地鼠游戏主题配置
 * 包含拼音、数学、英语、汉字等主题的配置
 */

import type { GameThemeConfig, MoleItem } from '../common/WhackAMole';
import { defaultSpeakText, shuffle } from '../common/WhackAMole';

// ==========================
// 拼音主题
// ==========================

const pinyinData = {
  initials: [
    { id: 'b', content: 'b', example: '菠萝', emoji: '🍍' },
    { id: 'p', content: 'p', example: '苹果', emoji: '🍎' },
    { id: 'm', content: 'm', example: '妈妈', emoji: '👩' },
    { id: 'f', content: 'f', example: '飞机', emoji: '✈️' },
    { id: 'd', content: 'd', example: '大象', emoji: '🐘' },
    { id: 't', content: 't', example: '兔子', emoji: '🐰' },
    { id: 'n', content: 'n', example: '奶牛', emoji: '🐄' },
    { id: 'l', content: 'l', example: '老虎', emoji: '🐯' },
    { id: 'g', content: 'g', example: '公鸡', emoji: '🐔' },
    { id: 'k', content: 'k', example: '蝌蚪', emoji: '🐸' },
    { id: 'h', content: 'h', example: '河马', emoji: '🦛' },
  ],
  finals: [
    { id: 'a', content: 'a', example: '啊', emoji: '😮' },
    { id: 'o', content: 'o', example: '哦', emoji: '⭕' },
    { id: 'e', content: 'e', example: '鹅', emoji: '🦢' },
    { id: 'i', content: 'i', example: '衣服', emoji: '👔' },
    { id: 'u', content: 'u', example: '乌龟', emoji: '🐢' },
    { id: 'ai', content: 'ai', example: '阿姨', emoji: '👩' },
    { id: 'ei', content: 'ei', example: '诶', emoji: '🤔' },
  ],
  syllables: [
    { id: 'zhi', content: 'zhi', example: '蜘蛛', emoji: '🕷️' },
    { id: 'chi', content: 'chi', example: '吃饭', emoji: '🍜' },
    { id: 'shi', content: 'shi', example: '狮子', emoji: '🦁' },
    { id: 'ri', content: 'ri', example: '日出', emoji: '🌅' },
    { id: 'zi', content: 'zi', example: '写字', emoji: '✍️' },
  ],
};

export const pinyinTheme: GameThemeConfig = {
  themeId: 'pinyin',
  gameName: '拼音打地鼠',
  gameIcon: '🔨',
  themeColor: '#FF9800',
  themeGradient: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
  backPath: '/games/pinyin',
  
  getDataPool: (poolType?: string) => {
    let pool: MoleItem[] = [];
    if (!poolType || poolType === 'initials') {
      pool = [...pinyinData.initials];
    }
    if (poolType === 'finals') {
      pool = [...pinyinData.finals];
    }
    if (poolType === 'syllables') {
      pool = [...pinyinData.syllables];
    }
    if (poolType === 'mixed') {
      pool = [...pinyinData.initials, ...pinyinData.finals];
    }
    if (poolType === 'all') {
      pool = [...pinyinData.initials, ...pinyinData.finals, ...pinyinData.syllables];
    }
    return pool;
  },
  
  checkAnswer: (selected, target) => selected.id === target.id,
  
  speakText: (text, item) => {
    defaultSpeakText(text, 'zh-CN');
  },
  
  generatePrompt: (target) => `找出 ${target.content}，${target.example}`,
};

// ==========================
// 数学主题
// ==========================

const mathData = {
  numbers: [
    { id: '1', content: '1', example: '一个苹果', emoji: '🍎' },
    { id: '2', content: '2', example: '两只小鸟', emoji: '🐦' },
    { id: '3', content: '3', example: '三朵花', emoji: '🌸' },
    { id: '4', content: '4', example: '四颗星星', emoji: '⭐' },
    { id: '5', content: '5', example: '五条鱼', emoji: '🐟' },
    { id: '6', content: '6', example: '六只小猫', emoji: '🐱' },
    { id: '7', content: '7', example: '七只小鸭', emoji: '🦆' },
    { id: '8', content: '8', example: '八只小兔', emoji: '🐰' },
    { id: '9', content: '9', example: '九个气球', emoji: '🎈' },
    { id: '10', content: '10', example: '十颗糖果', emoji: '🍬' },
  ],
  additions: [
    { id: '1+1=2', content: '1+1=2', example: '一个加一个等于两个', emoji: '✅' },
    { id: '2+1=3', content: '2+1=3', example: '两个加一个等于三个', emoji: '✅' },
    { id: '3+2=5', content: '3+2=5', example: '三个加两个等于五个', emoji: '✅' },
    { id: '4+1=5', content: '4+1=5', example: '四个加一个等于五个', emoji: '✅' },
    { id: '5+3=8', content: '5+3=8', example: '五个加三个等于八个', emoji: '✅' },
  ],
  shapes: [
    { id: 'circle', content: '圆形', example: '像太阳', emoji: '⭕' },
    { id: 'square', content: '正方形', example: '像盒子', emoji: '⬜' },
    { id: 'triangle', content: '三角形', example: '像小山', emoji: '🔺' },
    { id: 'star', content: '星形', example: '像星星', emoji: '⭐' },
    { id: 'heart', content: '心形', example: '像爱心', emoji: '❤️' },
  ],
};

export const mathTheme: GameThemeConfig = {
  themeId: 'math',
  gameName: '数学打地鼠',
  gameIcon: '🔢',
  themeColor: '#2196F3',
  themeGradient: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
  backPath: '/games/math',
  
  getDataPool: (poolType?: string) => {
    let pool: MoleItem[] = [];
    if (!poolType || poolType === 'numbers') {
      pool = [...mathData.numbers];
    }
    if (poolType === 'additions') {
      pool = [...mathData.additions];
    }
    if (poolType === 'shapes') {
      pool = [...mathData.shapes];
    }
    if (poolType === 'mixed') {
      pool = [...mathData.numbers, ...mathData.shapes];
    }
    return pool;
  },
  
  checkAnswer: (selected, target) => selected.id === target.id,
  
  speakText: (text, item) => {
    defaultSpeakText(text, 'zh-CN');
  },
  
  generatePrompt: (target) => `找出 ${target.content}，${target.example}`,
};

// ==========================
// 英语主题
// ==========================

const englishData = {
  animals: [
    { id: 'cat', content: 'Cat', example: '猫', emoji: '🐱' },
    { id: 'dog', content: 'Dog', example: '狗', emoji: '🐶' },
    { id: 'bird', content: 'Bird', example: '鸟', emoji: '🐦' },
    { id: 'fish', content: 'Fish', example: '鱼', emoji: '🐟' },
    { id: 'rabbit', content: 'Rabbit', example: '兔子', emoji: '🐰' },
    { id: 'duck', content: 'Duck', example: '鸭子', emoji: '🦆' },
  ],
  colors: [
    { id: 'red', content: 'Red', example: '红色', emoji: '🔴' },
    { id: 'blue', content: 'Blue', example: '蓝色', emoji: '🔵' },
    { id: 'green', content: 'Green', example: '绿色', emoji: '🟢' },
    { id: 'yellow', content: 'Yellow', example: '黄色', emoji: '🟡' },
    { id: 'orange', content: 'Orange', example: '橙色', emoji: '🟠' },
  ],
  fruits: [
    { id: 'apple', content: 'Apple', example: '苹果', emoji: '🍎' },
    { id: 'banana', content: 'Banana', example: '香蕉', emoji: '🍌' },
    { id: 'orange', content: 'Orange', example: '橙子', emoji: '🍊' },
    { id: 'grape', content: 'Grape', example: '葡萄', emoji: '🍇' },
    { id: 'strawberry', content: 'Strawberry', example: '草莓', emoji: '🍓' },
  ],
  numbers: [
    { id: 'one', content: 'One', example: '一', emoji: '1️⃣' },
    { id: 'two', content: 'Two', example: '二', emoji: '2️⃣' },
    { id: 'three', content: 'Three', example: '三', emoji: '3️⃣' },
    { id: 'four', content: 'Four', example: '四', emoji: '4️⃣' },
    { id: 'five', content: 'Five', example: '五', emoji: '5️⃣' },
  ],
};

export const englishTheme: GameThemeConfig = {
  themeId: 'english',
  gameName: '英语打地鼠',
  gameIcon: '🌍',
  themeColor: '#4CAF50',
  themeGradient: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
  backPath: '/games/english',
  
  getDataPool: (poolType?: string) => {
    let pool: MoleItem[] = [];
    if (!poolType || poolType === 'animals') {
      pool = [...englishData.animals];
    }
    if (poolType === 'colors') {
      pool = [...englishData.colors];
    }
    if (poolType === 'fruits') {
      pool = [...englishData.fruits];
    }
    if (poolType === 'numbers') {
      pool = [...englishData.numbers];
    }
    if (poolType === 'mixed') {
      pool = [...englishData.animals, ...englishData.fruits];
    }
    return pool;
  },
  
  checkAnswer: (selected, target) => selected.id === target.id,
  
  speakText: (text, item) => {
    // 英语单词用英语发音
    if (item && englishData.animals.find(a => a.id === item.id)) {
      defaultSpeakText(item.content, 'en-US');
    } else {
      defaultSpeakText(text, 'zh-CN');
    }
  },
  
  generatePrompt: (target) => `Find ${target.content}! ${target.example}`,
};

// ==========================
// 汉字主题
// ==========================

const chineseData = {
  basic: [
    { id: '人', content: '人', example: '一个人', emoji: '👤' },
    { id: '口', content: '口', example: '一张口', emoji: '👄' },
    { id: '日', content: '日', example: '太阳', emoji: '☀️' },
    { id: '月', content: '月', example: '月亮', emoji: '🌙' },
    { id: '水', content: '水', example: '喝水', emoji: '💧' },
    { id: '火', content: '火', example: '着火', emoji: '🔥' },
    { id: '山', content: '山', example: '大山', emoji: '⛰️' },
    { id: '石', content: '石', example: '石头', emoji: '🪨' },
  ],
  numbers: [
    { id: '一', content: '一', example: '一个', emoji: '1️⃣' },
    { id: '二', content: '二', example: '两个', emoji: '2️⃣' },
    { id: '三', content: '三', example: '三个', emoji: '3️⃣' },
    { id: '四', content: '四', example: '四个', emoji: '4️⃣' },
    { id: '五', content: '五', example: '五个', emoji: '5️⃣' },
    { id: '六', content: '六', example: '六个', emoji: '6️⃣' },
    { id: '七', content: '七', example: '七个', emoji: '7️⃣' },
    { id: '八', content: '八', example: '八个', emoji: '8️⃣' },
    { id: '九', content: '九', example: '九个', emoji: '9️⃣' },
    { id: '十', content: '十', example: '十个', emoji: '🔟' },
  ],
  nature: [
    { id: '天', content: '天', example: '天空', emoji: '🌤️' },
    { id: '地', content: '地', example: '大地', emoji: '🌍' },
    { id: '花', content: '花', example: '花朵', emoji: '🌸' },
    { id: '树', content: '树', example: '大树', emoji: '🌳' },
    { id: '云', content: '云', example: '白云', emoji: '☁️' },
    { id: '雨', content: '雨', example: '下雨', emoji: '🌧️' },
  ],
};

export const chineseTheme: GameThemeConfig = {
  themeId: 'chinese',
  gameName: '汉字打地鼠',
  gameIcon: '📝',
  themeColor: '#9C27B0',
  themeGradient: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
  backPath: '/games/stories',
  
  getDataPool: (poolType?: string) => {
    let pool: MoleItem[] = [];
    if (!poolType || poolType === 'basic') {
      pool = [...chineseData.basic];
    }
    if (poolType === 'numbers') {
      pool = [...chineseData.numbers];
    }
    if (poolType === 'nature') {
      pool = [...chineseData.nature];
    }
    if (poolType === 'mixed') {
      pool = [...chineseData.basic, ...chineseData.nature];
    }
    return pool;
  },
  
  checkAnswer: (selected, target) => selected.id === target.id,
  
  speakText: (text, item) => {
    defaultSpeakText(text, 'zh-CN');
  },
  
  generatePrompt: (target) => `找出汉字"${target.content}"，${target.example}`,
  
  // 自定义渲染：放大汉字显示
  renderMoleContent: (item) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '56px', marginBottom: '4px' }}>{item.emoji}</div>
      <div
        style={{
          fontSize: '36px',
          fontWeight: 900,
          color: '#FFFFFF',
          background: 'rgba(0,0,0,0.6)',
          padding: '4px 16px',
          borderRadius: '12px',
        }}
      >
        {item.content}
      </div>
    </div>
  ),
};

// ==========================
// 导出所有主题
// ==========================

export const whackAMoleThemes = {
  pinyin: pinyinTheme,
  math: mathTheme,
  english: englishTheme,
  chinese: chineseTheme,
};

export type WhackAMoleThemeId = keyof typeof whackAMoleThemes;
