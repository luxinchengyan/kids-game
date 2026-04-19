import type { GameConfig } from '../../games/registry';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: GameConfig[];
  onGameSelect: (game: GameConfig) => void;
}

export function GameGrid({ games, onGameSelect }: GameGridProps) {
  return (
    <section
      style={{
        marginTop: 'var(--spacing-2xl)',
        padding: '0 var(--spacing-md)',
      }}
    >
      <h2
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
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
