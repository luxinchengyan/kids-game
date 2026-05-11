import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sportsData, type SportCategory } from '../../data/sports';
import { track } from '../../lib/analytics';
import { APP_SHELL_MAX_WIDTH, PageLayout, GamePageHeader } from '../../components/PageLayout';
import { BrandPill, EmptyState, IconActionButton, SectionHeading, SurfaceCard } from '../../components/BrandPrimitives';
import { Button } from '../../components/Button/Button';

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
    <SurfaceCard
      borderColor="rgba(233, 30, 99, 0.18)"
      background="linear-gradient(135deg, rgba(252,228,236,0.95), rgba(255,255,255,0.96))"
      style={{ padding: '18px 20px', marginBottom: '24px' }}
    >
      <SectionHeading
        eyebrow="Sport search"
        title="先选一个项目，再认识明星和经典赛事"
        description="这里统一成主题入口页的结构：搜索、选项目、看详情。"
        accent="#C2185B"
        style={{ marginBottom: '14px' }}
      />
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
    </SurfaceCard>
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
      style={{ cursor: 'pointer' }}
    >
      <SurfaceCard
        borderColor="rgba(233, 30, 99, 0.22)"
        background="linear-gradient(135deg, #FCE4EC, rgba(255,255,255,0.98))"
        shadow="0 10px 24px rgba(233, 30, 99, 0.14)"
        style={{ padding: '24px' }}
      >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'start', gap: '16px' }}>
        <div style={{ fontSize: '56px', lineHeight: 1 }}>{category.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#880E4F', margin: 0 }}>
              {category.name}
            </h3>
            <IconActionButton
              icon="🔉"
              activeIcon="🔊"
              active={isSpeaking}
              label="播放项目名称"
              onClick={handleSpeak}
              background="rgba(255,255,255,0.76)"
              activeBackground="linear-gradient(135deg, #E91E63, #F06292)"
              color={isSpeaking ? '#FFFFFF' : '#E91E63'}
            />
          </div>
          <p style={{ fontSize: '15px', color: '#880E4F', margin: '0 0 12px 0' }}>
            {category.description}
          </p>
          <BrandPill background="rgba(255,255,255,0.72)" color="#C2185B">
            {category.stars.length} 位明星运动员
          </BrandPill>
        </div>
        <div style={{ fontSize: '32px', color: '#E91E63' }}>→</div>
      </div>
      </SurfaceCard>
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
      >
        <SurfaceCard
          background="linear-gradient(135deg, #E91E63, #F06292)"
          borderColor="rgba(233, 30, 99, 0.18)"
          style={{ padding: '32px', marginBottom: '32px', color: '#FFFFFF' }}
        >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '64px' }}>{category.icon}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 900, margin: 0 }}>{category.name}</h1>
              <IconActionButton
                icon="🔉"
                activeIcon="🔊"
                active={isSpeaking}
                label="播放项目名称"
                onClick={handleSpeak}
                background="rgba(255,255,255,0.24)"
                activeBackground="rgba(255,255,255,0.92)"
                color={isSpeaking ? '#E91E63' : '#FFFFFF'}
              />
            </div>
            <p style={{ fontSize: '18px', margin: '8px 0 0 0', opacity: 0.95 }}>
              {category.description}
            </p>
          </div>
        </div>
        </SurfaceCard>
      </motion.div>

      {/* Introduction */}
      <SurfaceCard borderColor="rgba(233, 30, 99, 0.18)" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#880E4F', marginBottom: '12px' }}>
          📖 项目介绍
        </h2>
        <p style={{ fontSize: '16px', color: '#6D4C41', lineHeight: 1.8, margin: 0 }}>
          {category.introduction}
        </p>
      </SurfaceCard>

      {/* Competitions */}
      <SurfaceCard borderColor="rgba(233, 30, 99, 0.18)" style={{ padding: '24px', marginBottom: '24px' }}>
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
      </SurfaceCard>

      {/* Stars */}
      <SurfaceCard borderColor="rgba(233, 30, 99, 0.18)" style={{ padding: '24px', marginBottom: '24px' }}>
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
                      <BrandPill background="#FF9800" color="#FFFFFF" style={{ minHeight: '24px', padding: '2px 8px', fontSize: '12px' }}>
                        点击了解更多
                      </BrandPill>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#BF360C', margin: '0 0 8px 0' }}>
                    {star.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {star.achievements.map((ach: string, aIdx: number) => (
                      <BrandPill key={aIdx} background="#FFFFFF" color="#E65100" style={{ border: '1px solid #FFB74D', minHeight: '24px', padding: '4px 10px', fontSize: '12px' }}>
                        {ach}
                      </BrandPill>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SurfaceCard>

      {/* Classic Events */}
      <SurfaceCard borderColor="rgba(233, 30, 99, 0.18)" style={{ padding: '24px' }}>
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
      </SurfaceCard>
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
    <PageLayout maxWidth={APP_SHELL_MAX_WIDTH}>
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
            <GamePageHeader
              title="体育健将"
              icon="🏅"
              subtitle="探索各种运动项目，了解著名运动员！✨"
              gradient="linear-gradient(135deg, #E91E63, #F06292, #E91E63)"
              progressColor="#E91E63"
              onBack={handleBack}
            />

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
              <EmptyState
                emoji="🔍"
                title="没有找到匹配的运动项目或运动员"
                description="试试其他搜索词"
                accent="#E91E63"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
