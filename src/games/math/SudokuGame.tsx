import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { useGameCompletion } from '../../hooks/useGameCompletion';
import { track } from '../../lib/analytics';

// Simple 4x4 Sudoku for children (ages 4-6)
type Grid = number[][];
type Puzzle = {
  initial: Grid;
  solution: Grid;
};

function generateSudokuPuzzle(): Puzzle {
  // A simple 4x4 Sudoku solution
  const solution: Grid = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ];

  // Create puzzle by removing some cells (keep it simple for kids)
  const initial: Grid = solution.map(row => [...row]);
  
  // Remove 6-8 cells for an easy puzzle
  const cellsToRemove = 7;
  let removed = 0;
  
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    
    if (initial[row][col] !== 0) {
      initial[row][col] = 0;
      removed++;
    }
  }
  
  return { initial, solution };
}

function SudokuGame() {
  const navigate = useNavigate();
  const { handleGameComplete } = useGameCompletion('math-sudoku');
  
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [currentGrid, setCurrentGrid] = useState<Grid>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const newPuzzle = generateSudokuPuzzle();
    setPuzzle(newPuzzle);
    setCurrentGrid(newPuzzle.initial.map(row => [...row]));
    track('game_start', { gameId: 'math-sudoku', taskType: 'sudoku' });
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    // Only allow clicking on empty cells (0)
    if (puzzle && puzzle.initial[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  }, [puzzle]);

  const handleNumberSelect = useCallback((num: number) => {
    if (!selectedCell || !puzzle || completed) return;
    
    const [row, col] = selectedCell;
    
    // Update the grid
    const newGrid = currentGrid.map(r => [...r]);
    newGrid[row][col] = num;
    setCurrentGrid(newGrid);
    
    // Check if correct
    if (num !== puzzle.solution[row][col]) {
      setErrors(prev => new Set([...prev, `${row}-${col}`]));
    } else {
      setErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(`${row}-${col}`);
        return newErrors;
      });
    }
    
    // Check if puzzle is complete
    const isComplete = newGrid.every((r, i) => 
      r.every((val, j) => val === puzzle.solution[i][j])
    );
    
    if (isComplete) {
      setCompleted(true);
      const durationMs = Date.now() - startTime;
      track('task_complete', {
        success: true,
        duration_ms: durationMs,
        taskType: 'sudoku',
        gameId: 'math-sudoku',
      });
      
      handleGameComplete({
        success: true,
        stars: errors.size === 0 ? 3 : errors.size <= 2 ? 2 : 1,
        tasksCompleted: 1,
        accuracy: 1,
        xp: 20,
      });
    }
  }, [selectedCell, puzzle, currentGrid, completed, handleGameComplete, errors.size, startTime]);

  const handleClear = useCallback(() => {
    if (!selectedCell || !puzzle) return;
    
    const [row, col] = selectedCell;
    if (puzzle.initial[row][col] === 0) {
      const newGrid = currentGrid.map(r => [...r]);
      newGrid[row][col] = 0;
      setCurrentGrid(newGrid);
      setErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(`${row}-${col}`);
        return newErrors;
      });
    }
  }, [selectedCell, puzzle, currentGrid]);

  const handleBack = useCallback(() => {
    navigate('/games/math');
  }, [navigate]);

  const handleNewGame = useCallback(() => {
    const newPuzzle = generateSudokuPuzzle();
    setPuzzle(newPuzzle);
    setCurrentGrid(newPuzzle.initial.map(row => [...row]));
    setSelectedCell(null);
    setErrors(new Set());
    setCompleted(false);
  }, []);

  if (!puzzle) {
    return (
      <div style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--font-size-lg)',
        color: 'var(--color-text-secondary)',
        fontWeight: 600,
      }}>
        加载中…
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="secondary" onClick={handleBack}>
          ← 返回数字小镇
        </Button>
      </div>

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
        <h2 style={{ 
          fontSize: 'var(--font-size-2xl)', 
          fontWeight: 800, 
          marginBottom: 'var(--spacing-md)',
          color: 'var(--color-text-primary)',
        }}>
          🔢 数独游戏
        </h2>
        <p style={{ 
          fontSize: 'var(--font-size-md)', 
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--spacing-lg)',
          fontWeight: 600,
        }}>
          填入数字 1-4，每行每列不重复！
        </p>

        {/* Sudoku Grid */}
        <div style={{
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(4, 64px)',
          gridTemplateRows: 'repeat(4, 64px)',
          gap: '4px',
          padding: '8px',
          background: '#2196F3',
          borderRadius: '12px',
          marginBottom: 'var(--spacing-lg)',
        }}>
          {currentGrid.map((row, i) =>
            row.map((cell, j) => {
              const isInitial = puzzle.initial[i][j] !== 0;
              const isSelected = selectedCell?.[0] === i && selectedCell?.[1] === j;
              const isError = errors.has(`${i}-${j}`);
              
              // Add thicker borders for 2x2 boxes
              const borderRight = j === 1 ? '4px solid #1976D2' : '1px solid #64B5F6';
              const borderBottom = i === 1 ? '4px solid #1976D2' : '1px solid #64B5F6';
              
              return (
                <motion.div
                  key={`${i}-${j}`}
                  whileHover={!isInitial ? { scale: 1.05 } : {}}
                  whileTap={!isInitial ? { scale: 0.95 } : {}}
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
                    cursor: isInitial ? 'default' : 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {cell !== 0 ? cell : ''}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Number Pad */}
        {!completed && (
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'center',
            marginBottom: 'var(--spacing-lg)',
          }}>
            {[1, 2, 3, 4].map(num => (
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

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-md)',
          justifyContent: 'center',
        }}>
          {!completed && (
            <Button variant="secondary" onClick={handleClear}>
              清除
            </Button>
          )}
          {completed && (
            <Button variant="primary" onClick={handleNewGame}>
              新游戏
            </Button>
          )}
        </div>

        {completed && (
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
            }}
          >
            🎉 太棒了！你完成了数独！
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default SudokuGame;
