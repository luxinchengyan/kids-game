import React, { useReducer, useEffect, useRef, useState } from 'react';
import TetriminoComponent from './TetriminoComponent';
import { tetrisReducer, getInitialTetrisState, GRID_WIDTH, GRID_HEIGHT, Tetrimino, TetrisState, TetrisActionType } from './TetrisEngine';
import type { TetrisCell, TetrisGrid } from './TetrisEngine';
import './Tetris.css'; // Assuming a CSS file for styling

// Placeholder for GameInfo component
const GameInfo: React.FC<{ score: number; level: number; linesCleared: number; isGameOver: boolean }> = ({ score, level, linesCleared, isGameOver }) => (
  <div className="tetris-game-info">
    <div>Score: {score}</div>
    <div>Level: {level}</div>
    <div>Lines: {linesCleared}</div>
    {isGameOver && <div className="game-over-message">Game Over!</div>}
  </div>
);

// Placeholder for NextPiecePreview component
const NextPiecePreview: React.FC<{ nextPiece: Tetrimino | null }> = ({ nextPiece }) => {
  if (!nextPiece) return null;
  // Basic rendering of the next piece
  // More advanced centering/scaling might be needed
  return (
    <div className="next-piece-preview">
      <h3>Next:</h3>
      <svg width={nextPiece.shape[0].length * 30} height={nextPiece.shape.length * 30}>
        <TetriminoComponent piece={nextPiece} gridWidth={nextPiece.shape[0].length} gridHeight={nextPiece.shape.length} />
      </svg>
    </div>
  );
};

const TetrisGameField: React.FC = () => {
  const [state, dispatch] = useReducer(tetrisReducer, getInitialTetrisState());
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastFrameTime = useRef<number>(performance.now());

  // Initialize game on mount
  useEffect(() => {
    dispatch({ type: TetrisActionType.INIT_GAME });
  }, []); // Run only once on mount

  // Game loop for piece falling
  useEffect(() => {
    if (!state.isGameOver && state.currentPiece) {
      const gameLoop = () => {
        const now = performance.now();
        const delta = now - lastFrameTime.current;

        if (delta >= state.gameSpeed) {
          lastFrameTime.current = now;
          dispatch({ type: TetrisActionType.DROP_PIECE });
        }
        // Request next frame for smooth animation and continuous game loop
        if (!state.isGameOver) {
          requestAnimationFrame(gameLoop);
        }
      };
      
      // Start the animation loop
      lastFrameTime.current = performance.now();
      const animationFrameId = requestAnimationFrame(gameLoop);

      return () => cancelAnimationFrame(animationFrameId); // Cleanup animation frame
    } else if (state.isGameOver && gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
  }, [state.isGameOver, state.currentPiece, state.gameSpeed]); // Re-run effect if these change

  // Handle keyboard input for controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isGameOver || !state.currentPiece) return;

      switch (e.key) {
        case 'ArrowLeft':
          dispatch({ type: TetrisActionType.MOVE_PIECE, payload: { dx: -1, dy: 0 } });
          break;
        case 'ArrowRight':
          dispatch({ type: TetrisActionType.MOVE_PIECE, payload: { dx: 1, dy: 0 } });
          break;
        case 'ArrowDown': // Soft drop
          dispatch({ type: TetrisActionType.DROP_PIECE });
          break;
        case 'ArrowUp': // Rotate
          dispatch({ type: TetrisActionType.ROTATE_PIECE });
          break;
        case ' ': // Hard drop
          dispatch({ type: TetrisActionType.HARD_DROP });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.currentPiece, state.isGameOver]); // Dependencies

  // Render grid cells
  const renderGrid = () => {
    const gridElements: JSX.Element[] = [];
    const cells = state.grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`tetris-cell ${cell.isOccupied ? 'occupied' : ''}`}
          style={{ backgroundColor: cell.color }}
          data-testid={`cell-${rowIndex}-${colIndex}`}
        ></div>
      ))
    );

    // Overlay the current piece onto the grid
    let pieceElements: JSX.Element[] = [];
    if (state.currentPiece) {
      const pieceShape = TETRIMINOS[state.currentPiece.shape.toString()].shapes[state.currentPiece.rotation % TETRIMINOS[state.currentPiece.shape.toString()].shapes.length];
      const pieceHeight = pieceShape.length;
      const pieceWidth = pieceShape[0].length;

      for (let y = 0; y < pieceHeight; y++) {
        for (let x = 0; x < pieceWidth; x++) {
          if (pieceShape[y][x] === 1) {
            const gridX = state.currentPiece.position.x + x;
            const gridY = state.currentPiece.position.y + y;

            if (gridY >= 0 && gridY < GRID_HEIGHT && gridX >= 0 && gridX < GRID_WIDTH) {
              pieceElements.push(
                <div
                  key={`piece-${y}-${x}`}
                  className="tetris-cell piece-block"
                  style={{
                    backgroundColor: state.currentPiece.color,
                    gridColumn: gridX + 1, // CSS Grid uses 1-based indexing
                    gridRow: gridY + 1,
                  }}
                ></div>
              );
            }
          }
        }
      }
    }

    return [...cells.flat(), ...pieceElements];
  };

  return (
    <div className="tetris-game-container">
      <GameInfo score={state.score} level={state.level} linesCleared={state.linesCleared} isGameOver={state.isGameOver} />
      <div
        className="tetris-grid-container"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 30px)`, // Use cellSize from TetriminoComponent? Or make global.
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 30px)`,
        }}
      >
        {renderGrid()}
      </div>
      <NextPiecePreview nextPiece={state.nextPiece} />
      {/* Add controls here if not using keyboard only */}
    </div>
  );
};

export default TetrisGameField;
