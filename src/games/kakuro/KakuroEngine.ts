// src/games/kakuro/KakuroEngine.ts

export interface KakuroCell {
  value: number | null; // The number placed in the cell
  isPreFilled: boolean; // Whether the number was part of the initial puzzle
  isCandidate: boolean; // For pencil marks
  isValid: boolean; // Visual feedback for errors
}

export interface Clue {
  sum: number;
  direction: 'across' | 'down';
  length: number; // Number of cells in the run
}

export type KakuroGrid = Array<Array<KakuroCell | Clue | null>>; // Grid can contain cells, clues, or be empty

export interface KakuroState {
  grid: KakuroGrid;
  clues: Map<string, Clue>; // Map of 'row-col' to clue information
  selectedCell: { row: number; col: number } | null;
  selectedNumber: number | null; // Number selected from palette
  currentNumber: number; // Number player is currently trying to place
  maxNumber: number; // Max number in the grid (e.g., 9)
  timer: number; // in seconds
  isGameActive: boolean;
  isPuzzleComplete: boolean;
  errors: number;
  // Best time, etc.
}

export enum KakuroActionType {
  INIT_PUZZLE = 'INIT_PUZZLE',
  TAP_CELL = 'TAP_CELL',
  PLACE_NUMBER = 'PLACE_NUMBER',
  TOGGLE_CANDIDATE = 'TOGGLE_CANDIDATE',
  ERASE_NUMBER = 'ERASE_NUMBER',
  RESET_GAME = 'RESET_GAME',
  CHECK_SOLUTION = 'CHECK_SOLUTION',
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER',
  UPDATE_TIMER = 'UPDATE_TIMER',
  VALIDATE_GRID = 'VALIDATE_GRID',
}

// --- Game Constants ---
const DEFAULT_GRID_SIZE = 4; // Standard grid size, e.g., 4x4

// --- Helper Functions ---

// Shuffles an array in place
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generates a Kakuro puzzle (simplified placeholder)
function generateKakuroPuzzle(size: number): { grid: KakuroGrid; clues: Map<string, Clue> } {
  const grid: KakuroGrid = Array(size).fill(null).map(() => Array(size).fill(null));
  const clues = new Map<string, Clue>();
  const numbers = Array.from({ length: size * size }, (_, i) => i + 1);
  const shuffledNumbers = shuffleArray(numbers);

  // Placeholder: Manually place some clues and numbers for a small grid
  // A real generator would be far more complex.
  
  // Example for a 4x4 grid
  if (size === 4) {
    // Clue for across run (e.g., row 1, cols 1-2 sum to 7)
    clues.set('1-0', { sum: 7, direction: 'across', length: 2 });
    grid[1][0] = { sum: 7, direction: 'across', length: 2 }; // Clue cell
    grid[1][1] = { value: null, isPreFilled: true, isCandidate: false, isValid: true }; // Run cell 1
    grid[1][2] = { value: null, isPreFilled: true, isCandidate: false, isValid: true }; // Run cell 2
    
    // Clue for down run (e.g., col 1, rows 1-2 sum to 12)
    clues.set('0-1', { sum: 12, direction: 'down', length: 2 });
    grid[0][1] = { sum: 12, direction: 'down', length: 2 }; // Clue cell
    grid[1][1] = { value: null, isPreFilled: true, isCandidate: false, isValid: true }; // Run cell 1 (shared)
    grid[2][1] = { value: null, isPreFilled: true, isCandidate: false, isValid: true }; // Run cell 2

    // Add some pre-filled numbers to start
    grid[1][1] = { value: 3, isPreFilled: true, isCandidate: false, isValid: true };
    grid[1][2] = { value: 4, isPreFilled: true, isCandidate: false, isValid: true };
    grid[2][1] = { value: 7, isPreFilled: true, isCandidate: false, isValid: true };

    // Other cells are empty placeholders
    for(let r=0; r<size; r++) {
        for(let c=0; c<size; c++) {
            if(grid[r][c] === null) {
                grid[r][c] = { value: null, isPreFilled: false, isCandidate: false, isValid: true };
            }
        }
    }
  } else {
      // For other sizes, fill with empty cells
       for(let r=0; r<size; r++) {
        for(let c=0; c<size; c++) {
            if(grid[r][c] === null) {
                grid[r][c] = { value: null, isPreFilled: false, isCandidate: false, isValid: true };
            }
        }
    }
  }
  
  return { grid, clues };
}

// Checks if a number placement is valid according to Kakuro rules
export function isValidKakuroPlacement(grid: KakuroGrid, clues: Map<string, Clue>, row: number, col: number, num: number): boolean {
  // This function needs to check:
  // 1. Row uniqueness for the run containing (row, col).
  // 2. Column uniqueness for the run containing (row, col).
  // 3. Sum constraint for the run(s) containing (row, col).
  // This is complex due to runs spanning multiple cells and the grid structure.
  // Placeholder returning true.
  return true;
}

