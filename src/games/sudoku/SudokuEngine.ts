import { GameConfig } from '../registry';

// --- Game Logic Module for Sudoku ---

export interface SudokuCell {
  value: number | null; // 0 or null for empty, 1-9 for filled
  isPreFilled: boolean;
  isCandidate: boolean; // For pencil marks
  isValid: boolean; // Visual feedback for errors
}

export type SudokuGrid = SudokuCell[][];

export interface SudokuState {
  grid: SudokuGrid;
  preFilledGrid: SudokuGrid; // Original puzzle state
  candidates: Map<string, Set<number>>; // Map of 'row-col' to candidate numbers
  currentLevel: number; // 0 for Easy, 1 for Medium, 2 for Hard
  timer: number; // in seconds
  isSolved: boolean;
  errors: number;
  // Add a flag to track if game is initialized to prevent multiple initializations
  isInitialized: boolean; 
}

export enum SudokuActionType {
  INIT_GAME = 'INIT_GAME',
  PLACE_NUMBER = 'PLACE_NUMBER',
  TOGGLE_CANDIDATE = 'TOGGLE_CANDIDATE',
  ERASE_NUMBER = 'ERASE_NUMBER',
  RESET_GAME = 'RESET_GAME',
  CHECK_SOLUTION = 'CHECK_SOLUTION',
  UPDATE_TIMER = 'UPDATE_TIMER',
  SET_ERRORS = 'SET_ERRORS',
  VALIDATE_GRID = 'VALIDATE_GRID', // New action to validate entire grid
}

// --- Puzzle Generation & Solving ---
// A more robust (but still simplified for this context) Sudoku generator using backtracking.
// For production, a more sophisticated algorithm would be preferred.

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isValid(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c].value === num) return false;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col].value === num) return false;
  }
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c].value === num) return false;
    }
  }
  return true;
}

function solveSudoku(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col].value = num;
            if (solveSudoku(grid)) return true;
            grid[row][col].value = null; // Backtrack
          }
        }
        return false; // Trigger backtracking
      }
    }
  }
  return true; // Solved
}

// Generates a Sudoku puzzle
export function generateSudoku(level: number): { grid: SudokuGrid; preFilledGrid: SudokuGrid } {
  // Create an empty grid
  const baseGrid: SudokuGrid = Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({ value: null, isPreFilled: false, isCandidate: false, isValid: true }))
  );

  // Fill the diagonal 3x3 boxes first to ensure a valid start
  for (let i = 0; i < 9; i++) {
    const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let k = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        baseGrid[i * 3 + r][i * 3 + c].value = nums[k++];
      }
    }
  }

  // Solve the pre-filled grid to get a complete, valid Sudoku
  solveSudoku(baseGrid);
  const solvedGrid = JSON.parse(JSON.stringify(baseGrid)) as SudokuGrid; // Deep copy

  // Determine number of cells to remove based on difficulty
  let cellsToRemove: number;
  switch (level) {
    case 0: cellsToRemove = 40; break; // Easy
    case 1: cellsToRemove = 49; break; // Medium
    case 2: cellsToRemove = 58; break; // Hard
    default: cellsToRemove = 45; break; // Default to Medium-ish
  }

  const puzzleGrid: SudokuGrid = JSON.parse(JSON.stringify(solvedGrid)); // Copy of solved grid to create puzzle

  let attempts = 0;
  while (cellsToRemove > 0 && attempts < 1000) { // Limit attempts to prevent infinite loop
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzleGrid[row][col].value !== null) {
      const tempValue = puzzleGrid[row][col].value;
      puzzleGrid[row][col].value = null; // Remove the number
      
      // Check if the puzzle still has a unique solution (simplified check)
      // A full unique solution check is complex and computationally expensive.
      // For simplicity here, we just ensure it's still solvable.
      const tempGridForCheck = JSON.parse(JSON.stringify(puzzleGrid)) as SudokuGrid;
      if (solveSudoku(tempGridForCheck)) {
        cellsToRemove--;
      } else {
        puzzleGrid[row][col].value = tempValue; // Put it back if removing it made it unsolvable
      }
    }
    attempts++;
  }

  // Mark pre-filled cells
  const preFilledGrid: SudokuGrid = puzzleGrid.map(rowArr =>
    rowArr.map(cell => ({
      ...cell,
      isPreFilled: cell.value !== null,
      isValid: true, // Assume valid initially
    }))
  );

  return { grid: JSON.parse(JSON.stringify(puzzleGrid)), preFilledGrid };
}

// Checks if the current grid state is a complete and valid solution
export function checkSudokuSolution(grid: SudokuGrid): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = grid[r][c];
      if (cell.value === null || !isValid(grid, r, c, cell.value!)) {
        return false; // Found an empty cell or an invalid placement
      }
    }
  }
  return true; // All cells filled and valid
}

// Calculates candidates for a given cell
export function calculateCandidates(grid: SudokuGrid, row: number, col: number): Set<number> {
  if (grid[row][col].value !== null || grid[row][col].isPreFilled) {
    return new Set(); // No candidates for filled or pre-filled cells
  }

  const possible = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Check row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c].value !== null) possible.delete(grid[row][c].value!);
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col].value !== null) possible.delete(grid[r][col].value!);
  }
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c].value !== null) {
        possible.delete(grid[startRow + r][startCol + c].value!);
      }
    }
  }
  return possible;
}

