import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { GameGrid } from '../components/GameNavigation/GameGrid';
import { gameRegistry } from '../games/registry';
import { getThemeHubs } from '../games/registry';
import { useRewardStore } from '../stores/useRewardStore';
import { useUserStore } from '../stores/useUserStore';
import { track } from '../lib/analytics';

// Animated background component
function AnimatedBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Floating shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            background: `rgba(${255 - i * 30}, ${150 + i * 20}, ${100 + i * 30}, 0.1)`,
            borderRadius: '50%',
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Compact user stats bar
function StatsBar() {
  const currentChild = useUserStore((s) => s.currentChild);
  const { stars, level, streakDays } = useRewardStore((s) => ({
    stars: s.rewards.stars,
    level: s.rewards.level,
    streakDays: s.rewards.streakDays,
  }));

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--spacing-md)',
        maxWidth: '800px',
        margin: '0 auto var(--spacing-xl)',
      }}
    >
      <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>
        👋 {currentChild?.nickname || '小朋友'}
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 800,
              color: 'var(--color-primary-1)',
            }}
          >
            ⭐ {stars}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>星星</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 800,
              color: 'var(--color-primary-2)',
            }}
          >
            Lv.{level}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>等级</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 800,
              color: 'var(--color-primary-3)',
            }}
          >
            🔥 {streakDays}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>连续天数</div>
        </div>
      </div>
    </motion.div>
  );
}

// Quick action buttons
function QuickActions() {
  const addStars = useRewardStore((s) => s.addStars);
  const checkIn = useRewardStore((s) => s.checkIn);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      style={{
        display: 'flex',
        gap: 'var(--spacing-md)',
        justifyContent: 'center',
        marginBottom: 'var(--spacing-xl)',
      }}
    >
      <motion.button
        onClick={() => addStars(1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          minHeight: '64px',
          fontSize: '20px',
          padding: '16px 32px',
          background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
          color: '#FFFFFF',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        +1 ⭐
      </motion.button>
      <motion.button
        onClick={() => {
          track('check_in');
          checkIn();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          minHeight: '64px',
          fontSize: '20px',
          padding: '16px 32px',
          background: 'linear-gradient(135deg, #4CAF50, #81C784)',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
          color: '#FFFFFF',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        每日签到
      </motion.button>
    </motion.div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  const handleGameSelect = useCallback(
    (game: (typeof gameRegistry)[0]) => {
      track('game_select', { gameId: game.id, gameName: game.name });
      navigate(game.path);
    },
    [navigate]
  );

  return (
    <div
      data-testid="home"
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        padding: 'var(--spacing-xl) var(--spacing-md)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}
        >
          <motion.h1
            style={{
              fontSize: 'var(--font-size-6xl)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FF9800, #2196F3, #4CAF50, #9C27B0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--spacing-sm)',
              lineHeight: 1.2,
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            🌈 童梦飞船
          </motion.h1>
          <p
            style={{
              fontSize: 'var(--font-size-xl)',
              color: 'var(--color-text-secondary)',
              fontWeight: 600,
            }}
          >
            开启你的学习冒险之旅！✨
          </p>
        </motion.header>

        {/* Stats Bar */}
        <StatsBar />

        {/* Quick Actions */}
        <QuickActions />

        {/* Game Grid */}
        <GameGrid games={getThemeHubs()} onGameSelect={handleGameSelect} />
      </div>
    </div>
  );
}
