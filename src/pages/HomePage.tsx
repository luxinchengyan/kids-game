import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameGrid } from '../components/GameNavigation/GameGrid';
import {
  getThemeHubs,
  getRecommendedThemeHub,
  type GameConfig,
} from '../games/registry';
import { useRewardStore } from '../stores/useRewardStore';
import { useUserStore } from '../stores/useUserStore';
import { track } from '../lib/analytics';
import { getEffectiveChildAge } from '../lib/learnerProfile';
import { ShipLogo } from '../components/ShipLogo';
import { ParentalGate } from '../components/ParentZone/ParentalGate';
import { CompanionBubble } from '../components/CompanionBubble';
import { ChildSwitcher } from '../components/ChildSwitcher';

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
        background: 'linear-gradient(180deg, #E3F2FD 0%, #FFFFFF 100%)',
      }}
    >
      {/* Floating clouds/shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${100 + i * 40}px`,
            height: `${60 + i * 20}px`,
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '100px',
            left: `${-10 + i * 15}%`,
            top: `${10 + (i % 4) * 20}%`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.02)',
          }}
          animate={{
            x: [-20, 20, -20],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const currentChild = useUserStore((s) => s.currentChild);
  const { stars, level, streakDays } = useRewardStore((s) => ({
    stars: s.rewards.stars,
    level: s.rewards.level,
    streakDays: s.rewards.streakDays,
  }));

  const [showParentGate, setShowParentGate] = useState(false);
  const childAge = getEffectiveChildAge(currentChild);
  const recommendedHub = useMemo(() => getRecommendedThemeHub(childAge), [childAge]);

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
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
        padding: '0',
        overflowX: 'hidden',
      }}
    >
      <AnimatedBackground />
      {showParentGate && (
        <ParentalGate 
          onSuccess={() => { setShowParentGate(false); navigate('/parent'); }}
          onCancel={() => setShowParentGate(false)}
        />
      )}

      {/* Top Header - Child Centric */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '24px',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            border: '3px solid #FF9800',
          }}>
            ✨
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#3E2723', margin: 0 }}>
              {currentChild?.nickname || '小朋友'}
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#FF9800' }}>⭐ {stars}</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#2196F3' }}>Lv.{level}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowParentGate(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '16px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 800,
            color: '#757575',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          ⚙️ 家长中心
        </button>
      </div>
      <div style={{ position: 'relative', zIndex: 10, padding: '0 24px' }}>
        <ChildSwitcher compact />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px' }}>
        
        {/* Hero Section - The Ship */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            padding: '40px 0',
            position: 'relative',
          }}
        >
          <div style={{ marginBottom: '40px' }}>
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              <ShipLogo size={160} />
            </motion.div>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 900, 
              color: '#3E2723', 
              marginTop: '24px',
              textShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              童梦神舟
            </h1>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
            <CompanionBubble 
              companionId="aisha" 
              message={`船长你好！今天我们要去探索${recommendedHub?.name || '新世界'}吗？`}
              visible={true}
            />
          </div>

          {/* Main Action Button */}
          {recommendedHub && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGameSelect(recommendedHub)}
              style={{
                background: 'linear-gradient(135deg, #FF9800, #F57C00)',
                border: 'none',
                borderRadius: '32px',
                padding: '24px 64px',
                fontSize: '28px',
                fontWeight: 900,
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 16px 32px rgba(255,152,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                margin: '0 auto',
              }}
            >
              <span>🚀 开始今日任务</span>
            </motion.button>
          )}
        </motion.section>

        {/* Adventure Islands Grid */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 900, 
            color: '#3E2723', 
            textAlign: 'center',
            marginBottom: '40px' 
          }}>
            🗺️ 探索学习岛屿
          </h2>
          <GameGrid games={getThemeHubs()} onGameSelect={handleGameSelect} />
        </div>
      </div>

      {/* Footer info */}
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#BDBDBD',
        fontSize: '14px',
        fontWeight: 600,
      }}>
        连续学习第 {streakDays} 天 · 船长已就绪
      </div>
    </div>
  );
}
