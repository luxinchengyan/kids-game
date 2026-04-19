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

const tracks = {
  zh: {
    pinyin: [
      {
        id: 'py-listen-b',
        type: 'micro',
        skill: 'pinyin',
        prompt: '点一点，听声母 b 的发音',
        hint: '先听，再跟着读。',
        narration: 'b',
        items: [
          { id: 'b', label: 'b', subtitle: '玻璃球' },
          { id: 'p', label: 'p', subtitle: '泡泡' },
          { id: 'm', label: 'm', subtitle: '棉花糖' }
        ],
        targetId: 'b'
      },
      {
        id: 'py-match',
        type: 'match',
        skill: 'pinyin',
        prompt: '把拼音和图片配对',
        hint: '拖一拖，帮助角色找到朋友。',
        pairs: [
          { id: 'b', left: 'b', right: '🫧 泡泡' },
          { id: 'm', left: 'm', right: '🪁 风筝' },
          { id: 'f', left: 'f', right: '🐟 小鱼' }
        ]
      }
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
        id: 'py-listen-b-en',
        type: 'micro',
        skill: 'pinyin',
        prompt: 'Tap the letter with the /b/ sound',
        hint: 'Listen first, then pick.',
        narration: 'b',
        items: [
          { id: 'b', label: 'b', subtitle: 'bubble' },
          { id: 'p', label: 'p', subtitle: 'pop' },
          { id: 'm', label: 'm', subtitle: 'moon' }
        ],
        targetId: 'b'
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

export function createMission(profile) {
  const missionPool = pickTrack(profile.language, profile.focus)
  const fallbackPool = pickTrack(profile.language, 'mixed')
  const remaining = fallbackPool.filter((task) => !missionPool.some((ownTask) => ownTask.id === task.id))
  const selected = [...missionPool, ...remaining].slice(0, 3)

  return selected.map((task, index) => ({
    ...task,
    order: index + 1,
    recommendedIntervalMinutes: [0, 10, 60][index] || 0
  }))
}

export function getCompanion(profile) {
  const choice = companionCatalog[profile.companion] || companionCatalog.astro
  return choice[profile.language] || choice.zh
}
