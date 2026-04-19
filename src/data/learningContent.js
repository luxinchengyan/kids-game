const companionCatalog = {
  elsa: {
    zh: { name: '爱莎公主', tone: '温柔鼓励' },
    en: { name: 'Princess Elsa', tone: 'gentle coach' }
  },
  paw: {
    zh: { name: '汪汪队队长', tone: '热情带练' },
    en: { name: 'Paw Patrol Captain', tone: 'energetic coach' }
  },
  astro: {
    zh: { name: '星际小探险家', tone: '好奇引导' },
    en: { name: 'Little Space Explorer', tone: 'curious guide' }
  }
}

export const pinyinKnowledgeCatalog = {
  initials: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h'],
  finals: ['a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ei', 'ao', 'ou'],
  syllables: ['ba', 'bo', 'ma', 'mi', 'fa', 'da', 'la']
}

const pinyinUnits = [
  { id: 'pinyin_b', type: 'initial', content: 'b', audio: 'b.mp3', difficulty: 1, confusionSet: ['p', 'd'] },
  { id: 'pinyin_p', type: 'initial', content: 'p', audio: 'p.mp3', difficulty: 1, confusionSet: ['b', 'f'] },
  { id: 'pinyin_m', type: 'initial', content: 'm', audio: 'm.mp3', difficulty: 1, confusionSet: ['n', 'f'] },
  { id: 'pinyin_f', type: 'initial', content: 'f', audio: 'f.mp3', difficulty: 1, confusionSet: ['h', 'p'] },
  { id: 'pinyin_ba', type: 'syllable', content: 'ba', audio: 'ba.mp3', difficulty: 2, confusionSet: ['pa', 'ma'] }
]

const blendPairs = [
  { id: 'blend-ba', initial: 'b', final: 'a', syllable: 'ba', rival: '泡泡怪', reward: '木船贴纸' },
  { id: 'blend-ma', initial: 'm', final: 'a', syllable: 'ma', rival: '迷雾怪', reward: '星球徽章' }
]

function createKnowledgeMap() {
  return pinyinUnits.reduce((accumulator, unit) => {
    accumulator[unit.id] = {
      id: unit.id,
      type: unit.type,
      content: unit.content,
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
    reward: reviewMode ? '复习之星' : '岛屿能量'
  }
}

function buildPinyinListen(unit) {
  return {
    id: `listen-${unit.id}`,
    type: 'micro',
    skill: 'pinyin',
    knowledgeUnitId: unit.id,
    prompt: `听一听，找到 ${unit.content} 的发音`,
    hint: '点击卡片听音，再确认正确答案。',
    narration: unit.content,
    items: [unit.content, ...(unit.confusionSet || [])].slice(0, 3).map((value) => ({
      id: value,
      label: value,
      subtitle: value === unit.content ? '目标发音' : '易混淆发音'
    })),
    targetId: unit.content
  }
}

function buildBlendTask(pair) {
  return {
    id: pair.id,
    type: 'match',
    skill: 'pinyin',
    knowledgeUnitId: `pinyin_${pair.syllable}`,
    prompt: `拼音拼读：组合 ${pair.syllable}`,
    hint: `拖动声母和韵母，拼出 ${pair.syllable}，打败 ${pair.rival}。`,
    battleTheme: true,
    pairs: [
      { id: pair.initial, left: pair.initial, right: `声母 ${pair.initial}` },
      { id: pair.final, left: pair.final, right: `韵母 ${pair.final}` },
      { id: pair.syllable, left: pair.syllable, right: `拼读 ${pair.syllable}` }
    ],
    targetSyllable: pair.syllable,
    reward: pair.reward
  }
}

const tracks = {
  zh: {
    pinyin: [
      buildPinyinBattle(pinyinUnits[0]),
      buildBlendTask(blendPairs[0]),
      buildPinyinListen(pinyinUnits[1])
    ],
    math: [
      {
        id: 'math-choice',
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
      },
      {
        id: 'math-listen-3',
        type: 'micro',
        skill: 'math',
        prompt: '找到数字 3',
        hint: '点中正确数字就会得到星星。',
        narration: '3',
        items: [
          { id: '1', label: '1', subtitle: '一个太阳' },
          { id: '3', label: '3', subtitle: '三颗星星' },
          { id: '5', label: '5', subtitle: '五只小鸟' }
        ],
        targetId: '3'
      }
    ],
    english: [
      {
        id: 'en-choice-cat',
        type: 'choice',
        skill: 'english',
        prompt: 'Which one is cat?',
        hint: '先读图片，再选英文单词。',
        question: '🐱 对应哪个单词？',
        options: [
          { id: 'cat', label: 'cat' },
          { id: 'dog', label: 'dog' },
          { id: 'bird', label: 'bird' }
        ],
        correct: 'cat'
      },
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
  return Object.values(knowledgeState)
    .filter((unit) => unit.nextReviewAt && unit.nextReviewAt <= now)
    .sort((left, right) => {
      const leftPriority = left.errorCount + (1 - left.accuracy) * 10
      const rightPriority = right.errorCount + (1 - right.accuracy) * 10
      return rightPriority - leftPriority
    })
    .slice(0, 2)
    .map((unit) => buildPinyinBattle(unit, true))
}

function pickTrack(language, focus) {
  const localeTracks = tracks[language] || tracks.zh
  if (focus === 'mixed') {
    return [
      ...(localeTracks.pinyin || []),
      ...(localeTracks.math || []),
      ...(localeTracks.english || [])
    ]
  }
  return localeTracks[focus] || []
}

export function createMission(profile, knowledgeState) {
  const missionPool = pickTrack(profile.language, profile.focus)
  const fallbackPool = pickTrack(profile.language, 'mixed')
  const reviewTasks = profile.focus === 'pinyin' || profile.focus === 'mixed' ? getDueReviewTasks(knowledgeState) : []
  const remaining = [...missionPool, ...fallbackPool].filter((task, index, list) => list.findIndex((candidate) => candidate.id === task.id) === index)
  const filteredRemaining = remaining.filter((task) => !reviewTasks.some((reviewTask) => reviewTask.id === task.id))
  const selected = [...reviewTasks, ...filteredRemaining].slice(0, 3)

  return selected.map((task, index) => ({
    ...task,
    order: index + 1,
    recommendedIntervalMinutes: [0, 10, 60][index] || 0
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
