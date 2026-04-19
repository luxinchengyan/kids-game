import React from 'react'
import { storyData } from '../data/learningContent'

const typeLabels = {
  myth: '神话故事',
  poem: '古诗',
  idiom: '成语故事',
  history: '历史典故',
  fable: '寓言故事'
}

const typeColors = {
  myth: { bg: '#FFF3E0', color: '#FF9800', border: '#FFB74D' },
  poem: { bg: '#E3F2FD', color: '#2196F3', border: '#64B5F6' },
  idiom: { bg: '#E8F5E9', color: '#4CAF50', border: '#81C784' },
  history: { bg: '#F3E5F5', color: '#9C27B0', border: '#CE93D8' },
  fable: { bg: '#FFF9C4', color: '#F9A825', border: '#FFD54F' }
}

// 从拼音字符串中提取每个音节的首字母（忽略声调符号）
function getPinyinInitials(pinyinStr) {
  const toneMap = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v', 'ü': 'v'
  }
  // 将带声调字符替换为普通字符
  const plain = pinyinStr.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, c => toneMap[c] || c)
  // 按空格分割音节，取每个音节第一个字母
  return plain
    .split(/[\s,.\-！？，。、；：""''（）【】]+/)
    .filter(s => /^[a-z]/.test(s))
    .map(s => s[0])
    .join('')
}

// 将拼音字符串中声调去除，得到普通拼音字符串（用于全拼匹配）
function stripTones(pinyinStr) {
  const toneMap = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v', 'ü': 'v'
  }
  return pinyinStr.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, c => toneMap[c] || c)
    .replace(/[\s,.\-！？，。、；：""''（）【】]+/g, '')
}

function matchesSearch(story, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  if (!q) return true

  // 1. 标题汉字匹配
  if (story.title.includes(q)) return true

  // 2. example 汉字匹配
  if (story.example && story.example.includes(q)) return true

  // 3. 拼音首字母匹配（如 "pgt" 匹配 "盘古天"）
  if (/^[a-z]+$/.test(q)) {
    const initials = getPinyinInitials(story.titlePinyin)
    if (initials.startsWith(q)) return true

    // 4. 去声调全拼匹配（如 "pangu" 匹配 "盘古"）
    const fullPinyin = stripTones(story.titlePinyin)
    if (fullPinyin.includes(q)) return true
  }

  return false
}

function speakTitle(title) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(title)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.85
    utterance.pitch = 1.1
    window.speechSynthesis.speak(utterance)
  }
}

export default function StoryList({ onSelectStory, onBack }) {
  const [selectedType, setSelectedType] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [playingId, setPlayingId] = React.useState(null)

  const types = ['all', 'myth', 'poem', 'idiom', 'history', 'fable']
  const typeNames = { all: '全部', ...typeLabels }

  const filteredStories = storyData.filter(s => {
    const typeMatch = selectedType === 'all' || s.type === selectedType
    const searchMatch = matchesSearch(s, searchQuery)
    return typeMatch && searchMatch
  })

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '700px', 
      margin: '0 auto' 
    }}>
      <div style={{ 
        textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 800, 
          color: '#3E2723',
          marginBottom: '8px'
        }}>
          📚 故事王国
        </h1>
        <p style={{ fontSize: '18px', color: '#6D4C41' }}>
          选择一个故事开始阅读吧！
        </p>
      </div>

      {/* 搜索框 */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '20px',
          pointerEvents: 'none'
        }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜索故事名称、拼音首字母（如 pgt）或全拼（如 pangu）"
          style={{
            width: '100%',
            padding: '14px 44px 14px 48px',
            borderRadius: '999px',
            border: '2px solid #FFCC80',
            fontSize: '16px',
            color: '#3E2723',
            background: '#FFFDE7',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => { e.target.style.borderColor = '#FF9800' }}
          onBlur={e => { e.target.style.borderColor = '#FFCC80' }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#BCAAA4',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* 类型筛选 */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '28px',
        justifyContent: 'center'
      }}>
        {types.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              border: selectedType === type 
                ? `3px solid ${type === 'all' ? '#3E2723' : typeColors[type]?.color}` 
                : '2px solid #FFCC80',
              background: selectedType === type 
                ? (type === 'all' ? 'linear-gradient(135deg, #FFF8E1, #FFECB3)' : `linear-gradient(135deg, ${typeColors[type]?.bg}, ${typeColors[type]?.bg})`)
                : '#FFFFFF',
              color: selectedType === type 
                ? (type === 'all' ? '#3E2723' : typeColors[type]?.color)
                : '#6D4C41',
              fontSize: '16px',
              fontWeight: selectedType === type ? 800 : 600,
              cursor: 'pointer'
            }}
          >
            {typeNames[type]}
          </button>
        ))}
      </div>

      {/* 搜索结果提示 */}
      {searchQuery && (
        <p style={{ fontSize: '15px', color: '#8D6E63', marginBottom: '16px', textAlign: 'center' }}>
          找到 <strong style={{ color: '#FF9800' }}>{filteredStories.length}</strong> 个故事
          {filteredStories.length === 0 && '，换个关键词试试吧 😊'}
        </p>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px' 
      }}>
        {filteredStories.map(story => (
          <div
            key={story.id}
            onClick={() => onSelectStory(story)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              cursor: 'pointer',
              border: `2px solid ${typeColors[story.type]?.border}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '12px' 
            }}>
              <span style={{ fontSize: '48px', marginRight: '12px' }}>{story.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 800, 
                    color: '#3E2723',
                    margin: 0
                  }}>
                    {story.title}
                  </h3>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      setPlayingId(story.id)
                      speakTitle(story.title)
                      setTimeout(() => setPlayingId(null), story.title.length * 600 + 600)
                    }}
                    title="朗读标题"
                    style={{
                      flexShrink: 0,
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: 'none',
                      background: playingId === story.id
                        ? 'linear-gradient(135deg, #BDBDBD, #9E9E9E)'
                        : `linear-gradient(135deg, ${typeColors[story.type]?.color}, ${typeColors[story.type]?.border})`,
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                  >
                    {playingId === story.id ? '🔊' : '▶'}
                  </button>
                </div>
                <p style={{
                  fontSize: '13px',
                  color: '#FF9800',
                  fontWeight: 600,
                  margin: '2px 0 6px 0',
                  letterSpacing: '0.02em'
                }}>
                  {story.titlePinyin}
                </p>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: typeColors[story.type]?.color,
                  background: typeColors[story.type]?.bg,
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}>
                  {typeLabels[story.type]}
                </span>
                {story.author && (
                  <span style={{ 
                    fontSize: '13px', 
                    color: '#6D4C41', 
                    marginLeft: '8px' 
                  }}>
                    {story.dynasty} · {story.author}
                  </span>
                )}
              </div>
            </div>
            <p style={{ 
              fontSize: '15px', 
              color: '#6D4C41', 
              lineHeight: 1.5 
            }}>
              {story.example}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px dashed #FFCC80'
            }}>
              <span style={{ fontSize: '14px', color: '#6D4C41' }}>
                难度 {'⭐'.repeat(story.difficulty)}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#FF9800' }}>
                点击阅读 →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
