import React, { useReducer, useEffect, useRef, useState } from 'react';
import SchulteCellComponent from './SchulteCellComponent';
import { schulteTableReducer, getInitialSchulteTableState, SchulteTableState, SchulteTableActionType } from './SchulteTableEngine';
import type { SchulteCell, SchulteGrid } from './SchulteTableEngine';
import './SchulteTable.css'; // Import the CSS file

// Placeholder for GameInfo component
const GameInfo: React.FC<{ timer: number; currentNumber: number; maxNumber: number; resetGame: () => void }> = ({ timer, currentNumber, maxNumber, resetGame }) => (
  <div className="schulte-game-info">
    <div className="timer">Time: {timer}s</div>
    <div className="target-number">Find: {currentNumber} / {maxNumber}</div>
    <button onClick={resetGame}>Reset</button>
  </div>
);

const initialSchulteTableState = getInitialSchulteTableState(5); // Default to 5x5 grid

const SchulteGrid: React.FC = () => {
  const [state, dispatch] = useReducer(schulteTableReducer, initialSchulteTableState);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game on mount
  useEffect(() => {
    dispatch({ type: SchulteTableActionType.INIT_GAME, payload: { size: 5 } }); // Initialize with 5x5 grid
  }, []);

  // Timer logic
  useEffect(() => {
    if (state.isGameActive && !state.isGameOver) {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = setInterval(() => {
          dispatch({ type: SchulteTableActionType.UPDATE_TIMER, payload: state.timer + 1 });
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
  }, [state.isGameActive, state.isGameOver, state.timer]); // Dependencies to re-run effect

  const handleCellTap = (row: number, col: number) => {
    dispatch({ type: SchulteTableActionType.TAP_CELL, payload: { row, col } });
    setSelectedCell({ row, col }); // Select cell after tap
    
    // If game just started with this tap, activate it (handled in reducer)
    // Check for game over condition
    if (state.currentNumber + 1 > state.maxNumber) {
        // If this was the last number, game is over
        dispatch({ type: SchulteTableActionType.STOP_TIMER });
    }
  };

  const resetGame = () => {
    dispatch({ type: SchulteTableActionType.RESET_GAME, payload: { size: 5 } }); // Reset to 5x5
    setSelectedCell(null);
  };

  // Ensure grid is available before rendering
  if (!state.grid || state.grid.length === 0) {
    return <div>Loading Schulte Table...</div>;
  }

  return (
    <div className="schulte-table-container">
      <GameInfo timer={state.timer} currentNumber={state.currentNumber} maxNumber={state.maxNumber} resetGame={resetGame} />
      <div
        className="schulte-grid"
        style={{
          gridTemplateColumns: `repeat(${state.grid.length}, 40px)`,
          gridTemplateRows: `repeat(${state.grid.length}, 40px)`,
        }}
      >
        {state.grid.map((rowArr, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowArr.map((cell, colIndex) => (
              <SchulteCellComponent
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                isTarget={cell.isTarget}
                isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                onTap={handleCellTap}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      {state.isGameOver && <div className="game-complete-message">Great job! Your time: {state.timer}s</div>}
    </div>
  );
};

export default SchulteGrid;
