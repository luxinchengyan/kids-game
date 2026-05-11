import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { FrameworkStatGrid, CompletionPanel } from '../frameworks/frameworkHelpers';
import { playSuccess, playError, playClick } from '../../lib/audio';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import {
  type LevelConfig,
  LevelSelectScreen,
  LevelCompleteOverlay,
  useLevelProgress,
} from './LevelSystem';

export interface BoardGamePlayer {
  id: string;
  name: string;
  color: string;
  icon: string;
  isAI?: boolean;
}

export interface BoardGameResult {
  over: boolean;
  winner?: string; // Player ID
  reason?: string;
  stars?: number;
}

export interface BoardGameFrameworkProps<TBoardState, TMove> {
  gameId: string;
  title: string;
  icon: string;
  subtitle: string;
  themeColor: string;
  gradient: string;
  
  // Game Logic
  boardSize: { rows: number; cols: number };
  initialBoard: TBoardState | ((level?: LevelConfig) => TBoardState);
  players: BoardGamePlayer[] | ((level?: LevelConfig) => BoardGamePlayer[]);
  
  onMove: (board: TBoardState, move: TMove, player: BoardGamePlayer) => TBoardState;
  checkGameOver: (board: TBoardState, lastMove?: TMove) => BoardGameResult;
  getAIMove?: (board: TBoardState, player: BoardGamePlayer) => TMove | Promise<TMove>;
  
  // Rendering
  renderCell: (row: number, col: number, value: any, onMove: (move: TMove) => void) => React.ReactNode;
  getCellData: (board: TBoardState, row: number, col: number) => any;
  
  onBack: () => void;
  onComplete?: (result: BoardGameResult & { accuracy?: number; xp?: number }) => void;

  /** 关卡列表 */
  levels?: LevelConfig[];
}

