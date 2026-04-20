import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { getGameSeriesConfig } from '../../data/gameSeriesCatalog';

type WordPair = { word: string; emoji: string; hint: string };

type StageConfig = {
  id: string;
  title: string;
  difficultyLabel: string;
  summary: string;
  pairCount: number;
  bank: WordPair[];
};

const WORD_STAGES: StageConfig[] = [
  {
    id: 'animals',
    title: '动物乐园',
    difficultyLabel: '入门',
    summary: '先从最熟悉的小动物开始，建立单词和图像的稳定映射。',
    pairCount: 4,
    bank: [
      { word: 'CAT', emoji: '🐱', hint: 'cat' },
      { word: 'DOG', emoji: '🐶', hint: 'dog' },
      { word: 'BIRD', emoji: '🐦', hint: 'bird' },
      { word: 'FISH', emoji: '🐟', hint: 'fish' },
      { word: 'FROG', emoji: '🐸', hint: 'frog' },
      { word: 'DUCK', emoji: '🦆', hint: 'duck' },
      { word: 'LION', emoji: '🦁', hint: 'lion' },
      { word: 'MONKEY', emoji: '🐵', hint: 'monkey' },
      { word: 'RABBIT', emoji: '🐰', hint: 'rabbit' },
      { word: 'PANDA', emoji: '🐼', hint: 'panda' },
    ],
  },
  {
    id: 'daily-life',
    title: '生活派对',
    difficultyLabel: '进阶',
    summary: '把食物、玩具和常见物品放进连续记忆任务里。',
    pairCount: 5,
    bank: [
      { word: 'BOOK', emoji: '📚', hint: 'book' },
      { word: 'BALL', emoji: '⚽', hint: 'ball' },
      { word: 'CAKE', emoji: '🎂', hint: 'cake' },
      { word: 'APPLE', emoji: '🍎', hint: 'apple' },
      { word: 'CHAIR', emoji: '🪑', hint: 'chair' },
      { word: 'CAR', emoji: '🚗', hint: 'car' },
      { word: 'CUP', emoji: '🥤', hint: 'cup' },
      { word: 'MILK', emoji: '🥛', hint: 'milk' },
      { word: 'BAG', emoji: '🎒', hint: 'bag' },
      { word: 'BED', emoji: '🛏️', hint: 'bed' },
    ],
  },
  {
    id: 'world-mix',
    title: '世界混搭',
    difficultyLabel: '挑战',
    summary: '混合自然、场景和动作线索，挑战更快的注意力切换。',
    pairCount: 6,
    bank: [
      { word: 'SUN', emoji: '☀️', hint: 'sun' },
      { word: 'MOON', emoji: '🌙', hint: 'moon' },
      { word: 'STAR', emoji: '⭐', hint: 'star' },
      { word: 'TREE', emoji: '🌳', hint: 'tree' },
      { word: 'RAIN', emoji: '🌧️', hint: 'rain' },
      { word: 'TRAIN', emoji: '🚆', hint: 'train' },
      { word: 'PLANE', emoji: '✈️', hint: 'plane' },
      { word: 'BOAT', emoji: '⛵', hint: 'boat' },
      { word: 'FLOWER', emoji: '🌸', hint: 'flower' },
      { word: 'HOUSE', emoji: '🏠', hint: 'house' },
    ],
  },
];

type CardData = {
  id: string;
  pairId: number;
  type: 'word' | 'emoji';
  content: string;
  hint: string;
};

type CardState = 'hidden' | 'revealed' | 'matched';

function speakWord(word: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.toLowerCase());
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildCards(pairs: WordPair[]): CardData[] {
  const cards: CardData[] = [];
  pairs.forEach((pair, idx) => {
    cards.push({ id: `${pair.word}-word-${idx}`, pairId: idx, type: 'word', content: pair.word, hint: pair.hint });
    cards.push({ id: `${pair.word}-emoji-${idx}`, pairId: idx, type: 'emoji', content: pair.emoji, hint: pair.hint });
  });
  return shuffleArray(cards);
}

