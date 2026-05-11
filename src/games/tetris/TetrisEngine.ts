// src/games/tetris/TetrisEngine.ts

export interface Tetrimino {
  shape: number[][]; // 2D array representing the blocks of the piece
  color: string;
  position: { x: number; y: number }; // Top-left corner of the bounding box on the grid
  rotation: number; // Current rotation state
}

export interface TetrisCell {
  isOccupied: boolean;
  color: string;
}

export type TetrisGrid = TetrisCell[][];

export interface TetrisState {
  grid: TetrisGrid;
  currentPiece: Tetrimino | null;
  nextPiece: Tetrimino | null;
  score: number;
  level: number;
  linesCleared: number;
  isGameOver: boolean;
  gameSpeed: number; // milliseconds per tick (lower is faster)
}

export enum TetrisActionType {
  INIT_GAME = 'INIT_GAME',
  MOVE_PIECE = 'MOVE_PIECE',
  ROTATE_PIECE = 'ROTATE_PIECE',
  DROP_PIECE = 'DROP_PIECE', // Soft drop
  HARD_DROP = 'HARD_DROP',
  LOCK_PIECE = 'LOCK_PIECE',
  CLEAR_LINES = 'CLEAR_LINES',
  GENERAT_NEW_PIECE = 'GENERAT_NEW_PIECE',
  GAME_OVER = 'GAME_OVER',
  UPDATE_SCORE = 'UPDATE_SCORE',
  UPDATE_LEVEL = 'UPDATE_LEVEL',
  UPDATE_GAME_SPEED = 'UPDATE_GAME_SPEED',
}

// --- Game Constants ---
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

