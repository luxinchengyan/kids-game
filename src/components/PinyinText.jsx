import React from 'react'

function isChineseChar(char) {
  return /[\u4e00-\u9fa5]/.test(char)
}

function isPunctuation(char) {
  return /[，。！？、；：""''（）【】《》,.!?;:"'()<>]/.test(char)
}

function splitPinyin(pinyin) {
  if (!pinyin) return []
  
  const parts = pinyin.split(/\s+/)
  return parts.filter(p => p.length > 0)
}

export default function PinyinText({ text, pinyin, isPoem = false }) {
  const chars = text.split('')
  const pinyinParts = splitPinyin(pinyin)
  
  let pinyinIndex = 0
  
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: isPoem ? 'center' : 'flex-start',
      gap: '4px',
      lineHeight: isPoem ? 2 : 1.8
    }}>
      {chars.map((char, index) => {
        let charPinyin = ''
        let hasPinyin = false
        
        if (isChineseChar(char) && pinyinIndex < pinyinParts.length) {
          charPinyin = pinyinParts[pinyinIndex]
          hasPinyin = true
          pinyinIndex++
        }
        
        if (isPunctuation(char) || char === ' ') {
          return (
            <span 
              key={index} 
              style={{ 
                fontSize: '24px',
                color: '#3E2723',
                marginLeft: char === ' ' ? '4px' : '0',
                marginRight: char === ' ' ? '4px' : '0'
              }}
            >
              {char}
            </span>
          )
        }
        
        return (
          <span 
            key={index}
            style={{ 
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: hasPinyin ? '2em' : '1.5em',
              margin: '2px 0'
            }}
          >
            {hasPinyin && (
              <span style={{ 
                fontSize: '16px', 
                color: '#FF9800', 
                fontWeight: 600,
                height: '20px',
                lineHeight: '20px'
              }}>
                {charPinyin}
              </span>
            )}
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: '#3E2723',
              lineHeight: '1.2'
            }}>
              {char}
            </span>
          </span>
        )
      })}
    </div>
  )
}
