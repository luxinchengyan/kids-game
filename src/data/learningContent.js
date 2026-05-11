const companionCatalog = {
  aisha: {
    zh: { name: '艾莎', emoji: '❄️', tone: '温柔鼓励', color: '#B3E5FC' }
  },
  rocky: {
    zh: { name: '罗奇', emoji: '🐶', tone: '勇敢支持', color: '#DCEDC8' }
  },
  peppa: {
    zh: { name: '佩奇', emoji: '🐷', tone: '趣味社交', color: '#F8BBD0' }
  },
  marshall: {
    zh: { name: '毛毛', emoji: '🚒', tone: '热血活力', color: '#FFCDD2' }
  },
  star: {
    zh: { name: '星星姐姐', emoji: '✨', tone: '温柔鼓励', color: '#FFF9C4' }
  }
}

const fullPinyinData = {
  initials: [
    { id: 'pinyin_b', content: 'b', mnemonic: 'bō', example: '菠萝', emoji: '🍍', confusionSet: ['p', 'd'] },
    { id: 'pinyin_p', content: 'p', mnemonic: 'pō', example: '苹果', emoji: '🍎', confusionSet: ['b', 'f'] },
    { id: 'pinyin_m', content: 'm', mnemonic: 'mō', example: '妈妈', emoji: '👩', confusionSet: ['n', 'f'] },
    { id: 'pinyin_f', content: 'f', mnemonic: 'fó', example: '飞机', emoji: '✈️', confusionSet: ['h', 'p'] },
    { id: 'pinyin_d', content: 'd', mnemonic: 'dē', example: '大象', emoji: '🐘', confusionSet: ['t', 'b'] },
    { id: 'pinyin_t', content: 't', mnemonic: 'tē', example: '兔子', emoji: '🐰', confusionSet: ['d', 'p'] },
    { id: 'pinyin_n', content: 'n', mnemonic: 'nē', example: '奶牛', emoji: '🐄', confusionSet: ['l', 'm'] },
    { id: 'pinyin_l', content: 'l', mnemonic: 'lē', example: '老虎', emoji: '🐯', confusionSet: ['n', 'r'] },
    { id: 'pinyin_g', content: 'g', mnemonic: 'gē', example: '公鸡', emoji: '🐔', confusionSet: ['k', 'h'] },
    { id: 'pinyin_k', content: 'k', mnemonic: 'kē', example: '蝌蚪', emoji: '🐸', confusionSet: ['g', 'h'] },
    { id: 'pinyin_h', content: 'h', mnemonic: 'hē', example: '河马', emoji: '🦛', confusionSet: ['g', 'f'] },
    { id: 'pinyin_j', content: 'j', mnemonic: 'jī', example: '小鸡', emoji: '🐣', confusionSet: ['q', 'x'] },
    { id: 'pinyin_q', content: 'q', mnemonic: 'qī', example: '气球', emoji: '🎈', confusionSet: ['j', 'x'] },
    { id: 'pinyin_x', content: 'x', mnemonic: 'xī', example: '西瓜', emoji: '🍉', confusionSet: ['j', 'q'] },
    { id: 'pinyin_zh', content: 'zh', mnemonic: 'zhī', example: '蜘蛛', emoji: '🕷️', confusionSet: ['z', 'ch'] },
    { id: 'pinyin_ch', content: 'ch', mnemonic: 'chī', example: '吃饭', emoji: '🍚', confusionSet: ['c', 'zh'] },
    { id: 'pinyin_sh', content: 'sh', mnemonic: 'shī', example: '狮子', emoji: '🦁', confusionSet: ['s', 'r'] },
    { id: 'pinyin_r', content: 'r', mnemonic: 'rì', example: '日出', emoji: '🌅', confusionSet: ['sh'] },
    { id: 'pinyin_z', content: 'z', mnemonic: 'zī', example: '写字', emoji: '✏️', confusionSet: ['zh', 'c'] },
    { id: 'pinyin_c', content: 'c', mnemonic: 'cī', example: '刺', emoji: '🦔', confusionSet: ['ch', 'z'] },
    { id: 'pinyin_s', content: 's', mnemonic: 'sī', example: '蚕丝', emoji: '🧵', confusionSet: ['sh', 'c'] },
    { id: 'pinyin_y', content: 'y', mnemonic: 'yī', example: '衣服', emoji: '👔', confusionSet: ['w', 'i'] },
    { id: 'pinyin_w', content: 'w', mnemonic: 'wū', example: '乌鸦', emoji: '🐦', confusionSet: ['y', 'u'] }
  ],
  finals: [
    { id: 'pinyin_a', content: 'a', mnemonic: 'ā', example: '啊', emoji: '😮', confusionSet: ['o', 'e'] },
    { id: 'pinyin_o', content: 'o', mnemonic: 'ō', example: '哦', emoji: '⭕', confusionSet: ['e', 'u'] },
    { id: 'pinyin_e', content: 'e', mnemonic: 'ē', example: '鹅', emoji: '🦢', confusionSet: ['o', 'a'] },
    { id: 'pinyin_i', content: 'i', mnemonic: 'ī', example: '衣服', emoji: '👔', confusionSet: ['ü', 'u'] },
    { id: 'pinyin_u', content: 'u', mnemonic: 'ū', example: '乌龟', emoji: '🐢', confusionSet: ['ü', 'o'] },
    { id: 'pinyin_v', content: 'ü', mnemonic: 'ǖ', example: '鱼', emoji: '🐟', confusionSet: ['u', 'i'] },
    { id: 'pinyin_ai', content: 'ai', mnemonic: 'āi', example: '阿姨', emoji: '👩', confusionSet: ['ei', 'ao'] },
    { id: 'pinyin_ei', content: 'ei', mnemonic: 'ēi', example: '诶', emoji: '🤔', confusionSet: ['ai', 'ui'] },
    { id: 'pinyin_ui', content: 'ui', mnemonic: 'uī', example: '围巾', emoji: '🧣', confusionSet: ['ei', 'iu'] },
    { id: 'pinyin_ao', content: 'ao', mnemonic: 'āo', example: '奥运', emoji: '🏅', confusionSet: ['ai', 'ou'] },
    { id: 'pinyin_ou', content: 'ou', mnemonic: 'ōu', example: '海鸥', emoji: '🕊️', confusionSet: ['ao', 'iu'] },
    { id: 'pinyin_iu', content: 'iu', mnemonic: 'iū', example: '优秀', emoji: '🌟', confusionSet: ['ou', 'ui'] },
    { id: 'pinyin_ie', content: 'ie', mnemonic: 'iē', example: '椰子', emoji: '🥥', confusionSet: ['üe', 'ei'] },
    { id: 'pinyin_ve', content: 'üe', mnemonic: 'üē', example: '月亮', emoji: '🌙', confusionSet: ['ie'] },
    { id: 'pinyin_er', content: 'er', mnemonic: 'ēr', example: '耳朵', emoji: '👂', confusionSet: [] },
    { id: 'pinyin_an', content: 'an', mnemonic: 'ān', example: '安全', emoji: '🛡️', confusionSet: ['ang', 'en'] },
    { id: 'pinyin_en', content: 'en', mnemonic: 'ēn', example: '嗯', emoji: '👍', confusionSet: ['eng', 'an'] },
    { id: 'pinyin_in', content: 'in', mnemonic: 'īn', example: '音乐', emoji: '🎵', confusionSet: ['ing', 'un'] },
    { id: 'pinyin_un', content: 'un', mnemonic: 'ūn', example: '温暖', emoji: '☀️', confusionSet: ['ün', 'in'] },
    { id: 'pinyin_vn', content: 'ün', mnemonic: 'ǖn', example: '云朵', emoji: '☁️', confusionSet: ['un', 'in'] },
    { id: 'pinyin_ang', content: 'ang', mnemonic: 'āng', example: '昂首', emoji: '🦌', confusionSet: ['an', 'eng'] },
    { id: 'pinyin_eng', content: 'eng', mnemonic: 'ēng', example: '风', emoji: '🌬️', confusionSet: ['en', 'ang'] },
    { id: 'pinyin_ing', content: 'ing', mnemonic: 'īng', example: '老鹰', emoji: '🦅', confusionSet: ['in', 'ong'] },
    { id: 'pinyin_ong', content: 'ong', mnemonic: 'ōng', example: '公鸡', emoji: '🐓', confusionSet: ['eng', 'ing'] }
  ],
  overall: [
    { id: 'pinyin_zhi', content: 'zhi', mnemonic: 'zhī', example: '蜘蛛', emoji: '🕷️', confusionSet: ['zi', 'chi'] },
    { id: 'pinyin_chi', content: 'chi', mnemonic: 'chī', example: '吃饭', emoji: '🍜', confusionSet: ['ci', 'zhi'] },
    { id: 'pinyin_shi', content: 'shi', mnemonic: 'shī', example: '狮子', emoji: '🦁', confusionSet: ['si', 'ri'] },
    { id: 'pinyin_ri', content: 'ri', mnemonic: 'rì', example: '日出', emoji: '🌅', confusionSet: ['shi'] },
    { id: 'pinyin_zi', content: 'zi', mnemonic: 'zī', example: '写字', emoji: '✍️', confusionSet: ['zhi', 'ci'] },
    { id: 'pinyin_ci', content: 'ci', mnemonic: 'cī', example: '刺', emoji: '🦔', confusionSet: ['chi', 'zi'] },
    { id: 'pinyin_si', content: 'si', mnemonic: 'sī', example: '蚕丝', emoji: '🧶', confusionSet: ['shi', 'zi'] },
    { id: 'pinyin_yi', content: 'yi', mnemonic: 'yī', example: '衣服', emoji: '👕', confusionSet: ['yu', 'wu'] },
    { id: 'pinyin_wu', content: 'wu', mnemonic: 'wū', example: '乌鸦', emoji: '🐦', confusionSet: ['yu', 'yi'] },
    { id: 'pinyin_yu', content: 'yu', mnemonic: 'yū', example: '鱼', emoji: '🐠', confusionSet: ['yi', 'wu'] },
    { id: 'pinyin_ye', content: 'ye', mnemonic: 'yē', example: '椰子', emoji: '🥥', confusionSet: ['yue', 'yi'] },
    { id: 'pinyin_yue', content: 'yue', mnemonic: 'yuè', example: '月亮', emoji: '🌙', confusionSet: ['ye', 'yuan'] },
    { id: 'pinyin_yuan', content: 'yuan', mnemonic: 'yuán', example: '圆', emoji: '⭕', confusionSet: ['yue'] },
    { id: 'pinyin_yin', content: 'yin', mnemonic: 'yīn', example: '音乐', emoji: '🎵', confusionSet: ['ying', 'yun'] },
    { id: 'pinyin_yun', content: 'yun', mnemonic: 'yún', example: '云朵', emoji: '☁️', confusionSet: ['yin', 'ying'] },
    { id: 'pinyin_ying', content: 'ying', mnemonic: 'yīng', example: '老鹰', emoji: '🦅', confusionSet: ['yin', 'yun'] }
  ]
}

const numberData = [
  { id: 'number_1', content: '1', example: '一个太阳', emoji: '☀️', confusionSet: ['2', '7'], minAge: 3, maxAge: 6 },
  { id: 'number_2', content: '2', example: '两只鸭子', emoji: '🦆🦆', confusionSet: ['1', '5'], minAge: 3, maxAge: 6 },
  { id: 'number_3', content: '3', example: '三个桃子', emoji: '🍑🍑🍑', confusionSet: ['2', '8'], minAge: 3, maxAge: 6 },
  { id: 'number_4', content: '4', example: '四棵树', emoji: '🌲🌲🌲🌲', confusionSet: ['3', '9'], minAge: 3, maxAge: 6 },
  { id: 'number_5', content: '5', example: '五颗星星', emoji: '⭐⭐⭐⭐⭐', confusionSet: ['2', '6'], minAge: 3, maxAge: 6 },
  { id: 'number_6', content: '6', example: '六朵花', emoji: '🌸🌸🌸🌸🌸🌸', confusionSet: ['5', '9'], minAge: 4, maxAge: 6 },
  { id: 'number_7', content: '7', example: '七只小鸟', emoji: '🐦🐦🐦🐦🐦🐦🐦', confusionSet: ['1', '9'], minAge: 4, maxAge: 6 },
  { id: 'number_8', content: '8', example: '八个气球', emoji: '🎈🎈🎈🎈🎈🎈🎈🎈', confusionSet: ['3', '0'], minAge: 4, maxAge: 6 },
  { id: 'number_9', content: '9', example: '九条鱼', emoji: '🐟🐟🐟🐟🐟🐟🐟🐟🐟', confusionSet: ['4', '6'], minAge: 4, maxAge: 6 },
  { id: 'number_10', content: '10', example: '十朵云', emoji: '☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️', confusionSet: ['9'], minAge: 4, maxAge: 6 },
  { id: 'number_11', content: '11', example: '十一颗纽扣', emoji: '🔘', confusionSet: ['10', '12'], minAge: 5, maxAge: 7 },
  { id: 'number_12', content: '12', example: '十二个月', emoji: '🗓️', confusionSet: ['11', '20'], minAge: 5, maxAge: 7 }
]

const englishData = [
  { id: 'word_cat', content: 'cat', example: '猫咪', emoji: '🐱', category: 'animals', confusionSet: ['dog'], minAge: 4, maxAge: 7 },
  { id: 'word_dog', content: 'dog', example: '狗狗', emoji: '🐕', category: 'animals', confusionSet: ['cat'], minAge: 4, maxAge: 7 },
  { id: 'word_bird', content: 'bird', example: '小鸟', emoji: '🐦', category: 'animals', confusionSet: ['duck'], minAge: 4, maxAge: 7 },
  { id: 'word_fish', content: 'fish', example: '鱼', emoji: '🐟', category: 'animals', confusionSet: ['bird'], minAge: 4, maxAge: 7 },
  { id: 'word_duck', content: 'duck', example: '鸭子', emoji: '🦆', category: 'animals', confusionSet: ['bird'], minAge: 4, maxAge: 7 },
  { id: 'word_red', content: 'red', example: '红色', emoji: '🔴', category: 'colors', confusionSet: ['blue'], minAge: 4, maxAge: 7 },
  { id: 'word_blue', content: 'blue', example: '蓝色', emoji: '🔵', category: 'colors', confusionSet: ['red'], minAge: 4, maxAge: 7 },
  { id: 'word_green', content: 'green', example: '绿色', emoji: '🟢', category: 'colors', confusionSet: ['yellow'], minAge: 4, maxAge: 7 },
  { id: 'word_yellow', content: 'yellow', example: '黄色', emoji: '🟡', category: 'colors', confusionSet: ['green'], minAge: 4, maxAge: 7 },
  { id: 'word_one', content: 'one', example: '一', emoji: '1️⃣', category: 'numbers', confusionSet: ['two'], minAge: 4, maxAge: 7 },
  { id: 'word_two', content: 'two', example: '二', emoji: '2️⃣', category: 'numbers', confusionSet: ['one'], minAge: 4, maxAge: 7 },
  { id: 'word_three', content: 'three', example: '三', emoji: '3️⃣', category: 'numbers', confusionSet: ['four'], minAge: 4, maxAge: 7 },
  { id: 'word_four', content: 'four', example: '四', emoji: '4️⃣', category: 'numbers', confusionSet: ['three'], minAge: 4, maxAge: 7 },
  { id: 'word_five', content: 'five', example: '五', emoji: '5️⃣', category: 'numbers', confusionSet: ['four'], minAge: 4, maxAge: 7 },
  { id: 'word_sun', content: 'sun', example: '太阳', emoji: '☀️', category: 'objects', confusionSet: ['moon'], minAge: 4, maxAge: 7 },
  { id: 'word_moon', content: 'moon', example: '月亮', emoji: '🌙', category: 'objects', confusionSet: ['sun'], minAge: 4, maxAge: 7 },
  { id: 'word_star', content: 'star', example: '星星', emoji: '⭐', category: 'objects', confusionSet: ['sun'], minAge: 4, maxAge: 7 },
  { id: 'word_book', content: 'book', example: '书本', emoji: '📚', category: 'objects', confusionSet: ['bag'], minAge: 4, maxAge: 7 },
  { id: 'word_ball', content: 'ball', example: '球', emoji: '⚽', category: 'objects', confusionSet: ['car'], minAge: 4, maxAge: 7 },
  { id: 'word_car', content: 'car', example: '小汽车', emoji: '🚗', category: 'objects', confusionSet: ['bus'], minAge: 4, maxAge: 7 },
  { id: 'word_bag', content: 'bag', example: '书包', emoji: '🎒', category: 'objects', confusionSet: ['book'], minAge: 4, maxAge: 7 },
  { id: 'word_bus', content: 'bus', example: '公交车', emoji: '🚌', category: 'places', confusionSet: ['car'], minAge: 4, maxAge: 7 },
  { id: 'word_house', content: 'house', example: '房子', emoji: '🏠', category: 'places', confusionSet: ['school'], minAge: 4, maxAge: 7 },
  { id: 'word_school', content: 'school', example: '学校', emoji: '🏫', category: 'places', confusionSet: ['house'], minAge: 4, maxAge: 7 },
  { id: 'word_park', content: 'park', example: '公园', emoji: '🌳', category: 'places', confusionSet: ['school'], minAge: 4, maxAge: 7 },
  { id: 'word_mom', content: 'mom', example: '妈妈', emoji: '👩', category: 'family', confusionSet: ['dad'], minAge: 4, maxAge: 7 },
  { id: 'word_dad', content: 'dad', example: '爸爸', emoji: '👨', category: 'family', confusionSet: ['mom'], minAge: 4, maxAge: 7 },
  { id: 'word_baby', content: 'baby', example: '宝宝', emoji: '👶', category: 'family', confusionSet: ['mom'], minAge: 4, maxAge: 7 },
  { id: 'word_apple', content: 'apple', example: '苹果', emoji: '🍎', category: 'objects', confusionSet: ['banana'], minAge: 4, maxAge: 7 },
  { id: 'word_banana', content: 'banana', example: '香蕉', emoji: '🍌', category: 'objects', confusionSet: ['apple'], minAge: 4, maxAge: 7 },
  { id: 'word_milk', content: 'milk', example: '牛奶', emoji: '🥛', category: 'objects', confusionSet: ['water'], minAge: 4, maxAge: 7 },
  { id: 'word_water', content: 'water', example: '水', emoji: '💧', category: 'objects', confusionSet: ['milk'], minAge: 4, maxAge: 7 }
]

const mathConceptData = [
  {
    id: 'math_add_2_1',
    type: 'operation',
    content: '2 + 1',
    question: '⭐ ⭐ + ⭐ = ?',
    answer: '3',
    options: ['2', '3', '4'],
    example: '两颗星再来一颗星',
    emoji: '➕',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['2', '4'],
  },
  {
    id: 'math_add_4_2',
    type: 'operation',
    content: '4 + 2',
    question: '🍎🍎🍎🍎 + 🍎🍎 = ?',
    answer: '6',
    options: ['5', '6', '7'],
    example: '四个苹果再加两个苹果',
    emoji: '🍎',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['5', '7'],
  },
  {
    id: 'math_sub_5_2',
    type: 'operation',
    content: '5 - 2',
    question: '🍪🍪🍪🍪🍪 拿走 🍪🍪，还剩几块？',
    answer: '3',
    options: ['2', '3', '4'],
    example: '把多的拿走',
    emoji: '➖',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['2', '4'],
  },
  {
    id: 'math_compare_7_4',
    type: 'comparison',
    content: '7 比 4 多',
    question: '哪一边更多？ ⭐⭐⭐⭐⭐⭐⭐   VS   ⭐⭐⭐⭐',
    answer: '7',
    options: ['4', '7', '一样多'],
    example: '比较哪边更多',
    emoji: '⚖️',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['4', '一样多'],
  },
  {
    id: 'math_compare_equal',
    type: 'comparison',
    content: '一样多',
    question: '这两边一样多吗？ 🍓🍓🍓🍓   VS   🍒🍒🍒🍒',
    answer: '一样多',
    options: ['左边更多', '右边更多', '一样多'],
    example: '看到数量相同',
    emoji: '🤝',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['左边更多', '右边更多'],
  },
  {
    id: 'math_shape_circle',
    type: 'shape',
    content: '圆形',
    question: '哪个图形像太阳一样圆？',
    answer: '○',
    options: ['△', '○', '□'],
    example: '圆圆的像太阳',
    emoji: '⚪',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['△', '□'],
  },
  {
    id: 'math_shape_triangle',
    type: 'shape',
    content: '三角形',
    question: '哪个图形有三个角？',
    answer: '△',
    options: ['○', '△', '□'],
    example: '有三个尖尖角',
    emoji: '🔺',
    minAge: 4,
    maxAge: 6,
    confusionSet: ['○', '□'],
  },
  {
    id: 'math_pattern_ab',
    type: 'pattern',
    content: 'AB 规律',
    question: '下一个应该是什么？ 🔴 🔵 🔴 🔵 ?',
    answer: '🔴',
    options: ['🔵', '🔴', '🟢'],
    example: '一红一蓝交替',
    emoji: '🧩',
    minAge: 4,
    maxAge: 7,
    confusionSet: ['🔵', '🟢'],
  },
  {
    id: 'math_pattern_123',
    type: 'pattern',
    content: '123 重复规律',
    question: '1 2 3 1 2 ?',
    answer: '3',
    options: ['2', '3', '4'],
    example: '重复出现的数字队伍',
    emoji: '🔁',
    minAge: 5,
    maxAge: 7,
    confusionSet: ['2', '4'],
  },
  {
    id: 'math_number_12',
    type: 'comparison',
    content: '12 以内数量组合',
    question: '10 个气球再来 2 个，一共有几个？',
    answer: '12',
    options: ['11', '12', '13'],
    example: '十和二合起来',
    emoji: '🎈',
    minAge: 5,
    maxAge: 7,
    confusionSet: ['11', '13'],
  },
]

const storyData = [
  { 
    id: 'story_pangu', 
    title: '盘古开天地', 
    titlePinyin: 'pán gǔ kāi tiān dì',
    type: 'myth', 
    example: '盘古', 
    emoji: '🪓', 
    difficulty: 1, 
    minAge: 3,
    content: [
      { text: '很久很久以前，天和地还没有分开，宇宙像个大鸡蛋。', pinyin: 'hěn jiǔ hěn jiǔ yǐ qián, tiān hé dì hái méi yǒu fēn kāi, yǔ zhòu xiàng gè dà jī dàn.' },
      { text: '有个叫盘古的巨人，在这个大鸡蛋里睡了一万八千年。', pinyin: 'yǒu gè jiào pán gǔ de jù rén, zài zhè ge dà jī dàn lǐ shuì le yī wàn bā qiān nián.' },
      { text: '有一天，盘古醒来了，他用斧头劈开了这个大鸡蛋。', pinyin: 'yǒu yī tiān, pán gǔ xǐng lái le, tā yòng fǔ tóu pī kāi le zhè ge dà jī dàn.' },
      { text: '轻的东西飘上去变成了天，重的东西沉下去变成了地。', pinyin: 'qīng de dōng xi piāo shàng qù biàn chéng le tiān, zhòng de dōng xi chén xià qù biàn chéng le dì.' },
      { text: '盘古怕天和地再合起来，就站在天地中间，每天长高一些。', pinyin: 'pán gǔ pà tiān hé dì zài hé qǐ lái, jiù zhàn zài tiān dì zhōng jiān, měi tiān zhǎng gāo yī xiē.' },
      { text: '又过了一万八千年，盘古累倒了，他的身体变成了世界万物。', pinyin: 'yòu guò le yī wàn bā qiān nián, pán gǔ lèi dǎo le, tā de shēn tǐ biàn chéng le shì jiè wàn wù.' }
    ],
    illustrationSlot: 'pangu'
  },
  { 
    id: 'story_nvwa', 
    title: '女娲补天', 
    titlePinyin: 'nǚ wā bǔ tiān',
    type: 'myth', 
    example: '女娲', 
    emoji: '🌊', 
    difficulty: 1, 
    minAge: 3,
    content: [
      { text: '天地开辟后，女娲用泥土仿照自己的样子造了很多人。', pinyin: 'tiān dì kāi pì hòu, nǚ wā yòng ní tǔ fǎng zhào zì jǐ de yàng zǐ zào le hěn duō rén.' },
      { text: '人们过着快乐的生活。', pinyin: 'rén men guò zhe kuài lè de shēng huó.' },
      { text: '可是有一天，天破了一个大洞，洪水从天上涌了下来。', pinyin: 'kě shì yǒu yī tiān, tiān pò le yī gè dà dòng, hóng shuǐ cóng tiān shàng yǒng le xià lái.' },
      { text: '女娲很着急，她炼了五色石来修补天空。', pinyin: 'nǚ wā hěn zháo jí, tā liàn le wǔ sè shí lái xiū bǔ tiān kōng.' },
      { text: '女娲用了很多很多的五色石，终于把天补好了。', pinyin: 'nǚ wā yòng le hěn duō hěn duō de wǔ sè shí, zhōng yú bǎ tiān bǔ hǎo le.' },
      { text: '人们又可以过上快乐的生活了。', pinyin: 'rén men yòu kě yǐ guò shàng kuài lè de shēng huó le.' }
    ],
    illustrationSlot: 'nvwa'
  },
  { 
    id: 'story_jingwei', 
    title: '精卫填海', 
    titlePinyin: 'jīng wèi tián hǎi',
    type: 'myth', 
    example: '精卫', 
    emoji: '🐦', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '太阳神炎帝有一个女儿，名叫女娃。', pinyin: 'tài yáng shén yán dì yǒu yī gè nǚ ér, míng jiào nǚ wá.' },
      { text: '有一天，女娃到东海去游玩，不幸掉进海里淹死了。', pinyin: 'yǒu yī tiān, nǚ wá dào dōng hǎi qù yóu wán, bù xìng diào jìn hǎi lǐ yān sǐ le.' },
      { text: '女娃死后，她的灵魂变成了一只小鸟，名字叫精卫。', pinyin: 'nǚ wá sǐ hòu, tā de líng hún biàn chéng le yī zhī xiǎo niǎo, míng zi jiào jīng wèi.' },
      { text: '精卫每天从西山衔来小石子和小树枝，扔进东海里。', pinyin: 'jīng wèi měi tiān cóng xī shān xián lái xiǎo shí zi hé xiǎo shù zhī, rēng jìn dōng hǎi lǐ.' },
      { text: '她想把东海填平，不让别人再像她一样被淹死。', pinyin: 'tā xiǎng bǎ dōng hǎi tián píng, bù ràng bié rén zài xiàng tā yī yàng bèi yān sǐ.' },
      { text: '精卫日复一日地填海，从不放弃。', pinyin: 'jīng wèi rì fù yī rì de tián hǎi, cóng bù fàng qì.' }
    ],
    illustrationSlot: 'jingwei'
  },
  { 
    id: 'poem_goose', 
    title: '咏鹅', 
    titlePinyin: 'yǒng é',
    type: 'poem', 
    example: '鹅鹅鹅', 
    emoji: '🦢', 
    difficulty: 1, 
    minAge: 3,
    author: '骆宾王',
    dynasty: '唐',
    region: '无',
    season: ['无特定'],
    themes: ['自然', '动物', '儿童', '水禽'],
    scenery: ['水', '鹅'],
    emotion: '喜悦',
    form: '五言绝句',
    content: [
      { text: '鹅，鹅，鹅，', pinyin: 'é, é, é,' },
      { text: '曲项向天歌。', pinyin: 'qū xiàng xiàng tiān gē.' },
      { text: '白毛浮绿水，', pinyin: 'bái máo fú lǜ shuǐ,' },
      { text: '红掌拨清波。', pinyin: 'hóng zhǎng bō qīng bō.' }
    ],
    illustrationSlot: 'goose'
  },
  { 
    id: 'poem_silent', 
    title: '静夜思', 
    titlePinyin: 'jìng yè sī',
    type: 'poem', 
    example: '举头望明月', 
    emoji: '🌕', 
    difficulty: 2, 
    minAge: 4,
    author: '李白',
    dynasty: '唐',
    region: '旅途',
    season: ['秋'],
    themes: ['思乡', '月夜', '旅途'],
    scenery: ['月', '霜'],
    emotion: '思念',
    form: '五言绝句',
    content: [
      { text: '床前明月光，', pinyin: 'chuáng qián míng yuè guāng,' },
      { text: '疑是地上霜。', pinyin: 'yí shì dì shàng shuāng.' },
      { text: '举头望明月，', pinyin: 'jǔ tóu wàng míng yuè,' },
      { text: '低头思故乡。', pinyin: 'dī tóu sī gù xiāng.' }
    ],
    illustrationSlot: 'silent'
  },
  { 
    id: 'poem_spring', 
    title: '春晓', 
    titlePinyin: 'chūn xiǎo',
    type: 'poem', 
    example: '春眠不觉晓', 
    emoji: '🌸', 
    difficulty: 2, 
    minAge: 4,
    author: '孟浩然',
    dynasty: '唐',
    region: '湖北',
    season: ['春'],
    themes: ['自然', '晨曦', '花落'],
    scenery: ['花', '鸟', '风雨'],
    emotion: '惬怀',
    form: '五言绝句',
    content: [
      { text: '春眠不觉晓，', pinyin: 'chūn mián bù jué xiǎo,' },
      { text: '处处闻啼鸟。', pinyin: 'chù chù wén tí niǎo.' },
      { text: '夜来风雨声，', pinyin: 'yè lái fēng yǔ shēng,' },
      { text: '花落知多少。', pinyin: 'huā luò zhī duō shǎo.' }
    ],
    illustrationSlot: 'spring'
  },
  { 
    id: 'idiom_frog', 
    title: '井底之蛙', 
    titlePinyin: 'jǐng dǐ zhī wā',
    type: 'idiom', 
    example: '青蛙', 
    emoji: '🐸', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '有一只青蛙住在一口废井里。', pinyin: 'yǒu yī zhī qīng wā zhù zài yī kǒu fèi jǐng lǐ.' },
      { text: '它觉得自己住的地方是世界上最好的地方。', pinyin: 'tā jué de zì jǐ zhù de dì fāng shì shì jiè shàng zuì hǎo de dì fāng.' },
      { text: '有一天，一只海龟来到了井边。', pinyin: 'yǒu yī tiān, yī zhī hǎi guī lái dào le jǐng biān.' },
      { text: '青蛙对海龟说："你看，我住在这里多快乐！"', pinyin: 'qīng wā duì hǎi guī shuō: "nǐ kàn, wǒ zhù zài zhè lǐ duō kuài lè!"' },
      { text: '海龟告诉青蛙，大海才是真正广阔的地方。', pinyin: 'hǎi guī gào sù qīng wā, dà hǎi cái shì zhēn zhèng guǎng kuò de dì fāng.' },
      { text: '这个故事告诉我们，不要做见识短浅的人。', pinyin: 'zhè ge gù shì gào sù wǒ men, bù yào zuò jiàn shi duǎn qiǎn de rén.' }
    ],
    illustrationSlot: 'frog'
  },
  { 
    id: 'idiom_rabbit', 
    title: '守株待兔', 
    titlePinyin: 'shǒu zhū dài tù',
    type: 'idiom', 
    example: '兔子', 
    emoji: '🐰', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '古时候，宋国有一个农夫。', pinyin: 'gǔ shí hòu, sòng guó yǒu yī gè nóng fū.' },
      { text: '有一天，他在田里干活，看见一只兔子撞死在树桩上。', pinyin: 'yǒu yī tiān, tā zài tián lǐ gàn huó, kàn jiàn yī zhī tù zǐ zhuàng sǐ zài shù zhuāng shàng.' },
      { text: '农夫很高兴，把兔子带回家美餐了一顿。', pinyin: 'nóng fū hěn gāo xìng, bǎ tù zǐ dài huí jiā měi cān le yī dùn.' },
      { text: '从那以后，农夫不再干活了。', pinyin: 'cóng nà yǐ hòu, nóng fū bù zài gàn huó le.' },
      { text: '他天天守在树桩旁，等着再有兔子撞死。', pinyin: 'tā tiān tiān shǒu zài shù zhuāng páng, děng zhe zài yǒu tù zǐ zhuàng sǐ.' },
      { text: '可是，他再也没有等到兔子，田里的庄稼也荒了。', pinyin: 'kě shì, tā zài yě méi yǒu děng dào tù zǐ, tián lǐ de zhuāng jià yě huāng le.' }
    ],
    illustrationSlot: 'rabbit'
  },
  { 
    id: 'story_kongrong', 
    title: '孔融让梨', 
    titlePinyin: 'kǒng róng ràng lí',
    type: 'history', 
    example: '孔融', 
    emoji: '🍐', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '东汉时期，有个叫孔融的小朋友。', pinyin: 'dōng hàn shí qī, yǒu gè jiào kǒng róng de xiǎo péng yǒu.' },
      { text: '孔融从小就聪明懂事，大家都很喜欢他。', pinyin: 'kǒng róng cóng xiǎo jiù cōng míng dǒng shì, dà jiā dōu hěn xǐ huan tā.' },
      { text: '有一天，家里吃梨，一盘梨子放在大家面前。', pinyin: 'yǒu yī tiān, jiā lǐ chī lí, yī pán lí zi fàng zài dà jiā miàn qián.' },
      { text: '哥哥让孔融先拿，孔融拿了一个最小的梨。', pinyin: 'gē ge ràng kǒng róng xiān ná, kǒng róng ná le yī gè zuì xiǎo de lí.' },
      { text: '爸爸问他为什么拿最小的，孔融说："我年纪小，应该吃小的。"', pinyin: 'bà ba wèn tā wèi shí me ná zuì xiǎo de, kǒng róng shuō: "wǒ nián jì xiǎo, yīng gāi chī xiǎo de."' },
      { text: '孔融让梨的故事一直流传到今天。', pinyin: 'kǒng róng ràng lí de gù shì yī zhí liú chuán dào jīn tiān.' }
    ],
    illustrationSlot: 'kongrong'
  },
  { 
    id: 'poem_minong', 
    title: '悯农', 
    titlePinyin: 'mǐn nóng',
    type: 'poem', 
    example: '谁知盘中餐', 
    emoji: '🌾', 
    difficulty: 2, 
    minAge: 4,
    author: '李绅',
    dynasty: '唐',
    content: [
      { text: '锄禾日当午，', pinyin: 'chú hé rì dāng wǔ,' },
      { text: '汗滴禾下土。', pinyin: 'hàn dī hé xià tǔ.' },
      { text: '谁知盘中餐，', pinyin: 'shuí zhī pán zhōng cān,' },
      { text: '粒粒皆辛苦。', pinyin: 'lì lì jiē xīn kǔ.' }
    ],
    illustrationSlot: 'minong'
  },
  { 
    id: 'story_kuafu', 
    title: '夸父逐日', 
    titlePinyin: 'kuā fù zhú rì',
    type: 'myth', 
    example: '夸父追太阳', 
    emoji: '☀️', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '远古的时候，有个巨人叫夸父。', pinyin: 'yuǎn gǔ de shí hòu, yǒu gè jù rén jiào kuā fù.' },
      { text: '他看着太阳从东方升起，又从西方落下。', pinyin: 'tā kàn zhe tài yáng cóng dōng fāng shēng qǐ, yòu cóng xī fāng luò xià.' },
      { text: '夸父想：我要追上太阳，留住它，让大地永远光明温暖。', pinyin: 'kuā fù xiǎng: wǒ yào zhuī shàng tài yáng, liú zhù tā, ràng dà dì yǒng yuǎn guāng míng wēn nuǎn.' },
      { text: '于是，夸父迈开长腿，向着西方的落日拼命跑去。', pinyin: 'yú shì, kuā fù mài kāi cháng tuǐ, xiàng zhe xī fāng de luò rì pīn mìng pǎo qù.' },
      { text: '跑啊跑，夸父口渴极了，他喝干了黄河的水，又喝干了渭水。', pinyin: 'pǎo a pǎo, kuā fù kǒu kě jí le, tā hē gān le huáng hé de shuǐ, yòu hē gān le wèi shuǐ.' },
      { text: '最后，夸父累倒了，他的身体变成了一座大山。', pinyin: 'zuì hòu, kuā fù lèi dǎo le, tā de shēn tǐ biàn chéng le yī zuò dà shān.' },
      { text: '他的手杖变成了一片桃林，为路人提供阴凉。', pinyin: 'tā de shǒu zhàng biàn chéng le yī piàn táo lín, wèi lù rén tí gōng yīn liáng.' }
    ],
    illustrationSlot: 'kuafu'
  },
  { 
    id: 'story_change', 
    title: '嫦娥奔月', 
    titlePinyin: 'cháng é bēn yuè',
    type: 'myth', 
    example: '嫦娥飞向月亮', 
    emoji: '🌙', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '很久很久以前，有个英雄叫后羿，他的妻子叫嫦娥。', pinyin: 'hěn jiǔ hěn jiǔ yǐ qián, yǒu gè yīng xióng jiào hòu yì, tā de qī zǐ jiào cháng é.' },
      { text: '后羿从西王母那里得到了一包不死药。', pinyin: 'hòu yì cóng xī wáng mǔ nà lǐ dé dào le yī bāo bù sǐ yào.' },
      { text: '据说，吃了这种药，就能飞到天上去成仙。', pinyin: 'jù shuō, chī le zhè zhǒng yào, jiù néng fēi dào tiān shàng qù chéng xiān.' },
      { text: '后羿把不死药交给嫦娥保管。', pinyin: 'hòu yì bǎ bù sǐ yào jiāo gěi cháng é bǎo guǎn.' },
      { text: '有一天，后羿的徒弟趁后羿不在，想要抢走不死药。', pinyin: 'yǒu yī tiān, hòu yì de tú dì chèn hòu yì bú zài, xiǎng yào qiǎng zǒu bù sǐ yào.' },
      { text: '嫦娥情急之下，吞下了不死药。', pinyin: 'cháng é qíng jí zhī xià, tūn xià le bù sǐ yào.' },
      { text: '嫦娥的身体变得轻飘飘的，飞上了天空，住在了月亮上的广寒宫。', pinyin: 'cháng é de shēn tǐ biàn de qīng piāo piāo de, fēi shàng le tiān kōng, zhù zài le yuè liàng shàng de guǎng hán gōng.' }
    ],
    illustrationSlot: 'change'
  },
  { 
    id: 'idiom_wenji', 
    title: '闻鸡起舞', 
    titlePinyin: 'wén jī qǐ wǔ',
    type: 'idiom', 
    example: '祖逖和刘琨', 
    emoji: '🐔', 
    difficulty: 2, 
    minAge: 5,
    content: [
      { text: '晋朝的时候，有个人叫祖逖，他有个好朋友叫刘琨。', pinyin: 'jìn cháo de shí hòu, yǒu gè rén jiào zǔ tì, tā yǒu gè hǎo péng yǒu jiào liú kūn.' },
      { text: '他们都是很有志向的人，希望能为国家做一番事业。', pinyin: 'tā men dōu shì hěn yǒu zhì xiàng de rén, xī wàng néng wéi guó jiā zuò yī fān shì yè.' },
      { text: '有一天半夜，祖逖听到公鸡的叫声。', pinyin: 'yǒu yī tiān bàn yè, zǔ tì tīng dào gōng jī de jiào shēng.' },
      { text: '他叫醒刘琨说："你听，这是在催促我们起床练功啊！"', pinyin: 'tā jiào xǐng liú kūn shuō: "nǐ tīng, zhè shì zài cuī cù wǒ men qǐ chuáng liàn gōng a!"' },
      { text: '于是，两人起床，在月光下舞起剑来。', pinyin: 'yú shì, liǎng rén qǐ chuáng, zài yuè guāng xià wǔ qǐ jiàn lái.' },
      { text: '从此以后，他们每天鸡叫就起床练剑，从不间断。', pinyin: 'cóng cǐ yǐ hòu, tā men měi tiān jī jiào jiù qǐ chuáng liàn jiàn, cóng bù jiàn duàn.' },
      { text: '后来，祖逖和刘琨都成了有用的人才。', pinyin: 'hòu lái, zǔ tì hé liú kūn dōu chéng le yǒu yòng de rén cái.' },
      { text: '这个故事告诉我们，有志者事竟成，只有勤奋努力才能成功。', pinyin: 'zhè ge gù shì gào sù wǒ men, yǒu zhì zhě shì jìng chéng, zhǐ yǒu qín fèn nǔ lì cái néng chéng gōng.' }
    ],
    illustrationSlot: 'wenji'
  },
  { 
    id: 'idiom_mogu', 
    title: '磨杵成针', 
    titlePinyin: 'mó chǔ chéng zhēn',
    type: 'idiom', 
    example: '铁杵磨成针', 
    emoji: '🪡', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '唐朝的时候，有个大诗人叫李白。', pinyin: 'táng cháo de shí hòu, yǒu gè dà shī rén jiào lǐ bái.' },
      { text: '李白小时候很聪明，但也很贪玩。', pinyin: 'lǐ bái xiǎo shí hòu hěn cōng míng, dàn yě hěn tān wán.' },
      { text: '有一天，他逃学出去玩，来到一条小河边。', pinyin: 'yǒu yī tiān, tā táo xué chū qù wán, lái dào yī tiáo xiǎo hé biān.' },
      { text: '他看到一位老婆婆正在磨一根很粗的铁杵。', pinyin: 'tā kàn dào yī wèi lǎo pó pó zhèng zài mó yī gēn hěn cū de tiě chǔ.' },
      { text: '李白好奇地问："老婆婆，您磨这根铁杵做什么呀？"', pinyin: 'lǐ bái hào qí de wèn: "lǎo pó pó, nín mó zhè gēn tiě chǔ zuò shí me ya?"' },
      { text: '老婆婆笑着说："我要把它磨成一根针。"', pinyin: 'lǎo pó pó xiào zhe shuō: "wǒ yào bǎ tā mó chéng yī gēn zhēn."' },
      { text: '李白惊讶地问："这么粗的铁杵，怎么能磨成针呢？"', pinyin: 'lǐ bái jīng yà de wèn: "zhè me cū de tiě chǔ, zěn me néng mó chéng zhēn ne?"' },
      { text: '老婆婆说："只要每天坚持磨，总有一天能磨成针的！"', pinyin: 'lǎo pó pó shuō: "zhǐ yào měi tiān jiān chí mó, zǒng yǒu yī tiān néng mó chéng zhēn de!"' },
      { text: '李白听了很感动，从此再也不贪玩了。', pinyin: 'lǐ bái tīng le hěn gǎn dòng, cóng cǐ zài yě bù tān wán le.' },
      { text: '他勤奋学习，后来成了著名的大诗人。', pinyin: 'tā qín fèn xué xí, hòu lái chéng le zhù míng de dà shī rén.' }
    ],
    illustrationSlot: 'mogu'
  },
  { 
    id: 'idiom_wangmei', 
    title: '望梅止渴', 
    titlePinyin: 'wàng méi zhǐ kě',
    type: 'idiom', 
    example: '曹操用梅子解口渴', 
    emoji: '🍒', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '三国时期，有个军事家叫曹操。', pinyin: 'sān guó shí qī, yǒu gè jūn shì jiā jiào cáo cāo.' },
      { text: '有一年夏天，曹操带领士兵们去打仗。', pinyin: 'yǒu yī nián xià tiān, cáo cāo dài lǐng shì bīng men qù dǎ zhàng.' },
      { text: '天气非常炎热，士兵们走了很远的路，又渴又累。', pinyin: 'tiān qì fēi cháng yán rè, shì bīng men zǒu le hěn yuǎn de lù, yòu kě yòu lèi.' },
      { text: '大家都走不动了，队伍越来越慢。', pinyin: 'dà jiā dōu zǒu bù dòng le, duì wǔ yuè lái yuè màn.' },
      { text: '曹操心里很着急，他看到前面有一片树林。', pinyin: 'cáo cāo xīn lǐ hěn zháo jí, tā kàn dào qián miàn yǒu yī piàn shù lín.' },
      { text: '他突然有了一个好主意，大声对士兵们说：', pinyin: 'tā tū rán yǒu le yī gè hǎo zhǔ yi, dà shēng duì shì bīng men shuō:' },
      { text: '大家加油！前面有一片梅林，梅子又大又酸，吃了就不渴了！', pinyin: 'dà jiā jiā yóu! qián miàn yǒu yī piàn méi lín, méi zi yòu dà yòu suān, chī le jiù bù kě le!' },
      { text: '士兵们一听，嘴里都流出口水来，感觉不那么渴了。', pinyin: 'shì bīng men yī tīng, zuǐ lǐ dōu liú chū kǒu shuǐ lái, gǎn jué bù nà me kě le.' },
      { text: '大家一下子有了精神，加快脚步往前走。', pinyin: 'dà jiā yī xià zi yǒu le jīng shén, jiā kuài jiǎo bù wǎng qián zǒu.' },
      { text: '后来，他们终于找到了水源，解决了口渴的问题。', pinyin: 'hòu lái, tā men zhōng yú zhǎo dào le shuǐ yuán, jiě jué le kǒu kě de wèn tí.' }
    ],
    illustrationSlot: 'wangmei'
  },
  { 
    id: 'poem_deng', 
    title: '登鹳雀楼', 
    titlePinyin: 'dēng guàn què lóu',
    type: 'poem', 
    example: '欲穷千里目', 
    emoji: '🏯', 
    difficulty: 2, 
    minAge: 4,
    author: '王之涣',
    dynasty: '唐',
    content: [
      { text: '白日依山尽，', pinyin: 'bái rì yī shān jìn,' },
      { text: '黄河入海流。', pinyin: 'huáng hé rù hǎi liú.' },
      { text: '欲穷千里目，', pinyin: 'yù qióng qiān lǐ mù,' },
      { text: '更上一层楼。', pinyin: 'gèng shàng yī céng lóu.' }
    ],
    illustrationSlot: 'deng'
  },
  { 
    id: 'poem_yongliu', 
    title: '咏柳', 
    titlePinyin: 'yǒng liǔ',
    type: 'poem', 
    example: '碧玉妆成一树高', 
    emoji: '🌿', 
    difficulty: 2, 
    minAge: 4,
    author: '贺知章',
    dynasty: '唐',
    content: [
      { text: '碧玉妆成一树高，', pinyin: 'bì yù zhuāng chéng yī shù gāo,' },
      { text: '万条垂下绿丝绦。', pinyin: 'wàn tiáo chuí xià lǜ sī tāo.' },
      { text: '不知细叶谁裁出，', pinyin: 'bù zhī xì yè shuí cái chū,' },
      { text: '二月春风似剪刀。', pinyin: 'èr yuè chūn fēng sì jiǎn dāo.' }
    ],
    illustrationSlot: 'yongliu'
  },
  { 
    id: 'story_sima', 
    title: '司马光砸缸', 
    titlePinyin: 'sī mǎ guāng zá gāng',
    type: 'history', 
    example: '司马光救小朋友', 
    emoji: '🏺', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '宋朝的时候，有个小朋友叫司马光。', pinyin: 'sòng cháo de shí hòu, yǒu gè xiǎo péng yǒu jiào sī mǎ guāng.' },
      { text: '司马光从小就很聪明，喜欢动脑筋。', pinyin: 'sī mǎ guāng cóng xiǎo jiù hěn cōng míng, xǐ huān dòng nǎo jīn.' },
      { text: '有一天，他和几个小朋友在花园里玩。', pinyin: 'yǒu yī tiān, tā hé jǐ gè xiǎo péng yǒu zài huā yuán lǐ wán.' },
      { text: '花园里有一口大缸，缸里装满了水。', pinyin: 'huā yuán lǐ yǒu yī kǒu dà gāng, gāng lǐ zhuāng mǎn le shuǐ.' },
      { text: '有个小朋友爬上大缸去玩，不小心掉进了缸里。', pinyin: 'yǒu gè xiǎo péng yǒu pá shàng dà gāng qù wán, bù xiǎo xīn diào jìn le gāng lǐ.' },
      { text: '水很深，那个小朋友在水里挣扎，情况很危险！', pinyin: 'shuǐ hěn shēn, nà ge xiǎo péng yǒu zài shuǐ lǐ zhēng zhá, qíng kuàng hěn wēi xiǎn!' },
      { text: '其他小朋友都吓坏了，有的哭，有的跑去找大人。', pinyin: 'qí tā xiǎo péng yǒu dōu xià huài le, yǒu de kū, yǒu de pǎo qù zhǎo dà rén.' },
      { text: '只有司马光很冷静，他想了一个好办法。', pinyin: 'zhǐ yǒu sī mǎ guāng hěn lěng jìng, tā xiǎng le yī gè hǎo bàn fǎ.' },
      { text: '他从地上捡起一块大石头，用力向大缸砸去。', pinyin: 'tā cóng dì shàng jiǎn qǐ yī kuài dà shí tou, yòng lì xiàng dà gāng zá qù.' },
      { text: '缸破了，水流了出来，掉在缸里的小朋友得救了！', pinyin: 'gāng pò le, shuǐ liú le chū lái, diào zài gāng lǐ de xiǎo péng yǒu dé jiù le!' },
      { text: '大家都夸司马光聪明勇敢。', pinyin: 'dà jiā dōu kuā sī mǎ guāng cōng míng yǒng gǎn.' }
    ],
    illustrationSlot: 'sima'
  },
  { 
    id: 'story_caocao', 
    title: '曹冲称象', 
    titlePinyin: 'cáo chōng chēng xiàng',
    type: 'history', 
    example: '曹冲想办法称大象', 
    emoji: '🐘', 
    difficulty: 2, 
    minAge: 4,
    content: [
      { text: '三国时期，有人送给曹操一头大象。', pinyin: 'sān guó shí qī, yǒu rén sòng gěi cáo cāo yī tóu dà xiàng.' },
      { text: '曹操很高兴，想知道这头大象有多重。', pinyin: 'cáo cāo hěn gāo xìng, xiǎng zhī dào zhè tóu dà xiàng yǒu duō zhòng.' },
      { text: '可是大象太大了，没有那么大的秤来称它。', pinyin: 'kě shì dà xiàng tài dà le, méi yǒu nà me dà de chèng lái chēng tā.' },
      { text: '大臣们想了很多办法，可是都不行。', pinyin: 'dà chén men xiǎng le hěn duō bàn fǎ, kě shì dōu bù xíng.' },
      { text: '这时，曹操的小儿子曹冲走了出来。', pinyin: 'zhè shí, cáo cāo de xiǎo ér zi cáo chōng zǒu le chū lái.' },
      { text: '曹冲说："我有办法称大象！"', pinyin: 'cáo chōng shuō: "wǒ yǒu bàn fǎ chēng dà xiàng!"' },
      { text: '他叫人把大象赶到一艘大船上。', pinyin: 'tā jiào rén bǎ dà xiàng gǎn dào yī sōu dà chuán shàng.' },
      { text: '船下沉了一些，曹冲在船舷上刻了一个记号。', pinyin: 'chuán xià chén le yī xiē, cáo chōng zài chuán xián shàng kè le yī gè jì hào.' },
      { text: '然后，他叫人把大象赶下船。', pinyin: 'rán hòu, tā jiào rén bǎ dà xiàng gǎn xià chuán.' },
      { text: '接着，他叫人往船上装石头，一直装到船沉到刚才刻的记号那里。', pinyin: 'jiē zhe, tā jiào rén wǎng chuán shàng zhuāng shí tou, yī zhí zhuāng dào chuán chén dào gāng cái kè de jì hào nà lǐ.' },
      { text: '最后，他叫人称一称船上的石头。', pinyin: 'zuì hòu, tā jiào rén chēng yī chēng chuán shàng de shí tou.' },
      { text: '石头的重量就是大象的重量！', pinyin: 'shí tou de zhòng liàng jiù shì dà xiàng de zhòng liàng!' },
      { text: '大家都夸曹冲真是个聪明的孩子。', pinyin: 'dà jiā dōu kuā cáo chōng zhēn shì gè cōng míng de hái zi.' }
    ],
    illustrationSlot: 'caocao'
  },
  {
    id: 'myth_houyi',
    title: '后羿射日',
    titlePinyin: 'hòu yì shè rì',
    type: 'myth',
    example: '后羿射下太阳',
    emoji: '🏹',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '远古的时候，天上同时出现了十个太阳。', pinyin: 'yuǎn gǔ de shí hòu, tiān shàng tóng shí chū xiàn le shí gè tài yáng.' },
      { text: '十个太阳一起照，大地被烤得像火炉一样。', pinyin: 'shí gè tài yáng yī qǐ zhào, dà dì bèi kǎo de xiàng huǒ lú yī yàng.' },
      { text: '庄稼都枯死了，河流也干涸了，百姓们苦不堪言。', pinyin: 'zhuāng jia dōu kū sǐ le, hé liú yě gān hé le, bǎi xìng men kǔ bù kān yán.' },
      { text: '有个神箭手叫后羿，他力大无比，箭法极准。', pinyin: 'yǒu gè shén jiàn shǒu jiào hòu yì, tā lì dà wú bǐ, jiàn fǎ jí zhǔn.' },
      { text: '后羿看到百姓受苦，非常难过，决定射下多余的太阳。', pinyin: 'hòu yì kàn dào bǎi xìng shòu kǔ, fēi cháng nán guò, jué dìng shè xià duō yú de tài yáng.' },
      { text: '他弯弓搭箭，嗖嗖嗖，一口气射下了九个太阳。', pinyin: 'tā wān gōng dā jiàn, sōu sōu sōu, yī kǒu qì shè xià le jiǔ gè tài yáng.' },
      { text: '留下最后一个太阳，给大地带来光明和温暖。', pinyin: 'liú xià zuì hòu yī gè tài yáng, gěi dà dì dài lái guāng míng hé wēn nuǎn.' },
      { text: '百姓们欢呼雀跃，感谢后羿救了大家。', pinyin: 'bǎi xìng men huān hū què yuè, gǎn xiè hòu yì jiù le dà jiā.' }
    ],
    illustrationSlot: 'houyi'
  },
  {
    id: 'myth_shennong',
    title: '神农尝百草',
    titlePinyin: 'shén nóng cháng bǎi cǎo',
    type: 'myth',
    example: '神农尝草药',
    emoji: '🌿',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '很久以前，人们生了病不知道怎么治疗。', pinyin: 'hěn jiǔ yǐ qián, rén men shēng le bìng bù zhī dào zěn me zhì liáo.' },
      { text: '有个神人叫神农，他决定亲自尝百草，找出能治病的植物。', pinyin: 'yǒu gè shén rén jiào shén nóng, tā jué dìng qīn zì cháng bǎi cǎo, zhǎo chū néng zhì bìng de zhí wù.' },
      { text: '神农翻山越岭，走遍了天下，尝遍了各种草、树皮和花果。', pinyin: 'shén nóng fān shān yuè lǐng, zǒu biàn le tiān xià, cháng biàn le gè zhǒng cǎo, shù pí hé huā guǒ.' },
      { text: '有时候他会中毒，但他从不放弃。', pinyin: 'yǒu shí hòu tā huì zhòng dú, dàn tā cóng bù fàng qì.' },
      { text: '据说他一天之内中了七十多次毒。', pinyin: 'jù shuō tā yī tiān zhī nèi zhòng le qī shí duō cì dú.' },
      { text: '神农把哪些草能治病、哪些草有毒，都一一记了下来。', pinyin: 'shén nóng bǎ nǎ xiē cǎo néng zhì bìng, nǎ xiē cǎo yǒu dú, dōu yī yī jì le xià lái.' },
      { text: '从此，人们就知道了很多治病的草药，再也不怕生病了。', pinyin: 'cóng cǐ, rén men jiù zhī dào le hěn duō zhì bìng de cǎo yào, zài yě bù pà shēng bìng le.' }
    ],
    illustrationSlot: 'shennong'
  },
  {
    id: 'poem_xiaochi',
    title: '小池',
    titlePinyin: 'xiǎo chí',
    type: 'poem',
    example: '小荷才露尖尖角',
    emoji: '🪷',
    difficulty: 1,
    minAge: 3,
    author: '杨万里',
    dynasty: '宋',
    region: '无',
    season: ['夏'],
    themes: ['自然', '池塘', '荷花'],
    scenery: ['池塘', '荷花', '虑蜓', '泉水'],
    emotion: '喜悦',
    form: '七言绝句',
    content: [
      { text: '泉眼无声惜细流，', pinyin: 'quán yǎn wú shēng xī xì liú,' },
      { text: '树阴照水爱晴柔。', pinyin: 'shù yīn zhào shuǐ ài qíng róu.' },
      { text: '小荷才露尖尖角，', pinyin: 'xiǎo hé cái lù jiān jiān jiǎo,' },
      { text: '早有蜻蜓立上头。', pinyin: 'zǎo yǒu qīng tíng lì shàng tóu.' }
    ],
    illustrationSlot: 'xiaochi'
  },
  {
    id: 'poem_suiyequ',
    title: '宿建德江',
    titlePinyin: 'sù jiàn dé jiāng',
    type: 'poem',
    example: '野旷天低树',
    emoji: '🌊',
    difficulty: 2,
    minAge: 4,
    author: '孟浩然',
    dynasty: '唐',
    region: '浙江',
    season: ['秋'],
    themes: ['思乡', '江河', '夜景', '旅途'],
    scenery: ['江', '月', '夜'],
    emotion: '惆怀',
    form: '五言绝句',
    content: [
      { text: '移舟泊烟渚，', pinyin: 'yí zhōu bó yān zhǔ,' },
      { text: '日暮客愁新。', pinyin: 'rì mù kè chóu xīn.' },
      { text: '野旷天低树，', pinyin: 'yě kuàng tiān dī shù,' },
      { text: '江清月近人。', pinyin: 'jiāng qīng yuè jìn rén.' }
    ],
    illustrationSlot: 'suiyequ'
  },
  {
    id: 'idiom_yeggong',
    title: '叶公好龙',
    titlePinyin: 'yè gōng hào lóng',
    type: 'idiom',
    example: '叶公和龙',
    emoji: '🐲',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '春秋时期，有个人叫叶公，他非常喜欢龙。', pinyin: 'chūn qiū shí qī, yǒu gè rén jiào yè gōng, tā fēi cháng xǐ huan lóng.' },
      { text: '叶公家里到处都是龙的图案，墙上画着龙，柱子上雕着龙。', pinyin: 'yè gōng jiā lǐ dào chù dōu shì lóng de tú àn, qiáng shàng huà zhe lóng, zhù zi shàng diāo zhe lóng.' },
      { text: '连他穿的衣服、用的东西上面，也都是龙。', pinyin: 'lián tā chuān de yī fú, yòng de dōng xi shàng miàn, yě dōu shì lóng.' },
      { text: '天上的真龙知道了，很感动，决定去拜访叶公。', pinyin: 'tiān shàng de zhēn lóng zhī dào le, hěn gǎn dòng, jué dìng qù bài fǎng yè gōng.' },
      { text: '真龙从天上飞下来，把头伸进叶公的窗户里。', pinyin: 'zhēn lóng cóng tiān shàng fēi xià lái, bǎ tóu shēn jìn yè gōng de chuāng hù lǐ.' },
      { text: '叶公一看，吓得魂飞魄散，拔腿就跑。', pinyin: 'yè gōng yī kàn, xià de hún fēi pò sàn, bá tuǐ jiù pǎo.' },
      { text: '原来，叶公喜欢的不是真龙，只是龙的样子。', pinyin: 'yuán lái, yè gōng xǐ huan de bù shì zhēn lóng, zhǐ shì lóng de yàng zi.' },
      { text: '这个故事告诉我们，做事要言行一致，表里如一。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào yán xíng yī zhì, biǎo lǐ rú yī.' }
    ],
    illustrationSlot: 'yeggong'
  },
  {
    id: 'idiom_maodun',
    title: '自相矛盾',
    titlePinyin: 'zì xiāng máo dùn',
    type: 'idiom',
    example: '矛与盾',
    emoji: '⚔️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '古时候，有个楚国人在集市上卖矛和盾。', pinyin: 'gǔ shí hòu, yǒu gè chǔ guó rén zài jí shì shàng mài máo hé dùn.' },
      { text: '他先举起盾，大声吆喝说："我的盾是世界上最坚固的！"', pinyin: 'tā xiān jǔ qǐ dùn, dà shēng yāo hē shuō: "wǒ de dùn shì shì jiè shàng zuì jiān gù de!"' },
      { text: '"任何锋利的矛都刺不穿它！"', pinyin: '"rèn hé fēng lì de máo dōu cì bù chuān tā!"' },
      { text: '然后，他又举起矛说："我的矛是世界上最锋利的！"', pinyin: 'rán hòu, tā yòu jǔ qǐ máo shuō: "wǒ de máo shì shì jiè shàng zuì fēng lì de!"' },
      { text: '"任何坚固的盾都能被它刺穿！"', pinyin: '"rèn hé jiān gù de dùn dōu néng bèi tā cì chuān!"' },
      { text: '旁边有人问他："用你的矛刺你的盾，结果怎样？"', pinyin: 'páng biān yǒu rén wèn tā: "yòng nǐ de máo cì nǐ de dùn, jié guǒ zěn yàng?"' },
      { text: '那人张口结舌，答不上来。', pinyin: 'nà rén zhāng kǒu jié shé, dá bù shàng lái.' },
      { text: '这个故事告诉我们，说话做事不能前后矛盾。', pinyin: 'zhè ge gù shì gào sù wǒ men, shuō huà zuò shì bù néng qián hòu máo dùn.' }
    ],
    illustrationSlot: 'maodun'
  },
  {
    id: 'story_huamulan',
    title: '花木兰',
    titlePinyin: 'huā mù lán',
    type: 'history',
    example: '花木兰替父从军',
    emoji: '⚔️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '很久以前，有个聪明勇敢的女孩叫花木兰。', pinyin: 'hěn jiǔ yǐ qián, yǒu gè cōng míng yǒng gǎn de nǚ hái jiào huā mù lán.' },
      { text: '国家打仗了，每家每户要出一个男丁当兵。', pinyin: 'guó jiā dǎ zhàng le, měi jiā měi hù yào chū yī gè nán dīng dāng bīng.' },
      { text: '花木兰的父亲年纪大了，身体不好，不能去当兵。', pinyin: 'huā mù lán de fù qīn nián jì dà le, shēn tǐ bù hǎo, bù néng qù dāng bīng.' },
      { text: '花木兰非常担心父亲，她决定女扮男装，替父从军。', pinyin: 'huā mù lán fēi cháng dān xīn fù qīn, tā jué dìng nǚ bàn nán zhuāng, tì fù cóng jūn.' },
      { text: '她苦练武艺，学习兵法，成了一名优秀的士兵。', pinyin: 'tā kǔ liàn wǔ yì, xué xí bīng fǎ, chéng le yī míng yōu xiù de shì bīng.' },
      { text: '花木兰在战场上英勇杀敌，立下了赫赫战功。', pinyin: 'huā mù lán zài zhàn chǎng shàng yīng yǒng shā dí, lì xià le hè hè zhàn gōng.' },
      { text: '打了胜仗以后，花木兰脱下战袍，换上女装，大家才知道她是女子。', pinyin: 'dǎ le shèng zhàng yǐ hòu, huā mù lán tuō xià zhàn páo, huàn shàng nǚ zhuāng, dà jiā cái zhī dào tā shì nǚ zǐ.' },
      { text: '花木兰孝顺父母、勇敢爱国的精神，一直流传至今。', pinyin: 'huā mù lán xiào shùn fù mǔ, yǒng gǎn ài guó de jīng shén, yī zhí liú chuán zhì jīn.' }
    ],
    illustrationSlot: 'huamulan'
  },
  {
    id: 'story_xueyongqin',
    title: '岳飞学艺',
    titlePinyin: 'yuè fēi xué yì',
    type: 'history',
    example: '岳飞勤奋练武',
    emoji: '🏋️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '宋朝有个小孩叫岳飞，他从小就立志保卫国家。', pinyin: 'sòng cháo yǒu gè xiǎo hái jiào yuè fēi, tā cóng xiǎo jiù lì zhì bǎo wèi guó jiā.' },
      { text: '岳飞家里很穷，但他非常勤奋好学。', pinyin: 'yuè fēi jiā lǐ hěn qióng, dàn tā fēi cháng qín fèn hǎo xué.' },
      { text: '他拜了一位武艺高强的老师，每天刻苦练功。', pinyin: 'tā bài le yī wèi wǔ yì gāo qiáng de lǎo shī, měi tiān kè kǔ liàn gōng.' },
      { text: '夏天练功热得汗流浃背，冬天练功冻得手脚冰凉，岳飞从不叫苦。', pinyin: 'xià tiān liàn gōng rè de hàn liú jiā bèi, dōng tiān liàn gōng dòng de shǒu jiǎo bīng liáng, yuè fēi cóng bù jiào kǔ.' },
      { text: '他的母亲在他背上刺了"精忠报国"四个字，激励他时刻不忘报国。', pinyin: 'tā de mǔ qīn zài tā bèi shàng cì le "jīng zhōng bào guó" sì gè zì, jī lì tā shí kè bù wàng bào guó.' },
      { text: '岳飞长大后，成了一名威名赫赫的大将军。', pinyin: 'yuè fēi zhǎng dà hòu, chéng le yī míng wēi míng hè hè de dà jiāng jūn.' },
      { text: '他带领士兵奋勇杀敌，保卫了百姓的平安生活。', pinyin: 'tā dài lǐng shì bīng fèn yǒng shā dí, bǎo wèi le bǎi xìng de píng ān shēng huó.' }
    ],
    illustrationSlot: 'xueyongqin'
  },
  {
    id: 'idiom_yugu',
    title: '愚公移山',
    titlePinyin: 'yú gōng yí shān',
    type: 'idiom',
    example: '愚公坚持移山',
    emoji: '⛰️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '从前，有个老人叫愚公，他家门前有两座大山，出行很不方便。', pinyin: 'cóng qián, yǒu gè lǎo rén jiào yú gōng, tā jiā mén qián yǒu liǎng zuò dà shān, chū xíng hěn bù fāng biàn.' },
      { text: '愚公决定把两座山挖掉，他带着子孙们开始挖山。', pinyin: 'yú gōng jué dìng bǎ liǎng zuò shān wā diào, tā dài zhe zǐ sūn men kāi shǐ wā shān.' },
      { text: '有个聪明人嘲笑他说："你都这么老了，怎么可能把山挖平？"', pinyin: 'yǒu gè cōng míng rén cháo xiào tā shuō: "nǐ dōu zhè me lǎo le, zěn me kě néng bǎ shān wā píng?"' },
      { text: '愚公微笑着回答说："我死了有我儿子，儿子死了有孙子，子子孙孙无穷无尽。"', pinyin: 'yú gōng wēi xiào zhe huí dá shuō: "wǒ sǐ le yǒu wǒ ér zi, ér zi sǐ le yǒu sūn zi, zǐ zǐ sūn sūn wú qióng wú jìn."' },
      { text: '"可山是不会增高的，总有一天我们一定能把它挖平！"', pinyin: '"kě shān shì bù huì zēng gāo de, zǒng yǒu yī tiān wǒ men yī dìng néng bǎ tā wā píng!"' },
      { text: '愚公的精神感动了天帝，天帝派神仙把两座山搬走了。', pinyin: 'yú gōng de jīng shén gǎn dòng le tiān dì, tiān dì pài shén xiān bǎ liǎng zuò shān bān zǒu le.' },
      { text: '这个故事告诉我们，只要有坚定的信念和不懈的努力，就能克服一切困难。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhǐ yào yǒu jiān dìng de xìn niàn hé bù xiè de nǔ lì, jiù néng kè fú yī qiē kùn nán.' }
    ],
    illustrationSlot: 'yugu'
  },
  {
    id: 'myth_niulangzhinv',
    title: '牛郎织女',
    titlePinyin: 'niú láng zhī nǚ',
    type: 'myth',
    example: '牛郎和织女在鹊桥相会',
    emoji: '🌌',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '从前，有个勤劳善良的年轻人叫牛郎。', pinyin: 'cóng qián, yǒu gè qín láo shàn liáng de nián qīng rén jiào niú láng.' },
      { text: '天上有位美丽的仙女叫织女，她最会织云彩。', pinyin: 'tiān shàng yǒu wèi měi lì de xiān nǚ jiào zhī nǚ, tā zuì huì zhī yún cǎi.' },
      { text: '后来，牛郎和织女相遇了，他们彼此喜欢，过起了幸福的生活。', pinyin: 'hòu lái, niú láng hé zhī nǚ xiāng yù le, tā men bǐ cǐ xǐ huan, guò qǐ le xìng fú de shēng huó.' },
      { text: '可是王母娘娘知道后，非常生气，把织女带回了天上。', pinyin: 'kě shì wáng mǔ niáng niáng zhī dào hòu, fēi cháng shēng qì, bǎ zhī nǚ dài huí le tiān shàng.' },
      { text: '牛郎挑着孩子追到天边，却被一道银河隔开。', pinyin: 'niú láng tiāo zhe hái zi zhuī dào tiān biān, què bèi yī dào yín hé gé kāi.' },
      { text: '善良的喜鹊飞来搭成鹊桥，让他们每年七月初七相见一次。', pinyin: 'shàn liáng de xǐ què fēi lái dā chéng què qiáo, ràng tā men měi nián qī yuè chū qī xiāng jiàn yī cì.' },
      { text: '这个故事让大家记住了真挚的爱和重逢的希望。', pinyin: 'zhè ge gù shì ràng dà jiā jì zhù le zhēn zhì de ài hé chóng féng de xī wàng.' }
    ],
    illustrationSlot: 'niulangzhinv'
  },
  {
    id: 'myth_nvwa_ren',
    title: '女娲造人',
    titlePinyin: 'nǚ wā zào rén',
    type: 'myth',
    example: '女娲用泥土造人',
    emoji: '🧑‍🤝‍🧑',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '天地开辟以后，大地上还没有人类。', pinyin: 'tiān dì kāi pì yǐ hòu, dà dì shàng hái méi yǒu rén lèi.' },
      { text: '有一个神叫女娲，她在大地上游历，感到非常孤独寂寞。', pinyin: 'yǒu yī gè shén jiào nǚ wā, tā zài dà dì shàng yóu lì, gǎn dào fēi cháng gū dú jì mò.' },
      { text: '一天，她来到河边，用双手捧起泥土，照着自己的样子捏了起来。', pinyin: 'yī tiān, tā lái dào hé biān, yòng shuāng shǒu pěng qǐ ní tǔ, zhào zhe zì jǐ de yàng zi niē le qǐ lái.' },
      { text: '她把泥人放到地上，泥人就活了，开口说话，跳跃欢呼。', pinyin: 'tā bǎ ní rén fàng dào dì shàng, ní rén jiù huó le, kāi kǒu shuō huà, tiào yuè huān hū.' },
      { text: '女娲很高兴，不停地造出一个又一个的人。', pinyin: 'nǚ wā hěn gāo xìng, bù tíng de zào chū yī gè yòu yī gè de rén.' },
      { text: '但是用手捏太慢了，女娲想了个好办法。', pinyin: 'dàn shì yòng shǒu niē tài màn le, nǚ wā xiǎng le gè hǎo bàn fǎ.' },
      { text: '她用一根树藤，沾上泥浆，向四处甩去，泥点落地就变成了人。', pinyin: 'tā yòng yī gēn shù téng, zhān shàng ní jiāng, xiàng sì chù shuǎi qù, ní diǎn luò dì jiù biàn chéng le rén.' },
      { text: '从此，大地上有了人类，世界变得热闹起来。', pinyin: 'cóng cǐ, dà dì shàng yǒu le rén lèi, shì jiè biàn de rè nào qǐ lái.' }
    ],
    illustrationSlot: 'nvwa_ren'
  },
  {
    id: 'poem_chunri',
    title: '春日',
    titlePinyin: 'chūn rì',
    type: 'poem',
    example: '万紫千红总是春',
    emoji: '🌺',
    difficulty: 2,
    minAge: 4,
    author: '朱熹',
    dynasty: '宋',
    content: [
      { text: '胜日寻芳泗水滨，', pinyin: 'shèng rì xún fāng sì shuǐ bīn,' },
      { text: '无边光景一时新。', pinyin: 'wú biān guāng jǐng yī shí xīn.' },
      { text: '等闲识得东风面，', pinyin: 'děng xián shí de dōng fēng miàn,' },
      { text: '万紫千红总是春。', pinyin: 'wàn zǐ qiān hóng zǒng shì chūn.' }
    ],
    illustrationSlot: 'chunri'
  },
  {
    id: 'poem_jiushi',
    title: '绝句',
    titlePinyin: 'jué jù',
    type: 'poem',
    example: '两个黄鹂鸣翠柳',
    emoji: '🐦',
    difficulty: 2,
    minAge: 4,
    author: '杜甫',
    dynasty: '唐',
    region: '四川',
    season: ['春'],
    themes: ['自然', '鸟', '山水'],
    scenery: ['鸟', '山', '江河', '雪'],
    emotion: '喜悦',
    form: '七言绝句',
    content: [
      { text: '两个黄鹂鸣翠柳，', pinyin: 'liǎng gè huáng lí míng cuì liǔ,' },
      { text: '一行白鹭上青天。', pinyin: 'yī xíng bái lù shàng qīng tiān.' },
      { text: '窗含西岭千秋雪，', pinyin: 'chuāng hán xī lǐng qiān qiū xuě,' },
      { text: '门泊东吴万里船。', pinyin: 'mén bó dōng wú wàn lǐ chuán.' }
    ],
    illustrationSlot: 'jiushi'
  },
  {
    id: 'poem_xiaoer',
    title: '小儿垂钓',
    titlePinyin: 'xiǎo ér chuí diào',
    type: 'poem',
    example: '怕得鱼惊不应人',
    emoji: '🎣',
    difficulty: 2,
    minAge: 4,
    author: '胡令能',
    dynasty: '唐',
    region: '无',
    season: ['无特定'],
    themes: ['儿童', '田园', '垂钓'],
    scenery: ['水', '草地'],
    emotion: '趣味',
    form: '七言绝句',
    content: [
      { text: '蓬头稚子学垂纶，', pinyin: 'péng tóu zhì zǐ xué chuí lún,' },
      { text: '侧坐莓苔草映身。', pinyin: 'cè zuò méi tāi cǎo yìng shēn.' },
      { text: '路人借问遥招手，', pinyin: 'lù rén jiè wèn yáo zhāo shǒu,' },
      { text: '怕得鱼惊不应人。', pinyin: 'pà dé yú jīng bù yìng rén.' }
    ],
    illustrationSlot: 'xiaoer'
  },
  {
    id: 'idiom_duiniu',
    title: '对牛弹琴',
    titlePinyin: 'duì niú tán qín',
    type: 'idiom',
    example: '给牛弹琴',
    emoji: '🎻',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '古时候，有位很会弹琴的音乐家，名字叫公明仪。', pinyin: 'gǔ shí hòu, yǒu wèi hěn huì tán qín de yīn yuè jiā, míng zi jiào gōng míng yí.' },
      { text: '有一天，他看到田里有一头牛正在安静地吃草。', pinyin: 'yǒu yī tiān, tā kàn dào tián lǐ yǒu yī tóu niú zhèng zài ān jìng de chī cǎo.' },
      { text: '他忽然来了兴致，就坐下来给牛弹了一首非常高雅的曲子。', pinyin: 'tā hū rán lái le xìng zhì, jiù zuò xià lái gěi niú tán le yī shǒu fēi cháng gāo yǎ de qǔ zi.' },
      { text: '牛却一点反应也没有，还是低着头慢慢吃草。', pinyin: 'niú què yī diǎn fǎn yìng yě méi yǒu, hái shì dī zhe tóu màn màn chī cǎo.' },
      { text: '公明仪这才明白，不是自己的琴弹得不好，而是牛根本听不懂。', pinyin: 'gōng míng yí zhè cái míng bái, bú shì zì jǐ de qín tán de bù hǎo, ér shì niú gēn běn tīng bù dǒng.' },
      { text: '这个成语比喻对不懂道理的人讲深奥的道理，效果很差。', pinyin: 'zhè ge chéng yǔ bǐ yù duì bù dǒng dào lǐ de rén jiǎng shēn ào de dào lǐ, xiào guǒ hěn chà.' }
    ],
    illustrationSlot: 'duiniu'
  },
  {
    id: 'idiom_manyouyu',
    title: '滥竽充数',
    titlePinyin: 'làn yú chōng shù',
    type: 'idiom',
    example: '南郭先生吹竽',
    emoji: '🎵',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '战国时期，齐宣王非常喜欢听竽演奏，每次要三百人一起吹。', pinyin: 'zhàn guó shí qī, qí xuān wáng fēi cháng xǐ huan tīng yú yǎn zòu, měi cì yào sān bǎi rén yī qǐ chuī.' },
      { text: '有个叫南郭的人，根本不会吹竽，却混进了乐队。', pinyin: 'yǒu gè jiào nán guō de rén, gēn běn bù huì chuī yú, què hùn jìn le yuè duì.' },
      { text: '每次演奏，他就装模作样地鼓起腮帮子，混在人群里充数。', pinyin: 'měi cì yǎn zòu, tā jiù zhuāng mú zuò yàng de gǔ qǐ sāi bāng zi, hùn zài rén qún lǐ chōng shù.' },
      { text: '就这样，他领了很多年的薪水，什么都没有学会。', pinyin: 'jiù zhè yàng, tā lǐng le hěn duō nián de xīn shuǐ, shén me dōu méi yǒu xué huì.' },
      { text: '后来，齐宣王去世了，齐湣王继位。', pinyin: 'hòu lái, qí xuān wáng qù shì le, qí mǐn wáng jì wèi.' },
      { text: '齐湣王喜欢听独奏，要每个人轮流吹竽给他听。', pinyin: 'qí mǐn wáng xǐ huan tīng dú zòu, yào měi gè rén lún liú chuī yú gěi tā tīng.' },
      { text: '南郭先生知道再也混不下去了，只好偷偷地逃跑了。', pinyin: 'nán guō xiān sheng zhī dào zài yě hùn bù xià qù le, zhǐ hǎo tōu tōu de táo pǎo le.' },
      { text: '这个故事告诉我们，学习要扎实，不能弄虚作假。', pinyin: 'zhè ge gù shì gào sù wǒ men, xué xí yào zhā shí, bù néng nòng xū zuò jiǎ.' }
    ],
    illustrationSlot: 'manyouyu'
  },
  {
    id: 'story_bianque',
    title: '扁鹊行医',
    titlePinyin: 'biǎn què xíng yī',
    type: 'history',
    example: '扁鹊为病人看病',
    emoji: '⚕️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '春秋战国时期，有位名医叫扁鹊，医术非常高明。', pinyin: 'chūn qiū zhàn guó shí qī, yǒu wèi míng yī jiào biǎn què, yī shù fēi cháng gāo míng.' },
      { text: '有一天，扁鹊拜见蔡桓公，看了一眼说："您皮肤上有些小病，要及早治疗。"', pinyin: 'yǒu yī tiān, biǎn què bài jiàn cài huán gōng, kàn le yī yǎn shuō: "nín pí fū shàng yǒu xiē xiǎo bìng, yào jí zǎo zhì liáo."' },
      { text: '蔡桓公摆摆手说："我没有病。"', pinyin: 'cài huán gōng bǎi bǎi shǒu shuō: "wǒ méi yǒu bìng."' },
      { text: '过了几天，扁鹊再见蔡桓公说："病已经到了肌肉里，要赶快治！"', pinyin: 'guò le jǐ tiān, biǎn què zài jiàn cài huán gōng shuō: "bìng yǐ jīng dào le jī ròu lǐ, yào gǎn kuài zhì!"' },
      { text: '蔡桓公还是不相信，扁鹊只好告退。', pinyin: 'cài huán gōng hái shi bù xiāng xìn, biǎn què zhǐ hǎo gào tuì.' },
      { text: '又过了几天，扁鹊一见蔡桓公，转身就走，什么也没说。', pinyin: 'yòu guò le jǐ tiān, biǎn què yī jiàn cài huán gōng, zhuǎn shēn jiù zǒu, shén me yě méi shuō.' },
      { text: '蔡桓公派人去问，扁鹊说："病已经深入骨髓，无法医治了。"', pinyin: 'cài huán gōng pài rén qù wèn, biǎn què shuō: "bìng yǐ jīng shēn rù gǔ suǐ, wú fǎ yī zhì le."' },
      { text: '不久，蔡桓公果然病重去世。这个故事告诉我们，有问题要及早解决。', pinyin: 'bù jiǔ, cài huán gōng guǒ rán bìng zhòng qù shì. zhè ge gù shì gào sù wǒ men, yǒu wèn tí yào jí zǎo jiě jué.' }
    ],
    illustrationSlot: 'bianque'
  },
  {
    id: 'story_wangxizhi',
    title: '王羲之练字',
    titlePinyin: 'wáng xī zhī liàn zì',
    type: 'history',
    example: '王羲之苦练书法',
    emoji: '✍️',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '东晋时期，有个大书法家叫王羲之，他的字写得非常漂亮。', pinyin: 'dōng jìn shí qī, yǒu gè dà shū fǎ jiā jiào wáng xī zhī, tā de zì xiě de fēi cháng piāo liang.' },
      { text: '王羲之小时候，每天苦练书法，废寝忘食。', pinyin: 'wáng xī zhī xiǎo shí hòu, měi tiān kǔ liàn shū fǎ, fèi qǐn wàng shí.' },
      { text: '他经常在水池边练字，练完了就在池里洗笔。', pinyin: 'tā jīng cháng zài shuǐ chí biān liàn zì, liàn wán le jiù zài chí lǐ xǐ bǐ.' },
      { text: '日复一日，池里的水都被墨汁染黑了，这就是著名的"墨池"。', pinyin: 'rì fù yī rì, chí lǐ de shuǐ dōu bèi mò zhī rǎn hēi le, zhè jiù shì zhù míng de "mò chí".' },
      { text: '王羲之七岁就能写一手好字，长大后更是成为有名的书法家。', pinyin: 'wáng xī zhī qī suì jiù néng xiě yī shǒu hǎo zì, zhǎng dà hòu gèng shì chéng wéi yǒu míng de shū fǎ jiā.' },
      { text: '他的《兰亭序》被誉为"天下第一行书"。', pinyin: 'tā de "lán tíng xù" bèi yù wéi "tiān xià dì yī xíng shū".' },
      { text: '王羲之的故事告诉我们，只有勤奋努力，才能成就一番事业。', pinyin: 'wáng xī zhī de gù shì gào sù wǒ men, zhǐ yǒu qín fèn nǔ lì, cái néng chéng jiù yī fān shì yè.' }
    ],
    illustrationSlot: 'wangxizhi'
  },
  {
    id: 'myth_gonggong',
    title: '共工触山',
    titlePinyin: 'gòng gōng chù shān',
    type: 'myth',
    example: '共工怒触不周山',
    emoji: '🏔️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '很久以前，水神共工和火神祝融争夺天下。', pinyin: 'hěn jiǔ yǐ qián, shuǐ shén gòng gōng hé huǒ shén zhù róng zhēng duó tiān xià.' },
      { text: '两人大战了很久，共工最终落败。', pinyin: 'liǎng rén dà zhàn le hěn jiǔ, gòng gōng zuì zhōng luò bài.' },
      { text: '共工又气又恨，一头撞向了支撑天地的不周山。', pinyin: 'gòng gōng yòu qì yòu hèn, yī tóu zhuàng xiàng le zhī chēng tiān dì de bù zhōu shān.' },
      { text: '不周山被撞断了，天空向西北方向倾斜，大地向东南方向塌陷。', pinyin: 'bù zhōu shān bèi zhuàng duàn le, tiān kōng xiàng xī běi fāng xiàng qīng xié, dà dì xiàng dōng nán fāng xiàng tā xiàn.' },
      { text: '天上出现了大窟窿，地上到处是洪水。', pinyin: 'tiān shàng chū xiàn le dà kū long, dì shàng dào chù shì hóng shuǐ.' },
      { text: '女娲看见百姓受苦，炼了五色石把天上的窟窿补好了。', pinyin: 'nǚ wā kàn jiàn bǎi xìng shòu kǔ, liàn le wǔ sè shí bǎ tiān shàng de kū long bǔ hǎo le.' },
      { text: '这个故事解释了为什么太阳月亮都从东方升起，向西方落下。', pinyin: 'zhè ge gù shì jiě shì le wèi shí me tài yáng yuè liàng dōu cóng dōng fāng shēng qǐ, xiàng xī fāng luò xià.' }
    ],
    illustrationSlot: 'gonggong'
  },
  {
    id: 'poem_fengqiao',
    title: '枫桥夜泊',
    titlePinyin: 'fēng qiáo yè bó',
    type: 'poem',
    example: '夜半钟声到客船',
    emoji: '🛶',
    difficulty: 2,
    minAge: 5,
    author: '张继',
    dynasty: '唐',
    content: [
      { text: '月落乌啼霜满天，', pinyin: 'yuè luò wū tí shuāng mǎn tiān,' },
      { text: '江枫渔火对愁眠。', pinyin: 'jiāng fēng yú huǒ duì chóu mián.' },
      { text: '姑苏城外寒山寺，', pinyin: 'gū sū chéng wài hán shān sì,' },
      { text: '夜半钟声到客船。', pinyin: 'yè bàn zhōng shēng dào kè chuán.' }
    ],
    illustrationSlot: 'fengqiao'
  },
  {
    id: 'idiom_wutuye',
    title: '亡羊补牢',
    titlePinyin: 'wáng yáng bǔ láo',
    type: 'idiom',
    example: '丢了羊再修羊圈',
    emoji: '🐑',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '从前有个牧羊人，他有一个羊圈，里面养了许多只羊。', pinyin: 'cóng qián yǒu gè mù yáng rén, tā yǒu yī gè yáng juàn, lǐ miàn yǎng le xǔ duō zhī yáng.' },
      { text: '有一天，他发现羊圈破了一个洞，有只羊不见了。', pinyin: 'yǒu yī tiān, tā fā xiàn yáng juàn pò le yī gè dòng, yǒu zhī yáng bù jiàn le.' },
      { text: '邻居劝他说："快把羊圈修好吧，不然还会丢羊的。"', pinyin: 'lín jū quàn tā shuō: "kuài bǎ yáng juàn xiū hǎo ba, bù rán hái huì diū yáng de."' },
      { text: '牧羊人说："羊已经丢了，还修羊圈有什么用？"', pinyin: 'mù yáng rén shuō: "yáng yǐ jīng diū le, hái xiū yáng juàn yǒu shén me yòng?"' },
      { text: '第二天早上，他又发现少了一只羊。', pinyin: 'dì èr tiān zǎo shàng, tā yòu fā xiàn shǎo le yī zhī yáng.' },
      { text: '这回他后悔了，赶快把羊圈修好了。', pinyin: 'zhè huí tā hòu huǐ le, gǎn kuài bǎ yáng juàn xiū hǎo le.' },
      { text: '从那以后，他再也没有丢过羊。', pinyin: 'cóng nà yǐ hòu, tā zài yě méi yǒu diū guò yáng.' },
      { text: '这个故事告诉我们，出了问题要及时改正，还不算太晚。', pinyin: 'zhè ge gù shì gào sù wǒ men, chū le wèn tí yào jí shí gǎi zhèng, hái bù suàn tài wǎn.' }
    ],
    illustrationSlot: 'wutuye'
  },
  {
    id: 'fable_crow',
    title: '乌鸦喝水',
    titlePinyin: 'wū yā hē shuǐ',
    type: 'fable',
    example: '乌鸦用石子喝到水',
    emoji: '🐦',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只乌鸦口渴了，到处找水喝。', pinyin: 'yī zhī wū yā kǒu kě le, dào chù zhǎo shuǐ hē.' },
      { text: '它找到了一个瓶子，瓶子里有一些水。', pinyin: 'tā zhǎo dào le yī gè píng zi, píng zi lǐ yǒu yī xiē shuǐ.' },
      { text: '可是瓶子太高了，乌鸦的嘴够不到里面的水。', pinyin: 'kě shì píng zi tài gāo le, wū yā de zuǐ gòu bù dào lǐ miàn de shuǐ.' },
      { text: '乌鸦想了想，找来了很多小石子。', pinyin: 'wū yā xiǎng le xiǎng, zhǎo lái le hěn duō xiǎo shí zi.' },
      { text: '它一颗一颗地把石子放进瓶子里。', pinyin: 'tā yī kē yī kē de bǎ shí zi fàng jìn píng zi lǐ.' },
      { text: '瓶子里的水慢慢升高了，乌鸦终于喝到了水。', pinyin: 'píng zi lǐ de shuǐ màn màn shēng gāo le, wū yā zhōng yú hē dào le shuǐ.' },
      { text: '这个故事告诉我们，遇到困难要动脑筋，办法总比困难多。', pinyin: 'zhè ge gù shì gào sù wǒ men, yù dào kùn nán yào dòng nǎo jīn, bàn fǎ zǒng bǐ kùn nán duō.' }
    ],
    illustrationSlot: 'crow'
  },
  {
    id: 'fable_fox_grapes',
    title: '狐狸和葡萄',
    titlePinyin: 'hú lí hé pú tao',
    type: 'fable',
    example: '狐狸说葡萄是酸的',
    emoji: '🍇',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只狐狸走在路上，看见树上挂着一串串鲜嫩的葡萄。', pinyin: 'yī zhī hú lí zǒu zài lù shàng, kàn jiàn shù shàng guà zhe yī chuàn chuàn xiān nèn de pú tao.' },
      { text: '葡萄颗粒饱满，紫色的皮看起来非常甜。', pinyin: 'pú tao kē lì bǎo mǎn, zǐ sè de pí kàn qǐ lái fēi cháng tián.' },
      { text: '狐狸馋得流口水，跳起来想摘葡萄。', pinyin: 'hú lí chán de liú kǒu shuǐ, tiào qǐ lái xiǎng zhāi pú tao.' },
      { text: '可是葡萄挂得太高了，狐狸跳了好几次都摘不到。', pinyin: 'kě shì pú tao guà de tài gāo le, hú lí tiào le hǎo jǐ cì dōu zhāi bù dào.' },
      { text: '狐狸累了，停下来，看了看葡萄，甩甩尾巴走了。', pinyin: 'hú lí lèi le, tíng xià lái, kàn le kàn pú tao, shuǎi shuǎi wěi bā zǒu le.' },
      { text: '它一边走一边说："那些葡萄肯定是酸的，不好吃！"', pinyin: 'tā yī biān zǒu yī biān shuō: "nà xiē pú tao kěn dìng shì suān de, bù hǎo chī!"' },
      { text: '这个故事告诉我们，做不到的事情不要找借口。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò bù dào de shì qíng bù yào zhǎo jiè kǒu.' }
    ],
    illustrationSlot: 'fox_grapes'
  },
  {
    id: 'fable_tortoise_hare',
    title: '龟兔赛跑',
    titlePinyin: 'guī tù sài pǎo',
    type: 'fable',
    example: '乌龟和兔子赛跑',
    emoji: '🐢',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '乌龟和兔子决定举行一场赛跑。', pinyin: 'wū guī hé tù zǐ jué dìng jǔ xíng yī chǎng sài pǎo.' },
      { text: '比赛开始了，兔子飞快地跑在前面。', pinyin: 'bǐ sài kāi shǐ le, tù zǐ fēi kuài de pǎo zài qián miàn.' },
      { text: '回头一看，乌龟还在很远的地方慢慢爬着。', pinyin: 'huí tóu yī kàn, wū guī hái zài hěn yuǎn de dì fāng màn màn pá zhe.' },
      { text: '兔子觉得自己肯定能赢，就在树荫下躺下来睡觉。', pinyin: 'tù zǐ jué de zì jǐ kěn dìng néng yíng, jiù zài shù yīn xià tǎng xià lái shuì jiào.' },
      { text: '乌龟一步一步，坚持不懈地往前爬，从不停下来。', pinyin: 'wū guī yī bù yī bù, jiān chí bù xiè de wǎng qián pá, cóng bù tíng xià lái.' },
      { text: '当兔子一觉醒来，乌龟已经爬过了终点线。', pinyin: 'dāng tù zǐ yī jiào xǐng lái, wū guī yǐ jīng pá guò le zhōng diǎn xiàn.' },
      { text: '这个故事告诉我们，骄傲使人落后，坚持才能胜利。', pinyin: 'zhè ge gù shì gào sù wǒ men, jiāo ào shǐ rén luò hòu, jiān chí cái néng shèng lì.' }
    ],
    illustrationSlot: 'tortoise_hare'
  },
  {
    id: 'fable_lion_mouse',
    title: '狮子和老鼠',
    titlePinyin: 'shī zi hé lǎo shǔ',
    type: 'fable',
    example: '小老鼠救了大狮子',
    emoji: '🦁',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只狮子正在睡觉，一只小老鼠不小心从它脸上跑过。', pinyin: 'yī zhī shī zi zhèng zài shuì jiào, yī zhī xiǎo lǎo shǔ bù xiǎo xīn cóng tā liǎn shàng pǎo guò.' },
      { text: '狮子醒来，一把抓住了老鼠，准备把它吃掉。', pinyin: 'shī zi xǐng lái, yī bǎ zhuā zhù le lǎo shǔ, zhǔn bèi bǎ tā chī diào.' },
      { text: '老鼠拼命地求饶："请放了我吧，将来我一定会报答你！"', pinyin: 'lǎo shǔ pīn mìng de qiú ráo: "qǐng fàng le wǒ ba, jiāng lái wǒ yī dìng huì bào dá nǐ!"' },
      { text: '狮子听了，哈哈大笑，心想小老鼠能帮什么忙，就放了它。', pinyin: 'shī zi tīng le, hā hā dà xiào, xīn xiǎng xiǎo lǎo shǔ néng bāng shén me máng, jiù fàng le tā.' },
      { text: '有一天，狮子被猎人的网困住了，怎么也挣脱不了。', pinyin: 'yǒu yī tiān, shī zi bèi liè rén de wǎng kùn zhù le, zěn me yě zhēng tuō bù liǎo.' },
      { text: '小老鼠听到狮子的叫声，跑来用牙齿咬断了网绳，救了狮子。', pinyin: 'xiǎo lǎo shǔ tīng dào shī zi de jiào shēng, pǎo lái yòng yá chǐ yǎo duàn le wǎng shéng, jiù le shī zi.' },
      { text: '这个故事告诉我们，不论大小，每个人都有自己的用处。', pinyin: 'zhè ge gù shì gào sù wǒ men, bù lùn dà xiǎo, měi gè rén dōu yǒu zì jǐ de yòng chù.' }
    ],
    illustrationSlot: 'lion_mouse'
  },
  {
    id: 'fable_shepherd_wolf',
    title: '狼来了',
    titlePinyin: 'láng lái le',
    type: 'fable',
    example: '放羊的孩子说谎',
    emoji: '🐺',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '山脚下住着一个放羊的孩子，每天上山放羊。', pinyin: 'shān jiǎo xià zhù zhe yī gè fàng yáng de hái zi, měi tiān shàng shān fàng yáng.' },
      { text: '有一天，他觉得很无聊，就大喊："狼来了！狼来了！"', pinyin: 'yǒu yī tiān, tā jué de hěn wú liáo, jiù dà hǎn: "láng lái le! láng lái le!"' },
      { text: '村民们听见了，拿着锄头和棍子跑上山来。', pinyin: 'cūn mín men tīng jiàn le, ná zhe chú tou hé gùn zi pǎo shàng shān lái.' },
      { text: '可是根本没有狼，孩子哈哈大笑，村民们很生气地走了。', pinyin: 'kě shì gēn běn méi yǒu láng, hái zi hā hā dà xiào, cūn mín men hěn shēng qì de zǒu le.' },
      { text: '他又骗了一次，村民们又白跑了一趟。', pinyin: 'tā yòu piàn le yī cì, cūn mín men yòu bái pǎo le yī tàng.' },
      { text: '后来，狼真的来了，孩子拼命大喊："狼来了！真的有狼！"', pinyin: 'hòu lái, láng zhēn de lái le, hái zi pīn mìng dà hǎn: "láng lái le! zhēn de yǒu láng!"' },
      { text: '但是没有人相信他，羊被狼叼走了。', pinyin: 'dàn shì méi yǒu rén xiāng xìn tā, yáng bèi láng diāo zǒu le.' },
      { text: '这个故事告诉我们，诚实是最重要的品质，撒谎的人最终不会被信任。', pinyin: 'zhè ge gù shì gào sù wǒ men, chéng shí shì zuì zhòng yào de pǐn zhì, sā huǎng de rén zuì zhōng bù huì bèi xìn rèn.' }
    ],
    illustrationSlot: 'shepherd_wolf'
  },
  {
    id: 'fable_ant_grasshopper',
    title: '蚂蚁和蚱蜢',
    titlePinyin: 'mǎ yǐ hé zhà měng',
    type: 'fable',
    example: '蚂蚁努力储粮过冬',
    emoji: '🐜',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '夏天里，蚂蚁们每天忙碌地搬运食物，储备过冬的粮食。', pinyin: 'xià tiān lǐ, mǎ yǐ men měi tiān máng lù de bān yùn shí wù, chǔ bèi guò dōng de liáng shí.' },
      { text: '蚱蜢看见了，大声说："现在是夏天，干嘛这么辛苦？来和我一起唱歌玩耍吧！"', pinyin: 'zhà měng kàn jiàn le, dà shēng shuō: "xiàn zài shì xià tiān, gàn ma zhè me xīn kǔ? lái hé wǒ yī qǐ chàng gē wán shuǎ ba!"' },
      { text: '蚂蚁摇摇头说："冬天快来了，我们要准备好食物。"', pinyin: 'mǎ yǐ yáo yao tóu shuō: "dōng tiān kuài lái le, wǒ men yào zhǔn bèi hǎo shí wù."' },
      { text: '蚱蜢不以为然，继续唱歌玩耍，快乐地度过了整个夏天。', pinyin: 'zhà měng bù yǐ wéi rán, jì xù chàng gē wán shuǎ, kuài lè de dù guò le zhěng gè xià tiān.' },
      { text: '冬天来了，雪花飘落，蚱蜢找不到任何食物，又冷又饿。', pinyin: 'dōng tiān lái le, xuě huā piāo luò, zhà měng zhǎo bù dào rèn hé shí wù, yòu lěng yòu è.' },
      { text: '它来到蚂蚁家门前请求帮助，蚂蚁们把它请进了温暖的家。', pinyin: 'tā lái dào mǎ yǐ jiā mén qián qǐng qiú bāng zhù, mǎ yǐ men bǎ tā qǐng jìn le wēn nuǎn de jiā.' },
      { text: '这个故事告诉我们，要有计划，未雨绸缪，不能只顾眼前享乐。', pinyin: 'zhè ge gù shì gào sù wǒ men, yào yǒu jì huà, wèi yǔ chóu móu, bù néng zhǐ gù yǎn qián xiǎng lè.' }
    ],
    illustrationSlot: 'ant_grasshopper'
  },

  // ── 神话故事 ──────────────────────────────────────────
  {
    id: 'myth_yellowemperor',
    title: '黄帝战蚩尤',
    titlePinyin: 'huáng dì zhàn chī yóu',
    type: 'myth',
    example: '黄帝与蚩尤大战',
    emoji: '⚔️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '远古时候，黄帝是各部落的首领，带领人们过着平静的生活。', pinyin: 'yuǎn gǔ shí hòu, huáng dì shì gè bù luò de shǒu lǐng, dài lǐng rén men guò zhe píng jìng de shēng huó.' },
      { text: '南方有个凶猛的部落首领叫蚩尤，他带兵打来，烧杀抢掠。', pinyin: 'nán fāng yǒu gè xiōng měng de bù luò shǒu lǐng jiào chī yóu, tā dài bīng dǎ lái, shāo shā qiǎng luě.' },
      { text: '黄帝召集各部落，组成联军，与蚩尤在涿鹿展开大战。', pinyin: 'huáng dì zhào jí gè bù luò, zǔ chéng lián jūn, yǔ chī yóu zài zhuō lù zhǎn kāi dà zhàn.' },
      { text: '蚩尤施展法术，呼风唤雨，大雾弥漫，联军迷失了方向。', pinyin: 'chī yóu shī zhǎn fǎ shù, hū fēng huàn yǔ, dà wù mí màn, lián jūn mí shī le fāng xiàng.' },
      { text: '黄帝发明了指南车，士兵们凭借它辨别方向，冲出了迷雾。', pinyin: 'huáng dì fā míng le zhǐ nán chē, shì bīng men píng jiè tā biàn bié fāng xiàng, chōng chū le mí wù.' },
      { text: '经过激烈的战斗，黄帝终于打败了蚩尤，天下重归太平。', pinyin: 'jīng guò jī liè de zhàn dòu, huáng dì zhōng yú dǎ bài le chī yóu, tiān xià chóng guī tài píng.' },
      { text: '黄帝统一了各部落，被尊为中华民族的始祖。', pinyin: 'huáng dì tǒng yī le gè bù luò, bèi zūn wéi zhōng huá mín zú de shǐ zǔ.' }
    ],
    illustrationSlot: 'yellowemperor'
  },
  {
    id: 'myth_fuxi',
    title: '伏羲创八卦',
    titlePinyin: 'fú xī chuàng bā guà',
    type: 'myth',
    example: '伏羲观天地创八卦',
    emoji: '☯️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '远古时候，有位圣人叫伏羲，他观察天地万物的变化规律。', pinyin: 'yuǎn gǔ shí hòu, yǒu wèi shèng rén jiào fú xī, tā guān chá tiān dì wàn wù de biàn huà guī lǜ.' },
      { text: '他仰观天象，俯察大地，研究飞禽走兽的足迹。', pinyin: 'tā yǎng guān tiān xiàng, fǔ chá dà dì, yán jiū fēi qín zǒu shòu de zú jì.' },
      { text: '有一天，一匹龙马从黄河里跳出来，背上有神奇的图案。', pinyin: 'yǒu yī tiān, yī pǐ lóng mǎ cóng huáng hé lǐ tiào chū lái, bèi shàng yǒu shén qí de tú àn.' },
      { text: '伏羲受到启发，用阴阳两种符号组合，创造出了八卦。', pinyin: 'fú xī shòu dào qǐ fā, yòng yīn yáng liǎng zhǒng fú hào zǔ hé, chuàng zào chū le bā guà.' },
      { text: '八卦代表了天、地、风、雷、水、火、山、泽八种自然现象。', pinyin: 'bā guà dài biǎo le tiān, dì, fēng, léi, shuǐ, huǒ, shān, zé bā zhǒng zì rán xiàn xiàng.' },
      { text: '伏羲还教人们结网捕鱼、驯养动物，让大家的生活越来越好。', pinyin: 'fú xī hái jiāo rén men jié wǎng bǔ yú, xùn yǎng dòng wù, ràng dà jiā de shēng huó yuè lái yuè hǎo.' }
    ],
    illustrationSlot: 'fuxi'
  },

  // ── 古诗 ─────────────────────────────────────────────
  {
    id: 'poem_wanglu',
    title: '望庐山瀑布',
    titlePinyin: 'wàng lú shān pù bù',
    type: 'poem',
    example: '飞流直下三千尺',
    emoji: '💧',
    difficulty: 1,
    minAge: 3,
    author: '李白',
    dynasty: '唐',
    region: '江西',
    season: ['无特定'],
    themes: ['山水', '瀑布', '壮观'],
    scenery: ['山', '瀑布', '云雾'],
    emotion: '赞叹',
    form: '七言绝句',
    content: [
      { text: '日照香炉生紫烟，', pinyin: 'rì zhào xiāng lú shēng zǐ yān,' },
      { text: '遥看瀑布挂前川。', pinyin: 'yáo kàn pù bù guà qián chuān.' },
      { text: '飞流直下三千尺，', pinyin: 'fēi liú zhí xià sān qiān chǐ,' },
      { text: '疑是银河落九天。', pinyin: 'yí shì yín hé luò jiǔ tiān.' }
    ],
    illustrationSlot: 'wanglu'
  },
  {
    id: 'poem_huidu',
    title: '回乡偶书',
    titlePinyin: 'huí xiāng ǒu shū',
    type: 'poem',
    example: '少小离家老大回',
    emoji: '🏠',
    difficulty: 2,
    minAge: 4,
    author: '贺知章',
    dynasty: '唐',
    region: '浙江',
    season: ['无特定'],
    themes: ['思乡', '归乡', '人生感慨'],
    scenery: ['故乡'],
    emotion: '感慨',
    form: '七言绝句',
    content: [
      { text: '少小离家老大回，', pinyin: 'shào xiǎo lí jiā lǎo dà huí,' },
      { text: '乡音无改鬓毛衰。', pinyin: 'xiāng yīn wú gǎi bìn máo shuāi.' },
      { text: '儿童相见不相识，', pinyin: 'ér tóng xiāng jiàn bù xiāng shí,' },
      { text: '笑问客从何处来。', pinyin: 'xiào wèn kè cóng hé chù lái.' }
    ],
    illustrationSlot: 'huidu'
  },
  {
    id: 'poem_chusai',
    title: '出塞',
    titlePinyin: 'chū sài',
    type: 'poem',
    example: '但使龙城飞将在',
    emoji: '🏯',
    difficulty: 2,
    minAge: 5,
    author: '王昌龄',
    dynasty: '唐',
    region: '西北边塞',
    season: ['无特定'],
    themes: ['边塞', '爱国', '战争', '英雄'],
    scenery: ['月', '边关'],
    emotion: '豪迈',
    form: '七言绝句',
    content: [
      { text: '秦时明月汉时关，', pinyin: 'qín shí míng yuè hàn shí guān,' },
      { text: '万里长征人未还。', pinyin: 'wàn lǐ cháng zhēng rén wèi huán.' },
      { text: '但使龙城飞将在，', pinyin: 'dàn shǐ lóng chéng fēi jiàng zài,' },
      { text: '不教胡马度阴山。', pinyin: 'bù jiào hú mǎ dù yīn shān.' }
    ],
    illustrationSlot: 'chusai'
  },
  {
    id: 'poem_jiangxue',
    title: '江雪',
    titlePinyin: 'jiāng xuě',
    type: 'poem',
    example: '独钓寒江雪',
    emoji: '❄️',
    difficulty: 2,
    minAge: 4,
    author: '柳宗元',
    dynasty: '唐',
    region: '湖南',
    season: ['冬'],
    themes: ['雪景', '孤独', '隐逸'],
    scenery: ['山', '雪', '江', '渔舟'],
    emotion: '孤独',
    form: '五言绝句',
    content: [
      { text: '千山鸟飞绝，', pinyin: 'qiān shān niǎo fēi jué,' },
      { text: '万径人踪灭。', pinyin: 'wàn jìng rén zōng miè.' },
      { text: '孤舟蓑笠翁，', pinyin: 'gū zhōu suō lì wēng,' },
      { text: '独钓寒江雪。', pinyin: 'dú diào hán jiāng xuě.' }
    ],
    illustrationSlot: 'jiangxue'
  },

  // ── 成语故事 ─────────────────────────────────────────
  {
    id: 'idiom_kegouchengzhou',
    title: '刻舟求剑',
    titlePinyin: 'kè zhōu qiú jiàn',
    type: 'idiom',
    example: '在船上刻记号找剑',
    emoji: '⚓',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '战国时期，楚国有个人坐船过江，不小心把宝剑掉进了江里。', pinyin: 'zhàn guó shí qī, chǔ guó yǒu gè rén zuò chuán guò jiāng, bù xiǎo xīn bǎ bǎo jiàn diào jìn le jiāng lǐ.' },
      { text: '别人都很着急，让他赶快跳下去捞剑。', pinyin: 'bié rén dōu hěn zháo jí, ràng tā gǎn kuài tiào xià qù lāo jiàn.' },
      { text: '可是他不慌不忙，从腰里取出小刀，在船舷上刻了个记号。', pinyin: 'kě shì tā bù huāng bù máng, cóng yāo lǐ qǔ chū xiǎo dāo, zài chuán xián shàng kè le gè jì hào.' },
      { text: '他说："这是剑掉下去的地方，我记下来了。"', pinyin: 'tā shuō: "zhè shì jiàn diào xià qù de dì fāng, wǒ jì xià lái le."' },
      { text: '船靠岸了，他沿着记号跳进水里找剑，怎么找也找不到。', pinyin: 'chuán kào àn le, tā yán zhe jì hào tiào jìn shuǐ lǐ zhǎo jiàn, zěn me zhǎo yě zhǎo bù dào.' },
      { text: '船已经走了很远，而剑还在原来的地方沉着呢。', pinyin: 'chuán yǐ jīng zǒu le hěn yuǎn, ér jiàn hái zài yuán lái de dì fāng chén zhe ne.' },
      { text: '这个故事告诉我们，世界在变化，做事要灵活，不能死守老办法。', pinyin: 'zhè ge gù shì gào sù wǒ men, shì jiè zài biàn huà, zuò shì yào líng huó, bù néng sǐ shǒu lǎo bàn fǎ.' }
    ],
    illustrationSlot: 'kegouchengzhou'
  },
  {
    id: 'idiom_huatu',
    title: '画蛇添足',
    titlePinyin: 'huà shé tiān zú',
    type: 'idiom',
    example: '多此一举给蛇画脚',
    emoji: '🐍',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '古时候，有人祭祀完毕，拿出一壶酒赏给几个门客。', pinyin: 'gǔ shí hòu, yǒu rén jì sì wán bì, ná chū yī hú jiǔ shǎng gěi jǐ gè mén kè.' },
      { text: '门客们商量：酒只有一壶，大家喝不够，不如比赛画蛇，谁先画完谁喝。', pinyin: 'mén kè men shāng liàng: jiǔ zhǐ yǒu yī hú, dà jiā hē bù gòu, bù rú bǐ sài huà shé, shuí xiān huà wán shuí hē.' },
      { text: '有人很快就画完了蛇，拿起酒壶正要喝。', pinyin: 'yǒu rén hěn kuài jiù huà wán le shé, ná qǐ jiǔ hú zhèng yào hē.' },
      { text: '他看别人还没画完，便得意地说："我再给蛇添上几只脚吧！"', pinyin: 'tā kàn bié rén hái méi huà wán, biàn dé yì de shuō: "wǒ zài gěi shé tiān shàng jǐ zhī jiǎo ba!"' },
      { text: '就在他画脚的时候，另一个人也画好了蛇，夺过酒壶喝了起来。', pinyin: 'jiù zài tā huà jiǎo de shí hòu, lìng yī gè rén yě huà hǎo le shé, duó guò jiǔ hú hē le qǐ lái.' },
      { text: '那人说："蛇本来没有脚，你画的不是蛇！"', pinyin: 'nà rén shuō: "shé běn lái méi yǒu jiǎo, nǐ huà de bù shì shé!"' },
      { text: '这个故事告诉我们，做事要恰到好处，多此一举只会坏事。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào qià dào hǎo chù, duō cǐ yī jǔ zhǐ huì huài shì.' }
    ],
    illustrationSlot: 'huatu'
  },
  {
    id: 'idiom_dongshi',
    title: '东施效颦',
    titlePinyin: 'dōng shī xiào pín',
    type: 'idiom',
    example: '东施模仿西施皱眉',
    emoji: '🪞',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '春秋时期，越国有个大美女叫西施，她有心口疼的毛病。', pinyin: 'chūn qiū shí qī, yuè guó yǒu gè dà měi nǚ jiào xī shī, tā yǒu xīn kǒu téng de máo bìng.' },
      { text: '每当心疼时，西施就微微皱起眉头，反而显得更加美丽动人。', pinyin: 'měi dāng xīn téng shí, xī shī jiù wēi wēi zhòu qǐ méi tóu, fǎn ér xiǎn de gèng jiā měi lì dòng rén.' },
      { text: '村里有个相貌普通的女子叫东施，她看见西施皱眉很美。', pinyin: 'cūn lǐ yǒu gè xiàng mào pǔ tōng de nǚ zǐ jiào dōng shī, tā kàn jiàn xī shī zhòu méi hěn měi.' },
      { text: '于是她也学着捂住胸口，皱眉蹙额，在村里走来走去。', pinyin: 'yú shì tā yě xué zhe wǔ zhù xiōng kǒu, zhòu méi cù é, zài cūn lǐ zǒu lái zǒu qù.' },
      { text: '村里的人们看见她这副样子，都躲得远远的。', pinyin: 'cūn lǐ de rén men kàn jiàn tā zhè fù yàng zi, dōu duǒ de yuǎn yuǎn de.' },
      { text: '这个故事告诉我们，做事要根据自身实际，盲目模仿反而会弄巧成拙。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào gēn jù zì shēn shí jì, máng mù mó fǎng fǎn ér huì nòng qiǎo chéng zhuō.' }
    ],
    illustrationSlot: 'dongshi'
  },

  // ── 历史典故 ─────────────────────────────────────────
  {
    id: 'history_zhugeliang',
    title: '诸葛亮借箭',
    titlePinyin: 'zhū gě liàng jiè jiàn',
    type: 'history',
    example: '草船借箭十万支',
    emoji: '🏹',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '三国时期，诸葛亮和周瑜共同抗曹。', pinyin: 'sān guó shí qī, zhū gě liàng hé zhōu yú gòng tóng kàng cáo.' },
      { text: '周瑜要诸葛亮在十天内造出十万支箭，想借机除掉他。', pinyin: 'zhōu yú yào zhū gě liàng zài shí tiān nèi zào chū shí wàn zhī jiàn, xiǎng jiè jī chú diào tā.' },
      { text: '诸葛亮笑着说："不需要十天，三天就够了。"', pinyin: 'zhū gě liàng xiào zhe shuō: "bù xū yào shí tiān, sān tiān jiù gòu le."' },
      { text: '第三天夜里，大雾弥漫，诸葛亮命人把二十条船用绳子连起来，开向曹营。', pinyin: 'dì sān tiān yè lǐ, dà wù mí màn, zhū gě liàng mìng rén bǎ èr shí tiáo chuán yòng shéng zi lián qǐ lái, kāi xiàng cáo yíng.' },
      { text: '曹操见大雾中有船靠近，命令士兵放箭。', pinyin: 'cáo cāo jiàn dà wù zhōng yǒu chuán kào jìn, mìng lìng shì bīng fàng jiàn.' },
      { text: '箭像雨点一样射在稻草人身上，船两侧都插满了箭。', pinyin: 'jiàn xiàng yǔ diǎn yī yàng shè zài dào cǎo rén shēn shàng, chuán liǎng cè dōu chā mǎn le jiàn.' },
      { text: '天亮后，诸葛亮收到了十万多支箭，周瑜惊叹：此人真乃神人也！', pinyin: 'tiān liàng hòu, zhū gě liàng shōu dào le shí wàn duō zhī jiàn, zhōu yú jīng tàn: cǐ rén zhēn nǎi shén rén yě!' }
    ],
    illustrationSlot: 'zhugeliang'
  },
  {
    id: 'history_hanxin',
    title: '韩信胯下之辱',
    titlePinyin: 'hán xìn kuà xià zhī rǔ',
    type: 'history',
    example: '韩信忍辱负重终成大将',
    emoji: '🏅',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '楚汉相争时期，有个年轻人叫韩信，胸怀大志，但家境贫寒。', pinyin: 'chǔ hàn xiāng zhēng shí qī, yǒu gè nián qīng rén jiào hán xìn, xiōng huái dà zhì, dàn jiā jìng pín hán.' },
      { text: '有一天，一个地痞拦住韩信，嘲笑他腰间总挂着宝剑。', pinyin: 'yǒu yī tiān, yī gè dì pǐ lán zhù hán xìn, cháo xiào tā yāo jiān zǒng guà zhe bǎo jiàn.' },
      { text: '地痞说："你要么用剑刺我，要么就从我裤裆下钻过去！"', pinyin: 'dì pǐ shuō: "nǐ yào me yòng jiàn cì wǒ, yào me jiù cóng wǒ kù dāng xià zuān guò qù!"' },
      { text: '韩信忍住怒火，弯下腰，从地痞的裤裆下钻了过去。', pinyin: 'hán xìn rěn zhù nù huǒ, wān xià yāo, cóng dì pǐ de kù dāng xià zuān le guò qù.' },
      { text: '众人哄堂大笑，韩信默默地走开了，心中立下报国大志。', pinyin: 'zhòng rén hōng táng dà xiào, hán xìn mò mò de zǒu kāi le, xīn zhōng lì xià bào guó dà zhì.' },
      { text: '后来，韩信辅佐刘邦，成为战无不胜的大将军，建立了赫赫战功。', pinyin: 'hòu lái, hán xìn fǔ zuǒ liú bāng, chéng wéi zhàn wú bù shèng de dà jiāng jūn, jiàn lì le hè hè zhàn gōng.' },
      { text: '这个故事告诉我们，有大志向的人能忍常人所不能忍，方成大事。', pinyin: 'zhè ge gù shì gào sù wǒ men, yǒu dà zhì xiàng de rén néng rěn cháng rén suǒ bù néng rěn, fāng chéng dà shì.' }
    ],
    illustrationSlot: 'hanxin'
  },
  {
    id: 'history_wuzetian',
    title: '武则天读书',
    titlePinyin: 'wǔ zé tiān dú shū',
    type: 'history',
    example: '武则天勤奋读书学文',
    emoji: '📖',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '唐朝有个聪明的女孩叫武则天，她从小就喜欢读书。', pinyin: 'táng cháo yǒu gè cōng míng de nǚ hái jiào wǔ zé tiān, tā cóng xiǎo jiù xǐ huan dú shū.' },
      { text: '她每天刻苦学习，读了很多书，懂得了许多道理。', pinyin: 'tā měi tiān kè kǔ xué xí, dú le hěn duō shū, dǒng de le xǔ duō dào lǐ.' },
      { text: '武则天不仅学文章，还学习历史、诗词和治国之道。', pinyin: 'wǔ zé tiān bù jǐn xué wén zhāng, hái xué xí lì shǐ, shī cí hé zhì guó zhī dào.' },
      { text: '她的才学让很多人都佩服，大家都称她聪明过人。', pinyin: 'tā de cái xué ràng hěn duō rén dōu pèi fú, dà jiā dōu chēng tā cōng míng guò rén.' },
      { text: '武则天长大后，以出众的才智处理国家大事，造福了百姓。', pinyin: 'wǔ zé tiān zhǎng dà hòu, yǐ chū zhòng de cái zhì chǔ lǐ guó jiā dà shì, zào fú le bǎi xìng.' },
      { text: '这个故事告诉我们，从小爱读书、勤奋学习，长大才能有所作为。', pinyin: 'zhè ge gù shì gào sù wǒ men, cóng xiǎo ài dú shū, qín fèn xué xí, zhǎng dà cái néng yǒu suǒ zuò wéi.' }
    ],
    illustrationSlot: 'wuzetian'
  },

  // ── 寓言故事 ─────────────────────────────────────────
  {
    id: 'fable_dog_shadow',
    title: '狗和影子',
    titlePinyin: 'gǒu hé yǐng zi',
    type: 'fable',
    example: '狗因贪心失去肉骨头',
    emoji: '🐕',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只狗衔着一块骨头，高兴地走在回家的路上。', pinyin: 'yī zhī gǒu xián zhe yī kuài gǔ tou, gāo xìng de zǒu zài huí jiā de lù shàng.' },
      { text: '走到一座小桥上，它向下一看，发现水里也有一只狗叼着骨头。', pinyin: 'zǒu dào yī zuò xiǎo qiáo shàng, tā xiàng xià yī kàn, fā xiàn shuǐ lǐ yě yǒu yī zhī gǒu diāo zhe gǔ tou.' },
      { text: '那块骨头看起来比自己的更大！狗心生贪念，想把那块骨头也抢来。', pinyin: 'nà kuài gǔ tou kàn qǐ lái bǐ zì jǐ de gèng dà! gǒu xīn shēng tān niàn, xiǎng bǎ nà kuài gǔ tou yě qiǎng lái.' },
      { text: '它张开嘴大叫一声，自己嘴里的骨头掉进了河里。', pinyin: 'tā zhāng kāi zuǐ dà jiào yī shēng, zì jǐ zuǐ lǐ de gǔ tou diào jìn le hé lǐ.' },
      { text: '水里的"狗"和"骨头"原来只是它自己的影子！', pinyin: 'shuǐ lǐ de "gǒu" hé "gǔ tou" yuán lái zhǐ shì tā zì jǐ de yǐng zi!' },
      { text: '狗望着水里空空的倒影，只能垂头丧气地回家了。', pinyin: 'gǒu wàng zhe shuǐ lǐ kōng kōng de dào yǐng, zhǐ néng chuí tóu sàng qì de huí jiā le.' },
      { text: '这个故事告诉我们，贪心的人往往连已有的东西也会失去。', pinyin: 'zhè ge gù shì gào sù wǒ men, tān xīn de rén wǎng wǎng lián yǐ yǒu de dōng xi yě huì shī qù.' }
    ],
    illustrationSlot: 'dog_shadow'
  },
  {
    id: 'fable_north_wind_sun',
    title: '北风和太阳',
    titlePinyin: 'běi fēng hé tài yáng',
    type: 'fable',
    example: '太阳用温暖胜过北风',
    emoji: '☀️',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '北风和太阳争论谁的力量更大，决定比一比谁能让行人脱下外套。', pinyin: 'běi fēng hé tài yáng zhēng lùn shuí de lì liàng gèng dà, jué dìng bǐ yi bǐ shuí néng ràng xíng rén tuō xià wài tào.' },
      { text: '北风先来，使劲吹着呼呼的寒风。', pinyin: 'běi fēng xiān lái, shǐ jìn chuī zhe hū hū de hán fēng.' },
      { text: '行人冷得直哆嗦，把外套裹得更紧了。', pinyin: 'xíng rén lěng de zhí duō suo, bǎ wài tào guǒ de gèng jǐn le.' },
      { text: '北风越吹越猛，行人却把衣服扣得更紧，怎么也不肯脱。', pinyin: 'běi fēng yuè chuī yuè měng, xíng rén què bǎ yī fú kòu de gèng jǐn, zěn me yě bù kěn tuō.' },
      { text: '轮到太阳了，它温暖地照耀着大地。', pinyin: 'lún dào tài yáng le, tā wēn nuǎn de zhào yào zhe dà dì.' },
      { text: '行人感到暖和，慢慢地解开了外套，最后把外套脱了下来。', pinyin: 'xíng rén gǎn dào nuǎn huo, màn màn de jiě kāi le wài tào, zuì hòu bǎ wài tào tuō le xià lái.' },
      { text: '这个故事告诉我们，温柔和善意比强迫和蛮力更有力量。', pinyin: 'zhè ge gù shì gào sù wǒ men, wēn róu hé shàn yì bǐ qiǎng pò hé mán lì gèng yǒu lì liàng.' }
    ],
    illustrationSlot: 'north_wind_sun'
  },

  // ── 神话故事 ──────────────────────────────────────────
  {
    id: 'myth_suiren',
    title: '燧人取火',
    titlePinyin: 'suì rén qǔ huǒ',
    type: 'myth',
    example: '燧人氏钻木取火',
    emoji: '🔥',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '远古时候，人们不知道用火，只能吃生的食物，又冷又难受。', pinyin: 'yuǎn gǔ shí hòu, rén men bù zhī dào yòng huǒ, zhǐ néng chī shēng de shí wù, yòu lěng yòu nán shòu.' },
      { text: '有个叫燧人氏的人，他看见一只鸟用嘴啄树，树上冒出了火星。', pinyin: 'yǒu gè jiào suì rén shì de rén, tā kàn jiàn yī zhī niǎo yòng zuǐ zhuó shù, shù shàng mào chū le huǒ xīng.' },
      { text: '燧人氏受到启发，找来两块干燥的树枝，用力地互相摩擦。', pinyin: 'suì rén shì shòu dào qǐ fā, zhǎo lái liǎng kuài gān zào de shù zhī, yòng lì de hù xiāng mó cā.' },
      { text: '摩擦了很久很久，树枝上终于冒出了烟，然后生出了火苗。', pinyin: 'mó cā le hěn jiǔ hěn jiǔ, shù zhī shàng zhōng yú mào chū le yān, rán hòu shēng chū le huǒ miáo.' },
      { text: '人们用这个方法生火，终于可以吃熟食、取暖了。', pinyin: 'rén men yòng zhè ge fāng fǎ shēng huǒ, zhōng yú kě yǐ chī shú shí, qǔ nuǎn le.' },
      { text: '从此，燧人氏被称为"火祖"，人们永远记住了他的贡献。', pinyin: 'cóng cǐ, suì rén shì bèi chēng wéi "huǒ zǔ", rén men yǒng yuǎn jì zhù le tā de gòng xiàn.' }
    ],
    illustrationSlot: 'suiren'
  },
  {
    id: 'myth_wugang',
    title: '吴刚伐桂',
    titlePinyin: 'wú gāng fá guì',
    type: 'myth',
    example: '吴刚在月宫砍桂树',
    emoji: '🌳',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '传说月亮上有一棵很高很大的桂花树。', pinyin: 'chuán shuō yuè liàng shàng yǒu yī kē hěn gāo hěn dà de guì huā shù.' },
      { text: '有个叫吴刚的人，因为做错了事，被罚到月宫去砍这棵树。', pinyin: 'yǒu gè jiào wú gāng de rén, yīn wèi zuò cuò le shì, bèi fá dào yuè gōng qù kǎn zhè kē shù.' },
      { text: '吴刚每砍下一斧头，树上的伤口很快又自己长好了。', pinyin: 'wú gāng měi kǎn xià yī fǔ tóu, shù shàng de shāng kǒu hěn kuài yòu zì jǐ zhǎng hǎo le.' },
      { text: '于是，他只能一天天不停地砍树，却始终砍不倒它。', pinyin: 'yú shì, tā zhǐ néng yī tiān tiān bù tíng de kǎn shù, què shǐ zhōng kǎn bù dǎo tā.' },
      { text: '每到月亮特别圆的时候，人们仿佛还能看见吴刚在月亮里挥动斧头。', pinyin: 'měi dào yuè liàng tè bié yuán de shí hòu, rén men fǎng fú hái néng kàn jiàn wú gāng zài yuè liàng lǐ huī dòng fǔ tóu.' },
      { text: '这个故事提醒我们，做事要专心，也要珍惜改正错误的机会。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, zuò shì yào zhuān xīn, yě yào zhēn xī gǎi zhèng cuò wù de jī huì.' }
    ],
    illustrationSlot: 'wugang'
  },

  // ── 古诗 ─────────────────────────────────────────────
  {
    id: 'poem_zaofa',
    title: '早发白帝城',
    titlePinyin: 'zǎo fā bái dì chéng',
    type: 'poem',
    example: '两岸猿声啼不住',
    emoji: '⛵',
    difficulty: 2,
    minAge: 4,
    author: '李白',
    dynasty: '唐',
    content: [
      { text: '朝辞白帝彩云间，', pinyin: 'zhāo cí bái dì cǎi yún jiān,' },
      { text: '千里江陵一日还。', pinyin: 'qiān lǐ jiāng líng yī rì huán.' },
      { text: '两岸猿声啼不住，', pinyin: 'liǎng àn yuán shēng tí bù zhù,' },
      { text: '轻舟已过万重山。', pinyin: 'qīng zhōu yǐ guò wàn chóng shān.' }
    ],
    illustrationSlot: 'zaofa'
  },
  {
    id: 'poem_xiangsi',
    title: '相思',
    titlePinyin: 'xiāng sī',
    type: 'poem',
    example: '红豆生南国',
    emoji: '❤️',
    difficulty: 2,
    minAge: 4,
    author: '王维',
    dynasty: '唐',
    region: '南方',
    season: ['春'],
    themes: ['思念', '友情', '红豆'],
    scenery: ['红豆', '树'],
    emotion: '思念',
    form: '五言绝句',
    content: [
      { text: '红豆生南国，', pinyin: 'hóng dòu shēng nán guó,' },
      { text: '春来发几枝。', pinyin: 'chūn lái fā jǐ zhī.' },
      { text: '愿君多采撷，', pinyin: 'yuàn jūn duō cǎi xié,' },
      { text: '此物最相思。', pinyin: 'cǐ wù zuì xiāng sī.' }
    ],
    illustrationSlot: 'xiangsi'
  },
  {
    id: 'poem_dufu_chunye',
    title: '春夜喜雨',
    titlePinyin: 'chūn yè xǐ yǔ',
    type: 'poem',
    example: '好雨知时节',
    emoji: '🌧️',
    difficulty: 2,
    minAge: 5,
    author: '杜甫',
    dynasty: '唐',
    region: '四川',
    season: ['春'],
    themes: ['自然', '春雨', '夜景'],
    scenery: ['雨', '夜'],
    emotion: '喜悦',
    form: '五言绝句',
    content: [
      { text: '好雨知时节，', pinyin: 'hǎo yǔ zhī shí jié,' },
      { text: '当春乃发生。', pinyin: 'dāng chūn nǎi fā shēng.' },
      { text: '随风潜入夜，', pinyin: 'suí fēng qián rù yè,' },
      { text: '润物细无声。', pinyin: 'rùn wù xì wú shēng.' }
    ],
    illustrationSlot: 'dufu_chunye'
  },
  {
    id: 'poem_yiyong',
    title: '游园不值',
    titlePinyin: 'yóu yuán bù zhí',
    type: 'poem',
    example: '春色满园关不住',
    emoji: '🌹',
    difficulty: 2,
    minAge: 5,
    author: '叶绍翁',
    dynasty: '宋',
    content: [
      { text: '应怜屐齿印苍苔，', pinyin: 'yīng lián jī chǐ yìn cāng tāi,' },
      { text: '小扣柴扉久不开。', pinyin: 'xiǎo kòu chái fēi jiǔ bù kāi.' },
      { text: '春色满园关不住，', pinyin: 'chūn sè mǎn yuán guān bù zhù,' },
      { text: '一枝红杏出墙来。', pinyin: 'yī zhī hóng xìng chū qiáng lái.' }
    ],
    illustrationSlot: 'yiyong'
  },

  // ── 成语故事 ─────────────────────────────────────────
  {
    id: 'idiom_mianbi',
    title: '面壁十年',
    titlePinyin: 'miàn bì shí nián',
    type: 'idiom',
    example: '达摩面壁苦练终成正果',
    emoji: '🧘',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '南北朝时，印度高僧达摩来到中国传授佛法。', pinyin: 'nán běi cháo shí, yìn dù gāo sēng dá mó lái dào zhōng guó chuán shòu fó fǎ.' },
      { text: '他在嵩山少林寺找到一个山洞，面对石壁坐了下来。', pinyin: 'tā zài sōng shān shào lín sì zhǎo dào yī gè shān dòng, miàn duì shí bì zuò le xià lái.' },
      { text: '达摩就这样端坐在山洞里，整整面壁静思了九年。', pinyin: 'dá mó jiù zhè yàng duān zuò zài shān dòng lǐ, zhěng zhěng miàn bì jìng sī le jiǔ nián.' },
      { text: '据说他静坐的时间太长，连自己的影子都印在了石壁上。', pinyin: 'jù shuō tā jìng zuò de shí jiān tài cháng, lián zì jǐ de yǐng zi dōu yìn zài le shí bì shàng.' },
      { text: '功夫不负有心人，达摩终于大彻大悟，创立了禅宗。', pinyin: 'gōng fū bù fù yǒu xīn rén, dá mó zhōng yú dà chè dà wù, chuàng lì le chán zōng.' },
      { text: '这个故事告诉我们，只有专心致志、持之以恒，才能有所成就。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhǐ yǒu zhuān xīn zhì zhì, chí zhī yǐ héng, cái néng yǒu suǒ chéng jiù.' }
    ],
    illustrationSlot: 'mianbi'
  },
  {
    id: 'idiom_yubiaoji',
    title: '一鸣惊人',
    titlePinyin: 'yī míng jīng rén',
    type: 'idiom',
    example: '楚庄王一鸣惊人',
    emoji: '🦁',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '春秋时，楚庄王当了三年国君，整天只知道吃喝玩乐。', pinyin: 'chūn qiū shí, chǔ zhuāng wáng dāng le sān nián guó jūn, zhěng tiān zhǐ zhī dào chī hē wán lè.' },
      { text: '大臣们非常担心，有人出了个谜语问他：南方的山上有只大鸟，三年不飞也不叫，这是什么鸟？', pinyin: 'dà chén men fēi cháng dān xīn, yǒu rén chū le gè mí yǔ wèn tā: nán fāng de shān shàng yǒu zhī dà niǎo, sān nián bù fēi yě bù jiào, zhè shì shén me niǎo?' },
      { text: '楚庄王笑着说："这只鸟三年不飞，一飞冲天；三年不鸣，一鸣惊人！"', pinyin: 'chǔ zhuāng wáng xiào zhe shuō: "zhè zhī niǎo sān nián bù fēi, yī fēi chōng tiān; sān nián bù míng, yī míng jīng rén!"' },
      { text: '原来，楚庄王这三年一直在暗中观察朝廷大臣，了解国家实情。', pinyin: 'yuán lái, chǔ zhuāng wáng zhè sān nián yī zhí zài àn zhōng guān chá cháo tíng dà chén, liǎo jiě guó jiā shí qíng.' },
      { text: '他随后整顿朝政，任用贤才，楚国很快强大起来。', pinyin: 'tā suí hòu zhěng dùn cháo zhèng, rèn yòng xián cái, chǔ guó hěn kuài qiáng dà qǐ lái.' },
      { text: '这个故事告诉我们，做事要厚积薄发，准备充分了才能一鸣惊人。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào hòu jī bó fā, zhǔn bèi chōng fèn le cái néng yī míng jīng rén.' }
    ],
    illustrationSlot: 'yubiaoji'
  },
  {
    id: 'idiom_sanzuotao',
    title: '三顾茅庐',
    titlePinyin: 'sān gù máo lú',
    type: 'idiom',
    example: '刘备三次拜访诸葛亮',
    emoji: '🏡',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '三国时，刘备听说诸葛亮是天下奇才，非常想请他出山辅佐自己。', pinyin: 'sān guó shí, liú bèi tīng shuō zhū gě liàng shì tiān xià qí cái, fēi cháng xiǎng qǐng tā chū shān fǔ zuǒ zì jǐ.' },
      { text: '刘备第一次去拜访，诸葛亮不在家，他只好失望而归。', pinyin: 'liú bèi dì yī cì qù bài fǎng, zhū gě liàng bù zài jiā, tā zhǐ hǎo shī wàng ér guī.' },
      { text: '第二次，刘备顶着风雪再次前往，诸葛亮又外出了。', pinyin: 'dì èr cì, liú bèi dǐng zhe fēng xuě zài cì qián wǎng, zhū gě liàng yòu wài chū le.' },
      { text: '第三次，刘备恭恭敬敬地在门外等候，不敢惊动在屋内午睡的诸葛亮。', pinyin: 'dì sān cì, liú bèi gōng gōng jìng jìng de zài mén wài děng hòu, bù gǎn jīng dòng zài wū nèi wǔ shuì de zhū gě liàng.' },
      { text: '诸葛亮被刘备的诚意感动，终于决定出山相助。', pinyin: 'zhū gě liàng bèi liú bèi de chéng yì gǎn dòng, zhōng yú jué dìng chū shān xiāng zhù.' },
      { text: '这个故事告诉我们，诚心诚意、坚持不懈，终能打动人心。', pinyin: 'zhè ge gù shì gào sù wǒ men, chéng xīn chéng yì, jiān chí bù xiè, zhōng néng dǎ dòng rén xīn.' }
    ],
    illustrationSlot: 'sanzuotao'
  },

  // ── 历史典故 ─────────────────────────────────────────
  {
    id: 'history_zuoqiu',
    title: '左丘明记史',
    titlePinyin: 'zuǒ qiū míng jì shǐ',
    type: 'history',
    example: '左丘明失明后著春秋',
    emoji: '📜',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '春秋时期，有位伟大的史官叫左丘明，他一生致力于记录历史。', pinyin: 'chūn qiū shí qī, yǒu wèi wěi dà de shǐ guān jiào zuǒ qiū míng, tā yī shēng zhì lì yú jì lù lì shǐ.' },
      { text: '后来，左丘明的眼睛失明了，再也看不见东西。', pinyin: 'hòu lái, zuǒ qiū míng de yǎn jīng shī míng le, zài yě kàn bù jiàn dōng xi.' },
      { text: '可是他没有放弃，凭借惊人的记忆力，坚持口述历史。', pinyin: 'kě shì tā méi yǒu fàng qì, píng jiè jīng rén de jì yì lì, jiān chí kǒu shù lì shǐ.' },
      { text: '他把几百年间各国的大事，一一讲述给弟子们记录下来。', pinyin: 'tā bǎ jǐ bǎi nián jiān gè guó de dà shì, yī yī jiǎng shù gěi dì zǐ men jì lù xià lái.' },
      { text: '经过多年努力，《左传》和《国语》两部伟大的历史著作完成了。', pinyin: 'jīng guò duō nián nǔ lì, "zuǒ zhuàn" hé "guó yǔ" liǎng bù wěi dà de lì shǐ zhù zuò wán chéng le.' },
      { text: '左丘明的故事告诉我们，意志坚定的人，即使遭遇困难也能成就伟业。', pinyin: 'zuǒ qiū míng de gù shì gào sù wǒ men, yì zhì jiān dìng de rén, jí shǐ zāo yù kùn nán yě néng chéng jiù wěi yè.' }
    ],
    illustrationSlot: 'zuoqiu'
  },
  {
    id: 'history_liubang',
    title: '约法三章',
    titlePinyin: 'yuē fǎ sān zhāng',
    type: 'history',
    example: '刘邦与百姓约三条法令',
    emoji: '📋',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '秦朝末年，刘邦率军进入咸阳，秦朝灭亡了。', pinyin: 'qín cháo mò nián, liú bāng shuài jūn jìn rù xián yáng, qín cháo miè wáng le.' },
      { text: '当时，百姓们对秦朝的严苛法律苦不堪言，非常害怕新政权。', pinyin: 'dāng shí, bǎi xìng men duì qín cháo de yán kē fǎ lǜ kǔ bù kān yán, fēi cháng hài pà xīn zhèng quán.' },
      { text: '刘邦召集当地父老，宣布废除秦朝所有苛刻的法律。', pinyin: 'liú bāng zhào jí dāng dì fù lǎo, xuān bù fèi chú qín cháo suǒ yǒu kē kè de fǎ lǜ.' },
      { text: '他与百姓约定只有三条法律：杀人者死、伤人者受刑、盗窃者受罚。', pinyin: 'tā yǔ bǎi xìng yuē dìng zhǐ yǒu sān tiáo fǎ lǜ: shā rén zhě sǐ, shāng rén zhě shòu xíng, dào qiè zhě shòu fá.' },
      { text: '百姓们听了，非常高兴，纷纷拿出食物犒劳刘邦的军队。', pinyin: 'bǎi xìng men tīng le, fēi cháng gāo xìng, fēn fēn ná chū shí wù kào láo liú bāng de jūn duì.' },
      { text: '这个故事告诉我们，得民心者得天下，关爱百姓才能赢得支持。', pinyin: 'zhè ge gù shì gào sù wǒ men, dé mín xīn zhě dé tiān xià, guān ài bǎi xìng cái néng yíng dé zhī chí.' }
    ],
    illustrationSlot: 'liubang'
  },
  {
    id: 'history_caiwenji',
    title: '蔡文姬归汉',
    titlePinyin: 'cài wén jī guī hàn',
    type: 'history',
    example: '蔡文姬历经磨难回归故土',
    emoji: '🎵',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '东汉末年，有位才女叫蔡文姬，她博学多才，精通音律。', pinyin: 'dōng hàn mò nián, yǒu wèi cái nǚ jiào cài wén jī, tā bó xué duō cái, jīng tōng yīn lǜ.' },
      { text: '战乱中，蔡文姬被匈奴人掳走，在草原上生活了十二年。', pinyin: 'zhàn luàn zhōng, cài wén jī bèi xiōng nú rén lǔ zǒu, zài cǎo yuán shàng shēng huó le shí èr nián.' },
      { text: '她思念故乡，含泪写下了著名的《胡笳十八拍》。', pinyin: 'tā sī niàn gù xiāng, hán lèi xiě xià le zhù míng de "hú jiā shí bā pāi".' },
      { text: '曹操知道蔡文姬的遭遇，出重金将她赎回中原。', pinyin: 'cáo cāo zhī dào cài wén jī de zāo yù, chū zhòng jīn jiāng tā shú huí zhōng yuán.' },
      { text: '蔡文姬凭记忆默写出父亲蔡邕四百余篇著作，为后人保存了宝贵文化遗产。', pinyin: 'cài wén jī píng jì yì mò xiě chū fù qīn cài yōng sì bǎi yú piān zhù zuò, wèi hòu rén bǎo cún le bǎo guì wén huà yí chǎn.' },
      { text: '蔡文姬坚韧不拔的精神和卓越的才学，让她名垂千古。', pinyin: 'cài wén jī jiān rèn bù bá de jīng shén hé zhuó yuè de cái xué, ràng tā míng chuí qiān gǔ.' }
    ],
    illustrationSlot: 'caiwenji'
  },

  // ── 寓言故事 ─────────────────────────────────────────
  {
    id: 'fable_wolf_crane',
    title: '狼和鹤',
    titlePinyin: 'láng hé hè',
    type: 'fable',
    example: '鹤帮狼取骨头却未得回报',
    emoji: '🦢',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只狼吃东西太急，一根骨头卡在了喉咙里，疼得直叫唤。', pinyin: 'yī zhī láng chī dōng xi tài jí, yī gēn gǔ tou qiǎ zài le hóu lóng lǐ, téng de zhí jiào huan.' },
      { text: '狼请求鹤帮忙，说："请你把我喉咙里的骨头取出来，我会重重谢你。"', pinyin: 'láng qǐng qiú hè bāng máng, shuō: "qǐng nǐ bǎ wǒ hóu lóng lǐ de gǔ tou qǔ chū lái, wǒ huì zhòng zhòng xiè nǐ."' },
      { text: '鹤用它长长的嘴巴伸进狼的喉咙，小心地取出了那根骨头。', pinyin: 'hè yòng tā cháng cháng de zuǐ bā shēn jìn láng de hóu lóng, xiǎo xīn de qǔ chū le nà gēn gǔ tou.' },
      { text: '鹤要狼兑现承诺，狼却瞪起眼睛说："你把头伸进狼嘴里都没有被吃掉，难道这还不算报答吗？"', pinyin: 'hè yào láng duì xiàn chéng nuò, láng què dèng qǐ yǎn jīng shuō: "nǐ bǎ tóu shēn jìn láng zuǐ lǐ dōu méi yǒu bèi chī diào, nán dào zhè hái bù suàn bào dá ma?"' },
      { text: '鹤后悔极了，它帮助了一个不懂感恩的家伙。', pinyin: 'hè hòu huǐ jí le, tā bāng zhù le yī gè bù dǒng gǎn ēn de jiā huo.' },
      { text: '这个故事告诉我们，帮助别人前要先了解对方，也警示我们要懂得感恩。', pinyin: 'zhè ge gù shì gào sù wǒ men, bāng zhù bié rén qián yào xiān liǎo jiě duì fāng, yě jǐng shì wǒ men yào dǒng dé gǎn ēn.' }
    ],
    illustrationSlot: 'wolf_crane'
  },
  {
    id: 'fable_peacock',
    title: '孔雀开屏',
    titlePinyin: 'kǒng què kāi píng',
    type: 'fable',
    example: '孔雀骄傲自大的故事',
    emoji: '🦚',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '森林里住着一只美丽的孔雀，它有着五彩斑斓的羽毛。', pinyin: 'sēn lín lǐ zhù zhe yī zhī měi lì de kǒng què, tā yǒu zhe wǔ cǎi bān lán de yǔ máo.' },
      { text: '孔雀非常骄傲，走到哪里都要展开尾巴，让大家欣赏它的美丽。', pinyin: 'kǒng què fēi cháng jiāo ào, zǒu dào nǎ lǐ dōu yào zhǎn kāi wěi bā, ràng dà jiā xīn shǎng tā de měi lì.' },
      { text: '它嘲笑乌鸦说："你长得真难看，哪像我这么漂亮！"', pinyin: 'tā cháo xiào wū yā shuō: "nǐ zhǎng de zhēn nán kàn, nǎ xiàng wǒ zhè me piāo liang!"' },
      { text: '乌鸦不紧不慢地说："你的羽毛虽然漂亮，但你能像我一样飞遍天下吗？"', pinyin: 'wū yā bù jǐn bù màn de shuō: "nǐ de yǔ máo suī rán piāo liang, dàn nǐ néng xiàng wǒ yī yàng fēi biàn tiān xià ma?"' },
      { text: '孔雀这才发现，自己的大尾巴太重了，飞不高也飞不远。', pinyin: 'kǒng què zhè cái fā xiàn, zì jǐ de dà wěi bā tài zhòng le, fēi bù gāo yě fēi bù yuǎn.' },
      { text: '这个故事告诉我们，每个人都有自己的长处和短处，不要骄傲自大，也不要瞧不起别人。', pinyin: 'zhè ge gù shì gào sù wǒ men, měi gè rén dōu yǒu zì jǐ de cháng chù hé duǎn chù, bù yào jiāo ào zì dà, yě bù yào qiáo bù qǐ bié rén.' }
    ],
    illustrationSlot: 'peacock'
  },
  {
    id: 'myth_cangjie',
    title: '仓颉造字',
    titlePinyin: 'cāng jié zào zì',
    type: 'myth',
    example: '仓颉创造文字',
    emoji: '✍️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '很久很久以前，人们还没有文字，只能用绳子打结来记事。', pinyin: 'hěn jiǔ hěn jiǔ yǐ qián, rén men hái méi yǒu wén zì, zhǐ néng yòng shéng zi dǎ jié lái jì shì.' },
      { text: '有个叫仓颉的人，非常聪明，他想创造出一种更好的记事方法。', pinyin: 'yǒu gè jiào cāng jié de rén, fēi cháng cōng míng, tā xiǎng chuàng zào chū yī zhǒng gèng hǎo de jì shì fāng fǎ.' },
      { text: '仓颉观察天上的星星、地上的山川河流，以及各种动物的足迹。', pinyin: 'cāng jié guān chá tiān shàng de xīng xīng, dì shàng de shān chuān hé liú, yǐ jí gè zhǒng dòng wù de zú jì.' },
      { text: '他从这些自然现象中得到启发，开始创造各种符号。', pinyin: 'tā cóng zhè xiē zì rán xiàn xiàng zhōng dé dào qǐ fā, kāi shǐ chuàng zào gè zhǒng fú hào.' },
      { text: '这些符号就是最早的文字，人们可以用它们来记录事情。', pinyin: 'zhè xiē fú hào jiù shì zuì zǎo de wén zì, rén men kě yǐ yòng tā men lái jì lù shì qíng.' },
      { text: '据说仓颉造字的时候，天上降下了粟米，鬼怪在夜里哭泣。', pinyin: 'jù shuō cāng jié zào zì de shí hòu, tiān shàng jiàng xià le sù mǐ, guǐ guài zài yè lǐ kū qì.' },
      { text: '因为文字的创造是一件惊天动地的大事，让天地都为之震动。', pinyin: 'yīn wèi wén zì de chuàng zào shì yī jiàn jīng tiān dòng dì de dà shì, ràng tiān dì dōu wèi zhī zhèn dòng.' },
      { text: '仓颉被后人尊为"字圣"，他的发明改变了人类的历史。', pinyin: 'cāng jié bèi hòu rén zūn wèi "zì shèng", tā de fā míng gǎi biàn le rén lèi de lì shǐ.' }
    ],
    illustrationSlot: 'cangjie'
  },
  {
    id: 'story_tielian',
    title: '铁杵磨成针',
    titlePinyin: 'tiě chǔ mó chéng zhēn',
    type: 'history',
    example: '李白受到老婆婆启发',
    emoji: '🪡',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '唐朝大诗人李白小时候很聪明，但不爱学习。', pinyin: 'táng cháo dà shī rén lǐ bái xiǎo shí hòu hěn cōng míng, dàn bù ài xué xí.' },
      { text: '有一天，他逃学去河边玩，看见一位老婆婆在磨一根粗铁棒。', pinyin: 'yǒu yī tiān, tā táo xué qù hé biān wán, kàn jiàn yī wèi lǎo pó pó zài mó yī gēn cū tiě bàng.' },
      { text: '李白好奇地问："老婆婆，您在做什么呀？"', pinyin: 'lǐ bái hào qí de wèn: "lǎo pó pó, nín zài zuò shén me ya?"' },
      { text: '老婆婆说："我要把它磨成一根绣花针。"', pinyin: 'lǎo pó pó shuō: "wǒ yào bǎ tā mó chéng yī gēn xiù huā zhēn."' },
      { text: '李白惊讶地说："这么粗的铁棒，什么时候才能磨成针啊？"', pinyin: 'lǐ bái jīng yà de shuō: "zhè me cū de tiě bàng, shén me shí hòu cái néng mó chéng zhēn a?"' },
      { text: '老婆婆笑着说："只要功夫深，铁杵磨成针。"', pinyin: 'lǎo pó pó xiào zhe shuō: "zhǐ yào gōng fū shēn, tiě chǔ mó chéng zhēn."' },
      { text: '李白听了很受启发，从此发奋读书，终于成为伟大的诗人。', pinyin: 'lǐ bái tīng le hěn shòu qǐ fā, cóng cǐ fā fèn dú shū, zhōng yú chéng wéi wěi dà de shī rén.' }
    ],
    illustrationSlot: 'tielian'
  },
  {
    id: 'poem_minong2',
    title: '悯农（其二）',
    titlePinyin: 'mǐn nóng (qí èr)',
    type: 'poem',
    example: '春种一粒粟',
    emoji: '🌱',
    difficulty: 2,
    minAge: 5,
    author: '李绅',
    dynasty: '唐',
    content: [
      { text: '春种一粒粟，', pinyin: 'chūn zhòng yī lì sù,' },
      { text: '秋收万颗子。', pinyin: 'qiū shōu wàn kē zǐ.' },
      { text: '四海无闲田，', pinyin: 'sì hǎi wú xián tián,' },
      { text: '农夫犹饿死。', pinyin: 'nóng fū yóu è sǐ.' }
    ],
    illustrationSlot: 'minong2'
  },
  {
    id: 'idiom_hua蛇',
    title: '杯弓蛇影',
    titlePinyin: 'bēi gōng shé yǐng',
    type: 'idiom',
    example: '杯中的弓影以为是蛇',
    emoji: '🏹',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '东汉时候，有个人叫应彬，他请朋友杜宣来家里喝酒。', pinyin: 'dōng hàn shí hòu, yǒu gè rén jiào yīng bīn, tā qǐng péng yǒu dù xuān lái jiā lǐ hē jiǔ.' },
      { text: '他们坐在客厅里，墙上挂着一张红色的弓。', pinyin: 'tā men zuò zài kè tīng lǐ, qiáng shàng guà zhe yī zhāng hóng sè de gōng.' },
      { text: '杜宣端起酒杯，突然发现杯子里有一条小蛇在游动。', pinyin: 'dù xuān duān qǐ jiǔ bēi, tū rán fā xiàn bēi zi lǐ yǒu yī tiáo xiǎo shé zài yóu dòng.' },
      { text: '他觉得很恶心，但不好意思说出来，就硬着头皮喝了下去。', pinyin: 'tā jué de hěn ě xīn, dàn bù hǎo yì si shuō chū lái, jiù yìng zhe tóu pí hē le xià qù.' },
      { text: '回家后，杜宣越想越害怕，竟然生起病来。', pinyin: 'huí jiā hòu, dù xuān yuè xiǎng yuè hài pà, jìng rán shēng qǐ bìng lái.' },
      { text: '应彬听说后，仔细查看，发现原来是墙上弓的影子映在杯子里。', pinyin: 'yīng bīn tīng shuō hòu, zǐ xì chá kàn, fā xiàn yuán lái shì qiáng shàng gōng de yǐng zi yìng zài bēi zi lǐ.' },
      { text: '他请来杜宣，让他看杯子里的"蛇"，杜宣一看就明白了。', pinyin: 'tā qǐng lái dù xuān, ràng tā kàn bēi zi lǐ de "shé", dù xuān yī kàn jiù míng bái le.' },
      { text: '杜宣的病马上就好了。这个故事告诉我们，不要疑神疑鬼，自己吓自己。', pinyin: 'dù xuān de bìng mǎ shàng jiù hǎo le. zhè ge gù shì gào sù wǒ men, bù yào yí shén yí guǐ, zì jǐ xià zì jǐ.' }
    ],
    illustrationSlot: 'beigongsheying'
  },
  {
    id: 'fable_monkey',
    title: '猴子捞月',
    titlePinyin: 'hóu zi lāo yuè',
    type: 'fable',
    example: '猴子们想捞水中的月亮',
    emoji: '🐒',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一天晚上，一群猴子在树上玩耍。', pinyin: 'yī tiān wǎn shàng, yī qún hóu zi zài shù shàng wán shuǎ.' },
      { text: '一只小猴子往井里一看，大叫："不好啦！月亮掉进井里了！"', pinyin: 'yī zhī xiǎo hóu zi wǎng jǐng lǐ yī kàn, dà jiào: "bù hǎo la! yuè liàng diào jìn jǐng lǐ le!"' },
      { text: '老猴子跑过来一看，也说："真的，月亮掉进井里了，我们快把它捞出来！"', pinyin: 'lǎo hóu zi pǎo guò lái yī kàn, yě shuō: "zhēn de, yuè liàng diào jìn jǐng lǐ le, wǒ men kuài bǎ tā lāo chū lái!"' },
      { text: '猴子们一个拉着一个的尾巴，倒挂在树上，伸到井里捞月亮。', pinyin: 'hóu zi men yī gè lā zhe yī gè de wěi bā, dào guà zài shù shàng, shēn dào jǐng lǐ lāo yuè liàng.' },
      { text: '最小的猴子把手伸进水里，捞了半天什么也没捞到。', pinyin: 'zuì xiǎo de hóu zi bǎ shǒu shēn jìn shuǐ lǐ, lāo le bàn tiān shén me yě méi lāo dào.' },
      { text: '老猴子抬头一看，月亮还好端端地挂在天上呢！', pinyin: 'lǎo hóu zi tái tóu yī kàn, yuè liàng hái hǎo duān duān de guà zài tiān shàng ne!' },
      { text: '这个故事告诉我们，遇到事情要先观察思考，不要盲目行动。', pinyin: 'zhè ge gù shì gào sù wǒ men, yù dào shì qíng yào xiān guān chá sī kǎo, bù yào máng mù xíng dòng.' }
    ],
    illustrationSlot: 'monkey'
  },
  {
    id: 'story_zhuge',
    title: '诸葛亮借东风',
    titlePinyin: 'zhū gě liàng jiè dōng fēng',
    type: 'history',
    example: '诸葛亮智借东风',
    emoji: '🌬️',
    difficulty: 3,
    minAge: 6,
    content: [
      { text: '三国时期，曹操带领大军南下，准备攻打孙权。', pinyin: 'sān guó shí qī, cáo cāo dài lǐng dà jūn nán xià, zhǔn bèi dǎ sūn quán.' },
      { text: '孙权和刘备联合起来对抗曹操，在赤壁展开大战。', pinyin: 'sūn quán hé liú bèi lián hé qǐ lái duì kàng cáo cāo, zài chì bì zhǎn kāi dà zhàn.' },
      { text: '诸葛亮的军师想出了火攻的计策，但需要东风才能成功。', pinyin: 'zhū gě liàng de jūn shī xiǎng chū le huǒ gōng de jì cè, dàn xū yào dōng fēng cái néng chéng gōng.' },
      { text: '可是当时正是冬天，刮的都是西北风，没有东风。', pinyin: 'kě shì dāng shí zhèng shì dōng tiān, guā de dōu shì xī běi fēng, méi yǒu dōng fēng.' },
      { text: '诸葛亮精通天文，预测到几天后会有东风。', pinyin: 'zhū gě liàng jīng tōng tiān wén, yù cè dào jǐ tiān hòu huì yǒu dōng fēng.' },
      { text: '他在江边筑起高台，披上法衣，假装做法借东风。', pinyin: 'tā zài jiāng biān zhù qǐ gāo tái, pī shàng fǎ yī, jiǎ zhuāng zuò fǎ jiè dōng fēng.' },
      { text: '几天后，果然刮起了大东风，吴军的火船借着风势烧向曹军。', pinyin: 'jǐ tiān hòu, guǒ rán guā qǐ le dà dōng fēng, wú jūn de huǒ chuán jiè zhe fēng shì shāo xiàng cáo jūn.' },
      { text: '曹军大败，赤壁之战成为历史上著名的以少胜多的战役。', pinyin: 'cáo jūn dà bài, chì bì zhī zhàn chéng wéi lì shǐ shàng zhù míng de yǐ shǎo shèng duō de zhàn yì.' },
      { text: '诸葛亮借东风的故事，展现了他的智慧和才能。', pinyin: 'zhū gě liàng jiè dōng fēng de gù shì, zhǎn xiàn le tā de zhì huì hé cái néng.' }
    ],
    illustrationSlot: 'zhuge'
  },
  {
    id: 'poem_yejing',
    title: '夜雨寄北',
    titlePinyin: 'yè yǔ jì běi',
    type: 'poem',
    example: '巴山夜雨涨秋池',
    emoji: '🌧️',
    difficulty: 3,
    minAge: 6,
    author: '李商隐',
    dynasty: '唐',
    region: '四川',
    season: ['秋'],
    themes: ['思念', '友情', '夜雨', '旅途'],
    scenery: ['雨', '夜', '山'],
    emotion: '思念',
    form: '七言绝句',
    content: [
      { text: '君问归期未有期，', pinyin: 'jūn wèn guī qī wèi yǒu qī,' },
      { text: '巴山夜雨涨秋池。', pinyin: 'bā shān yè yǔ zhǎng qiū chí.' },
      { text: '何当共剪西窗烛，', pinyin: 'hé dāng gòng jiǎn xī chuāng zhú,' },
      { text: '却话巴山夜雨时。', pinyin: 'què huà bā shān yè yǔ shí.' }
    ],
    illustrationSlot: 'yejing'
  },
  {
    id: 'idiom_zhuoyu',
    title: '捉襟见肘',
    titlePinyin: 'zhuō jīn jiàn zhǒu',
    type: 'idiom',
    example: '衣服破烂生活贫困',
    emoji: '👔',
    difficulty: 3,
    minAge: 6,
    content: [
      { text: '春秋时期，曾子生活非常贫困，经常吃不饱穿不暖。', pinyin: 'chūn qiū shí qī, zēng zǐ shēng huó fēi cháng pín kùn, jīng cháng chī bù bǎo chuān bù nuǎn.' },
      { text: '他的衣服破破烂烂的，上面全是补丁。', pinyin: 'tā de yī fú pò pò làn làn de, shàng miàn quán shì bǔ dīng.' },
      { text: '有一天，曾子的朋友来看他。', pinyin: 'yǒu yī tiān, zēng zǐ de péng yǒu lái kàn tā.' },
      { text: '曾子起身迎接，他一拉衣襟，胳膊肘就露了出来。', pinyin: 'zēng zǐ qǐ shēn yíng jiē, tā yī lā yī jīn, gē bo zhǒu jiù lù le chū lái.' },
      { text: '朋友看了很心疼，但曾子却毫不在意，依然谈笑风生。', pinyin: 'péng yǒu kàn le hěn xīn téng, dàn zēng zǐ què háo bù zài yì, yī rán tán xiào fēng shēng.' },
      { text: '虽然生活困难，但曾子坚持学习，从不懈怠。', pinyin: 'suī rán shēng huó kùn nán, dàn zēng zǐ jiān chí xué xí, cóng bù xiè dài.' },
      { text: '后来，曾子成为孔子最得意的学生之一。', pinyin: 'hòu lái, zēng zǐ chéng wéi kǒng zǐ zuì dé yì de xué shēng zhī yī.' },
      { text: '这个成语形容生活贫困，衣服破烂，也比喻顾此失彼，应付不过来。', pinyin: 'zhè ge chéng yǔ xíng róng shēng huó pín kùn, yī fú pò làn, yě bǐ yù gù cǐ shī bǐ, yìng fù bù guò lái.' }
    ],
    illustrationSlot: 'zhuoyu'
  },
  {
    id: 'fable_duck',
    title: '丑小鸭',
    titlePinyin: 'chǒu xiǎo yā',
    type: 'fable',
    example: '丑小鸭变成白天鹅',
    emoji: '🦢',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '在乡下的一片芦苇丛里，鸭妈妈正在孵蛋。', pinyin: 'zài xiāng xià de yī piàn lú wěi cóng lǐ, yā mā ma zhèng zài fū dàn.' },
      { text: '蛋壳一个个裂开，小鸭子们都出来了。', pinyin: 'dàn ké yī gè gè liè kāi, xiǎo yā zi men dōu chū lái le.' },
      { text: '可是最大的那个蛋好久才裂开，里面是一只灰灰的大鸭子。', pinyin: 'kě shì zuì dà de nà gè dàn hǎo jiǔ cái liè kāi, lǐ miàn shì yī zhī huī huī de dà yā zi.' },
      { text: '其他鸭子都嘲笑它长得丑，不愿意和它玩。', pinyin: 'qí tā yā zi dōu cháo xiào tā zhǎng de chǒu, bù yuàn yì hé tā wán.' },
      { text: '丑小鸭很伤心，离开了家，独自在外面流浪。', pinyin: 'chǒu xiǎo yā hěn shāng xīn, lí kāi le jiā, dú zì zài wài miàn liú làng.' },
      { text: '它经历了寒冷的冬天，受了很多苦。', pinyin: 'tā jīng lì le hán lěng de dōng tiān, shòu le hěn duō kǔ.' },
      { text: '春天来了，丑小鸭飞到湖边，在水里看到了自己的倒影。', pinyin: 'chūn tiān lái le, chǒu xiǎo yā fēi dào hú biān, zài shuǐ lǐ kàn dào le zì jǐ de dào yǐng.' },
      { text: '原来它不是丑小鸭，而是一只美丽的白天鹅！', pinyin: 'yuán lái tā bú shì chǒu xiǎo yā, ér shì yī zhī měi lì de bái tiān é!' },
      { text: '这个故事告诉我们，是金子总会发光，不要因别人的嘲笑而自卑。', pinyin: 'zhè ge gù shì gào sù wǒ men, shì jīn zi zǒng huì fā guāng, bù yào yīn bié rén de cháo xiào ér zì bēi.' }
    ],
    illustrationSlot: 'duck'
  },
  {
    id: 'myth_xingtian',
    title: '刑天舞干戚',
    titlePinyin: 'xíng tiān wǔ gān qī',
    type: 'myth',
    example: '刑天不屈不挠战斗',
    emoji: '🪓',
    difficulty: 3,
    minAge: 6,
    content: [
      { text: '远古时候，有个巨人叫刑天，他非常勇敢。', pinyin: 'yuǎn gǔ shí hòu, yǒu gè jù rén jiào xíng tiān, tā fēi cháng yǒng gǎn.' },
      { text: '刑天不服天帝的统治，拿起盾牌和斧头，冲向天庭挑战。', pinyin: 'xíng tiān bù fú tiān dì de tǒng zhì, ná qǐ dùn pái hé fǔ tou, chōng xiàng tiān tíng tiǎo zhàn.' },
      { text: '天帝非常生气，派兵和刑天大战。', pinyin: 'tiān dì fēi cháng shēng qì, pài bīng hé xíng tiān dà zhàn.' },
      { text: '刑天英勇无比，打败了天帝的很多兵将。', pinyin: 'xíng tiān yīng yǒng wú bǐ, dǎ bài le tiān dì de hěn duō bīng jiàng.' },
      { text: '最后，天帝亲自出战，一剑砍下了刑天的头。', pinyin: 'zuì hòu, tiān dì qīn zì chū zhàn, yī jiàn kǎn xià le xíng tiān de tóu.' },
      { text: '刑天的头被埋在常羊山下，但他并没有死。', pinyin: 'xíng tiān de tóu bèi mái zài cháng yáng shān xià, dàn tā bìng méi yǒu sǐ.' },
      { text: '他把两个乳头当作眼睛，把肚脐当作嘴巴，继续挥舞着盾牌和斧头战斗。', pinyin: 'tā bǎ liǎng gè rǔ tóu dàng zuò yǎn jīng, bǎ dù qí dàng zuò zuǐ bā, jì xù huī wǔ zhe dùn pái hé fǔ tou zhàn dòu.' },
      { text: '刑天不屈不挠的精神，感动了后人，成为勇敢的象征。', pinyin: 'xíng tiān bù qū bù náo de jīng shén, gǎn dòng le hòu rén, chéng wéi yǒng gǎn de xiàng zhēng.' }
    ],
    illustrationSlot: 'xingtian'
  },
  {
    id: 'poem_shanxing',
    title: '山行',
    titlePinyin: 'shān xíng',
    type: 'poem',
    example: '霜叶红于二月花',
    emoji: '🍁',
    difficulty: 2,
    minAge: 5,
    author: '杜牧',
    dynasty: '唐',
    region: '无',
    season: ['秋'],
    themes: ['山水', '秋景', '果叶'],
    scenery: ['山', '果叶', '云'],
    emotion: '喜悦',
    form: '七言绝句',
    content: [
      { text: '远上寒山石径斜，', pinyin: 'yuǎn shàng hán shān shí jìng xié,' },
      { text: '白云生处有人家。', pinyin: 'bái yún shēng chù yǒu rén jiā.' },
      { text: '停车坐爱枫林晚，', pinyin: 'tíng chē zuò ài fēng lín wǎn,' },
      { text: '霜叶红于二月花。', pinyin: 'shuāng yè hóng yú èr yuè huā.' }
    ],
    illustrationSlot: 'shanxing'
  },
  {
    id: 'idiom_chengmen',
    title: '城门失火，殃及池鱼',
    titlePinyin: 'chéng mén shī huǒ, yāng jí chí yú',
    type: 'idiom',
    example: '城门着火护城河鱼遭殃',
    emoji: '🔥',
    difficulty: 3,
    minAge: 6,
    content: [
      { text: '古时候，有一座城池，城外有一条护城河。', pinyin: 'gǔ shí hòu, yǒu yī zuò chéng chí, chéng wài yǒu yī tiáo hù chéng hé.' },
      { text: '护城河里养了很多鱼，鱼儿们生活得很快乐。', pinyin: 'hù chéng hé lǐ yǎng le hěn duō yú, yú er men shēng huó de hěn kuài lè.' },
      { text: '有一天，城门突然着火了，火势很大。', pinyin: 'yǒu yī tiān, chéng mén tū rán zháo huǒ le, huǒ shì hěn dà.' },
      { text: '人们纷纷赶来救火，可是附近没有水源。', pinyin: 'rén men fēn fēn gǎn lái jiù huǒ, kě shì fù jìn méi yǒu shuǐ yuán.' },
      { text: '有人想到护城河里的水，就用盆桶舀河水来救火。', pinyin: 'yǒu rén xiǎng dào hù chéng hé lǐ de shuǐ, jiù yòng pén tǒng yǎo hé shuǐ lái jiù huǒ.' },
      { text: '火终于扑灭了，但是护城河的水也快被舀干了。', pinyin: 'huǒ zhōng yú pū miè le, dàn shì hù chéng hé de shuǐ yě kuài bèi yǎo gān le.' },
      { text: '河里的鱼因为没有水，都干死了。', pinyin: 'hé lǐ de yú yīn wèi méi yǒu shuǐ, dōu gān sǐ le.' },
      { text: '鱼本来和城门失火没有关系，却无辜地受到了牵连。', pinyin: 'yú běn lái hé chéng mén shī huǒ méi yǒu guān xì, què wú gū de shòu dào le qiān lián.' },
      { text: '这个成语比喻无辜受到牵连，遭受损失。', pinyin: 'zhè ge chéng yǔ bǐ yù wú gū shòu dào qiān lián, zāo shòu sǔn shī.' }
    ],
    illustrationSlot: 'chengmen'
  },
  {
    id: 'myth_yutu',
    title: '玉兔捣药',
    titlePinyin: 'yù tù dǎo yào',
    type: 'myth',
    example: '玉兔在月宫捣药',
    emoji: '🐇',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '传说月亮上住着一只雪白可爱的玉兔。', pinyin: 'chuán shuō yuè liàng shàng zhù zhe yī zhī xuě bái kě ài de yù tù.' },
      { text: '玉兔陪伴着嫦娥，在月宫里一起生活。', pinyin: 'yù tù péi bàn zhe cháng é, zài yuè gōng lǐ yī qǐ shēng huó.' },
      { text: '它最喜欢做的事，就是拿着小杵在药臼里认真捣药。', pinyin: 'tā zuì xǐ huan zuò de shì, jiù shì ná zhe xiǎo chǔ zài yào jiù lǐ rèn zhēn dǎo yào.' },
      { text: '据说这些药能帮助善良的人，带来健康和平安。', pinyin: 'jù shuō zhè xiē yào néng bāng zhù shàn liáng de rén, dài lái jiàn kāng hé píng ān.' },
      { text: '每到中秋夜，人们抬头望月，好像就能看见玉兔忙碌的身影。', pinyin: 'měi dào zhōng qiū yè, rén men tái tóu wàng yuè, hǎo xiàng jiù néng kàn jiàn yù tù máng lù de shēn yǐng.' },
      { text: '这个故事让月亮多了一份温柔和神秘。', pinyin: 'zhè ge gù shì ràng yuè liàng duō le yī fèn wēn róu hé shén mì.' }
    ],
    illustrationSlot: 'yutu'
  },
  {
    id: 'myth_baishe',
    title: '白蛇传',
    titlePinyin: 'bái shé zhuàn',
    type: 'myth',
    example: '白素贞与许仙',
    emoji: '🐍',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '很久以前，有一条修炼成仙的白蛇，名字叫白素贞。', pinyin: 'hěn jiǔ yǐ qián, yǒu yī tiáo xiū liàn chéng xiān de bái shé, míng zi jiào bái sù zhēn.' },
      { text: '她来到人间，在西湖边遇见了善良的许仙。', pinyin: 'tā lái dào rén jiān, zài xī hú biān yù jiàn le shàn liáng de xǔ xiān.' },
      { text: '两人彼此照顾，过着平静又幸福的日子。', pinyin: 'liǎng rén bǐ cǐ zhào gù, guò zhe píng jìng yòu xìng fú de rì zi.' },
      { text: '后来，法海和尚发现了白素贞的身份，想把他们分开。', pinyin: 'hòu lái, fǎ hǎi hé shàng fā xiàn le bái sù zhēn de shēn fèn, xiǎng bǎ tā men fēn kāi.' },
      { text: '白素贞为了守护家人，表现出了很大的勇气。', pinyin: 'bái sù zhēn wèi le shǒu hù jiā rén, biǎo xiàn chū le hěn dà de yǒng qì.' },
      { text: '这个传说让人们记住了善良、真情和守护的力量。', pinyin: 'zhè ge chuán shuō ràng rén men jì zhù le shàn liáng, zhēn qíng hé shǒu hù de lì liang.' }
    ],
    illustrationSlot: 'baishe'
  },
  {
    id: 'myth_baxian',
    title: '八仙过海',
    titlePinyin: 'bā xiān guò hǎi',
    type: 'myth',
    example: '八仙各显神通',
    emoji: '⛵',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '传说中有八位本领高强的神仙，大家都叫他们八仙。', pinyin: 'chuán shuō zhōng yǒu bā wèi běn lǐng gāo qiáng de shén xiān, dà jiā dōu jiào tā men bā xiān.' },
      { text: '有一天，他们相约一起去海那边参加盛会。', pinyin: 'yǒu yī tiān, tā men xiāng yuē yī qǐ qù hǎi nà biān cān jiā shèng huì.' },
      { text: '他们没有坐船，而是各自拿出自己的宝物渡海。', pinyin: 'tā men méi yǒu zuò chuán, ér shì gè zì ná chū zì jǐ de bǎo wù dù hǎi.' },
      { text: '有人站在宝剑上，有人乘着荷花，有人踩着葫芦，办法各不相同。', pinyin: 'yǒu rén zhàn zài bǎo jiàn shàng, yǒu rén chéng zhe hé huā, yǒu rén cǎi zhe hú lú, bàn fǎ gè bù xiāng tóng.' },
      { text: '大家靠着自己的本领，顺利穿过大海。', pinyin: 'dà jiā kào zhe zì jǐ de běn lǐng, shùn lì chuān guò dà hǎi.' },
      { text: '这个故事告诉我们，每个人都可以用自己的长处解决问题。', pinyin: 'zhè ge gù shì gào sù wǒ men, měi gè rén dōu kě yǐ yòng zì jǐ de cháng chù jiě jué wèn tí.' }
    ],
    illustrationSlot: 'baxian'
  },
  {
    id: 'myth_longmen',
    title: '鲤鱼跳龙门',
    titlePinyin: 'lǐ yú tiào lóng mén',
    type: 'myth',
    example: '小鲤鱼跳过龙门',
    emoji: '🐟',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '黄河上游有一座很高很险的龙门。', pinyin: 'huáng hé shàng yóu yǒu yī zuò hěn gāo hěn xiǎn de lóng mén.' },
      { text: '传说只要鲤鱼能跳过龙门，就会变成龙。', pinyin: 'chuán shuō zhǐ yào lǐ yú néng tiào guò lóng mén, jiù huì biàn chéng lóng.' },
      { text: '许多小鲤鱼来到龙门前，一次又一次奋力跃起。', pinyin: 'xǔ duō xiǎo lǐ yú lái dào lóng mén qián, yī cì yòu yī cì fèn lì yuè qǐ.' },
      { text: '虽然很多次都失败了，但它们没有放弃。', pinyin: 'suī rán hěn duō cì dōu shī bài le, dàn tā men méi yǒu fàng qì.' },
      { text: '终于，有勇敢的小鲤鱼跃过了龙门，变成了腾云驾雾的龙。', pinyin: 'zhōng yú, yǒu yǒng gǎn de xiǎo lǐ yú yuè guò le lóng mén, biàn chéng le téng yún jià wù de lóng.' },
      { text: '这个故事鼓励我们，只要坚持努力，就有机会实现梦想。', pinyin: 'zhè ge gù shì gǔ lì wǒ men, zhǐ yào jiān chí nǔ lì, jiù yǒu jī huì shí xiàn mèng xiǎng.' }
    ],
    illustrationSlot: 'longmen'
  },
  {
    id: 'myth_leigong',
    title: '雷公电母',
    titlePinyin: 'léi gōng diàn mǔ',
    type: 'myth',
    example: '雷公和电母守护天地',
    emoji: '⚡',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '古人看到天空打雷闪电，觉得一定有神仙在天上忙碌。', pinyin: 'gǔ rén kàn dào tiān kōng dǎ léi shǎn diàn, jué de yī dìng yǒu shén xiān zài tiān shàng máng lù.' },
      { text: '于是，他们想象出雷公和电母这两位守护天地的神。', pinyin: 'yú shì, tā men xiǎng xiàng chū léi gōng hé diàn mǔ zhè liǎng wèi shǒu hù tiān dì de shén.' },
      { text: '电母先用明亮的镜子照亮天空，接着雷公敲响大鼓。', pinyin: 'diàn mǔ xiān yòng míng liàng de jìng zi zhào liàng tiān kōng, jiē zhe léi gōng qiāo xiǎng dà gǔ.' },
      { text: '人们看到闪电，听到雷声，就知道要下雨了。', pinyin: 'rén men kàn dào shǎn diàn, tīng dào léi shēng, jiù zhī dào yào xià yǔ le.' },
      { text: '这场雨会滋润土地，让庄稼长得更好。', pinyin: 'zhè chǎng yǔ huì zī rùn tǔ dì, ràng zhuāng jia zhǎng de gèng hǎo.' },
      { text: '这个神话让人们学会敬畏自然，也感受自然的力量。', pinyin: 'zhè ge shén huà ràng rén men xué huì jìng wèi zì rán, yě gǎn shòu zì rán de lì liang.' }
    ],
    illustrationSlot: 'leigong'
  },
  {
    id: 'myth_mengjiang',
    title: '孟姜女哭长城',
    titlePinyin: 'mèng jiāng nǚ kū cháng chéng',
    type: 'myth',
    example: '孟姜女寻找丈夫',
    emoji: '🧱',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '从前，有个善良的姑娘叫孟姜女。', pinyin: 'cóng qián, yǒu gè shàn liáng de gū niang jiào mèng jiāng nǚ.' },
      { text: '她的丈夫被抓去修长城，走了很久都没有回来。', pinyin: 'tā de zhàng fu bèi zhuā qù xiū cháng chéng, zǒu le hěn jiǔ dōu méi yǒu huí lái.' },
      { text: '冬天到了，孟姜女担心丈夫受冻，就带着棉衣出发去找他。', pinyin: 'dōng tiān dào le, mèng jiāng nǚ dān xīn zhàng fu shòu dòng, jiù dài zhe mián yī chū fā qù zhǎo tā.' },
      { text: '她走了很远很远，终于来到长城边，却得知丈夫已经去世了。', pinyin: 'tā zǒu le hěn yuǎn hěn yuǎn, zhōng yú lái dào cháng chéng biān, què dé zhī zhàng fu yǐ jīng qù shì le.' },
      { text: '孟姜女伤心地大哭起来，哭声久久回荡。', pinyin: 'mèng jiāng nǚ shāng xīn de dà kū qǐ lái, kū shēng jiǔ jiǔ huí dàng.' },
      { text: '传说她的真情感动了天地，长城都塌下了一段。', pinyin: 'chuán shuō tā de zhēn qíng gǎn dòng le tiān dì, cháng chéng dōu tā xià le yī duàn.' },
      { text: '这个故事让人们记住了深情和勇敢。', pinyin: 'zhè ge gù shì ràng rén men jì zhù le shēn qíng hé yǒng gǎn.' }
    ],
    illustrationSlot: 'mengjiang'
  },
  {
    id: 'myth_tianluo',
    title: '田螺姑娘',
    titlePinyin: 'tián luó gū niang',
    type: 'myth',
    example: '田螺姑娘悄悄帮忙',
    emoji: '🐚',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '从前，有个勤劳善良的小伙子，每天努力种田。', pinyin: 'cóng qián, yǒu gè qín láo shàn liáng de xiǎo huǒ zi, měi tiān nǔ lì zhòng tián.' },
      { text: '有一天，他在河边捡到一只大田螺，就把它带回家养着。', pinyin: 'yǒu yī tiān, tā zài hé biān jiǎn dào yī zhī dà tián luó, jiù bǎ tā dài huí jiā yǎng zhe.' },
      { text: '奇怪的是，每次他干活回来，家里总是收拾得干干净净，饭菜也做好了。', pinyin: 'qí guài de shì, měi cì tā gàn huó huí lái, jiā lǐ zǒng shì shōu shi de gān gān jìng jìng, fàn cài yě zuò hǎo le.' },
      { text: '后来他悄悄留意，发现原来是田螺里出来的一位姑娘在帮忙。', pinyin: 'hòu lái tā qiāo qiāo liú yì, fā xiàn yuán lái shì tián luó lǐ chū lái de yī wèi gū niang zài bāng máng.' },
      { text: '姑娘温柔又勤快，两个人一起把日子过得越来越好。', pinyin: 'gū niang wēn róu yòu qín kuài, liǎng gè rén yī qǐ bǎ rì zi guò de yuè lái yuè hǎo.' },
      { text: '这个故事让人们喜欢善良、勤劳和互相照顾的美好品质。', pinyin: 'zhè ge gù shì ràng rén men xǐ huan shàn liáng, qín láo hé hù xiāng zhào gù de měi hǎo pǐn zhì.' }
    ],
    illustrationSlot: 'tianluo'
  },
  {
    id: 'myth_yuelao',
    title: '月下老人',
    titlePinyin: 'yuè xià lǎo rén',
    type: 'myth',
    example: '月老牵红线',
    emoji: '🧵',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '传说有位慈祥的老爷爷住在月光下，大家都叫他月老。', pinyin: 'chuán shuō yǒu wèi cí xiáng de lǎo yé ye zhù zài yuè guāng xià, dà jiā dōu jiào tā yuè lǎo.' },
      { text: '月老手里拿着一本书，还带着一根红线。', pinyin: 'yuè lǎo shǒu lǐ ná zhe yī běn shū, hái dài zhe yī gēn hóng xiàn.' },
      { text: '他会把有缘分的人悄悄用红线连在一起。', pinyin: 'tā huì bǎ yǒu yuán fèn de rén qiāo qiāo yòng hóng xiàn lián zài yī qǐ.' },
      { text: '人们相信，真心和善意会让这根红线更牢更长。', pinyin: 'rén men xiāng xìn, zhēn xīn hé shàn yì huì ràng zhè gēn hóng xiàn gèng láo gèng cháng.' },
      { text: '每到月光明亮的夜晚，大家都会想起这位温暖的老爷爷。', pinyin: 'měi dào yuè guāng míng liàng de yè wǎn, dà jiā dōu huì xiǎng qǐ zhè wèi wēn nuǎn de lǎo yé ye.' },
      { text: '这个故事让大家相信美好的缘分和真诚的感情。', pinyin: 'zhè ge gù shì ràng dà jiā xiāng xìn měi hǎo de yuán fèn hé zhēn chéng de gǎn qíng.' }
    ],
    illustrationSlot: 'yuelao'
  },
  {
    id: 'myth_jiangziya',
    title: '姜子牙封神',
    titlePinyin: 'jiāng zǐ yá fēng shén',
    type: 'myth',
    example: '姜子牙主持封神',
    emoji: '📜',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '传说中，姜子牙是一位很有智慧的老人。', pinyin: 'chuán shuō zhōng, jiāng zǐ yá shì yī wèi hěn yǒu zhì huì de lǎo rén.' },
      { text: '他帮助周朝讨伐暴虐的商纣王，保护百姓。', pinyin: 'tā bāng zhù zhōu cháo tǎo fá bào nüè de shāng zhòu wáng, bǎo hù bǎi xìng.' },
      { text: '战争结束后，很多忠勇的人都立下了大功。', pinyin: 'zhàn zhēng jié shù hòu, hěn duō zhōng yǒng de rén dōu lì xià le dà gōng.' },
      { text: '姜子牙依照天命，主持封神，把他们安排到不同的位置守护天地。', pinyin: 'jiāng zǐ yá yī zhào tiān mìng, zhǔ chí fēng shén, bǎ tā men ān pái dào bù tóng de wèi zhi shǒu hù tiān dì.' },
      { text: '从此，天地之间多了许多守护人间的神仙。', pinyin: 'cóng cǐ, tiān dì zhī jiān duō le xǔ duō shǒu hù rén jiān de shén xiān.' },
      { text: '这个故事让人们感受到正义、忠诚和责任。', pinyin: 'zhè ge gù shì ràng rén men gǎn shòu dào zhèng yì, zhōng chéng hé zé rèn.' }
    ],
    illustrationSlot: 'jiangziya'
  },
  {
    id: 'myth_erlang',
    title: '二郎神劈山',
    titlePinyin: 'èr láng shén pī shān',
    type: 'myth',
    example: '二郎神救母',
    emoji: '⛰️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '传说中，二郎神从小就非常勇敢，也很有孝心。', pinyin: 'chuán shuō zhōng, èr láng shén cóng xiǎo jiù fēi cháng yǒng gǎn, yě hěn yǒu xiào xīn.' },
      { text: '后来，他知道母亲被大山压住，心里非常难过。', pinyin: 'hòu lái, tā zhī dào mǔ qīn bèi dà shān yā zhù, xīn lǐ fēi cháng nán guò.' },
      { text: '为了救出母亲，他努力修炼本领，练得越来越强。', pinyin: 'wèi le jiù chū mǔ qīn, tā nǔ lì xiū liàn běn lǐng, liàn de yuè lái yuè qiáng.' },
      { text: '终于，他举起神斧，用力劈开了大山。', pinyin: 'zhōng yú, tā jǔ qǐ shén fǔ, yòng lì pī kāi le dà shān.' },
      { text: '阳光重新照进山谷，母亲也终于得救了。', pinyin: 'yáng guāng chóngxīn zhào jìn shān gǔ, mǔ qīn yě zhōng yú dé jiù le.' },
      { text: '这个故事赞美了勇气、坚持和孝顺。', pinyin: 'zhè ge gù shì zàn měi le yǒng qì, jiān chí hé xiào shùn.' }
    ],
    illustrationSlot: 'erlang'
  },
  {
    id: 'idiom_xiongyou',
    title: '胸有成竹',
    titlePinyin: 'xiōng yǒu chéng zhú',
    type: 'idiom',
    example: '心里早有打算',
    emoji: '🎍',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '宋朝有位画家叫文与可，他最擅长画竹子。', pinyin: 'sòng cháo yǒu wèi huà jiā jiào wén yǔ kě, tā zuì shàn cháng huà zhú zi.' },
      { text: '他常常到竹林里观察竹叶、竹节和风中的姿态。', pinyin: 'tā cháng cháng dào zhú lín lǐ guān chá zhú yè, zhú jié hé fēng zhōng de zī tài.' },
      { text: '所以每次提起笔来，他心里早就想好了整幅画。', pinyin: 'suǒ yǐ měi cì tí qǐ bǐ lái, tā xīn lǐ zǎo jiù xiǎng hǎo le zhěng fú huà.' },
      { text: '大家都夸他画竹子又快又好。', pinyin: 'dà jiā dōu kuā tā huà zhú zi yòu kuài yòu hǎo.' },
      { text: '这个成语比喻做事之前心里已经有了成熟的打算。', pinyin: 'zhè ge chéng yǔ bǐ yù zuò shì zhī qián xīn lǐ yǐ jīng yǒu le chéng shú de dǎ suan.' }
    ],
    illustrationSlot: 'xiongyou'
  },
  {
    id: 'idiom_fujing',
    title: '负荆请罪',
    titlePinyin: 'fù jīng qǐng zuì',
    type: 'idiom',
    example: '廉颇背着荆条认错',
    emoji: '🌿',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '战国时期，赵国有两位很有名的大臣，一个是廉颇，一个是蔺相如。', pinyin: 'zhàn guó shí qī, zhào guó yǒu liǎng wèi hěn yǒu míng de dà chén, yī gè shì lián pō, yī gè shì lìn xiàng rú.' },
      { text: '廉颇觉得自己战功很多，不服蔺相如职位比自己高。', pinyin: 'lián pō jué de zì jǐ zhàn gōng hěn duō, bù fú lìn xiàng rú zhí wèi bǐ zì jǐ gāo.' },
      { text: '后来他知道蔺相如一直在顾全大局，让着自己，心里很惭愧。', pinyin: 'hòu lái tā zhī dào lìn xiàng rú yī zhí zài gù quán dà jú, ràng zhe zì jǐ, xīn lǐ hěn cán kuì.' },
      { text: '于是，廉颇背着荆条去见蔺相如，请求原谅。', pinyin: 'yú shì, lián pō bēi zhe jīng tiáo qù jiàn lìn xiàng rú, qǐng qiú yuán liàng.' },
      { text: '两人和好以后，齐心协力保卫赵国。', pinyin: 'liǎng rén hé hǎo yǐ hòu, qí xīn xié lì bǎo wèi zhào guó.' },
      { text: '这个成语赞扬知错能改、真诚道歉的好品质。', pinyin: 'zhè ge chéng yǔ zàn yáng zhī cuò néng gǎi, zhēn chéng dào qiàn de hǎo pǐn zhì.' }
    ],
    illustrationSlot: 'fujing'
  },
  {
    id: 'idiom_zhishang',
    title: '纸上谈兵',
    titlePinyin: 'zhǐ shàng tán bīng',
    type: 'idiom',
    example: '赵括只会空谈',
    emoji: '📄',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '战国时候，赵国有个年轻人叫赵括。', pinyin: 'zhàn guó shí hòu, zhào guó yǒu gè nián qīng rén jiào zhào kuò.' },
      { text: '他读了很多兵书，说起打仗来头头是道。', pinyin: 'tā dú le hěn duō bīng shū, shuō qǐ dǎ zhàng lái tóu tóu shì dào.' },
      { text: '可是真正到了战场上，他只会照着书本安排。', pinyin: 'kě shì zhēn zhèng dào le zhàn chǎng shàng, tā zhǐ huì zhào zhe shū běn ān pái.' },
      { text: '面对变化的局势，赵括一点办法也没有。', pinyin: 'miàn duì biàn huà de jú shì, zhào kuò yī diǎn bàn fǎ yě méi yǒu.' },
      { text: '最后，赵军吃了大亏。', pinyin: 'zuì hòu, zhào jūn chī le dà kuī.' },
      { text: '这个成语提醒我们，光会说理论，不会真正实践，是不行的。', pinyin: 'zhè ge chéng yǔ tí xǐng wǒ men, guāng huì shuō lǐ lùn, bú huì zhēn zhèng shí jiàn, shì bù xíng de.' }
    ],
    illustrationSlot: 'zhishang'
  },
  {
    id: 'idiom_saiweng',
    title: '塞翁失马',
    titlePinyin: 'sài wēng shī mǎ',
    type: 'idiom',
    example: '坏事也可能变好事',
    emoji: '🐎',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '边塞住着一位老人，大家都叫他塞翁。', pinyin: 'biān sài zhù zhe yī wèi lǎo rén, dà jiā dōu jiào tā sài wēng.' },
      { text: '有一天，他家的马跑丢了，邻居们都来安慰他。', pinyin: 'yǒu yī tiān, tā jiā de mǎ pǎo diū le, lín jū men dōu lái ān wèi tā.' },
      { text: '塞翁却说：这不一定是坏事。', pinyin: 'sài wēng què shuō: zhè bù yī dìng shì huài shì.' },
      { text: '过了几天，那匹马带着一匹好马一起回来了。', pinyin: 'guò le jǐ tiān, nà pǐ mǎ dài zhe yī pǐ hǎo mǎ yī qǐ huí lái le.' },
      { text: '后来，塞翁的儿子骑马摔伤了腿，可也因此躲过了战争。', pinyin: 'hòu lái, sài wēng de ér zi qí mǎ shuāi shāng le tuǐ, kě yě yīn cǐ duǒ guò le zhàn zhēng.' },
      { text: '这个成语告诉我们，事情有时会变来变去，不能只看眼前。', pinyin: 'zhè ge chéng yǔ gào sù wǒ men, shì qing yǒu shí huì biàn lái biàn qù, bù néng zhǐ kàn yǎn qián.' }
    ],
    illustrationSlot: 'saiweng'
  },
  {
    id: 'idiom_zaobi',
    title: '凿壁偷光',
    titlePinyin: 'záo bì tōu guāng',
    type: 'idiom',
    example: '匡衡借光读书',
    emoji: '🕯️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '汉朝有个孩子叫匡衡，家里很穷，买不起灯油。', pinyin: 'hàn cháo yǒu gè hái zi jiào kuāng héng, jiā lǐ hěn qióng, mǎi bù qǐ dēng yóu.' },
      { text: '可是他特别爱读书，晚上总想着继续学习。', pinyin: 'kě shì tā tè bié ài dú shū, wǎn shàng zǒng xiǎng zhe jì xù xué xí.' },
      { text: '邻居家灯火很亮，匡衡就悄悄在墙上凿了一个小洞。', pinyin: 'lín jū jiā dēng huǒ hěn liàng, kuāng héng jiù qiāo qiāo zài qiáng shàng záo le yī gè xiǎo dòng.' },
      { text: '他借着透过来的微光，认真地读书写字。', pinyin: 'tā jiè zhe tòu guò lái de wēi guāng, rèn zhēn de dú shū xiě zì.' },
      { text: '后来，匡衡真的成了很有学问的人。', pinyin: 'hòu lái, kuāng héng zhēn de chéng le hěn yǒu xué wèn de rén.' },
      { text: '这个成语鼓励我们珍惜学习机会，刻苦用功。', pinyin: 'zhè ge chéng yǔ gǔ lì wǒ men zhēn xī xué xí jī huì, kè kǔ yòng gōng.' }
    ],
    illustrationSlot: 'zaobi'
  },
  {
    id: 'idiom_xuanliang',
    title: '悬梁刺股',
    titlePinyin: 'xuán liáng cì gǔ',
    type: 'idiom',
    example: '刻苦读书不怕辛苦',
    emoji: '📚',
    difficulty: 2,
    minAge: 6,
    content: [
      { text: '古时候，有两位很爱学习的人，一个叫孙敬，一个叫苏秦。', pinyin: 'gǔ shí hòu, yǒu liǎng wèi hěn ài xué xí de rén, yī gè jiào sūn jìng, yī gè jiào sū qín.' },
      { text: '孙敬怕自己读书时打瞌睡，就把头发系在房梁上提醒自己。', pinyin: 'sūn jìng pà zì jǐ dú shū shí dǎ kē shuì, jiù bǎ tóu fa xì zài fáng liáng shàng tí xǐng zì jǐ.' },
      { text: '苏秦困了的时候，就用锥子轻轻刺自己的大腿，让自己清醒。', pinyin: 'sū qín kùn le de shí hòu, jiù yòng zhuī zi qīng qīng cì zì jǐ de dà tuǐ, ràng zì jǐ qīng xǐng.' },
      { text: '他们都靠着惊人的毅力，坚持读书。', pinyin: 'tā men dōu kào zhe jīng rén de yì lì, jiān chí dú shū.' },
      { text: '后来，两个人都学有所成。', pinyin: 'hòu lái, liǎng gè rén dōu xué yǒu suǒ chéng.' },
      { text: '这个成语形容学习非常刻苦。', pinyin: 'zhè ge chéng yǔ xíng róng xué xí fēi cháng kè kǔ.' }
    ],
    illustrationSlot: 'xuanliang'
  },
  {
    id: 'idiom_chengmenlixue',
    title: '程门立雪',
    titlePinyin: 'chéng mén lì xuě',
    type: 'idiom',
    example: '尊敬老师虚心求学',
    emoji: '❄️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '宋朝有两个学生，杨时和游酢，非常敬重老师程颐。', pinyin: 'sòng cháo yǒu liǎng gè xué shēng, yáng shí hé yóu zuò, fēi cháng jìng zhòng lǎo shī chéng yí.' },
      { text: '有一天，他们一起去向老师请教问题。', pinyin: 'yǒu yī tiān, tā men yī qǐ qù xiàng lǎo shī qǐng jiào wèn tí.' },
      { text: '到老师家时，老师正在休息，他们不愿打扰，就安静地站在门外等候。', pinyin: 'dào lǎo shī jiā shí, lǎo shī zhèng zài xiū xi, tā men bù yuàn dǎ rǎo, jiù ān jìng de zhàn zài mén wài děng hòu.' },
      { text: '那天雪下得很大，等老师醒来时，门外已经积了很厚的雪。', pinyin: 'nà tiān xuě xià de hěn dà, děng lǎo shī xǐng lái shí, mén wài yǐ jīng jī le hěn hòu de xuě.' },
      { text: '老师很感动，认真地给他们讲解学问。', pinyin: 'lǎo shī hěn gǎn dòng, rèn zhēn de gěi tā men jiǎng jiě xué wèn.' },
      { text: '这个成语赞美尊师重道、虚心求学的态度。', pinyin: 'zhè ge chéng yǔ zàn měi zūn shī zhòng dào, xū xīn qiú xué de tài du.' }
    ],
    illustrationSlot: 'chengmenlixue'
  },
  {
    id: 'idiom_woxin',
    title: '卧薪尝胆',
    titlePinyin: 'wò xīn cháng dǎn',
    type: 'idiom',
    example: '越王勾践牢记目标',
    emoji: '🪵',
    difficulty: 2,
    minAge: 6,
    content: [
      { text: '春秋时期，越王勾践被吴王打败了。', pinyin: 'chūn qiū shí qī, yuè wáng gōu jiàn bèi wú wáng dǎ bài le.' },
      { text: '回国以后，勾践没有灰心，而是下决心让国家重新强大起来。', pinyin: 'huí guó yǐ hòu, gōu jiàn méi yǒu huī xīn, ér shì xià jué xīn ràng guó jiā chóngxīn qiáng dà qǐ lái.' },
      { text: '他睡在柴草上，每天还要尝一尝苦胆，提醒自己不能忘记困难。', pinyin: 'tā shuì zài chái cǎo shàng, měi tiān hái yào cháng yī cháng kǔ dǎn, tí xǐng zì jǐ bù néng wàng jì kùn nán.' },
      { text: '他努力治理国家，关心百姓，训练军队。', pinyin: 'tā nǔ lì zhì lǐ guó jiā, guān xīn bǎi xìng, xùn liàn jūn duì.' },
      { text: '经过多年努力，越国终于重新强大起来。', pinyin: 'jīng guò duō nián nǔ lì, yuè guó zhōng yú chóngxīn qiáng dà qǐ lái.' },
      { text: '这个成语告诉我们，要记住目标，坚持奋斗。', pinyin: 'zhè ge chéng yǔ gào sù wǒ men, yào jì zhù mù biāo, jiān chí fèn dòu.' }
    ],
    illustrationSlot: 'woxin'
  },
  {
    id: 'idiom_wanbi',
    title: '完璧归赵',
    titlePinyin: 'wán bì guī zhào',
    type: 'idiom',
    example: '蔺相如机智护玉璧',
    emoji: '💎',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '战国时期，赵国得到了一块非常珍贵的和氏璧。', pinyin: 'zhàn guó shí qī, zhào guó dé dào le yī kuài fēi cháng zhēn guì de hé shì bì.' },
      { text: '秦王想把这块玉骗走，就让赵国把玉送来。', pinyin: 'qín wáng xiǎng bǎ zhè kuài yù piàn zǒu, jiù ràng zhào guó bǎ yù sòng lái.' },
      { text: '赵国派蔺相如带着玉璧前去应对。', pinyin: 'zhào guó pài lìn xiàng rú dài zhe yù bì qián qù yìng duì.' },
      { text: '蔺相如看出秦王没有诚意，就机智地把玉璧保护起来。', pinyin: 'lìn xiàng rú kàn chū qín wáng méi yǒu chéng yì, jiù jī zhì de bǎ yù bì bǎo hù qǐ lái.' },
      { text: '最后，他成功把和氏璧平安带回赵国。', pinyin: 'zuì hòu, tā chéng gōng bǎ hé shì bì píng ān dài huí zhào guó.' },
      { text: '这个成语赞扬机智勇敢，把珍贵的东西完好地带回来。', pinyin: 'zhè ge chéng yǔ zàn yáng jī zhì yǒng gǎn, bǎ zhēn guì de dōng xi wán hǎo de dài huí lái.' }
    ],
    illustrationSlot: 'wanbi'
  },
  {
    id: 'idiom_banmen',
    title: '班门弄斧',
    titlePinyin: 'bān mén nòng fǔ',
    type: 'idiom',
    example: '在行家面前卖弄本领',
    emoji: '🪓',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '古代有位很有名的木匠大师，名字叫鲁班。', pinyin: 'gǔ dài yǒu wèi hěn yǒu míng de mù jiàng dà shī, míng zi jiào lǔ bān.' },
      { text: '鲁班做东西特别厉害，大家都很佩服他。', pinyin: 'lǔ bān zuò dōng xi tè bié lì hai, dà jiā dōu hěn pèi fú tā.' },
      { text: '后来有人在鲁班门前炫耀自己用斧头的本领。', pinyin: 'hòu lái yǒu rén zài lǔ bān mén qián xuàn yào zì jǐ yòng fǔ tóu de běn lǐng.' },
      { text: '大家一看都笑了，因为这就像在大行家面前逞能。', pinyin: 'dà jiā yī kàn dōu xiào le, yīn wèi zhè jiù xiàng zài dà háng jiā miàn qián chěng néng.' },
      { text: '这个成语后来就用来比喻在内行人面前卖弄本领。', pinyin: 'zhè ge chéng yǔ hòu lái jiù yòng lái bǐ yù zài nèi háng rén miàn qián mài nòng běn lǐng.' }
    ],
    illustrationSlot: 'banmen'
  },
  {
    id: 'idiom_jingzhong',
    title: '精忠报国',
    titlePinyin: 'jīng zhōng bào guó',
    type: 'idiom',
    example: '岳飞一心报效国家',
    emoji: '🛡️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '南宋有位大将军叫岳飞，他从小就很爱自己的国家。', pinyin: 'nán sòng yǒu wèi dà jiāng jūn jiào yuè fēi, tā cóng xiǎo jiù hěn ài zì jǐ de guó jiā.' },
      { text: '岳飞的母亲希望他长大后做个忠诚勇敢的人。', pinyin: 'yuè fēi de mǔ qīn xī wàng tā zhǎng dà hòu zuò gè zhōng chéng yǒng gǎn de rén.' },
      { text: '她在岳飞背上刺下了“精忠报国”四个字。', pinyin: 'tā zài yuè fēi bèi shàng cì xià le "jīng zhōng bào guó" sì gè zì.' },
      { text: '岳飞一直牢记这四个字，努力练武，保家卫国。', pinyin: 'yuè fēi yī zhí láo jì zhè sì gè zì, nǔ lì liàn wǔ, bǎo jiā wèi guó.' },
      { text: '后来，他成了很受百姓爱戴的大英雄。', pinyin: 'hòu lái, tā chéng le hěn shòu bǎi xìng ài dài de dà yīng xióng.' },
      { text: '这个成语赞美忠诚勇敢、真心报效国家的精神。', pinyin: 'zhè ge chéng yǔ zàn měi zhōng chéng yǒng gǎn, zhēn xīn bào xiào guó jiā de jīng shén.' }
    ],
    illustrationSlot: 'jingzhong'
  },
  {
    id: 'myth_nezha',
    title: '哪吒闹海',
    titlePinyin: 'né zhā nào hǎi',
    type: 'myth',
    example: '哪吒勇斗龙王三太子',
    emoji: '🌊',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '很久以前，陈塘关总兵李靖有个勇敢的儿子，名字叫哪吒。', pinyin: 'hěn jiǔ yǐ qián, chén táng guān zǒng bīng lǐ jìng yǒu gè yǒng gǎn de ér zi, míng zi jiào né zhā.' },
      { text: '哪吒从小力气很大，还会很多神奇的本领。', pinyin: 'né zhā cóng xiǎo lì qi hěn dà, hái huì hěn duō shén qí de běn lǐng.' },
      { text: '有一天，他在海边玩耍，不小心惊动了东海龙王三太子。', pinyin: 'yǒu yī tiān, tā zài hǎi biān wán shuǎ, bù xiǎo xīn jīng dòng le dōng hǎi lóng wáng sān tài zǐ.' },
      { text: '三太子欺负百姓，哪吒挺身而出，勇敢地保护大家。', pinyin: 'sān tài zǐ qī fù bǎi xìng, né zhā tǐng shēn ér chū, yǒng gǎn de bǎo hù dà jiā.' },
      { text: '东海龙王很生气，想掀起风浪报复陈塘关。', pinyin: 'dōng hǎi lóng wáng hěn shēng qì, xiǎng xiān qǐ fēng làng bào fù chén táng guān.' },
      { text: '哪吒为了不连累百姓，做出了勇敢又担当的选择。', pinyin: 'né zhā wèi le bù lián lèi bǎi xìng, zuò chū le yǒng gǎn yòu dān dāng de xuǎn zé.' },
      { text: '后来，在师父太乙真人的帮助下，哪吒重新站起来，继续守护大家。', pinyin: 'hòu lái, zài shī fu tài yǐ zhēn rén de bāng zhù xià, né zhā chóngxīn zhàn qǐ lái, jì xù shǒu hù dà jiā.' },
      { text: '这个故事让我们记住了哪吒的勇敢、担当和保护弱小的心。', pinyin: 'zhè ge gù shì ràng wǒ men jì zhù le né zhā de yǒng gǎn, dān dāng hé bǎo hù ruò xiǎo de xīn.' }
    ],
    illustrationSlot: 'nezha'
  },
  {
    id: 'myth_dayu',
    title: '大禹治水',
    titlePinyin: 'dà yǔ zhì shuǐ',
    type: 'myth',
    example: '大禹带领大家治服洪水',
    emoji: '⛰️',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '很久以前，天下发大水，房屋和田地都被洪水淹没了。', pinyin: 'hěn jiǔ yǐ qián, tiān xià fā dà shuǐ, fáng wū hé tián dì dōu bèi hóng shuǐ yān mò le.' },
      { text: '人们非常着急，盼望有人能想出办法。', pinyin: 'rén men fēi cháng zháo jí, pàn wàng yǒu rén néng xiǎng chū bàn fǎ.' },
      { text: '大禹站了出来，他决定带领大家一起治水。', pinyin: 'dà yǔ zhàn le chū lái, tā jué dìng dài lǐng dà jiā yī qǐ zhì shuǐ.' },
      { text: '他没有只想着堵住洪水，而是认真观察地形，决定开山挖渠，让洪水流出去。', pinyin: 'tā méi yǒu zhǐ xiǎng zhe dǔ zhù hóng shuǐ, ér shì rèn zhēn guān chá dì xíng, jué dìng kāi shān wā qú, ràng hóng shuǐ liú chū qù.' },
      { text: '大禹翻山越岭，到处查看水势，脚都磨出了厚厚的茧。', pinyin: 'dà yǔ fān shān yuè lǐng, dào chù chá kàn shuǐ shì, jiǎo dōu mó chū le hòu hòu de jiǎn.' },
      { text: '为了治水，他三次经过家门口都没有进去休息。', pinyin: 'wèi le zhì shuǐ, tā sān cì jīng guò jiā mén kǒu dōu méi yǒu jìn qù xiū xi.' },
      { text: '经过很多年的努力，洪水终于被疏导到大海里去了。', pinyin: 'jīng guò hěn duō nián de nǔ lì, hóng shuǐ zhōng yú bèi shū dǎo dào dà hǎi lǐ qù le.' },
      { text: '人们重新过上了安稳的生活，大家都非常敬佩大禹。', pinyin: 'rén men chóngxīn guò shàng le ān wěn de shēng huó, dà jiā dōu fēi cháng jìng pèi dà yǔ.' }
    ],
    illustrationSlot: 'dayu'
  },
  {
    id: 'myth_baolian',
    title: '宝莲灯',
    titlePinyin: 'bǎo lián dēng',
    type: 'myth',
    example: '沉香救母',
    emoji: '🏮',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '传说中，善良的三圣母有一盏会发光的宝莲灯。', pinyin: 'chuán shuō zhōng, shàn liáng de sān shèng mǔ yǒu yī zhǎn huì fā guāng de bǎo lián dēng.' },
      { text: '后来，她的孩子沉香渐渐长大，知道了妈妈被困住的事情。', pinyin: 'hòu lái, tā de hái zi chén xiāng jiàn jiàn zhǎng dà, zhī dào le mā ma bèi kùn zhù de shì qing.' },
      { text: '沉香很想念妈妈，也下定决心要去救她。', pinyin: 'chén xiāng hěn xiǎng niàn mā ma, yě xià dìng jué xīn yào qù jiù tā.' },
      { text: '为了变得更强大，沉香一路拜师学艺，吃了很多苦。', pinyin: 'wèi le biàn de gèng qiáng dà, chén xiāng yī lù bài shī xué yì, chī le hěn duō kǔ.' },
      { text: '他翻山越岭，终于来到华山脚下。', pinyin: 'tā fān shān yuè lǐng, zhōng yú lái dào huà shān jiǎo xià.' },
      { text: '沉香鼓起勇气，举起神斧，劈开大山，救出了妈妈。', pinyin: 'chén xiāng gǔ qǐ yǒng qì, jǔ qǐ shén fǔ, pī kāi dà shān, jiù chū le mā ma.' },
      { text: '一家人终于团聚了，宝莲灯的光也照亮了大家的心。', pinyin: 'yī jiā rén zhōng yú tuán jù le, bǎo lián dēng de guāng yě zhào liàng le dà jiā de xīn.' },
      { text: '这个故事告诉我们，爱与坚持能让人拥有很大的力量。', pinyin: 'zhè ge gù shì gào sù wǒ men, ài yǔ jiān chí néng ràng rén yōng yǒu hěn dà de lì liang.' }
    ],
    illustrationSlot: 'baoliandeng'
  },
  {
    id: 'idiom_yaner',
    title: '掩耳盗铃',
    titlePinyin: 'yǎn ěr dào líng',
    type: 'idiom',
    example: '捂住耳朵偷铃铛',
    emoji: '🔔',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '从前，有个人看见别人家门上挂着一个漂亮的大铃铛。', pinyin: 'cóng qián, yǒu gè rén kàn jiàn bié rén jiā mén shàng guà zhe yī gè piào liang de dà líng dāng.' },
      { text: '他很想把铃铛偷回家，可是铃铛一碰就会发出响亮的声音。', pinyin: 'tā hěn xiǎng bǎ líng dāng tōu huí jiā, kě shì líng dāng yī pèng jiù huì fā chū xiǎng liàng de shēng yīn.' },
      { text: '小偷想来想去，想出了一个自以为聪明的办法。', pinyin: 'xiǎo tōu xiǎng lái xiǎng qù, xiǎng chū le yī gè zì yǐ wéi cōng míng de bàn fǎ.' },
      { text: '他用手紧紧捂住自己的耳朵，心想：这样我就听不见铃声了。', pinyin: 'tā yòng shǒu jǐn jǐn wǔ zhù zì jǐ de ěr duo, xīn xiǎng: zhè yàng wǒ jiù tīng bú jiàn líng shēng le.' },
      { text: '于是，他伸手去摘铃铛，铃铛果然叮铃铃地响了起来。', pinyin: 'yú shì, tā shēn shǒu qù zhāi líng dāng, líng dāng guǒ rán dīng líng líng de xiǎng le qǐ lái.' },
      { text: '虽然他自己听不见，可是别人全都听见了，很快就把他抓住了。', pinyin: 'suī rán tā zì jǐ tīng bú jiàn, kě shì bié rén quán dōu tīng jiàn le, hěn kuài jiù bǎ tā zhuā zhù le.' },
      { text: '这个成语告诉我们，自欺欺人是没有用的。', pinyin: 'zhè ge chéng yǔ gào sù wǒ men, zì qī qī rén shì méi yǒu yòng de.' }
    ],
    illustrationSlot: 'yaner'
  },
  {
    id: 'idiom_hujia',
    title: '狐假虎威',
    titlePinyin: 'hú jiǎ hǔ wēi',
    type: 'idiom',
    example: '狐狸借老虎的威风吓人',
    emoji: '🦊',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '森林里有一只老虎，大家都很害怕它。', pinyin: 'sēn lín lǐ yǒu yī zhī lǎo hǔ, dà jiā dōu hěn hài pà tā.' },
      { text: '有一天，老虎抓住了一只狐狸，正准备把它吃掉。', pinyin: 'yǒu yī tiān, lǎo hǔ zhuā zhù le yī zhī hú li, zhèng zhǔn bèi bǎ tā chī diào.' },
      { text: '狐狸一点也不慌张，还对老虎说：你不能吃我，我是天帝派来的。', pinyin: 'hú li yī diǎn yě bù huāng zhāng, hái duì lǎo hǔ shuō: nǐ bù néng chī wǒ, wǒ shì tiān dì pài lái de.' },
      { text: '老虎半信半疑，狐狸又说：不信你跟在我后面走一圈看看。', pinyin: 'lǎo hǔ bàn xìn bàn yí, hú li yòu shuō: bù xìn nǐ gēn zài wǒ hòu miàn zǒu yī quān kàn kan.' },
      { text: '狐狸大摇大摆地走在前面，老虎跟在后面。', pinyin: 'hú li dà yáo dà bǎi de zǒu zài qián miàn, lǎo hǔ gēn zài hòu miàn.' },
      { text: '小动物们一看见老虎，就吓得纷纷逃跑。', pinyin: 'xiǎo dòng wù men yī kàn jiàn lǎo hǔ, jiù xià de fēn fēn táo pǎo.' },
      { text: '狐狸得意地说：你看，大家都怕我吧！老虎这才上了当。', pinyin: 'hú li dé yì de shuō: nǐ kàn, dà jiā dōu pà wǒ ba! lǎo hǔ zhè cái shàng le dàng.' },
      { text: '这个成语比喻依仗别人的权势来吓唬人。', pinyin: 'zhè ge chéng yǔ bǐ yù yī zhàng bié rén de quán shì lái xià hǔ rén.' }
    ],
    illustrationSlot: 'hujia'
  },
  {
    id: 'idiom_hualong',
    title: '画龙点睛',
    titlePinyin: 'huà lóng diǎn jīng',
    type: 'idiom',
    example: '给龙点上眼睛',
    emoji: '🐉',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '南北朝的时候，有位很有名的画家叫张僧繇。', pinyin: 'nán běi cháo de shí hòu, yǒu wèi hěn yǒu míng de huà jiā jiào zhāng sēng yáo.' },
      { text: '有一天，他在寺庙的墙上画了四条栩栩如生的龙。', pinyin: 'yǒu yī tiān, tā zài sì miào de qiáng shàng huà le sì tiáo xǔ xǔ rú shēng de lóng.' },
      { text: '大家围过来看，都觉得这些龙像真的一样。', pinyin: 'dà jiā wéi guò lái kàn, dōu jué de zhè xiē lóng xiàng zhēn de yī yàng.' },
      { text: '可是有人发现，龙的眼睛还没有画上。', pinyin: 'kě shì yǒu rén fā xiàn, lóng de yǎn jing hái méi yǒu huà shàng.' },
      { text: '张僧繇说：如果点上眼睛，龙就会飞走。', pinyin: 'zhāng sēng yáo shuō: rú guǒ diǎn shàng yǎn jing, lóng jiù huì fēi zǒu.' },
      { text: '大家都不相信，非要他试一试。', pinyin: 'dà jiā dōu bù xiāng xìn, fēi yào tā shì yī shì.' },
      { text: '于是，他给其中两条龙点上了眼睛。突然电闪雷鸣，那两条龙真的腾空飞走了。', pinyin: 'yú shì, tā gěi qí zhōng liǎng tiáo lóng diǎn shàng le yǎn jing. tū rán diàn shǎn léi míng, nà liǎng tiáo lóng zhēn de téng kōng fēi zǒu le.' },
      { text: '这个成语比喻在关键地方加上一笔，让内容一下子生动起来。', pinyin: 'zhè ge chéng yǔ bǐ yù zài guān jiàn dì fāng jiā shàng yī bǐ, ràng nèi róng yī xià zi shēng dòng qǐ lái.' }
    ],
    illustrationSlot: 'hualong'
  },
  {
    id: 'myth_sunwukong',
    title: '孙悟空大闹天宫',
    titlePinyin: 'sūn wù kōng dà nào tiān gōng',
    type: 'myth',
    example: '孙悟空勇闯天宫',
    emoji: '🐒',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '花果山上有只聪明勇敢的石猴，后来大家都叫他孙悟空。', pinyin: 'huā guǒ shān shàng yǒu zhī cōng míng yǒng gǎn de shí hóu, hòu lái dà jiā dōu jiào tā sūn wù kōng.' },
      { text: '孙悟空学会了七十二变和筋斗云，本领越来越大。', pinyin: 'sūn wù kōng xué huì le qī shí èr biàn hé jīn dǒu yún, běn lǐng yuè lái yuè dà.' },
      { text: '他闯进龙宫借来金箍棒，又去地府改了生死簿。', pinyin: 'tā chuǎng jìn lóng gōng jiè lái jīn gū bàng, yòu qù dì fǔ gǎi le shēng sǐ bù.' },
      { text: '后来，孙悟空被请上天宫，却发现自己只当了个很小的官。', pinyin: 'hòu lái, sūn wù kōng bèi qǐng shàng tiān gōng, què fā xiàn zì jǐ zhǐ dāng le gè hěn xiǎo de guān.' },
      { text: '他一气之下打翻蟠桃会，大闹天宫，闯出了齐天大圣的名号。', pinyin: 'tā yī qì zhī xià dǎ fān pán táo huì, dà nào tiān gōng, chuǎng chū le qí tiān dà shèng de míng hào.' },
      { text: '这个故事让人们记住了孙悟空的机灵、勇气和不服输。', pinyin: 'zhè ge gù shì ràng rén men jì zhù le sūn wù kōng de jī líng, yǒng qì hé bù fú shū.' }
    ],
    illustrationSlot: 'sunwukong'
  },
  {
    id: 'myth_tianxianpei',
    title: '天仙配',
    titlePinyin: 'tiān xiān pèi',
    type: 'myth',
    example: '董永和七仙女',
    emoji: '🧚',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '从前，有个善良孝顺的年轻人叫董永。', pinyin: 'cóng qián, yǒu gè shàn liáng xiào shùn de nián qīng rén jiào dǒng yǒng.' },
      { text: '天上的七仙女听说了董永的故事，非常感动。', pinyin: 'tiān shàng de qī xiān nǚ tīng shuō le dǒng yǒng de gù shì, fēi cháng gǎn dòng.' },
      { text: '于是，七仙女悄悄来到人间，帮助董永渡过难关。', pinyin: 'yú shì, qī xiān nǚ qiāo qiāo lái dào rén jiān, bāng zhù dǒng yǒng dù guò nán guān.' },
      { text: '她织出了又快又美的锦缎，帮董永还清了欠下的钱。', pinyin: 'tā zhī chū le yòu kuài yòu měi de jǐn duàn, bāng dǒng yǒng huán qīng le qiàn xià de qián.' },
      { text: '后来，七仙女还是要回到天上，但她和董永的真情被大家一直记着。', pinyin: 'hòu lái, qī xiān nǚ hái shì yào huí dào tiān shàng, dàn tā hé dǒng yǒng de zhēn qíng bèi dà jiā yī zhí jì zhe.' },
      { text: '这个故事赞美了善良、勤劳和真诚。', pinyin: 'zhè ge gù shì zàn měi le shàn liáng, qín láo hé zhēn chéng.' }
    ],
    illustrationSlot: 'tianxianpei'
  },
  {
    id: 'myth_nianshou',
    title: '年兽的传说',
    titlePinyin: 'nián shòu de chuán shuō',
    type: 'myth',
    example: '红色和鞭炮吓跑年兽',
    emoji: '🧨',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '传说很久以前，有一只凶猛的怪兽，名字叫年。', pinyin: 'chuán shuō hěn jiǔ yǐ qián, yǒu yī zhī xiōng měng de guài shòu, míng zi jiào nián.' },
      { text: '每到冬天快结束的时候，它就会跑出来吓唬人们和家畜。', pinyin: 'měi dào dōng tiān kuài jié shù de shí hòu, tā jiù huì pǎo chū lái xià hǔ rén men hé jiā chù.' },
      { text: '后来，有位老人告诉大家，年兽最怕红色、火光和响亮的声音。', pinyin: 'hòu lái, yǒu wèi lǎo rén gào sù dà jiā, nián shòu zuì pà hóng sè, huǒ guāng hé xiǎng liàng de shēng yīn.' },
      { text: '于是，家家户户贴红纸、点灯火、放鞭炮。', pinyin: 'yú shì, jiā jiā hù hù tiē hóng zhǐ, diǎn dēng huǒ, fàng biān pào.' },
      { text: '年兽果然被吓跑了，再也不敢随便来捣乱。', pinyin: 'nián shòu guǒ rán bèi xià pǎo le, zài yě bù gǎn suí biàn lái dǎo luàn.' },
      { text: '从此，人们就把这一天叫做过年。', pinyin: 'cóng cǐ, rén men jiù bǎ zhè yī tiān jiào zuò guò nián.' }
    ],
    illustrationSlot: 'nianshou'
  },
  {
    id: 'myth_shengxiao',
    title: '十二生肖的来历',
    titlePinyin: 'shí èr shēng xiào de lái lì',
    type: 'myth',
    example: '动物赛跑排生肖',
    emoji: '🐭',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '传说玉皇大帝想挑选十二种动物做生肖。', pinyin: 'chuán shuō yù huáng dà dì xiǎng tiāo xuǎn shí èr zhǒng dòng wù zuò shēng xiào.' },
      { text: '他决定举办一场比赛，让动物们按先后顺序过河。', pinyin: 'tā jué dìng jǔ bàn yī chǎng bǐ sài, ràng dòng wù men àn xiān hòu shùn xù guò hé.' },
      { text: '老鼠个子最小，却聪明地坐在牛背上过了河。', pinyin: 'lǎo shǔ gè zi zuì xiǎo, què cōng míng de zuò zài niú bèi shàng guò le hé.' },
      { text: '快到终点时，老鼠轻轻一跳，第一个冲到了前面。', pinyin: 'kuài dào zhōng diǎn shí, lǎo shǔ qīng qīng yī tiào, dì yī gè chōng dào le qián miàn.' },
      { text: '后来，牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪也依次排好了顺序。', pinyin: 'hòu lái, niú, hǔ, tù, lóng, shé, mǎ, yáng, hóu, jī, gǒu, zhū yě yī cì pái hǎo le shùn xù.' },
      { text: '这就是十二生肖的来历。', pinyin: 'zhè jiù shì shí èr shēng xiào de lái lì.' }
    ],
    illustrationSlot: 'shengxiao'
  },
  {
    id: 'myth_pantao',
    title: '西王母蟠桃会',
    titlePinyin: 'xī wáng mǔ pán táo huì',
    type: 'myth',
    example: '仙桃盛会',
    emoji: '🍑',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '传说西王母住在昆仑山上，掌管着神奇的蟠桃园。', pinyin: 'chuán shuō xī wáng mǔ zhù zài kūn lún shān shàng, zhǎng guǎn zhe shén qí de pán táo yuán.' },
      { text: '蟠桃要很多很多年才成熟一次，吃了会让人更有精神。', pinyin: 'pán táo yào hěn duō hěn duō nián cái chéng shú yī cì, chī le huì ràng rén gèng yǒu jīng shén.' },
      { text: '每到蟠桃成熟的时候，西王母就会邀请众仙来参加盛会。', pinyin: 'měi dào pán táo chéng shú de shí hòu, xī wáng mǔ jiù huì yāo qǐng zhòng xiān lái cān jiā shèng huì.' },
      { text: '仙乐飘飘，桃香四溢，大家在会上一边品尝仙桃，一边庆祝吉祥平安。', pinyin: 'xiān yuè piāo piāo, táo xiāng sì yì, dà jiā zài huì shàng yī biān pǐn cháng xiān táo, yī biān qìng zhù jí xiáng píng ān.' },
      { text: '这个故事让人们记住了蟠桃会的热闹和美好。', pinyin: 'zhè ge gù shì ràng rén men jì zhù le pán táo huì de rè nao hé měi hǎo.' }
    ],
    illustrationSlot: 'pantao'
  },
  {
    id: 'idiom_yamiao',
    title: '揠苗助长',
    titlePinyin: 'yà miáo zhù zhǎng',
    type: 'idiom',
    example: '急着让禾苗长高',
    emoji: '🌱',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '宋国有个农夫，天天盼着田里的禾苗快点长高。', pinyin: 'sòng guó yǒu gè nóng fū, tiān tiān pàn zhe tián lǐ de hé miáo kuài diǎn zhǎng gāo.' },
      { text: '有一天，他灵机一动，把每棵禾苗都往上拔了一点。', pinyin: 'yǒu yī tiān, tā líng jī yī dòng, bǎ měi kē hé miáo dōu wǎng shàng bá le yī diǎn.' },
      { text: '他回到家里高兴地说：今天可把我累坏了，我帮禾苗长高了！', pinyin: 'tā huí dào jiā lǐ gāo xìng de shuō: jīn tiān kě bǎ wǒ lèi huài le, wǒ bāng hé miáo zhǎng gāo le!' },
      { text: '儿子去田里一看，发现禾苗全都枯萎了。', pinyin: 'ér zi qù tián lǐ yī kàn, fā xiàn hé miáo quán dōu kū wěi le.' },
      { text: '这个成语告诉我们，做事不能太着急，要按规律来。', pinyin: 'zhè ge chéng yǔ gào sù wǒ men, zuò shì bù néng tài zháo jí, yào àn guī lǜ lái.' }
    ],
    illustrationSlot: 'yamiao'
  },
  {
    id: 'idiom_jinggong',
    title: '惊弓之鸟',
    titlePinyin: 'jīng gōng zhī niǎo',
    type: 'idiom',
    example: '受过惊吓的鸟',
    emoji: '🏹',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '战国时期，有位射箭很厉害的人叫更羸。', pinyin: 'zhàn guó shí qī, yǒu wèi shè jiàn hěn lì hai de rén jiào gēng léi.' },
      { text: '有一天，他看见一只大雁飞得很低，知道这只鸟受过伤。', pinyin: 'yǒu yī tiān, tā kàn jiàn yī zhī dà yàn fēi de hěn dī, zhī dào zhè zhī niǎo shòu guò shāng.' },
      { text: '更羸拉开弓，却没有放箭，只是发出了弓弦的声音。', pinyin: 'gēng léi lā kāi gōng, què méi yǒu fàng jiàn, zhǐ shì fā chū le gōng xián de shēng yīn.' },
      { text: '那只大雁一听到声音，吓得立刻掉了下来。', pinyin: 'nà zhī dà yàn yī tīng dào shēng yīn, xià de lì kè diào le xià lái.' },
      { text: '这个成语比喻受过惊吓的人，遇到一点动静就害怕。', pinyin: 'zhè ge chéng yǔ bǐ yù shòu guò jīng xià de rén, yù dào yī diǎn dòng jìng jiù hài pà.' }
    ],
    illustrationSlot: 'jinggong'
  },
  {
    id: 'idiom_zhilu',
    title: '指鹿为马',
    titlePinyin: 'zhǐ lù wéi mǎ',
    type: 'idiom',
    example: '把鹿说成马',
    emoji: '🦌',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '秦朝末年，有个大臣叫赵高，十分专横。', pinyin: 'qín cháo mò nián, yǒu gè dà chén jiào zhào gāo, shí fēn zhuān hèng.' },
      { text: '有一天，他牵来一只鹿，对皇帝说：我献上一匹好马。', pinyin: 'yǒu yī tiān, tā qiān lái yī zhī lù, duì huáng dì shuō: wǒ xiàn shàng yī pǐ hǎo mǎ.' },
      { text: '皇帝很奇怪，说：这明明是一只鹿啊。', pinyin: 'huáng dì hěn qí guài, shuō: zhè míng míng shì yī zhī lù a.' },
      { text: '赵高又去问大臣们，有些人害怕他，只好也说是马。', pinyin: 'zhào gāo yòu qù wèn dà chén men, yǒu xiē rén hài pà tā, zhǐ hǎo yě shuō shì mǎ.' },
      { text: '这个成语比喻故意颠倒黑白，混淆是非。', pinyin: 'zhè ge chéng yǔ bǐ yù gù yì diān dǎo hēi bái, hùn xiáo shì fēi.' }
    ],
    illustrationSlot: 'zhilu'
  },
  {
    id: 'idiom_simian',
    title: '四面楚歌',
    titlePinyin: 'sì miàn chǔ gē',
    type: 'idiom',
    example: '被敌人包围',
    emoji: '🥁',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '楚汉相争的时候，项羽被刘邦的军队重重包围。', pinyin: 'chǔ hàn xiāng zhēng de shí hòu, xiàng yǔ bèi liú bāng de jūn duì chóng chóng bāo wéi.' },
      { text: '夜里，他忽然听见四周传来楚地的歌声。', pinyin: 'yè lǐ, tā hū rán tīng jiàn sì zhōu chuán lái chǔ dì de gē shēng.' },
      { text: '项羽以为楚地的人都已经投降了，心里非常难过。', pinyin: 'xiàng yǔ yǐ wéi chǔ dì de rén dōu yǐ jīng tóu xiáng le, xīn lǐ fēi cháng nán guò.' },
      { text: '这个成语后来用来形容陷入孤立无援、到处受敌的困境。', pinyin: 'zhè ge chéng yǔ hòu lái yòng lái xíng róng xiàn rù gū lì wú yuán, dào chù shòu dí de kùn jìng.' }
    ],
    illustrationSlot: 'simian'
  },
  {
    id: 'idiom_caochuan',
    title: '草船借箭',
    titlePinyin: 'cǎo chuán jiè jiàn',
    type: 'idiom',
    example: '诸葛亮巧取箭支',
    emoji: '🚤',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '三国时候，周瑜故意让诸葛亮几天内造出很多箭。', pinyin: 'sān guó shí hòu, zhōu yú gù yì ràng zhū gě liàng jǐ tiān nèi zào chū hěn duō jiàn.' },
      { text: '诸葛亮没有着急，而是让人准备了几条扎满草人的船。', pinyin: 'zhū gě liàng méi yǒu zháo jí, ér shì ràng rén zhǔn bèi le jǐ tiáo zhā mǎn cǎo rén de chuán.' },
      { text: '大雾天里，他把船开到曹军水寨前。', pinyin: 'dà wù tiān lǐ, tā bǎ chuán kāi dào cáo jūn shuǐ zhài qián.' },
      { text: '曹军看不清情况，就向草船射了很多很多箭。', pinyin: 'cáo jūn kàn bù qīng qíng kuàng, jiù xiàng cǎo chuán shè le hěn duō hěn duō jiàn.' },
      { text: '等船回去时，草人身上已经扎满了箭。', pinyin: 'děng chuán huí qù shí, cǎo rén shēn shàng yǐ jīng zhā mǎn le jiàn.' },
      { text: '这个成语赞扬用智慧解决难题。', pinyin: 'zhè ge chéng yǔ zàn yáng yòng zhì huì jiě jué nán tí.' }
    ],
    illustrationSlot: 'caochuan'
  },
  {
    id: 'idiom_pofu',
    title: '破釜沉舟',
    titlePinyin: 'pò fǔ chén zhōu',
    type: 'idiom',
    example: '下定决心拼到底',
    emoji: '⚔️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '秦朝末年，项羽带兵去打仗。', pinyin: 'qín cháo mò nián, xiàng yǔ dài bīng qù dǎ zhàng.' },
      { text: '过河以后，他命令士兵把锅砸破，把船沉掉。', pinyin: 'guò hé yǐ hòu, tā mìng lìng shì bīng bǎ guō zá pò, bǎ chuán chén diào.' },
      { text: '士兵们没有了退路，只能一心一意向前拼战。', pinyin: 'shì bīng men méi yǒu le tuì lù, zhǐ néng yī xīn yī yì xiàng qián pīn zhàn.' },
      { text: '最后，他们士气大振，打赢了胜仗。', pinyin: 'zuì hòu, tā men shì qì dà zhèn, dǎ yíng le shèng zhàng.' },
      { text: '这个成语比喻下定决心，不留退路，拼到底。', pinyin: 'zhè ge chéng yǔ bǐ yù xià dìng jué xīn, bù liú tuì lù, pīn dào dǐ.' }
    ],
    illustrationSlot: 'pofu'
  },
  {
    id: 'idiom_mangren',
    title: '盲人摸象',
    titlePinyin: 'máng rén mō xiàng',
    type: 'idiom',
    example: '只看到一部分',
    emoji: '🐘',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '从前，有几位盲人从来没有见过大象。', pinyin: 'cóng qián, yǒu jǐ wèi máng rén cóng lái méi yǒu jiàn guò dà xiàng.' },
      { text: '有一天，他们一起去摸大象，想知道大象到底长什么样。', pinyin: 'yǒu yī tiān, tā men yī qǐ qù mō dà xiàng, xiǎng zhī dào dà xiàng dào dǐ zhǎng shén me yàng.' },
      { text: '摸到象腿的人说，大象像柱子；摸到耳朵的人说，大象像扇子。', pinyin: 'mō dào xiàng tuǐ de rén shuō, dà xiàng xiàng zhù zi; mō dào ěr duo de rén shuō, dà xiàng xiàng shàn zi.' },
      { text: '摸到尾巴的人说，大象像绳子；摸到肚子的人说，大象像墙。', pinyin: 'mō dào wěi ba de rén shuō, dà xiàng xiàng shéng zi; mō dào dù zi de rén shuō, dà xiàng xiàng qiáng.' },
      { text: '大家都只摸到了一部分，所以谁也说不全。', pinyin: 'dà jiā dōu zhǐ mō dào le yī bù fèn, suǒ yǐ shuí yě shuō bù quán.' },
      { text: '这个成语提醒我们，看问题不能只看一部分。', pinyin: 'zhè ge chéng yǔ tí xǐng wǒ men, kàn wèn tí bù néng zhǐ kàn yī bù fèn.' }
    ],
    illustrationSlot: 'mangren'
  },
  {
    id: 'idiom_huabing',
    title: '画饼充饥',
    titlePinyin: 'huà bǐng chōng jī',
    type: 'idiom',
    example: '空想不能当饭吃',
    emoji: '🥞',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '三国时期，有人总喜欢用好听的话安慰别人，却拿不出真正的办法。', pinyin: 'sān guó shí qī, yǒu rén zǒng xǐ huan yòng hǎo tīng de huà ān wèi bié rén, què ná bù chū zhēn zhèng de bàn fǎ.' },
      { text: '就像肚子饿的时候，只在纸上画一个大饼，是不能真正填饱肚子的。', pinyin: 'jiù xiàng dù zi è de shí hòu, zhǐ zài zhǐ shàng huà yī gè dà bǐng, shì bù néng zhēn zhèng tián bǎo dù zi de.' },
      { text: '这个成语后来就用来比喻空想和空话不能解决实际问题。', pinyin: 'zhè ge chéng yǔ hòu lái jiù yòng lái bǐ yù kōng xiǎng hé kōng huà bù néng jiě jué shí jì wèn tí.' }
    ],
    illustrationSlot: 'huabing'
  },
  {
    id: 'fable_fox_crow',
    title: '狐狸和乌鸦',
    titlePinyin: 'hú li hé wū yā',
    type: 'fable',
    example: '不要轻信夸奖',
    emoji: '🦊',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只乌鸦叼着一块肉，站在树枝上。', pinyin: 'yī zhī wū yā diāo zhe yī kuài ròu, zhàn zài shù zhī shàng.' },
      { text: '狐狸闻到香味，很想把肉骗到手。', pinyin: 'hú li wén dào xiāng wèi, hěn xiǎng bǎ ròu piàn dào shǒu.' },
      { text: '它不停夸乌鸦的羽毛漂亮、歌声动听。', pinyin: 'tā bù tíng kuā wū yā de yǔ máo piào liang, gē shēng dòng tīng.' },
      { text: '乌鸦一高兴，张嘴唱歌，肉就掉了下来。', pinyin: 'wū yā yī gāo xìng, zhāng zuǐ chàng gē, ròu jiù diào le xià lái.' },
      { text: '狐狸叼起肉跑掉了。这个故事告诉我们，不要轻易被好听的话骗了。', pinyin: 'hú li diāo qǐ ròu pǎo diào le. zhè ge gù shì gào sù wǒ men, bù yào qīng yì bèi hǎo tīng de huà piàn le.' }
    ],
    illustrationSlot: 'fox_crow'
  },
  {
    id: 'fable_farmer_snake',
    title: '农夫与蛇',
    titlePinyin: 'nóng fū yǔ shé',
    type: 'fable',
    example: '帮助坏人反受害',
    emoji: '🐍',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '冬天里，一位农夫看见一条冻僵的蛇。', pinyin: 'dōng tiān lǐ, yī wèi nóng fū kàn jiàn yī tiáo dòng jiāng de shé.' },
      { text: '他心软了，把蛇放进怀里取暖。', pinyin: 'tā xīn ruǎn le, bǎ shé fàng jìn huái lǐ qǔ nuǎn.' },
      { text: '蛇慢慢苏醒过来，却反过来咬了农夫一口。', pinyin: 'shé màn man sū xǐng guò lái, què fǎn guò lái yǎo le nóng fū yī kǒu.' },
      { text: '农夫这才明白，对坏心肠的人盲目仁慈，会害了自己。', pinyin: 'nóng fū zhè cái míng bái, duì huài xīn cháng de rén máng mù rén cí, huì hài le zì jǐ.' }
    ],
    illustrationSlot: 'farmer_snake'
  },
  {
    id: 'fable_heron_clam',
    title: '鹬蚌相争',
    titlePinyin: 'yù bàng xiāng zhēng',
    type: 'fable',
    example: '争来争去让别人得利',
    emoji: '🦪',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '河边有一只蚌张开壳晒太阳。', pinyin: 'hé biān yǒu yī zhī bàng zhāng kāi ké shài tài yáng.' },
      { text: '一只鹬鸟飞来，伸嘴去啄蚌肉。', pinyin: 'yī zhī yù niǎo fēi lái, shēn zuǐ qù zhuó bàng ròu.' },
      { text: '蚌立刻合上壳，夹住了鹬鸟的嘴。', pinyin: 'bàng lì kè hé shàng ké, jiá zhù le yù niǎo de zuǐ.' },
      { text: '它们谁也不肯让步，正僵持着，渔夫来了，把它们一起捉走了。', pinyin: 'tā men shuí yě bù kěn ràng bù, zhèng jiāng chí zhe, yú fū lái le, bǎ tā men yī qǐ zhuō zǒu le.' },
      { text: '这个故事提醒我们，只顾争斗，可能让第三个人得利。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, zhǐ gù zhēng dòu, kě néng ràng dì sān gè rén dé lì.' }
    ],
    illustrationSlot: 'heron_clam'
  },
  {
    id: 'fable_fox_crane',
    title: '狐狸和仙鹤',
    titlePinyin: 'hú li hé xiān hè',
    type: 'fable',
    example: '待人要真诚',
    emoji: '🦢',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '狐狸请仙鹤来家里吃饭，却把汤装在平盘子里。', pinyin: 'hú li qǐng xiān hè lái jiā lǐ chī fàn, què bǎ tāng zhuāng zài píng pán zi lǐ.' },
      { text: '仙鹤嘴巴长，怎么也喝不到。', pinyin: 'xiān hè zuǐ ba cháng, zěn me yě hē bú dào.' },
      { text: '后来仙鹤也请狐狸吃饭，把汤装进细长瓶里。', pinyin: 'hòu lái xiān hè yě qǐng hú li chī fàn, bǎ tāng zhuāng jìn xì cháng píng lǐ.' },
      { text: '这回轮到狐狸吃不到了。', pinyin: 'zhè huí lún dào hú li chī bú dào le.' },
      { text: '这个故事告诉我们，怎么对待别人，别人也可能怎么对待你。', pinyin: 'zhè ge gù shì gào sù wǒ men, zěn me duì dài bié rén, bié rén yě kě néng zěn me duì dài nǐ.' }
    ],
    illustrationSlot: 'fox_crane'
  },
  {
    id: 'fable_wolf_lamb',
    title: '狼和小羊',
    titlePinyin: 'láng hé xiǎo yáng',
    type: 'fable',
    example: '坏人总会找借口',
    emoji: '🐺',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一只小羊正在河边安静地喝水。', pinyin: 'yī zhī xiǎo yáng zhèng zài hé biān ān jìng de hē shuǐ.' },
      { text: '一只狼走过来，故意说小羊把河水弄脏了。', pinyin: 'yī zhī láng zǒu guò lái, gù yì shuō xiǎo yáng bǎ hé shuǐ nòng zāng le.' },
      { text: '小羊解释说，自己站在下游，不可能把上游的水弄脏。', pinyin: 'xiǎo yáng jiě shì shuō, zì jǐ zhàn zài xià yóu, bù kě néng bǎ shàng yóu de shuǐ nòng zāng.' },
      { text: '狼又找别的借口，最后还是扑了上来。', pinyin: 'láng yòu zhǎo bié de jiè kǒu, zuì hòu hái shì pū le shàng lái.' },
      { text: '这个故事告诉我们，坏人想做坏事时，常常会乱找理由。', pinyin: 'zhè ge gù shì gào sù wǒ men, huài rén xiǎng zuò huài shì shí, cháng cháng huì luàn zhǎo lǐ yóu.' }
    ],
    illustrationSlot: 'wolf_lamb'
  },
  {
    id: 'fable_mice_bell',
    title: '老鼠开会',
    titlePinyin: 'lǎo shǔ kāi huì',
    type: 'fable',
    example: '光有主意不够',
    emoji: '🐭',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一群老鼠常常被猫追得东躲西藏。', pinyin: 'yī qún lǎo shǔ cháng cháng bèi māo zhuī de dōng duǒ xī cáng.' },
      { text: '它们开会商量办法，有只老鼠提议给猫脖子上挂个铃铛。', pinyin: 'tā men kāi huì shāng liang bàn fǎ, yǒu zhī lǎo shǔ tí yì gěi māo bó zi shàng guà gè líng dāng.' },
      { text: '大家都觉得这个主意很好。', pinyin: 'dà jiā dōu jué de zhè ge zhǔ yi hěn hǎo.' },
      { text: '可是，谁去给猫挂铃铛呢？一下子谁都不说话了。', pinyin: 'kě shì, shuí qù gěi māo guà líng dāng ne? yī xià zi shuí dōu bù shuō huà le.' },
      { text: '这个故事告诉我们，光有主意还不够，关键是能不能做到。', pinyin: 'zhè ge gù shì gào sù wǒ men, guāng yǒu zhǔ yi hái bù gòu, guān jiàn shì néng bù néng zuò dào.' }
    ],
    illustrationSlot: 'mice_bell'
  },
  {
    id: 'fable_mosquito_lion',
    title: '蚊子和狮子',
    titlePinyin: 'wén zi hé shī zi',
    type: 'fable',
    example: '胜利后别骄傲',
    emoji: '🦁',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一只小蚊子不服气地向狮子挑战。', pinyin: 'yī zhī xiǎo wén zi bù fú qì de xiàng shī zi tiǎo zhàn.' },
      { text: '它专叮狮子没有毛的地方，狮子被烦得乱跳。', pinyin: 'tā zhuān dīng shī zi méi yǒu máo de dì fāng, shī zi bèi fán de luàn tiào.' },
      { text: '最后，蚊子居然赢了，高兴得飞来飞去。', pinyin: 'zuì hòu, wén zi jū rán yíng le, gāo xìng de fēi lái fēi qù.' },
      { text: '可它一不小心撞进蜘蛛网里，被蜘蛛抓住了。', pinyin: 'kě tā yī bù xiǎo xīn zhuàng jìn zhī zhū wǎng lǐ, bèi zhī zhū zhuā zhù le.' },
      { text: '这个故事提醒我们，赢了以后也不能骄傲。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, yíng le yǐ hòu yě bù néng jiāo ào.' }
    ],
    illustrationSlot: 'mosquito_lion'
  },
  {
    id: 'fable_goat_well',
    title: '狐狸和山羊',
    titlePinyin: 'hú li hé shān yáng',
    type: 'fable',
    example: '做事要先想后果',
    emoji: '🐐',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一只狐狸不小心掉进了井里，怎么也爬不上来。', pinyin: 'yī zhī hú li bù xiǎo xīn diào jìn le jǐng lǐ, zěn me yě pá bù shàng lái.' },
      { text: '一只山羊路过，问狐狸井水好不好喝。', pinyin: 'yī zhī shān yáng lù guò, wèn hú li jǐng shuǐ hǎo bù hǎo hē.' },
      { text: '狐狸故意说井水特别甜，骗山羊跳下来。', pinyin: 'hú li gù yì shuō jǐng shuǐ tè bié tián, piàn shān yáng tiào xià lái.' },
      { text: '山羊一跳下来，狐狸踩着山羊的背爬了出去。', pinyin: 'shān yáng yī tiào xià lái, hú li cǎi zhe shān yáng de bèi pá le chū qù.' },
      { text: '这个故事告诉我们，做事前要先想清楚，别轻信别人。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì qián yào xiān xiǎng qīng chu, bié qīng xìn bié rén.' }
    ],
    illustrationSlot: 'goat_well'
  },
  {
    id: 'fable_cicada_ant',
    title: '蝉和蚂蚁',
    titlePinyin: 'chán hé mǎ yǐ',
    type: 'fable',
    example: '提前准备很重要',
    emoji: '🐜',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '夏天里，蝉天天唱歌玩耍。', pinyin: 'xià tiān lǐ, chán tiān tiān chàng gē wán shuǎ.' },
      { text: '蚂蚁却忙着搬运粮食，准备过冬。', pinyin: 'mǎ yǐ què máng zhe bān yùn liáng shi, zhǔn bèi guò dōng.' },
      { text: '冬天到了，蝉找不到吃的，只好去向蚂蚁求助。', pinyin: 'dōng tiān dào le, chán zhǎo bù dào chī de, zhǐ hǎo qù xiàng mǎ yǐ qiú zhù.' },
      { text: '这个故事告诉我们，快乐的时候也要记得为将来做准备。', pinyin: 'zhè ge gù shì gào sù wǒ men, kuài lè de shí hòu yě yào jì de wèi jiāng lái zuò zhǔn bèi.' }
    ],
    illustrationSlot: 'cicada_ant'
  },
  {
    id: 'fable_crow_peacock',
    title: '乌鸦和孔雀',
    titlePinyin: 'wū yā hé kǒng què',
    type: 'fable',
    example: '别盲目羡慕别人',
    emoji: '🦚',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '乌鸦看见孔雀羽毛漂亮，非常羡慕。', pinyin: 'wū yā kàn jiàn kǒng què yǔ máo piào liang, fēi cháng xiàn mù.' },
      { text: '它捡来漂亮羽毛插在自己身上，想装成孔雀。', pinyin: 'tā jiǎn lái piào liang yǔ máo chā zài zì jǐ shēn shàng, xiǎng zhuāng chéng kǒng què.' },
      { text: '可是孔雀们一眼就看出来了，把它赶走了。', pinyin: 'kě shì kǒng què men yī yǎn jiù kàn chū lái le, bǎ tā gǎn zǒu le.' },
      { text: '乌鸦回到同伴身边，连同伴也笑它。', pinyin: 'wū yā huí dào tóng bàn shēn biān, lián tóng bàn yě xiào tā.' },
      { text: '这个故事告诉我们，要做真实的自己，不要盲目模仿别人。', pinyin: 'zhè ge gù shì gào sù wǒ men, yào zuò zhēn shí de zì jǐ, bù yào máng mù mó fǎng bié rén.' }
    ],
    illustrationSlot: 'crow_peacock'
  },
  {
    id: 'fable_dongguo_wolf',
    title: '东郭先生和狼',
    titlePinyin: 'dōng guō xiān shēng hé láng',
    type: 'fable',
    example: '分不清善恶的帮助',
    emoji: '🐺',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '东郭先生路上遇见一只被追赶的狼。', pinyin: 'dōng guō xiān shēng lù shàng yù jiàn yī zhī bèi zhuī gǎn de láng.' },
      { text: '狼苦苦哀求，东郭先生心软了，把它藏进书袋里。', pinyin: 'láng kǔ kǔ āi qiú, dōng guō xiān shēng xīn ruǎn le, bǎ tā cáng jìn shū dài lǐ.' },
      { text: '等猎人走后，狼出来却想反过来吃掉东郭先生。', pinyin: 'děng liè rén zǒu hòu, láng chū lái què xiǎng fǎn guò lái chī diào dōng guō xiān shēng.' },
      { text: '后来多亏有智慧的人帮忙，东郭先生才脱险。', pinyin: 'hòu lái duō kuī yǒu zhì huì de rén bāng máng, dōng guō xiān shēng cái tuō xiǎn.' },
      { text: '这个故事提醒我们，善良也要有分辨是非的智慧。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, shàn liáng yě yào yǒu fēn biàn shì fēi de zhì huì.' }
    ],
    illustrationSlot: 'dongguo_wolf'
  },
  {
    id: 'history_mengmu_move',
    title: '孟母三迁',
    titlePinyin: 'mèng mǔ sān qiān',
    type: 'history',
    example: '为了孩子搬家三次',
    emoji: '🏠',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '孟子小时候，家先住在墓地附近。', pinyin: 'mèng zǐ xiǎo shí hòu, jiā xiān zhù zài mù dì fù jìn.' },
      { text: '他常常模仿办丧事，孟母觉得环境不好。', pinyin: 'tā cháng cháng mó fǎng bàn sāng shì, mèng mǔ jué de huán jìng bù hǎo.' },
      { text: '后来搬到集市边，孟子又学着叫卖。', pinyin: 'hòu lái bān dào jí shì biān, mèng zǐ yòu xué zhe jiào mài.' },
      { text: '孟母又带他搬到学堂附近，孟子开始认真学习礼仪和读书。', pinyin: 'mèng mǔ yòu dài tā bān dào xué táng fù jìn, mèng zǐ kāi shǐ rèn zhēn xué xí lǐ yí hé dú shū.' },
      { text: '这个故事告诉我们，好的成长环境非常重要。', pinyin: 'zhè ge gù shì gào sù wǒ men, hǎo de chéng zhǎng huán jìng fēi cháng zhòng yào.' }
    ],
    illustrationSlot: 'mengmu_move'
  },
  {
    id: 'history_mengmu_cut',
    title: '孟母断机',
    titlePinyin: 'mèng mǔ duàn jī',
    type: 'history',
    example: '学习不能半途而废',
    emoji: '🧵',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有一次，孟子读书读到一半，觉得辛苦就想放弃。', pinyin: 'yǒu yī cì, mèng zǐ dú shū dú dào yī bàn, jué de xīn kǔ jiù xiǎng fàng qì.' },
      { text: '孟母正在织布，听了以后，立刻剪断了织机上的布。', pinyin: 'mèng mǔ zhèng zài zhī bù, tīng le yǐ hòu, lì kè jiǎn duàn le zhī jī shàng de bù.' },
      { text: '她告诉孟子，学习半途而废，就像织布织到一半剪断一样可惜。', pinyin: 'tā gào sù mèng zǐ, xué xí bàn tú ér fèi, jiù xiàng zhī bù zhī dào yī bàn jiǎn duàn yī yàng kě xī.' },
      { text: '孟子听了很受教育，从此更加用功。', pinyin: 'mèng zǐ tīng le hěn shòu jiào yù, cóng cǐ gèng jiā yòng gōng.' }
    ],
    illustrationSlot: 'mengmu_cut'
  },
  {
    id: 'history_cheyin',
    title: '车胤囊萤',
    titlePinyin: 'chē yìn náng yíng',
    type: 'history',
    example: '借萤火虫读书',
    emoji: '✨',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '晋朝有个孩子叫车胤，家里买不起很多灯油。', pinyin: 'jìn cháo yǒu gè hái zi jiào chē yìn, jiā lǐ mǎi bù qǐ hěn duō dēng yóu.' },
      { text: '夏天晚上，他捉来很多萤火虫装进纱袋里。', pinyin: 'xià tiān wǎn shàng, tā zhuō lái hěn duō yíng huǒ chóng zhuāng jìn shā dài lǐ.' },
      { text: '借着微弱的亮光，他仍然坚持读书。', pinyin: 'jiè zhe wēi ruò de liàng guāng, tā réng rán jiān chí dú shū.' },
      { text: '后来，车胤成了有学问的人。', pinyin: 'hòu lái, chē yìn chéng le yǒu xué wèn de rén.' },
      { text: '这个故事赞扬勤学不怕苦。', pinyin: 'zhè ge gù shì zàn yáng qín xué bù pà kǔ.' }
    ],
    illustrationSlot: 'cheyin'
  },
  {
    id: 'history_sunkang',
    title: '孙康映雪',
    titlePinyin: 'sūn kāng yìng xuě',
    type: 'history',
    example: '借雪光读书',
    emoji: '❄️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '晋朝有个孩子叫孙康，也很爱读书。', pinyin: 'jìn cháo yǒu gè hái zi jiào sūn kāng, yě hěn ài dú shū.' },
      { text: '冬天夜里没有灯光，他就打开窗户，借着雪地反射的亮光看书。', pinyin: 'dōng tiān yè lǐ méi yǒu dēng guāng, tā jiù dǎ kāi chuāng hù, jiè zhe xuě dì fǎn shè de liàng guāng kàn shū.' },
      { text: '虽然天气很冷，他还是坚持学习。', pinyin: 'suī rán tiān qì hěn lěng, tā hái shì jiān chí xué xí.' },
      { text: '后来，孙康也成了很有学问的人。', pinyin: 'hòu lái, sūn kāng yě chéng le hěn yǒu xué wèn de rén.' }
    ],
    illustrationSlot: 'sunkang'
  },
  {
    id: 'history_liubang_serpent',
    title: '刘邦斩白蛇',
    titlePinyin: 'liú bāng zhǎn bái shé',
    type: 'history',
    example: '刘邦起义前的故事',
    emoji: '⚔️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '相传刘邦年轻时，有一次带人赶路。', pinyin: 'xiāng chuán liú bāng nián qīng shí, yǒu yī cì dài rén gǎn lù.' },
      { text: '前面有一条大白蛇挡住了去路。', pinyin: 'qián miàn yǒu yī tiáo dà bái shé dǎng zhù le qù lù.' },
      { text: '刘邦鼓起勇气，把蛇斩断了。', pinyin: 'liú bāng gǔ qǐ yǒng qì, bǎ shé zhǎn duàn le.' },
      { text: '后来大家觉得，这是他将来成大事的征兆。', pinyin: 'hòu lái dà jiā jué de, zhè shì tā jiāng lái chéng dà shì de zhēng zhào.' }
    ],
    illustrationSlot: 'liubang_serpent'
  },
  {
    id: 'history_luban_umbrella',
    title: '鲁班造伞',
    titlePinyin: 'lǔ bān zào sǎn',
    type: 'history',
    example: '鲁班发明雨伞',
    emoji: '☂️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '传说巧匠鲁班看到人们下雨天常常淋湿。', pinyin: 'chuán shuō qiǎo jiàng lǔ bān kàn dào rén men xià yǔ tiān cháng cháng lín shī.' },
      { text: '他想做一种东西，既能挡雨，又能轻松拿在手里。', pinyin: 'tā xiǎng zuò yī zhǒng dōng xi, jì néng dǎng yǔ, yòu néng qīng sōng ná zài shǒu lǐ.' },
      { text: '后来他受荷叶启发，做出了可以张开和收起的伞。', pinyin: 'hòu lái tā shòu hé yè qǐ fā, zuò chū le kě yǐ zhāng kāi hé shōu qǐ de sǎn.' },
      { text: '从此，人们出门更方便了。', pinyin: 'cóng cǐ, rén men chū mén gèng fāng biàn le.' }
    ],
    illustrationSlot: 'luban_umbrella'
  },
  {
    id: 'history_liubing_dujiangyan',
    title: '李冰修都江堰',
    titlePinyin: 'lǐ bīng xiū dū jiāng yàn',
    type: 'history',
    example: '治理水患灌溉农田',
    emoji: '💧',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '古代四川常常发大水，庄稼和房屋都受影响。', pinyin: 'gǔ dài sì chuān cháng cháng fā dà shuǐ, zhuāng jia hé fáng wū dōu shòu yǐng xiǎng.' },
      { text: '李冰认真观察水势，带领大家修建水利工程。', pinyin: 'lǐ bīng rèn zhēn guān chá shuǐ shì, dài lǐng dà jiā xiū jiàn shuǐ lì gōng chéng.' },
      { text: '他用巧妙的方法分水、泄洪、灌溉田地。', pinyin: 'tā yòng qiǎo miào de fāng fǎ fēn shuǐ, xiè hóng, guàn gài tián dì.' },
      { text: '后来，都江堰让百姓生活更安稳，农田也更加丰收。', pinyin: 'hòu lái, dū jiāng yàn ràng bǎi xìng shēng huó gèng ān wěn, nóng tián yě gèng jiā fēng shōu.' }
    ],
    illustrationSlot: 'liubing_dujiangyan'
  },
  {
    id: 'history_zhangheng',
    title: '张衡和地动仪',
    titlePinyin: 'zhāng héng hé dì dòng yí',
    type: 'history',
    example: '张衡发明地动仪',
    emoji: '🧭',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '东汉有位很聪明的科学家叫张衡。', pinyin: 'dōng hàn yǒu wèi hěn cōng míng de kē xué jiā jiào zhāng héng.' },
      { text: '他喜欢研究天文、地理和各种自然现象。', pinyin: 'tā xǐ huan yán jiū tiān wén, dì lǐ hé gè zhǒng zì rán xiàn xiàng.' },
      { text: '为了更早知道地震发生的方向，他发明了地动仪。', pinyin: 'wèi le gèng zǎo zhī dào dì zhèn fā shēng de fāng xiàng, tā fā míng le dì dòng yí.' },
      { text: '这个发明让人们更加佩服张衡的智慧。', pinyin: 'zhè ge fā míng ràng rén men gèng jiā pèi fú zhāng héng de zhì huì.' }
    ],
    illustrationSlot: 'zhangheng'
  },
  {
    id: 'history_lishizhen',
    title: '李时珍尝药',
    titlePinyin: 'lǐ shí zhēn cháng yào',
    type: 'history',
    example: '认真研究草药',
    emoji: '🌿',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '明朝有位著名医生叫李时珍。', pinyin: 'míng cháo yǒu wèi zhù míng yī shēng jiào lǐ shí zhēn.' },
      { text: '为了弄清草药的作用，他走了很多地方，认真观察和记录。', pinyin: 'wèi le nòng qīng cǎo yào de zuò yòng, tā zǒu le hěn duō dì fāng, rèn zhēn guān chá hé jì lù.' },
      { text: '有时他还亲自尝药，看看味道和效果。', pinyin: 'yǒu shí tā hái qīn zì cháng yào, kàn kan wèi dào hé xiào guǒ.' },
      { text: '后来，他写成了很重要的医学书《本草纲目》。', pinyin: 'hòu lái, tā xiě chéng le hěn zhòng yào de yī xué shū běn cǎo gāng mù.' },
      { text: '这个故事赞扬认真求实、坚持钻研的精神。', pinyin: 'zhè ge gù shì zàn yáng rèn zhēn qiú shí, jiān chí zuān yán de jīng shén.' }
    ],
    illustrationSlot: 'lishizhen'
  },
  {
    id: 'history_wencheng',
    title: '文成公主入藏',
    titlePinyin: 'wén chéng gōng zhǔ rù zàng',
    type: 'history',
    example: '带去文化和友谊',
    emoji: '🏔️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '唐朝时，文成公主远行去吐蕃。', pinyin: 'táng cháo shí, wén chéng gōng zhǔ yuǎn xíng qù tǔ bō.' },
      { text: '她带去了很多书籍、种子、工艺和文化。', pinyin: 'tā dài qù le hěn duō shū jí, zhǒng zi, gōng yì hé wén huà.' },
      { text: '人们把她看作和平与友谊的使者。', pinyin: 'rén men bǎ tā kàn zuò hé píng yǔ yǒu yì de shǐ zhě.' },
      { text: '这个故事让我们记住民族之间互相尊重、友好相处。', pinyin: 'zhè ge gù shì ràng wǒ men jì zhù mín zú zhī jiān hù xiāng zūn zhòng, yǒu hǎo xiāng chǔ.' }
    ],
    illustrationSlot: 'wencheng'
  },
  {
    id: 'history_xuanzang',
    title: '玄奘西行',
    titlePinyin: 'xuán zàng xī xíng',
    type: 'history',
    example: '远行求学',
    emoji: '🐫',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '唐朝有位和尚叫玄奘，他很想学到更完整的佛经知识。', pinyin: 'táng cháo yǒu wèi hé shàng jiào xuán zàng, tā hěn xiǎng xué dào gèng wán zhěng de fó jīng zhī shi.' },
      { text: '于是，他不怕路远，踏上了去西方求学的旅程。', pinyin: 'yú shì, tā bù pà lù yuǎn, tà shàng le qù xī fāng qiú xué de lǚ chéng.' },
      { text: '一路上，他翻山越岭，经过沙漠和高山，吃了很多苦。', pinyin: 'yī lù shàng, tā fān shān yuè lǐng, jīng guò shā mò hé gāo shān, chī le hěn duō kǔ.' },
      { text: '最后，他带着很多书卷回到长安，帮助更多人学习。', pinyin: 'zuì hòu, tā dài zhe hěn duō shū juǎn huí dào cháng ān, bāng zhù gèng duō rén xué xí.' },
      { text: '这个故事赞扬坚持理想、勇敢求知。', pinyin: 'zhè ge gù shì zàn yáng jiān chí lǐ xiǎng, yǒng gǎn qiú zhī.' }
    ],
    illustrationSlot: 'xuanzang'
  },
  {
    id: 'fable_pony_river',
    title: '小马过河',
    titlePinyin: 'xiǎo mǎ guò hé',
    type: 'fable',
    example: '遇事要自己试一试',
    emoji: '🐴',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '小马要帮妈妈把粮食送到河对岸。', pinyin: 'xiǎo mǎ yào bāng mā ma bǎ liáng shi sòng dào hé duì àn.' },
      { text: '来到河边，它不知道河水深不深。', pinyin: 'lái dào hé biān, tā bù zhī dào hé shuǐ shēn bù shēn.' },
      { text: '老牛说河水很浅，小松鼠却说河水很深。', pinyin: 'lǎo niú shuō hé shuǐ hěn qiǎn, xiǎo sōng shǔ què shuō hé shuǐ hěn shēn.' },
      { text: '小马回去问妈妈，妈妈鼓励它自己去试一试。', pinyin: 'xiǎo mǎ huí qù wèn mā ma, mā ma gǔ lì tā zì jǐ qù shì yī shì.' },
      { text: '最后，小马勇敢过河，发现河水刚刚好。', pinyin: 'zuì hòu, xiǎo mǎ yǒng gǎn guò hé, fā xiàn hé shuǐ gāng gāng hǎo.' },
      { text: '这个故事告诉我们，遇到事情要多动脑，也要勇敢实践。', pinyin: 'zhè ge gù shì gào sù wǒ men, yù dào shì qing yào duō dòng nǎo, yě yào yǒng gǎn shí jiàn.' }
    ],
    illustrationSlot: 'pony_river'
  },
  {
    id: 'fable_gold_axe',
    title: '金斧头银斧头',
    titlePinyin: 'jīn fǔ tou yín fǔ tou',
    type: 'fable',
    example: '诚实的人会得到回报',
    emoji: '🪓',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '有个樵夫砍柴时，不小心把铁斧头掉进了河里。', pinyin: 'yǒu gè qiáo fū kǎn chái shí, bù xiǎo xīn bǎ tiě fǔ tóu diào jìn le hé lǐ.' },
      { text: '河神先拿出一把金斧头，问是不是他的。', pinyin: 'hé shén xiān ná chū yī bǎ jīn fǔ tóu, wèn shì bú shì tā de.' },
      { text: '樵夫老老实实地说，不是自己的。', pinyin: 'qiáo fū lǎo lǎo shí shí de shuō, bú shì zì jǐ de.' },
      { text: '河神又拿出银斧头，樵夫还是说不是。', pinyin: 'hé shén yòu ná chū yín fǔ tóu, qiáo fū hái shì shuō bú shì.' },
      { text: '最后河神拿出了铁斧头，樵夫高兴地认了出来。', pinyin: 'zuì hòu hé shén ná chū le tiě fǔ tóu, qiáo fū gāo xìng de rèn le chū lái.' },
      { text: '河神夸他诚实，把三把斧头都送给了他。', pinyin: 'hé shén kuā tā chéng shí, bǎ sān bǎ fǔ tóu dōu sòng gěi le tā.' }
    ],
    illustrationSlot: 'gold_axe'
  },
  {
    id: 'fable_monkey_downhill',
    title: '猴子下山',
    titlePinyin: 'hóu zi xià shān',
    type: 'fable',
    example: '贪多反而两手空空',
    emoji: '🐒',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '一只猴子下山，看见玉米地，就掰了一个大玉米。', pinyin: 'yī zhī hóu zi xià shān, kàn jiàn yù mǐ dì, jiù bāi le yī gè dà yù mǐ.' },
      { text: '走着走着，它又看见桃树，就把玉米丢了去摘桃子。', pinyin: 'zǒu zhe zǒu zhe, tā yòu kàn jiàn táo shù, jiù bǎ yù mǐ diū le qù zhāi táo zi.' },
      { text: '后来它又想抓兔子、追西瓜，结果一路丢一路换。', pinyin: 'hòu lái tā yòu xiǎng zhuā tù zi, zhuī xī guā, jié guǒ yī lù diū yī lù huàn.' },
      { text: '等到回家时，猴子什么也没带回来。', pinyin: 'děng dào huí jiā shí, hóu zi shén me yě méi dài huí lái.' },
      { text: '这个故事告诉我们，做事不能太贪心，要专心做好一件事。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì bù néng tài tān xīn, yào zhuān xīn zuò hǎo yī jiàn shì.' }
    ],
    illustrationSlot: 'monkey_downhill'
  },
  {
    id: 'fable_mantis_cicada',
    title: '螳螂捕蝉',
    titlePinyin: 'táng láng bǔ chán',
    type: 'fable',
    example: '只顾眼前容易忽略身后',
    emoji: '🪲',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '树上有只蝉正在高兴地叫。', pinyin: 'shù shàng yǒu zhī chán zhèng zài gāo xìng de jiào.' },
      { text: '螳螂悄悄靠近，想把蝉抓住。', pinyin: 'táng láng qiāo qiāo kào jìn, xiǎng bǎ chán zhuā zhù.' },
      { text: '可它不知道，后面还有只黄雀正盯着它。', pinyin: 'kě tā bù zhī dào, hòu miàn hái yǒu zhī huáng què zhèng dīng zhe tā.' },
      { text: '这个故事提醒我们，不能只盯着眼前利益，还要看到后面的危险。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, bù néng zhǐ dīng zhe yǎn qián lì yì, hái yào kàn dào hòu miàn de wēi xiǎn.' }
    ],
    illustrationSlot: 'mantis_cicada'
  },
  {
    id: 'fable_two_goats',
    title: '两只山羊',
    titlePinyin: 'liǎng zhī shān yáng',
    type: 'fable',
    example: '互不相让容易一起吃亏',
    emoji: '🐐',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '两只山羊在独木桥两头相遇了。', pinyin: 'liǎng zhī shān yáng zài dú mù qiáo liǎng tóu xiāng yù le.' },
      { text: '谁也不肯让谁，都想先过去。', pinyin: 'shuí yě bù kěn ràng shuí, dōu xiǎng xiān guò qù.' },
      { text: '它们顶来顶去，最后一起掉进河里。', pinyin: 'tā men dǐng lái dǐng qù, zuì hòu yī qǐ diào jìn hé lǐ.' },
      { text: '这个故事告诉我们，遇事要学会礼让和合作。', pinyin: 'zhè ge gù shì gào sù wǒ men, yù shì yào xué huì lǐ ràng hé hé zuò.' }
    ],
    illustrationSlot: 'two_goats'
  },
  {
    id: 'fable_donkey_river',
    title: '驴子过河',
    titlePinyin: 'lǘ zi guò hé',
    type: 'fable',
    example: '耍小聪明可能自找麻烦',
    emoji: '🫏',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一头驴背着盐过河，不小心滑倒了。', pinyin: 'yī tóu lǘ bèi zhe yán guò hé, bù xiǎo xīn huá dǎo le.' },
      { text: '盐化进水里，担子一下子变轻了。', pinyin: 'yán huà jìn shuǐ lǐ, dàn zi yī xià zi biàn qīng le.' },
      { text: '第二天它故意再摔倒，可这次背的是棉花。', pinyin: 'dì èr tiān tā gù yì zài shuāi dǎo, kě zhè cì bèi de shì mián huā.' },
      { text: '棉花吸了水，变得更重，驴子更累了。', pinyin: 'mián huā xī le shuǐ, biàn de gèng zhòng, lǘ zi gèng lèi le.' },
      { text: '这个故事告诉我们，耍小聪明有时反而会吃亏。', pinyin: 'zhè ge gù shì gào sù wǒ men, shuǎ xiǎo cōng míng yǒu shí fǎn ér huì chī kuī.' }
    ],
    illustrationSlot: 'donkey_river'
  },
  {
    id: 'fable_bird_turtle',
    title: '燕子和乌龟',
    titlePinyin: 'yàn zi hé wū guī',
    type: 'fable',
    example: '爱炫耀容易出事',
    emoji: '🐢',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '乌龟想飞上天，燕子们就帮它叼着木棍两头。', pinyin: 'wū guī xiǎng fēi shàng tiān, yàn zi men jiù bāng tā diāo zhe mù gùn liǎng tóu.' },
      { text: '乌龟咬住木棍中间，真的飞了起来。', pinyin: 'wū guī yǎo zhù mù gùn zhōng jiān, zhēn de fēi le qǐ lái.' },
      { text: '路上的人都惊讶极了，乌龟忍不住张嘴炫耀。', pinyin: 'lù shàng de rén dōu jīng yà jí le, wū guī rěn bú zhù zhāng zuǐ xuàn yào.' },
      { text: '它一松口就掉了下来。这个故事提醒我们，不要太爱炫耀。', pinyin: 'tā yī sōng kǒu jiù diào le xià lái. zhè ge gù shì tí xǐng wǒ men, bù yào tài ài xuàn yào.' }
    ],
    illustrationSlot: 'bird_turtle'
  },
  {
    id: 'fable_fisherman_goldfish',
    title: '渔夫和金鱼',
    titlePinyin: 'yú fū hé jīn yú',
    type: 'fable',
    example: '贪心没有好结果',
    emoji: '🐟',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一位渔夫捞到了一条会说话的小金鱼。', pinyin: 'yī wèi yú fū lāo dào le yī tiáo huì shuō huà de xiǎo jīn yú.' },
      { text: '金鱼请求他放自己回海里，并答应帮助他实现愿望。', pinyin: 'jīn yú qǐng qiú tā fàng zì jǐ huí hǎi lǐ, bìng dā yìng bāng zhù tā shí xiàn yuàn wàng.' },
      { text: '渔夫本来很知足，可他的妻子一次次提出更多要求。', pinyin: 'yú fū běn lái hěn zhī zú, kě tā de qī zi yī cì cì tí chū gèng duō yāo qiú.' },
      { text: '最后，因为太贪心，他们失去了原本得到的一切。', pinyin: 'zuì hòu, yīn wèi tài tān xīn, tā men shī qù le yuán běn dé dào de yī qiè.' },
      { text: '这个故事告诉我们，知足常乐，贪心往往会带来失去。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhī zú cháng lè, tān xīn wǎng wǎng huì dài lái shī qù.' }
    ],
    illustrationSlot: 'fisherman_goldfish'
  },
  {
    id: 'history_yuemu',
    title: '岳母刺字',
    titlePinyin: 'yuè mǔ cì zì',
    type: 'history',
    example: '把报国之志刻在心里',
    emoji: '🪡',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '岳飞从小聪明勇敢，很想报效国家。', pinyin: 'yuè fēi cóng xiǎo cōng míng yǒng gǎn, hěn xiǎng bào xiào guó jiā.' },
      { text: '他的母亲为了勉励他，在他背上刺下了“精忠报国”四个字。', pinyin: 'tā de mǔ qīn wèi le miǎn lì tā, zài tā bèi shàng cì xià le jīng zhōng bào guó sì gè zì.' },
      { text: '岳飞把这四个字牢牢记在心里，一直努力练武。', pinyin: 'yuè fēi bǎ zhè sì gè zì láo láo jì zài xīn lǐ, yī zhí nǔ lì liàn wǔ.' },
      { text: '这个故事赞美忠诚、坚毅和家国担当。', pinyin: 'zhè ge gù shì zàn měi zhōng chéng, jiān yì hé jiā guó dān dāng.' }
    ],
    illustrationSlot: 'yuemu'
  },
  {
    id: 'history_wangrong',
    title: '王戎识李',
    titlePinyin: 'wáng róng shí lǐ',
    type: 'history',
    example: '善于观察就能判断',
    emoji: '🍐',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '小时候的王戎和小伙伴一起出去玩。', pinyin: 'xiǎo shí hòu de wáng róng hé xiǎo huǒ bàn yī qǐ chū qù wán.' },
      { text: '大家看到路边一棵李子树结满了果子，都想去摘。', pinyin: 'dà jiā kàn dào lù biān yī kē lǐ zi shù jié mǎn le guǒ zi, dōu xiǎng qù zhāi.' },
      { text: '只有王戎站着不动，说这李子一定是苦的。', pinyin: 'zhǐ yǒu wáng róng zhàn zhe bù dòng, shuō zhè lǐ zi yī dìng shì kǔ de.' },
      { text: '大家摘来一尝，果然很苦。', pinyin: 'dà jiā zhāi lái yī cháng, guǒ rán hěn kǔ.' },
      { text: '这个故事告诉我们，要学会仔细观察和思考。', pinyin: 'zhè ge gù shì gào sù wǒ men, yào xué huì zǐ xì guān chá hé sī kǎo.' }
    ],
    illustrationSlot: 'wangrong'
  },
  {
    id: 'history_kongzi_qin',
    title: '孔子学琴',
    titlePinyin: 'kǒng zǐ xué qín',
    type: 'history',
    example: '学东西要用心琢磨',
    emoji: '🎼',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '孔子学弹琴时，非常认真。', pinyin: 'kǒng zǐ xué tán qín shí, fēi cháng rèn zhēn.' },
      { text: '老师觉得他已经弹得很好了，想教他下一首曲子。', pinyin: 'lǎo shī jué de tā yǐ jīng tán de hěn hǎo le, xiǎng jiāo tā xià yī shǒu qǔ zi.' },
      { text: '孔子却说，自己还没完全明白这首曲子的情感和意思。', pinyin: 'kǒng zǐ què shuō, zì jǐ hái méi wán quán míng bái zhè shǒu qǔ zi de qíng gǎn hé yì si.' },
      { text: '他继续反复练习，直到真正领会其中的精神。', pinyin: 'tā jì xù fǎn fù liàn xí, zhí dào zhēn zhèng lǐng huì qí zhōng de jīng shén.' },
      { text: '这个故事告诉我们，学东西不能只求快，要真正学懂。', pinyin: 'zhè ge gù shì gào sù wǒ men, xué dōng xi bù néng zhǐ qiú kuài, yào zhēn zhèng xué dǒng.' }
    ],
    illustrationSlot: 'kongzi_qin'
  },
  {
    id: 'history_caozhi',
    title: '曹植七步成诗',
    titlePinyin: 'cáo zhí qī bù chéng shī',
    type: 'history',
    example: '才思敏捷',
    emoji: '📝',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '曹植很有才华，写诗特别快。', pinyin: 'cáo zhí hěn yǒu cái huá, xiě shī tè bié kuài.' },
      { text: '有一次，哥哥让他在七步之内作出一首诗。', pinyin: 'yǒu yī cì, gē ge ràng tā zài qī bù zhī nèi zuò chū yī shǒu shī.' },
      { text: '曹植边走边想，很快就吟出了著名的诗句。', pinyin: 'cáo zhí biān zǒu biān xiǎng, hěn kuài jiù yín chū le zhù míng de shī jù.' },
      { text: '这个故事常用来称赞人文思敏捷、才华出众。', pinyin: 'zhè ge gù shì cháng yòng lái chēng zàn rén wén sī mǐn jié, cái huá chū zhòng.' }
    ],
    illustrationSlot: 'caozhi'
  },
  {
    id: 'history_banchao',
    title: '班超投笔从戎',
    titlePinyin: 'bān chāo tóu bǐ cóng róng',
    type: 'history',
    example: '立志做更大的事',
    emoji: '🖋️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '年轻时的班超靠抄写文书养家。', pinyin: 'nián qīng shí de bān chāo kào chāo xiě wén shū yǎng jiā.' },
      { text: '有一天，他放下笔叹气，说自己不想一辈子只做文书小事。', pinyin: 'yǒu yī tiān, tā fàng xià bǐ tàn qì, shuō zì jǐ bù xiǎng yī bèi zi zhǐ zuò wén shū xiǎo shì.' },
      { text: '后来，他真的去从军，并立下了很多功劳。', pinyin: 'hòu lái, tā zhēn de qù cóng jūn, bìng lì xià le hěn duō gōng láo.' },
      { text: '这个故事鼓励人们立下远大志向并付诸行动。', pinyin: 'zhè ge gù shì gǔ lì rén men lì xià yuǎn dà zhì xiàng bìng fù zhū xíng dòng.' }
    ],
    illustrationSlot: 'banchao'
  },
  {
    id: 'history_wangmian',
    title: '王冕学画',
    titlePinyin: 'wáng miǎn xué huà',
    type: 'history',
    example: '认真观察才能画得好',
    emoji: '🎨',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '王冕小时候很喜欢画画，可家里条件不好。', pinyin: 'wáng miǎn xiǎo shí hòu hěn xǐ huan huà huà, kě jiā lǐ tiáo jiàn bù hǎo.' },
      { text: '他经常到池塘边观察荷花、荷叶和水面的变化。', pinyin: 'tā jīng cháng dào chí táng biān guān chá hé huā, hé yè hé shuǐ miàn de biàn huà.' },
      { text: '因为观察得细致，他后来画出的荷花特别生动。', pinyin: 'yīn wèi guān chá de xì zhì, tā hòu lái huà chū de hé huā tè bié shēng dòng.' },
      { text: '这个故事告诉我们，想学好本领，要认真观察、勤学苦练。', pinyin: 'zhè ge gù shì gào sù wǒ men, xiǎng xué hǎo běn lǐng, yào rèn zhēn guān chá, qín xué kǔ liàn.' }
    ],
    illustrationSlot: 'wangmian'
  },
  {
    id: 'history_cailun',
    title: '蔡伦造纸',
    titlePinyin: 'cài lún zào zhǐ',
    type: 'history',
    example: '让纸更适合书写',
    emoji: '📜',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '古时候，人们在竹简和丝帛上写字，很不方便。', pinyin: 'gǔ shí hòu, rén men zài zhú jiǎn hé sī bó shàng xiě zì, hěn bù fāng biàn.' },
      { text: '蔡伦认真研究，试着用树皮、麻头和旧布来做纸。', pinyin: 'cài lún rèn zhēn yán jiū, shì zhe yòng shù pí, má tóu hé jiù bù lái zuò zhǐ.' },
      { text: '后来，他改进出了更轻便、更适合写字的纸。', pinyin: 'hòu lái, tā gǎi jìn chū le gèng qīng biàn, gèng shì hé xiě zì de zhǐ.' },
      { text: '这个发明让读书写字变得更加方便。', pinyin: 'zhè ge fā míng ràng dú shū xiě zì biàn de gèng jiā fāng biàn.' }
    ],
    illustrationSlot: 'cailun'
  },
  {
    id: 'history_bisheng',
    title: '毕昇发明活字印刷',
    titlePinyin: 'bì shēng fā míng huó zì yìn shuā',
    type: 'history',
    example: '让印书更快',
    emoji: '🧱',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '以前印书需要整块刻版，做起来很慢。', pinyin: 'yǐ qián yìn shū xū yào zhěng kuài kè bǎn, zuò qǐ lái hěn màn.' },
      { text: '毕昇想出了一个新办法，把一个个字单独做出来。', pinyin: 'bì shēng xiǎng chū le yī gè xīn bàn fǎ, bǎ yī gè gè zì dān dú zuò chū lái.' },
      { text: '这样排版更灵活，印书也更方便。', pinyin: 'zhè yàng pái bǎn gèng líng huó, yìn shū yě gèng fāng biàn.' },
      { text: '这个发明推动了知识更快地传播。', pinyin: 'zhè ge fā míng tuī dòng le zhī shi gèng kuài de chuán bō.' }
    ],
    illustrationSlot: 'bisheng'
  },
  {
    id: 'fable_zhengren',
    title: '郑人买履',
    titlePinyin: 'zhèng rén mǎi lǚ',
    type: 'fable',
    example: '做事不能死守教条',
    emoji: '👞',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有个郑国人想去买鞋，先在家里量好了自己的脚。', pinyin: 'yǒu gè zhèng guó rén xiǎng qù mǎi xié, xiān zài jiā lǐ liáng hǎo le zì jǐ de jiǎo.' },
      { text: '到了集市，他才发现把量好的尺寸忘在家里了。', pinyin: 'dào le jí shì, tā cái fā xiàn bǎ liáng hǎo de chǐ cùn wàng zài jiā lǐ le.' },
      { text: '别人劝他直接试鞋，他却坚持回家拿尺寸。', pinyin: 'bié rén quàn tā zhí jiē shì xié, tā què jiān chí huí jiā ná chǐ cùn.' },
      { text: '等他回来，集市已经散了，鞋也没买成。', pinyin: 'děng tā huí lái, jí shì yǐ jīng sàn le, xié yě méi mǎi chéng.' },
      { text: '这个故事告诉我们，做事要灵活，不能只认死规矩。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào líng huó, bù néng zhǐ rèn sǐ guī ju.' }
    ],
    illustrationSlot: 'zhengren_buy_shoes'
  },
  {
    id: 'fable_suspect_axe',
    title: '疑人偷斧',
    titlePinyin: 'yí rén tōu fǔ',
    type: 'fable',
    example: '先入为主容易看错人',
    emoji: '🪓',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人丢了一把斧头，怀疑是邻居家的孩子偷了。', pinyin: 'yǒu rén diū le yī bǎ fǔ tóu, huái yí shì lín jū jiā de hái zi tōu le.' },
      { text: '他越看越觉得那孩子走路像贼、说话也像贼。', pinyin: 'tā yuè kàn yuè jué de nà hái zi zǒu lù xiàng zéi, shuō huà yě xiàng zéi.' },
      { text: '后来，他在自家角落里找到了那把斧头。', pinyin: 'hòu lái, tā zài zì jiā jiǎo luò lǐ zhǎo dào le nà bǎ fǔ tóu.' },
      { text: '再看邻居家的孩子时，他又觉得那孩子一点也不像贼。', pinyin: 'zài kàn lín jū jiā de hái zi shí, tā yòu jué de nà hái zi yī diǎn yě bù xiàng zéi.' },
      { text: '这个故事提醒我们，不要带着偏见看别人。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, bù yào dài zhe piān jiàn kàn bié rén.' }
    ],
    illustrationSlot: 'suspect_axe'
  },
  {
    id: 'fable_south_north',
    title: '南辕北辙',
    titlePinyin: 'nán yuán běi zhé',
    type: 'fable',
    example: '方向错了越努力越远',
    emoji: '🛺',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有个人要去北方，却驾着马车一直往南走。', pinyin: 'yǒu gè rén yào qù běi fāng, què jià zhe mǎ chē yī zhí wǎng nán zǒu.' },
      { text: '别人提醒他方向错了，他却说自己的马好、钱多、车夫技术高。', pinyin: 'bié rén tí xǐng tā fāng xiàng cuò le, tā què shuō zì jǐ de mǎ hǎo, qián duō, chē fū jì shù gāo.' },
      { text: '可是条件再好，方向错了也到不了目的地。', pinyin: 'kě shì tiáo jiàn zài hǎo, fāng xiàng cuò le yě dào bù liǎo mù dì dì.' },
      { text: '这个故事告诉我们，做事先要找对方向。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì xiān yào zhǎo duì fāng xiàng.' }
    ],
    illustrationSlot: 'south_north'
  },
  {
    id: 'fable_qiren',
    title: '杞人忧天',
    titlePinyin: 'qǐ rén yōu tiān',
    type: 'fable',
    example: '不要为不必要的事过度担心',
    emoji: '☁️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '杞国有个人总担心天会塌下来，自己会没地方站。', pinyin: 'qǐ guó yǒu gè rén zǒng dān xīn tiān huì tā xià lái, zì jǐ huì méi dì fāng zhàn.' },
      { text: '他整天愁眉苦脸，吃不下饭，也睡不好觉。', pinyin: 'tā zhěng tiān chóu méi kǔ liǎn, chī bù xià fàn, yě shuì bù hǎo jiào.' },
      { text: '后来，有人耐心告诉他天地的道理，他才放下心来。', pinyin: 'hòu lái, yǒu rén nài xīn gào sù tā tiān dì de dào lǐ, tā cái fàng xià xīn lái.' },
      { text: '这个故事告诉我们，不要为没有根据的事情过度忧虑。', pinyin: 'zhè ge gù shì gào sù wǒ men, bù yào wèi méi yǒu gēn jù de shì qing guò dù yōu lǜ.' }
    ],
    illustrationSlot: 'qiren_worry'
  },
  {
    id: 'fable_buy_box_return_pearl',
    title: '买椟还珠',
    titlePinyin: 'mǎi dú huán zhū',
    type: 'fable',
    example: '不能只看外表忽略真正价值',
    emoji: '💎',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人把珍珠放在漂亮的盒子里出售。', pinyin: 'yǒu rén bǎ zhēn zhū fàng zài piào liang de hé zi lǐ chū shòu.' },
      { text: '买的人特别喜欢那个盒子，却觉得珍珠没有用。', pinyin: 'mǎi de rén tè bié xǐ huan nà ge hé zi, què jué de zhēn zhū méi yǒu yòng.' },
      { text: '于是，他把珍珠还给卖家，只留下了盒子。', pinyin: 'yú shì, tā bǎ zhēn zhū huán gěi mài jiā, zhǐ liú xià le hé zi.' },
      { text: '这个故事提醒我们，不要只看表面，要看到真正重要的东西。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, bù yào zhǐ kàn biǎo miàn, yào kàn dào zhēn zhèng zhòng yào de dōng xi.' }
    ],
    illustrationSlot: 'box_pearl'
  },
  {
    id: 'fable_wrong_paths',
    title: '歧路亡羊',
    titlePinyin: 'qí lù wáng yáng',
    type: 'fable',
    example: '岔路太多容易迷失目标',
    emoji: '🐑',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人家的羊跑丢了，大家一起帮忙去找。', pinyin: 'yǒu rén jiā de yáng pǎo diū le, dà jiā yī qǐ bāng máng qù zhǎo.' },
      { text: '可是岔路越来越多，谁也不知道羊到底往哪边去了。', pinyin: 'kě shì chà lù yuè lái yuè duō, shuí yě bù zhī dào yáng dào dǐ wǎng nǎ biān qù le.' },
      { text: '最后，大家找了很久，也没找到那只羊。', pinyin: 'zuì hòu, dà jiā zhǎo le hěn jiǔ, yě méi zhǎo dào nà zhī yáng.' },
      { text: '这个故事告诉我们，选择太多时更要抓住主要方向。', pinyin: 'zhè ge gù shì gào sù wǒ men, xuǎn zé tài duō shí gèng yào zhuā zhù zhǔ yào fāng xiàng.' }
    ],
    illustrationSlot: 'wrong_paths'
  },
  {
    id: 'fable_jichang_archery',
    title: '纪昌学射',
    titlePinyin: 'jì chāng xué shè',
    type: 'fable',
    example: '练基本功要有耐心',
    emoji: '🏹',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '纪昌想学射箭，就去拜名师飞卫。', pinyin: 'jì chāng xiǎng xué shè jiàn, jiù qù bài míng shī fēi wèi.' },
      { text: '老师先不让他摸弓箭，只让他练眼力和专注。', pinyin: 'lǎo shī xiān bù ràng tā mō gōng jiàn, zhǐ ràng tā liàn yǎn lì hé zhuān zhù.' },
      { text: '纪昌天天坚持练习，连很小的目标也能看得清楚。', pinyin: 'jì chāng tiān tiān jiān chí liàn xí, lián hěn xiǎo de mù biāo yě néng kàn de qīng chu.' },
      { text: '后来，他终于练成了高超的射箭本领。', pinyin: 'hòu lái, tā zhōng yú liàn chéng le gāo chāo de shè jiàn běn lǐng.' },
      { text: '这个故事告诉我们，基本功扎实了，本领才会真正提高。', pinyin: 'zhè ge gù shì gào sù wǒ men, jī běn gōng zhā shí le, běn lǐng cái huì zhēn zhèng tí gāo.' }
    ],
    illustrationSlot: 'jichang_archery'
  },
  {
    id: 'fable_two_children_sun',
    title: '两小儿辩日',
    titlePinyin: 'liǎng xiǎo ér biàn rì',
    type: 'fable',
    example: '看问题要多角度思考',
    emoji: '☀️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '两个小孩争论太阳什么时候离人更近。', pinyin: 'liǎng gè xiǎo hái zhēng lùn tài yáng shén me shí hòu lí rén gèng jìn.' },
      { text: '一个说早晨近，因为看起来大；一个说中午近，因为晒起来热。', pinyin: 'yī gè shuō zǎo chén jìn, yīn wèi kàn qǐ lái dà; yī gè shuō zhōng wǔ jìn, yīn wèi shài qǐ lái rè.' },
      { text: '他们都说得有道理，却谁也说服不了谁。', pinyin: 'tā men dōu shuō de yǒu dào lǐ, què shuí yě shuō fú bù liǎo shuí.' },
      { text: '这个故事提醒我们，遇到问题要多观察、多思考。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, yù dào wèn tí yào duō guān chá, duō sī kǎo.' }
    ],
    illustrationSlot: 'two_children_sun'
  },
  {
    id: 'history_huangxiang',
    title: '黄香温席',
    titlePinyin: 'huáng xiāng wēn xí',
    type: 'history',
    example: '懂得体贴长辈',
    emoji: '🛏️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '黄香小时候非常孝顺父亲。', pinyin: 'huáng xiāng xiǎo shí hòu fēi cháng xiào shùn fù qīn.' },
      { text: '冬天，他会先钻进被窝，把被子和床席暖热。', pinyin: 'dōng tiān, tā huì xiān zuān jìn bèi wō, bǎ bèi zi hé chuáng xí nuǎn rè.' },
      { text: '夏天，他又会替父亲赶走蚊虫，让床铺更凉快。', pinyin: 'xià tiān, tā yòu huì tì fù qīn gǎn zǒu wén chóng, ràng chuáng pù gèng liáng kuài.' },
      { text: '这个故事赞扬关心长辈、懂得体贴的好品德。', pinyin: 'zhè ge gù shì zàn yáng guān xīn zhǎng bèi, dǒng de tǐ tiē de hǎo pǐn dé.' }
    ],
    illustrationSlot: 'huangxiang'
  },
  {
    id: 'history_simaqian',
    title: '司马迁写史记',
    titlePinyin: 'sī mǎ qiān xiě shǐ jì',
    type: 'history',
    example: '忍受困难也要完成理想',
    emoji: '📚',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '司马迁从小喜欢读书，也常跟着父亲了解历史。', pinyin: 'sī mǎ qiān cóng xiǎo xǐ huan dú shū, yě cháng gēn zhe fù qīn liǎo jiě lì shǐ.' },
      { text: '长大后，他下定决心写一部记录历史的大书。', pinyin: 'zhǎng dà hòu, tā xià dìng jué xīn xiě yī bù jì lù lì shǐ de dà shū.' },
      { text: '虽然遇到了很大的困难和痛苦，他还是坚持写作。', pinyin: 'suī rán yù dào le hěn dà de kùn nan hé tòng kǔ, tā hái shì jiān chí xiě zuò.' },
      { text: '后来，他终于完成了著名的《史记》。', pinyin: 'hòu lái, tā zhōng yú wán chéng le zhù míng de shǐ jì.' },
      { text: '这个故事告诉我们，真正的理想需要坚强和坚持。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhēn zhèng de lǐ xiǎng xū yào jiān qiáng hé jiān chí.' }
    ],
    illustrationSlot: 'simaqian'
  },
  {
    id: 'history_suwu',
    title: '苏武牧羊',
    titlePinyin: 'sū wǔ mù yáng',
    type: 'history',
    example: '不改初心，坚守使命',
    emoji: '🐏',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '汉朝使者苏武出使远方时，被敌国扣留了。', pinyin: 'hàn cháo shǐ zhě sū wǔ chū shǐ yuǎn fāng shí, bèi dí guó kòu liú le.' },
      { text: '别人想让他改变立场，可他始终不答应。', pinyin: 'bié rén xiǎng ràng tā gǎi biàn lì chǎng, kě tā shǐ zhōng bù dā yìng.' },
      { text: '后来，他被安排去荒野牧羊，日子非常辛苦。', pinyin: 'hòu lái, tā bèi ān pái qù huāng yě mù yáng, rì zi fēi cháng xīn kǔ.' },
      { text: '不管环境多难，他都坚持自己的信念。', pinyin: 'bù guǎn huán jìng duō nán, tā dōu jiān chí zì jǐ de xìn niàn.' },
      { text: '这个故事赞扬忠诚、坚韧和责任感。', pinyin: 'zhè ge gù shì zàn yáng zhōng chéng, jiān rèn hé zé rèn gǎn.' }
    ],
    illustrationSlot: 'suwu'
  },
  {
    id: 'history_jianzhen',
    title: '鉴真东渡',
    titlePinyin: 'jiàn zhēn dōng dù',
    type: 'history',
    example: '为了传播学问不怕困难',
    emoji: '⛵',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '唐朝高僧鉴真想把佛学和医药知识带到日本。', pinyin: 'táng cháo gāo sēng jiàn zhēn xiǎng bǎ fó xué hé yī yào zhī shi dài dào rì běn.' },
      { text: '他多次出海都失败了，还经历了很大危险。', pinyin: 'tā duō cì chū hǎi dōu shī bài le, hái jīng lì le hěn dà wēi xiǎn.' },
      { text: '尽管这样，他还是没有放弃。', pinyin: 'jǐn guǎn zhè yàng, tā hái shì méi yǒu fàng qì.' },
      { text: '最后，他终于成功到达日本，帮助很多人学习。', pinyin: 'zuì hòu, tā zhōng yú chéng gōng dào dá rì běn, bāng zhù hěn duō rén xué xí.' },
      { text: '这个故事赞扬坚持、勇气和文化交流的精神。', pinyin: 'zhè ge gù shì zàn yáng jiān chí, yǒng qì hé wén huà jiāo liú de jīng shén.' }
    ],
    illustrationSlot: 'jianzhen'
  },
  {
    id: 'history_zhangqian',
    title: '张骞出使西域',
    titlePinyin: 'zhāng qiān chū shǐ xī yù',
    type: 'history',
    example: '勇敢开拓新的道路',
    emoji: '🐪',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '汉朝时，张骞奉命前往很远的西域。', pinyin: 'hàn cháo shí, zhāng qiān fèng mìng qián wǎng hěn yuǎn de xī yù.' },
      { text: '路上，他经历了许多艰难和危险。', pinyin: 'lù shàng, tā jīng lì le xǔ duō jiān nán hé wēi xiǎn.' },
      { text: '但他没有退缩，终于带回了很多有用的见闻。', pinyin: 'dàn tā méi yǒu tuì suō, zhōng yú dài huí le hěn duō yǒu yòng de jiàn wén.' },
      { text: '他的出使让中原和西域的联系更紧密了。', pinyin: 'tā de chū shǐ ràng zhōng yuán hé xī yù de lián xì gèng jǐn mì le.' },
      { text: '这个故事赞扬勇于探索、开拓交流。', pinyin: 'zhè ge gù shì zàn yáng yǒng yú tàn suǒ, kāi tuò jiāo liú.' }
    ],
    illustrationSlot: 'zhangqian'
  },
  {
    id: 'history_zhaojun',
    title: '王昭君出塞',
    titlePinyin: 'wáng zhāo jūn chū sài',
    type: 'history',
    example: '为了和平作出贡献',
    emoji: '🏹',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '汉朝时，王昭君离开家乡，前往塞外。', pinyin: 'hàn cháo shí, wáng zhāo jūn lí kāi jiā xiāng, qián wǎng sài wài.' },
      { text: '她一路远行，把友好和诚意带到了边地。', pinyin: 'tā yī lù yuǎn xíng, bǎ yǒu hǎo hé chéng yì dài dào le biān dì.' },
      { text: '人们常把这个故事看作民族和睦、珍惜和平的象征。', pinyin: 'rén men cháng bǎ zhè ge gù shì kàn zuò mín zú hé mù, zhēn xī hé píng de xiàng zhēng.' },
      { text: '这个故事让我们记住和平与包容的可贵。', pinyin: 'zhè ge gù shì ràng wǒ men jì zhù hé píng yǔ bāo róng de kě guì.' }
    ],
    illustrationSlot: 'zhaojun'
  },
  {
    id: 'history_zhenghe',
    title: '郑和下西洋',
    titlePinyin: 'zhèng hé xià xī yáng',
    type: 'history',
    example: '勇敢航海，传播友谊',
    emoji: '🚢',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '明朝时，郑和率领船队出海远航。', pinyin: 'míng cháo shí, zhèng hé shuài lǐng chuán duì chū hǎi yuǎn háng.' },
      { text: '他们访问了许多国家和地区，带去了中国的工艺和友谊。', pinyin: 'tā men fǎng wèn le xǔ duō guó jiā hé dì qū, dài qù le zhōng guó de gōng yì hé yǒu yì.' },
      { text: '船队也带回了很多新的见闻。', pinyin: 'chuán duì yě dài huí le hěn duō xīn de jiàn wén.' },
      { text: '这个故事赞扬开放交流和勇敢探索的精神。', pinyin: 'zhè ge gù shì zàn yáng kāi fàng jiāo liú hé yǒng gǎn tàn suǒ de jīng shén.' }
    ],
    illustrationSlot: 'zhenghe'
  },
  {
    id: 'history_baozheng',
    title: '包拯断案',
    titlePinyin: 'bāo zhěng duàn àn',
    type: 'history',
    example: '公正办事不偏不倚',
    emoji: '⚖️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '包拯做官时，以公正清廉闻名。', pinyin: 'bāo zhěng zuò guān shí, yǐ gōng zhèng qīng lián wén míng.' },
      { text: '不管来告状的人是谁，他都认真查明真相。', pinyin: 'bù guǎn lái gào zhuàng de rén shì shuí, tā dōu rèn zhēn chá míng zhēn xiàng.' },
      { text: '因为他不怕权势、秉公办事，百姓都很敬佩他。', pinyin: 'yīn wèi tā bù pà quán shì, bǐng gōng bàn shì, bǎi xìng dōu hěn jìng pèi tā.' },
      { text: '这个故事告诉我们，做人做事要公平正直。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò rén zuò shì yào gōng píng zhèng zhí.' }
    ],
    illustrationSlot: 'baozheng'
  },
  {
    id: 'fable_chaosanmusi',
    title: '朝三暮四',
    titlePinyin: 'zhāo sān mù sì',
    type: 'fable',
    example: '不要被表面变化迷惑',
    emoji: '🐒',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有个人养了很多猴子，想减少给它们的栗子。', pinyin: 'yǒu gè rén yǎng le hěn duō hóu zi, xiǎng jiǎn shǎo gěi tā men de lì zi.' },
      { text: '他说早上给三颗，晚上给四颗，猴子们听了都很生气。', pinyin: 'tā shuō zǎo shang gěi sān kē, wǎn shàng gěi sì kē, hóu zi men tīng le dōu hěn shēng qì.' },
      { text: '他又改口说早上四颗，晚上三颗，猴子们立刻高兴起来。', pinyin: 'tā yòu gǎi kǒu shuō zǎo shang sì kē, wǎn shàng sān kē, hóu zi men lì kè gāo xìng qǐ lái.' },
      { text: '其实总数并没有变。这个故事提醒我们，要看清事情的本质。', pinyin: 'qí shí zǒng shù bìng méi yǒu biàn. zhè ge gù shì tí xǐng wǒ men, yào kàn qīng shì qing de běn zhì.' }
    ],
    illustrationSlot: 'chaosanmusi'
  },
  {
    id: 'fable_qianlvjiqiong',
    title: '黔驴技穷',
    titlePinyin: 'qián lǘ jì qióng',
    type: 'fable',
    example: '本事有限却总逞强会露馅',
    emoji: '🫏',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '从前，黔地没有驴，有人带来了一头驴。', pinyin: 'cóng qián, qián dì méi yǒu lǘ, yǒu rén dài lái le yī tóu lǘ.' },
      { text: '老虎一开始很害怕，不敢靠近。', pinyin: 'lǎo hǔ yī kāi shǐ hěn hài pà, bù gǎn kào jìn.' },
      { text: '后来它发现驴子只会叫和踢，就再也不怕了。', pinyin: 'hòu lái tā fā xiàn lǘ zi zhǐ huì jiào hé tī, jiù zài yě bù pà le.' },
      { text: '最后，老虎识破了驴子的本事。这个故事告诉我们，没有真本领不能总逞强。', pinyin: 'zuì hòu, lǎo hǔ shí pò le lǘ zi de běn shì. zhè ge gù shì gào sù wǒ men, méi yǒu zhēn běn lǐng bù néng zǒng chěng qiáng.' }
    ],
    illustrationSlot: 'qianlvjiqiong'
  },
  {
    id: 'fable_salt_fool',
    title: '愚人食盐',
    titlePinyin: 'yú rén shí yán',
    type: 'fable',
    example: '做事过头反而适得其反',
    emoji: '🧂',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有个人吃菜时，觉得放了盐以后味道更好了。', pinyin: 'yǒu gè rén chī cài shí, jué de fàng le yán yǐ hòu wèi dào gèng hǎo le.' },
      { text: '他就想，既然一点盐让菜好吃，那直接吃盐一定更好。', pinyin: 'tā jiù xiǎng, jì rán yī diǎn yán ràng cài hǎo chī, nà zhí jiē chī yán yī dìng gèng hǎo.' },
      { text: '结果他吃了一大口盐，难受得直皱眉。', pinyin: 'jié guǒ tā chī le yī dà kǒu yán, nán shòu de zhí zhòu méi.' },
      { text: '这个故事告诉我们，做事要适度，不能走极端。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào shì dù, bù néng zǒu jí duān.' }
    ],
    illustrationSlot: 'salt_fool'
  },
  {
    id: 'fable_fish_in_rut',
    title: '涸辙之鲋',
    titlePinyin: 'hé zhé zhī fù',
    type: 'fable',
    example: '真正帮助别人要及时有效',
    emoji: '🐟',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '一条小鱼困在干涸车辙留下的小水坑里。', pinyin: 'yī tiáo xiǎo yú kùn zài gān hé chē zhé liú xià de xiǎo shuǐ kēng lǐ.' },
      { text: '它请求路人赶快给一点水救命。', pinyin: 'tā qǐng qiú lù rén gǎn kuài gěi yī diǎn shuǐ jiù mìng.' },
      { text: '路人却夸夸其谈，说以后要引来大河大海。', pinyin: 'lù rén què kuā kuā qí tán, shuō yǐ hòu yào yǐn lái dà hé dà hǎi.' },
      { text: '小鱼说，自己现在就需要一点水。这个故事提醒我们，帮助别人要实际而及时。', pinyin: 'xiǎo yú shuō, zì jǐ xiàn zài jiù xū yào yī diǎn shuǐ. zhè ge gù shì tí xǐng wǒ men, bāng zhù bié rén yào shí jì ér jí shí.' }
    ],
    illustrationSlot: 'fish_in_rut'
  },
  {
    id: 'fable_handan',
    title: '邯郸学步',
    titlePinyin: 'hán dān xué bù',
    type: 'fable',
    example: '盲目模仿会失去自己的长处',
    emoji: '🚶',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '燕国有个人听说邯郸人走路特别好看。', pinyin: 'yān guó yǒu gè rén tīng shuō hán dān rén zǒu lù tè bié hǎo kàn.' },
      { text: '他专门跑去学别人走路的样子。', pinyin: 'tā zhuān mén pǎo qù xué bié rén zǒu lù de yàng zi.' },
      { text: '结果新步子没学会，连自己原来的走法也忘了。', pinyin: 'jié guǒ xīn bù zi méi xué huì, lián zì jǐ yuán lái de zǒu fǎ yě wàng le.' },
      { text: '最后，他只能爬着回家。这个故事告诉我们，学习别人也要保持自己的优点。', pinyin: 'zuì hòu, tā zhǐ néng pá zhe huí jiā. zhè ge gù shì gào sù wǒ men, xué xí bié rén yě yào bǎo chí zì jǐ de yōu diǎn.' }
    ],
    illustrationSlot: 'handan_walk'
  },
  {
    id: 'fable_wangyang',
    title: '望洋兴叹',
    titlePinyin: 'wàng yáng xīng tàn',
    type: 'fable',
    example: '见识更广后要保持谦虚',
    emoji: '🌊',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '河伯以为自己掌管的大河已经非常壮观。', pinyin: 'hé bó yǐ wéi zì jǐ zhǎng guǎn de dà hé yǐ jīng fēi cháng zhuàng guān.' },
      { text: '直到他来到大海边，才发现海比河大得多。', pinyin: 'zhí dào tā lái dào dà hǎi biān, cái fā xiàn hǎi bǐ hé dà de duō.' },
      { text: '这时，他才明白自己过去太自满了。', pinyin: 'zhè shí, tā cái míng bái zì jǐ guò qù tài zì mǎn le.' },
      { text: '这个故事提醒我们，见识越多，越要谦虚。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, jiàn shi yuè duō, yuè yào qiān xū.' }
    ],
    illustrationSlot: 'wangyang'
  },
  {
    id: 'fable_zhuangzhou',
    title: '庄周梦蝶',
    titlePinyin: 'zhuāng zhōu mèng dié',
    type: 'fable',
    example: '学会思考世界和自己',
    emoji: '🦋',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '庄周有一次梦见自己变成了一只快乐飞舞的蝴蝶。', pinyin: 'zhuāng zhōu yǒu yī cì mèng jiàn zì jǐ biàn chéng le yī zhī kuài lè fēi wǔ de hú dié.' },
      { text: '醒来以后，他想，到底是庄周梦见了蝴蝶，还是蝴蝶梦见了庄周呢？', pinyin: 'xǐng lái yǐ hòu, tā xiǎng, dào dǐ shì zhuāng zhōu mèng jiàn le hú dié, hái shì hú dié mèng jiàn le zhuāng zhōu ne?' },
      { text: '这个故事很有趣，也让人思考变化和真实。', pinyin: 'zhè ge gù shì hěn yǒu qù, yě ràng rén sī kǎo biàn huà hé zhēn shí.' },
      { text: '它告诉我们，要保持好奇心，勇敢思考。', pinyin: 'tā gào sù wǒ men, yào bǎo chí hào qí xīn, yǒng gǎn sī kǎo.' }
    ],
    illustrationSlot: 'zhuangzhou'
  },
  {
    id: 'fable_mantis_cart',
    title: '螳臂当车',
    titlePinyin: 'táng bì dāng chē',
    type: 'fable',
    example: '力量不够时不能盲目硬扛',
    emoji: '🪲',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一只小螳螂看到大车驶来，竟举起前臂想挡住车轮。', pinyin: 'yī zhī xiǎo táng láng kàn dào dà chē shǐ lái, jìng jǔ qǐ qián bì xiǎng dǎng zhù chē lún.' },
      { text: '它的勇气很大，可力量却远远不够。', pinyin: 'tā de yǒng qì hěn dà, kě lì liàng què yuǎn yuǎn bù gòu.' },
      { text: '大家都知道，小螳螂不可能挡住大车。', pinyin: 'dà jiā dōu zhī dào, xiǎo táng láng bù kě néng dǎng zhù dà chē.' },
      { text: '这个故事提醒我们，要先判断力量和方法，再决定怎么做。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, yào xiān pàn duàn lì liàng hé fāng fǎ, zài jué dìng zěn me zuò.' }
    ],
    illustrationSlot: 'mantis_cart'
  },
  {
    id: 'history_kongzi_teacher',
    title: '孔子拜师',
    titlePinyin: 'kǒng zǐ bài shī',
    type: 'history',
    example: '学问大的人也会虚心请教',
    emoji: '🙇',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '孔子学问已经很丰富了，但他仍然到处请教有本领的人。', pinyin: 'kǒng zǐ xué wèn yǐ jīng hěn fēng fù le, dàn tā réng rán dào chù qǐng jiào yǒu běn lǐng de rén.' },
      { text: '有一次，他专门去向老子请教礼仪和学问。', pinyin: 'yǒu yī cì, tā zhuān mén qù xiàng lǎo zǐ qǐng jiào lǐ yí hé xué wèn.' },
      { text: '孔子态度非常恭敬，认真听、认真学。', pinyin: 'kǒng zǐ tài dù fēi cháng gōng jìng, rèn zhēn tīng, rèn zhēn xué.' },
      { text: '这个故事告诉我们，越有学问越要虚心。', pinyin: 'zhè ge gù shì gào sù wǒ men, yuè yǒu xué wèn yuè yào xū xīn.' }
    ],
    illustrationSlot: 'kongzi_teacher'
  },
  {
    id: 'history_zuchongzhi',
    title: '祖冲之算圆周率',
    titlePinyin: 'zǔ chōng zhī suàn yuán zhōu lǜ',
    type: 'history',
    example: '认真计算能发现重要规律',
    emoji: '📐',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '祖冲之非常喜欢数学和天文。', pinyin: 'zǔ chōng zhī fēi cháng xǐ huan shù xué hé tiān wén.' },
      { text: '他花了很多时间反复计算圆周率。', pinyin: 'tā huā le hěn duō shí jiān fǎn fù jì suàn yuán zhōu lǜ.' },
      { text: '在很早以前，他就把圆周率算得非常准确。', pinyin: 'zài hěn zǎo yǐ qián, tā jiù bǎ yuán zhōu lǜ suàn de fēi cháng zhǔn què.' },
      { text: '这个故事告诉我们，科学发现来自细心和坚持。', pinyin: 'zhè ge gù shì gào sù wǒ men, kē xué fā xiàn lái zì xì xīn hé jiān chí.' }
    ],
    illustrationSlot: 'zuchongzhi'
  },
  {
    id: 'history_hairui',
    title: '海瑞退礼',
    titlePinyin: 'hǎi ruì tuì lǐ',
    type: 'history',
    example: '清廉的人不收不该收的东西',
    emoji: '🎁',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '海瑞做官时，为人非常清廉。', pinyin: 'hǎi ruì zuò guān shí, wéi rén fēi cháng qīng lián.' },
      { text: '有人想送礼讨好他，他坚决不收。', pinyin: 'yǒu rén xiǎng sòng lǐ tǎo hǎo tā, tā jiān jué bù shōu.' },
      { text: '海瑞说，做官应该为百姓办事，而不是收礼。', pinyin: 'hǎi ruì shuō, zuò guān yīng gāi wèi bǎi xìng bàn shì, ér bù shì shōu lǐ.' },
      { text: '这个故事告诉我们，要诚实正直，不贪小便宜。', pinyin: 'zhè ge gù shì gào sù wǒ men, yào chéng shí zhèng zhí, bù tān xiǎo pián yi.' }
    ],
    illustrationSlot: 'hairui'
  },
  {
    id: 'history_kouzhun',
    title: '寇准清廉',
    titlePinyin: 'kòu zhǔn qīng lián',
    type: 'history',
    example: '有权力也要守住品格',
    emoji: '🏛️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '寇准做官时，生活十分朴素。', pinyin: 'kòu zhǔn zuò guān shí, shēng huó shí fēn pǔ sù.' },
      { text: '他处理事情公正认真，不肯借职位为自己谋好处。', pinyin: 'tā chǔ lǐ shì qing gōng zhèng rèn zhēn, bù kěn jiè zhí wèi wèi zì jǐ móu hǎo chù.' },
      { text: '百姓知道后，都很敬重他。', pinyin: 'bǎi xìng zhī dào hòu, dōu hěn jìng zhòng tā.' },
      { text: '这个故事告诉我们，真正了不起的人，品格比地位更重要。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhēn zhèng liǎo bù qǐ de rén, pǐn gé bǐ dì wèi gèng zhòng yào.' }
    ],
    illustrationSlot: 'kouzhun'
  },
  {
    id: 'history_direnjie',
    title: '狄仁杰公正断案',
    titlePinyin: 'dí rén jié gōng zhèng duàn àn',
    type: 'history',
    example: '查清真相比随便下结论更重要',
    emoji: '🔍',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '狄仁杰做官时，善于查案。', pinyin: 'dí rén jié zuò guān shí, shàn yú chá àn.' },
      { text: '遇到复杂的事情，他总是先认真调查，再做判断。', pinyin: 'yù dào fù zá de shì qing, tā zǒng shì xiān rèn zhēn diào chá, zài zuò pàn duàn.' },
      { text: '因为他不偏不倚，许多人都很信任他。', pinyin: 'yīn wèi tā bù piān bù yǐ, xǔ duō rén dōu hěn xìn rèn tā.' },
      { text: '这个故事告诉我们，做事要讲证据、讲公平。', pinyin: 'zhè ge gù shì gào sù wǒ men, zuò shì yào jiǎng zhèng jù, jiǎng gōng píng.' }
    ],
    illustrationSlot: 'direnjie'
  },
  {
    id: 'history_libai',
    title: '李白少年求学',
    titlePinyin: 'lǐ bái shào nián qiú xué',
    type: 'history',
    example: '喜欢学习的人会不断进步',
    emoji: '✍️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '李白小时候聪明活泼，也很喜欢读书。', pinyin: 'lǐ bái xiǎo shí hòu cōng míng huó pō, yě hěn xǐ huan dú shū.' },
      { text: '他常常一边观察山水，一边背诗写字。', pinyin: 'tā cháng cháng yī biān guān chá shān shuǐ, yī biān bèi shī xiě zì.' },
      { text: '正因为小时候勤学爱思考，他长大后才能写出很多好诗。', pinyin: 'zhèng yīn wèi xiǎo shí hòu qín xué ài sī kǎo, tā zhǎng dà hòu cái néng xiě chū hěn duō hǎo shī.' },
      { text: '这个故事鼓励我们从小养成爱学习的好习惯。', pinyin: 'zhè ge gù shì gǔ lì wǒ men cóng xiǎo yǎng chéng ài xué xí de hǎo xí guàn.' }
    ],
    illustrationSlot: 'libai'
  },
  {
    id: 'history_xuxiake',
    title: '徐霞客远游',
    titlePinyin: 'xú xiá kè yuǎn yóu',
    type: 'history',
    example: '探索世界需要勇气和记录',
    emoji: '🗺️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '徐霞客很喜欢山川河流，总想亲眼去看看。', pinyin: 'xú xiá kè hěn xǐ huan shān chuān hé liú, zǒng xiǎng qīn yǎn qù kàn kan.' },
      { text: '他背着行囊，走过很多高山、溶洞和江河。', pinyin: 'tā bèi zhe xíng náng, zǒu guò hěn duō gāo shān, róng dòng hé jiāng hé.' },
      { text: '每到一个地方，他都会认真观察并写下见闻。', pinyin: 'měi dào yī gè dì fāng, tā dōu huì rèn zhēn guān chá bìng xiě xià jiàn wén.' },
      { text: '这个故事告诉我们，探索世界要勇敢，也要细心记录。', pinyin: 'zhè ge gù shì gào sù wǒ men, tàn suǒ shì jiè yào yǒng gǎn, yě yào xì xīn jì lù.' }
    ],
    illustrationSlot: 'xuxiake'
  },
  {
    id: 'history_shenkuo',
    title: '沈括上山看桃花',
    titlePinyin: 'shěn kuò shàng shān kàn táo huā',
    type: 'history',
    example: '科学观察能帮助发现原因',
    emoji: '🌸',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '沈括发现山下的桃花谢了，山上的桃花却刚刚开放。', pinyin: 'shěn kuò fā xiàn shān xià de táo huā xiè le, shān shàng de táo huā què gāng gāng kāi fàng.' },
      { text: '他没有只觉得奇怪，而是认真去观察山上和山下的不同。', pinyin: 'tā méi yǒu zhǐ jué de qí guài, ér shì rèn zhēn qù guān chá shān shàng hé shān xià de bù tóng.' },
      { text: '后来他明白，是高低和冷暖不同，才让花开得有早有晚。', pinyin: 'hòu lái tā míng bái, shì gāo dī hé lěng nuǎn bù tóng, cái ràng huā kāi de yǒu zǎo yǒu wǎn.' },
      { text: '这个故事告诉我们，遇到问题要观察、思考，再找答案。', pinyin: 'zhè ge gù shì gào sù wǒ men, yù dào wèn tí yào guān chá, sī kǎo, zài zhǎo dá àn.' }
    ],
    illustrationSlot: 'shenkuo'
  },
  {
    id: 'idiom_maosuizijian',
    title: '毛遂自荐',
    titlePinyin: 'máo suì zì jiàn',
    type: 'idiom',
    example: '有能力时要敢于主动站出来',
    emoji: '🙋',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '平原君要挑选门客出使，大家都没注意到毛遂。', pinyin: 'píng yuán jūn yào tiāo xuǎn mén kè chū shǐ, dà jiā dōu méi zhù yì dào máo suì.' },
      { text: '毛遂主动站出来推荐自己，说愿意去完成任务。', pinyin: 'máo suì zhǔ dòng zhàn chū lái tuī jiàn zì jǐ, shuō yuàn yì qù wán chéng rèn wù.' },
      { text: '后来，他果然表现出色，帮平原君办成了事情。', pinyin: 'hòu lái, tā guǒ rán biǎo xiàn chū sè, bāng píng yuán jūn bàn chéng le shì qing.' },
      { text: '这个故事告诉我们，有本领的人也要有勇气展示自己。', pinyin: 'zhè ge gù shì gào sù wǒ men, yǒu běn lǐng de rén yě yào yǒu yǒng qì zhǎn shì zì jǐ.' }
    ],
    illustrationSlot: 'maosuizijian'
  },
  {
    id: 'idiom_laomashitu',
    title: '老马识途',
    titlePinyin: 'lǎo mǎ shí tú',
    type: 'idiom',
    example: '经验能帮助找到正确方向',
    emoji: '🐎',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '齐桓公带兵回国时，在山路里迷了路。', pinyin: 'qí huán gōng dài bīng huí guó shí, zài shān lù lǐ mí le lù.' },
      { text: '管仲建议把老马放到前面带路。', pinyin: 'guǎn zhòng jiàn yì bǎ lǎo mǎ fàng dào qián miàn dài lù.' },
      { text: '老马果然带大家找到了回去的路。', pinyin: 'lǎo mǎ guǒ rán dài dà jiā zhǎo dào le huí qù de lù.' },
      { text: '这个故事告诉我们，经验丰富的人常常很值得学习。', pinyin: 'zhè ge gù shì gào sù wǒ men, jīng yàn fēng fù de rén cháng cháng hěn zhí de xué xí.' }
    ],
    illustrationSlot: 'laomashitu'
  },
  {
    id: 'idiom_bole',
    title: '伯乐相马',
    titlePinyin: 'bó lè xiàng mǎ',
    type: 'idiom',
    example: '善于发现别人的长处',
    emoji: '🐴',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '伯乐很会识别好马，很多看起来普通的马都逃不过他的眼睛。', pinyin: 'bó lè hěn huì shí bié hǎo mǎ, hěn duō kàn qǐ lái pǔ tōng de mǎ dōu táo bù guò tā de yǎn jing.' },
      { text: '别人没看出的优点，伯乐却能发现。', pinyin: 'bié rén méi kàn chū de yōu diǎn, bó lè què néng fā xiàn.' },
      { text: '后来，人们就用这个故事夸赞善于发现人才的人。', pinyin: 'hòu lái, rén men jiù yòng zhè ge gù shì kuā zàn shàn yú fā xiàn rén cái de rén.' },
      { text: '这个故事提醒我们，要学会欣赏别人真正的长处。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, yào xué huì xīn shǎng bié rén zhēn zhèng de cháng chù.' }
    ],
    illustrationSlot: 'bole'
  },
  {
    id: 'idiom_rumusanfen',
    title: '入木三分',
    titlePinyin: 'rù mù sān fēn',
    type: 'idiom',
    example: '功夫深，写得十分有力',
    emoji: '🖌️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '王羲之写字非常用心，字也写得特别有力。', pinyin: 'wáng xī zhī xiě zì fēi cháng yòng xīn, zì yě xiě de tè bié yǒu lì.' },
      { text: '传说他把字写在木板上，刻字的人发现墨迹都渗进木头里很深。', pinyin: 'chuán shuō tā bǎ zì xiě zài mù bǎn shàng, kè zì de rén fā xiàn mò jì dōu shèn jìn mù tou lǐ hěn shēn.' },
      { text: '大家都惊叹他的书法功力。', pinyin: 'dà jiā dōu jīng tàn tā de shū fǎ gōng lì.' },
      { text: '这个故事告诉我们，认真练习才能把本领练到很深。', pinyin: 'zhè ge gù shì gào sù wǒ men, rèn zhēn liàn xí cái néng bǎ běn lǐng liàn dào hěn shēn.' }
    ],
    illustrationSlot: 'rumusanfen'
  },
  {
    id: 'idiom_luoyangzhigui',
    title: '洛阳纸贵',
    titlePinyin: 'luò yáng zhǐ guì',
    type: 'idiom',
    example: '作品太受欢迎，大家都抢着读',
    emoji: '📄',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '西晋时，左思写成了《三都赋》。', pinyin: 'xī jìn shí, zuǒ sī xiě chéng le sān dōu fù.' },
      { text: '大家都觉得写得很好，纷纷抄写传看。', pinyin: 'dà jiā dōu jué de xiě de hěn hǎo, fēn fēn chāo xiě chuán kàn.' },
      { text: '因为买纸的人太多，洛阳的纸一时变贵了。', pinyin: 'yīn wèi mǎi zhǐ de rén tài duō, luò yáng de zhǐ yī shí biàn guì le.' },
      { text: '这个故事用来形容好的文章非常受欢迎。', pinyin: 'zhè ge gù shì yòng lái xíng róng hǎo de wén zhāng fēi cháng shòu huān yíng.' }
    ],
    illustrationSlot: 'luoyangzhigui'
  },
  {
    id: 'idiom_wangchenmoji',
    title: '望尘莫及',
    titlePinyin: 'wàng chén mò jí',
    type: 'idiom',
    example: '差距太大，追也追不上',
    emoji: '💨',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有的人跑得非常快，后面的人只能看见扬起的尘土。', pinyin: 'yǒu de rén pǎo de fēi cháng kuài, hòu miàn de rén zhǐ néng kàn jiàn yáng qǐ de chén tǔ.' },
      { text: '大家怎么追也追不上。', pinyin: 'dà jiā zěn me zhuī yě zhuī bù shàng.' },
      { text: '后来，人们就用这个成语形容差距特别大。', pinyin: 'hòu lái, rén men jiù yòng zhè ge chéng yǔ xíng róng chā jù tè bié dà.' },
      { text: '这个故事提醒我们，既要努力追赶，也要尊重真正的本领。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, jì yào nǔ lì zhuī gǎn, yě yào zūn zhòng zhēn zhèng de běn lǐng.' }
    ],
    illustrationSlot: 'wangchenmoji'
  },
  {
    id: 'idiom_houlaijushang',
    title: '后来居上',
    titlePinyin: 'hòu lái jū shàng',
    type: 'idiom',
    example: '后来的人也能超过前人',
    emoji: '⬆️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有些人起步晚，但因为勤奋努力，后来反而超过了前面的人。', pinyin: 'yǒu xiē rén qǐ bù wǎn, dàn yīn wèi qín fèn nǔ lì, hòu lái fǎn ér chāo guò le qián miàn de rén.' },
      { text: '这个成语常常用来鼓励后来者。', pinyin: 'zhè ge chéng yǔ cháng cháng yòng lái gǔ lì hòu lái zhě.' },
      { text: '只要肯努力，后来的人一样能取得更好的成绩。', pinyin: 'zhǐ yào kěn nǔ lì, hòu lái de rén yī yàng néng qǔ dé gèng hǎo de chéng jì.' },
      { text: '这个故事告诉我们，进步从什么时候开始都不晚。', pinyin: 'zhè ge gù shì gào sù wǒ men, jìn bù cóng shén me shí hòu kāi shǐ dōu bù wǎn.' }
    ],
    illustrationSlot: 'houlaijushang'
  },
  {
    id: 'idiom_wenguozexi',
    title: '闻过则喜',
    titlePinyin: 'wén guò zé xǐ',
    type: 'idiom',
    example: '听到别人指出问题也愿意改进',
    emoji: '😊',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有智慧的人听到别人指出自己的缺点，不会生气。', pinyin: 'yǒu zhì huì de rén tīng dào bié rén zhǐ chū zì jǐ de quē diǎn, bú huì shēng qì.' },
      { text: '他反而会高兴，因为这样就知道该怎么改进。', pinyin: 'tā fǎn ér huì gāo xìng, yīn wèi zhè yàng jiù zhī dào gāi zěn me gǎi jìn.' },
      { text: '这个成语赞扬能够接受批评的人。', pinyin: 'zhè ge chéng yǔ zàn yáng néng gòu jiē shòu pī píng de rén.' },
      { text: '它告诉我们，愿意改正错误的人会进步更快。', pinyin: 'tā gào sù wǒ men, yuàn yì gǎi zhèng cuò wù de rén huì jìn bù gèng kuài.' }
    ],
    illustrationSlot: 'wenguozexi'
  },
  {
    id: 'fable_qutuxixin',
    title: '曲突徙薪',
    titlePinyin: 'qū tū xǐ xīn',
    type: 'fable',
    example: '提前预防比事后补救更重要',
    emoji: '🔥',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人看到朋友家的烟囱是直的，旁边还堆着柴火。', pinyin: 'yǒu rén kàn dào péng you jiā de yān cōng shì zhí de, páng biān hái duī zhe chái huǒ.' },
      { text: '他提醒朋友把烟囱改弯，把柴火搬远一点。', pinyin: 'tā tí xǐng péng you bǎ yān cōng gǎi wān, bǎ chái huǒ bān yuǎn yī diǎn.' },
      { text: '朋友没听，后来果然失火了。', pinyin: 'péng you méi tīng, hòu lái guǒ rán shī huǒ le.' },
      { text: '这个故事告诉我们，防患于未然最重要。', pinyin: 'zhè ge gù shì gào sù wǒ men, fáng huàn yú wèi rán zuì zhòng yào.' }
    ],
    illustrationSlot: 'qutuxixin'
  },
  {
    id: 'fable_yubangyuweng',
    title: '鹬蚌相持，渔翁得利',
    titlePinyin: 'yù bàng xiāng chí, yú wēng dé lì',
    type: 'fable',
    example: '争来争去，别人占了便宜',
    emoji: '🐚',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '一只鹬鸟啄住了河蚌，河蚌也夹住了鹬鸟的嘴。', pinyin: 'yī zhī yù niǎo zhuó zhù le hé bàng, hé bàng yě jiā zhù le yù niǎo de zuǐ.' },
      { text: '它们谁也不肯让谁，一直僵持着。', pinyin: 'tā men shuí yě bù kěn ràng shuí, yī zhí jiāng chí zhe.' },
      { text: '这时，一个渔翁走来，把它们一起抓走了。', pinyin: 'zhè shí, yī gè yú wēng zǒu lái, bǎ tā men yī qǐ zhuā zǒu le.' },
      { text: '这个故事提醒我们，冲突升级时，可能让第三方得利。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, chōng tū shēng jí shí, kě néng ràng dì sān fāng dé lì.' }
    ],
    illustrationSlot: 'yubangyuweng'
  },
  {
    id: 'fable_zhizi',
    title: '智子疑邻',
    titlePinyin: 'zhì zǐ yí lín',
    type: 'fable',
    example: '不能因为亲疏远近就忽视正确意见',
    emoji: '🏠',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人家里的墙快坏了，邻居提醒说要小心小偷。', pinyin: 'yǒu rén jiā lǐ de qiáng kuài huài le, lín jū tí xǐng shuō yào xiǎo xīn xiǎo tōu.' },
      { text: '他的儿子也说了同样的话。', pinyin: 'tā de ér zi yě shuō le tóng yàng de huà.' },
      { text: '后来家里真的被偷了，他夸儿子聪明，却怀疑邻居可疑。', pinyin: 'hòu lái jiā lǐ zhēn de bèi tōu le, tā kuā ér zi cōng míng, què huái yí lín jū kě yí.' },
      { text: '这个故事告诉我们，看事情不能只凭亲疏。', pinyin: 'zhè ge gù shì gào sù wǒ men, kàn shì qing bù néng zhǐ píng qīn shū.' }
    ],
    illustrationSlot: 'zhizi'
  },
  {
    id: 'fable_langzi',
    title: '狼子野心',
    titlePinyin: 'láng zǐ yě xīn',
    type: 'fable',
    example: '坏心思不会因为表面老实就消失',
    emoji: '🐺',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人捡到一只小狼，把它和狗一起养大。', pinyin: 'yǒu rén jiǎn dào yī zhī xiǎo láng, bǎ tā hé gǒu yī qǐ yǎng dà.' },
      { text: '虽然它看上去很安静，可一有机会还是露出了凶性。', pinyin: 'suī rán tā kàn shàng qù hěn ān jìng, kě yī yǒu jī huì hái shì lù chū le xiōng xìng.' },
      { text: '大家这才明白，狼毕竟还是狼。', pinyin: 'dà jiā zhè cái míng bái, láng bì jìng hái shì láng.' },
      { text: '这个故事提醒我们，看人看事不能只看表面。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, kàn rén kàn shì bù néng zhǐ kàn biǎo miàn.' }
    ],
    illustrationSlot: 'langzi'
  },
  {
    id: 'fable_churenyinxing',
    title: '楚人隐形',
    titlePinyin: 'chǔ rén yǐn xíng',
    type: 'fable',
    example: '盲信荒唐办法会闹笑话',
    emoji: '👻',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '楚国有个人听说有办法能让人隐形。', pinyin: 'chǔ guó yǒu gè rén tīng shuō yǒu bàn fǎ néng ràng rén yǐn xíng.' },
      { text: '他信以为真，照着别人胡说的方法去做。', pinyin: 'tā xìn yǐ wéi zhēn, zhào zhe bié rén hú shuō de fāng fǎ qù zuò.' },
      { text: '结果不但没有隐形，反而成了笑话。', pinyin: 'jié guǒ bù dàn méi yǒu yǐn xíng, fǎn ér chéng le xiào huà.' },
      { text: '这个故事告诉我们，听到新奇说法也要先动脑判断。', pinyin: 'zhè ge gù shì gào sù wǒ men, tīng dào xīn qí shuō fǎ yě yào xiān dòng nǎo pàn duàn.' }
    ],
    illustrationSlot: 'churenyinxing'
  },
  {
    id: 'fable_antu',
    title: '按图索骥',
    titlePinyin: 'àn tú suǒ jì',
    type: 'fable',
    example: '照本宣科不一定找得到真正目标',
    emoji: '📘',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '有人学了相马书，就想照着书里的样子去找千里马。', pinyin: 'yǒu rén xué le xiàng mǎ shū, jiù xiǎng zhào zhe shū lǐ de yàng zi qù zhǎo qiān lǐ mǎ.' },
      { text: '结果他只顾看图上的样子，找来找去都不对。', pinyin: 'jié guǒ tā zhǐ gù kàn tú shàng de yàng zi, zhǎo lái zhǎo qù dōu bú duì.' },
      { text: '别人提醒他，书本知识还要结合实际观察。', pinyin: 'bié rén tí xǐng tā, shū běn zhī shi hái yào jié hé shí jì guān chá.' },
      { text: '这个故事告诉我们，学习不能死搬硬套。', pinyin: 'zhè ge gù shì gào sù wǒ men, xué xí bù néng sǐ bān yìng tào.' }
    ],
    illustrationSlot: 'antu'
  },
  {
    id: 'fable_churenshejiang',
    title: '楚人涉江',
    titlePinyin: 'chǔ rén shè jiāng',
    type: 'fable',
    example: '情况变了，办法也要变',
    emoji: '⛵',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '楚国有个人坐船过江时，把剑掉进了水里。', pinyin: 'chǔ guó yǒu gè rén zuò chuán guò jiāng shí, bǎ jiàn diào jìn le shuǐ lǐ.' },
      { text: '他连忙在船边刻了个记号，说等船靠岸再下水去找。', pinyin: 'tā lián máng zài chuán biān kè le gè jì hào, shuō děng chuán kào àn zài xià shuǐ qù zhǎo.' },
      { text: '可船已经开走了，剑当然不会还在原来的地方。', pinyin: 'kě chuán yǐ jīng kāi zǒu le, jiàn dāng rán bú huì hái zài yuán lái de dì fang.' },
      { text: '这个故事告诉我们，环境变化后，方法也要跟着变。', pinyin: 'zhè ge gù shì gào sù wǒ men, huán jìng biàn huà hòu, fāng fǎ yě yào gēn zhe biàn.' }
    ],
    illustrationSlot: 'churenshejiang'
  },
  {
    id: 'fable_zengcansharen',
    title: '曾参杀人',
    titlePinyin: 'zēng shēn shā rén',
    type: 'fable',
    example: '谣言传多了也会让人动摇',
    emoji: '🗣️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '曾参是个很有名的孝子，大家都知道他不会做坏事。', pinyin: 'zēng shēn shì gè hěn yǒu míng de xiào zǐ, dà jiā dōu zhī dào tā bú huì zuò huài shì.' },
      { text: '可有一天，连续几个人跑来告诉曾参的母亲，说曾参杀了人。', pinyin: 'kě yǒu yī tiān, lián xù jǐ gè rén pǎo lái gào sù zēng shēn de mǔ qīn, shuō zēng shēn shā le rén.' },
      { text: '开始她不信，可听的人多了，心里也开始慌了。', pinyin: 'kāi shǐ tā bù xìn, kě tīng de rén duō le, xīn lǐ yě kāi shǐ huāng le.' },
      { text: '这个故事提醒我们，传言再多也不一定是真的，要学会分辨。', pinyin: 'zhè ge gù shì tí xǐng wǒ men, chuán yán zài duō yě bù yī dìng shì zhēn de, yào xué huì fēn biàn.' }
    ],
    illustrationSlot: 'zengcansharen'
  },
  {
    id: 'history_wangxizhi_mo',
    title: '王羲之吃墨',
    titlePinyin: 'wáng xī zhī chī mò',
    type: 'history',
    example: '练习太专心，连吃饭都顾不上',
    emoji: '🖋️',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '王羲之小时候天天练字，写得非常专心。', pinyin: 'wáng xī zhī xiǎo shí hòu tiān tiān liàn zì, xiě de fēi cháng zhuān xīn.' },
      { text: '有一次，他边练字边吃饭，竟把墨汁当成了蒜泥。', pinyin: 'yǒu yī cì, tā biān liàn zì biān chī fàn, jìng bǎ mò zhī dāng chéng le suàn ní.' },
      { text: '家人发现时都觉得又惊讶又好笑。', pinyin: 'jiā rén fā xiàn shí dōu jué de yòu jīng yà yòu hǎo xiào.' },
      { text: '这个故事告诉我们，专心和勤学能让本领越来越好。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhuān xīn hé qín xué néng ràng běn lǐng yuè lái yuè hǎo.' }
    ],
    illustrationSlot: 'wangxizhi_mo'
  },
  {
    id: 'history_kongzi_travel',
    title: '孔子周游列国',
    titlePinyin: 'kǒng zǐ zhōu yóu liè guó',
    type: 'history',
    example: '为了理想不怕路远',
    emoji: '🛤️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '孔子为了传播自己的学问和理想，带着学生四处奔走。', pinyin: 'kǒng zǐ wèi le chuán bō zì jǐ de xué wèn hé lǐ xiǎng, dài zhe xué shēng sì chù bēn zǒu.' },
      { text: '一路上，他遇到了许多困难和冷落。', pinyin: 'yī lù shàng, tā yù dào le xǔ duō kùn nán hé lěng luò.' },
      { text: '可他仍坚持讲学，认真教导学生。', pinyin: 'kě tā réng jiān chí jiǎng xué, rèn zhēn jiào dǎo xué shēng.' },
      { text: '这个故事赞扬坚持理想和不怕困难的精神。', pinyin: 'zhè ge gù shì zàn yáng jiān chí lǐ xiǎng hé bù pà kùn nán de jīng shén.' }
    ],
    illustrationSlot: 'kongzi_travel'
  },
  {
    id: 'history_suqin',
    title: '苏秦刺股',
    titlePinyin: 'sū qín cì gǔ',
    type: 'history',
    example: '困了也要提醒自己继续努力',
    emoji: '📚',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '苏秦年轻时认真读书，希望以后能做成大事。', pinyin: 'sū qín nián qīng shí rèn zhēn dú shū, xī wàng yǐ hòu néng zuò chéng dà shì.' },
      { text: '他读书读累了想打瞌睡，就用锥子轻轻刺大腿提醒自己。', pinyin: 'tā dú shū dú lèi le xiǎng dǎ kē shuì, jiù yòng zhuī zi qīng qīng cì dà tuǐ tí xǐng zì jǐ.' },
      { text: '靠着这份刻苦，他后来学问越来越好。', pinyin: 'kào zhe zhè fèn kè kǔ, tā hòu lái xué wèn yuè lái yuè hǎo.' },
      { text: '这个故事告诉我们，学习需要坚持和自律。', pinyin: 'zhè ge gù shì gào sù wǒ men, xué xí xū yào jiān chí hé zì lǜ.' }
    ],
    illustrationSlot: 'suqin'
  },
  {
    id: 'history_sunjing',
    title: '孙敬悬梁',
    titlePinyin: 'sūn jìng xuán liáng',
    type: 'history',
    example: '专心学习，不让自己偷懒',
    emoji: '🪢',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '孙敬读书很认真，但有时读久了也会犯困。', pinyin: 'sūn jìng dú shū hěn rèn zhēn, dàn yǒu shí dú jiǔ le yě huì fàn kùn.' },
      { text: '为了提醒自己，他把头发系在房梁上。', pinyin: 'wèi le tí xǐng zì jǐ, tā bǎ tóu fa jì zài fáng liáng shàng.' },
      { text: '一低头想睡，就会被拉醒。', pinyin: 'yī dī tóu xiǎng shuì, jiù huì bèi lā xǐng.' },
      { text: '这个故事告诉我们，学习要有恒心，也要想办法克服懒惰。', pinyin: 'zhè ge gù shì gào sù wǒ men, xué xí yào yǒu héng xīn, yě yào xiǎng bàn fǎ kè fú lǎn duò.' }
    ],
    illustrationSlot: 'sunjing'
  },
  {
    id: 'history_limi',
    title: '李密牛角挂书',
    titlePinyin: 'lǐ mì niú jiǎo guà shū',
    type: 'history',
    example: '珍惜零碎时间学习',
    emoji: '🐂',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '李密小时候家里条件一般，但特别爱读书。', pinyin: 'lǐ mì xiǎo shí hòu jiā lǐ tiáo jiàn yī bān, dàn tè bié ài dú shū.' },
      { text: '他出门放牛时，也把书挂在牛角上，边走边看。', pinyin: 'tā chū mén fàng niú shí, yě bǎ shū guà zài niú jiǎo shàng, biān zǒu biān kàn.' },
      { text: '别人见了，都夸他珍惜时间。', pinyin: 'bié rén jiàn le, dōu kuā tā zhēn xī shí jiān.' },
      { text: '这个故事告诉我们，只要肯用心，处处都能学习。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhǐ yào kěn yòng xīn, chù chù dōu néng xué xí.' }
    ],
    illustrationSlot: 'limi'
  },
  {
    id: 'history_yuefei_war',
    title: '岳飞抗金',
    titlePinyin: 'yuè fēi kàng jīn',
    type: 'history',
    example: '保家卫国，勇敢担当',
    emoji: '🛡️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '岳飞长大后，成了一位勇敢的将军。', pinyin: 'yuè fēi zhǎng dà hòu, chéng le yī wèi yǒng gǎn de jiāng jūn.' },
      { text: '他带兵训练认真，打仗时也非常勇敢。', pinyin: 'tā dài bīng xùn liàn rèn zhēn, dǎ zhàng shí yě fēi cháng yǒng gǎn.' },
      { text: '岳家军纪律严明，深受百姓信任。', pinyin: 'yuè jiā jūn jì lǜ yán míng, shēn shòu bǎi xìng xìn rèn.' },
      { text: '这个故事赞扬忠诚、勇气和责任感。', pinyin: 'zhè ge gù shì zàn yáng zhōng chéng, yǒng qì hé zé rèn gǎn.' }
    ],
    illustrationSlot: 'yuefei_war'
  },
  {
    id: 'history_banchao_west',
    title: '班超出使西域',
    titlePinyin: 'bān chāo chū shǐ xī yù',
    type: 'history',
    example: '勇敢远行，打开交流之门',
    emoji: '🐫',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '班超后来奉命前往西域，任务很艰巨。', pinyin: 'bān chāo hòu lái fèng mìng qián wǎng xī yù, rèn wù hěn jiān jù.' },
      { text: '他一路机智果断，结交了许多朋友。', pinyin: 'tā yī lù jī zhì guǒ duàn, jié jiāo le xǔ duō péng you.' },
      { text: '通过努力，他让中原和西域之间的联系更稳固。', pinyin: 'tōng guò nǔ lì, tā ràng zhōng yuán hé xī yù zhī jiān de lián xì gèng wěn gù.' },
      { text: '这个故事赞扬胆识、智慧和开拓精神。', pinyin: 'zhè ge gù shì zàn yáng dǎn shí, zhì huì hé kāi tuò jīng shén.' }
    ],
    illustrationSlot: 'banchao_west'
  },
  {
    id: 'history_wentianxiang',
    title: '文天祥留取丹心',
    titlePinyin: 'wén tiān xiáng liú qǔ dān xīn',
    type: 'history',
    example: '遇到困难也不放弃气节',
    emoji: '❤️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '文天祥在国家危难时，始终坚持自己的信念。', pinyin: 'wén tiān xiáng zài guó jiā wēi nàn shí, shǐ zhōng jiān chí zì jǐ de xìn niàn.' },
      { text: '即使面对很大的压力，他也不肯屈服。', pinyin: 'jí shǐ miàn duì hěn dà de yā lì, tā yě bù kěn qū fú.' },
      { text: '他写下了流传很广的诗句，表达自己的忠诚。', pinyin: 'tā xiě xià le liú chuán hěn guǎng de shī jù, biǎo dá zì jǐ de zhōng chéng.' },
      { text: '这个故事告诉我们，要珍惜正直和气节。', pinyin: 'zhè ge gù shì gào sù wǒ men, yào zhēn xī zhèng zhí hé qì jié.' }
    ],
    illustrationSlot: 'wentianxiang'
  },
  {
    id: 'history_qijiguang',
    title: '戚继光练兵',
    titlePinyin: 'qī jì guāng liàn bīng',
    type: 'history',
    example: '做事严格认真，团队才更强',
    emoji: '⚔️',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '戚继光带兵时，非常重视训练。', pinyin: 'qī jì guāng dài bīng shí, fēi cháng zhòng shì xùn liàn.' },
      { text: '他要求士兵练动作、练配合、练纪律。', pinyin: 'tā yāo qiú shì bīng liàn dòng zuò, liàn pèi hé, liàn jì lǜ.' },
      { text: '因为训练扎实，队伍越来越有战斗力。', pinyin: 'yīn wèi xùn liàn zhā shí, duì wu yuè lái yuè yǒu zhàn dòu lì.' },
      { text: '这个故事告诉我们，平时认真准备，关键时刻才更有力量。', pinyin: 'zhè ge gù shì gào sù wǒ men, píng shí rèn zhēn zhǔn bèi, guān jiàn shí kè cái gèng yǒu lì liàng.' }
    ],
    illustrationSlot: 'qijiguang'
  },
  {
    id: 'history_zhangzhongjing',
    title: '张仲景坐堂行医',
    titlePinyin: 'zhāng zhòng jǐng zuò táng xíng yī',
    type: 'history',
    example: '把学问用来帮助更多人',
    emoji: '🩺',
    difficulty: 2,
    minAge: 5,
    content: [
      { text: '张仲景是一位很有名的医生。', pinyin: 'zhāng zhòng jǐng shì yī wèi hěn yǒu míng de yī shēng.' },
      { text: '他常常坐在药堂里给百姓看病，认真询问病情。', pinyin: 'tā cháng cháng zuò zài yào táng lǐ gěi bǎi xìng kàn bìng, rèn zhēn xún wèn bìng qíng.' },
      { text: '他把很多经验整理下来，帮助后来的人学医。', pinyin: 'tā bǎ hěn duō jīng yàn zhěng lǐ xià lái, bāng zhù hòu lái de rén xué yī.' },
      { text: '这个故事告诉我们，真正的本领要用来帮助别人。', pinyin: 'zhè ge gù shì gào sù wǒ men, zhēn zhèng de běn lǐng yào yòng lái bāng zhù bié rén.' }
    ],
    illustrationSlot: 'zhangzhongjing'
  }
]

export { storyData }

export const pinyinKnowledgeCatalog = {
  initials: fullPinyinData.initials.map(i => i.content),
  finals: fullPinyinData.finals.map(f => f.content),
  overall: fullPinyinData.overall.map(o => o.content),
  syllables: ['ba', 'pa', 'ma', 'fa', 'da', 'ta', 'na', 'la', 'ga', 'ka', 'ha', 'jia', 'qia', 'xia', 'zha', 'cha', 'sha', 'za', 'ca', 'sa', 'ya', 'wa'],
  numbers: numberData.map(n => n.content),
  english: englishData.map(e => e.content),
  stories: storyData.map(s => s.title)
}

function createPinyinUnit(data, type) {
  return {
    id: data.id,
    type,
    content: data.content,
    mnemonic: data.mnemonic,
    example: data.example,
    emoji: data.emoji,
    audio: `${data.content}.mp3`,
    difficulty: 1,
    confusionSet: data.confusionSet,
    minAge: data.minAge || 4,
    maxAge: data.maxAge || 7,
  }
}

function createNumberUnit(data) {
  return {
    id: data.id,
    type: 'number',
    content: data.content,
    example: data.example,
    emoji: data.emoji,
    audio: `${data.content}.mp3`,
    difficulty: data.difficulty || 1,
    confusionSet: data.confusionSet,
    minAge: data.minAge || 3,
    maxAge: data.maxAge || 7,
  }
}

function createMathConceptUnit(data) {
  return {
    id: data.id,
    type: data.type,
    content: data.content,
    question: data.question,
    answer: data.answer,
    options: data.options,
    example: data.example,
    emoji: data.emoji,
    difficulty: data.difficulty || 2,
    confusionSet: data.confusionSet,
    minAge: data.minAge || 4,
    maxAge: data.maxAge || 7,
  }
}

function createEnglishUnit(data) {
  return {
    id: data.id,
    type: 'english',
    content: data.content,
    example: data.example,
    emoji: data.emoji,
    category: data.category,
    audio: `${data.content}.mp3`,
    difficulty: 1,
    confusionSet: data.confusionSet,
    minAge: data.minAge || 4,
    maxAge: data.maxAge || 7,
  }
}

const pinyinUnits = [
  ...fullPinyinData.initials.map(i => createPinyinUnit(i, 'initial')),
  ...fullPinyinData.finals.map(f => createPinyinUnit(f, 'final')),
  ...fullPinyinData.overall.map(o => createPinyinUnit(o, 'overall'))
]

const numberUnits = numberData.map(n => createNumberUnit(n))
const mathConceptUnits = mathConceptData.map(item => createMathConceptUnit(item))
const mathUnits = [...numberUnits, ...mathConceptUnits]
const englishUnits = englishData.map(e => createEnglishUnit(e))

const blendPairs = [
  { id: 'blend-ba', initial: 'b', final: 'a', syllable: 'ba', rival: '泡泡怪', reward: '木船贴纸', example: '爸爸' },
  { id: 'blend-pa', initial: 'p', final: 'a', syllable: 'pa', rival: '噼啪怪', reward: '魔法棒', example: '爬山' },
  { id: 'blend-ma', initial: 'm', final: 'a', syllable: 'ma', rival: '迷雾怪', reward: '星球徽章', example: '妈妈' },
  { id: 'blend-fa', initial: 'f', final: 'a', syllable: 'fa', rival: '飞花怪', reward: '花瓣王冠', example: '发芽' },
  { id: 'blend-da', initial: 'd', final: 'a', syllable: 'da', rival: '滴答怪', reward: '时间沙漏', example: '大米' },
  { id: 'blend-ta', initial: 't', final: 'a', syllable: 'ta', rival: '踏踏怪', reward: '小鼓槌', example: '大地' },
  { id: 'blend-na', initial: 'n', final: 'a', syllable: 'na', rival: '呢喃怪', reward: '夜莺羽毛', example: '哪里' },
  { id: 'blend-la', initial: 'l', final: 'a', syllable: 'la', rival: '啦啦怪', reward: '音乐铃铛', example: '快乐' },
  { id: 'blend-ga', initial: 'g', final: 'a', syllable: 'ga', rival: '嘎嘎怪', reward: '小喇叭', example: '嘎嘎' },
  { id: 'blend-ka', initial: 'k', final: 'a', syllable: 'ka', rival: '咔嚓怪', reward: '钥匙链', example: '卡车' },
  { id: 'blend-ha', initial: 'h', final: 'a', syllable: 'ha', rival: '哈哈怪', reward: '笑脸贴', example: '哈哈' },
  { id: 'blend-bo', initial: 'b', final: 'o', syllable: 'bo', rival: '波浪怪', reward: '帆船徽章', example: '菠萝' },
  { id: 'blend-po', initial: 'p', final: 'o', syllable: 'po', rival: '泼水怪', reward: '水枪', example: '泼水' },
  { id: 'blend-mo', initial: 'm', final: 'o', syllable: 'mo', rival: '磨磨怪', reward: '石头印章', example: '墨水' },
  { id: 'blend-fo', initial: 'f', final: 'o', syllable: 'fo', rival: '枫叶怪', reward: '枫叶标本', example: '枫叶' },
  { id: 'blend-bi', initial: 'b', final: 'i', syllable: 'bi', rival: '铅笔怪', reward: '蜡笔', example: '铅笔' },
  { id: 'blend-pi', initial: 'p', final: 'i', syllable: 'pi', rival: '皮球怪', reward: '足球', example: '皮球' },
  { id: 'blend-mi', initial: 'm', final: 'i', syllable: 'mi', rival: '米饭怪', reward: '饭碗', example: '米饭' },
  { id: 'blend-ti', initial: 't', final: 'i', syllable: 'ti', rival: '踢踢怪', reward: '毽子', example: '踢毽子' },
  { id: 'blend-li', initial: 'l', final: 'i', syllable: 'li', rival: '梨子怪', reward: '水果篮', example: '梨子' }
]

export function createKnowledgeMap(childAge = null) {
  const allUnits = [...pinyinUnits, ...mathUnits, ...englishUnits, ...storyUnits]
  const knowledgeMap = allUnits.reduce((accumulator, unit) => {
    // Filter by age if provided
    if (childAge !== null) {
      const min = unit.minAge || 3
      const max = unit.maxAge || 10
      if (childAge < min || childAge > max) {
        return accumulator
      }
    }

    accumulator[unit.id] = {
      id: unit.id,
      type: unit.type,
      content: unit.content,
      mnemonic: unit.mnemonic,
      example: unit.example,
      emoji: unit.emoji,
      audio: unit.audio,
      difficulty: unit.difficulty,
      nextReviewAt: 0,
      lastReviewedAt: 0,
      errorCount: 0,
      accuracy: 0,
      correctCount: 0,
      seenCount: 0,
      confusionSet: unit.confusionSet,
      question: unit.question,
      answer: unit.answer,
      options: unit.options,
      minAge: unit.minAge,
      maxAge: unit.maxAge,
      category: unit.category,
      easinessFactor: 2.5, // SM-2 initial value
      interval: 0,
    }
    return accumulator
  }, {})
  
  // Add blend units with age filter (typically for age 5+)
  if (childAge === null || childAge >= 5) {
    blendPairs.forEach(pair => {
      const unitId = `pinyin_${pair.initial}_${pair.final}`
      knowledgeMap[unitId] = {
        id: unitId,
        type: 'blend',
        content: pair.syllable,
        example: pair.example,
        difficulty: 2,
        nextReviewAt: 0,
        lastReviewedAt: 0,
        errorCount: 0,
        accuracy: 0,
        correctCount: 0,
        seenCount: 0,
        confusionSet: [],
        easinessFactor: 2.5,
        interval: 0,
      }
    })
  }
  
  return knowledgeMap
}

export function createInitialKnowledgeState(childAge = null) {
  return createKnowledgeMap(childAge)
}

function buildPinyinBattle(unit, reviewMode = false) {
  const options = [unit.content, ...(unit.confusionSet || [])].slice(0, 3)
  return {
    id: reviewMode ? `review-${unit.id}` : `battle-${unit.id}`,
    type: 'battle',
    skill: 'pinyin',
    knowledgeUnitId: unit.id,
    prompt: reviewMode ? `复习挑战：听音识别 ${unit.content}` : `拼音打怪：用正确拼音打败怪物`,
    hint: reviewMode ? '这是系统安排的复习任务，优先巩固易混淆音。' : '先听声音，再点击正确拼音发起攻击。',
    narration: unit.content,
    question: reviewMode ? `复习音节 /${unit.content}/` : `怪物害怕哪个读音？`,
    answer: unit.content,
    options: options.map((value) => ({ id: value, label: value })),
    correct: unit.content,
    monster: reviewMode ? '复习史莱姆' : '迷糊怪',
    attackLabel: reviewMode ? '复习命中' : '音波攻击',
    reviewMode,
    reward: reviewMode ? '复习之星' : '岛屿能量',
    mnemonic: unit.mnemonic,
    example: unit.example,
    emoji: unit.emoji
  }
}

function buildPinyinListen(unit) {
  return {
    id: `listen-${unit.id}`,
    type: 'micro',
    skill: 'pinyin',
    knowledgeUnitId: unit.id,
    prompt: `听一听，找到 ${unit.content} 的发音`,
    hint: `点击卡片听音，${unit.emoji} ${unit.example} 帮你记忆`,
    narration: unit.content,
    items: [unit.content, ...(unit.confusionSet || [])].slice(0, 3).map((value) => {
      const matchingUnit = pinyinUnits.find(u => u.content === value)
      return {
        id: value,
        label: value,
        subtitle: value === unit.content ? `${unit.mnemonic || ''} · ${unit.example} ${unit.emoji}` : '易混淆发音'
      }
    }),
    targetId: unit.content
  }
}

function buildBlendTask(pair) {
  return {
    id: pair.id,
    type: 'match',
    skill: 'pinyin',
    knowledgeUnitId: `pinyin_${pair.initial}_${pair.final}`,
    prompt: `拼音拼读：组合 ${pair.syllable}`,
    hint: `拖动声母和韵母，拼出 ${pair.syllable}（${pair.example}），打败 ${pair.rival}。`,
    battleTheme: true,
    pairs: [
      { id: pair.initial, left: pair.initial, right: `声母 ${pair.initial}` },
      { id: pair.final, left: pair.final, right: `韵母 ${pair.final}` },
      { id: pair.syllable, left: pair.syllable, right: `拼读 ${pair.syllable}` }
    ],
    targetSyllable: pair.syllable,
    reward: pair.reward,
    example: pair.example
  }
}

function buildNumberTask(unit) {
  const options = [unit.content, ...(unit.confusionSet || ['1', '2'])].slice(0, 3)
  const stars = '⭐'.repeat(parseInt(unit.content))
  return {
    id: `number-${unit.id}`,
    type: 'choice',
    skill: 'math',
    knowledgeUnitId: unit.id,
    prompt: `数字小镇：数星星盖房子`,
    hint: `数一数有多少颗星星 ${unit.emoji}`,
    question: `${stars} = ?`,
    answer: unit.content,
    options: options.map((value) => ({ id: value, label: value })),
    correct: unit.content,
    building: unit.content <= 3 ? '小商店' : unit.content <= 6 ? '超市' : '大商场',
    emoji: unit.emoji,
    example: unit.example
  }
}

function buildMathConceptTask(unit) {
  const options = unit.options || [unit.answer, ...(unit.confusionSet || [])].slice(0, 3)
  return {
    id: `math-${unit.id}`,
    type: 'choice',
    skill: 'math',
    knowledgeUnitId: unit.id,
    prompt: `数字小镇：${unit.content} 训练`,
    hint: `${unit.example}，先观察再作答。`,
    question: unit.question,
    answer: unit.answer,
    options: options.map((value) => ({ id: value, label: value })),
    correct: unit.answer,
    emoji: unit.emoji,
    example: unit.example,
    conceptType: unit.type,
  }
}

function buildMathTask(unit) {
  if (unit.type === 'number') {
    return buildNumberTask(unit)
  }

  return buildMathConceptTask(unit)
}

function buildEnglishTask(unit) {
  const confusions = unit.confusionSet || ['cat', 'dog']
  const options = [unit.content, ...confusions].slice(0, 3)
  return {
    id: `english-${unit.id}`,
    type: 'choice',
    skill: 'english',
    knowledgeUnitId: unit.id,
    prompt: `英语游乐园：找到 ${unit.emoji}`,
    hint: `看看图片，选择正确的英语单词`,
    question: `${unit.emoji} = ?`,
    answer: unit.content,
    options: options.map((value) => ({ id: value, label: value })),
    correct: unit.content,
    emoji: unit.emoji,
    example: unit.example,
    category: unit.category
  }
}

function buildEnglishMicro(unit) {
  const confusions = unit.confusionSet || ['cat', 'dog']
  const items = [unit.content, ...confusions].slice(0, 3)
  return {
    id: `english-micro-${unit.id}`,
    type: 'micro',
    skill: 'english',
    knowledgeUnitId: unit.id,
    prompt: `听一听，找到 ${unit.content}`,
    hint: `点击卡片听音，${unit.emoji} ${unit.example}`,
    narration: unit.content,
    items: items.map((value) => {
      const matching = englishUnits.find(u => u.content === value)
      return {
        id: value,
        label: value,
        subtitle: value === unit.content ? `${unit.example} ${unit.emoji}` : '易混淆单词'
      }
    }),
    targetId: unit.content
  }
}

function buildStoryTask(story) {
  const typeLabels = {
    myth: '神话故事',
    poem: '古诗',
    idiom: '成语故事',
    history: '历史典故',
    fable: '寓言故事',
  }
  
  return {
    id: story.id,
    type: 'story',
    skill: 'stories',
    knowledgeUnitId: story.id,
    prompt: `${typeLabels[story.type]}时间`,
    hint: `一起来读${typeLabels[story.type]}吧！`,
    storyData: story,
    storyTitle: story.title,
    storyTitlePinyin: story.titlePinyin,
    storyType: story.type,
    storyContent: story.content,
    author: story.author,
    dynasty: story.dynasty,
    emoji: story.emoji,
    difficulty: story.difficulty,
    illustrationSlot: story.illustrationSlot,
    reward: story.type === 'myth' ? '神话勋章' : story.type === 'poem' ? '诗人徽章' : story.type === 'idiom' ? '成语达人' : story.type === 'fable' ? '寓言智者' : '历史小达人',
    stars: 3
  }
}

const storyUnits = storyData.map(story => ({
  id: story.id,
  type: 'story',
  content: story.title,
  example: story.example,
  emoji: story.emoji,
  difficulty: story.difficulty,
  confusionSet: [],
  minAge: story.minAge || 3,
  maxAge: 8,
}))

function uniqueById(items) {
  return items.filter((item, index, list) => item && list.findIndex((candidate) => candidate.id === item.id) === index)
}

function getKnowledgeSnapshot(knowledgeState, unitId) {
  return knowledgeState?.[unitId] || {
    seenCount: 0,
    correctCount: 0,
    errorCount: 0,
    accuracy: 0,
    nextReviewAt: 0,
  }
}

function getWeaknessScore(unitState) {
  if (!unitState || unitState.seenCount === 0) {
    return 0
  }

  return unitState.errorCount * 4 + (1 - unitState.accuracy) * 10
}

function filterUnitsByAge(units, age) {
  return units.filter((unit) => age >= (unit.minAge || 3) && age <= (unit.maxAge || 8))
}

function selectWeakUnits(units, knowledgeState, count) {
  return [...units]
    .filter((unit) => getKnowledgeSnapshot(knowledgeState, unit.id).seenCount > 0)
    .sort((left, right) => {
      const leftState = getKnowledgeSnapshot(knowledgeState, left.id)
      const rightState = getKnowledgeSnapshot(knowledgeState, right.id)
      return getWeaknessScore(rightState) - getWeaknessScore(leftState)
    })
    .slice(0, count)
}

function resolveDifficultyRank(level) {
  if (level === 'hard') return 3
  if (level === 'medium') return 2
  return 1
}

function selectFreshUnits(units, knowledgeState, count, preferredDifficulty = 1) {
  return [...units]
    .sort((left, right) => {
      const leftState = getKnowledgeSnapshot(knowledgeState, left.id)
      const rightState = getKnowledgeSnapshot(knowledgeState, right.id)

      if (leftState.seenCount !== rightState.seenCount) {
        return leftState.seenCount - rightState.seenCount
      }

      const leftDifficultyGap = Math.abs((left.difficulty || 1) - preferredDifficulty)
      const rightDifficultyGap = Math.abs((right.difficulty || 1) - preferredDifficulty)

      if (leftDifficultyGap !== rightDifficultyGap) {
        return leftDifficultyGap - rightDifficultyGap
      }

      if (left.difficulty !== right.difficulty) {
        return (left.difficulty || 1) - (right.difficulty || 1)
      }

      return getWeaknessScore(rightState) - getWeaknessScore(leftState)
    })
    .slice(0, count)
}

function buildNumberMicro(unit) {
  return {
    id: `math-micro-${unit.id}`,
    type: 'micro',
    skill: 'math',
    knowledgeUnitId: unit.id,
    prompt: `听一听，找到数字 ${unit.content}`,
    hint: `点中和声音一样的数字，巩固数量感觉。`,
    narration: unit.content,
    items: [unit.content, ...(unit.confusionSet || ['1', '2'])].slice(0, 3).map((value) => ({
      id: value,
      label: value,
      subtitle: value === unit.content ? `${unit.example} ${unit.emoji}` : '相邻数量',
    })),
    targetId: unit.content,
  }
}

function buildEnglishCategoryMatch(units, categoryLabel) {
  if (units.length < 3) {
    return null
  }

  return {
    id: `english-match-${categoryLabel}`,
    type: 'match',
    skill: 'english',
    prompt: `英语游乐园：${categoryLabel}配对`,
    hint: '拖一拖，把单词送回正确的图片。',
    pairs: units.slice(0, 3).map((unit) => ({
      id: unit.id,
      left: unit.content,
      right: `${unit.emoji} ${unit.example}`,
    })),
  }
}

function buildAdaptivePinyinTrack(knowledgeState, age, recommendedDifficulty) {
  const preferredDifficulty = resolveDifficultyRank(recommendedDifficulty)
  const baseUnits = filterUnitsByAge(
    pinyinUnits.filter((unit) => age >= 5 || unit.type !== 'overall'),
    age
  )
  const weakUnits = selectWeakUnits(baseUnits, knowledgeState, 1)
  const freshUnits = selectFreshUnits(baseUnits, knowledgeState, 3, preferredDifficulty)
  const masteredSet = new Set(
    baseUnits
      .filter((unit) => {
        const state = getKnowledgeSnapshot(knowledgeState, unit.id)
        return state.seenCount >= 1 && state.accuracy >= 0.65
      })
      .map((unit) => unit.content)
  )
  const blendCandidates = blendPairs
    .filter((pair) => age >= 5 && masteredSet.has(pair.initial) && masteredSet.has(pair.final))
    .slice(0, 2)

  return uniqueById([
    ...weakUnits.map((unit) => buildPinyinBattle(unit, true)),
    ...freshUnits.slice(0, 1).map((unit) => buildPinyinListen(unit)),
    ...freshUnits.slice(1, 3).map((unit) => buildPinyinBattle(unit)),
    ...blendCandidates.map((pair) => buildBlendTask(pair)),
    ...selectFreshUnits(filterUnitsByAge(pinyinUnits.filter((unit) => unit.type === 'overall'), age), knowledgeState, 1, preferredDifficulty).map((unit) =>
      buildPinyinBattle(unit)
    ),
  ])
}

function buildAdaptiveMathTrack(knowledgeState, age, recommendedDifficulty) {
  const preferredDifficulty = resolveDifficultyRank(recommendedDifficulty)
  const eligibleUnits = filterUnitsByAge(mathUnits, age)
  const weakUnits = selectWeakUnits(eligibleUnits, knowledgeState, 1)
  const freshUnits = selectFreshUnits(eligibleUnits, knowledgeState, 4, preferredDifficulty)
  const numberFresh = freshUnits.filter((unit) => unit.type === 'number')
  const conceptFresh = freshUnits.filter((unit) => unit.type !== 'number')

  return uniqueById([
    ...weakUnits.map((unit) => buildMathTask(unit)),
    ...numberFresh.slice(0, 1).map((unit) => buildNumberMicro(unit)),
    ...numberFresh.slice(0, 2).map((unit) => buildNumberTask(unit)),
    ...conceptFresh.slice(0, 3).map((unit) => buildMathTask(unit)),
  ])
}

function buildAdaptiveEnglishTrack(knowledgeState, age, recommendedDifficulty) {
  const preferredDifficulty = resolveDifficultyRank(recommendedDifficulty)
  const eligibleUnits = filterUnitsByAge(englishUnits, age)
  const weakUnits = selectWeakUnits(eligibleUnits, knowledgeState, 1)
  const freshUnits = selectFreshUnits(eligibleUnits, knowledgeState, 4, preferredDifficulty)
  const categoryBuckets = freshUnits.reduce((accumulator, unit) => {
    const key = unit.category || 'mixed'
    if (!accumulator[key]) {
      accumulator[key] = []
    }
    accumulator[key].push(unit)
    return accumulator
  }, {})
  const richestCategory = Object.entries(categoryBuckets).sort((left, right) => right[1].length - left[1].length)[0]
  const matchTask = richestCategory ? buildEnglishCategoryMatch(richestCategory[1], richestCategory[0]) : null

  return uniqueById([
    ...weakUnits.map((unit) => buildEnglishTask(unit)),
    ...freshUnits.slice(0, 2).map((unit) => buildEnglishTask(unit)),
    ...freshUnits.slice(2, 4).map((unit) => buildEnglishMicro(unit)),
    matchTask,
  ])
}

function buildAdaptiveStoryTrack(age) {
  return filterUnitsByAge(storyData, age).slice(0, 2).map((story) => buildStoryTask(story))
}

function getDueReviewTasks(knowledgeState) {
  if (!knowledgeState) return []
  const now = Date.now()
  const allUnits = [...pinyinUnits, ...mathUnits, ...englishUnits]
  return Object.values(knowledgeState)
    .filter((unit) => unit.nextReviewAt && unit.nextReviewAt <= now)
    .sort((left, right) => {
      const leftPriority = left.errorCount + (1 - left.accuracy) * 10
      const rightPriority = right.errorCount + (1 - right.accuracy) * 10
      return rightPriority - leftPriority
    })
    .slice(0, 2)
    .map((unit) => {
      // Handle blend type tasks
      if (unit.type === 'blend') {
        const blendPair = blendPairs.find(p => `pinyin_${p.initial}_${p.final}` === unit.id)
        if (blendPair) {
          return buildBlendTask(blendPair)
        }
        return null
      }
      
      const unitData = allUnits.find(u => u.id === unit.id)
      if (!unitData) return null
      if (unitData.type === 'number' || ['operation', 'comparison', 'shape', 'pattern'].includes(unitData.type)) {
        return buildMathTask(unitData)
      } else if (unitData.type === 'english') {
        return buildEnglishTask(unitData)
      } else {
        return buildPinyinBattle(unitData, true)
      }
    })
    .filter(Boolean)
}

export function createMission(profile, knowledgeState) {
  const age = profile.age || 5
  const recommendedDifficulty = profile.recommendedDifficulty || 'easy'
  const reviewTasks = getDueReviewTasks(knowledgeState)
  const tracks = {
    pinyin: buildAdaptivePinyinTrack(knowledgeState, age, recommendedDifficulty),
    math: buildAdaptiveMathTrack(knowledgeState, age, recommendedDifficulty),
    english: buildAdaptiveEnglishTrack(knowledgeState, age, recommendedDifficulty),
    stories: buildAdaptiveStoryTrack(age),
  }
  const missionPool =
    profile.focus === 'mixed'
      ? [
          ...tracks.pinyin.slice(0, 2),
          ...tracks.math.slice(0, 2),
          ...tracks.english.slice(0, 1),
          ...tracks.stories.slice(0, 1),
        ]
      : tracks[profile.focus] || []
  const fallbackPool = [...tracks.pinyin, ...tracks.math, ...tracks.english, ...tracks.stories]
  const remaining = uniqueById([...missionPool, ...fallbackPool])
  const filteredRemaining = remaining.filter((task) => !reviewTasks.some((reviewTask) => reviewTask.id === task.id))
  const selected = [...reviewTasks, ...filteredRemaining].slice(0, 6)

  return selected.map((task, index) => ({
    ...task,
    order: index + 1,
    recommendedIntervalMinutes: [0, 10, 45, 120, 180, 240][index] || 0,
    missionRole:
      index < reviewTasks.length
        ? 'review'
        : index === reviewTasks.length
          ? 'warmup'
          : index >= selected.length - 2
            ? 'checkpoint'
            : 'core',
    systemNote:
      index < reviewTasks.length
        ? '先修复薄弱点，再进入新内容，避免会做的越来越会、不会的越来越拖。'
        : index === reviewTasks.length
          ? '系统先安排一题热身，帮助孩子快速进入状态。'
          : index >= selected.length - 2
            ? '最后两题负责检查迁移和稳定度，让练习形成闭环。'
            : '中段任务负责推进新的主线知识点，保持持续学习节奏。',
  }))
}

export function getLearningContentSummary() {
  return {
    pinyin: pinyinUnits.length + blendPairs.length,
    math: mathUnits.length,
    english: englishUnits.length,
    stories: storyUnits.length,
    total: pinyinUnits.length + blendPairs.length + mathUnits.length + englishUnits.length + storyUnits.length,
  }
}

export function getWeakKnowledgePoints(knowledgeState) {
  if (!knowledgeState) return []
  return Object.values(knowledgeState)
    .filter((unit) => unit.seenCount > 0)
    .sort((left, right) => {
      const leftPriority = left.errorCount + (1 - left.accuracy) * 10
      const rightPriority = right.errorCount + (1 - right.accuracy) * 10
      return rightPriority - leftPriority
    })
    .slice(0, 3)
}

export function getCompanion(profile) {
  const choice = companionCatalog[profile.companion] || companionCatalog.astro
  return choice[profile.language] || choice.zh
}

export {
  buildPinyinBattle,
  buildPinyinListen,
  buildBlendTask,
  buildNumberTask,
  buildMathConceptTask,
  buildMathTask,
  buildEnglishTask,
  buildEnglishMicro,
  buildStoryTask,
  pinyinUnits,
  mathUnits,
  englishUnits,
  storyUnits,
  blendPairs
}
