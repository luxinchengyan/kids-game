/**
 * 拼音学习核心数据
 * 声母、韵母、整体认读音节及相关例字
 */

export interface PinyinItem {
  pinyin: string;
  hanzi: string;
  emoji: string;
  tip?: string;
}

// ── 23 个声母 ────────────────────────────────────────────────
export const INITIALS: PinyinItem[] = [
  { pinyin: 'b', hanzi: '波', emoji: '🌊', tip: '嘴唇合上爆开' },
  { pinyin: 'p', hanzi: '坡', emoji: '⛰️', tip: '送气的b' },
  { pinyin: 'm', hanzi: '摸', emoji: '🤚', tip: '嘴唇合上鼻音' },
  { pinyin: 'f', hanzi: '佛', emoji: '🕯️', tip: '上齿咬下唇' },
  { pinyin: 'd', hanzi: '得', emoji: '👍', tip: '舌尖顶上齿' },
  { pinyin: 't', hanzi: '特', emoji: '🎯', tip: '送气的d' },
  { pinyin: 'n', hanzi: '呢', emoji: '🤔', tip: '舌尖鼻音' },
  { pinyin: 'l', hanzi: '乐', emoji: '🎵', tip: '舌尖侧音' },
  { pinyin: 'g', hanzi: '哥', emoji: '👨', tip: '舌根音' },
  { pinyin: 'k', hanzi: '科', emoji: '🔬', tip: '送气的g' },
  { pinyin: 'h', hanzi: '喝', emoji: '☕', tip: '喉咙发音' },
  { pinyin: 'j', hanzi: '鸡', emoji: '🐔', tip: '舌面前音' },
  { pinyin: 'q', hanzi: '七', emoji: '7️⃣', tip: '送气的j' },
  { pinyin: 'x', hanzi: '西', emoji: '🧭', tip: '舌面擦音' },
  { pinyin: 'zh', hanzi: '知', emoji: '🦊', tip: '卷舌音' },
  { pinyin: 'ch', hanzi: '吃', emoji: '🍜', tip: '送气卷舌音' },
  { pinyin: 'sh', hanzi: '师', emoji: '👩‍🏫', tip: '卷舌擦音' },
  { pinyin: 'r', hanzi: '日', emoji: '☀️', tip: '卷舌浊擦音' },
  { pinyin: 'z', hanzi: '资', emoji: '💰', tip: '舌尖前音' },
  { pinyin: 'c', hanzi: '次', emoji: '🔢', tip: '送气z' },
  { pinyin: 's', hanzi: '思', emoji: '💭', tip: '舌尖前擦音' },
  { pinyin: 'y', hanzi: '衣', emoji: '👕', tip: '零声母y' },
  { pinyin: 'w', hanzi: '乌', emoji: '🐦‍⬛', tip: '零声母w' },
];

// ── 6 个单韵母 ───────────────────────────────────────────────
export const SIMPLE_FINALS: PinyinItem[] = [
  { pinyin: 'a', hanzi: '啊', emoji: '😮', tip: '嘴巴张大' },
  { pinyin: 'o', hanzi: '哦', emoji: '😯', tip: '嘴唇圆' },
  { pinyin: 'e', hanzi: '鹅', emoji: '🦢', tip: '半开口' },
  { pinyin: 'i', hanzi: '衣', emoji: '👗', tip: '嘴巴扁' },
  { pinyin: 'u', hanzi: '乌', emoji: '🦅', tip: '嘴唇前圆' },
  { pinyin: 'ü', hanzi: '鱼', emoji: '🐟', tip: '小嘴唇圆' },
];

// ── 复韵母 ───────────────────────────────────────────────────
export const COMPOUND_FINALS: PinyinItem[] = [
  { pinyin: 'ai', hanzi: '爱', emoji: '❤️' },
  { pinyin: 'ei', hanzi: '诶', emoji: '👋' },
  { pinyin: 'ui', hanzi: '围', emoji: '🔄' },
  { pinyin: 'ao', hanzi: '熬', emoji: '🌙' },
  { pinyin: 'ou', hanzi: '欧', emoji: '🌍' },
  { pinyin: 'iu', hanzi: '优', emoji: '🏆' },
  { pinyin: 'ie', hanzi: '耶', emoji: '🎉' },
  { pinyin: 'üe', hanzi: '约', emoji: '📅' },
  { pinyin: 'er', hanzi: '儿', emoji: '👶' },
];

