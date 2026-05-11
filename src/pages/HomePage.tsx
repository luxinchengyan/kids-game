import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameGrid } from '../components/GameNavigation/GameGrid';
import {
  getThemeHubs,
  getThemeHub,
  type GameConfig,
} from '../games/registry';
import { useRewardStore } from '../stores/useRewardStore';
import { useUserStore } from '../stores/useUserStore';
import { useGameStore } from '../stores/useGameStore';
import { track } from '../lib/analytics';
import { getEffectiveChildAge, getRecommendedDifficulty } from '../lib/learnerProfile';
import { ShipLogo } from '../components/ShipLogo';
import { ParentalGate } from '../components/ParentZone/ParentalGate';
import { CompanionBubble } from '../components/CompanionBubble';
import { ChildSwitcher } from '../components/ChildSwitcher';
import { APP_SHELL_MAX_WIDTH } from '../components/PageLayout';
import { buildLearningSystemSnapshot } from '../data/homeLearningJourney';
import { createMission, getLearningContentSummary, getWeakKnowledgePoints } from '../data/learningContent';
import { buildJourneyThemeSummaries } from '../lib/journeyProgress';

type MissionSkill = 'pinyin' | 'math' | 'english' | 'stories';

interface PlannedMissionTask {
  id: string;
  prompt?: string;
  skill?: MissionSkill;
  missionRole?: 'review' | 'warmup' | 'core' | 'checkpoint';
  recommendedIntervalMinutes?: number;
  systemNote?: string;
}

interface WeakPointUnit {
  id?: string;
  type?: string;
  content?: string;
  nextReviewAt?: number;
}

const skillThemeMeta: Record<MissionSkill, { label: string; icon: string; accent: string }> = {
  pinyin: { label: '拼音', icon: '🔤', accent: '#FF9800' },
  math: { label: '数学', icon: '🔢', accent: '#2196F3' },
  english: { label: '英语', icon: '🔠', accent: '#4CAF50' },
  stories: { label: '故事', icon: '📖', accent: '#9C27B0' },
};

const missionRoleMeta: Record<NonNullable<PlannedMissionTask['missionRole']>, { label: string; badge: string }> = {
  review: { label: '先复习', badge: '#FFF3E0' },
  warmup: { label: '热身题', badge: '#E3F2FD' },
  core: { label: '主线题', badge: '#E8F5E9' },
  checkpoint: { label: '检查点', badge: '#F3E5F5' },
};

function getWeakPointSkill(type?: string, id?: string): MissionSkill {
  if (type === 'english' || id?.startsWith('word_')) {
    return 'english';
  }

  if (type === 'story' || id?.startsWith('story_')) {
    return 'stories';
  }

  if (['number', 'operation', 'comparison', 'shape', 'pattern'].includes(type || '') || id?.startsWith('number_')) {
    return 'math';
  }

  return 'pinyin';
}

function formatWeakPointLabel(unit: WeakPointUnit): string {
  const skill = getWeakPointSkill(unit.type, unit.id);
  const skillMeta = skillThemeMeta[skill];
  return `${skillMeta.label} · ${unit.content || '关键知识点'}`;
}

function getMissionSkillMeta(skill?: MissionSkill) {
  return skill ? skillThemeMeta[skill] : { label: '综合', icon: '🧩', accent: '#6D4C41' };
}

