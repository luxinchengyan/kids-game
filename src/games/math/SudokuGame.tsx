import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { getGameSeriesConfig } from '../../data/gameSeriesCatalog';

type Grid = number[][];
type Puzzle = {
  initial: Grid;
  solution: Grid;
};

type SudokuStage = {
  id: string;
  title: string;
  difficultyLabel: string;
  summary: string;
  puzzles: number;
  cellsToRemove: number;
};

const SUDOKU_STAGES: SudokuStage[] = [
  {
    id: 'warmup',
    title: '热身棋盘',
    difficultyLabel: '入门',
    summary: '先熟悉规则，每局空格更少，帮助孩子建立信心。',
    puzzles: 2,
    cellsToRemove: 6,
  },
  {
    id: 'focus',
    title: '专注棋盘',
    difficultyLabel: '进阶',
    summary: '空格增多，需要更主动地做排除和比较。',
    puzzles: 2,
    cellsToRemove: 8,
  },
  {
    id: 'master',
    title: '冠军棋盘',
    difficultyLabel: '挑战',
    summary: '连续完成高空格棋盘，训练稳定策略和耐心。',
    puzzles: 3,
    cellsToRemove: 10,
  },
];

function generateSudokuPuzzle(cellsToRemove: number): Puzzle {
  const solution: Grid = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ];

  const initial: Grid = solution.map((row) => [...row]);
  let removed = 0;

  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    if (initial[row][col] !== 0) {
      initial[row][col] = 0;
      removed += 1;
    }
  }

  return { initial, solution };
}

function createEmptyGrid() {
  return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
}

