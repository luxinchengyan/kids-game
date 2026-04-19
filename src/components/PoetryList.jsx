import React from 'react'
import { storyData } from '../data/learningContent'

// Filter only poems from story data
const poemData = storyData.filter(s => s.type === 'poem')

const poemColors = {
  bg: '#E3F2FD',
  color: '#2196F3',
  border: '#64B5F6',
  gradient: 'linear-gradient(135deg, #2196F3, #64B5F6)'
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

function matchesSearch(poem, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  if (!q) return true

  // 1. 标题汉字匹配
  if (poem.title.includes(q)) return true

  // 2. example 汉字匹配
  if (poem.example && poem.example.includes(q)) return true

  // 3. 作者匹配
  if (poem.author && poem.author.includes(q)) return true

  // 4. 拼音首字母匹配（如 "wls" 匹配 "望庐山"）
  if (/^[a-z]+$/.test(q)) {
    const initials = getPinyinInitials(poem.titlePinyin)
    if (initials.startsWith(q)) return true

    // 5. 去声调全拼匹配（如 "wanglu" 匹配 "望庐"）
    const fullPinyin = stripTones(poem.titlePinyin)
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

export default function PoetryList({ onSelectPoem, onBack }) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [playingId, setPlayingId] = React.useState(null)

  const filteredPoems = poemData.filter(p => matchesSearch(p, searchQuery))

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
          background: poemColors.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px'
        }}>
          🏛️ 古典诗词
        </h1>
        <p style={{ fontSize: '18px', color: '#6D4C41' }}>
          学习优美的古诗词，感受传统文化的魅力！
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
          placeholder="搜索诗词名称、作者、拼音首字母或全拼"
          style={{
            width: '100%',
            padding: '14px 44px 14px 48px',
            borderRadius: '999px',
            border: '2px solid #64B5F6',
            fontSize: '16px',
            color: '#3E2723',
            background: '#E3F2FD',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => { e.target.style.borderColor = '#2196F3' }}
          onBlur={e => { e.target.style.borderColor = '#64B5F6' }}
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
              color: '#90CAF9',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* 搜索结果提示 */}
      {searchQuery && (
        <p style={{ fontSize: '15px', color: '#8D6E63', marginBottom: '16px', textAlign: 'center' }}>
          找到 <strong style={{ color: '#2196F3' }}>{filteredPoems.length}</strong> 首诗词
          {filteredPoems.length === 0 && '，换个关键词试试吧 😊'}
        </p>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px' 
      }}>
        {filteredPoems.map(poem => (
          <div
            key={poem.id}
            onClick={() => onSelectPoem(poem)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '20px',
              cursor: 'pointer',
              border: `2px solid ${poemColors.border}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(33, 150, 243, 0.15)'
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
              <span style={{ fontSize: '48px', marginRight: '12px' }}>{poem.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 800, 
                    color: '#3E2723',
                    margin: 0
                  }}>
                    {poem.title}
                  </h3>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      setPlayingId(poem.id)
                      speakTitle(poem.title)
                      setTimeout(() => setPlayingId(null), poem.title.length * 600 + 600)
                    }}
                    title="朗读标题"
                    style={{
                      flexShrink: 0,
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: 'none',
                      background: playingId === poem.id
                        ? 'linear-gradient(135deg, #BDBDBD, #9E9E9E)'
                        : poemColors.gradient,
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                  >
                    {playingId === poem.id ? '🔊' : '▶'}
                  </button>
                </div>
                <p style={{
                  fontSize: '13px',
                  color: '#2196F3',
                  fontWeight: 600,
                  margin: '2px 0 6px 0',
                  letterSpacing: '0.02em'
                }}>
                  {poem.titlePinyin}
                </p>
                {poem.author && (
                  <span style={{ 
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#2196F3',
                    background: '#E3F2FD',
                    padding: '4px 10px',
                    borderRadius: '999px'
                  }}>
                    {poem.dynasty} · {poem.author}
                  </span>
                )}
              </div>
            </div>
            <p style={{ 
              fontSize: '15px', 
              color: '#6D4C41', 
              lineHeight: 1.5,
              fontStyle: 'italic'
            }}>
              {poem.example}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px dashed #64B5F6'
            }}>
              <span style={{ fontSize: '14px', color: '#6D4C41' }}>
                难度 {'⭐'.repeat(poem.difficulty)}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#2196F3' }}>
                点击阅读 →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