// ── 鼻韵母 ───────────────────────────────────────────────────
export const NASAL_FINALS: PinyinItem[] = [
  { pinyin: 'an', hanzi: '安', emoji: '🏠' },
  { pinyin: 'en', hanzi: '恩', emoji: '🙏' },
  { pinyin: 'in', hanzi: '因', emoji: '🌿' },
  { pinyin: 'un', hanzi: '温', emoji: '🌡️' },
  { pinyin: 'ün', hanzi: '晕', emoji: '😵' },
  { pinyin: 'ang', hanzi: '昂', emoji: '🦁' },
  { pinyin: 'eng', hanzi: '亨', emoji: '🎶' },
  { pinyin: 'ing', hanzi: '英', emoji: '🇬🇧' },
  { pinyin: 'ong', hanzi: '翁', emoji: '👴' },
];

export const ALL_FINALS: PinyinItem[] = [
  ...SIMPLE_FINALS,
  ...COMPOUND_FINALS,
  ...NASAL_FINALS,
];

// ── 16 个整体认读音节 ────────────────────────────────────────
export const WHOLE_SYLLABLES: PinyinItem[] = [
  { pinyin: 'zhi', hanzi: '知', emoji: '🧠', tip: '卷舌，不加韵母' },
  { pinyin: 'chi', hanzi: '吃', emoji: '🍽️', tip: '送气卷舌' },
  { pinyin: 'shi', hanzi: '师', emoji: '👩‍🏫', tip: '卷舌擦音' },
  { pinyin: 'ri', hanzi: '日', emoji: '☀️', tip: '浊卷舌' },
  { pinyin: 'zi', hanzi: '字', emoji: '🔤', tip: '不卷舌' },
  { pinyin: 'ci', hanzi: '次', emoji: '🔢', tip: '送气z' },
  { pinyin: 'si', hanzi: '四', emoji: '4️⃣', tip: '舌尖前擦' },
  { pinyin: 'yi', hanzi: '衣', emoji: '👕', tip: 'i独用加y' },
  { pinyin: 'wu', hanzi: '乌', emoji: '🦅', tip: 'u独用加w' },
  { pinyin: 'yu', hanzi: '鱼', emoji: '🐠', tip: 'ü独用写yu' },
  { pinyin: 'ye', hanzi: '夜', emoji: '🌃', tip: 'ie开头用y' },
  { pinyin: 'yue', hanzi: '月', emoji: '🌙', tip: 'üe开头用yu' },
  { pinyin: 'yuan', hanzi: '元', emoji: '💴', tip: 'üan开头用yu' },
  { pinyin: 'yin', hanzi: '因', emoji: '🌿', tip: 'in开头用y' },
  { pinyin: 'yun', hanzi: '云', emoji: '☁️', tip: 'ün开头用yu' },
  { pinyin: 'ying', hanzi: '英', emoji: '🏅', tip: 'ing开头用y' },
];

// 所有韵母（单+复+鼻）的分组标签
export const FINAL_GROUPS = [
  { label: '单韵母', items: SIMPLE_FINALS },
  { label: '复韵母', items: COMPOUND_FINALS },
  { label: '鼻韵母', items: NASAL_FINALS },
];

// 声母分组（按发音部位）
export const INITIAL_GROUPS = [
  { label: '双唇音', items: INITIALS.slice(0, 4) },   // b p m f
  { label: '舌尖音', items: INITIALS.slice(4, 8) },   // d t n l
  { label: '舌根音', items: INITIALS.slice(8, 11) },  // g k h
  { label: '舌面音', items: INITIALS.slice(11, 14) }, // j q x
  { label: '卷舌音', items: INITIALS.slice(14, 18) }, // zh ch sh r
  { label: '舌尖前音', items: INITIALS.slice(18, 21) }, // z c s
  { label: '零声母', items: INITIALS.slice(21) },     // y w
];
