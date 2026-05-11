// src/games/schultetable/SchulteTableEngine.ts

export interface SchulteCell {
  value: number | null;
  isTarget: boolean; // Whether this cell is the next expected number
  isTapped: boolean; // Whether this cell has been tapped
}

export type SchulteGrid = SchulteCell[][];

export interface SchulteTableState {
  grid: SchulteGrid;
  currentNumber: number; // The number the player is currently looking for
  maxNumber: number; // The highest number in the grid (e.g., 25 for a 5x5)
  timer: number; // in seconds
  isGameActive: boolean;
  isGameOver: boolean;
  bestTime: number | null; // To store best times
}

export enum SchulteTableActionType {
  INIT_GAME = 'INIT_GAME',
  TAP_CELL = 'TAP_CELL',
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER',
  UPDATE_TIMER = 'UPDATE_TIMER',
  RESET_GAME = 'RESET_GAME',
}

// --- Game Constants ---
const DEFAULT_GRID_SIZE = 5; // Standard 5x5 grid

// --- Helper Functions ---

// Shuffles an array in place
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generates a Schulte Table grid
function generateSchulteGrid(size: number): { grid: SchulteGrid; maxNumber: number } {
  const maxNumber = size * size;
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const shuffledNumbers = shuffleArray(numbers);

  const grid: SchulteGrid = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({ value: null, isTarget: false, isTapped: false }))
  );

  let k = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      grid[r][c] = { value: shuffledNumbers[k++], isTarget: false, isTapped: false };
    }
  }

  // Mark the first target number
  if (grid[0][0].value === 1) {
    grid[0][0].isTarget = true;
  } else {
    // Find and mark the cell with value 1
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c].value === 1) {
          grid[r][c].isTarget = true;
          break;
        }
      }
    }
  }
  
  return { grid, maxNumber };
}


// --- Reducer function to manage Schulte Table game state ---
export function schulteTableReducer(state: SchulteTableState, action: { type: SchulteTableActionType; payload?: any }): SchulteState {
  switch (action.type) {
    case SchulteTableActionType.INIT_GAME: {
      const { size = DEFAULT_GRID_SIZE } = action.payload || {};
      const { grid, maxNumber } = generateSchulteGrid(size);
      return {
        ...state,
        grid: grid,
        currentNumber: 1,
        maxNumber: maxNumber,
        timer: 0,
        isGameActive: false, // Game starts inactive until first tap
        isGameOver: false,
      };
    }
    case SchulteTableActionType.TAP_CELL: {
      const { row, col } = action.payload;
      const cell = state.grid[row][col];
      
      // If game is not active, first tap starts the timer and activates the game
      if (!state.isGameActive) {
          // Mark the first tap as active and start timer
          const newGrid = state.grid.map(rowArr => [...rowArr]);
          if (newGrid[row][col].value === state.currentNumber) {
              newGrid[row][col].isTapped = true;
              newGrid[row][col].isTarget = false; // No longer the target
              const nextNumber = state.currentNumber + 1;
              if (nextNumber <= state.maxNumber) {
                  // Find and mark the next target number
                  for (let r = 0; r < newGrid.length; r++) {
                      for (let c = 0; c < newGrid[r].length; c++) {
                          if (newGrid[r][c].value === nextNumber) {
                              newGrid[r][c].isTarget = true;
                              break;
                          }
                      }
                  }
              }
              // Check for game completion
              const isGameOver = nextNumber > state.maxNumber;
              return {
                  ...state,
                  grid: newGrid,
                  currentNumber: nextNumber,
                  isGameActive: true, // Start timer after first correct tap
                  isGameOver: isGameOver,
              };
          } else {
              // Incorrect first tap - do nothing or maybe signal error?
              return state;
          }
      }

      // If game is active and player taps the correct next number
      if (cell.value === state.currentNumber) {
        const newGrid = state.grid.map(rowArr => [...rowArr]);
        newGrid[row][col].isTapped = true;
        newGrid[row][col].isTarget = false; // No longer the target
        const nextNumber = state.currentNumber + 1;

        // Find and mark the next target number
        let foundNext = false;
        if (nextNumber <= state.maxNumber) {
            for (let r = 0; r < newGrid.length; r++) {
                for (let c = 0; c < newGrid[r].length; c++) {
                    if (newGrid[r][c].value === nextNumber) {
                        newGrid[r][c].isTarget = true;
                        foundNext = true;
                        break;
                    }
                }
                if (foundNext) break;
            }
        }

        const isGameOver = nextNumber > state.maxNumber;
        return { ...state, grid: newGrid, currentNumber: nextNumber, isGameOver: isGameOver };
      } else {
        // Incorrect tap - player might need feedback or penalty
        // For simplicity, we don't penalize incorrect taps, just ignore them unless game rules specify otherwise.
        return state;
      }
    }
    case SchulteTableActionType.START_TIMER: {
      // This action might be a signal, but timer is usually managed by useEffect
      return state;
    }
    case SchulteTableActionType.STOP_TIMER: {
      // Timer stop signal, managed by useEffect
      return state;
    }
    case SchulteTableActionType.UPDATE_TIMER: {
      // Timer is ticking
      return { ...state, timer: action.payload };
    }
    case SchulteTableActionType.RESET_GAME: {
      const { size = DEFAULT_GRID_SIZE } = action.payload || {};
      const { grid, maxNumber } = generateSchulteGrid(size);
      return {
        ...state,
        grid: grid,
        currentNumber: 1,
        maxNumber: maxNumber,
        timer: 0,
        isGameActive: false,
        isGameOver: false,
      };
    }
    default:
      return state;
  }
}

// --- Initialization ---
export function getInitialSchulteTableState(size: number = DEFAULT_GRID_SIZE): SchulteTableState {
  const { grid, maxNumber } = generateSchulteGrid(size);
  return {
    grid: grid,
    currentNumber: 1,
    maxNumber: maxNumber,
    timer: 0,
    isGameActive: false,
    isGameOver: false,
    bestTime: null,
  };
}
