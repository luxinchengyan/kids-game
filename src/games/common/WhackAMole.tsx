/**
 * 通用打地鼠游戏框架
 * 可套用到拼音、数学、英语、汉字等不同学习主题
 * 
 * 使用示例：
 * - 拼音打地鼠：找出正确的拼音
 * - 数学打地鼠：找出正确的答案
 * - 英语打地鼠：找出正确的单词
 * - 汉字打地鼠：找出正确的汉字
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { PageLayout } from '../../components/PageLayout';

// ==========================
// 类型定义
// ==========================

/** 地鼠数据项 */
export interface MoleItem {
  id: string;
  /** 显示内容（拼音、数字、单词等） */
  content: string;
  /** 示例或说明 */
  example?: string;
  /** 图标或表情 */
  emoji?: string;
  /** 图片URL（可选） */
  imageUrl?: string;
  /** 干扰项集合（用于增加难度） */
  confusionSet?: string[];
  /** 自定义数据 */
  metadata?: Record<string, any>;
}

/** 难度设置 */
export interface DifficultyConfig {
  /** 同时出现的地鼠数量 */
  moleCount: number;
  /** 地鼠显示时间（毫秒） */
  showTime: number;
  /** 生成间隔（毫秒） */
  spawnInterval: number;
  /** 回合数 */
  roundCount: number;
  /** 数据池配置 */
  dataPool?: string;
  /** 网格大小（3x3, 4x4等） */
  gridSize?: number;
}

/** 游戏主题配置 */
export interface GameThemeConfig {
  /** 主题ID */
  themeId: string;
  /** 游戏名称 */
  gameName: string;
  /** 游戏图标 */
  gameIcon: string;
  /** 主题颜色 */
  themeColor: string;
  /** 主题渐变色 */
  themeGradient: string;
  /** 返回路径 */
  backPath: string;
  /** 获取数据池的函数 */
  getDataPool: (poolType?: string) => MoleItem[];
  /** 判断答案是否正确的函数 */
  checkAnswer: (selected: MoleItem, target: MoleItem) => boolean;
  /** 播放语音的函数 */
  speakText: (text: string, item?: MoleItem) => void;
  /** 生成提示文本 */
  generatePrompt: (target: MoleItem) => string;
  /** 自定义渲染地鼠内容（可选） */
  renderMoleContent?: (item: MoleItem) => React.ReactNode;
}

/** 地鼠实例 */
interface ActiveMole {
  id: string;
  item: MoleItem;
  position: number;
  isActive: boolean;
  isCorrect: boolean;
  appearedAt: number;
}

/** 反馈信息 */
interface Feedback {
  type: 'correct' | 'wrong' | 'missed';
  message: string;
  timestamp: number;
}

/** 游戏阶段 */
export type GamePhase = 'start' | 'playing' | 'results';

/** 难度级别 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// ==========================
// 默认难度配置
// ==========================

export const DEFAULT_DIFFICULTY_SETTINGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    moleCount: 3,
    showTime: 3000,
    spawnInterval: 1500,
    roundCount: 8,
    gridSize: 3, // 3x3 grid
  },
  medium: {
    moleCount: 4,
    showTime: 2000,
    spawnInterval: 1200,
    roundCount: 10,
    gridSize: 3,
  },
  hard: {
    moleCount: 5,
    showTime: 1200,
    spawnInterval: 900,
    roundCount: 12,
    gridSize: 4, // 4x4 grid
  },
};

// ==========================
// 工具函数
// ==========================

/** 数组随机打乱 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** 默认语音合成 */
export function defaultSpeakText(text: string, lang: string = 'zh-CN') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

// ==========================
// 通用打地鼠游戏组件
// ==========================

export interface WhackAMoleProps {
  /** 游戏ID（用于统计和进度追踪） */
  gameId: string;
  /** 主题配置 */
  theme: GameThemeConfig;
  /** 难度配置（可选，覆盖默认配置） */
  difficultySettings?: Partial<Record<DifficultyLevel, DifficultyConfig>>;
  /** 自定义样式（可选） */
  customStyles?: {
    backgroundColor?: string;
    moleColor?: string;
    targetColor?: string;
  };
}