// Checks if the entire grid is a correct solution
export function checkKakuroSolution(grid: KakuroGrid, clues: Map<string, Clue>, size: number): boolean {
  // Iterate through all clues and check if their runs sum correctly and have unique numbers.
  // Also check all number cells are filled and valid.
  // Placeholder returning false.
  return false;
}

// Recalculates candidates for empty cells
export function recalculateCandidates(grid: KakuroGrid, clues: Map<string, Clue>, size: number): Map<string, Set<number>> {
  const candidatesMap = new Map<string, Set<number>>();
  // Logic to determine possible candidates for each empty cell based on row/col/sum constraints.
  // Placeholder returns an empty map.
  return candidatesMap;
}

// Reducer function to manage Kakuro game state
export function kakuroReducer(state: KakuroState, action: { type: KakuroActionType; payload?: any }): KakuroState {
  switch (action.type) {
    case KakuroActionType.INIT_PUZZLE: {
      const { size = DEFAULT_GRID_SIZE } = action.payload || {};
      const { grid, clues } = generateKakuroPuzzle(size);
      const candidates = recalculateCandidates(grid, clues, size);
      return {
        ...state,
        grid: grid,
        clues: clues,
        selectedCell: null,
        selectedNumber: null,
        currentNumber: 1, // Standard starting point
        maxNumber: size, // Assuming max number is grid size, adjust if needed
        timer: 0,
        isGameActive: false,
        isPuzzleComplete: false,
        errors: 0,
      };
    }
    case KakuroActionType.TAP_CELL: {
      const { row, col } = action.payload;
      const cellOrClue = state.grid[row][col];
      
      // Cannot interact with clue cells or pre-filled numbers
      if (typeof cellOrClue !== 'object' || cellOrClue === null || cellOrClue.isPreFilled || cellOrClue.value !== null) {
          // If it's a clue cell or already has a number, just select it and clear number palette selection
          if (cellOrClue && typeof cellOrClue === 'object' && cellOrClue.value === null && !cellOrClue.isPreFilled) {
             // If it's an empty cell but not pre-filled (e.g., part of a run)
             return { ...state, selectedCell: { row, col }, selectedNumber: null };
          }
          return state; // Ignore tap on clue cells or pre-filled cells
      }

      const newSelectedCell = { row, col };
      // If game is not active, first tap starts timer and activates game (if it's a valid cell)
      if (!state.isGameActive) {
          // First correct tap on an empty cell activates the game
          // Need to confirm this is an empty cell, not a clue cell
          // For now, assuming any non-prefilled, non-clue cell tap starts the game.
          return { ...state, selectedCell: newSelectedCell, isGameActive: true };
      }

      return { ...state, selectedCell: newSelectedCell, selectedNumber: null }; // Deselect number if cell is selected
    }
    case KakuroActionType.PLACE_NUMBER: {
      const { number } = action.payload;
      if (!state.selectedCell) return state;

      const { row, col } = state.selectedCell;
      const cell = state.grid[row][col];

      // Cannot place number in clue cells or pre-filled cells
      if (typeof cell !== 'object' || cell === null || cell.isPreFilled || cell.value !== null) {
        return state;
      }

      const newGrid = state.grid.map(rowArr => [...rowArr]);
      // Update cell with the number, clear candidate, reset validity
      newGrid[row][col] = { ...cell, value: number, isCandidate: false, isValid: true };
      
      // Recalculate candidates for affected runs (complex)
      // For now, simply place the number.
      
      // Trigger full grid validation to update error count/cell validity
      const { updatedGrid, errors } = validateGrid(newGrid, state.clues, state.gridSize);

      const isComplete = checkKakuroSolution(updatedGrid, state.clues, state.gridSize); // Placeholder

      return { ...state, grid: updatedGrid, selectedNumber: number, selectedCell: null, errors: errors, isPuzzleComplete: isComplete };
    }
    case KakuroActionType.ERASE_NUMBER: {
      if (!state.selectedCell) return state;
      const { row, col } = state.selectedCell;
      const cell = state.grid[row][col];
      
      if (typeof cell !== 'object' || cell === null || cell.isPreFilled || cell.value === null) {
        return state;
      }
      
      const newGrid = state.grid.map(rowArr => [...rowArr]);
      newGrid[row][col] = { ...cell, value: null, isCandidate: false, isValid: true };
      
      const { updatedGrid, errors } = validateGrid(newGrid, state.clues, state.gridSize);
      return { ...state, grid: updatedGrid, selectedCell: null, errors: errors };
    }
    case KakuroActionType.TOGGLE_CANDIDATE: {
      const { number } = action.payload;
      if (!state.selectedCell) return state;
      const { row, col } = state.selectedCell;
      const cell = state.grid[row][col];

      if (typeof cell !== 'object' || cell === null || cell.isPreFilled || cell.value !== null) {
        return state; // Cannot add candidate to clue cells or already filled cells
      }
      
      const newGrid = state.grid.map(rowArr => [...rowArr]);
      // Toggle candidate status on the cell object
      newGrid[row][col] = { ...cell, isCandidate: !cell.isCandidate, isValid: true }; // Assume valid for now
      
      // In a real UI, candidates would be visually distinct. This state change might just toggle a flag.
      // For now, we just update the cell's flag. Candidate management needs a separate state or approach.

      return { ...state, grid: newGrid, selectedCell: { row, col } }; // Keep cell selected
    }
    case KakuroActionType.RESET_GAME: {
      const { size = DEFAULT_GRID_SIZE } = action.payload || {};
      const { grid, clues } = generateKakuroPuzzle(size);
      const candidates = recalculateCandidates(grid, clues, size);
      return {
        ...state,
        grid: grid,
        clues: clues,
        selectedCell: null,
        selectedNumber: null,
        currentNumber: 1,
        maxNumber: size,
        timer: 0,
        isGameActive: false,
        isPuzzleComplete: false,
        errors: 0,
      };
    }
    case KakuroActionType.CHECK_SOLUTION: {
      const isComplete = checkKakuroSolution(state.grid, state.clues, state.gridSize.width);
      // Also perform validation to highlight errors
      const { updatedGrid, errors } = validateGrid(state.grid, state.clues, state.gridSize);
      return { ...state, grid: updatedGrid, isPuzzleComplete: isComplete, errors: errors };
    }
    case KakuroActionType.VALIDATE_GRID: {
      const { updatedGrid, errors } = validateGrid(state.grid, state.clues, state.gridSize);
      return { ...state, grid: updatedGrid, errors: errors };
    }
    case KakuroActionType.UPDATE_TIMER: {
      return { ...state, timer: action.payload };
    }
    // START_TIMER and STOP_TIMER handled by useEffect in component
    default:
      return state;
  }
}

