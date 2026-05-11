import React, { useReducer, useEffect, useRef, useState } from 'react';
import CharacterCellComponent from './CharacterCellComponent';
import { chineseCharReducer, getInitialChineseCharState, ChineseCharState, ChineseCharActionType } from './ChineseCharEngine';
import type { ChineseCharGrid, ChineseCharCell } from './ChineseCharEngine';
import './ChineseChar.css'; // Import the CSS file

// Placeholder for GameInfo component
const GameInfo: React.FC<{ score: number; currentCharacter: string; timer: number; resetGame: () => void }> = ({ score, currentCharacter, timer, resetGame }) => (
  <div className="chinese-char-game-info">
    <div>Score: {score}</div>
    <div>Character: {currentCharacter}</div>
    <div>Time: {timer}s</div>
    <button onClick={resetGame}>Reset</button>
  </div>
);

// Placeholder for ComponentPicker component
const ComponentPicker: React.FC<{ components: string[]; onComponentSelect: (component: string) => void; selectedComponent: string | null }> = ({ components, onComponentSelect, selectedComponent }) => (
  <div className="component-picker">
    <h3>Components:</h3>
    <ul>
      {components.map(comp => (
        <li
          key={comp}
          className={selectedComponent === comp ? 'selected' : ''}
          onClick={() => onComponentSelect(comp)}
        >
          {comp}
        </li>
      ))}
    </ul>
  </div>
);

const initialChineseCharState = getInitialChineseCharState();

const CharacterGrid: React.FC = () => {
  const [state, dispatch] = useReducer(chineseCharReducer, initialChineseCharState);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize puzzle on mount
  useEffect(() => {
    dispatch({ type: ChineseCharActionType.INIT_GAME, payload: { difficulty: 'easy' } }); // Example initialization
  }, []);

  // Timer logic
  useEffect(() => {
    if (state.isGameActive && !state.isPuzzleComplete) {
      if (!timerIntervalRef.current) {
        timerIntervalRef.current = setInterval(() => {
          dispatch({ type: ChineseCharActionType.UPDATE_TIMER, payload: state.timer + 1 });
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
    dispatch({ type: ChineseCharActionType.TAP_CELL, payload: { row, col } });
    setSelectedCell({ row, col });
    // Activate game on first correct tap (handled in reducer)
    if (!state.isGameActive) {
        dispatch({ type: ChineseCharActionType.START_GAME });
    }
  };

  const handleComponentSelect = (component: string) => {
    dispatch({ type: ChineseCharActionType.SELECT_COMPONENT, payload: { component } });
  };

  const resetGame = () => {
    dispatch({ type: ChineseCharActionType.RESET_GAME });
    setSelectedCell(null);
  };

  // Ensure grid is available before rendering
  if (!state.grid || state.grid.length === 0) {
    return <div>Loading Character Game...</div>;
  }
  
  // Helper to get cell or clue at a specific position
  const getGridItem = (row: number, col: number) => state.grid[row][col];

  return (
    <div className="chinese-char-game-container">
      <GameInfo score={state.score} currentCharacter={state.targetCharacter || ''} timer={state.timer} resetGame={resetGame} />
      <div
        className="chinese-char-grid"
        style={{
          gridTemplateColumns: `repeat(${state.gridSize.width}, 40px)`,
          gridTemplateRows: `repeat(${state.gridSize.height}, 40px)`,
        }}
      >
        {state.grid.map((rowArr, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowArr.map((cell, colIndex) => {
              if (cell) {
                return (
                  <CharacterCellComponent
                    key={`${rowIndex}-${colIndex}`}
                    cell={cell}
                    row={rowIndex}
                    col={colIndex}
                    isTarget={cell.isTarget}
                    isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                    onTap={handleCellTap}
                  />
                );
              }
              return null; // Should not happen if grid is properly initialized
            })}
          </React.Fragment>
        ))}
      </div>
      <ComponentPicker
        components={state.availableComponents}
        onComponentSelect={(comp) => dispatch({ type: ChineseCharActionType.SELECT_COMPONENT, payload: { component: comp } })}
        selectedComponent={state.selectedComponent}
      />
      {state.isPuzzleComplete && <div className="game-complete-message">Congratulations! You've mastered the character!</div>}
    </div>
  );
};

export default CharacterGrid;
