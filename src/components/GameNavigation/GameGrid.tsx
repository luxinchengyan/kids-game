import type { GameConfig } from '../../games/registry';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: GameConfig[];
  onGameSelect: (game: GameConfig) => void;
}

export function GameGrid({ games, onGameSelect }: GameGridProps) {
  return (
    <section
      aria-labelledby="home-game-grid-title"
      style={{
        marginTop: 'var(--spacing-2xl)',
        marginBottom: 'var(--spacing-2xl)',
        padding: '0 var(--spacing-md) var(--spacing-xl)',
      }}
    >
      <h2
        id="home-game-grid-title"
        style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 'var(--spacing-xl)',
          color: 'var(--color-text-primary)',
        }}
      >
        🎮 选择你的冒险之旅
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          fontWeight: 700,
          margin: '0 auto var(--spacing-xl)',
          maxWidth: '720px',
          lineHeight: 1.7,
        }}
      >
        每张卡片都会直接进入一个主线世界，优先从推荐世界开始，再按兴趣继续探索。
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '24px',
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--spacing-md)',
        }}
      >
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            onClick={() => onGameSelect(game)}
          />
        ))}
      </div>
    </section>
  );
}
