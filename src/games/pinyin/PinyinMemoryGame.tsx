import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { useGameStore } from '../../stores/useGameStore';
import { useUserStore } from '../../stores/useUserStore';
import { getEffectiveChildAge } from '../../lib/learnerProfile';
import { pinyinUnits, blendPairs } from '../../data/learningContent';
import { track } from '../../lib/analytics';
import { speak, playSuccess, playError } from '../../lib/audio';

type Pair = { id: string; content: string; emoji: string; hint: string };
type Card = { id: string; unitId: string; type: 'syllable' | 'emoji'; content: string; hint: string };
type CardState = 'hidden' | 'revealed' | 'matched';

interface DifficultyLevel {
  id: string;
  name: string;
  pairs: number;
  gridCols: number;
  color: string;
  allowedTypes: string[];
}

const LEVELS: DifficultyLevel[] = [
  { id: 'easy', name: '入门 (3x3)', pairs: 4, gridCols: 3, color: '#4CAF50', allowedTypes: ['initial'] },
  { id: 'normal', name: '进阶 (3x4)', pairs: 6, gridCols: 4, color: '#FF9800', allowedTypes: ['initial', 'final'] },
  { id: 'hard', name: '挑战 (4x4)', pairs: 8, gridCols: 4, color: '#F44336', allowedTypes: ['initial', 'final', 'overall', 'blend'] },
];

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildCards(pairs: Pair[], is3x3: boolean) {
  const baseCards = pairs.flatMap((pair) => [
    { id: `syllable-${pair.id}`, unitId: pair.id, type: 'syllable' as const, content: pair.content, hint: pair.hint },
    { id: `emoji-${pair.id}`, unitId: pair.id, type: 'emoji' as const, content: pair.emoji, hint: pair.hint },
  ]);

  if (is3x3 && baseCards.length === 8) {
    // Add a lucky 9th card for 3x3 grid
    baseCards.push({
      id: 'lucky-star',
      unitId: 'lucky',
      type: 'emoji' as const,
      content: '⭐',
      hint: '幸运之星'
    });
  }

  return shuffle(baseCards);
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
            padding: '4px',
          }}
        >
          <span style={{ fontSize: card.content.length > 2 ? '22px' : '28px' }}>{card.content}</span>
          {card.type === 'syllable' && <span style={{ fontSize: '11px', marginTop: '4px', color: '#8D6E63' }}>{card.hint}</span>}
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function PinyinMemoryGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-memory');
  const recordTaskResult = useGameStore((s) => s.recordTaskResult);
  const currentChild = useUserStore((s) => s.currentChild);
  const age = getEffectiveChildAge(currentChild);

  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(LEVELS[0]);
  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'completed'>('selecting');
  const [cards, setCards] = useState<Card[]>([]);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});
  const [flipped, setFlipped] = useState<string[]>([]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const startLevel = useCallback((level: DifficultyLevel) => {
    // 1. Filter pinyinUnits by level's allowed types and child's age
    let eligibleUnits = pinyinUnits.filter(u => 
      level.allowedTypes.includes(u.type) && 
      age >= (u.minAge || 3) && age <= (u.maxAge || 10)
    );

    // 2. For 'hard' level, also include blends
    if (level.allowedTypes.includes('blend') && age >= 5) {
      const blends = blendPairs.map(p => ({
        id: `pinyin_${p.initial}_${p.final}`,
        type: 'blend',
        content: p.syllable,
        emoji: '🔗',
        example: p.example,
        minAge: 5,
        maxAge: 10
      }));
      eligibleUnits = [...eligibleUnits, ...blends];
    }

    // 3. Fallback if not enough units
    if (eligibleUnits.length < level.pairs) {
      eligibleUnits = [...pinyinUnits];
    }

    const pool = shuffle(eligibleUnits).slice(0, level.pairs).map(u => ({
      id: u.id,
      content: u.content,
      emoji: u.emoji || '✨',
      hint: u.example || ''
    }));

    const nextCards = buildCards(pool, level.gridCols === 3);
    setCards(nextCards);
    setCardStates(Object.fromEntries(nextCards.map((card) => [card.id, 'hidden'])));
    setFlipped([]);
    setWrongIds([]);
    setMatchCount(0);
    setMoves(0);
    setGameState('playing');
    setStartTime(Date.now());
    track('game_start', { gameId: 'pinyin-memory', level: level.id });
  }, [age]);

  const handleCardClick = useCallback(
    (card: Card) => {
      if (gameState !== 'playing' || flipped.length >= 2 || flipped.includes(card.id)) return;

      // Special handling for Lucky Star
      if (card.id === 'lucky-star') {
        setCardStates((current) => ({ ...current, [card.id]: 'revealed' }));
        speak('幸运之星');
        window.setTimeout(() => {
          setCardStates((current) => ({ ...current, [card.id]: 'matched' }));
          setMatchCount((current) => {
            const nextCount = current + 1;
            // Note: In 3x3 mode, pairs: 4 means 8 cards + 1 lucky = 9 cards. 
            // Total matches needed is 5 (4 pairs + 1 lucky).
            // But we'll adjust the logic below.
            return current; // MatchCount for real pairs only? 
            // Actually, let's just make it work naturally.
          });
        }, 500);
        return;
      }

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

        if (firstCard.unitId === secondCard.unitId && firstCard.type !== secondCard.type) {
          // Record success for this unit in the learning store
          recordTaskResult({
            taskId: `memory-${firstCard.unitId}-${Date.now()}`,
            knowledgeUnitId: firstCard.unitId,
            success: true,
            skill: 'pinyin',
            stars: 0,
          });

          playSuccess();

          window.setTimeout(() => {
            setCardStates((current) => ({ ...current, [firstId]: 'matched', [secondId]: 'matched' }));
            setFlipped([]);
            setMatchCount((current) => {
              const nextCount = current + 1;
              const isWin = currentLevel.gridCols === 3 
                ? nextCount === currentLevel.pairs // 4 pairs matched
                : nextCount === currentLevel.pairs;

              // Check if all matched (including lucky star)
              const allMatched = Object.values({ ...cardStates, [firstId]: 'matched', [secondId]: 'matched' })
                .filter(s => s === 'matched').length === cards.length;

              if (allMatched || nextCount === currentLevel.pairs) {
                const durationMs = Date.now() - startTime;
                const stars = moves + 1 <= currentLevel.pairs + 2 ? 3 : moves + 1 <= currentLevel.pairs * 2 ? 2 : 1;
                setGameState('completed');
                handleGameComplete({
                  success: true,
                  stars,
                  tasksCompleted: currentLevel.pairs,
                  accuracy: 1,
                  xp: currentLevel.pairs * 6,
                });
                track('task_complete', { gameId: 'pinyin-memory', level: currentLevel.id, duration_ms: durationMs, moves: moves + 1 });
              }
              return nextCount;
            });
          }, 420);
        } else {
          setWrongIds([firstId, secondId]);
          playError();
          window.setTimeout(() => {
            setCardStates((prev) => ({ ...prev, [firstId]: 'hidden', [secondId]: 'hidden' }));
            setFlipped([]);
            setWrongIds([]);
          }, 840);
        }
      }
    },
    [cards, gameState, flipped, handleGameComplete, moves, startTime, currentLevel, recordTaskResult, cardStates]
  );

  const handleBack = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('selecting');
    } else {
      navigate('/games/pinyin');
    }
  }, [gameState, navigate]);

  return (
    <div style={{ width: '100%', maxWidth: '620px', margin: '0 auto', padding: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="secondary" onClick={handleBack}>
          ← {gameState === 'playing' ? '重选难度' : '返回拼音冒险岛'}
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
        
        {gameState === 'selecting' ? (
          <>
            <p style={{ margin: '0 0 24px 0', color: '#6D4C41', fontWeight: 600 }}>
              选择一个挑战级别开始游戏吧！
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {LEVELS.map((lvl) => (
                <motion.button
                  key={lvl.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentLevel(lvl);
                    startLevel(lvl);
                  }}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: 'none',
                    background: lvl.color,
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  {lvl.name}
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 18px 0', color: '#6D4C41', fontWeight: 600 }}>
              翻开卡片，把拼音和对应小线索配成一对！
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '20px' }}>
              {[
                { label: '已配对', value: matchCount, color: '#FB8C00' },
                { label: '翻牌次数', value: moves, color: '#8E24AA' },
                { label: '总配对', value: currentLevel.pairs, color: '#039BE5' },
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
                gridTemplateColumns: `repeat(${currentLevel.gridCols}, 86px)`,
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
              {gameState === 'completed' && (
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
                  <p style={{ margin: 0, color: '#6D4C41', fontWeight: 700 }}>
                    你用 {moves} 次就完成了 {currentLevel.name}，真棒！
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {gameState === 'completed' && (
                <Button variant="secondary" onClick={() => setGameState('selecting')}>
                  重选难度
                </Button>
              )}
              <Button variant={gameState === 'completed' ? 'primary' : 'secondary'} onClick={() => startLevel(currentLevel)}>
                再来一局
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
