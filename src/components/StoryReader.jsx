import React, { useState, useRef } from 'react'
import PinyinText from './PinyinText'

const typeLabels = {
  myth: '神话故事',
  poem: '古诗',
  idiom: '成语故事',
  history: '历史典故'
}

const typeColors = {
  myth: { bg: '#FFF3E0', color: '#FF9800', border: '#FFB74D' },
  poem: { bg: '#E3F2FD', color: '#2196F3', border: '#64B5F6' },
  idiom: { bg: '#E8F5E9', color: '#4CAF50', border: '#81C784' },
  history: { bg: '#F3E5F5', color: '#9C27B0', border: '#CE93D8' }
}

export default function StoryReader({ story, onComplete, onBack }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPinyin, setShowPinyin] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const speechSynthesisRef = useRef(null)

  const colorScheme = typeColors[story.type] || typeColors.myth

  const speakText = (text) => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'zh-CN'
        utterance.rate = 0.85
        utterance.pitch = 1.1
        
        utterance.onend = () => {
          resolve()
        }
        
        window.speechSynthesis.speak(utterance)
      } else {
        resolve()
      }
    })
  }

  const playCurrentLine = async () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    await speakText(story.content[currentLine].text)
    setIsPlaying(false)
  }

  const playAll = async () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel()
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    for (let i = currentLine; i < story.content.length; i++) {
      setCurrentLine(i)
      await speakText(story.content[i].text)
    }
    setIsPlaying(false)
    setIsCompleted(true)
  }

  const nextLine = () => {
    if (currentLine < story.content.length - 1) {
      setCurrentLine(currentLine + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const prevLine = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1)
    }
  }

  const handleComplete = () => {
    window.speechSynthesis?.cancel()
    onComplete({
      success: true,
      stars: story.type === 'poem' ? 4 : 3,
      response: 'read'
    })
  }

  const progress = ((currentLine + 1) / story.content.length) * 100

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '700px', 
      margin: '0 auto' 
    }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => {
            window.speechSynthesis?.cancel()
            onBack()
          }}
          style={{
            padding: '12px 24px',
            borderRadius: '16px',
            border: '2px solid #2196F3',
            background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
            color: '#1976D2',
            fontSize: '18px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ← 返回列表
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setShowPinyin(!showPinyin)}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: '2px solid #FF9800',
              background: showPinyin ? 'linear-gradient(135deg, #FFF3E0, #FFECB3)' : 'white',
              color: '#FF9800',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {showPinyin ? '🔤 隐藏拼音' : '🔤 显示拼音'}
          </button>
        </div>
      </div>

      <div style={{ 
        background: `linear-gradient(135deg, ${colorScheme.bg}, white)`,
        borderRadius: '24px',
        padding: '28px',
        marginBottom: '20px',
        border: `3px solid ${colorScheme.border}`,
        boxShadow: `0 8px 24px ${colorScheme.bg}`
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '80px', marginBottom: '12px', display: 'inline-block' }}>{story.emoji}</span>
          
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '10px', 
            marginBottom: '12px' 
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 700,
              color: colorScheme.color,
              background: colorScheme.bg,
              padding: '6px 14px',
              borderRadius: '999px',
              border: `2px solid ${colorScheme.border}`
            }}>
              {typeLabels[story.type]}
            </span>
            {story.author && (
              <span style={{ fontSize: '15px', color: '#6D4C41', fontWeight: 600 }}>
                {story.dynasty} · {story.author}
              </span>
            )}
          </div>

          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            color: '#3E2723',
            marginBottom: showPinyin ? '8px' : '0'
          }}>
            {story.title}
          </h2>
          
          {showPinyin && (
            <p style={{ 
              fontSize: '18px', 
              color: '#FF9800', 
              fontWeight: 600,
              marginBottom: '0'
            }}>
              {story.titlePinyin}
            </p>
          )}
        </div>

        <div style={{ 
          width: '100%', 
          height: '12px', 
          background: 'rgba(0,0,0,0.08)', 
          borderRadius: '999px',
          marginBottom: '24px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: `linear-gradient(90deg, ${colorScheme.color}, ${colorScheme.border})`,
            borderRadius: '999px',
            transition: 'width 0.3s ease'
          }} />
        </div>

        <div style={{ 
          marginBottom: '16px', 
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 600,
          color: '#6D4C41'
        }}>
          {currentLine + 1} / {story.content.length}
        </div>

        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          minHeight: '180px',
          border: `2px solid ${colorScheme.border}`,
          marginBottom: '24px'
        }}>
          {showPinyin ? (
            <PinyinText 
              text={story.content[currentLine].text}
              pinyin={story.content[currentLine].pinyin}
              isPoem={story.type === 'poem'}
            />
          ) : (
            <p style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: '#3E2723',
              lineHeight: story.type === 'poem' ? 2 : 1.8,
              textAlign: story.type === 'poem' ? 'center' : 'left'
            }}>
              {story.content[currentLine].text}
            </p>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '12px', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button
            type="button"
            onClick={prevLine}
            disabled={currentLine === 0}
            style={{
              padding: '14px 24px',
              borderRadius: '16px',
              border: '2px solid #FFCC80',
              background: currentLine === 0 ? '#FFF8E1' : 'white',
              color: currentLine === 0 ? '#BDBDBD' : '#3E2723',
              fontSize: '18px',
              fontWeight: 700,
              cursor: currentLine === 0 ? 'not-allowed' : 'pointer',
              opacity: currentLine === 0 ? 0.5 : 1
            }}
          >
            ◀ 上一句
          </button>

          <button
            type="button"
            onClick={playCurrentLine}
            disabled={isPlaying}
            style={{
              padding: '14px 28px',
              borderRadius: '16px',
              border: 'none',
              background: isPlaying 
                ? 'linear-gradient(135deg, #BDBDBD, #9E9E9E)' 
                : 'linear-gradient(135deg, #FF9800, #F57C00)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 800,
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              boxShadow: isPlaying 
                ? 'none' 
                : '0 6px 16px rgba(255, 152, 0, 0.4)'
            }}
          >
            {isPlaying ? '🔊 朗读中...' : '🔊 朗读本句'}
          </button>

          <button
            type="button"
            onClick={playAll}
            style={{
              padding: '14px 28px',
              borderRadius: '16px',
              border: 'none',
              background: isPlaying 
                ? 'linear-gradient(135deg, #EF5350, #C62828)' 
                : 'linear-gradient(135deg, #4CAF50, #388E3C)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: isPlaying 
                ? '0 6px 16px rgba(244, 67, 54, 0.4)' 
                : '0 6px 16px rgba(76, 175, 80, 0.4)'
            }}
          >
            {isPlaying ? '⏹ 停止' : '▶️ 全文朗读'}
          </button>

          <button
            type="button"
            onClick={nextLine}
            disabled={isCompleted || currentLine === story.content.length - 1}
            style={{
              padding: '14px 24px',
              borderRadius: '16px',
              border: '2px solid #2196F3',
              background: (isCompleted || currentLine === story.content.length - 1) ? '#E3F2FD' : 'white',
              color: (isCompleted || currentLine === story.content.length - 1) ? '#1976D2' : '#3E2723',
              fontSize: '18px',
              fontWeight: 700,
              cursor: (isCompleted || currentLine === story.content.length - 1) ? 'not-allowed' : 'pointer',
              opacity: (isCompleted || currentLine === story.content.length - 1) ? 0.7 : 1
            }}
          >
            下一句 ▶
          </button>
        </div>
      </div>

      {isCompleted && (
        <div style={{
          textAlign: 'center',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(129, 199, 132, 0.1))',
          borderRadius: '24px',
          border: '3px solid #4CAF50',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎉</div>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            color: '#388E3C',
            marginBottom: '12px'
          }}>
            太棒了！你读完了整个故事！
          </h3>
          <p style={{ fontSize: '18px', color: '#66BB6A', marginBottom: '20px' }}>
            获得了 {story.type === 'poem' ? '4' : '3'} 颗星星和 {typeLabels[story.type] === '古诗' ? '诗人徽章' : typeLabels[story.type] === '成语故事' ? '成语达人' : typeLabels[story.type] === '历史典故' ? '历史小达人' : '神话勋章'}
          </p>
          <button
            type="button"
            onClick={handleComplete}
            style={{
              padding: '16px 48px',
              borderRadius: '20px',
              border: 'none',
              background: 'linear-gradient(135deg, #4CAF50, #388E3C)',
              color: 'white',
              fontSize: '20px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)'
            }}
          >
            ✨ 领取奖励
          </button>
        </div>
      )}
    </div>
  )
}
