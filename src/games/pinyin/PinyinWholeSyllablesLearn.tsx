/**
 * 整体认读音节学习
 * 展示 16 个整体认读音节，强调"不拆分、整体读"的核心概念
 * 交互：滑动卡片 → 翻面显示汉字 + 发音 + 规则说明
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { speak } from '../../lib/audio';
import { track } from '../../lib/analytics';
import { WHOLE_SYLLABLES, type PinyinItem } from './pinyinData';

// 颜色方案
const ACCENT = '#4CAF50';
const ACCENT_LIGHT = '#E8F5E9';
const ACCENT_BORDER = 'rgba(76,175,80,0.28)';

function SyllableCard({
  item,
  index,
  isFlipped,
  onClick,
}: {
  item: PinyinItem;
  index: number;
  isFlipped: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        border: 'none',
        cursor: 'pointer',
        background: 'transparent',
        padding: 0,
        perspective: '600px',
        width: '100%',
        height: '120px',
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '20px',
            background: isFlipped
              ? ACCENT
              : 'linear-gradient(135deg, #F1F8E9, #FFFFFF)',
            border: `2px solid ${isFlipped ? ACCENT : ACCENT_BORDER}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isFlipped ? `0 8px 20px ${ACCENT}44` : '0 4px 10px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '34px',
              fontWeight: 900,
              color: ACCENT,
              fontFamily: 'monospace',
            }}
          >
            {item.pinyin}
          </div>
          <div style={{ fontSize: '22px', marginTop: '4px' }}>{item.emoji}</div>
        </div>

        {/* Back */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${ACCENT}, #81C784)`,
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            boxShadow: `0 8px 20px ${ACCENT}44`,
          }}
        >
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace' }}>
            {item.pinyin}
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>
            {item.hanzi}
          </div>
          {item.tip && (
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#F1F8E9',
                marginTop: '4px',
                textAlign: 'center',
                padding: '0 4px',
                lineHeight: 1.4,
              }}
            >
              {item.tip}
            </div>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}

function DetailBanner({ item, onClose }: { item: PinyinItem; onClose: () => void }) {
  const [speaking, setSpeaking] = useState(false);

  const doSpeak = useCallback(() => {
    setSpeaking(true);
    speak(item.pinyin);
    setTimeout(() => setSpeaking(false), 900);
  }, [item.pinyin]);

  return (
    <motion.div
      key={item.pinyin}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.28 }}
      style={{
        background: ACCENT_LIGHT,
        borderRadius: '24px',
        padding: '20px 22px',
        marginBottom: '22px',
        border: `2px solid ${ACCENT_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center', minWidth: '60px' }}>
        <div style={{ fontSize: '56px', fontWeight: 900, color: ACCENT, fontFamily: 'monospace', lineHeight: 1 }}>
          {item.pinyin}
        </div>
        <div style={{ fontSize: '26px', marginTop: '4px' }}>{item.emoji}</div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#2E7D32', marginTop: '4px' }}>
          {item.hanzi}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: '180px' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            padding: '10px 14px',
            marginBottom: '12px',
            fontSize: '15px',
            fontWeight: 700,
            color: '#388E3C',
            lineHeight: 1.65,
          }}
        >
          📌 整体认读音节要整体读出，不需要拼合声母和韵母。
          {item.tip && <div style={{ marginTop: '6px', color: '#2E7D32' }}>💡 {item.tip}</div>}
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={doSpeak}
          style={{
            padding: '10px 22px',
            borderRadius: '14px',
            border: 'none',
            background: speaking ? ACCENT : `${ACCENT}18`,
            color: speaking ? '#FFFFFF' : ACCENT,
            fontWeight: 800,
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          {speaking ? '🔊 播放中…' : '🔉 点击发音'}
        </motion.button>
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: 'none',
          background: '#ECEFF1',
          color: '#546E7A',
          fontSize: '16px',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function PinyinWholeSyllablesLearn() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-whole-syllables-learn');
  const [flippedSet, setFlippedSet] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<PinyinItem | null>(null);

  const handleCardClick = useCallback(
    (item: PinyinItem) => {
      const isFlipping = !flippedSet.has(item.pinyin);
      setFlippedSet((prev) => {
        const next = new Set(prev);
        if (isFlipping) {
          next.add(item.pinyin);
        } else {
          next.delete(item.pinyin);
        }
        return next;
      });
      setActiveItem(isFlipping ? item : null);
      if (isFlipping) {
        speak(item.pinyin);
        track('pinyin_whole_syllable_view', { pinyin: item.pinyin });
      }
    },
    [flippedSet],
  );

  const handleBack = useCallback(() => navigate('/games/pinyin'), [navigate]);

  const handleComplete = useCallback(() => {
    handleGameComplete({ stars: 3, correct: flippedSet.size, total: WHOLE_SYLLABLES.length });
    track('pinyin_whole_syllables_complete', { learned: flippedSet.size });
  }, [handleGameComplete, flippedSet.size]);

  return (
    <PageLayout maxWidth="860px">
      <GamePageHeader
        title="整体认读音节"
        icon="🃏"
        subtitle="16 个特殊音节，要整体读出来哦！点击卡片翻面查看"
        gradient="linear-gradient(135deg, #4CAF50, #81C784)"
        progressColor={ACCENT}
        currentTask={flippedSet.size}
        totalTasks={WHOLE_SYLLABLES.length}
        onBack={handleBack}
      />

      {/* Concept tip */}
      <div
        style={{
          background: ACCENT_LIGHT,
          borderRadius: '18px',
          padding: '14px 18px',
          marginBottom: '20px',
          fontSize: '15px',
          fontWeight: 700,
          color: '#388E3C',
          lineHeight: 1.65,
          border: `2px solid ${ACCENT_BORDER}`,
        }}
      >
        💡 <strong>什么是整体认读音节？</strong>
        &nbsp;它们不需要拼读，直接认读整个音节，共 16 个：zhi、chi、shi、ri、zi、ci、si、yi、wu、yu、ye、yue、yuan、yin、yun、ying。
      </div>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '18px',
          fontSize: '14px',
          fontWeight: 700,
          color: '#8D6E63',
        }}
      >
        已翻开 {flippedSet.size} / {WHOLE_SYLLABLES.length}
      </div>

      <AnimatePresence mode="wait">
        {activeItem && (
          <DetailBanner key={activeItem.pinyin} item={activeItem} onClose={() => setActiveItem(null)} />
        )}
      </AnimatePresence>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {WHOLE_SYLLABLES.map((item, idx) => (
          <SyllableCard
            key={item.pinyin}
            item={item}
            index={idx}
            isFlipped={flippedSet.has(item.pinyin)}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>

      {flippedSet.size >= 8 && (
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
              background: 'linear-gradient(135deg, #4CAF50, #81C784)',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(76,175,80,0.35)',
            }}
          >
            🌟 完成学习！({flippedSet.size}/{WHOLE_SYLLABLES.length} 已翻开)
          </motion.button>
        </motion.div>
      )}
    </PageLayout>
  );
}
