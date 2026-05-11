/**
 * 通用学科主题入口组件
 * 读取当前路由，从游戏注册表中找到对应的主题 hub，
 * 并展示学科简介、技能标签及子游戏列表。
 * 适用于：地理、历史、化学、物理、生物、百科等课程升级主题。
 */

import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGameByPath, getGamesByTheme, type GameConfig } from '../registry';
import { getExpandedSubjects } from '../../data/homeLearningJourney';
import { track } from '../../lib/analytics';
import { APP_SHELL_MAX_WIDTH, PageLayout, GamePageHeader } from '../../components/PageLayout';
import { BrandPill, EmptyState, SectionHeading, SurfaceCard, type BrandPalette } from '../../components/BrandPrimitives';
import { ThemeHubGameCard } from '../../components/ThemeHubPage';

// Per-subject color palette
type SubjectPalette = BrandPalette & { bg: string };

const subjectPalette: Record<string, SubjectPalette> = {
  geography: {
    primary: '#4CAF50',
    secondary: '#81C784',
    bg: '#E8F5E9',
    border: 'rgba(76,175,80,0.28)',
    gradient: 'linear-gradient(135deg, #4CAF50, #81C784)',
  },
  history: {
    primary: '#FF9800',
    secondary: '#FFB74D',
    bg: '#FFF3E0',
    border: 'rgba(255,152,0,0.28)',
    gradient: 'linear-gradient(135deg, #FF9800, #FFB74D)',
  },
  chemistry: {
    primary: '#9C27B0',
    secondary: '#CE93D8',
    bg: '#F3E5F5',
    border: 'rgba(156,39,176,0.28)',
    gradient: 'linear-gradient(135deg, #9C27B0, #CE93D8)',
  },
  physics: {
    primary: '#2196F3',
    secondary: '#64B5F6',
    bg: '#E3F2FD',
    border: 'rgba(33,150,243,0.28)',
    gradient: 'linear-gradient(135deg, #2196F3, #64B5F6)',
  },
  biology: {
    primary: '#8BC34A',
    secondary: '#AED581',
    bg: '#F1F8E9',
    border: 'rgba(139,195,74,0.28)',
    gradient: 'linear-gradient(135deg, #8BC34A, #AED581)',
  },
  ai: {
    primary: '#00838F',
    secondary: '#7E57C2',
    bg: '#E0F7FA',
    border: 'rgba(0,131,143,0.24)',
    gradient: 'linear-gradient(135deg, #00838F, #26C6DA 55%, #7E57C2)',
  },
  encyclopedia: {
    primary: '#607D8B',
    secondary: '#90A4AE',
    bg: '#ECEFF1',
    border: 'rgba(96,125,139,0.28)',
    gradient: 'linear-gradient(135deg, #607D8B, #90A4AE)',
  },
};

const fallbackPalette = subjectPalette.encyclopedia;

