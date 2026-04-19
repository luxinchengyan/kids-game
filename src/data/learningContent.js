const companionCatalog = {
  star: {
    zh: { name: '星星姐姐', tone: '温柔鼓励' },
    en: { name: 'Sister Star', tone: 'gentle coach' }
  },
  rocket: {
    zh: { name: '火箭哥哥', tone: '热情带练' },
    en: { name: 'Brother Rocket', tone: 'energetic coach' }
  },
  astro: {
    zh: { name: '星际小探险家', tone: '好奇引导' },
    en: { name: 'Little Space Explorer', tone: 'curious guide' }
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
  { id: 'number_1', content: '1', example: '一个太阳', emoji: '☀️', confusionSet: ['2', '7'] },
  { id: 'number_2', content: '2', example: '两只鸭子', emoji: '🦆🦆', confusionSet: ['1', '5'] },
  { id: 'number_3', content: '3', example: '三个桃子', emoji: '🍑🍑🍑', confusionSet: ['2', '8'] },
  { id: 'number_4', content: '4', example: '四棵树', emoji: '🌲🌲🌲🌲', confusionSet: ['3', '9'] },
  { id: 'number_5', content: '5', example: '五颗星星', emoji: '⭐⭐⭐⭐⭐', confusionSet: ['2', '6'] },
  { id: 'number_6', content: '6', example: '六朵花', emoji: '🌸🌸🌸🌸🌸🌸', confusionSet: ['5', '9'] },
  { id: 'number_7', content: '7', example: '七只小鸟', emoji: '🐦🐦🐦🐦🐦🐦🐦', confusionSet: ['1', '9'] },
  { id: 'number_8', content: '8', example: '八个气球', emoji: '🎈🎈🎈🎈🎈🎈🎈🎈', confusionSet: ['3', '0'] },
  { id: 'number_9', content: '9', example: '九条鱼', emoji: '🐟🐟🐟🐟🐟🐟🐟🐟🐟', confusionSet: ['4', '6'] },
  { id: 'number_10', content: '10', example: '十朵云', emoji: '☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️', confusionSet: ['9'] }
]

const englishData = [
  { id: 'word_cat', content: 'cat', example: '猫咪', emoji: '🐱', category: 'animals', confusionSet: ['dog'] },
  { id: 'word_dog', content: 'dog', example: '狗狗', emoji: '🐕', category: 'animals', confusionSet: ['cat'] },
  { id: 'word_bird', content: 'bird', example: '小鸟', emoji: '🐦', category: 'animals', confusionSet: [] },
  { id: 'word_fish', content: 'fish', example: '鱼', emoji: '🐟', category: 'animals', confusionSet: [] },
  { id: 'word_red', content: 'red', example: '红色', emoji: '🔴', category: 'colors', confusionSet: ['blue'] },
  { id: 'word_blue', content: 'blue', example: '蓝色', emoji: '🔵', category: 'colors', confusionSet: ['red'] },
  { id: 'word_green', content: 'green', example: '绿色', emoji: '🟢', category: 'colors', confusionSet: [] },
  { id: 'word_yellow', content: 'yellow', example: '黄色', emoji: '🟡', category: 'colors', confusionSet: [] },
  { id: 'word_one', content: 'one', example: '一', emoji: '1️⃣', category: 'numbers', confusionSet: ['two'] },
  { id: 'word_two', content: 'two', example: '二', emoji: '2️⃣', category: 'numbers', confusionSet: ['one'] },
  { id: 'word_three', content: 'three', example: '三', emoji: '3️⃣', category: 'numbers', confusionSet: [] },
  { id: 'word_four', content: 'four', example: '四', emoji: '4️⃣', category: 'numbers', confusionSet: [] },
  { id: 'word_five', content: 'five', example: '五', emoji: '5️⃣', category: 'numbers', confusionSet: [] },
  { id: 'word_sun', content: 'sun', example: '太阳', emoji: '☀️', category: 'nature', confusionSet: ['moon'] },
  { id: 'word_moon', content: 'moon', example: '月亮', emoji: '🌙', category: 'nature', confusionSet: ['sun'] },
  { id: 'word_star', content: 'star', example: '星星', emoji: '⭐', category: 'nature', confusionSet: [] }
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
    confusionSet: data.confusionSet
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
    difficulty: 1,
    confusionSet: data.confusionSet
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
    confusionSet: data.confusionSet
  }
}

const pinyinUnits = [
  ...fullPinyinData.initials.map(i => createPinyinUnit(i, 'initial')),
  ...fullPinyinData.finals.map(f => createPinyinUnit(f, 'final')),
  ...fullPinyinData.overall.map(o => createPinyinUnit(o, 'overall'))
]

const numberUnits = numberData.map(n => createNumberUnit(n))
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

function createKnowledgeMap() {
  const allUnits = [...pinyinUnits, ...numberUnits, ...englishUnits, ...storyUnits]
  const knowledgeMap = allUnits.reduce((accumulator, unit) => {
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
      confusionSet: unit.confusionSet
    }
    return accumulator
  }, {})
  
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
      confusionSet: []
    }
  })
  
  return knowledgeMap
}

export function createInitialKnowledgeState() {
  return createKnowledgeMap()
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
    history: '历史典故'
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
    reward: story.type === 'myth' ? '神话勋章' : story.type === 'poem' ? '诗人徽章' : story.type === 'idiom' ? '成语达人' : '历史小达人',
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
  confusionSet: []
}))

