import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { sportsData, type SportCategory } from '../../data/sports';
import { track } from '../../lib/analytics';

// Function to speak text using Web Speech API
function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

// Search bar component
function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 搜索运动项目或运动员名称..."
        style={{
          width: '100%',
          padding: '16px 20px',
          fontSize: '18px',
          border: '3px solid #E91E63',
          borderRadius: '16px',
          outline: 'none',
          background: '#FFF0F5',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#C2185B';
          e.target.style.boxShadow = '0 0 0 4px rgba(233, 30, 99, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#E91E63';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

// Sport category card component
function SportCategoryCard({
  category,
  onClick,
  index,
}: {
  category: SportCategory;
  onClick: () => void;
  index: number;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    speakText(category.name);
    setTimeout(() => setIsSpeaking(false), category.name.length * 400 + 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)',
        borderRadius: '20px',
        padding: '24px',
        cursor: 'pointer',
        border: '3px solid #F06292',
        boxShadow: '0 4px 12px rgba(240, 98, 146, 0.3)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ fontSize: '56px', lineHeight: 1 }}>{category.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#880E4F', margin: 0 }}>
              {category.name}
            </h3>
            <button
              type="button"
              onClick={handleSpeak}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: isSpeaking ? 'rgba(233, 30, 99, 0.9)' : 'rgba(233, 30, 99, 0.2)',
                color: '#E91E63',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {isSpeaking ? '🔊' : '🔉'}
            </button>
          </div>
          <p style={{ fontSize: '15px', color: '#880E4F', margin: '0 0 12px 0' }}>
            {category.description}
          </p>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#E91E63',
              background: '#FCE4EC',
              padding: '4px 12px',
              borderRadius: '12px',
              display: 'inline-block',
            }}
          >
            {category.stars.length} 位明星运动员
          </div>
        </div>
        <div style={{ fontSize: '32px', color: '#E91E63' }}>→</div>
      </div>
    </motion.div>
  );
}

// Sport detail view component
function SportDetailView({
  category,
  onBack,
}: {
  category: SportCategory;
  onBack: () => void;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    speakText(category.name);
    setTimeout(() => setIsSpeaking(false), category.name.length * 400 + 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <Button variant="secondary" onClick={onBack}>
          ← 返回运动列表
        </Button>
      </div>

      {/* Sport Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(135deg, #E91E63, #F06292)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '64px' }}>{category.icon}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 900, margin: 0 }}>{category.name}</h1>
              <button
                type="button"
                onClick={handleSpeak}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isSpeaking ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSpeaking ? '🔊' : '🔉'}
              </button>
            </div>
            <p style={{ fontSize: '18px', margin: '8px 0 0 0', opacity: 0.95 }}>
              {category.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Introduction */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #F8BBD0',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#880E4F', marginBottom: '12px' }}>
          📖 项目介绍
        </h2>
        <p style={{ fontSize: '16px', color: '#6D4C41', lineHeight: 1.8, margin: 0 }}>
          {category.introduction}
        </p>
      </div>

      {/* Competitions */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #F8BBD0',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#880E4F', marginBottom: '16px' }}>
          🏆 常见赛事
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {category.competitions.map((comp: string, idx: number) => (
            <div
              key={idx}
              style={{
                background: '#FCE4EC',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#880E4F',
                fontWeight: 600,
              }}
            >
              {comp}
            </div>
          ))}
        </div>
      </div>

      {/* Stars */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #F8BBD0',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#880E4F', marginBottom: '16px' }}>
          ⭐ 著名体育明星
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {category.stars.map((star: typeof sportsData.categories[0]['stars'][0], idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: star.link ? 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' : '#FFF8E1',
                borderRadius: '16px',
                padding: '20px',
                border: star.link ? '3px solid #FF9800' : '3px solid #FFB74D',
                cursor: star.link ? 'pointer' : 'default',
                boxShadow: star.link ? '0 4px 12px rgba(255, 152, 0, 0.3)' : '0 2px 8px rgba(255, 183, 77, 0.2)',
              }}
              onClick={() => {
                if (star.link) {
                  track('sports_star_click', { starName: star.name, sport: category.name });
                  window.open(star.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ fontSize: '48px' }}>{star.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#E65100', margin: 0 }}>
                      {star.name}
                    </h3>
                    {star.link && (
                      <span
                        style={{
                          fontSize: '12px',
                          background: '#FF9800',
                          color: '#FFFFFF',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          fontWeight: 700,
                        }}
                      >
                        点击了解更多
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#BF360C', margin: '0 0 8px 0' }}>
                    {star.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {star.achievements.map((ach: string, aIdx: number) => (
                      <span
                        key={aIdx}
                        style={{
                          fontSize: '12px',
                          background: '#FFFFFF',
                          color: '#E65100',
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontWeight: 600,
                          border: '1px solid #FFB74D',
                        }}
                      >
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Classic Events */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #F8BBD0',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#880E4F', marginBottom: '16px' }}>
          🎬 经典赛事
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {category.classicEvents.map((event: string, idx: number) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '15px',
                color: '#880E4F',
                fontWeight: 600,
                borderLeft: '4px solid #E91E63',
              }}
            >
              {event}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SportsThemeHub() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SportCategory | null>(null);

  const handleBack = useCallback(() => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate('/');
    }
  }, [navigate, selectedCategory]);

  // Filter categories based on search
  const filteredCategories = sportsData.categories.filter((cat: SportCategory) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesCategory = cat.name.toLowerCase().includes(searchLower);
    const matchesStar = cat.stars.some((star) => star.name.toLowerCase().includes(searchLower));
    return matchesCategory || matchesStar;
  });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        padding: '0 var(--spacing-md)',
      }}
    >
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <SportDetailView
            key="detail"
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '32px' }}
            >
              <motion.h1
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #E91E63, #F06292, #E91E63)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '12px',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                🏅 体育健将
              </motion.h1>
              <p style={{ fontSize: '20px', color: '#880E4F', fontWeight: 600 }}>
                探索各种运动项目，了解著名运动员！✨
              </p>
            </motion.div>

            {/* Back Button */}
            <div style={{ marginBottom: '24px' }}>
              <Button variant="secondary" onClick={handleBack}>
                ← 返回首页
              </Button>
            </div>

            {/* Search Bar */}
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            {/* Category List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredCategories.map((category, index) => (
                <SportCategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  onClick={() => {
                    track('sports_category_select', {
                      categoryId: category.id,
                      categoryName: category.name,
                    });
                    setSelectedCategory(category);
                  }}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#8D6E63',
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                <p style={{ fontSize: '18px', fontWeight: 600 }}>
                  没有找到匹配的运动项目或运动员
                </p>
                <p style={{ fontSize: '14px', color: '#A1887F' }}>
                  试试其他搜索词
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
