/**
 * ShareCard 分享卡片组件
 * 支持：今日学习卡、连续打卡里程碑卡、成就解锁卡
 * 使用原生 Web Share API 或剪贴板降级
 */
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '../lib/analytics';

export type ShareCardType = 'daily' | 'streak' | 'achievement';

interface ShareCardProps {
  type: ShareCardType;
  childNickname: string;
  stars: number;
  level: number;
  streakDays: number;
  /** 今日完成的学习次数（daily 卡用） */
  todayLearningCount?: number;
  /** 成就名称（achievement 卡用） */
  achievementName?: string;
  /** 成就图标 */
  achievementIcon?: string;
  onClose?: () => void;
}

const CARD_CONFIGS: Record<ShareCardType, { bg: string; accent: string; title: (p: ShareCardProps) => string; emoji: string }> = {
  daily: {
    bg: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 50%, #FFE0B2 100%)',
    accent: '#FF9800',
    emoji: '🌟',
    title: (p) => `${p.childNickname}今天完成了 ${p.todayLearningCount ?? 1} 次学习！`,
  },
  streak: {
    bg: 'linear-gradient(135deg, #FFF3E0 0%, #FCE4EC 50%, #F3E5F5 100%)',
    accent: '#E91E63',
    emoji: '🔥',
    title: (p) => `${p.childNickname}已连续学习 ${p.streakDays} 天！`,
  },
  achievement: {
    bg: 'linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 50%, #F3E5F5 100%)',
    accent: '#4CAF50',
    emoji: '🏆',
    title: (p) => `${p.childNickname}解锁了「${p.achievementName ?? '新成就'}」！`,
  },
};

/** 构建分享文案（纯文本，用于剪贴板降级） */
function buildShareText(props: ShareCardProps): string {
  const cfg = CARD_CONFIGS[props.type];
  const titleText = cfg.title(props);
  return `【童梦神舟】${cfg.emoji} ${titleText} 目前 ⭐${props.stars} 颗星 · Lv.${props.level} · 连续 ${props.streakDays} 天。和我们一起玩中学！`;
}

export function ShareCard(props: ShareCardProps) {
  const { type, childNickname, stars, level, streakDays, onClose } = props;
  const cfg = CARD_CONFIGS[type];
  const [status, setStatus] = useState<'idle' | 'sharing' | 'done' | 'error'>('idle');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    setStatus('sharing');
    const text = buildShareText(props);
    track('share_triggered', { shareType: type });

    try {
      if (navigator.share) {
        await navigator.share({
          title: '童梦神舟 · 学习成果',
          text,
          url: window.location.href,
        });
        track('share_completed', { shareType: type, channel: 'native' });
      } else {
        await navigator.clipboard.writeText(text);
        track('share_completed', { shareType: type, channel: 'clipboard' });
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }

    window.setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 30 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(0,0,0,0.45)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        ref={cardRef}
        style={{
          background: cfg.bg,
          borderRadius: '32px',
          padding: '32px 28px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
          maxWidth: '360px',
          width: '100%',
          border: `3px solid ${cfg.accent}40`,
          textAlign: 'center',
        }}
      >
        {/* Big emoji */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -8, 8, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '64px', marginBottom: '12px', lineHeight: 1 }}
        >
          {cfg.emoji}
        </motion.div>

        {/* Title */}
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#3E2723', marginBottom: '8px', lineHeight: 1.35 }}>
          {cfg.title(props)}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            margin: '18px 0',
            padding: '14px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '20px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: cfg.accent }}>⭐ {stars}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#8D6E63' }}>星星</div>
          </div>
          <div style={{ width: '1px', background: `${cfg.accent}30` }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#2196F3' }}>Lv.{level}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#8D6E63' }}>等级</div>
          </div>
          <div style={{ width: '1px', background: `${cfg.accent}30` }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#4CAF50' }}>🔥{streakDays}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#8D6E63' }}>连续天</div>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 600, marginBottom: '20px' }}>
          「童梦神舟 · 玩中学，学中乐，乐中长」
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleShare}
            disabled={status === 'sharing'}
            style={{
              flex: 1,
              minHeight: '52px',
              fontSize: '16px',
              fontWeight: 800,
              border: 'none',
              borderRadius: '20px',
              cursor: status === 'sharing' ? 'not-allowed' : 'pointer',
              background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}CC)`,
              color: '#FFF',
              boxShadow: `0 4px 14px ${cfg.accent}50`,
            }}
          >
            {status === 'idle' && '📤 分享给朋友'}
            {status === 'sharing' && '分享中…'}
            {status === 'done' && '✅ 已分享！'}
            {status === 'error' && '已复制文案'}
          </motion.button>

          {onClose && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              style={{
                minHeight: '52px',
                padding: '0 18px',
                fontSize: '14px',
                fontWeight: 700,
                border: `2px solid ${cfg.accent}40`,
                borderRadius: '20px',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.8)',
                color: '#6D4C41',
              }}
            >
              关闭
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** 触发器按钮：点击后显示分享卡片 */
interface ShareTriggerProps extends Omit<ShareCardProps, 'onClose'> {
  label?: string;
  buttonStyle?: React.CSSProperties;
}

export function ShareTrigger({ label = '分享进度', buttonStyle, ...cardProps }: ShareTriggerProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setShow(true);
          track('share_card_open', { type: cardProps.type });
        }}
        style={{
          minHeight: '44px',
          padding: '10px 20px',
          fontSize: '15px',
          fontWeight: 700,
          border: '2px solid rgba(255,152,0,0.3)',
          borderRadius: '16px',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.8)',
          color: '#E65100',
          ...buttonStyle,
        }}
      >
        📤 {label}
      </motion.button>

      <AnimatePresence>
        {show && (
          <ShareCard
            {...cardProps}
            onClose={() => setShow(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
