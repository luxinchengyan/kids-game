import React, { useReducer, useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import GameInfo from './GameInfo'; // Import GameInfo component
import NumberPalette from './NumberPalette'; // Import NumberPalette component
import { sudokuReducer, generateSudoku, checkSudokuSolution, recalculateAllCandidates, validateGrid, isValidPlacement, SudokuState, SudokuActionType } from './SudokuEngine';
import type { SudokuCell, SudokuGrid } from './SudokuEngine';
import './Sudoku.css'; // Import the CSS file

const initialSudokuState: SudokuState = {
  grid: [],
  preFilledGrid: [],
  candidates: new Map(),
  currentLevel: 0, // 0 for Easy, 1 for Medium, 2 for Hard
  timer: 0,
  isSolved: false,
  errors: 0,
  isInitialized: false,
};

const SudokuGrid: React.FC = () => {
  const [state, dispatch] = useReducer(sudokuReducer, initialSudokuState);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game on mount
  useEffect(() => {
    if (!state.isInitialized) {
      dispatch({ type: SudokuActionType.INIT_GAME });
    }
  }, [state.isInitialized, state.currentLevel]); // Re-initialize if level changes or not initialized

  // Timer logic
  useEffect(() => {
    if (state.grid.length > 0 && !state.isSolved) {
      if (!timerIntervalRef.current) { // Start timer only if it's not already running
        timerIntervalRef.current = setInterval(() => {
          dispatch({ type: SudokuActionType.UPDATE_TIMER, payload: state.timer + 1 });
        }, 1000);
      }
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null; // Clear the ref
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [state.isSolved, state.timer, state.grid.length]); // Dependencies to re-run effect

  const handleCellClick = (row: number, col: number) => {
    // If a number is selected from the palette, place it
    if (selectedNumber !== null) {
      const cell = state.grid[row][col];
      if (!cell.isPreFilled && cell.value !== selectedNumber) {
        dispatch({ type: SudokuActionType.PLACE_NUMBER, payload: { row, col, number: selectedNumber } });
        // Optionally, auto-select this cell after placing a number
        setSelectedCell({ row, col });
      }
    } else {
      // If no number is selected, just select the cell
      setSelectedCell({ row, col });
    }
  };

  const handleCellContextMenu = (row: number, col: number) => {
    setSelectedCell({ row, col }); // Select cell on right-click too
    if (selectedNumber !== null) {
      // Toggle candidate for the selected number in the selected cell
      dispatch({ type: SudokuActionType.TOGGLE_CANDIDATE, payload: { row, col, number: selectedNumber } });
    } else {
      // If no number is selected, perhaps switch to a candidate-only mode or show candidate options
      console.log("Select a number from the palette first to toggle candidates.");
    }
  };

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
    if (selectedCell) {
      const cell = state.grid[selectedCell.row][selectedCell.col];
      // Place number if the cell is not pre-filled and the number is different
      if (!cell.isPreFilled && cell.value !== num) {
         dispatch({ type: SudokuActionType.PLACE_NUMBER, payload: { row: selectedCell.row, col: selectedCell.col, number: num } });
      }
    }
  };

  const handleErase = () => {
    setSelectedNumber(null); // Deselect number from palette
    if (selectedCell) {
      const cell = state.grid[selectedCell.row][selectedCell.col];
      // Erase number if the cell is not pre-filled and has a value
      if (!cell.isPreFilled && cell.value !== null) {
        dispatch({ type: SudokuActionType.ERASE_NUMBER, payload: { row: selectedCell.row, col: selectedCell.col } });
      }
    }
  };

  const resetGame = () => {
    dispatch({ type: SudokuActionType.RESET_GAME });
    setSelectedCell(null);
    setSelectedNumber(null);
  };

  const checkSolution = () => {
    dispatch({ type: SudokuActionType.CHECK_SOLUTION });
    // This action should trigger validation and update the error count/cell validity
  };

  // Ensure grid is available before rendering
  if (!state.grid || state.grid.length === 0) {
    return <div>Loading Sudoku...</div>;
  }
  
  // Helper to get candidates for a specific cell
  const getCellCandidates = (row: number, col: number): Set<number> => {
      const candidatesMap = state.candidates;
      const key = `${row}-${col}`;
      return candidatesMap.get(key) || new Set<number>();
  };

  return (
    <div className="sudoku-container">
      <GameInfo timer={state.timer} errors={state.errors} resetGame={resetGame} checkSolution={checkSolution} />
      <div className="sudoku-grid">
        {state.grid.map((rowArr, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowArr.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                isPreFilled={cell.isPreFilled}
                onClick={handleCellClick}
                onContextMenu={handleCellContextMenu}
                candidates={getCellCandidates(rowIndex, colIndex)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <NumberPalette
        onNumberSelect={handleNumberSelect}
        onErase={handleErase}
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
      />
    </div>
  );
};

export default SudokuGrid;