export function BoardGameFramework<TBoardState, TMove>({
  gameId,
  title,
  icon,
  subtitle,
  themeColor,
  gradient,
  boardSize,
  initialBoard,
  players: playersProp,
  onMove,
  checkGameOver,
  getAIMove,
  renderCell,
  getCellData,
  onBack,
  onComplete,
  levels,
}: BoardGameFrameworkProps<TBoardState, TMove>) {
  // 关卡模式
  const isLevelMode = Boolean(levels && levels.length > 0);
  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null);
  const [phase, setPhase] = useState<'level-select' | 'playing' | 'over'>(
    isLevelMode ? 'level-select' : 'playing'
  );
  const { submitResult } = useLevelProgress(gameId, levels ?? []);

  const [board, setBoard] = useState<TBoardState>(() => 
    typeof initialBoard === 'function' ? (initialBoard as any)(null) : initialBoard
  );
  const [players, setPlayers] = useState<BoardGamePlayer[]>(() =>
    typeof playersProp === 'function' ? (playersProp as any)(null) : playersProp
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [result, setResult] = useState<BoardGameResult | null>(null);
  const [movesCount, setMovesCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const currentPlayer = players[currentPlayerIndex];

  // Initialize for a specific level
  const initLevel = useCallback((level: LevelConfig | null) => {
    const nextBoard = typeof initialBoard === 'function' ? (initialBoard as any)(level) : initialBoard;
    const nextPlayers = typeof playersProp === 'function' ? (playersProp as any)(level) : playersProp;
    setBoard(nextBoard);
    setPlayers(nextPlayers);
    setCurrentPlayerIndex(0);
    setMovesCount(0);
    setResult(null);
    setPhase('playing');
    setStartTime(Date.now());
  }, [initialBoard, playersProp]);

  const handleMove = useCallback((move: TMove) => {
    if (phase !== 'playing') return;
    
    const nextBoard = onMove(board, move, currentPlayer);
    setBoard(nextBoard);
    setMovesCount(prev => prev + 1);
    playClick();

    const gameResult = checkGameOver(nextBoard, move);
    if (gameResult.over) {
      setPhase('over');
      setResult(gameResult);
      
      const accuracy = gameResult.winner === players[0].id ? 1 : 0.5;
      const stars = gameResult.stars ?? (gameResult.winner === players[0].id ? 3 : 1);
      
      if (gameResult.winner === players[0].id) {
        playSuccess();
      } else {
        playError();
      }
      
      if (isLevelMode && currentLevel) {
        submitResult(currentLevel.id, stars, gameResult.winner === players[0].id);
      }

      onComplete?.({
        ...gameResult,
        stars,
        accuracy,
        xp: 20 + stars * 10,
      });
    } else {
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    }
  }, [board, currentPlayer, players, phase, onMove, checkGameOver, onComplete, isLevelMode, currentLevel, submitResult]);

  // Handle AI turn
  useEffect(() => {
    if (phase === 'playing' && currentPlayer?.isAI && getAIMove) {
      const timer = setTimeout(async () => {
        const move = await getAIMove(board, currentPlayer);
        handleMove(move);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, currentPlayer, board, getAIMove, handleMove]);

  const resetGame = () => {
    initLevel(currentLevel);
  };

  const grid = useMemo(() => {
    const rows = [];
    for (let r = 0; r < boardSize.rows; r++) {
      const cols = [];
      for (let c = 0; c < boardSize.cols; c++) {
        const cellData = getCellData(board, r, c);
        cols.push(
          <div key={`${r}-${c}`} style={{ position: 'relative' }}>
            {renderCell(r, c, cellData, handleMove)}
          </div>
        );
      }
      rows.push(
        <div key={`row-${r}`} style={{ display: 'flex', gap: '4px' }}>
          {cols}
        </div>
      );
    }
    return rows;
  }, [board, boardSize, getCellData, renderCell, handleMove]);

  // 关卡选择界面
  if (phase === 'level-select' && isLevelMode && levels) {
    return (
      <LevelSelectScreen
        gameId={gameId}
        levels={levels}
        onSelectLevel={(level) => {
          setCurrentLevel(level);
          initLevel(level);
        }}
        onBack={onBack}
        themeColor={themeColor}
        title={title}
        icon={icon}
        gradient={gradient}
      />
    );
  }

  return (
    <PageLayout maxWidth="1000px">
      <GamePageHeader
        title={title}
        icon={icon}
        subtitle={isLevelMode && currentLevel ? `第 ${currentLevel.order} 关 · ${currentLevel.name}` : subtitle}
        gradient={gradient}
        onBack={isLevelMode ? () => setPhase('level-select') : onBack}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', marginTop: '20px' }}>
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '24px', 
          padding: '24px', 
          border: `3px solid ${themeColor}22`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px',
          overflow: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px', 
            padding: '8px',
            background: `${themeColor}11`,
            borderRadius: '12px'
          }}>
            {grid}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <FrameworkStatGrid
            accent={themeColor}
            surface="#FFFFFF"
            items={[
              { label: '步数', value: String(movesCount), note: '步步为营' },
              { label: '当前选手', value: currentPlayer?.name || '-', note: currentPlayer?.icon || '' },
            ]}
          />

          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '20px',
            border: `3px solid ${themeColor}22`,
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: themeColor }}>选手信息</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {players.map((p, idx) => (
                <div 
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '14px',
                    background: idx === currentPlayerIndex ? `${p.color}22` : 'transparent',
                    border: `2px solid ${idx === currentPlayerIndex ? p.color : 'transparent'}`,
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{p.icon}</span>
                  <div style={{ fontWeight: 800 }}>{p.name} {p.isAI && '(电脑)'}</div>
                </div>
              ))}
            </div>
          </div>

          <Button variant="secondary" onClick={resetGame}>重新开始</Button>
          {isLevelMode && (
             <Button variant="secondary" onClick={() => setPhase('level-select')}>切换关卡</Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {phase === 'over' && result && (
          isLevelMode && currentLevel && levels ? (
            <LevelCompleteOverlay
              level={currentLevel}
              stars={result.stars ?? (result.winner === players[0].id ? 3 : 1)}
              accuracy={result.winner === players[0].id ? 1 : 0.5}
              timeSpent={Math.floor((Date.now() - startTime) / 1000)}
              themeColor={themeColor}
              hasNextLevel={levels.findIndex((l) => l.id === currentLevel.id) < levels.length - 1}
              onNextLevel={() => {
                const idx = levels.findIndex((l) => l.id === currentLevel.id);
                if (idx < levels.length - 1) {
                  const next = levels[idx + 1];
                  setCurrentLevel(next);
                  initLevel(next);
                }
              }}
              onRetry={resetGame}
              onBackToMap={() => setPhase('level-select')}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                padding: '20px'
              }}
            >
              <CompletionPanel
                emoji={result.winner === players[0].id ? '🏆' : '🎮'}
                title={result.winner === players[0].id ? '你赢了！' : result.winner ? `${players.find(p => p.id === result.winner)?.name} 获胜` : '平局'}
                summary={result.reason || '精彩的对局！'}
                accent={themeColor}
                background={gradient}
              >
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <Button onClick={resetGame}>再来一局</Button>
                  <Button variant="secondary" onClick={onBack}>返回</Button>
                </div>
              </CompletionPanel>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
