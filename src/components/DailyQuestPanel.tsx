/**
 * DailyQuestPanel — 每日任务面板（紧凑横排版）
 * 以单行横排展示今日任务，节省首页垂直空间
 */
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDailyQuestStore, type DailyQuest } from '../stores/useDailyQuestStore';

function getQuestActionLabel(quest: DailyQuest) {
  if (quest.completed) {
    return '已完成';
  }

  switch (quest.type) {
    case 'learning':
      return '去练习';
    case 'accuracy':
      return '去挑战';
    case 'explore':
      return '去探索';
    default:
      return '去完成';
  }
}

function QuestChip({
  quest,
  onAction,
}: {
  quest: DailyQuest;
  onAction?: (q: DailyQuest) => void;
}) {
  const pct = Math.min((quest.current / quest.target) * 100, 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={quest.completed ? {} : { scale: 1.02, y: -2 }}
      style={{
        flex: '1 1 0',
        minWidth: '220px',
        background: quest.completed
          ? 'linear-gradient(135deg, rgba(232,245,233,0.98), rgba(255,255,255,0.95))'
          : 'rgba(255,255,255,0.92)',
        borderRadius: '16px',
        padding: '10px 12px',
        border: quest.completed
          ? '1.5px solid rgba(76,175,80,0.4)'
          : '1.5px solid rgba(255,183,77,0.3)',
        cursor: quest.completed ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflow: 'hidden',
      }}
    >
      <motion.span
        animate={quest.completed ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.4 }}
        style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1 }}
      >
        {quest.completed ? '✅' : quest.icon}
      </motion.span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: quest.completed ? '#2E7D32' : '#3E2723',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '4px',
          }}
        >
          {quest.title}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#8D6E63',
            marginBottom: '6px',
            lineHeight: 1.5,
          }}
        >
          {quest.description}
        </div>
        <div
          style={{
            height: '4px',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: quest.completed
                ? 'linear-gradient(90deg,#4CAF50,#81C784)'
                : 'linear-gradient(90deg,#FF9800,#FFB74D)',
              borderRadius: '999px',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: quest.completed ? '#4CAF50' : '#E65100',
          }}
        >
          {quest.current}/{quest.target}
        </span>
        <button
          type="button"
          onClick={() => !quest.completed && onAction?.(quest)}
          disabled={quest.completed || !onAction}
          style={{
            minHeight: '32px',
            padding: '0 10px',
            borderRadius: '999px',
            border: 'none',
            background: quest.completed ? '#E8F5E9' : 'linear-gradient(135deg, #FF9800, #FFB74D)',
            color: quest.completed ? '#2E7D32' : '#FFFFFF',
            fontSize: '11px',
            fontWeight: 900,
            cursor: quest.completed || !onAction ? 'default' : 'pointer',
            opacity: onAction || quest.completed ? 1 : 0.7,
          }}
        >
          {getQuestActionLabel(quest)}
        </button>
      </div>
    </motion.div>
  );
}

export function DailyQuestPanel({ onQuestAction, style }: { onQuestAction?: (quest: DailyQuest) => void; style?: React.CSSProperties }) {
  const { quests, totalCompletedToday, initOrReset } = useDailyQuestStore();

  useEffect(() => {
    initOrReset();
  }, [initOrReset]);

  const allDone = quests.every((q) => q.completed);
  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      style={{
        background: allDone
          ? 'linear-gradient(135deg, rgba(232,245,233,0.97), rgba(255,255,255,0.97))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(255,248,225,0.97))',
        borderRadius: '20px',
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        border: allDone ? '1.5px solid rgba(76,175,80,0.3)' : '1.5px solid rgba(255,183,77,0.2)',
        marginBottom: 'var(--spacing-lg)',
        ...style,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '18px' }}>🎯</span>
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#3E2723' }}>今日任务</span>
          <span style={{ fontSize: '11px', color: '#8D6E63', fontWeight: 600 }}>· 真实进度自动结算</span>
        </div>
        <AnimatePresence>
          {allDone ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: '#E8F5E9',
                color: '#2E7D32',
                borderRadius: '999px',
                padding: '3px 10px',
                fontSize: '12px',
                fontWeight: 900,
              }}
            >
              🎉 全部完成！
            </motion.span>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
              <span
                style={{
                  background: '#FFF3E0',
                  color: '#E65100',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                {completedCount}/{quests.length}
              </span>
              <span
                style={{
                  background: '#F5F7FA',
                  color: '#546E7A',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                今日奖励 {totalCompletedToday}
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {quests.map((quest) => (
          <QuestChip key={quest.id} quest={quest} onAction={onQuestAction} />
        ))}
      </div>
    </motion.section>
  );
}