// Recalculates all candidates for all empty cells
export function recalculateAllCandidates(grid: SudokuGrid): Map<string, Set<number>> {
  const candidatesMap = new Map<string, Set<number>>();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c].value === null && !grid[r][c].isPreFilled) {
        const candidates = calculateCandidates(grid, r, c);
        if (candidates.size > 0) {
          candidatesMap.set(`${r}-${c}`, candidates);
        }
      }
    }
  }
  return candidatesMap;
}

// Validates the entire grid for correctness and highlights errors
export function validateGrid(grid: SudokuGrid): { updatedGrid: SudokuGrid; errors: number } {
  const updatedGrid = grid.map(rowArr => rowArr.map(cell => ({ ...cell, isValid: true }))); // Reset all validity flags
  let errorCount = 0;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = updatedGrid[r][c];
      if (cell.value !== null && !cell.isPreFilled) {
        if (!isValid(updatedGrid, r, c, cell.value!)) {
          cell.isValid = false;
          errorCount++;
        }
      }
    }
  }
  return { updatedGrid, errors: errorCount };
}


// Reducer function to manage Sudoku game state
export function sudokuReducer(state: SudokuState, action: { type: SudokuActionType; payload?: any }): SudokuState {
  switch (action.type) {
    case SudokuActionType.INIT_GAME: {
      if (state.isInitialized) return state; // Prevent re-initialization
      const { grid, preFilledGrid } = generateSudoku(state.currentLevel);
      const candidates = recalculateAllCandidates(grid);
      // Perform initial validation to mark any errors in the generated puzzle itself (should be rare)
      const { updatedGrid: validatedGrid, errors: initialErrors } = validateGrid(grid);
      
      return {
        ...state,
        grid: validatedGrid,
        preFilledGrid: preFilledGrid,
        candidates: candidates,
        timer: 0,
        isSolved: false,
        errors: initialErrors,
        isInitialized: true,
      };
    }
    case SudokuActionType.PLACE_NUMBER: {
      const { row, col, number } = action.payload;
      if (state.grid[row][col].isPreFilled) return state; // Cannot change pre-filled cells

      const newGrid = state.grid.map(rowArr => [...rowArr]); // Deep copy
      newGrid[row][col] = { ...newGrid[row][col], value: number, isCandidate: false, isValid: true }; // Place number, clear candidate, reset validity

      // Recalculate candidates for affected cells
      const candidates = recalculateAllCandidates(newGrid);
      
      // Update error count by re-validating
      const { updatedGrid: validatedGrid, errors } = validateGrid(newGrid);

      const isSolved = checkSudokuSolution(validatedGrid); 
      return { ...state, grid: validatedGrid, candidates, errors, isSolved };
    }
    case SudokuActionType.ERASE_NUMBER: {
      const { row, col } = action.payload;
      if (state.grid[row][col].isPreFilled) return state;

      const newGrid = state.grid.map(rowArr => [...rowArr]);
      newGrid[row][col] = { ...newGrid[row][col], value: null, isCandidate: false, isValid: true };
      const candidates = recalculateAllCandidates(newGrid);
      const { updatedGrid: validatedGrid, errors } = validateGrid(newGrid);
      return { ...state, grid: validatedGrid, candidates, errors };
    }
    case SudokuActionType.TOGGLE_CANDIDATE: {
      const { row, col, number } = action.payload;
      if (state.grid[row][col].isPreFilled || state.grid[row][col].value !== null) return state; // Cannot toggle candidate on pre-filled or already set cells

      const candidateKey = `${row}-${col}`;
      const currentCandidates = state.candidates.get(candidateKey) || new Set<number>();
      
      if (currentCandidates.has(number)) {
        currentCandidates.delete(number);
      } else {
        currentCandidates.add(number);
      }

      const newCandidates = new Map(state.candidates);
      newCandidates.set(candidateKey, currentCandidates);

      return { ...state, candidates: newCandidates };
    }
    case SudokuActionType.RESET_GAME: {
      // Resetting to the initial pre-filled state
      const initialGrid = state.preFilledGrid.map(rowArr => ({ ...rowArr, isValid: true, isCandidate: false }));
      const candidates = recalculateAllCandidates(initialGrid);
      return {
        ...state,
        grid: initialGrid,
        candidates: candidates,
        timer: 0,
        isSolved: false,
        errors: 0,
        isInitialized: false, // Allow re-initialization
      };
    }
    case SudokuActionType.CHECK_SOLUTION: {
      // This action should likely trigger validation of the current grid state
      const { updatedGrid, errors } = validateGrid(state.grid);
      const isSolved = checkSudokuSolution(updatedGrid); // Final check if all cells are filled and valid
      return { ...state, grid: updatedGrid, isSolved, errors };
    }
    case SudokuActionType.VALIDATE_GRID: {
      // Action to re-validate the entire grid, useful after many user inputs
      const { updatedGrid, errors } = validateGrid(state.grid);
      return { ...state, grid: updatedGrid, errors };
    }
    case SudokuActionType.UPDATE_TIMER: {
      return { ...state, timer: action.payload };
    }
    // START_TIMER and STOP_TIMER are handled by useEffect in the component,
    // as managing setInterval directly in the reducer can be tricky.
    default:
      return state;
  }
}

// --- Helper for Cell Placement Validity (Re-used from Cell.tsx or Engine) ---
// This function checks if placing a number in a specific cell is valid according to Sudoku rules
// without checking against pre-filled cells (handled by caller).
export function isValidPlacement(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c].value === num) return false;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col].value === num) return false;
  }
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (startRow + r === row && startCol + c === col) continue;
      if (grid[startRow + r][startCol + c].value === num) return false;
    }
  }
  return true;
}
