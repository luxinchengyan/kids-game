/**
 * 韵母学习
 * 按单韵母 / 复韵母 / 鼻韵母 分组展示，支持点击发音与口型提示
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { speak } from '../../lib/audio';
import { track } from '../../lib/analytics';
import { FINAL_GROUPS, type PinyinItem } from './pinyinData';

const TOTAL = 24; // 6 单 + 9 复 + 9 鼻

const GROUP_COLORS: Record<string, { bg: string; border: string; accent: string; pill: string }> = {
  单韵母: { bg: '#E3F2FD', border: 'rgba(33,150,243,0.25)', accent: '#1565C0', pill: '#BBDEFB' },
  复韵母: { bg: '#F3E5F5', border: 'rgba(156,39,176,0.22)', accent: '#7B1FA2', pill: '#E1BEE7' },
  鼻韵母: { bg: '#E8F5E9', border: 'rgba(76,175,80,0.22)', accent: '#2E7D32', pill: '#C8E6C9' },
};

function FinalCard({
  item,
  index,
  isActive,
  accent,
  onClick,
}: {
  item: PinyinItem;
  index: number;
  isActive: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ scale: 1.07, y: -4 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      style={{
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        background: 'transparent',
        width: '100%',
      }}
    >
      <div
        style={{
          background: isActive ? accent : '#FFFFFF',
          border: isActive ? `2px solid ${accent}` : `2px solid ${accent}44`,
          borderRadius: '18px',
          padding: '14px 8px',
          textAlign: 'center',
          boxShadow: isActive ? `0 8px 20px ${accent}44` : '0 3px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          style={{
            fontSize: '30px',
            fontWeight: 900,
            color: isActive ? '#FFFFFF' : accent,
            fontFamily: 'monospace',
            lineHeight: 1.1,
          }}
        >
          {item.pinyin}
        </div>
        <div style={{ fontSize: '20px', margin: '5px 0 2px' }}>{item.emoji}</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: isActive ? '#fff' : '#6D4C41' }}>
          {item.hanzi}
        </div>
      </div>
    </motion.button>
  );
}

function DetailPanel({
  item,
  accent,
  pillColor,
  onClose,
}: {
  item: PinyinItem;
  accent: string;
  pillColor: string;
  onClose: () => void;
}) {
  const [speaking, setSpeaking] = useState(false);

  const doSpeak = useCallback(() => {
    setSpeaking(true);
    speak(item.pinyin);
    setTimeout(() => setSpeaking(false), 900);
  }, [item.pinyin]);

  return (
    <motion.div
      key={item.pinyin}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.28 }}
      style={{
        background: '#FFFFFF',
        borderRadius: '26px',
        padding: '24px',
        marginBottom: '24px',
        border: `2px solid ${accent}44`,
        boxShadow: `0 16px 36px ${accent}22`,
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center', minWidth: '70px' }}>
        <div style={{ fontSize: '64px', fontWeight: 900, color: accent, fontFamily: 'monospace', lineHeight: 1 }}>
          {item.pinyin}
        </div>
        <div style={{ fontSize: '28px', marginTop: '6px' }}>{item.emoji}</div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#5D4037', marginTop: '4px' }}>{item.hanzi}</div>
      </div>

      <div style={{ flex: 1, minWidth: '160px' }}>
        {item.tip && (
          <div
            style={{
              background: pillColor,
              borderRadius: '14px',
              padding: '10px 14px',
              color: accent,
              fontWeight: 700,
              fontSize: '15px',
              marginBottom: '14px',
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
          onClick={doSpeak}
          style={{
            padding: '10px 22px',
            borderRadius: '14px',
            border: 'none',
            background: speaking ? accent : `${accent}18`,
            color: speaking ? '#FFFFFF' : accent,
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

// ── 主组件 ───────────────────────────────────────────────────
export default function PinyinFinalsLearn() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-finals-learn');
  const [activeItem, setActiveItem] = useState<PinyinItem | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>('单韵母');
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());

  const handleCardClick = useCallback(
    (item: PinyinItem, group: string) => {
      const opening = activeItem?.pinyin !== item.pinyin;
      setActiveItem(opening ? item : null);
      setActiveGroup(group);
      if (opening) {
        speak(item.pinyin);
        setLearnedSet((prev) => {
          const next = new Set(prev);
          next.add(item.pinyin);
          return next;
        });
        track('pinyin_final_view', { pinyin: item.pinyin });
      }
    },
    [activeItem],
  );

  const handleBack = useCallback(() => navigate('/games/pinyin'), [navigate]);

  const handleComplete = useCallback(() => {
    handleGameComplete({ stars: 3, correct: learnedSet.size, total: TOTAL });
    track('pinyin_finals_learn_complete', { learned: learnedSet.size });
  }, [handleGameComplete, learnedSet.size]);

  const palette = GROUP_COLORS[activeGroup] ?? GROUP_COLORS['单韵母'];

  return (
    <PageLayout maxWidth="900px">
      <GamePageHeader
        title="韵母学习"
        icon="🎵"
        subtitle="单韵母 · 复韵母 · 鼻韵母，逐一探索，听发音记口型"
        gradient="linear-gradient(135deg, #9C27B0, #CE93D8)"
        progressColor="#9C27B0"
        currentTask={learnedSet.size}
        totalTasks={TOTAL}
        onBack={handleBack}
      />

      <div
        style={{
          textAlign: 'center',
          marginBottom: '18px',
          fontSize: '15px',
          fontWeight: 700,
          color: '#8D6E63',
        }}
      >
        已探索 {learnedSet.size} / {TOTAL} 个韵母
      </div>

      <AnimatePresence mode="wait">
        {activeItem && (
          <DetailPanel
            key={activeItem.pinyin}
            item={activeItem}
            accent={palette.accent}
            pillColor={palette.pill}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '32px' }}>
        {FINAL_GROUPS.map((group) => {
          const colors = GROUP_COLORS[group.label];
          return (
            <div
              key={group.label}
              style={{
                background: colors.bg,
                borderRadius: '24px',
                padding: '20px',
                border: `2px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 900,
                  color: colors.accent,
                  marginBottom: '14px',
                  padding: '5px 14px',
                  background: colors.pill,
                  borderRadius: '999px',
                  display: 'inline-block',
                }}
              >
                {group.label}（{group.items.length}个）
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))',
                  gap: '10px',
                }}
              >
                {group.items.map((item, idx) => (
                  <FinalCard
                    key={item.pinyin}
                    item={item}
                    index={idx}
                    isActive={activeItem?.pinyin === item.pinyin}
                    accent={colors.accent}
                    onClick={() => handleCardClick(item, group.label)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {learnedSet.size >= 10 && (
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
              background: 'linear-gradient(135deg, #9C27B0, #CE93D8)',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(156,39,176,0.35)',
            }}
          >
            🌟 完成学习！({learnedSet.size}/{TOTAL} 已探索)
          </motion.button>
        </motion.div>
      )}
    </PageLayout>
  );
}
