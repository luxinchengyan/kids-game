import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';

// Import pinyin data
const fullPinyinData = {
  initials: [
    { id: 'pinyin_b', content: 'b', example: '菠萝', emoji: '🍍', confusionSet: ['p', 'd'] },
    { id: 'pinyin_p', content: 'p', example: '苹果', emoji: '🍎', confusionSet: ['b', 'f'] },
    { id: 'pinyin_m', content: 'm', example: '妈妈', emoji: '👩', confusionSet: ['n', 'f'] },
    { id: 'pinyin_f', content: 'f', example: '飞机', emoji: '✈️', confusionSet: ['h', 'p'] },
    { id: 'pinyin_d', content: 'd', example: '大象', emoji: '🐘', confusionSet: ['t', 'b'] },
    { id: 'pinyin_t', content: 't', example: '兔子', emoji: '🐰', confusionSet: ['d', 'p'] },
    { id: 'pinyin_n', content: 'n', example: '奶牛', emoji: '🐄', confusionSet: ['l', 'm'] },
    { id: 'pinyin_l', content: 'l', example: '老虎', emoji: '🐯', confusionSet: ['n', 'r'] },
    { id: 'pinyin_g', content: 'g', example: '公鸡', emoji: '🐔', confusionSet: ['k', 'h'] },
    { id: 'pinyin_k', content: 'k', example: '蝌蚪', emoji: '🐸', confusionSet: ['g', 'h'] },
    { id: 'pinyin_h', content: 'h', example: '河马', emoji: '🦛', confusionSet: ['g', 'f'] },
  ],
  finals: [
    { id: 'pinyin_a', content: 'a', example: '啊', emoji: '😮', confusionSet: ['o', 'e'] },
    { id: 'pinyin_o', content: 'o', example: '哦', emoji: '⭕', confusionSet: ['e', 'u'] },
    { id: 'pinyin_e', content: 'e', example: '鹅', emoji: '🦢', confusionSet: ['o', 'a'] },
    { id: 'pinyin_i', content: 'i', example: '衣服', emoji: '👔', confusionSet: ['ü', 'u'] },
    { id: 'pinyin_u', content: 'u', example: '乌龟', emoji: '🐢', confusionSet: ['ü', 'o'] },
    { id: 'pinyin_ai', content: 'ai', example: '阿姨', emoji: '👩', confusionSet: ['ei', 'ao'] },
    { id: 'pinyin_ei', content: 'ei', example: '诶', emoji: '🤔', confusionSet: ['ai', 'ui'] },
  ],
  overall: [
    { id: 'pinyin_zhi', content: 'zhi', example: '蜘蛛', emoji: '🕷️', confusionSet: ['zi', 'chi'] },
    { id: 'pinyin_chi', content: 'chi', example: '吃饭', emoji: '🍜', confusionSet: ['ci', 'zhi'] },
    { id: 'pinyin_shi', content: 'shi', example: '狮子', emoji: '🦁', confusionSet: ['si', 'ri'] },
    { id: 'pinyin_ri', content: 'ri', example: '日出', emoji: '🌅', confusionSet: ['shi'] },
    { id: 'pinyin_zi', content: 'zi', example: '写字', emoji: '✍️', confusionSet: ['zhi', 'ci'] },
  ],
};

// Difficulty settings
const difficultySettings = {
  easy: {
    moleCount: 3,
    showTime: 3000,
    spawnInterval: 1500,
    pinyinPool: 'initials',
    roundCount: 8,
  },
  medium: {
    moleCount: 4,
    showTime: 2000,
    spawnInterval: 1200,
    pinyinPool: 'mixed',
    roundCount: 10,
  },
  hard: {
    moleCount: 5,
    showTime: 1200,
    spawnInterval: 900,
    pinyinPool: 'all',
    roundCount: 12,
  },
};

interface Mole {
  id: string;
  pinyin: string;
  example: string;
  emoji: string;
  position: number;
  isActive: boolean;
  isCorrect: boolean;
  appearedAt: number;
}

interface Feedback {
  type: 'correct' | 'wrong' | 'missed';
  message: string;
  timestamp: number;
}

type GamePhase = 'start' | 'playing' | 'results';
type Difficulty = 'easy' | 'medium' | 'hard';

// Utility functions
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

function getPinyinPool(poolType: string) {
  let pool: any[] = [];
  if (poolType === 'initials' || poolType === 'mixed') {
    pool = [...fullPinyinData.initials];
  }
  if (poolType === 'mixed' || poolType === 'all') {
    pool = [...pool, ...fullPinyinData.finals];
  }
  if (poolType === 'all') {
    pool = [...pool, ...fullPinyinData.overall];
  }
  return pool;
}