const tracks = {
  zh: {
    pinyin: [
      ...pinyinUnits.slice(0, 10).map(unit => buildPinyinBattle(unit)),
      ...blendPairs.slice(0, 8).map(pair => buildBlendTask(pair)),
      ...pinyinUnits.slice(0, 10).map(unit => buildPinyinListen(unit))
    ],
    math: [
      ...numberUnits.slice(0, 6).map(unit => buildNumberTask(unit)),
      {
        id: 'math-listen-3',
        type: 'micro',
        skill: 'math',
        prompt: '找到数字 3',
        hint: '点中正确数字就会得到星星。',
        narration: '3',
        items: [
          { id: '1', label: '1', subtitle: '一个太阳 ☀️' },
          { id: '3', label: '3', subtitle: '三颗星星 ⭐⭐⭐' },
          { id: '5', label: '5', subtitle: '五只小鸟 🐦🐦🐦🐦🐦' }
        ],
        targetId: '3'
      },
      {
        id: 'math-add-1',
        type: 'choice',
        skill: 'math',
        prompt: '2 + 1 等于几？',
        hint: '数一数星星，再选答案。',
        question: '⭐ ⭐ + ⭐ = ?',
        options: [
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' }
        ],
        correct: '3'
      }
    ],
    english: [
      ...englishUnits.slice(0, 6).map(unit => buildEnglishTask(unit)),
      ...englishUnits.slice(0, 4).map(unit => buildEnglishMicro(unit)),
      {
        id: 'en-match',
        type: 'match',
        skill: 'english',
        prompt: '把英语和图片连起来',
        hint: '拖一拖，让单词找到图片。',
        pairs: [
          { id: 'sun', left: 'sun', right: '☀️' },
          { id: 'moon', left: 'moon', right: '🌙' },
          { id: 'star', left: 'star', right: '⭐' }
        ]
      }
    ],
    stories: [
      ...storyData.map(story => buildStoryTask(story))
    ]
  },
  en: {
    pinyin: [
      {
        ...buildPinyinBattle(pinyinUnits[0]),
        prompt: 'Pinyin Battle: choose the sound that defeats the monster',
        hint: 'Listen first, then attack with the correct pinyin.',
        question: 'Which sound should the hero cast?',
        monster: 'Fog Monster',
        attackLabel: 'Sound Attack'
      },
      {
        ...buildBlendTask(blendPairs[0]),
        prompt: 'Blend the syllable ba',
        hint: 'Drag the parts to build ba and defeat the bubble beast.'
      },
      {
        ...buildPinyinListen(pinyinUnits[1]),
        prompt: 'Tap the pinyin with the /p/ sound',
        hint: 'Replay the sound and then select the correct card.'
      }
    ],
    math: [
      {
        id: 'math-choice-en',
        type: 'choice',
        skill: 'math',
        prompt: 'What is 2 + 1?',
        hint: 'Count the stars and answer.',
        question: '⭐ ⭐ + ⭐ = ?',
        options: [
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' }
        ],
        correct: '3'
      }
    ],
    english: [
      {
        id: 'en-choice-cat-en',
        type: 'choice',
        skill: 'english',
        prompt: 'Which one says cat?',
        hint: 'Pick the matching word.',
        question: '🐱 = ?',
        options: [
          { id: 'cat', label: 'cat' },
          { id: 'dog', label: 'dog' },
          { id: 'bird', label: 'bird' }
        ],
        correct: 'cat'
      }
    ]
  }
}

function getDueReviewTasks(knowledgeState) {
  if (!knowledgeState) return []
  const now = Date.now()
  const allUnits = [...pinyinUnits, ...numberUnits, ...englishUnits]
  return Object.values(knowledgeState)
    .filter((unit) => unit.nextReviewAt && unit.nextReviewAt <= now)
    .sort((left, right) => {
      const leftPriority = left.errorCount + (1 - left.accuracy) * 10
      const rightPriority = right.errorCount + (1 - right.accuracy) * 10
      return rightPriority - leftPriority
    })
    .slice(0, 2)
    .map((unit) => {
      const unitData = allUnits.find(u => u.id === unit.id)
      if (!unitData) return null
      if (unitData.type === 'number') {
        return buildNumberTask(unitData)
      } else if (unitData.type === 'english') {
        return buildEnglishTask(unitData)
      } else {
        return buildPinyinBattle(unitData, true)
      }
    })
    .filter(Boolean)
}

function pickTrack(language, focus) {
  const localeTracks = tracks[language] || tracks.zh
  if (focus === 'mixed') {
    return [
      ...(localeTracks.pinyin || []),
      ...(localeTracks.math || []),
      ...(localeTracks.english || []),
      ...(localeTracks.stories || [])
    ]
  }
  return localeTracks[focus] || []
}

export function createMission(profile, knowledgeState) {
  const missionPool = pickTrack(profile.language, profile.focus)
  const fallbackPool = pickTrack(profile.language, 'mixed')
  const reviewTasks = getDueReviewTasks(knowledgeState)
  const remaining = [...missionPool, ...fallbackPool].filter((task, index, list) => list.findIndex((candidate) => candidate.id === task.id) === index)
  const filteredRemaining = remaining.filter((task) => !reviewTasks.some((reviewTask) => reviewTask.id === task.id))
  const selected = [...reviewTasks, ...filteredRemaining].slice(0, 6)

  return selected.map((task, index) => ({
    ...task,
    order: index + 1,
    recommendedIntervalMinutes: [0, 10, 60, 120, 180, 240][index] || 0
  }))
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
