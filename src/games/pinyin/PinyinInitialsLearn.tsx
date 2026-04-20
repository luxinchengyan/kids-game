/**
 * 声母学习
 * 展示所有声母，支持按发音部位分组浏览、点击发音、卡片翻转展示例字
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { speak } from '../../lib/audio';
import { track } from '../../lib/analytics';
import { INITIAL_GROUPS, type PinyinItem } from './pinyinData';

// ── 单个声母卡片 ─────────────────────────────────────────────
function InitialCard({
  item,
  index,
  isActive,
  onClick,
}: {
  item: PinyinItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      style={{
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        background: 'transparent',
        width: '100%',
      }}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          background: isActive
            ? 'linear-gradient(135deg, #FF9800, #FFB74D)'
            : 'linear-gradient(135deg, #FFF8E1, #FFFFFF)',
          border: isActive ? '2px solid #FF9800' : '2px solid rgba(255,152,0,0.22)',
          borderRadius: '18px',
          padding: '14px 8px',
          textAlign: 'center',
          boxShadow: isActive
            ? '0 8px 20px rgba(255,152,0,0.35)'
            : '0 4px 10px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 900,
            color: isActive ? '#FFFFFF' : '#E65100',
            lineHeight: 1.1,
            fontFamily: 'monospace',
            letterSpacing: '0.5px',
          }}
        >
          {item.pinyin}
        </div>
        <div style={{ fontSize: '22px', margin: '6px 0 2px' }}>{item.emoji}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: isActive ? '#FFF3E0' : '#6D4C41' }}>
          {item.hanzi}
        </div>
      </motion.div>
    </motion.button>
  );
}

// ── 激活详情面板 ─────────────────────────────────────────────
function DetailPanel({ item, onClose }: { item: PinyinItem; onClose: () => void }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = useCallback(() => {
    setIsSpeaking(true);
    speak(item.pinyin);
    setTimeout(() => setIsSpeaking(false), 900);
  }, [item.pinyin]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'linear-gradient(135deg, #FFF8E1, #FFFFFF)',
        borderRadius: '28px',
        padding: '28px 24px',
        boxShadow: '0 20px 48px rgba(255,152,0,0.18)',
        border: '2px solid rgba(255,152,0,0.3)',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
      }}
    >
      {/* Big pinyin */}
      <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#FF9800',
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          {item.pinyin}
        </div>
        <div style={{ fontSize: '32px', marginTop: '6px' }}>{item.emoji}</div>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#5D4037', marginTop: '4px' }}>
          {item.hanzi}
        </div>
      </div>

      {/* Tip */}
      <div style={{ flex: 1, minWidth: '180px' }}>
        {item.tip && (
          <div
            style={{
              background: '#FFF3E0',
              borderRadius: '16px',
              padding: '12px 16px',
              color: '#E65100',
              fontWeight: 700,
              fontSize: '16px',
              marginBottom: '16px',
              lineHeight: 1.6,
            }}
          >
            💡 {item.tip}
          </div>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSpeak}
          style={{
            padding: '12px 24px',
            borderRadius: '14px',
            border: 'none',
            background: isSpeaking
              ? 'linear-gradient(135deg, #FF9800, #FFB74D)'
              : 'rgba(255,152,0,0.12)',
            color: isSpeaking ? '#FFFFFF' : '#E65100',
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {isSpeaking ? '🔊 播放中…' : '🔉 点击发音'}
        </motion.button>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: 'none',
          background: '#ECEFF1',
          color: '#546E7A',
          fontSize: '18px',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          flexShrink: 0,
        }}
      >
        ✕
      </motion.button>
    </motion.div>
  );
}

// ── 主组件 ───────────────────────────────────────────────────
export default function PinyinInitialsLearn() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-initials-learn');
  const [activeItem, setActiveItem] = useState<PinyinItem | null>(null);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());

  const handleCardClick = useCallback(
    (item: PinyinItem) => {
      const isOpening = activeItem?.pinyin !== item.pinyin;
      setActiveItem(isOpening ? item : null);
      if (isOpening) {
        speak(item.pinyin);
        setLearnedSet((prev) => {
          const next = new Set(prev);
          next.add(item.pinyin);
          return next;
        });
        track('pinyin_initial_view', { pinyin: item.pinyin });
      }
    },
    [activeItem],
  );

  const handleBack = useCallback(() => navigate('/games/pinyin'), [navigate]);

  const handleComplete = useCallback(() => {
    handleGameComplete({ stars: 3, correct: learnedSet.size, total: 23 });
    track('pinyin_initials_learn_complete', { learned: learnedSet.size });
  }, [handleGameComplete, learnedSet.size]);

  const learnedCount = learnedSet.size;
  const totalCount = 23;

  return (
    <PageLayout maxWidth="900px">
      <GamePageHeader
        title="声母学习"
        icon="🔤"
        subtitle="点击每个声母，听发音、看例字、记住口型"
        gradient="linear-gradient(135deg, #FF9800, #FFB74D)"
        progressColor="#FF9800"
        currentTask={learnedCount}
        totalTasks={totalCount}
        onBack={handleBack}
      />

      {/* Progress pill */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '15px',
          fontWeight: 700,
          color: '#8D6E63',
        }}
      >
        已探索 {learnedCount} / {totalCount} 个声母
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeItem && (
          <DetailPanel
            key={activeItem.pinyin}
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>

      {/* Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '32px' }}>
        {INITIAL_GROUPS.map((group) => (
          <div key={group.label}>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 900,
                color: '#FF9800',
                marginBottom: '12px',
                padding: '6px 14px',
                background: '#FFF3E0',
                borderRadius: '999px',
                display: 'inline-block',
              }}
            >
              {group.label}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))',
                gap: '10px',
              }}
            >
              {group.items.map((item, idx) => (
                <InitialCard
                  key={item.pinyin}
                  item={item}
                  index={idx}
                  isActive={activeItem?.pinyin === item.pinyin}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Finish button once enough explored */}
      {learnedCount >= 10 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleComplete}
            style={{
              padding: '16px 40px',
              borderRadius: '20px',
              border: 'none',
              background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(255,152,0,0.35)',
            }}
          >
            🌟 完成学习！({learnedCount}/{totalCount} 已探索)
          </motion.button>
        </motion.div>
      )}
    </PageLayout>
  );
}
