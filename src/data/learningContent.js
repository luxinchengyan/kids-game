const companionCatalog = {
  star: {
    zh: { name: '星星姐姐', tone: '温柔鼓励' }
  },
  rocket: {
    zh: { name: '火箭哥哥', tone: '热情带练' }
  },
  astro: {
    zh: { name: '星际小探险家', tone: '好奇引导' }
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
    id: 'myth_dayu',
    title: '大禹治水',
    titlePinyin: 'dà yǔ zhì shuǐ',
    type: 'myth',
    example: '大禹治理洪水',
    emoji: '🌊',
    difficulty: 1,
    minAge: 3,
    content: [
      { text: '远古时候，洪水泛滥，淹没了大片土地，百姓流离失所。', pinyin: 'yuǎn gǔ shí hòu, hóng shuǐ fàn làn, yān mò le dà piàn tǔ dì, bǎi xìng liú lí shī suǒ.' },
      { text: '帝尧命令大禹去治理洪水。', pinyin: 'dì yáo mìng lìng dà yǔ qù zhì lǐ hóng shuǐ.' },
      { text: '大禹离开家，带领人们开始了艰难的治水工作。', pinyin: 'dà yǔ lí kāi jiā, dài lǐng rén men kāi shǐ le jiān nán de zhì shuǐ gōng zuò.' },
      { text: '他走遍了高山大川，挖通了一条条河道，让洪水顺着河道流进大海。', pinyin: 'tā zǒu biàn le gāo shān dà chuān, wā tōng le yī tiáo tiáo hé dào, ràng hóng shuǐ shùn zhe hé dào liú jìn dà hǎi.' },
      { text: '大禹治水十三年，三次路过自己家门，却一次也没有进去。', pinyin: 'dà yǔ zhì shuǐ shí sān nián, sān cì lù guò zì jǐ jiā mén, què yī cì yě méi yǒu jìn qù.' },
      { text: '第一次路过，听到儿子在哭，他也没有停下来。', pinyin: 'dì yī cì lù guò, tīng dào ér zi zài kū, tā yě méi yǒu tíng xià lái.' },
      { text: '终于，洪水被治好了，土地变得肥沃，百姓安居乐业。', pinyin: 'zhōng yú, hóng shuǐ bèi zhì hǎo le, tǔ dì biàn de féi wò, bǎi xìng ān jū lè yè.' },
      { text: '大禹"三过家门而不入"的故事，一直被人们传颂。', pinyin: 'dà yǔ "sān guò jiā mén ér bù rù" de gù shì, yī zhí bèi rén men chuán sòng.' }
    ],
    illustrationSlot: 'dayu'
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
    content: [
      { text: '蓬头稚子学垂纶，', pinyin: 'péng tóu zhì zǐ xué chuí lún,' },
      { text: '侧坐莓苔草映身。', pinyin: 'cè zuò méi tāi cǎo yìng shēn.' },
      { text: '路人借问遥招手，', pinyin: 'lù rén jiè wèn yáo zhāo shǒu,' },
      { text: '怕得鱼惊不应人。', pinyin: 'pà dé yú jīng bù yìng rén.' }
    ],
    illustrationSlot: 'xiaoer'
  },
  {
    id: 'idiom_huyijahu',
    title: '狐假虎威',
    titlePinyin: 'hú jiǎ hǔ wēi',
    type: 'idiom',
    example: '狐狸借老虎的威风',
    emoji: '🦊',
    difficulty: 2,
    minAge: 4,
    content: [
      { text: '老虎在森林里抓住了一只狐狸，想把它吃掉。', pinyin: 'lǎo hǔ zài sēn lín lǐ zhuā zhù le yī zhī hú lí, xiǎng bǎ tā chī diào.' },
      { text: '狐狸急中生智，大声说："你不能吃我！我是天帝派来管理百兽的！"', pinyin: 'hú lí jí zhōng shēng zhì, dà shēng shuō: "nǐ bù néng chī wǒ! wǒ shì tiān dì pài lái guǎn lǐ bǎi shòu de!"' },
      { text: '老虎将信将疑，狐狸接着说："不信你跟我走，看看动物们见了我是什么反应。"', pinyin: 'lǎo hǔ jiāng xìn jiāng yí, hú lí jiē zhe shuō: "bù xìn nǐ gēn wǒ zǒu, kàn kàn dòng wù men jiàn le wǒ shì shí me fǎn yìng."' },
      { text: '于是，狐狸大摇大摆地走在前面，老虎跟在后面。', pinyin: 'yú shì, hú lí dà yáo dà bǎi de zǒu zài qián miàn, lǎo hǔ gēn zài hòu miàn.' },
      { text: '森林里的动物们看见老虎来了，纷纷四散逃跑。', pinyin: 'sēn lín lǐ de dòng wù men kàn jiàn lǎo hǔ lái le, fēn fēn sì sàn táo pǎo.' },
      { text: '老虎以为大家都是怕狐狸，就放了狐狸。', pinyin: 'lǎo hǔ yǐ wéi dà jiā dōu shì pà hú lí, jiù fàng le hú lí.' },
      { text: '其实，动物们逃跑是因为怕老虎，狐狸只是借了老虎的威风。', pinyin: 'qí shí, dòng wù men táo pǎo shì yīn wèi pà lǎo hǔ, hú lí zhǐ shì jiè le lǎo hǔ de wēi fēng.' },
      { text: '这个故事告诉我们，不要借助别人的权势来吓唬人。', pinyin: 'zhè ge gù shì gào sù wǒ men, bù yào jiè zhù bié rén de quán shì lái xià hǔ rén.' }
    ],
    illustrationSlot: 'huyijahu'
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
    id: 'myth_cangjiexizi',
    title: '仓颉造字',
    titlePinyin: 'cāng jié zào zì',
    type: 'myth',
    example: '仓颉观察万物造出文字',
    emoji: '📝',
    difficulty: 1,
    minAge: 4,
    content: [
      { text: '很久以前，人们还没有文字，记事情只能靠结绳子或刻符号。', pinyin: 'hěn jiǔ yǐ qián, rén men hái méi yǒu wén zì, jì shì qíng zhǐ néng kào jié shéng zi huò kè fú hào.' },
      { text: '有个聪明的人叫仓颉，他专门负责给黄帝记录重要的事情。', pinyin: 'yǒu gè cōng míng de rén jiào cāng jié, tā zhuān mén fù zé gěi huáng dì jì lù zhòng yào de shì qíng.' },
      { text: '仓颉仔细观察天上的星星、地上的山川，以及鸟兽的足迹。', pinyin: 'cāng jié zǐ xì guān chá tiān shàng de xīng xīng, dì shàng de shān chuān, yǐ jí niǎo shòu de zú jì.' },
      { text: '他根据不同事物的形状，创造出一个个图形符号。', pinyin: 'tā gēn jù bù tóng shì wù de xíng zhuàng, chuàng zào chū yī gè gè tú xíng fú hào.' },
      { text: '比如"日"像太阳的圆形，"月"像月亮的弯形，"山"像山峰的尖形。', pinyin: 'bǐ rú "rì" xiàng tài yáng de yuán xíng, "yuè" xiàng yuè liàng de wān xíng, "shān" xiàng shān fēng de jiān xíng.' },
      { text: '仓颉造字的那天，天上下起了粮食雨，鬼怪都在夜里哭泣。', pinyin: 'cāng jié zào zì de nà tiān, tiān shàng xià qǐ le liáng shí yǔ, guǐ guài dōu zài yè lǐ kū qì.' },
      { text: '从此，人类有了文字，知识和故事可以一代代传下去。', pinyin: 'cóng cǐ, rén lèi yǒu le wén zì, zhī shí hé gù shì kě yǐ yī dài dài chuán xià qù.' }
    ],
    illustrationSlot: 'cangjiexizi'
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

export function createKnowledgeMap() {
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