export default function SubjectThemeHub() {
  const navigate = useNavigate();
  const location = useLocation();

  // Find hub config from registry by path
  const hub = getGameByPath(location.pathname);
  // Derive subject id: 'geography-hub' → 'geography'
  const subjectId = hub?.id.replace(/-hub$/, '') ?? '';
  const subject = getExpandedSubjects().find((s) => s.id === subjectId);
  const palette = subjectPalette[subjectId] ?? fallbackPalette;
  const games = hub ? getGamesByTheme(hub.id) : [];

  const handleBack = useCallback(() => navigate('/'), [navigate]);

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('subject_game_select', { gameId: game.id, gameName: game.name, subjectId });
      navigate(game.path);
    },
    [navigate, subjectId],
  );

  return (
    <PageLayout maxWidth={APP_SHELL_MAX_WIDTH}>
      <GamePageHeader
        title={hub?.name ?? subject?.title ?? '学习主题'}
        icon={hub?.icon ?? subject?.icon ?? '📚'}
        subtitle={subject?.summary ?? hub?.description ?? '探索知识，开启冒险！'}
        gradient={palette.gradient}
        progressColor={palette.primary}
        onBack={handleBack}
      />

      {/* Subject info card */}
      {subject && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <SurfaceCard
            borderColor={palette.border}
            background={`linear-gradient(135deg, ${palette.bg}, rgba(255,255,255,0.95))`}
            style={{ padding: '24px 26px', marginBottom: '28px' }}
          >
            <SectionHeading
              eyebrow="Subject hub"
              title={subject.title}
              description={subject.summary}
              accent={palette.primary}
              style={{ marginBottom: '16px' }}
            />
          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {subject.skills.map((skill) => (
              <BrandPill key={skill} background="rgba(255,255,255,0.82)" color={palette.primary}>
                {skill}
              </BrandPill>
            ))}
          </div>
          <p style={{ margin: '0 0 10px 0', color: '#5D4037', fontWeight: 600, lineHeight: 1.7 }}>
            {subject.routeRole}
          </p>
          <div style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 700 }}>
            示例主题：{subject.sampleTopics.join(' · ')}
          </div>
          {subject.safetyNote && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 12px',
                borderRadius: '14px',
                background: '#FFFFFF',
                color: '#6D4C41',
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: 1.7,
              }}
            >
              安全提示：{subject.safetyNote}
            </div>
          )}
          </SurfaceCard>
        </motion.div>
      )}

      {subject?.learningRoute?.length ? (
        <div
          style={{
            display: 'grid',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          {subject.learningRoute.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.94)',
                borderRadius: '20px',
                padding: '18px 20px',
                border: `2px solid ${palette.border}`,
                boxShadow: `0 8px 20px ${palette.primary}12`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '10px',
                }}
              >
                <BrandPill background={palette.bg} color={palette.primary}>
                  {step.phase}
                </BrandPill>
                <span style={{ color: '#8D6E63', fontSize: '13px', fontWeight: 700 }}>AI 学习路线</span>
              </div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#3E2723' }}>{step.title}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#5D4037', fontWeight: 600, lineHeight: 1.7 }}>
                {step.goal}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                {step.activities.map((activity) => (
                  <BrandPill key={activity} background="#FFFFFF" color="#4E342E" style={{ border: `1.5px solid ${palette.border}`, padding: '8px 14px' }}>
                    {activity}
                  </BrandPill>
                ))}
              </div>
              <div style={{ color: '#6D4C41', fontSize: '14px', fontWeight: 700, lineHeight: 1.7 }}>
                达成标志：{step.outcome}
              </div>
            </motion.div>
          ))}
        </div>
      ) : null}

      {subject?.experimentCollections?.length ? (
        <div
          style={{
            display: 'grid',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.94)',
              borderRadius: '20px',
              padding: '18px 20px',
              border: `2px solid ${palette.border}`,
              boxShadow: `0 8px 20px ${palette.primary}10`,
            }}
          >
            <div style={{ fontSize: '13px', color: palette.primary, fontWeight: 900, marginBottom: '6px' }}>
              市场实验收纳
            </div>
            <div style={{ fontSize: '24px', color: '#3E2723', fontWeight: 900, marginBottom: '8px' }}>
              这条主题已按原理整理成 {subject.experimentCollections.length} 组实验包
            </div>
            <div style={{ color: '#6D4C41', fontWeight: 700, lineHeight: 1.75 }}>
              每组都补上了产品、测试、工程、UI 和玩法规划，方便后续继续扩成互动关卡、实验任务卡和亲子挑战。
            </div>
          </div>

          {subject.experimentCollections.map((collection, index) => (
            <motion.div
              key={collection.principle}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.06, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.94)',
                borderRadius: '20px',
                padding: '18px 20px',
                border: `2px solid ${palette.border}`,
                boxShadow: `0 8px 20px ${palette.primary}12`,
              }}
            >
               <BrandPill background={palette.bg} color={palette.primary} style={{ marginBottom: '10px' }}>
                 原理分组 · {collection.principle}
               </BrandPill>
              <div
                style={{
                  marginBottom: '10px',
                  color: palette.primary,
                  fontSize: '13px',
                  fontWeight: 800,
                  lineHeight: 1.75,
                }}
              >
                {collection.marketInsight}
              </div>
              <p style={{ margin: '0 0 12px 0', color: '#5D4037', fontWeight: 600, lineHeight: 1.7 }}>
                {collection.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                {collection.experiments.map((experiment) => (
                   <BrandPill key={experiment} background="#FFFFFF" color="#4E342E" style={{ border: `1.5px solid ${palette.border}`, padding: '8px 14px' }}>
                     {experiment}
                   </BrandPill>
                 ))}
               </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '10px',
                }}
              >
                {[
                  ['产品视角', collection.designPlan.product],
                  ['测试视角', collection.designPlan.testing],
                  ['工程视角', collection.designPlan.engineering],
                  ['UI 视角', collection.designPlan.ui],
                  ['玩法视角', collection.designPlan.gameDesign],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '12px',
                      border: `1.5px solid ${palette.border}`,
                    }}
                  >
                    <div style={{ fontSize: '12px', color: palette.primary, fontWeight: 900, marginBottom: '6px' }}>{label}</div>
                    <div style={{ color: '#5D4037', fontSize: '13px', fontWeight: 700, lineHeight: 1.7 }}>{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : null}

      {/* Game list */}
      {games.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {games.map((game, index) => (
            <ThemeHubGameCard
              key={game.id}
              game={game}
              index={index}
              palette={palette}
              onClick={() => handleGameSelect(game)}
            />
          ))}
        </div>
      ) : (
        /* Coming soon placeholder */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <EmptyState
            emoji={subject?.icon ?? '🎮'}
            title={`${subject?.title ?? ''}精彩游戏即将上线！`}
            description={subject?.summary ?? '敬请期待'}
            accent={palette.primary}
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {subject?.sampleTopics.map((topic) => (
              <BrandPill key={topic} background={palette.bg} color={palette.primary} style={{ padding: '8px 18px', border: `1.5px solid ${palette.border}` }}>
                {topic}
              </BrandPill>
            ))}
          </div>
        </motion.div>
      )}
    </PageLayout>
  );
}
