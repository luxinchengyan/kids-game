import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGamesByTheme, getAgeRangeLabel, type GameConfig } from '../games/registry';
import { APP_SHELL_MAX_WIDTH, GamePageHeader, PageLayout } from './PageLayout';
import { getGameSeriesSnapshot } from '../data/gameSeriesCatalog';
import { track } from '../lib/analytics';
import { BrandPill, EmptyState, IconActionButton, SectionHeading, SurfaceCard, type BrandPalette } from './BrandPrimitives';

function speakText(text: string, lang: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

export function ThemeHubGameCard({
  game,
  index,
  palette,
  onClick,
  speakLang = 'zh-CN',
}: {
  game: GameConfig;
  index: number;
  palette: BrandPalette;
  onClick: () => void;
  speakLang?: string;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const series = getGameSeriesSnapshot(game.id);
  const ageRangeLabel = getAgeRangeLabel(game);

  const handleSpeak = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsSpeaking(true);
    speakText(game.name, speakLang);
    window.setTimeout(() => setIsSpeaking(false), game.name.length * 400 + 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ scale: 1.015, y: -4 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <SurfaceCard
        borderColor={palette.border}
        background={`linear-gradient(135deg, ${palette.soft}, rgba(255, 255, 255, 0.98))`}
        shadow={`0 10px 24px ${palette.primary}1A`}
        style={{
          padding: '24px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '18px', alignItems: 'start' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '22px',
              background: 'rgba(255, 255, 255, 0.72)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
            }}
          >
            {game.icon}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 900,
                  color: palette.text ?? 'var(--color-text-primary)',
                }}
              >
                {game.name}
              </h3>
              <IconActionButton
                icon="🔉"
                activeIcon="🔊"
                active={isSpeaking}
                label="播放名称"
                onClick={handleSpeak}
                background="rgba(255, 255, 255, 0.75)"
                activeBackground={palette.gradient}
                color={isSpeaking ? '#FFFFFF' : palette.primary}
              />
            </div>

            <p
              style={{
                margin: '0 0 12px',
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
              }}
            >
              {game.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <BrandPill background="rgba(255, 255, 255, 0.82)" color={palette.primary}>
                {series?.ladderLabel ?? '入门 - 挑战'}
              </BrandPill>
              {series ? <BrandPill background="rgba(255,255,255,0.68)" color={palette.primary}>{series.stageLabel}</BrandPill> : null}
              {series ? <BrandPill background="rgba(255,255,255,0.68)" color={palette.primary}>{series.bankLabel}</BrandPill> : null}
              <BrandPill background={`${palette.primary}12`} color={palette.primary}>
                适龄 {ageRangeLabel}
              </BrandPill>
            </div>
          </div>

          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '16px',
              background: palette.gradient,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 900,
              boxShadow: `0 8px 16px ${palette.primary}33`,
            }}
          >
            →
          </div>
        </div>
      </SurfaceCard>
    </motion.div>
  );
}

export function ThemeHubPage({
  themeId,
  trackingTheme,
  title,
  icon,
  subtitle,
  palette,
  speakLang,
}: {
  themeId: string;
  trackingTheme: string;
  title: string;
  icon: string;
  subtitle: string;
  palette: BrandPalette;
  speakLang?: string;
}) {
  const navigate = useNavigate();
  const games = getGamesByTheme(themeId);

  const handleGameSelect = useCallback(
    (game: GameConfig) => {
      track('theme_game_select', { gameId: game.id, gameName: game.name, theme: trackingTheme });
      navigate(game.path);
    },
    [navigate, trackingTheme]
  );

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <PageLayout maxWidth={APP_SHELL_MAX_WIDTH}>
      <GamePageHeader
        title={title}
        icon={icon}
        subtitle={subtitle}
        gradient={palette.gradient}
        progressColor={palette.primary}
        onBack={handleBack}
      />

      <SurfaceCard
        borderColor={palette.border}
        background={`linear-gradient(135deg, ${palette.soft}, rgba(255,255,255,0.96))`}
        style={{ padding: '26px 28px', marginBottom: '24px' }}
      >
        <SectionHeading
          eyebrow="Theme hub"
          title={`从 ${title} 里选择今天的主线`}
          description="统一采用“先选世界，再进具体挑战”的入口结构，让孩子始终知道自己在哪里、接下来玩什么。"
          accent={palette.primary}
        />
      </SurfaceCard>

      <div style={{ display: 'grid', gap: '18px' }}>
        {games.map((game, index) => (
          <ThemeHubGameCard
            key={game.id}
            game={game}
            index={index}
            palette={palette}
            speakLang={speakLang}
            onClick={() => handleGameSelect(game)}
          />
        ))}
      </div>

      {games.length === 0 ? (
        <div style={{ marginTop: '20px' }}>
          <EmptyState emoji="🎮" title="更多内容准备中" description="这个世界的后续关卡正在装载，先去别的世界探索也可以。" accent={palette.primary} />
        </div>
      ) : null}
    </PageLayout>
  );
}
