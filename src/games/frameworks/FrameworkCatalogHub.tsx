import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button';
import { frameworkCatalog } from '../../data/gameFrameworkCatalog';
import { getGameSeriesSnapshot } from '../../data/gameSeriesCatalog';
import { track } from '../../lib/analytics';

function StatusBadge({ playable }: { playable: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 800,
        color: playable ? '#1B5E20' : '#6A1B9A',
        background: playable ? '#E8F5E9' : '#F3E5F5',
      }}
    >
      {playable ? '✅ 可体验' : '🧩 框架已定义'}
    </span>
  );
}

export default function FrameworkCatalogHub() {
  const navigate = useNavigate();
  const playableCount = frameworkCatalog.reduce(
    (sum, section) => sum + section.games.filter((item) => item.status === 'playable' && item.playPath).length,
    0
  );
  const totalCount = frameworkCatalog.reduce((sum, section) => sum + section.games.length, 0);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handlePlay = useCallback(
    (sectionId: string, itemId: string, path: string) => {
      track('framework_play_select', { sectionId, frameworkId: itemId, path });
      navigate(path);
    },
    [navigate]
  );

  return (
    <PageLayout maxWidth="1080px">
      <GamePageHeader
        title="游戏设计工坊"
        icon="🛠️"
        subtitle="把 GAMES 设计文档拆成一套可复用、可扩展、可直接玩的游戏框架。"
        gradient="linear-gradient(135deg, #E91E63, #FF9800, #2196F3)"
        progressColor="#E91E63"
        onBack={handleBack}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #FFF8E1, #FFFFFF)',
          borderRadius: '24px',
          padding: '24px',
          border: '3px solid #FFE082',
          boxShadow: '0 12px 30px rgba(255, 152, 0, 0.12)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          {[
            '单次时长 3-8 分钟',
            '200ms 内反馈',
            '统一奖励接入',
            '低认知负担',
            '一套框架多主题复用',
            `已可玩 ${playableCount}/${totalCount}`,
          ].map(
            (chip) => (
              <span
                key={chip}
                style={{
                  background: '#FFFFFF',
                  color: '#5D4037',
                  borderRadius: '999px',
                  padding: '8px 14px',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: '2px solid #FFE0B2',
                }}
              >
                {chip}
              </span>
            )
          )}
        </div>
        <p style={{ margin: 0, color: '#6D4C41', lineHeight: 1.8, fontWeight: 600 }}>
          这里不是静态清单，而是把文档里的玩法拆成“打地鼠 / 翻翻乐 / 规律挑战 / 顺序重建 /
          专注训练 / 反应训练”等基础框架。后续新增主题时，只需替换题库、配色和反馈语气即可继续扩展。
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {frameworkCatalog.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.06 }}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              border: `3px solid ${section.color}30`,
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: section.color,
                }}
              >
                {section.icon} {section.title}
              </h2>
              <p style={{ margin: 0, color: '#6D4C41', fontWeight: 600, lineHeight: 1.7 }}>
                {section.description}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
              }}
              >
                {section.games.map((item) => {
                  const playable = item.status === 'playable' && !!item.playPath;
                  const series = getGameSeriesSnapshot(item.id);
                  return (
                    <motion.div
                    key={item.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    style={{
                      borderRadius: '20px',
                      padding: '18px',
                      background: `${section.color}10`,
                      border: `2px solid ${section.color}25`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      minHeight: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#3E2723' }}>
                        {item.name}
                      </h3>
                      <StatusBadge playable={playable} />
                    </div>

                    <p style={{ margin: 0, color: '#5D4037', lineHeight: 1.7, fontWeight: 600 }}>
                      {item.description}
                    </p>

                    <div
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '14px',
                        padding: '12px',
                        color: '#6D4C41',
                        fontWeight: 700,
                      }}
                    >
                      教育目标：{item.goal}
                    </div>

                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                       {item.tags.map((tag) => (
                         <span
                          key={tag}
                          style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            borderRadius: '999px',
                            padding: '6px 10px',
                            color: section.color,
                            background: '#FFFFFF',
                          }}
                        >
                           #{tag}
                          </span>
                        ))}
                        {series && (
                          <>
                            <span
                              style={{
                                fontSize: '12px',
                                fontWeight: 800,
                                borderRadius: '999px',
                                padding: '6px 10px',
                                color: section.color,
                                background: '#FFFFFF',
                              }}
                            >
                              {series.stageLabel}
                            </span>
                            <span
                              style={{
                                fontSize: '12px',
                                fontWeight: 800,
                                borderRadius: '999px',
                                padding: '6px 10px',
                                color: section.color,
                                background: '#FFFFFF',
                              }}
                            >
                              {series.bankLabel}
                            </span>
                          </>
                        )}
                     </div>

                     {series && (
                       <div
                         style={{
                           background: '#FFFFFF',
                           borderRadius: '14px',
                           padding: '12px',
                           color: '#6D4C41',
                           fontWeight: 700,
                           lineHeight: 1.7,
                         }}
                       >
                         系列路线：{series.ladderLabel}
                       </div>
                     )}

                     <div style={{ marginTop: 'auto' }}>
                      {playable ? (
                        <Button
                          onClick={() => handlePlay(section.id, item.id, item.playPath as string)}
                        >
                          立即体验
                        </Button>
                      ) : (
                        <div style={{ color: '#7B1FA2', fontWeight: 700, fontSize: '14px' }}>
                          当前卡片仍是预研设计项，可继续按题库接入。
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </PageLayout>
  );
}
