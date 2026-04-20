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
import { PageLayout, GamePageHeader } from '../../components/PageLayout';

// Per-subject color palette
const subjectPalette: Record<
  string,
  { primary: string; secondary: string; bg: string; border: string; gradient: string }
> = {
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

function SubjectGameCard({
  game,
  onClick,
  index,
  palette,
}: {
  game: GameConfig;
  onClick: () => void;
  index: number;
  palette: (typeof subjectPalette)[string];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #FAFAFA, #FFFFFF)',
        borderRadius: '20px',
        padding: '22px',
        cursor: 'pointer',
        border: `2px solid ${palette.border}`,
        boxShadow: `0 6px 18px ${palette.primary}22`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '18px',
      }}
    >
      <div style={{ fontSize: '52px', lineHeight: 1, flexShrink: 0 }}>{game.icon}</div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#3E2723', margin: '0 0 8px 0' }}>
          {game.name}
        </h3>
        <p style={{ fontSize: '14px', color: '#6D4C41', margin: '0 0 12px 0', lineHeight: 1.65 }}>
          {game.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          {game.learningPath?.levelLabel && (
            <span
              style={{
                background: palette.bg,
                color: palette.primary,
                borderRadius: '999px',
                padding: '4px 12px',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              {game.learningPath.levelLabel}
            </span>
          )}
          {game.minAge && game.maxAge && (
            <span style={{ fontSize: '13px', color: '#8D6E63', fontWeight: 600 }}>
              {game.minAge}-{game.maxAge}岁
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          fontSize: '24px',
          color: palette.primary,
          flexShrink: 0,
          alignSelf: 'center',
        }}
      >
        →
      </div>
    </motion.div>
  );
}

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
    <PageLayout maxWidth="800px">
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
          style={{
            background: palette.bg,
            borderRadius: '20px',
            padding: '20px 22px',
            marginBottom: '28px',
            border: `2px solid ${palette.border}`,
          }}
        >
          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {subject.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: '#FFFFFF',
                  color: palette.primary,
                  borderRadius: '999px',
                  padding: '5px 12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}
              >
                {skill}
              </span>
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
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: palette.bg,
                    color: palette.primary,
                    fontSize: '13px',
                    fontWeight: 800,
                  }}
                >
                  {step.phase}
                </span>
                <span style={{ color: '#8D6E63', fontSize: '13px', fontWeight: 700 }}>AI 学习路线</span>
              </div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#3E2723' }}>{step.title}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#5D4037', fontWeight: 600, lineHeight: 1.7 }}>
                {step.goal}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                {step.activities.map((activity) => (
                  <span
                    key={activity}
                    style={{
                      background: '#FFFFFF',
                      color: '#4E342E',
                      borderRadius: '999px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: `1.5px solid ${palette.border}`,
                    }}
                  >
                    {activity}
                  </span>
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
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: palette.bg,
                  color: palette.primary,
                  fontSize: '13px',
                  fontWeight: 800,
                  marginBottom: '10px',
                }}
              >
                原理分组 · {collection.principle}
              </div>
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
                  <span
                    key={experiment}
                    style={{
                      background: '#FFFFFF',
                      color: '#4E342E',
                      borderRadius: '999px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: `1.5px solid ${palette.border}`,
                    }}
                  >
                    {experiment}
                  </span>
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
            <SubjectGameCard
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
          style={{
            textAlign: 'center',
            padding: '56px 24px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '28px',
            border: `2px solid ${palette.border}`,
            boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>{subject?.icon ?? '🎮'}</div>
          <p
            style={{
              fontSize: '22px',
              fontWeight: 900,
              color: '#3E2723',
              marginBottom: '10px',
            }}
          >
            {subject?.title ?? ''}精彩游戏即将上线！
          </p>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#6D4C41', marginBottom: '20px' }}>
            {subject?.summary}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {subject?.sampleTopics.map((topic) => (
              <span
                key={topic}
                style={{
                  background: palette.bg,
                  color: palette.primary,
                  borderRadius: '999px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: `1.5px solid ${palette.border}`,
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </PageLayout>
  );
}