function FlipCard({
  card,
  state,
  onClick,
  isWrong,
}: {
  card: CardData;
  state: CardState;
  onClick: () => void;
  isWrong: boolean;
}) {
  const isRevealed = state === 'revealed' || state === 'matched';

  return (
    <motion.div
      whileTap={{ scale: state === 'hidden' ? 0.94 : 1 }}
      onClick={state === 'hidden' ? onClick : undefined}
      style={{
        width: '80px',
        height: '80px',
        perspective: '600px',
        cursor: state === 'hidden' ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '14px',
            background: isWrong
              ? 'linear-gradient(135deg, #FFCDD2, #EF9A9A)'
              : 'linear-gradient(135deg, #4CAF50, #66BB6A)',
            border: isWrong ? '3px solid #E53935' : '3px solid #388E3C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
          }}
        >
          {isWrong ? '❌' : '❓'}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '14px',
            background:
              state === 'matched'
                ? 'linear-gradient(135deg, #C8E6C9, #A5D6A7)'
                : 'linear-gradient(135deg, #FFFFFF, #F1F8E9)',
            border: state === 'matched' ? '3px solid #4CAF50' : '3px solid #81C784',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: card.type === 'emoji' ? '34px' : '14px',
            fontWeight: 900,
            color: '#1B5E20',
            letterSpacing: card.type === 'word' ? '1px' : undefined,
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            flexDirection: 'column',
            gap: '2px',
            padding: '4px',
            textAlign: 'center',
          }}
        >
          {state === 'matched' && <div style={{ fontSize: '10px', color: '#4CAF50' }}>✓</div>}
          <span>{card.content}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WordFlipGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('english-word-flip');
  const series = getGameSeriesConfig('english-word-flip');

  const [stageIndex, setStageIndex] = useState(0);
  const [cards, setCards] = useState<CardData[]>([]);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});
  const [flipped, setFlipped] = useState<string[]>([]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [stageMessage, setStageMessage] = useState('翻开卡片，找到单词和图片的配对！');
  const [startTime, setStartTime] = useState(0);

  const currentStage = WORD_STAGES[stageIndex];
  const totalPairs = useMemo(
    () => WORD_STAGES.reduce((sum, stage) => sum + stage.pairCount, 0),
    []
  );

  const initStage = useCallback(
    (nextStageIndex: number, resetSeries = false) => {
      const stage = WORD_STAGES[nextStageIndex];
      const selectedPairs = shuffleArray(stage.bank).slice(0, stage.pairCount);
      const newCards = buildCards(selectedPairs);
      const initialStates: Record<string, CardState> = {};
      newCards.forEach((card) => {
        initialStates[card.id] = 'hidden';
      });

      setStageIndex(nextStageIndex);
      setCards(newCards);
      setCardStates(initialStates);
      setFlipped([]);
      setWrongIds([]);
      setMoves(0);
      setMatchCount(0);
      setStageMessage(`${stage.title}开始啦：${stage.summary}`);
      if (resetSeries) {
        setTotalMoves(0);
        setTotalMatches(0);
        setCompleted(false);
        setStartTime(Date.now());
      }

      track('game_start', {
        gameId: 'english-word-flip',
        stageId: stage.id,
        pairCount: stage.pairCount,
      });
    },
    []
  );

  useEffect(() => {
    initStage(0, true);
  }, [initStage]);

  const finishSeries = useCallback((finalMoveCount: number) => {
    const durationMs = Date.now() - startTime;
    const stars = finalMoveCount <= totalPairs + 6 ? 3 : finalMoveCount <= totalPairs * 2 ? 2 : 1;
    setCompleted(true);
    setStageMessage('全部系列挑战完成啦，快看看你的总成绩！');
    track('task_complete', {
      success: true,
      duration_ms: durationMs,
      moves: finalMoveCount,
      gameId: 'english-word-flip',
      totalPairs,
    });
    handleGameComplete({
      success: true,
      stars,
      tasksCompleted: totalPairs,
      accuracy: totalPairs / Math.max(finalMoveCount, totalPairs),
      xp: 34,
    });
  }, [handleGameComplete, startTime, totalPairs]);

  const advanceStage = useCallback((finalMoveCount?: number) => {
    if (stageIndex >= WORD_STAGES.length - 1) {
      finishSeries(finalMoveCount ?? totalMoves);
      return;
    }

    initStage(stageIndex + 1);
  }, [finishSeries, initStage, stageIndex, totalMoves]);

  const handleCardClick = useCallback(
    (card: CardData) => {
      if (completed || flipped.length >= 2 || flipped.includes(card.id)) {
        return;
      }

      const newFlipped = [...flipped, card.id];
      setFlipped(newFlipped);
      setCardStates((prev) => ({ ...prev, [card.id]: 'revealed' }));
      speakWord(card.hint);

      if (newFlipped.length === 2) {
        const nextMoves = moves + 1;
        const nextTotalMoves = totalMoves + 1;
        setMoves(nextMoves);
        setTotalMoves(nextTotalMoves);

        const [firstId, secondId] = newFlipped;
        const firstCard = cards.find((item) => item.id === firstId);
        const secondCard = cards.find((item) => item.id === secondId);

        if (!firstCard || !secondCard) {
          return;
        }

        if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
          setStageMessage(`答对啦！${currentStage.title}继续前进。`);
          window.setTimeout(() => {
            const nextMatchCount = matchCount + 1;
            const nextTotalMatches = totalMatches + 1;
            setCardStates((prev) => ({
              ...prev,
              [firstId]: 'matched',
              [secondId]: 'matched',
            }));
            setFlipped([]);
            setMatchCount(nextMatchCount);
            setTotalMatches(nextTotalMatches);

            if (nextMatchCount >= currentStage.pairCount) {
              setStageMessage(`${currentStage.title}完成，准备进入下一站！`);
              window.setTimeout(() => {
                advanceStage(nextTotalMoves);
              }, 700);
            }
          }, 450);
        } else {
          setStageMessage('这两张还不是一对，记住位置再试一次。');
          setWrongIds([firstId, secondId]);
          window.setTimeout(() => {
            setCardStates((prev) => ({
              ...prev,
              [firstId]: 'hidden',
              [secondId]: 'hidden',
            }));
            setFlipped([]);
            setWrongIds([]);
          }, 850);
        }
      }
    },
    [
      advanceStage,
      cards,
      completed,
      currentStage.pairCount,
      currentStage.title,
      flipped,
      matchCount,
      moves,
      totalMatches,
      totalMoves,
    ]
  );

  const handleBack = useCallback(() => {
    navigate('/games/english');
  }, [navigate]);

  const elapsedMs = startTime > 0 ? Date.now() - startTime : 0;

  return (
    <PageLayout maxWidth="760px">
      <GamePageHeader
        title="单词翻翻乐"
        icon="🃏"
        subtitle="沿着 3 个主题关卡连续闯关，把词汇记忆做成一条主线。"
        gradient="linear-gradient(135deg, #4CAF50, #81C784, #26A69A)"
        progressColor="#4CAF50"
        onBack={handleBack}
        backLabel="← 返回英语游乐园"
        currentTask={Math.min(totalMatches + 1, totalPairs)}
        totalTasks={totalPairs}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-xl)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          {[
            { label: '系列路线', value: series?.progressionLabel ?? '三段挑战', note: series?.arcTitle },
            {
              label: '当前级别',
              value: `${currentStage.difficultyLabel} · ${stageIndex + 1}/${WORD_STAGES.length}`,
              note: currentStage.title,
            },
            { label: '本关目标', value: `${matchCount}/${currentStage.pairCount}`, note: currentStage.summary },
            { label: '总翻牌数', value: `${totalMoves}`, note: `总配对 ${totalMatches}/${totalPairs}` },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#F4FBF4',
                borderRadius: '16px',
                padding: '14px',
                border: '2px solid #D6EED8',
              }}
            >
              <div style={{ color: '#607D8B', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#2E7D32', fontWeight: 900, fontSize: '22px' }}>{item.value}</div>
              {item.note && <div style={{ marginTop: '6px', color: '#78909C', fontSize: '12px' }}>{item.note}</div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {WORD_STAGES.map((stage, index) => {
            const active = index === stageIndex && !completed;
            const done = index < stageIndex || completed;
            return (
              <div
                key={stage.id}
                style={{
                  flex: '1 1 180px',
                  borderRadius: '18px',
                  padding: '14px',
                  background: active
                    ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                    : done
                      ? 'linear-gradient(135deg, #F1F8E9, #FFFFFF)'
                      : '#F5F5F5',
                  border: `2px solid ${active ? '#81C784' : done ? '#AED581' : '#E0E0E0'}`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#607D8B', marginBottom: '4px' }}>
                  第 {index + 1} 站 · {stage.difficultyLabel}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1B5E20', marginBottom: '4px' }}>{stage.title}</div>
                <div style={{ color: '#546E7A', fontSize: '13px', lineHeight: 1.6 }}>{stage.summary}</div>
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: '15px', color: '#388E3C', marginBottom: '20px', fontWeight: 600, lineHeight: 1.7 }}>
          {stageMessage}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cards.length > 10 ? 4 : 4}, 80px)`,
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          {cards.map((card) => (
            <FlipCard
              key={card.id}
              card={card}
              state={cardStates[card.id] ?? 'hidden'}
              onClick={() => handleCardClick(card)}
              isWrong={wrongIds.includes(card.id)}
            />
          ))}
        </div>

        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
                borderRadius: '16px',
                padding: '24px',
                border: '3px solid #4CAF50',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#1B5E20', marginBottom: '8px' }}>
                太棒了！整个系列全部通关！
              </h3>
              <p style={{ color: '#388E3C', marginBottom: '16px', lineHeight: 1.7 }}>
                共配对 <strong>{totalPairs}</strong> 组，翻牌 <strong>{totalMoves}</strong> 次，用时{' '}
                <strong>{(elapsedMs / 1000).toFixed(1)}</strong> 秒。
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <Button variant="secondary" onClick={handleBack}>
                  ← 返回
                </Button>
                <Button variant="primary" onClick={() => initStage(0, true)}>
                  再来一轮 🔄
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!completed && (
          <Button variant="secondary" onClick={() => initStage(0, true)}>
            🔄 重新开始系列
          </Button>
        )}
      </motion.div>
    </PageLayout>
  );
}