// Tetrimino shapes (example: I, J, L, O, S, T, Z)
// Each shape is an array of rotations, where each rotation is a 2D grid
const TETRIMINOS = {
  'I': {
    color: '#00ffff', // Cyan
    shapes: [
      [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    ],
  },
  'J': {
    color: '#0000ff', // Blue
    shapes: [
      [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
      [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
      [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
      [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
    ],
  },
  'L': {
    color: '#ff7f00', // Orange
    shapes: [
      [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
      [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    ],
  },
  'O': {
    color: '#ffff00', // Yellow
    shapes: [
      [[1, 1], [1, 1]],
    ],
  },
  'S': {
    color: '#00ff00', // Green
    shapes: [
      [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
      [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
    ],
  },
  'T': {
    color: '#800080', // Purple
    shapes: [
      [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
      [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
      [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
      [[1, 0, 0], [1, 1, 0], [1, 0, 0]],
    ],
  },
  'Z': {
    color: '#ff0000', // Red
    shapes: [
      [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
      [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    ],
  },
};

// Helper to create an empty grid
function createEmptyGrid(width: number, height: number): TetrisGrid {
  return Array(height).fill(null).map(() =>
    Array(width).fill(null).map(() => ({ isOccupied: false, color: '' }))
  );
}

// Helper to get a random Tetrimino
function getRandomTetrimino(): Tetrimino {
  const names = Object.keys(TETRIMINOS);
  const randomName = names[Math.floor(Math.random() * names.length)];
  const tetriminoData = TETRIMINOS[randomName as keyof typeof TETRIMINOS];
  const shape = tetriminoData.shapes[0]; // Start with first rotation
  const height = shape.length;
  const width = shape[0].length;

  // Position piece in the upper middle of the grid
  const initialX = Math.floor((GRID_WIDTH - width) / 2);
  const initialY = 0; // Start from the top

  return {
    shape: shape,
    color: tetriminoData.color,
    position: { x: initialX, y: initialY },
    rotation: 0,
  };
}

// Check if a piece can be placed at a given position/rotation
function canPlacePiece(grid: TetrisGrid, piece: Tetrimino, newPosition: { x: number; y: number }, newRotation: number): boolean {
  const nextShape = TETRIMINOS[piece.shape.toString()].shapes[newRotation % TETRIMINOS[piece.shape.toString()].shapes.length]; // Ensure rotation wraps around
  const pieceHeight = nextShape.length;
  const pieceWidth = nextShape[0].length;

  for (let y = 0; y < pieceHeight; y++) {
    for (let x = 0; x < pieceWidth; x++) {
      if (nextShape[y][x] !== 0) { // If it's a block of the piece
        const gridX = newPosition.x + x;
        const gridY = newPosition.y + y;

        // Check boundaries
        if (gridX < 0 || gridX >= GRID_WIDTH || gridY >= GRID_HEIGHT) {
          return false;
        }
        // Check collision with existing blocks on the grid
        if (gridY >= 0 && grid[gridY][gridX].isOccupied) {
          return false;
        }
      }
    }
  }
  return true;
}

// Locks the current piece onto the grid
function lockPiece(grid: TetrisGrid, piece: Tetrimino): TetrisGrid {
  const newGrid = grid.map(row => [...row]); // Deep copy
  const currentShape = TETRIMINOS[piece.shape.toString()].shapes[piece.rotation % TETRIMINOS[piece.shape.toString()].shapes.length];
  const pieceHeight = currentShape.length;
  const pieceWidth = currentShape[0].length;

  for (let y = 0; y < pieceHeight; y++) {
    for (let x = 0; x < pieceWidth; x++) {
      if (currentShape[y][x] !== 0) {
        const gridX = piece.position.x + x;
        const gridY = piece.position.y + y;
        if (gridY >= 0 && gridY < GRID_HEIGHT) { // Ensure within bounds
          newGrid[gridY][gridX] = { isOccupied: true, color: piece.color };
        }
      }
    }
  }
  return newGrid;
}

// Clears completed lines and returns the number of lines cleared
function clearLines(grid: TetrisGrid): { newGrid: TetrisGrid; linesCleared: number } {
  let linesCleared = 0;
  const newGrid = grid.filter(row => {
    if (row.every(cell => cell.isOccupied)) {
      linesCleared++;
      return false; // Remove this row
    }
    return true; // Keep this row
  });

  // Add empty rows at the top
  while (newGrid.length < GRID_HEIGHT) {
    newGrid.unshift(Array(GRID_WIDTH).fill(null).map(() => ({ isOccupied: false, color: '' })));
  }

  return { newGrid, linesCleared };
}

// Updates game speed based on level
function getGameSpeed(level: number): number {
  // Example: Speed increases with level. Start slower, then accelerate.
  // Level 0-5: 800ms, Level 6-10: 700ms, Level 11-15: 600ms, etc.
  // Max speed (e.g., 100ms)
  const baseSpeed = 800;
  const speedReduction = level * 40;
  return Math.max(100, baseSpeed - speedReduction);
}

// Calculates score based on lines cleared and level
function calculateScore(linesCleared: number, level: number): number {
  if (linesCleared === 0) return 0;
  const points = [0, 40, 100, 300, 1200]; // Points for 0, 1, 2, 3, 4 lines cleared
  const score = points[linesCleared] * (level + 1);
  return score;
}


// Reducer function to manage Tetris game state
export function tetrisReducer(state: TetrisState, action: { type: TetrisActionType; payload?: any }): TetrisState {
  let newGrid;
  let newPiece;
  let updatedScore;
  let updatedLinesCleared;
  let updatedLevel;
  let updatedGameSpeed;
  let isGameOver = state.isGameOver;

  switch (action.type) {
    case TetrisActionType.INIT_GAME: {
      const initialGrid = createEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
      const currentPiece = getRandomTetrimino();
      const nextPiece = getRandomTetrimino();
      return {
        ...state,
        grid: initialGrid,
        currentPiece: currentPiece,
        nextPiece: nextPiece,
        score: 0,
        level: 0,
        linesCleared: 0,
        isGameOver: false,
        gameSpeed: getGameSpeed(0),
      };
    }

    case TetrisActionType.MOVE_PIECE: {
      const { dx, dy } = action.payload;
      if (!state.currentPiece || state.isGameOver) return state;

      const newPosition = { x: state.currentPiece.position.x + dx, y: state.currentPiece.position.y + dy };
      if (canPlacePiece(state.grid, state.currentPiece, newPosition, state.currentPiece.rotation)) {
        newPiece = { ...state.currentPiece, position: newPosition };
        // Also update candidates/visuals if applicable to highlight potential drops or occupied spaces
      } else {
        newPiece = state.currentPiece; // Stay in place if move is not possible
      }
      return { ...state, currentPiece: newPiece };
    }

    case TetrisActionType.ROTATE_PIECE: {
      if (!state.currentPiece || state.isGameOver) return state;

      const newRotation = state.currentPiece.rotation + 1;
      if (canPlacePiece(state.grid, state.currentPiece, state.currentPiece.position, newRotation)) {
        newPiece = { ...state.currentPiece, rotation: newRotation };
      } else {
        newPiece = state.currentPiece; // Stay in place if rotation is not possible
      }
      return { ...state, currentPiece: newPiece };
    }

    case TetrisActionType.DROP_PIECE: { // Soft drop
      if (!state.currentPiece || state.isGameOver) return state;

      const newPosition = { ...state.currentPiece.position, y: state.currentPiece.position.y + 1 };
      if (canPlacePiece(state.grid, state.currentPiece, newPosition, state.currentPiece.rotation)) {
        newPiece = { ...state.currentPiece, position: newPosition };
        return { ...state, currentPiece: newPiece };
      } else {
        // If cannot move down, lock the piece
        return { ...state, type: TetrisActionType.LOCK_PIECE };
      }
    }

    case TetrisActionType.HARD_DROP: {
      if (!state.currentPiece || state.isGameOver) return state;

      let nextY = state.currentPiece.position.y;
      while (canPlacePiece(state.grid, state.currentPiece, { x: state.currentPiece.position.x, y: nextY + 1 }, state.currentPiece.rotation)) {
        nextY++;
      }
      newPiece = { ...state.currentPiece, position: { x: state.currentPiece.position.x, y: nextY } };
      return { ...state, currentPiece: newPiece, type: TetrisActionType.LOCK_PIECE }; // Immediately lock after hard drop
    }

    case TetrisActionType.LOCK_PIECE: {
      if (!state.currentPiece) return state;

      newGrid = lockPiece(state.grid, state.currentPiece);
      // After locking, check for line clears
      return { ...state, grid: newGrid, type: TetrisActionType.CLEAR_LINES };
    }

    case TetrisActionType.CLEAR_LINES: {
      const { newGrid, linesCleared } = clearLines(state.grid);
      updatedScore = state.score + calculateScore(linesCleared, state.level);
      updatedLinesCleared = state.linesCleared + linesCleared;
      updatedLevel = Math.floor(updatedLinesCleared / 10); // Increase level every 10 lines
      updatedGameSpeed = getGameSpeed(updatedLevel);

      const nextPieceForSpawn = state.nextPiece || getRandomTetrimino(); // Use next piece, generate new one if needed
      const nextCurrentPiece = getRandomTetrimino(); // Generate a new next piece

      // Check if the new piece can be placed, if not, game over
      if (!canPlacePiece(newGrid, nextPieceForSpawn, nextPieceForSpawn.position, nextPieceForSpawn.rotation)) {
        return { ...state, grid: newGrid, score: updatedScore, linesCleared: updatedLinesCleared, level: updatedLevel, gameSpeed: updatedGameSpeed, type: TetrisActionType.GAME_OVER, currentPiece: null, nextPiece: null };
      }

      return {
        ...state,
        grid: newGrid,
        currentPiece: nextPieceForSpawn,
        nextPiece: nextCurrentPiece,
        score: updatedScore,
        linesCleared: updatedLinesCleared,
        level: updatedLevel,
        gameSpeed: updatedGameSpeed,
      };
    }
    
    case TetrisActionType.GENERAT_NEW_PIECE: {
        // This action is typically triggered after locking a piece and checking lines
        // It should spawn the 'nextPiece' as the 'currentPiece' and generate a new 'nextPiece'
        // It also needs to check for game over condition
        const nextPieceForSpawn = state.nextPiece || getRandomTetrimino();
        const newNextPiece = getRandomTetrimino();

        if (!canPlacePiece(state.grid, nextPieceForSpawn, nextPieceForSpawn.position, nextPieceForSpawn.rotation)) {
            return { ...state, type: TetrisActionType.GAME_OVER, currentPiece: null, nextPiece: null };
        }
        return {
            ...state,
            currentPiece: nextPieceForSpawn,
            nextPiece: newNextPiece,
        };
    }

    case TetrisActionType.GAME_OVER: {
      if (state.timerIntervalRef) { // Assuming timerIntervalRef is accessible or managed externally
        clearInterval(state.timerIntervalRef.current as NodeJS.Timeout); // Clean up timer
      }
      return { ...state, isGameOver: true, currentPiece: null, nextPiece: null };
    }

    default:
      return state;
  }
}

// --- Initialization ---
export function getInitialTetrisState(): TetrisState {
  const initialGrid = createEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
  const currentPiece = getRandomTetrimino();
  const nextPiece = getRandomTetrimino();
  return {
    grid: initialGrid,
    currentPiece: currentPiece,
    nextPiece: nextPiece,
    score: 0,
    level: 0,
    linesCleared: 0,
    isGameOver: false,
    gameSpeed: getGameSpeed(0),
  };
}
