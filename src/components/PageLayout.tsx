/**
 * 统一页面布局组件
 * 提供动态背景、全屏包裹、居中内容容器
 * 用于保证全站风格一致
 */
import type { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAgeRangeLabel,
  getGameByPath,
  getGameRouteContext,
} from '../games/registry';

// 动态背景 - 与首页保持一致
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

function JourneyBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent';
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '999px',
        padding: '6px 10px',
        background: tone === 'accent' ? '#FFF3E0' : '#F5F7FA',
        color: tone === 'accent' ? '#E65100' : '#5D4037',
        fontSize: '12px',
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}

function LearningJourneyDock() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentGame = getGameByPath(location.pathname);

  if (!currentGame) {
    return null;
  }

  const routeContext = getGameRouteContext(currentGame.id);
  const meta = currentGame.learningPath;

  if (!meta || !routeContext) {
    return null;
  }

  const progressLabel = currentGame.isThemeHub
    ? `共 ${routeContext.total} 个推荐关卡`
    : `第 ${routeContext.index + 1} / ${routeContext.total} 关`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        marginTop: '24px',
        background: 'rgba(255, 255, 255, 0.94)',
        borderRadius: '24px',
        padding: '20px',
        border: '2px solid #FFE0B2',
        boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}
      >
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            <JourneyBadge tone="accent">{meta.levelLabel}</JourneyBadge>
            <JourneyBadge>适龄 {getAgeRangeLabel(currentGame)}</JourneyBadge>
            <JourneyBadge>{meta.mapZone}</JourneyBadge>
            <JourneyBadge>{progressLabel}</JourneyBadge>
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', color: '#3E2723' }}>
            {currentGame.isThemeHub ? `🗺️ ${currentGame.name}学习地图` : `🧭 ${currentGame.name}路线导航`}
          </h3>
          <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>
            {meta.learningGoal}
          </p>
          <p style={{ margin: 0, color: '#8D6E63', fontWeight: 600, lineHeight: 1.6 }}>
            考察范围：{meta.assessmentScope.join(' / ')} · 教学策略：{meta.pedagogyTip}
          </p>
        </div>

        <div style={{ minWidth: '220px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#8D6E63', marginBottom: '8px' }}>
            核心能力
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {meta.skillFocus.map((item) => (
              <JourneyBadge key={item}>{item}</JourneyBadge>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          style={{
            minHeight: '48px',
            padding: '12px 18px',
            borderRadius: '16px',
            border: 'none',
            background: '#ECEFF1',
            color: '#37474F',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          返回世界地图
        </motion.button>
        {routeContext.themeHub && !currentGame.isThemeHub && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(routeContext.themeHub!.path)}
            style={{
              minHeight: '48px',
              padding: '12px 18px',
              borderRadius: '16px',
              border: 'none',
              background: '#FFF8E1',
              color: '#EF6C00',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            查看主题地图
          </motion.button>
        )}
        {routeContext.previous && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(routeContext.previous!.path)}
            style={{
              minHeight: '48px',
              padding: '12px 18px',
              borderRadius: '16px',
              border: 'none',
              background: '#E8F5E9',
              color: '#2E7D32',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            上一关：{routeContext.previous.name}
          </motion.button>
        )}
        {routeContext.next && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(routeContext.next!.path)}
            style={{
              minHeight: '48px',
              padding: '12px 18px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
              color: '#FFFFFF',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 8px 18px rgba(255, 152, 0, 0.24)',
            }}
          >
            {currentGame.isThemeHub ? `开始第 1 关：${routeContext.next.name}` : `下一关：${routeContext.next.name}`}
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  /** 内容区最大宽度，默认 800px */
  maxWidth?: string;
  style?: CSSProperties;
}

/**
 * 统一页面包裹组件：
 * - 全屏暖色背景
 * - 动态浮动气泡背景（与首页一致）
 * - 内容区居中 + 最大宽度
 */
export function PageLayout({ children, maxWidth = '800px', style }: PageLayoutProps) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        padding: 'var(--spacing-xl) var(--spacing-md)',
        backgroundColor: 'var(--color-background)',
        ...style,
      }}
    >
      <AnimatedBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {children}
        <LearningJourneyDock />
      </div>
    </div>
  );
}

// =========================================
// 游戏页通用头部组件
// =========================================

interface GamePageHeaderProps {
  /** 游戏标题 */
  title: string;
  /** 标题图标 emoji */
  icon?: string;
  /** 副标题 */
  subtitle?: string;
  /** 渐变色，如 'linear-gradient(135deg, #FF9800, #FFB74D)' */
  gradient: string;
  /** 当前任务（1-indexed） */
  currentTask?: number;
  /** 总任务数 */
  totalTasks?: number;
  /** 进度条颜色 */
  progressColor?: string;
  /** 点击返回回调 */
  onBack: () => void;
  /** 返回按钮文字 */
  backLabel?: string;
}

/**
 * 游戏页面统一头部：
 * - 返回按钮
 * - 渐变标题
 * - 可选任务进度条
 */
export function GamePageHeader({
  title,
  icon,
  subtitle,
  gradient,
  currentTask,
  totalTasks,
  progressColor = 'var(--color-primary-1)',
  onBack,
  backLabel = '← 返回首页',
}: GamePageHeaderProps) {
  const showProgress = currentTask !== undefined && totalTasks !== undefined && totalTasks > 0;
  const progress = showProgress ? ((currentTask - 1) / totalTasks) * 100 : 0;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 'var(--spacing-xl)' }}
    >
      {/* 返回按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          minHeight: '48px',
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
          border: '2px solid var(--color-primary-2)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-primary-2-dark)',
          fontSize: 'var(--font-size-md)',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: 'var(--spacing-lg)',
          boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)',
        }}
      >
        {backLabel}
      </motion.button>

      {/* 标题区 */}
      <div style={{ textAlign: 'center' }}>
        <motion.h1
          style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 900,
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: subtitle ? 'var(--spacing-sm)' : 'var(--spacing-md)',
            lineHeight: 1.2,
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          {icon && `${icon} `}{title}
        </motion.h1>
        {subtitle && (
          <p
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              fontWeight: 600,
              marginBottom: 'var(--spacing-md)',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* 进度条 */}
      {showProgress && (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spacing-xs)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 700,
                color: 'var(--color-text-secondary)',
              }}
            >
              任务进度
            </span>
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 800,
                color: progressColor,
              }}
            >
              {currentTask} / {totalTasks}
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '12px',
              background: 'var(--color-neutral-2)',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: progressColor,
                borderRadius: '6px',
                boxShadow: `0 2px 6px ${progressColor}60`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          {/* 步骤点 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'var(--spacing-sm)',
              padding: '0 2px',
            }}
          >
            {Array.from({ length: totalTasks }, (_, i) => (
              <div
                key={i}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: i < currentTask - 1
                    ? progressColor
                    : i === currentTask - 1
                    ? 'white'
                    : 'var(--color-neutral-2)',
                  border: i === currentTask - 1
                    ? `3px solid ${progressColor}`
                    : 'none',
                  boxShadow: i < currentTask
                    ? `0 2px 4px ${progressColor}40`
                    : 'none',
                  transition: 'all 0.3s ease',
                  fontSize: i < currentTask - 1 ? '10px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {i < currentTask - 1 ? '✓' : ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