export function WhackAMole({ 
  gameId, 
  theme, 
  difficultySettings,
  customStyles 
}: WhackAMoleProps) {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion(gameId);
  
  const mergedDifficultySettings = {
    ...DEFAULT_DIFFICULTY_SETTINGS,
    ...difficultySettings,
  };

  // 游戏状态
  const [phase, setPhase] = useState<GamePhase>('start');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [correctHits, setCorrectHits] = useState(0);
  const [wrongHits, setWrongHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [moles, setMoles] = useState<ActiveMole[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [targetItem, setTargetItem] = useState<MoleItem | null>(null);
  
  const gameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 开始游戏
  const startGame = useCallback((selectedDifficulty: DifficultyLevel) => {
    setDifficulty(selectedDifficulty);
    setPhase('playing');
    setScore(0);
    setCurrentRound(1);
    setCorrectHits(0);
    setWrongHits(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalRounds(mergedDifficultySettings[selectedDifficulty].roundCount);
    
    track('game_start', { gameId, difficulty: selectedDifficulty });
  }, [gameId, mergedDifficultySettings]);

  // 生成地鼠
  const spawnMoles = useCallback(() => {
    const settings = mergedDifficultySettings[difficulty];
    const pool = theme.getDataPool(settings.dataPool);
    
    if (pool.length === 0) {
      console.warn('No items in data pool');
      return;
    }

    const target = pool[Math.floor(Math.random() * pool.length)];
    setTargetItem(target);
    
    // 播放语音提示
    const prompt = theme.generatePrompt(target);
    theme.speakText(prompt, target);

    // 选择干扰项
    const distractors = shuffle(pool.filter(item => item.id !== target.id))
      .slice(0, settings.moleCount - 1);
    
    const allItems = shuffle([target, ...distractors]);
    const gridSize = settings.gridSize || 3;
    const totalHoles = gridSize * gridSize;
    const positions = shuffle(Array.from({ length: totalHoles }, (_, i) => i))
      .slice(0, settings.moleCount);

    const newMoles: ActiveMole[] = allItems.map((item, i) => ({
      id: `mole-${Date.now()}-${i}`,
      item,
      position: positions[i],
      isActive: true,
      isCorrect: item.id === target.id,
      appearedAt: Date.now(),
    }));

    setMoles(newMoles);

    // 自动隐藏地鼠
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    gameTimerRef.current = setTimeout(() => {
      setMoles(prev => prev.map(m => ({ ...m, isActive: false })));
      
      // 检查是否错过了正确地鼠
      const hadCorrect = newMoles.some(m => m.isCorrect);
      if (hadCorrect) {
        setCombo(0);
        setFeedback({ type: 'missed', message: '地鼠跑掉了!', timestamp: Date.now() });
        setTimeout(() => setFeedback(null), 1000);
      }
      
      // 进入下一回合
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
  }, [difficulty, totalRounds, theme, mergedDifficultySettings]);

  // 处理地鼠点击
  const handleMoleClick = useCallback((mole: ActiveMole) => {
    if (!mole.isActive) return;

    const isCorrect = mole.isCorrect;
    
    if (isCorrect) {
      const newCombo = combo + 1;
      const points = 10 * newCombo;
      setScore(prev => prev + points);
      setCorrectHits(prev => prev + 1);
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setFeedback({ type: 'correct', message: '太棒了!', timestamp: Date.now() });
      
      track('mole_hit', { 
        correct: true, 
        combo: newCombo, 
        points, 
        responseTime: Date.now() - mole.appearedAt,
        gameId 
      });
      
      // 清除地鼠并进入下一回合
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
      
      track('mole_hit', { 
        correct: false, 
        combo: 0, 
        points: -5,
        gameId 
      });
    }
  }, [combo, totalRounds, gameId]);

  // 结束游戏
  const endGame = useCallback(() => {
    setPhase('results');
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);

    const accuracy = correctHits + wrongHits > 0 ? correctHits / (correctHits + wrongHits) : 0;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;

    track('game_complete', {
      gameId,
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
  }, [correctHits, wrongHits, score, maxCombo, difficulty, totalRounds, gameId, handleGameComplete]);

  // 回合变化时生成地鼠
  useEffect(() => {
    if (phase === 'playing' && currentRound > 0 && currentRound <= totalRounds) {
      const timeout = setTimeout(spawnMoles, 500);
      return () => clearTimeout(timeout);
    }
  }, [phase, currentRound, totalRounds, spawnMoles]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  const handleBack = useCallback(() => {
    navigate(theme.backPath);
  }, [navigate, theme.backPath]);

  const handleReplay = useCallback(() => {
    startGame(difficulty);
  }, [difficulty, startGame]);

  // 计算星级
  const accuracy = correctHits + wrongHits > 0 ? correctHits / (correctHits + wrongHits) : 0;
  const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;
  const gridSize = mergedDifficultySettings[difficulty].gridSize || 3;
  const totalHoles = gridSize * gridSize;

  // ==========================
  // 渲染：开始界面
  // ==========================
  if (phase === 'start') {
    return (
      <PageLayout maxWidth="700px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <motion.h1
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: theme.themeColor,
              marginBottom: '16px',
            }}
          >
            {theme.gameIcon} {theme.gameName}
          </motion.h1>
          <p style={{ fontSize: '20px', color: '#6D4C41', marginBottom: '40px' }}>
            找出正确地鼠，敲击它获得分数！
          </p>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#3E2723', marginBottom: '16px' }}>
              选择难度
            </h3>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((diff) => (
                <motion.button
                  key={diff}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame(diff)}
                  style={{
                    padding: '20px 32px',
                    borderRadius: '16px',
                    border: `3px solid ${theme.themeColor}`,
                    background: theme.themeGradient,
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
            ← 返回
          </Button>
        </motion.div>
      </PageLayout>
    );
  }

  // ==========================
  // 渲染：结果界面
  // ==========================
  if (phase === 'results') {
    return (
      <PageLayout maxWidth="700px">
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
          
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: theme.themeColor, marginBottom: '24px' }}>
            游戏结束！
          </h2>

          <div
            style={{
              background: theme.themeGradient,
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px',
              border: `3px solid ${theme.themeColor}`,
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '24px' }}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: theme.themeColor }}>{score}</div>
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
              ← 返回
            </Button>
          </div>
        </motion.div>
      </PageLayout>
    );
  }

  // ==========================
  // 渲染：游戏界面
  // ==========================
  return (
    <PageLayout maxWidth="700px">
      {/* HUD */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px',
          background: theme.themeGradient,
          borderRadius: '16px',
          border: `2px solid ${theme.themeColor}`,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 900, color: theme.themeColor }}>{score}</div>
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
      {targetItem && (
        <motion.div
          key={`target-${currentRound}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            padding: '20px',
            background: customStyles?.targetColor || 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
            borderRadius: '16px',
            border: `3px solid ${theme.themeColor}`,
          }}
        >
          <div style={{ fontSize: '18px', color: theme.themeColor, marginBottom: '8px' }}>找出：</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: theme.themeColor }}>
            {theme.renderMoleContent ? theme.renderMoleContent(targetItem) : (
              <>
                {targetItem.content} {targetItem.emoji}
              </>
            )}
          </div>
          {targetItem.example && (
            <div style={{ fontSize: '20px', marginTop: '8px', opacity: 0.8 }}>
              {targetItem.example}
            </div>
          )}
        </motion.div>
      )}

      {/* Mole Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {Array.from({ length: totalHoles }, (_, position) => {
          const mole = moles.find(m => m.position === position);
          return (
            <MoleHole
              key={position}
              position={position}
              mole={mole || null}
              onClick={mole ? () => handleMoleClick(mole) : undefined}
              themeColor={theme.themeColor}
              moleColor={customStyles?.moleColor}
              renderContent={theme.renderMoleContent}
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
    </PageLayout>
  );
}

// ==========================
// 地鼠洞穴组件
// ==========================

interface MoleHoleProps {
  position: number;
  mole: ActiveMole | null;
  onClick?: () => void;
  themeColor: string;
  moleColor?: string;
  renderContent?: (item: MoleItem) => React.ReactNode;
}

function MoleHole({ position, mole, onClick, themeColor, moleColor, renderContent }: MoleHoleProps) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      style={{
        aspectRatio: '1',
        borderRadius: '50%',
        background: moleColor || 'linear-gradient(135deg, #8D6E63, #6D4C41)',
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
            <div style={{ fontSize: '48px', marginBottom: '4px' }}>
              {renderContent ? renderContent(mole.item) : (
                <>
                  {mole.item.emoji}
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
                    {mole.item.content}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