export default function PinyinWhackAMole() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('pinyin-whack-a-mole');
  
  const [phase, setPhase] = useState<GamePhase>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [correctHits, setCorrectHits] = useState(0);
  const [wrongHits, setWrongHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [moles, setMoles] = useState<Mole[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [targetPinyin, setTargetPinyin] = useState<any>(null);
  
  const gameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start game
  const startGame = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setPhase('playing');
    setScore(0);
    setCurrentRound(1);
    setCorrectHits(0);
    setWrongHits(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalRounds(difficultySettings[selectedDifficulty].roundCount);
    
    track('game_start', { gameId: 'pinyin-whack-a-mole', difficulty: selectedDifficulty });
  }, []);

  // Spawn moles for a round
  const spawnMoles = useCallback(() => {
    const settings = difficultySettings[difficulty];
    const pool = getPinyinPool(settings.pinyinPool);
    const target = pool[Math.floor(Math.random() * pool.length)];
    
    setTargetPinyin(target);
    speakText(`找出 ${target.content}，${target.example}`);

    // Select distractors
    const distractors = shuffle(pool.filter(p => p.content !== target.content))
      .slice(0, settings.moleCount - 1);
    
    const allPinyin = shuffle([target, ...distractors]);
    const positions = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, settings.moleCount);

    const newMoles: Mole[] = allPinyin.map((p, i) => ({
      id: `mole-${Date.now()}-${i}`,
      pinyin: p.content,
      example: p.example,
      emoji: p.emoji,
      position: positions[i],
      isActive: true,
      isCorrect: p.content === target.content,
      appearedAt: Date.now(),
    }));

    setMoles(newMoles);

    // Auto-hide moles after showTime
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    gameTimerRef.current = setTimeout(() => {
      setMoles(prev => prev.map(m => ({ ...m, isActive: false })));
      
      // Check if correct mole was missed
      const hadCorrect = newMoles.some(m => m.isCorrect);
      if (hadCorrect) {
        setCombo(0);
        setFeedback({ type: 'missed', message: '地鼠跑掉了!', timestamp: Date.now() });
        setTimeout(() => setFeedback(null), 1000);
      }
      
      // Move to next round
      setTimeout(() => {
        setCurrentRound(prev => {
          if (prev >= totalRounds) {
            endGame();
            return prev;
          }
          return prev + 1;
        });
      }, 500);
    }, settings.showTime);
  }, [difficulty, totalRounds]);

  // Handle mole click
  const handleMoleClick = useCallback((mole: Mole) => {
    if (!mole.isActive) return;

    if (mole.isCorrect) {
      const newCombo = combo + 1;
      const points = 10 * newCombo;
      setScore(prev => prev + points);
      setCorrectHits(prev => prev + 1);
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setFeedback({ type: 'correct', message: '太棒了!', timestamp: Date.now() });
      
      track('mole_hit', { correct: true, combo: newCombo, points, responseTime: Date.now() - mole.appearedAt });
      
      // Clear moles and move to next round
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
      setMoles(prev => prev.map(m => ({ ...m, isActive: false })));
      
      setTimeout(() => {
        setFeedback(null);
        setCurrentRound(prev => {
          if (prev >= totalRounds) {
            endGame();
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setWrongHits(prev => prev + 1);
      setCombo(0);
      setFeedback({ type: 'wrong', message: '再想想!', timestamp: Date.now() });
      
      track('mole_hit', { correct: false, combo: 0, points: -5 });
    }
  }, [combo, totalRounds]);

  // End game
  const endGame = useCallback(() => {
    setPhase('results');
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);

    const accuracy = correctHits + wrongHits > 0 ? correctHits / (correctHits + wrongHits) : 0;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;

    track('game_complete', {
      gameId: 'pinyin-whack-a-mole',
      difficulty,
      score,
      accuracy,
      stars,
      maxCombo,
    });

    handleGameComplete({
      success: accuracy >= 0.5,
      stars,
      xp: score,
      tasksCompleted: totalRounds,
      accuracy,
    });
  }, [correctHits, wrongHits, score, maxCombo, difficulty, totalRounds, handleGameComplete]);

  // Spawn moles when round changes
  useEffect(() => {
    if (phase === 'playing' && currentRound > 0 && currentRound <= totalRounds) {
      const timeout = setTimeout(spawnMoles, 500);
      return () => clearTimeout(timeout);
    }
  }, [phase, currentRound, totalRounds, spawnMoles]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  const handleBack = useCallback(() => {
    navigate('/games/pinyin');
  }, [navigate]);

  const handleReplay = useCallback(() => {
    startGame(difficulty);
  }, [difficulty, startGame]);

  // Calculate stars for results
  const accuracy = correctHits + wrongHits > 0 ? correctHits / (correctHits + wrongHits) : 0;
  const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;

  // START SCREEN
  if (phase === 'start') {
    return (
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <motion.h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#FF9800',
              marginBottom: '16px',
            }}
          >
            🔨 拼音打地鼠
          </motion.h1>
          <p style={{ fontSize: '20px', color: '#6D4C41', marginBottom: '40px' }}>
            找出正确地鼠，敲击它获得分数！
          </p>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#3E2723', marginBottom: '16px' }}>
              选择难度
            </h3>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <motion.button
                  key={diff}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame(diff)}
                  style={{
                    padding: '20px 32px',
                    borderRadius: '16px',
                    border: '3px solid #FFB74D',
                    background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
                    cursor: 'pointer',
                    minWidth: '150px',
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>
                    {diff === 'easy' ? '🌱' : diff === 'medium' ? '🌟' : '🔥'}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#3E2723' }}>
                    {diff === 'easy' ? '入门' : diff === 'medium' ? '进阶' : '挑战'}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <Button variant="secondary" onClick={handleBack}>
            ← 返回拼音岛
          </Button>
        </motion.div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (phase === 'results') {
    return (
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            style={{ fontSize: '80px', marginBottom: '16px' }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            🎉
          </motion.div>
          
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#FF9800', marginBottom: '24px' }}>
            游戏结束！
          </h2>

          <div
            style={{
              background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px',
              border: '3px solid #FFB74D',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '24px' }}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#FF9800' }}>{score}</div>
                <div style={{ fontSize: '16px', color: '#6D4C41' }}>总分</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#4CAF50' }}>
                  {Math.round(accuracy * 100)}%
                </div>
                <div style={{ fontSize: '16px', color: '#6D4C41' }}>正确率</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#2196F3' }}>
                  {correctHits}/{correctHits + wrongHits}
                </div>
                <div style={{ fontSize: '16px', color: '#6D4C41' }}>正确/总数</div>
              </div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#9C27B0' }}>🔥 {maxCombo}</div>
                <div style={{ fontSize: '16px', color: '#6D4C41' }}>最大连击</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={handleReplay}>
              🔄 再玩一次
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              ← 返回拼音岛
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // PLAYING SCREEN
  return (
    <div style={{ width: '100%', maxWidth: '700px' }}>
      {/* HUD */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
          borderRadius: '16px',
          border: '2px solid #FFB74D',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#FF9800' }}>{score}</div>
          <div style={{ fontSize: '14px', color: '#6D4C41' }}>分数</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#3E2723' }}>
            {currentRound}/{totalRounds}
          </div>
          <div style={{ fontSize: '14px', color: '#6D4C41' }}>回合</div>
        </div>
        {combo > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#9C27B0' }}>
              🔥 {combo}
            </div>
            <div style={{ fontSize: '14px', color: '#6D4C41' }}>连击</div>
          </div>
        )}
        <Button variant="secondary" onClick={handleBack}>
          退出
        </Button>
      </div>

      {/* Target Prompt */}
      {targetPinyin && (
        <motion.div
          key={`target-${currentRound}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
            borderRadius: '16px',
            border: '3px solid #2196F3',
          }}
        >
          <div style={{ fontSize: '18px', color: '#1976D2', marginBottom: '8px' }}>找出：</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#1976D2' }}>
            {targetPinyin.content} {targetPinyin.emoji}
          </div>
          <div style={{ fontSize: '20px', color: '#42A5F5', marginTop: '8px' }}>
            {targetPinyin.example}
          </div>
        </motion.div>
      )}

      {/* Mole Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => {
          const mole = moles.find(m => m.position === position);
          return (
            <MoleHole
              key={position}
              position={position}
              mole={mole || null}
              onClick={mole ? () => handleMoleClick(mole) : undefined}
            />
          );
        })}
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            key={feedback.timestamp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '24px 48px',
              borderRadius: '20px',
              background: feedback.type === 'correct' ? '#4CAF50' : feedback.type === 'wrong' ? '#F44336' : '#FF9800',
              color: 'white',
              fontSize: '32px',
              fontWeight: 900,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              zIndex: 1000,
            }}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mole Hole Component
function MoleHole({ position, mole, onClick }: { position: number; mole: Mole | null; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      style={{
        aspectRatio: '1',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #8D6E63, #6D4C41)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 8px 16px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
        border: '4px solid #5D4037',
      }}
    >
      <AnimatePresence>
        {mole && mole.isActive && (
          <motion.div
            initial={{ y: 100, scale: 0.5 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              textAlign: 'center',
              position: 'absolute',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '4px' }}>{mole.emoji}</div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 900,
                color: '#FFFFFF',
                background: 'rgba(0,0,0,0.6)',
                padding: '4px 12px',
                borderRadius: '12px',
              }}
            >
              {mole.pinyin}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
