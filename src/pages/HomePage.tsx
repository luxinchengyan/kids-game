import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GameGrid } from '../components/GameNavigation/GameGrid';
import {
  buildGrowthInsights,
  buildLearningSystemSnapshot,
  buildStudyCalendar,
  getEncyclopediaTopics,
  getExpandedSubjects,
  getGrowthStages,
  getJourneyStage,
} from '../data/homeLearningJourney';
import {
  getAgeRangeLabel,
  getGamesByTheme,
  getLearningMap,
  getRecommendedThemeHub,
  getThemeHubs,
  type GameConfig,
} from '../games/registry';
import { getLearningContentSummary, getWeakKnowledgePoints } from '../data/learningContent';
import { useGameStore } from '../stores/useGameStore';
import { useRewardStore } from '../stores/useRewardStore';
import { useUserStore } from '../stores/useUserStore';
import { track } from '../lib/analytics';
import { loadGameProgress } from '../lib/gameHelpers';
import { DailyQuestPanel } from '../components/DailyQuestPanel';
import { ShareTrigger } from '../components/ShareCard';
import { StreakMilestoneCelebration } from '../components/StreakMilestoneCelebration';
import { ShipLogo } from '../components/ShipLogo';

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
// Combined stats + quick actions bar
function StatsBar() {
  const currentChild = useUserStore((s) => s.currentChild);
  const addStars = useRewardStore((s) => s.addStars);
  const checkIn = useRewardStore((s) => s.checkIn);
  const clearPendingStreakMilestone = useRewardStore((s) => s.clearPendingStreakMilestone);
  const pendingMilestone = useRewardStore((s) => s.pendingStreakMilestone);
  const { stars, level, streakDays } = useRewardStore((s) => ({
    stars: s.rewards.stars,
    level: s.rewards.level,
    streakDays: s.rewards.streakDays,
  }));

  return (
    <>
      <StreakMilestoneCelebration
        milestone={pendingMilestone}
        onClose={clearPendingStreakMilestone}
      />
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          padding: '10px 16px',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: 0,
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {/* Left: greeting + stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
            👋 {currentChild?.nickname || '小朋友'}
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-primary-1)', whiteSpace: 'nowrap' }}>⭐ {stars} <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>星星</span></span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-primary-2)', whiteSpace: 'nowrap' }}>Lv.{level} <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>等级</span></span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-primary-3)', whiteSpace: 'nowrap' }}>🔥 {streakDays} <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>连续</span></span>
          </div>
        </div>

        {/* Right: action buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.button
            onClick={() => addStars(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              height: '36px',
              fontSize: '13px',
              padding: '0 14px',
              background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
              border: 'none',
              borderRadius: '18px',
              boxShadow: '0 3px 8px rgba(255,152,0,0.35)',
              color: '#FFFFFF',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            +1 ⭐
          </motion.button>
          <motion.button
            onClick={() => { track('check_in'); checkIn(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              height: '36px',
              fontSize: '13px',
              padding: '0 14px',
              background: 'linear-gradient(135deg, #4CAF50, #81C784)',
              border: 'none',
              borderRadius: '18px',
              boxShadow: '0 3px 8px rgba(76,175,80,0.35)',
              color: '#FFFFFF',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            每日签到 🔥
          </motion.button>
          <div style={{ display: 'flex' }}>
            <ShareTrigger
              type="daily"
              label="分享进度"
              childNickname={currentChild?.nickname ?? '小朋友'}
              stars={stars}
              level={level}
              streakDays={streakDays}
              todayLearningCount={1}
              buttonStyle={{ minHeight: '36px', padding: '0 14px', fontSize: '13px', borderRadius: '18px' }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

function QuickActions() { return null; }

function PrincipleCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        borderRadius: '22px',
        padding: '20px',
        boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
        border: '2px solid rgba(255, 183, 77, 0.28)',
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '20px', fontWeight: 900, color: '#3E2723', marginBottom: '8px' }}>{title}</div>
      <p style={{ margin: 0, lineHeight: 1.7, fontWeight: 600, color: '#6D4C41' }}>{description}</p>
    </motion.div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <h2 style={{ fontSize: 'var(--font-size-4xl)', margin: '0 0 10px 0', color: '#3E2723' }}>{title}</h2>
      <p style={{ margin: 0, color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>{subtitle}</p>
    </div>
  );
}

function Pill({ children, background, color }: { children: string; background: string; color: string }) {
  return (
    <span
      style={{
        background,
        color,
        borderRadius: '999px',
        padding: '6px 10px',
        fontSize: '12px',
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}

function StageCard({
  title,
  ageRange,
  headline,
  focusModules,
  milestone,
  isActive,
}: {
  title: string;
  ageRange: string;
  headline: string;
  focusModules: string[];
  milestone: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(255,248,225,0.98), rgba(255,255,255,0.96))'
          : 'rgba(255,255,255,0.92)',
        borderRadius: '24px',
        padding: '22px',
        border: isActive ? '2px solid rgba(255,152,0,0.35)' : '2px solid rgba(33,150,243,0.12)',
        boxShadow: isActive ? '0 14px 28px rgba(255,152,0,0.12)' : '0 10px 20px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#3E2723' }}>{title}</div>
        <Pill background={isActive ? '#FFF3E0' : '#F3F7FF'} color={isActive ? '#E65100' : '#1565C0'}>
          {ageRange}
        </Pill>
      </div>
      <p style={{ margin: '0 0 12px 0', color: '#6D4C41', fontWeight: 700, lineHeight: 1.7 }}>{headline}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {focusModules.map((focus) => (
          <Pill key={focus} background="#FFFFFF" color="#546E7A">
            {focus}
          </Pill>
        ))}
      </div>
      <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>
        阶段里程碑：{milestone}
      </div>
    </motion.div>
  );
}

function CalendarDayCard({
  label,
  weekday,
  title,
  focus,
  mission,
  checkpoint,
  completed,
  isToday,
  energy,
}: {
  label: string;
  weekday: string;
  title: string;
  focus: string;
  mission: string;
  checkpoint: string;
  completed: boolean;
  isToday: boolean;
  energy: 'warmup' | 'focus' | 'explore';
}) {
  const accent = energy === 'warmup' ? '#4CAF50' : energy === 'focus' ? '#FF9800' : '#9C27B0';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        background: completed
          ? 'linear-gradient(135deg, rgba(232,245,233,0.95), rgba(255,255,255,0.98))'
          : 'rgba(255,255,255,0.94)',
        borderRadius: '24px',
        padding: '20px',
        border: isToday
          ? `2px solid ${accent}`
          : completed
            ? '2px solid rgba(76,175,80,0.22)'
            : '2px solid rgba(33,150,243,0.12)',
        boxShadow: isToday ? `0 12px 24px ${accent}24` : '0 10px 20px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: accent }}>
            {weekday} · {label}
          </div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#3E2723', marginTop: '6px' }}>{title}</div>
        </div>
        <Pill background={completed ? '#E8F5E9' : '#F5F7FA'} color={completed ? '#2E7D32' : '#546E7A'}>
          {completed ? '已记录' : isToday ? '今天' : '计划中'}
        </Pill>
      </div>
      <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 800, lineHeight: 1.7, marginBottom: '10px' }}>
        聚焦能力：{focus}
      </div>
      <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>{mission}</p>
      <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>{checkpoint}</div>
    </motion.div>
  );
}

function SystemCard({
  title,
  problem,
  fix,
  metric,
  tone,
}: {
  title: string;
  problem: string;
  fix: string;
  metric: string;
  tone: 'warm' | 'focus' | 'alert' | 'explore';
}) {
  const accent =
    tone === 'warm' ? '#EF6C00' : tone === 'focus' ? '#1565C0' : tone === 'alert' ? '#C62828' : '#7B1FA2';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        background: 'rgba(255,255,255,0.94)',
        borderRadius: '24px',
        padding: '22px',
        border: `2px solid ${accent}22`,
        boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: 900, color: accent, marginBottom: '10px' }}>{title}</div>
      <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.75, marginBottom: '10px' }}>问题：{problem}</div>
      <div style={{ color: '#3E2723', fontWeight: 800, lineHeight: 1.8, marginBottom: '12px' }}>修复：{fix}</div>
      <Pill background="#F5F7FA" color={accent}>
        {metric}
      </Pill>
    </motion.div>
  );
}

function DailyPlanStepCard({
  title,
  summary,
  detail,
  stage,
}: {
  title: string;
  summary: string;
  detail: string;
  stage: 'warmup' | 'core' | 'review' | 'transfer';
}) {
  const accent =
    stage === 'warmup' ? '#4CAF50' : stage === 'core' ? '#FF9800' : stage === 'review' ? '#1565C0' : '#9C27B0';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        background: 'rgba(255,255,255,0.94)',
        borderRadius: '24px',
        padding: '22px',
        border: `2px solid ${accent}22`,
        boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 900, color: accent, marginBottom: '8px' }}>{title}</div>
      <div style={{ color: '#3E2723', fontWeight: 800, marginBottom: '8px' }}>{summary}</div>
      <div style={{ color: '#6D4C41', fontWeight: 600, lineHeight: 1.75 }}>{detail}</div>
    </motion.div>
  );
}

function SubjectCard({
  icon,
  title,
  summary,
  routeRole,
  skills,
  sampleTopics,
  inspiredBy,
  experimentCollections,
}: {
  icon: string;
  title: string;
  summary: string;
  routeRole: string;
  skills: string[];
  sampleTopics: string[];
  inspiredBy: string;
  experimentCollections?: {
    principle: string;
    description: string;
    marketInsight: string;
    experiments: string[];
    designPlan: {
      product: string;
      testing: string;
      engineering: string;
      ui: string;
      gameDesign: string;
    };
  }[];
}) {
  const experimentCount = experimentCollections?.reduce((sum, collection) => sum + collection.experiments.length, 0) ?? 0;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      style={{
        background: 'rgba(255,255,255,0.94)',
        borderRadius: '26px',
        padding: '22px',
        boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
        border: '2px solid rgba(156,39,176,0.12)',
      }}
    >
      <div style={{ fontSize: '34px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '22px', fontWeight: 900, color: '#3E2723', marginBottom: '10px' }}>{title}</div>
      <p style={{ margin: '0 0 12px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>{summary}</p>
      <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7, marginBottom: '12px' }}>
        路线作用：{routeRole}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {skills.map((skill) => (
          <Pill key={skill} background="#FFF8E1" color="#EF6C00">
            {skill}
          </Pill>
        ))}
      </div>
      <div style={{ fontSize: '13px', color: '#5D4037', fontWeight: 700, lineHeight: 1.7, marginBottom: '10px' }}>
        示例主题：{sampleTopics.join(' / ')}
      </div>
      {experimentCollections?.length ? (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(243,229,245,0.72), rgba(255,255,255,0.92))',
            borderRadius: '18px',
            padding: '14px',
            marginBottom: '10px',
          }}
        >
          <div style={{ fontSize: '13px', color: '#7B1FA2', fontWeight: 900, marginBottom: '8px' }}>
            已收录 {experimentCollections.length} 组原理 / {experimentCount} 个高频实验
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {experimentCollections.slice(0, 3).map((collection) => (
              <Pill key={collection.principle} background="#FFFFFF" color="#6A1B9A">
                {collection.principle}
              </Pill>
            ))}
          </div>
        </div>
      ) : null}
      <div style={{ fontSize: '12px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>{inspiredBy}</div>
    </motion.div>
  );
}

function EncyclopediaCard({
  subject,
  icon,
  title,
  question,
  answer,
  extensionPrompt,
  ageTag,
}: {
  subject: string;
  icon: string;
  title: string;
  question: string;
  answer: string;
  extensionPrompt: string;
  ageTag: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(243,247,255,0.96))',
        borderRadius: '24px',
        padding: '20px',
        border: '2px solid rgba(33,150,243,0.12)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#3E2723' }}>
          {icon} {title}
        </div>
        <Pill background="#E3F2FD" color="#1565C0">
          {subject} · {ageTag}
        </Pill>
      </div>
      <div style={{ fontSize: '14px', fontWeight: 900, color: '#8D6E63', marginBottom: '8px' }}>{question}</div>
      <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.75 }}>{answer}</p>
      <div style={{ fontSize: '13px', color: '#455A64', fontWeight: 700, lineHeight: 1.7 }}>
        延伸互动：{extensionPrompt}
      </div>
    </motion.article>
  );
}

function getThemeProgress(themeId: string) {
  const themeGames = getGamesByTheme(themeId);
  const playedCount = themeGames.filter((game) => {
    const progress = loadGameProgress(game.id);
    return Boolean(progress && progress.completedSessions > 0);
  }).length;
  const totalStars = themeGames.reduce((sum, game) => sum + (loadGameProgress(game.id)?.bestStars ?? 0), 0);

  return {
    totalGames: themeGames.length,
    playedCount,
    completionRate: themeGames.length > 0 ? Math.round((playedCount / themeGames.length) * 100) : 0,
    totalStars,
  };
}

function RotatingBanner({
  journeyStage,
  streakDays,
  growthInsights,
  worldCompletion,
  level,
  stars,
  recommendedHub,
  childAge,
  systemSnapshot,
  handleGameSelect,
}: {
  journeyStage: ReturnType<typeof getJourneyStage>;
  streakDays: number;
  growthInsights: ReturnType<typeof buildGrowthInsights>;
  worldCompletion: { playedWorlds: number; worldStars: number };
  level: number;
  stars: number;
  recommendedHub: ReturnType<typeof getRecommendedThemeHub>;
  childAge: number;
  systemSnapshot: ReturnType<typeof buildLearningSystemSnapshot>;
  handleGameSelect: (hub: GameConfig) => void;
}) {
  const [bannerIndex, setBannerIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setBannerIndex((i) => (i + 1) % 2), 6000);
    return () => clearInterval(t);
  }, []);

  const gradients = [
    'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,245,233,0.96))',
    'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,248,225,0.96))',
  ];
  const borders = [
    '2px solid rgba(76,175,80,0.18)',
    '2px solid rgba(255,183,77,0.25)',
  ];

  const panels = [
    /* ── 面板 0：成长驾驶舱 ── */
    <div key="cockpit" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 0.9fr)', gap: '20px', alignItems: 'stretch' }}>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <Pill background="#E8F5E9" color="#2E7D32">当前阶段：{journeyStage.title}</Pill>
          <Pill background="#FFF3E0" color="#E65100">{journeyStage.ageRange}</Pill>
          <Pill background="#E3F2FD" color="#1565C0">连续学习 {streakDays} 天</Pill>
        </div>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '28px', color: '#3E2723', lineHeight: 1.3 }}>
          🧭 成长驾驶舱：路径、计划、记录和建议已经连成一条线
        </h2>
        <p style={{ margin: '0 0 12px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
          {journeyStage.headline} {journeyStage.mainQuest}
        </p>
        <p style={{ margin: 0, color: '#8D6E63', fontWeight: 700, lineHeight: 1.75 }}>
          {growthInsights.recordSummary}
        </p>
      </div>
      <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '20px', border: '2px solid rgba(76,175,80,0.14)', boxShadow: '0 10px 22px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#2E7D32', marginBottom: '10px' }}>本周成长快照</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
          {[
            { bg: '#F8FBFF', color: '#1565C0', value: worldCompletion.playedWorlds, label: '已探索世界' },
            { bg: '#FFF8E1', color: '#EF6C00', value: worldCompletion.worldStars, label: '世界星星' },
            { bg: '#F3E5F5', color: '#7B1FA2', value: `Lv.${level}`, label: '成长等级' },
            { bg: '#FFF3E0', color: '#F57C00', value: stars, label: '总站星星' },
          ].map(({ bg, color, value, label }) => (
            <div key={label} style={{ background: bg, borderRadius: '18px', padding: '14px' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color }}>{value}</div>
              <div style={{ color: '#6D4C41', fontWeight: 700 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    /* ── 面板 1：成长世界地图 ── */
    <div key="worldmap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          {([['#FFF3E0','#E65100','路线明确'],['#E8F5E9','#2E7D32','年龄分层'],['#E3F2FD','#1565C0','多元评价']] as const).map(([bg, color, label]) => (
            <span key={label} style={{ background: bg, color, borderRadius: '999px', padding: '8px 14px', fontSize: '13px', fontWeight: 900 }}>{label}</span>
          ))}
        </div>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '28px', color: '#3E2723', lineHeight: 1.3 }}>
          🗺️ 成长世界地图已经升级为<br />
          <span style={{ color: '#FF9800' }}>主线 + 检查点 + 拓展世界</span>
        </h2>
        <p style={{ margin: 0, color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
          参考成熟游戏的世界地图、章节推进和检查点设计，把拼音、数学、英语、故事、诗词、运动和认知能力工坊连接成一条长期成长路线。
          每个世界都明确展示适龄范围、核心能力、考察范围与下一步建议，让孩子知道"现在玩什么、为什么玩、接下来去哪儿"。
        </p>
      </div>
      {recommendedHub && (
        <div style={{ minWidth: '280px', maxWidth: '360px', background: '#FFFFFF', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 22px rgba(0,0,0,0.06)', border: '2px solid rgba(255,152,0,0.18)' }}>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#EF6C00', marginBottom: '8px' }}>为 {childAge} 岁小朋友推荐的下一站</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#3E2723', marginBottom: '8px' }}>{recommendedHub.icon} {recommendedHub.name}</div>
          <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.7, marginBottom: '12px' }}>{recommendedHub.learningPath?.learningGoal}</div>
          <div style={{ background: '#F8FBFF', borderRadius: '16px', padding: '12px', color: '#455A64', fontWeight: 700, lineHeight: 1.75, marginBottom: '12px' }}>{systemSnapshot.recommendationReason}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
            <span style={{ background: '#FFF8E1', color: '#EF6C00', borderRadius: '999px', padding: '6px 10px', fontSize: '12px', fontWeight: 800 }}>{recommendedHub.learningPath?.levelLabel}</span>
            <span style={{ background: '#F5F7FA', color: '#455A64', borderRadius: '999px', padding: '6px 10px', fontSize: '12px', fontWeight: 800 }}>适龄 {getAgeRangeLabel(recommendedHub)}</span>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleGameSelect(recommendedHub)}
            style={{ width: '100%', minHeight: '52px', border: 'none', borderRadius: '16px', background: 'linear-gradient(135deg, #FF9800, #FFB74D)', color: '#FFFFFF', fontSize: '16px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 18px rgba(255,152,0,0.25)' }}>
            进入推荐主线
          </motion.button>
        </div>
      )}
    </div>,
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      style={{
        background: gradients[bannerIndex],
        borderRadius: '32px',
        padding: '28px',
        boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
        marginBottom: 'var(--spacing-2xl)',
        border: borders[bannerIndex],
        transition: 'background 0.6s ease, border-color 0.6s ease',
      }}
    >
      {/* dot nav */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '18px' }}>
        {[0, 1].map((i) => (
          <button key={i} type="button" onClick={() => setBannerIndex(i)}
            style={{ width: bannerIndex === i ? '24px' : '8px', height: '8px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: bannerIndex === i ? '#FF9800' : 'rgba(0,0,0,0.15)', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={bannerIndex} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
          {panels[bannerIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const currentChild = useUserStore((s) => s.currentChild);
  const knowledge = useGameStore((s) => s.knowledge);
  const { stars, level, streakDays } = useRewardStore((s) => ({
    stars: s.rewards.stars,
    level: s.rewards.level,
    streakDays: s.rewards.streakDays,
  }));
  const childAge = currentChild?.age ?? 5;
  const learningMap = useMemo(
    () =>
      getLearningMap().map(({ hub, games }) => ({
        hub,
        games,
        progress: getThemeProgress(hub.id),
      })),
    [stars, level, streakDays]
  );
  const growthStages = useMemo(() => getGrowthStages(), []);
  const journeyStage = useMemo(() => getJourneyStage(childAge), [childAge]);
  const expandedSubjects = useMemo(() => getExpandedSubjects(), []);
  const encyclopediaTopics = useMemo(() => getEncyclopediaTopics(childAge).slice(0, 6), [childAge]);
  const themeSummaries = useMemo(
    () =>
      learningMap.map(({ hub, progress }) => ({
        id: hub.id,
        name: hub.name,
        icon: hub.icon,
        learningPath: hub.learningPath,
        progress,
      })),
    [learningMap]
  );
  const weakPoints = useMemo(() => getWeakKnowledgePoints(knowledge), [knowledge]);
  const dueReviewCount = useMemo(
    () => Object.values(knowledge).filter((unit) => unit.nextReviewAt && unit.nextReviewAt <= Date.now()).length,
    [knowledge]
  );
  const coverageSummary = useMemo(() => getLearningContentSummary(), []);
  const ageRecommendedHub = useMemo(
    () => getRecommendedThemeHub(childAge) ?? learningMap[0]?.hub,
    [childAge, learningMap]
  );
  const systemSnapshot = useMemo(
    () =>
      buildLearningSystemSnapshot({
        childName: currentChild?.nickname || '小朋友',
        age: childAge,
        themes: themeSummaries,
        weakPointLabels: weakPoints.map((unit) => unit.content),
        dueReviewCount,
        coverage: coverageSummary,
      }),
    [currentChild?.nickname, childAge, themeSummaries, weakPoints, dueReviewCount, coverageSummary]
  );
  const recommendedHub = useMemo(
    () =>
      learningMap.find((item) => item.hub.id === systemSnapshot.recommendedThemeId)?.hub ?? ageRecommendedHub,
    [learningMap, systemSnapshot.recommendedThemeId, ageRecommendedHub]
  );
  const [selectedHubId, setSelectedHubId] = useState(recommendedHub?.id ?? '');

  const selectedTheme = learningMap.find((item) => item.hub.id === selectedHubId) ?? learningMap[0];
  const selectedHub = selectedTheme?.hub;
  const selectedGames = selectedTheme?.games ?? [];
  const selectedProgress = selectedTheme?.progress;
  const selectedSubject = useMemo(
    () => expandedSubjects.find((subject) => subject.id === selectedHub?.id.replace(/-hub$/, '')),
    [expandedSubjects, selectedHub]
  );
  const studyCalendar = useMemo(
    () =>
      buildStudyCalendar({
        age: childAge,
        streakDays,
        themes: themeSummaries,
        selectedThemeId: selectedHubId || recommendedHub?.id,
      }),
    [childAge, streakDays, themeSummaries, selectedHubId, recommendedHub]
  );
  const growthInsights = useMemo(
    () =>
      buildGrowthInsights({
        childName: currentChild?.nickname || '小朋友',
        age: childAge,
        streakDays,
        themes: themeSummaries,
        selectedThemeId: selectedHubId || recommendedHub?.id,
      }),
    [currentChild?.nickname, childAge, streakDays, themeSummaries, selectedHubId, recommendedHub]
  );
  const worldCompletion = useMemo(() => {
    const playedWorlds = themeSummaries.filter((theme) => theme.progress.playedCount > 0).length;
    const worldStars = themeSummaries.reduce((sum, theme) => sum + theme.progress.totalStars, 0);

    return {
      playedWorlds,
      worldStars,
      totalWorlds: themeSummaries.length,
    };
  }, [themeSummaries]);

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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
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
            <motion.span
              animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-flex', WebkitTextFillColor: 'initial' }}
            >
              <ShipLogo size={64} />
            </motion.span>
            童梦神舟
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

        {/* Stats + Daily Quest — unified card */}
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: 'var(--spacing-lg)',
            overflow: 'hidden',
          }}
        >
          <StatsBar />
          <DailyQuestPanel
            style={{
              borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
              boxShadow: 'none',
              marginBottom: 0,
              border: 'none',
              borderTop: '1px solid rgba(255,183,77,0.15)',
            }}
          />
        </div>

        {/* Game Grid - 选择你的冒险之旅 */}
        <GameGrid games={getThemeHubs()} onGameSelect={handleGameSelect} />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,245,233,0.96))',
            borderRadius: '32px',
            padding: '28px',
            boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
            marginBottom: 'var(--spacing-2xl)',
            border: '2px solid rgba(76,175,80,0.18)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 0.9fr)',
              gap: '20px',
              alignItems: 'stretch',
            }}
          >
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <Pill background="#E8F5E9" color="#2E7D32">
                  当前阶段：{journeyStage.title}
                </Pill>
                <Pill background="#FFF3E0" color="#E65100">
                  {journeyStage.ageRange}
                </Pill>
                <Pill background="#E3F2FD" color="#1565C0">
                  连续学习 {streakDays} 天
                </Pill>
              </div>
              <h2 style={{ margin: '0 0 12px 0', fontSize: '34px', color: '#3E2723', lineHeight: 1.3 }}>
                🧭 成长驾驶舱：路径、计划、记录和建议已经连成一条线
              </h2>
              <p style={{ margin: '0 0 12px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
                {journeyStage.headline} {journeyStage.mainQuest}
              </p>
              <p style={{ margin: 0, color: '#8D6E63', fontWeight: 700, lineHeight: 1.75 }}>
                {growthInsights.recordSummary}
              </p>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '20px',
                border: '2px solid rgba(76,175,80,0.14)',
                boxShadow: '0 10px 22px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#2E7D32', marginBottom: '10px' }}>
                本周成长快照
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                <div style={{ background: '#F8FBFF', borderRadius: '18px', padding: '14px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#1565C0' }}>
                    {worldCompletion.playedWorlds}
                  </div>
                  <div style={{ color: '#6D4C41', fontWeight: 700 }}>已探索世界</div>
                </div>
                <div style={{ background: '#FFF8E1', borderRadius: '18px', padding: '14px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#EF6C00' }}>
                    {worldCompletion.worldStars}
                  </div>
                  <div style={{ color: '#6D4C41', fontWeight: 700 }}>世界星星</div>
                </div>
                <div style={{ background: '#F3E5F5', borderRadius: '18px', padding: '14px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#7B1FA2' }}>Lv.{level}</div>
                  <div style={{ color: '#6D4C41', fontWeight: 700 }}>成长等级</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <RotatingBanner
          journeyStage={journeyStage}
          streakDays={streakDays}
          growthInsights={growthInsights}
          worldCompletion={worldCompletion}
          level={level}
          stars={stars}
          recommendedHub={recommendedHub}
          childAge={childAge}
          systemSnapshot={systemSnapshot}
          handleGameSelect={handleGameSelect}
        />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,248,225,0.96))',
            borderRadius: '32px',
            padding: '28px',
            boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
            marginBottom: 'var(--spacing-2xl)',
            border: '2px solid rgba(255,152,0,0.18)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 0.9fr)',
              gap: '20px',
              alignItems: 'stretch',
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <span
                  style={{
                    background: '#FFF3E0',
                    color: '#E65100',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 900,
                  }}
                >
                  路线明确
                </span>
                <span
                  style={{
                    background: '#E8F5E9',
                    color: '#2E7D32',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 900,
                  }}
                >
                  年龄分层
                </span>
                <span
                  style={{
                    background: '#E3F2FD',
                    color: '#1565C0',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 900,
                  }}
                >
                  多元评价
                </span>
              </div>
              <h2 style={{ margin: '0 0 12px 0', fontSize: '34px', color: '#3E2723', lineHeight: 1.3 }}>
                🗺️ 成长世界地图已经升级为
                <br />
                <span style={{ color: '#FF9800' }}>主线 + 检查点 + 拓展世界</span>
              </h2>
              <p style={{ margin: 0, color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
                参考成熟游戏的世界地图、章节推进和检查点设计，把拼音、数学、英语、故事、诗词、运动和认知能力工坊连接成一条长期成长路线。
                每个世界都明确展示适龄范围、核心能力、考察范围与下一步建议，让孩子知道“现在玩什么、为什么玩、接下来去哪儿”。
              </p>
            </div>

            {recommendedHub && (
              <div
                style={{
                  minWidth: '280px',
                  maxWidth: '360px',
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '20px',
                  boxShadow: '0 10px 22px rgba(0,0,0,0.06)',
                  border: '2px solid rgba(255, 152, 0, 0.18)',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#EF6C00', marginBottom: '8px' }}>
                  为 {childAge} 岁小朋友推荐的下一站
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#3E2723', marginBottom: '8px' }}>
                  {recommendedHub.icon} {recommendedHub.name}
                </div>
                <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.7, marginBottom: '12px' }}>
                  {recommendedHub.learningPath?.learningGoal}
                </div>
                <div
                  style={{
                    background: '#F8FBFF',
                    borderRadius: '16px',
                    padding: '12px',
                    color: '#455A64',
                    fontWeight: 700,
                    lineHeight: 1.75,
                    marginBottom: '12px',
                  }}
                >
                  {systemSnapshot.recommendationReason}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  <span
                    style={{
                      background: '#FFF8E1',
                      color: '#EF6C00',
                      borderRadius: '999px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    {recommendedHub.learningPath?.levelLabel}
                  </span>
                  <span
                    style={{
                      background: '#F5F7FA',
                      color: '#455A64',
                      borderRadius: '999px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    适龄 {getAgeRangeLabel(recommendedHub)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGameSelect(recommendedHub)}
                  style={{
                    width: '100%',
                    minHeight: '52px',
                    border: 'none',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 8px 18px rgba(255, 152, 0, 0.25)',
                  }}
                >
                  进入推荐主线
                </motion.button>
              </div>
            )}
          </div>
        </motion.section>

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading title="🚀 游戏系统设计原则" subtitle="用学习科学把“好玩”和“有效”真正串成闭环。" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
            }}
          >
            <PrincipleCard
              icon="🎯"
              title="主线闯关"
              description="每个主题都按“启蒙关 - 熟练关 - 挑战关 - 检查点”推进，减少随意跳转造成的学习断裂。"
            />
            <PrincipleCard
              icon="🧠"
              title="符合学习规律"
              description="遵循从感知到理解、从静态到动态、从练习到测评的阶梯式编排，让能力迁移更自然。"
            />
            <PrincipleCard
              icon="🌟"
              title="多元反馈"
              description="星星、等级、连续天数、世界进度和关卡导航共同反馈，既有即时成就，也有长期目标。"
            />
            <PrincipleCard
              icon="♻️"
              title="可持续扩展"
              description="通过统一框架沉淀玩法骨架，未来新增题库、主题或复习世界时无需重做系统。"
            />
          </div>
        </section>

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading
            title="🛠️ 系统修复看板"
            subtitle="把“题库窄、路线断、复习弱、迁移少”这些根问题拆开处理，并直接显示当前修复后的系统状态。"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px',
            }}
          >
            {systemSnapshot.systemCards.map((card) => (
              <SystemCard key={card.id} {...card} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading
            title="🎒 今日闭环任务"
            subtitle="现在不是“随便开一个游戏”，而是按热身、主线、检查点、迁移四步推进。"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px',
            }}
          >
            {systemSnapshot.dailyPlan.map((step) => (
              <DailyPlanStepCard key={step.id} {...step} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading
            title="🪜 明确学习路径"
            subtitle="孩子不会再只是“随便点一个游戏”，而是跟着年龄阶段、主线世界和检查点一步步前进。"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px',
              marginBottom: '24px',
            }}
          >
            {growthStages.map((stage) => (
              <StageCard
                key={stage.id}
                title={stage.title}
                ageRange={stage.ageRange}
                headline={stage.headline}
                focusModules={stage.focusModules}
                milestone={stage.milestone}
                isActive={stage.id === journeyStage.id}
              />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading
            title="📅 学习日历"
            subtitle="把“今天学什么、这周怎么走、已经完成了哪些”同时放进一个可见的日程里。"
          />
          <div
            style={{
              background: 'rgba(255,255,255,0.94)',
              borderRadius: '30px',
              padding: '28px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.07)',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
                flexWrap: 'wrap',
                marginBottom: '20px',
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <Pill background="#FFF3E0" color="#E65100">
                    主线 + 百科 + 复盘
                  </Pill>
                  <Pill background="#E8F5E9" color="#2E7D32">
                    已规划 7 天
                  </Pill>
                  <Pill background="#E3F2FD" color="#1565C0">
                    已探索 {worldCompletion.playedWorlds}/{worldCompletion.totalWorlds} 个世界
                  </Pill>
                </div>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '30px', color: '#3E2723' }}>
                  {currentChild?.nickname || '小朋友'} 的本周学习安排
                </h2>
                <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
                  节奏建议：{journeyStage.weeklyRhythm.join(' - ')}
                </p>
                <div style={{ color: '#8D6E63', fontWeight: 700, lineHeight: 1.75 }}>
                  这张日历会把主线世界、百科知识和复盘表达穿成一周闭环，孩子能清楚看到“今天做什么、完成到哪儿、周末要展示什么”。
                </div>
              </div>

              <div
                style={{
                  minWidth: '220px',
                  background: '#F8FBFF',
                  borderRadius: '20px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#1565C0', marginBottom: '8px' }}>习惯记录</div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#3E2723', marginBottom: '6px' }}>
                  🔥 {streakDays} 天
                </div>
                <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.7 }}>
                  连续学习越稳定，主线和百科衔接就越顺。
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {studyCalendar.map((day) => (
                <CalendarDayCard key={day.isoDate} {...day} />
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading title="🌍 选择学习世界" subtitle="点击任意世界，查看关卡路线、适龄范围和考察重点。" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {learningMap.map(({ hub, games, progress }) => {
              const isSelected = hub.id === selectedHub?.id;
              const isRecommended = hub.id === recommendedHub?.id;

              return (
                <motion.button
                  key={hub.id}
                  type="button"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedHubId(hub.id);
                    track('learning_map_select', { themeId: hub.id, themeName: hub.name });
                  }}
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '14px 16px',
                    borderRadius: '18px',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(255,152,0,0.18), rgba(255,255,255,0.96))'
                      : 'rgba(255,255,255,0.94)',
                    boxShadow: isSelected ? '0 14px 28px rgba(255,152,0,0.14)' : '0 10px 22px rgba(0,0,0,0.06)',
                    border: isSelected ? '2px solid rgba(255, 152, 0, 0.35)' : '2px solid rgba(33,150,243,0.12)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '24px', marginBottom: '4px' }}>{hub.icon}</div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: '#3E2723' }}>{hub.name}</div>
                    </div>
                    {isRecommended && (
                      <span
                        style={{
                          alignSelf: 'flex-start',
                          background: '#FFF3E0',
                          color: '#E65100',
                          borderRadius: '999px',
                          padding: '6px 10px',
                          fontSize: '12px',
                          fontWeight: 900,
                        }}
                      >
                        推荐
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    <span
                      style={{
                        background: '#F5F7FA',
                        color: '#455A64',
                        borderRadius: '999px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        fontWeight: 800,
                      }}
                    >
                      {hub.learningPath?.levelLabel}
                    </span>
                    <span
                      style={{
                        background: '#E8F5E9',
                        color: '#2E7D32',
                        borderRadius: '999px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        fontWeight: 800,
                      }}
                    >
                      适龄 {getAgeRangeLabel(hub)}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 8px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.6, fontSize: '13px' }}>
                    {hub.learningPath?.learningGoal}
                  </p>

                  <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, marginBottom: '8px' }}>
                    考察范围：{hub.learningPath?.assessmentScope.join(' / ')}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700 }}>
                    关卡数 {games.length} · 已完成 {progress.playedCount} · 世界星星 {progress.totalStars}
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: '10px',
                      background: '#ECEFF1',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      marginTop: '14px',
                    }}
                  >
                    <div
                      style={{
                        width: `${progress.completionRate}%`,
                        height: '100%',
                        background: 'linear-gradient(135deg, #FF9800, #4CAF50)',
                        borderRadius: '999px',
                      }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {selectedHub && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedHub.id}
            style={{
              background: 'rgba(255,255,255,0.94)',
              borderRadius: '30px',
              padding: '28px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.07)',
              marginBottom: 'var(--spacing-2xl)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
                flexWrap: 'wrap',
                marginBottom: '20px',
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '30px', color: '#3E2723' }}>
                  {selectedHub.icon} {selectedHub.name}路线图
                </h2>
                <p style={{ margin: '0 0 12px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
                  {selectedHub.learningPath?.pedagogyTip}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedHub.learningPath?.skillFocus.map((focus) => (
                    <span
                      key={focus}
                      style={{
                        background: '#FFF8E1',
                        color: '#EF6C00',
                        borderRadius: '999px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        fontWeight: 800,
                      }}
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  minWidth: '220px',
                  background: '#FFF8E1',
                  borderRadius: '20px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#E65100', marginBottom: '6px' }}>
                  当前世界进度
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#3E2723', marginBottom: '4px' }}>
                  {selectedProgress?.completionRate ?? 0}%
                </div>
                <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.7 }}>
                  已完成 {selectedProgress?.playedCount ?? 0}/{selectedProgress?.totalGames ?? 0} 个关卡
                </div>
              </div>
            </div>

            {selectedSubject?.learningRoute?.length ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '14px',
                  marginBottom: '18px',
                }}
              >
                {selectedSubject.learningRoute.map((step) => (
                  <div
                    key={step.id}
                    style={{
                      background: 'linear-gradient(135deg, rgba(224,247,250,0.92), rgba(255,255,255,0.96))',
                      borderRadius: '22px',
                      padding: '18px',
                      border: '2px solid rgba(0,131,143,0.14)',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        background: '#E0F7FA',
                        color: '#00838F',
                        fontSize: '12px',
                        fontWeight: 900,
                        marginBottom: '10px',
                      }}
                    >
                      {step.phase}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#3E2723', marginBottom: '8px' }}>
                      {step.title}
                    </div>
                    <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>
                      {step.goal}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      {step.activities.slice(0, 2).map((activity) => (
                        <span
                          key={activity}
                          style={{
                            background: '#FFFFFF',
                            color: '#455A64',
                            borderRadius: '999px',
                            padding: '6px 10px',
                            fontSize: '12px',
                            fontWeight: 800,
                          }}
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>
                      达成标志：{step.outcome}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {selectedSubject?.experimentCollections?.length ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px',
                  marginBottom: '18px',
                }}
              >
                {selectedSubject.experimentCollections.map((collection) => (
                  <div
                    key={collection.principle}
                    style={{
                      background: 'linear-gradient(135deg, rgba(243,247,255,0.92), rgba(255,255,255,0.97))',
                      borderRadius: '22px',
                      padding: '18px',
                      border: '2px solid rgba(33,150,243,0.14)',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        background: '#EDE7F6',
                        color: '#5E35B1',
                        fontSize: '12px',
                        fontWeight: 900,
                        marginBottom: '10px',
                      }}
                    >
                      原理分组 · {collection.principle}
                    </div>
                    <div style={{ fontSize: '14px', color: '#5D4037', fontWeight: 700, lineHeight: 1.7, marginBottom: '8px' }}>
                      {collection.marketInsight}
                    </div>
                    <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>
                      {collection.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      {collection.experiments.map((experiment) => (
                        <span
                          key={experiment}
                          style={{
                            background: '#FFFFFF',
                            color: '#455A64',
                            borderRadius: '999px',
                            padding: '6px 10px',
                            fontSize: '12px',
                            fontWeight: 800,
                          }}
                        >
                          {experiment}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {[
                        ['产品', collection.designPlan.product],
                        ['测试', collection.designPlan.testing],
                        ['工程', collection.designPlan.engineering],
                        ['UI', collection.designPlan.ui],
                        ['玩法', collection.designPlan.gameDesign],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          style={{
                            background: '#FFFFFF',
                            borderRadius: '16px',
                            padding: '10px 12px',
                            border: '1px solid rgba(33,150,243,0.1)',
                          }}
                        >
                          <div style={{ fontSize: '12px', color: '#1565C0', fontWeight: 900, marginBottom: '4px' }}>
                            {label}视角
                          </div>
                          <div style={{ fontSize: '13px', color: '#5D4037', fontWeight: 700, lineHeight: 1.7 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {selectedGames.length > 0 ? (
              <div style={{ display: 'grid', gap: '14px' }}>
                {selectedGames.map((game, index) => {
                  const previous = selectedGames[index - 1];
                  const next = selectedGames[index + 1];
                  const progress = loadGameProgress(game.id);
                  const isCompleted = Boolean(progress && progress.completedSessions > 0);

                  return (
                    <motion.div
                      key={game.id}
                      whileHover={{ y: -2 }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) auto',
                        gap: '16px',
                        alignItems: 'center',
                        background: isCompleted
                          ? 'linear-gradient(135deg, rgba(232,245,233,0.9), rgba(255,255,255,0.95))'
                          : 'linear-gradient(135deg, rgba(255,248,225,0.92), rgba(255,255,255,0.95))',
                        borderRadius: '22px',
                        padding: '20px',
                        border: isCompleted
                          ? '2px solid rgba(76,175,80,0.24)'
                          : '2px solid rgba(255,183,77,0.24)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                          <span
                            style={{
                              background: '#FFFFFF',
                              color: '#3E2723',
                              borderRadius: '999px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              fontWeight: 900,
                            }}
                          >
                            第 {index + 1} 关
                          </span>
                          <span
                            style={{
                              background: '#FFFFFF',
                              color: '#EF6C00',
                              borderRadius: '999px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              fontWeight: 900,
                            }}
                          >
                            {game.learningPath?.levelLabel}
                          </span>
                          <span
                            style={{
                              background: '#FFFFFF',
                              color: '#2E7D32',
                              borderRadius: '999px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              fontWeight: 900,
                            }}
                          >
                            适龄 {getAgeRangeLabel(game)}
                          </span>
                          <span
                            style={{
                              background: '#FFFFFF',
                              color: isCompleted ? '#2E7D32' : '#546E7A',
                              borderRadius: '999px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              fontWeight: 900,
                            }}
                          >
                            {isCompleted ? '已通关' : '待挑战'}
                          </span>
                        </div>

                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#3E2723', marginBottom: '8px' }}>
                          {game.icon} {game.name}
                        </div>
                        <p style={{ margin: '0 0 10px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>
                          {game.learningPath?.learningGoal ?? game.description}
                        </p>
                        <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>
                          考察范围：{game.learningPath?.assessmentScope.join(' / ')}
                        </div>
                        <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700, lineHeight: 1.7 }}>
                          上一关：{previous?.name ?? '世界入口'} · 下一关：{next?.name ?? '阶段检查完成'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleGameSelect(game)}
                          style={{
                            minWidth: '148px',
                            minHeight: '50px',
                            border: 'none',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
                            color: '#FFFFFF',
                            fontWeight: 900,
                            cursor: 'pointer',
                          }}
                        >
                          {isCompleted ? '再挑战一次' : '开始这一关'}
                        </motion.button>
                        {next && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleGameSelect(next)}
                            style={{
                              minWidth: '148px',
                              minHeight: '46px',
                              border: 'none',
                              borderRadius: '16px',
                              background: '#ECEFF1',
                              color: '#455A64',
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            预览下一关
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  borderRadius: '22px',
                  padding: '18px 20px',
                  background: 'linear-gradient(135deg, rgba(255,248,225,0.92), rgba(255,255,255,0.96))',
                  border: '2px solid rgba(255,183,77,0.24)',
                  color: '#6D4C41',
                  fontWeight: 700,
                  lineHeight: 1.8,
                }}
              >
                这个世界先用路线卡带孩子建立整体认识：按“看见 AI - 学规则 - 会提问 - 共创作 - 会判断”一步步推进，
                后续再进入互动关卡会更轻松。
              </div>
            )}
          </motion.section>
        )}

        <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <SectionHeading
            title=" 成长记录与优缺点建议"
            subtitle="让家长和孩子都能看到当前优势、待加强点，以及下一步最值得投入的方向。"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.94)',
                borderRadius: '30px',
                padding: '28px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.07)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <Pill background="#E8F5E9" color="#2E7D32">
                  优势观察
                </Pill>
                <Pill background="#FFF3E0" color="#E65100">
                  待加强提醒
                </Pill>
              </div>
              <h2 style={{ margin: '0 0 12px 0', fontSize: '30px', color: '#3E2723' }}>成长画像</h2>
              <p style={{ margin: '0 0 12px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
                {growthInsights.recordSummary}
              </p>
              <div
                style={{
                  background: '#F8FBFF',
                  borderRadius: '20px',
                  padding: '16px',
                  fontSize: '14px',
                  color: '#455A64',
                  fontWeight: 700,
                  lineHeight: 1.8,
                  marginBottom: '14px',
                }}
              >
                {growthInsights.advantageNote}
              </div>
              <div
                style={{
                  background: '#FFF8E1',
                  borderRadius: '20px',
                  padding: '16px',
                  fontSize: '14px',
                  color: '#8D6E63',
                  fontWeight: 700,
                  lineHeight: 1.8,
                  marginBottom: '18px',
                }}
              >
                {growthInsights.watchoutNote}
              </div>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#2E7D32', marginBottom: '10px' }}>
                    优势建议
                  </div>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {growthInsights.strengths.map((item) => (
                      <div
                        key={item}
                        style={{
                          background: 'rgba(232,245,233,0.72)',
                          borderRadius: '18px',
                          padding: '14px',
                          color: '#1B5E20',
                          fontWeight: 700,
                          lineHeight: 1.75,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#EF6C00', marginBottom: '10px' }}>
                    下一步行动
                  </div>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {growthInsights.focusSuggestions.map((item) => (
                      <div
                        key={item}
                        style={{
                          background: 'rgba(255,248,225,0.86)',
                          borderRadius: '18px',
                          padding: '14px',
                          color: '#6D4C41',
                          fontWeight: 700,
                          lineHeight: 1.75,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(243,229,245,0.96))',
                borderRadius: '30px',
                padding: '28px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.07)',
              }}
            >
              <h2 style={{ margin: '0 0 12px 0', fontSize: '30px', color: '#3E2723' }}>家长陪伴建议</h2>
              <p style={{ margin: '0 0 16px 0', color: '#6D4C41', fontWeight: 600, lineHeight: 1.8 }}>
                这一阶段最关键的不是“学了多少”，而是帮助孩子形成可持续的学习体验。
              </p>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
                {growthInsights.parentTips.map((tip) => (
                  <div
                    key={tip}
                    style={{
                      background: 'rgba(255,255,255,0.78)',
                      borderRadius: '18px',
                      padding: '14px',
                      color: '#5D4037',
                      fontWeight: 700,
                      lineHeight: 1.75,
                    }}
                  >
                    {tip}
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '16px',
                  border: '2px solid rgba(156,39,176,0.14)',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#7B1FA2', marginBottom: '8px' }}>
                  推荐陪伴动作
                </div>
                <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.8 }}>
                  每次学习结束只问 3 个问题：“今天最喜欢哪个世界？”“你知道了什么新知识？”“下次想先去哪一站？”
                  这样能同时建立复盘、表达和路径感。
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
