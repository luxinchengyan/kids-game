import React, { useReducer, useEffect, useRef, useState } from 'react';
import KakuroCellComponent from './KakuroCellComponent';
import ClueCellComponent from './ClueCellComponent';
import { kakuroReducer, generateKakuroPuzzle, checkKakuroSolution, recalculateCandidates, validateGrid, isValidKakuroPlacement, KakuroState, KakuroActionType } from './KakuroEngine';
import type { KakuroGrid, Clue } from './KakuroEngine';
import './Kakuro.css'; // Import the CSS file

// Placeholder for GameInfo component
const GameInfo: React.FC<{ timer: number; currentNumber: number; maxNumber: number; errors: number; resetGame: () => void }> = ({ timer, currentNumber, maxNumber, errors, resetGame }) => (
  <div className="kakuro-game-info">
    <div className="timer">Time: {timer}s</div>
    <div className="target-number">Find: {currentNumber} / {maxNumber}</div>
    <div className="errors">Errors: {errors}</div>
    <button onClick={resetGame}>Reset</button>
  </div>
);

// Placeholder for NumberPalette component
const NumberPalette: React.FC<{ onNumberSelect: (num: number) => void; onErase: () => void; selectedNumber: number | null; setSelectedNumber: (num: number | null) => void }> = ({ onNumberSelect, onErase, selectedNumber, setSelectedNumber }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleNumberClick = (num: number) => {
    setSelectedNumber(num);
    onNumberSelect(num);
  };

  const handleEraseClick = () => {
    setSelectedNumber(null);
    onErase();
  };

  return (
    <div className="number-palette">
      {numbers.map((num) => (
        <button
          key={num}
          className={`palette-number ${selectedNumber === num ? 'selected' : ''}`}
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </button>
      ))}
      <button className={`palette-erase ${selectedNumber === null ? 'selected' : ''}`} onClick={handleEraseClick}>Erase</button>
    </div>
  );
};

const initialKakuroState = getInitialKakuroState(4); // Default to 4x4 grid

const KakuroGrid: React.FC = () => {
  const [state, dispatch] = useReducer(kakuroReducer, initialKakuroState);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize puzzle on mount
  useEffect(() => {
    dispatch({ type: KakuroActionType.INIT_PUZZLE, payload: { size: 4 } }); // Initialize with 4x4 grid
  }, []);

  // Timer logic
  useEffect(() => {
    if (state.isGameActive && !state.isPuzzleComplete) {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = setInterval(() => {
          dispatch({ type: KakuroActionType.UPDATE_TIMER, payload: state.timer + 1 });
        }, 1000);
      }
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [state.isGameActive, state.isPuzzleComplete, state.timer]); // Dependencies

  const handleCellTap = (row: number, col: number) => {
    dispatch({ type: KakuroActionType.TAP_CELL, payload: { row, col } });
    setSelectedCell({ row, col }); // Select cell after tap
    
    // Activate game on first correct tap (handled in reducer)
    if (state.currentNumber + 1 > state.maxNumber && state.isGameActive) { // If this was the last number, game is complete
        dispatch({ type: KakuroActionType.STOP_TIMER });
    }
  };

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
    if (selectedCell) {
      const cell = state.grid[selectedCell.row][selectedCell.col];
      // Place number if the cell is not pre-filled and has no value
      if (cell && typeof cell === 'object' && !cell.isPreFilled && cell.value === null) {
         dispatch({ type: KakuroActionType.PLACE_NUMBER, payload: { number: num } });
      }
    }
  };

  const handleErase = () => {
    setSelectedNumber(null); // Deselect number from palette
    if (selectedCell) {
      const cell = state.grid[selectedCell.row][selectedCell.col];
      // Erase number if the cell is not pre-filled and has a value
      if (cell && typeof cell === 'object' && !cell.isPreFilled && cell.value !== null) {
        dispatch({ type: KakuroActionType.ERASE_NUMBER });
      }
    }
  };

  const resetGame = () => {
    dispatch({ type: KakuroActionType.RESET_GAME, payload: { size: 4 } }); // Reset to 4x4
    setSelectedCell(null);
    setSelectedNumber(null);
  };

  const checkSolution = () => {
    dispatch({ type: KakuroActionType.CHECK_SOLUTION });
  };

  // Ensure grid is available before rendering
  if (!state.grid || state.grid.length === 0) {
    return <div>Loading Kakuro...</div>;
  }
  
  // Helper to get cell or clue at a specific position
  const getGridItem = (row: number, col: number) => state.grid[row][col];

  return (
    <div className="kakuro-table-container">
      <GameInfo timer={state.timer} currentNumber={state.currentNumber} maxNumber={state.maxNumber} errors={state.errors} resetGame={resetGame} />
      <div
        className="kakuro-grid"
        style={{
          gridTemplateColumns: `repeat(${state.gridSize.width}, 40px)`,
          gridTemplateRows: `repeat(${state.gridSize.height}, 40px)`,
        }}
      >
        {state.grid.map((rowArr, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowArr.map((cellOrClue, colIndex) => {
              if (typeof cellOrClue === 'object' && cellOrClue !== null && cellOrClue.value !== undefined) { // It's a KakuroCell
                const cell = cellOrClue as KakuroCell;
                return (
                  <KakuroCellComponent
                    key={`${rowIndex}-${colIndex}`}
                    cell={cell}
                    row={rowIndex}
                    col={colIndex}
                    isTarget={cell.isTarget}
                    isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                    onTap={handleCellTap}
                  />
                );
              } else if (cellOrClue && typeof cellOrClue === 'object' && cellOrClue.sum !== undefined) { // It's a Clue
                const clue = cellOrClue as Clue;
                return (
                  <ClueCellComponent
                    key={`${rowIndex}-${colIndex}`}
                    clue={clue}
                    row={rowIndex}
                    col={colIndex}
                  />
                );
              }
              return null; // Empty cell or undefined
            })}
          </React.Fragment>
        ))}
      </div>
      <NumberPalette
        onNumberSelect={handleNumberSelect}
        onErase={handleErase}
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
      />
      {state.isPuzzleComplete && <div className="puzzle-complete-message">Congratulations! Puzzle solved!</div>}
    </div>
  );
};

export default KakuroGrid;
