import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import {
  CompletionPanel,
  FrameworkPanel,
  FrameworkStatGrid,
} from '../frameworks/frameworkHelpers';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultySettings: Record<Difficulty, { size: 3 | 4; shuffleSteps: number; label: string; targetMoves: number }> = {
  easy: { size: 3, shuffleSteps: 16, label: '3x3 入门', targetMoves: 28 },
  medium: { size: 4, shuffleSteps: 22, label: '4x4 进阶', targetMoves: 56 },
  hard: { size: 4, shuffleSteps: 36, label: '4x4 挑战', targetMoves: 80 },
};

function buildSolvedBoard(size: number) {
  return Array.from({ length: size * size }, (_, index) => (index === size * size - 1 ? 0 : index + 1));
}

function getAdjacentIndexes(index: number, size: number) {
  const row = Math.floor(index / size);
  const column = index % size;
  return [
    row > 0 ? index - size : -1,
    row < size - 1 ? index + size : -1,
    column > 0 ? index - 1 : -1,
    column < size - 1 ? index + 1 : -1,
  ].filter((value) => value >= 0);
}

function createShuffledBoard(size: number, shuffleSteps: number) {
  const board = buildSolvedBoard(size);
  let emptyIndex = board.length - 1;

  for (let step = 0; step < shuffleSteps; step += 1) {
    const candidates = getAdjacentIndexes(emptyIndex, size);
    const swapIndex = candidates[Math.floor(Math.random() * candidates.length)];
    [board[emptyIndex], board[swapIndex]] = [board[swapIndex], board[emptyIndex]];
    emptyIndex = swapIndex;
  }

  return board;
}

function isSolved(board: number[]) {
  return board.every((value, index) => value === (index === board.length - 1 ? 0 : index + 1));
}

export default function MathSlideGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('math-slide');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState<number[]>(() =>
    createShuffledBoard(difficultySettings.easy.size, difficultySettings.easy.shuffleSteps)
  );
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const settings = difficultySettings[difficulty];

  const resetGame = useCallback(
    (nextDifficulty: Difficulty = difficulty) => {
      const nextSettings = difficultySettings[nextDifficulty];
      setDifficulty(nextDifficulty);
      setBoard(createShuffledBoard(nextSettings.size, nextSettings.shuffleSteps));
      setMoves(0);
      setCompleted(false);
      setStartTime(Date.now());
      track('game_start', { gameId: 'math-slide', difficulty: nextDifficulty, size: nextSettings.size });
    },
    [difficulty]
  );

  useEffect(() => {
    track('game_start', { gameId: 'math-slide', difficulty, size: settings.size });
  }, [difficulty, settings.size]);

  useEffect(() => {
    if (!completed || !isSolved(board)) {
      return;
    }

    const durationMs = Date.now() - startTime;
    const stars = moves <= settings.targetMoves ? 3 : moves <= settings.targetMoves + 16 ? 2 : 1;
    handleGameComplete({
      success: true,
      stars,
      tasksCompleted: board.length - 1,
      accuracy: 1,
      xp: 30,
    });
    track('task_complete', { gameId: 'math-slide', moves, durationMs, size: settings.size });
  }, [board, completed, handleGameComplete, moves, settings.size, settings.targetMoves, startTime]);

  const handleBack = useCallback(() => {
    navigate('/games/math');
  }, [navigate]);

  const handleTileClick = useCallback(
    (tileIndex: number) => {
      if (completed || board[tileIndex] === 0) {
        return;
      }

      const emptyIndex = board.indexOf(0);
      if (!getAdjacentIndexes(tileIndex, settings.size).includes(emptyIndex)) {
        return;
      }

      const nextBoard = [...board];
      [nextBoard[tileIndex], nextBoard[emptyIndex]] = [nextBoard[emptyIndex], nextBoard[tileIndex]];
      const nextMoves = moves + 1;
      setBoard(nextBoard);
      setMoves(nextMoves);

      if (isSolved(nextBoard)) {
        setCompleted(true);
      }
    },
    [board, completed, moves, settings.size]
  );

  const stars = moves <= settings.targetMoves ? 3 : moves <= settings.targetMoves + 16 ? 2 : 1;

  return (
    <PageLayout maxWidth="860px">
      <GamePageHeader
        title="数字华容道"
        icon="🧱"
        subtitle="滑动数字方块，把顺序排回 1 到最后一个空格。"
        gradient="linear-gradient(135deg, #1E88E5, #64B5F6, #26C6DA)"
        progressColor="#1E88E5"
        onBack={handleBack}
        backLabel="← 返回数字小镇"
      />

      <FrameworkPanel borderColor="#90CAF9" background="linear-gradient(135deg, #FFFFFF, #E3F2FD)">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
            <Button key={level} variant={difficulty === level ? 'primary' : 'secondary'} onClick={() => resetGame(level)}>
              {difficultySettings[level].label}
            </Button>
          ))}
        </div>

        <FrameworkStatGrid
          accent="#1565C0"
          surface="#FFFFFF"
          items={[
            { label: '步数', value: String(moves), note: '越少越好' },
            { label: '棋盘', value: `${settings.size}x${settings.size}` },
            { label: '目标', value: `${settings.targetMoves}步内` },
            { label: '当前评级', value: `${completed ? stars : '--'} 星` },
          ]}
        />

        {completed ? (
          <CompletionPanel
            emoji={stars === 3 ? '🏆' : stars === 2 ? '⭐' : '👏'}
            title="排列成功"
            summary={`你用了 ${moves} 步完成数字华容道，当前成绩 ${stars} 星。`}
            accent="#1565C0"
            background="linear-gradient(135deg, #E3F2FD, #FFFFFF)"
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={handleBack}>
                返回小镇
              </Button>
              <Button onClick={() => resetGame()}>再玩一局</Button>
            </div>
          </CompletionPanel>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${settings.size}, minmax(0, 1fr))`,
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              {board.map((value, index) => (
                <button
                  key={`${value}-${index}`}
                  type="button"
                  onClick={() => handleTileClick(index)}
                  style={{
                    aspectRatio: '1 / 1',
                    borderRadius: '20px',
                    border: value === 0 ? '2px dashed #90CAF9' : '3px solid #64B5F6',
                    background: value === 0 ? 'rgba(144, 202, 249, 0.18)' : 'linear-gradient(135deg, #FFFFFF, #BBDEFB)',
                    color: '#1565C0',
                    fontSize: settings.size === 4 ? '26px' : '34px',
                    fontWeight: 900,
                    cursor: value === 0 ? 'default' : 'pointer',
                    boxShadow: value === 0 ? 'none' : '0 8px 16px rgba(33, 150, 243, 0.12)',
                  }}
                >
                  {value === 0 ? '' : value}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={() => resetGame()}>
                重新洗牌
              </Button>
            </div>
          </>
        )}
      </FrameworkPanel>
    </PageLayout>
  );
}