export default function SudokuGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('math-sudoku');
  const series = getGameSeriesConfig('math-sudoku');

  const [stageIndex, setStageIndex] = useState(0);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [currentGrid, setCurrentGrid] = useState<Grid>(createEmptyGrid);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [totalErrors, setTotalErrors] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);
  const [seriesCompleted, setSeriesCompleted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [solvedStageTitle, setSolvedStageTitle] = useState('');

  const currentStage = SUDOKU_STAGES[stageIndex];
  const totalPuzzles = useMemo(
    () => SUDOKU_STAGES.reduce((sum, stage) => sum + stage.puzzles, 0),
    []
  );
  const elapsedMs = startTime > 0 ? Date.now() - startTime : 0;

  const loadPuzzle = useCallback((stage: SudokuStage) => {
    const nextPuzzle = generateSudokuPuzzle(stage.cellsToRemove);
    setPuzzle(nextPuzzle);
    setCurrentGrid(nextPuzzle.initial.map((row) => [...row]));
    setSelectedCell(null);
    setErrors(new Set());
  }, []);

  const startSeries = useCallback(() => {
    setStageIndex(0);
    setPuzzleIndex(0);
    setTotalErrors(0);
    setCompletedPuzzles(0);
    setSeriesCompleted(false);
    setSolvedStageTitle('');
    setStartTime(Date.now());
    loadPuzzle(SUDOKU_STAGES[0]);
    track('game_start', { gameId: 'math-sudoku', stages: SUDOKU_STAGES.length, totalPuzzles });
  }, [loadPuzzle, totalPuzzles]);

  useEffect(() => {
    startSeries();
  }, [startSeries]);

  const finishSeries = useCallback(() => {
    const totalDurationMs = Date.now() - startTime;
    const stars =
      totalErrors === 0 && totalDurationMs <= 90000
        ? 3
        : totalErrors <= 4 && totalDurationMs <= 140000
          ? 2
          : 1;
    const accuracy = totalPuzzles / Math.max(totalPuzzles + totalErrors, 1);

    setSeriesCompleted(true);
    handleGameComplete({
      success: true,
      stars,
      tasksCompleted: totalPuzzles,
      accuracy,
      xp: 32,
    });
  }, [handleGameComplete, startTime, totalErrors, totalPuzzles]);

  const advancePuzzle = useCallback(() => {
    const isLastPuzzleInStage = puzzleIndex >= currentStage.puzzles - 1;
    const isLastStage = stageIndex >= SUDOKU_STAGES.length - 1;

    if (isLastPuzzleInStage && isLastStage) {
      finishSeries();
      return;
    }

    if (isLastPuzzleInStage) {
      const nextStageIndex = stageIndex + 1;
      const nextStage = SUDOKU_STAGES[nextStageIndex];
      setStageIndex(nextStageIndex);
      setPuzzleIndex(0);
      setSolvedStageTitle(nextStage.title);
      loadPuzzle(nextStage);
      return;
    }

    setPuzzleIndex((value) => value + 1);
    setSolvedStageTitle(currentStage.title);
    loadPuzzle(currentStage);
  }, [currentStage, finishSeries, loadPuzzle, puzzleIndex, stageIndex]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (seriesCompleted || !puzzle) {
        return;
      }

      if (puzzle.initial[row][col] === 0) {
        setSelectedCell([row, col]);
      }
    },
    [puzzle, seriesCompleted]
  );

  const handleNumberSelect = useCallback(
    (num: number) => {
      if (!selectedCell || !puzzle || seriesCompleted) {
        return;
      }

      const [row, col] = selectedCell;
      const newGrid = currentGrid.map((gridRow) => [...gridRow]);
      newGrid[row][col] = num;
      setCurrentGrid(newGrid);

      if (num !== puzzle.solution[row][col]) {
        setErrors((prev) => new Set([...prev, `${row}-${col}`]));
        setTotalErrors((value) => value + 1);
      } else {
        setErrors((prev) => {
          const nextErrors = new Set(prev);
          nextErrors.delete(`${row}-${col}`);
          return nextErrors;
        });
      }

      const solved = newGrid.every((gridRow, rowIndex) =>
        gridRow.every((value, colIndex) => value === puzzle.solution[rowIndex][colIndex])
      );

      if (solved) {
        const nextCompleted = completedPuzzles + 1;
        setCompletedPuzzles(nextCompleted);
        track('task_complete', {
          success: true,
          taskType: 'sudoku',
          gameId: 'math-sudoku',
          stageId: currentStage.id,
          puzzleIndex: puzzleIndex + 1,
        });

        window.setTimeout(() => {
          advancePuzzle();
        }, 650);
      }
    },
    [
      advancePuzzle,
      completedPuzzles,
      currentGrid,
      currentStage.id,
      puzzle,
      puzzleIndex,
      selectedCell,
      seriesCompleted,
    ]
  );

  const handleClear = useCallback(() => {
    if (!selectedCell || !puzzle || seriesCompleted) {
      return;
    }

    const [row, col] = selectedCell;
    if (puzzle.initial[row][col] !== 0) {
      return;
    }

    const newGrid = currentGrid.map((gridRow) => [...gridRow]);
    newGrid[row][col] = 0;
    setCurrentGrid(newGrid);
    setErrors((prev) => {
      const nextErrors = new Set(prev);
      nextErrors.delete(`${row}-${col}`);
      return nextErrors;
    });
  }, [currentGrid, puzzle, selectedCell, seriesCompleted]);

  const handleBack = useCallback(() => {
    navigate('/games/math');
  }, [navigate]);

  if (!puzzle) {
    return (
      <PageLayout maxWidth="720px">
        <div
          style={{
            minHeight: '40vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
          }}
        >
          加载中…
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="720px">
      <GamePageHeader
        title="数独儿童版"
        icon="🔢"
        subtitle="不再只做一局，而是连续闯完 3 个数独训练营。"
        gradient="linear-gradient(135deg, #2196F3, #64B5F6, #26C6DA)"
        progressColor="#2196F3"
        onBack={handleBack}
        backLabel="← 返回数字小镇"
        currentTask={Math.min(completedPuzzles + 1, totalPuzzles)}
        totalTasks={totalPuzzles}
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
            { label: '系列路线', value: series?.progressionLabel ?? '三段闯关', note: series?.arcTitle },
            {
              label: '当前级别',
              value: `${currentStage.difficultyLabel} · ${stageIndex + 1}/${SUDOKU_STAGES.length}`,
              note: currentStage.title,
            },
            {
              label: '本级别进度',
              value: `${Math.min(puzzleIndex + 1, currentStage.puzzles)}/${currentStage.puzzles}`,
              note: currentStage.summary,
            },
            { label: '累计错误', value: `${totalErrors}`, note: '可错但要越来越少' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#F5FAFF',
                borderRadius: '16px',
                padding: '14px',
                border: '2px solid #D6EAFB',
              }}
            >
              <div style={{ color: '#607D8B', fontWeight: 700, marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#1976D2', fontWeight: 900, fontSize: '22px' }}>{item.value}</div>
              {item.note && <div style={{ marginTop: '6px', color: '#78909C', fontSize: '12px' }}>{item.note}</div>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {SUDOKU_STAGES.map((stage, index) => {
            const active = index === stageIndex && !seriesCompleted;
            const done = index < stageIndex || seriesCompleted;
            return (
              <div
                key={stage.id}
                style={{
                  flex: '1 1 180px',
                  borderRadius: '18px',
                  padding: '14px',
                  background: active
                    ? 'linear-gradient(135deg, #E3F2FD, #FFFFFF)'
                    : done
                      ? 'linear-gradient(135deg, #E8F5E9, #FFFFFF)'
                      : '#F5F5F5',
                  border: `2px solid ${active ? '#64B5F6' : done ? '#81C784' : '#E0E0E0'}`,
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#607D8B', marginBottom: '4px' }}>
                  第 {index + 1} 站 · {stage.difficultyLabel}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#1976D2', marginBottom: '4px' }}>{stage.title}</div>
                <div style={{ color: '#546E7A', fontSize: '13px', lineHeight: 1.6 }}>{stage.summary}</div>
              </div>
            );
          })}
        </div>

        <p
          style={{
            fontSize: 'var(--font-size-md)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-lg)',
            fontWeight: 600,
          }}
        >
          填入数字 1-4，让每行每列都不重复。{solvedStageTitle ? `刚刚完成：${solvedStageTitle}。` : ''}
        </p>

        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(4, 64px)',
            gridTemplateRows: 'repeat(4, 64px)',
            gap: '4px',
            padding: '8px',
            background: '#2196F3',
            borderRadius: '12px',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          {currentGrid.map((row, i) =>
            row.map((cell, j) => {
              const isInitial = puzzle.initial[i][j] !== 0;
              const isSelected = selectedCell?.[0] === i && selectedCell?.[1] === j;
              const isError = errors.has(`${i}-${j}`);
              const borderRight = j === 1 ? '4px solid #1976D2' : '1px solid #64B5F6';
              const borderBottom = i === 1 ? '4px solid #1976D2' : '1px solid #64B5F6';

              return (
                <motion.div
                  key={`${i}-${j}`}
                  whileHover={!isInitial && !seriesCompleted ? { scale: 1.05 } : {}}
                  whileTap={!isInitial && !seriesCompleted ? { scale: 0.95 } : {}}
                  onClick={() => handleCellClick(i, j)}
                  style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 800,
                    background: isSelected ? '#BBDEFB' : isInitial ? '#E3F2FD' : '#FFFFFF',
                    color: isError ? '#E91E63' : isInitial ? '#1976D2' : '#2196F3',
                    borderRight,
                    borderBottom,
                    borderRadius: '4px',
                    cursor: isInitial || seriesCompleted ? 'default' : 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {cell !== 0 ? cell : ''}
                </motion.div>
              );
            })
          )}
        </div>

        {!seriesCompleted && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            {[1, 2, 3, 4].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNumberSelect(num)}
                style={{
                  width: '64px',
                  height: '64px',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #2196F3, #64B5F6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
                }}
              >
                {num}
              </motion.button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!seriesCompleted && (
            <Button variant="secondary" onClick={handleClear}>
              清除
            </Button>
          )}
          <Button variant={seriesCompleted ? 'primary' : 'secondary'} onClick={startSeries}>
            {seriesCompleted ? '再闯一次' : '重新开始系列'}
          </Button>
        </div>

        {seriesCompleted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              marginTop: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              background: 'linear-gradient(135deg, #4CAF50, #81C784)',
              borderRadius: 'var(--radius-md)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 'var(--font-size-lg)',
              lineHeight: 1.7,
            }}
          >
            🎉 太棒了！你完成了整个数独系列，共闯过 {totalPuzzles} 局，用时{' '}
            {(elapsedMs / 1000).toFixed(1)} 秒，累计错误 {totalErrors} 次。
          </motion.div>
        )}
      </motion.div>
    </PageLayout>
  );
}