// --- Placeholder Validation Logic ---
// These functions are crucial for Kakuro and need robust implementation.

function validateGrid(grid: KakuroGrid, clues: Map<string, Clue>, size: number): { updatedGrid: KakuroGrid; errors: number } {
  const updatedGrid = grid.map(rowArr => rowArr.map(cell => {
    if (cell && typeof cell === 'object') { // Check if it's a cell, not a clue
      return { ...cell, isValid: true };
    }
    return cell; // Keep clue cells as they are
  }));
  let errorCount = 0;

  // Basic validation: check for conflicts in rows/columns and incomplete runs
  // Full validation involves checking sums and uniqueness for each run against clues.
  // This is a placeholder.

  // Check for immediate conflicts (duplicate numbers in row/col)
  for(let r=0; r<size; r++) {
    for(let c=0; c<size; c++) {
      const cell = updatedGrid[r][c];
      if (cell && typeof cell === 'object' && cell.value !== null && !cell.isPreFilled) {
        // Check row for duplicates
        for(let c2=0; c2<size; c2++) {
          if (c !== c2 && updatedGrid[r][c2] && typeof updatedGrid[r][c2] === 'object' && (updatedGrid[r][c2] as KakuroCell).value === cell.value) {
            cell.isValid = false;
            (updatedGrid[r][c2] as KakuroCell).isValid = false; // Mark both as invalid
            errorCount++;
          }
        }
        // Check column for duplicates
        for(let r2=0; r2<size; r2++) {
          if (r !== r2 && updatedGrid[r2][c] && typeof updatedGrid[r2][c] === 'object' && (updatedGrid[r2][c] as KakuroCell).value === cell.value) {
            cell.isValid = false;
            (updatedGrid[r2][c] as KakuroCell).isValid = false;
            errorCount++;
          }
        }
        // This simple check might double count errors if a number is duplicated multiple times.
        // A more robust error counting strategy might be needed.
      }
    }
  }
  // Normalize error count to be unique errors
  // This is a simplified approach. A better method would track unique conflicting cells.

  return { updatedGrid: updatedGrid.map(row => row.map(cell => (cell && typeof cell === 'object' && !cell.isValid ? {...cell, isValid: false} : cell))), errors: errorCount };
}

// --- Initialization ---
export function getInitialKakuroState(size: number = DEFAULT_GRID_SIZE): KakuroState {
  const { grid, clues } = generateKakuroPuzzle(size);
  const candidates = recalculateCandidates(grid, clues, size);
  return {
    grid: grid,
    clues: clues,
    selectedCell: null,
    selectedNumber: null,
    currentNumber: 1,
    maxNumber: size,
    timer: 0,
    isGameActive: false,
    isPuzzleComplete: false,
    errors: 0,
  };
}