function getThemeHubBySkill(skill?: MissionSkill) {
  if (!skill) {
    return undefined;
  }

  return getThemeHubs().find((hub) => hub.category === skill);
}

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
  const knowledge = useGameStore((s) => s.knowledge);
  const profile = useGameStore((s) => s.profile);
  const { stars, level, streakDays } = useRewardStore((s) => ({
    stars: s.rewards.stars,
    level: s.rewards.level,
    streakDays: s.rewards.streakDays,
  }));

  const [showParentGate, setShowParentGate] = useState(false);
  const [showDailyPath, setShowDailyPath] = useState(false);
  const dailyPathRef = useRef<HTMLElement | null>(null);
  const childAge = getEffectiveChildAge(currentChild);
  const themeSummaries = buildJourneyThemeSummaries();
  const weakPointUnits = useMemo(() => {
    const weakPoints = getWeakKnowledgePoints(knowledge);
    return Array.isArray(weakPoints) ? (weakPoints as WeakPointUnit[]) : [];
  }, [knowledge]);
  const weakPointLabels = useMemo(
    () => weakPointUnits.map((unit) => formatWeakPointLabel(unit)),
    [weakPointUnits]
  );
  const dueReviewCount = useMemo(
    () =>
      Object.values(knowledge).filter((unit) => {
        if (!unit || typeof unit !== 'object' || !('nextReviewAt' in unit)) {
          return false;
        }

        const nextReviewAt = unit.nextReviewAt;
        return typeof nextReviewAt === 'number' && nextReviewAt > 0 && nextReviewAt <= Date.now();
      }).length,
    [knowledge]
  );
  const coverageSummary = useMemo(() => getLearningContentSummary(), []);
  const systemSnapshot = useMemo(
    () =>
      buildLearningSystemSnapshot({
        childName: currentChild?.nickname || '小朋友',
        age: childAge,
        themes: themeSummaries,
        weakPointLabels,
        dueReviewCount,
        coverage: coverageSummary,
      }),
    [currentChild?.nickname, childAge, themeSummaries, weakPointLabels, dueReviewCount, coverageSummary]
  );
  const plannedMission = useMemo(() => {
    const mission = createMission(
      {
        language: profile.language,
        focus: 'mixed',
        companion: profile.companion,
        age: childAge,
        recommendedDifficulty: getRecommendedDifficulty(currentChild),
      },
      knowledge
    );

    return Array.isArray(mission) ? (mission as PlannedMissionTask[]) : [];
  }, [profile.language, profile.companion, childAge, currentChild, knowledge]);
  const recommendedHub = useMemo(() => {
    const recommendedThemeHub = systemSnapshot.recommendedThemeId
      ? getThemeHub(systemSnapshot.recommendedThemeId)
      : undefined;

    return (
      recommendedThemeHub ??
      plannedMission.map((task) => getThemeHubBySkill(task.skill)).find((hub): hub is GameConfig => Boolean(hub)) ??
      getThemeHubs()[0]
    );
  }, [systemSnapshot.recommendedThemeId, plannedMission]);

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('game_select', { gameId: game.id, gameName: game.name });
      navigate(game.path);
    },
    [navigate]
  );
  const handleDailyPathOpen = useCallback(() => {
    if (!showDailyPath) {
      track('daily_path_planned', {
        childAge,
        dueReviewCount,
        missionCount: plannedMission.length,
        recommendedThemeId: systemSnapshot.recommendedThemeId || recommendedHub?.id,
      });
    }

    setShowDailyPath(true);
    window.requestAnimationFrame(() => {
      dailyPathRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [
    showDailyPath,
    childAge,
    dueReviewCount,
    plannedMission.length,
    systemSnapshot.recommendedThemeId,
    recommendedHub?.id,
  ]);
  const handleStartFirstStation = useCallback(() => {
    if (!recommendedHub) {
      return;
    }

    track('daily_path_started', {
      gameId: recommendedHub.id,
      pathStepCount: plannedMission.length,
    });
    handleGameSelect(recommendedHub);
  }, [recommendedHub, plannedMission.length, handleGameSelect]);

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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: APP_SHELL_MAX_WIDTH, margin: '0 auto', padding: '0 24px 60px' }}>
        
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
              message={
                showDailyPath
                  ? `今天的路线已经规划好啦！先去 ${recommendedHub?.name || '主线世界'}，再把复习和表达一起串起来。`
                  : '船长你好！点一下开始，我会根据年龄和最近学习记录，规划今天的学习路径。'
              }
              visible={true}
            />
          </div>

          {/* Main Action Button */}
          {recommendedHub && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDailyPathOpen}
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
              <span>{showDailyPath ? '🧭 查看今日路径' : '🚀 开始今日任务'}</span>
            </motion.button>
          )}
        </motion.section>

        {showDailyPath && (
          <motion.section
            ref={dailyPathRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              marginBottom: '56px',
              background: 'rgba(255, 255, 255, 0.96)',
              borderRadius: '32px',
              padding: '32px',
              boxShadow: '0 18px 42px rgba(33, 150, 243, 0.08)',
              border: '1px solid rgba(33, 150, 243, 0.12)',
            }}
          >
            <div style={{ display: 'grid', gap: '18px', marginBottom: '28px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#1976D2', marginBottom: '10px' }}>🧭 今日学习路径已规划</div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#3E2723', margin: '0 0 10px' }}>
                  先补最该补的，再把今天的知识走成闭环
                </h2>
                <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.7, color: '#5D4037', fontWeight: 700 }}>
                  {systemSnapshot.recommendationReason}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ padding: '8px 14px', borderRadius: '999px', background: '#E3F2FD', color: '#1565C0', fontWeight: 800 }}>
                  适配年龄 {childAge} 岁
                </span>
                <span style={{ padding: '8px 14px', borderRadius: '999px', background: '#E8F5E9', color: '#2E7D32', fontWeight: 800 }}>
                  全库可调度 {coverageSummary.total} 个知识点
                </span>
                <span style={{ padding: '8px 14px', borderRadius: '999px', background: '#FFF3E0', color: '#E65100', fontWeight: 800 }}>
                  待复习 {dueReviewCount} 项
                </span>
                {weakPointLabels[0] && (
                  <span style={{ padding: '8px 14px', borderRadius: '999px', background: '#F3E5F5', color: '#6A1B9A', fontWeight: 800 }}>
                    优先补 {weakPointLabels[0]}
                  </span>
                )}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              {systemSnapshot.dailyPlan.map((step) => (
                <div
                  key={step.id}
                  style={{
                    background: '#F8FBFF',
                    borderRadius: '24px',
                    padding: '20px',
                    border: '1px solid rgba(33, 150, 243, 0.12)',
                    display: 'grid',
                    gap: '10px',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 900, color: '#1976D2', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#3E2723' }}>{step.summary}</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#6D4C41', fontWeight: 600 }}>{step.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#3E2723', marginBottom: '16px' }}>📋 今天的任务单</div>
              <div style={{ display: 'grid', gap: '14px' }}>
                {plannedMission.map((task, index) => {
                  const skillMeta = getMissionSkillMeta(task.skill);
                  const roleMeta = task.missionRole ? missionRoleMeta[task.missionRole] : null;
                  return (
                    <div
                      key={task.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '16px',
                        alignItems: 'center',
                        padding: '16px 18px',
                        borderRadius: '20px',
                        background: '#FFFFFF',
                        border: '1px solid rgba(62, 39, 35, 0.08)',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '14px',
                          background: `${skillMeta.accent}14`,
                          color: skillMeta.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          fontWeight: 900,
                        }}
                      >
                        {index + 1}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              background: `${skillMeta.accent}14`,
                              color: skillMeta.accent,
                              fontSize: '12px',
                              fontWeight: 900,
                            }}
                          >
                            <span>{skillMeta.icon}</span>
                            <span>{skillMeta.label}</span>
                          </span>
                          {roleMeta && (
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '999px',
                                background: roleMeta.badge,
                                color: '#5D4037',
                                fontSize: '12px',
                                fontWeight: 900,
                              }}
                            >
                              {roleMeta.label}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: '#3E2723', marginBottom: '6px' }}>
                          {task.prompt || '进入今天的学习任务'}
                        </div>
                        <div style={{ fontSize: '14px', lineHeight: 1.7, color: '#8D6E63', fontWeight: 600 }}>
                          {task.systemNote || '系统会把今天的学习重点串成连续路线。'}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', color: '#546E7A', fontSize: '12px', fontWeight: 800 }}>
                        建议
                        <div style={{ fontSize: '15px', color: '#1565C0', marginTop: '4px' }}>
                          {task.recommendedIntervalMinutes ?? 0} 分钟
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {recommendedHub && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '8px',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartFirstStation}
                  style={{
                    background: 'linear-gradient(135deg, #2196F3, #42A5F5)',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '18px 32px',
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: '0 12px 28px rgba(33, 150, 243, 0.24)',
                  }}
                >
                  进入第一站：{recommendedHub.name}
                </motion.button>
                <div style={{ fontSize: '14px', color: '#78909C', fontWeight: 700, textAlign: 'center' }}>
                  先推进最该补齐的世界，再把复习、检查点和表达练习一起完成。
                </div>
              </div>
            )}
          </motion.section>
        )}

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
