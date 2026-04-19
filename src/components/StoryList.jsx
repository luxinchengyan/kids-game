import React from 'react'
import { storyData } from '../data/learningContent'

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

export default function StoryList({ onSelectStory, onBack }) {
  const [selectedType, setSelectedType] = React.useState('all')

  const types = ['all', 'myth', 'poem', 'idiom', 'history']
  const typeNames = { all: '全部', ...typeLabels }

  const filteredStories = selectedType === 'all' 
    ? storyData 
    : storyData.filter(s => s.type === selectedType)

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '700px', 
      margin: '0 auto' 
    }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={onBack}
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
          ← 返回首页
        </button>
      </div>

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
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 800, 
                  color: '#3E2723',
                  marginBottom: '4px'
                }}>
                  {story.title}
                </h3>
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
