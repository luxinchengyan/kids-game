import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { speak } from '../../lib/audio';

type Pair = { syllable: string; emoji: string; hint: string };
type Card = { id: string; pairId: number; type: 'syllable' | 'emoji'; content: string; hint: string };
type CardState = 'hidden' | 'revealed' | 'matched';

const PAIRS: Pair[] = [
  { syllable: 'b', emoji: '🍍', hint: '菠萝' },
  { syllable: 'm', emoji: '👩', hint: '妈妈' },
  { syllable: 'q', emoji: '🎈', hint: '气球' },
  { syllable: 'x', emoji: '🍉', hint: '西瓜' },
  { syllable: 'zh', emoji: '🕷️', hint: '蜘蛛' },
  { syllable: 'sh', emoji: '🦁', hint: '狮子' },
];

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildCards() {
  return shuffle(
    PAIRS.flatMap((pair, pairId) => [
      { id: `syllable-${pairId}`, pairId, type: 'syllable' as const, content: pair.syllable, hint: pair.hint },
      { id: `emoji-${pairId}`, pairId, type: 'emoji' as const, content: pair.emoji, hint: pair.hint },
    ])
  );
}

function FlipCard({
  card,
  state,
  isWrong,
  onClick,
}: {
  card: Card;
  state: CardState;
  isWrong: boolean;
  onClick: () => void;
}) {
  const isRevealed = state === 'revealed' || state === 'matched';

  return (
    <motion.button
      type="button"
      whileTap={{ scale: state === 'hidden' ? 0.95 : 1 }}
      onClick={state === 'hidden' ? onClick : undefined}
      style={{
        width: '86px',
        height: '86px',
        perspective: '600px',
        cursor: state === 'hidden' ? 'pointer' : 'default',
        border: 'none',
        background: 'transparent',
        padding: 0,
      }}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '18px',
            background: isWrong ? 'linear-gradient(135deg, #FFCDD2, #EF9A9A)' : 'linear-gradient(135deg, #FFB74D, #FFA726)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            fontWeight: 900,
            color: '#FFFFFF',
            boxShadow: '0 6px 14px rgba(0,0,0,0.16)',
          }}
        >
          {isWrong ? '❌' : '拼'}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '18px',
            background:
              state === 'matched'
                ? 'linear-gradient(135deg, #FFF3E0, #FFE0B2)'
                : 'linear-gradient(135deg, #FFFFFF, #FFF8E1)',
            border: `3px solid ${state === 'matched' ? '#FB8C00' : '#FFCC80'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#6D4C41',
            fontWeight: 900,
            fontSize: card.type === 'emoji' ? '36px' : '28px',
          }}
        >
          <span>{card.content}</span>
          {card.type === 'syllable' && <span style={{ fontSize: '12px', marginTop: '4px' }}>读一读</span>}
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function PinyinMemoryGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-memory');

  const [cards, setCards] = useState<Card[]>([]);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});
  const [flipped, setFlipped] = useState<string[]>([]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const initGame = useCallback(() => {
    const nextCards = buildCards();
    setCards(nextCards);
    setCardStates(Object.fromEntries(nextCards.map((card) => [card.id, 'hidden'])));
    setFlipped([]);
    setWrongIds([]);
    setMatchCount(0);
    setMoves(0);
    setCompleted(false);
    setStartTime(Date.now());
    track('game_start', { gameId: 'pinyin-memory' });
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = useCallback(
    (card: Card) => {
      if (completed || flipped.length >= 2 || flipped.includes(card.id)) return;
      const nextFlipped = [...flipped, card.id];
      setFlipped(nextFlipped);
      setCardStates((current) => ({ ...current, [card.id]: 'revealed' }));
      speak(card.type === 'syllable' ? card.content : card.hint);

      if (nextFlipped.length === 2) {
        setMoves((current) => current + 1);
        const [firstId, secondId] = nextFlipped;
        const firstCard = cards.find((entry) => entry.id === firstId);
        const secondCard = cards.find((entry) => entry.id === secondId);

        if (!firstCard || !secondCard) return;

        if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
          window.setTimeout(() => {
            setCardStates((current) => ({ ...current, [firstId]: 'matched', [secondId]: 'matched' }));
            setFlipped([]);
            setMatchCount((current) => {
              const nextCount = current + 1;
              if (nextCount === PAIRS.length) {
                const durationMs = Date.now() - startTime;
                const stars = moves + 1 <= PAIRS.length + 2 ? 3 : moves + 1 <= PAIRS.length * 2 ? 2 : 1;
                setCompleted(true);
                handleGameComplete({
                  success: true,
                  stars,
                  tasksCompleted: PAIRS.length,
                  accuracy: 1,
                  xp: 24,
                });
                track('task_complete', { gameId: 'pinyin-memory', duration_ms: durationMs, moves: moves + 1 });
              }
              return nextCount;
            });
          }, 420);
        } else {
          setWrongIds([firstId, secondId]);
          window.setTimeout(() => {
            setCardStates((current) => ({ ...current, [firstId]: 'hidden', [secondId]: 'hidden' }));
            setFlipped([]);
            setWrongIds([]);
          }, 840);
        }
      }
    },
    [cards, completed, flipped, handleGameComplete, moves, startTime]
  );

  const handleBack = useCallback(() => {
    navigate('/games/pinyin');
  }, [navigate]);

  return (
    <div style={{ width: '100%', maxWidth: '620px', margin: '0 auto', padding: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="secondary" onClick={handleBack}>
          ← 返回拼音冒险岛
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: '0 0 8px 0', fontSize: '30px', color: '#E65100' }}>🃏 拼音翻翻乐</h2>
        <p style={{ margin: '0 0 18px 0', color: '#6D4C41', fontWeight: 600 }}>
          翻开卡片，把拼音和对应小线索配成一对！
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '20px' }}>
          {[
            { label: '已配对', value: matchCount, color: '#FB8C00' },
            { label: '翻牌次数', value: moves, color: '#8E24AA' },
            { label: '总配对', value: PAIRS.length, color: '#039BE5' },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: item.color }}>{item.value}</div>
              <div style={{ color: '#8D6E63', fontWeight: 700 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 86px)',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '22px',
          }}
        >
          {cards.map((card) => (
            <FlipCard
              key={card.id}
              card={card}
              state={cardStates[card.id] ?? 'hidden'}
              isWrong={wrongIds.includes(card.id)}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
                borderRadius: '20px',
                padding: '24px',
                border: '3px solid #FFB74D',
                marginBottom: '18px',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#E65100', fontSize: '24px' }}>全部配对成功！</h3>
              <p style={{ margin: 0, color: '#6D4C41', fontWeight: 700 }}>你一共翻了 {moves} 次，真棒！</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {completed && (
            <Button variant="secondary" onClick={handleBack}>
              返回
            </Button>
          )}
          <Button variant={completed ? 'primary' : 'secondary'} onClick={initGame}>
            再来一局
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
