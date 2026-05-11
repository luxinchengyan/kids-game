// src/games/huarongpass/HuarongPassEngine.ts

export interface Piece {
  id: string;
  type: ' CaoCao' | 'ZhuRong' | 'ZhenAi' | 'CaoCao' | 'other'; // Example piece types
  width: number; // Width in grid units
  height: number; // Height in grid units
  position: { x: number; y: number }; // Grid coordinates (top-left of bounding box)
  color: string;
}

export type HuarongGrid = Array<Array<string | null>>; // Grid stores piece IDs or null

export interface HuarongPassState {
  grid: HuarongGrid;
  pieces: Piece[];
  targetPieceId: string | null; // ID of the piece that needs to reach the exit
  exitPosition: { x: number; y: number }; // Target grid coordinates for the target piece
  gridSize: { width: number; height: number };
  moves: number;
  isPuzzleComplete: boolean;
  // Other states like timer, etc.
}

export enum HuarongPassActionType {
  INIT_PUZZLE = 'INIT_PUZZLE',
  SELECT_PIECE = 'SELECT_PIECE',
  MOVE_PIECE = 'MOVE_PIECE',
  ROTATE_PIECE = 'ROTATE_PIECE',
  DESELECT_PIECE = 'DESELECT_PIECE',
  CHECK_PUZZLE_COMPLETE = 'CHECK_PUZZLE_COMPLETE',
}

// --- Game Constants ---
const DEFAULT_GRID_WIDTH = 4;
const DEFAULT_GRID_HEIGHT = 5;

// --- Helper Functions ---

// Creates an empty grid
function createEmptyGrid(width: number, height: number): HuarongGrid {
  return Array(height).fill(null).map(() => Array(width).fill(null));
}

// Generates a basic Huarong Pass puzzle (simplified)
function generateHuarongPuzzle(width: number, height: number): { grid: HuarongGrid; pieces: Piece[]; targetPieceId: string | null; exitPosition: { x: number; y: number } } {
  const grid = createEmptyGrid(width, height);
  const pieces: Piece[] = [];
  let idCounter = 0;

  // Simplified piece placement for a basic puzzle (e.g., classic Huarong Pass setup)
  // This generation logic needs to be sophisticated to ensure solvability and difficulty.
  
  // Target Piece (Cao Cao - 2x2)
  const caoCao: Piece = { id: `piece-${idCounter++}`, type: 'CaoCao', width: 2, height: 2, position: { x: 1, y: 0 }, color: '#8b0000', vertices: [], origin: { x: 1, y: 1 }, rotation: 0, scale: 1 };
  pieces.push(caoCao);
  grid[0][1] = caoCao.id; grid[0][2] = caoCao.id;
  grid[1][1] = caoCao.id; grid[1][2] = caoCao.id;

  // Vertical pieces (2x1)
  const verticalPiece1: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 1, height: 2, position: { x: 0, y: 0 }, color: '#0000ff', vertices: [], origin: { x: 0.5, y: 1 }, rotation: 0, scale: 1 };
  pieces.push(verticalPiece1);
  grid[0][0] = verticalPiece1.id; grid[1][0] = verticalPiece1.id;

  const verticalPiece2: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 1, height: 2, position: { x: 3, y: 0 }, color: '#0000ff', vertices: [], origin: { x: 0.5, y: 1 }, rotation: 0, scale: 1 };
  pieces.push(verticalPiece2);
  grid[0][3] = verticalPiece2.id; grid[1][3] = verticalPiece2.id;

  // Horizontal pieces (1x2)
  const horizontalPiece1: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 2, height: 1, position: { x: 1, y: 2 }, color: '#ff7f00', vertices: [], origin: { x: 1, y: 0.5 }, rotation: 0, scale: 1 };
  pieces.push(horizontalPiece1);
  grid[2][1] = horizontalPiece1.id; grid[2][2] = horizontalPiece1.id;

  const horizontalPiece2: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 2, height: 1, position: { x: 1, y: 3 }, color: '#ff7f00', vertices: [], origin: { x: 1, y: 0.5 }, rotation: 0, scale: 1 };
  pieces.push(horizontalPiece2);
  grid[3][1] = horizontalPiece2.id; grid[3][2] = horizontalPiece2.id;
  
  // Smallest pieces (1x1)
  const smallPiece1: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 1, height: 1, position: { x: 0, y: 2 }, color: '#00ffff', vertices: [], origin: { x: 0.5, y: 0.5 }, rotation: 0, scale: 1 };
  pieces.push(smallPiece1);
  grid[2][0] = smallPiece1.id;

  const smallPiece2: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 1, height: 1, position: { x: 3, y: 2 }, color: '#00ffff', vertices: [], origin: { x: 0.5, y: 0.5 }, rotation: 0, scale: 1 };
  pieces.push(smallPiece2);
  grid[2][3] = smallPiece2.id;

  const smallPiece3: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 1, height: 1, position: { x: 0, y: 3 }, color: '#ff00ff', vertices: [], origin: { x: 0.5, y: 0.5 }, rotation: 0, scale: 1 };
  pieces.push(smallPiece3);
  grid[3][0] = smallPiece3.id;
  
  const smallPiece4: Piece = { id: `piece-${idCounter++}`, type: 'other', width: 1, height: 1, position: { x: 3, y: 3 }, color: '#ff00ff', vertices: [], origin: { x: 0.5, y: 0.5 }, rotation: 0, scale: 1 };
  pieces.push(smallPiece4);
  grid[3][3] = smallPiece4.id;

  const exitX = 1; // Target piece (Cao Cao) needs to reach this column
  const exitY = height - 1; // Target piece needs to reach the bottom row

  return { grid, pieces, targetPieceId: caoCao.id, exitPosition: { x: exitX, y: exitY } };
}


// --- Piece Movement Logic ---
// This requires a more robust collision and validation system.
// Simplified movement for now: just updates piece position.
function movePiece(state: HuarongPassState, pieceId: string, dx: number, dy: number): HuarongPassState {
  const pieceIndex = state.pieces.findIndex(p => p.id === pieceId);
  if (pieceIndex === -1) return state;

  const piece = state.pieces[pieceIndex];
  const newPosition = { x: piece.position.x + dx, y: piece.position.y + dy };

  // Basic boundary check
  if (newPosition.x < 0 || newPosition.x + piece.width > DEFAULT_GRID_WIDTH || newPosition.y < 0 || newPosition.y + piece.height > DEFAULT_GRID_HEIGHT) {
    return state; // Cannot move out of bounds
  }

  // TODO: Implement collision detection with other pieces and target silhouette.
  // For now, we assume movement is valid if within bounds.

  const updatedPiece = { ...piece, position: newPosition };
  const newPieces = [...state.pieces];
  newPieces[pieceIndex] = updatedPiece;
  
  // Update grid representation to reflect piece's new position (complex for overlapping shapes)
  // This would involve clearing old grid cells and marking new ones.
  // For simplicity, grid state is not fully updated here.

  return { ...state, pieces: newPieces, moves: state.moves + 1 }; // Increment moves
}

function rotatePiece(state: HuarongPassState, pieceId: string): HuarongPassState {
  // Rotation logic for Tangram pieces needs to be implemented here.
  // For Huarong Pass, rotation is less common unless pieces are not just 1x2 or 2x1.
  // If pieces can rotate (e.g., to become 1x2 from 2x1), rotation logic would be needed.
  // For classic Huarong Pass with fixed orientation pieces, this might be unused.
  return state; // No rotation for now
}

// --- Puzzle Completion Logic ---
// Checks if the target piece is at the exit position.
function checkPuzzleCompletion(state: HuarongPassState): boolean {
  if (!state.targetPieceId || !state.targetSilhouette) return false;
  
  const targetPiece = state.pieces.find(p => p.id === state.targetPieceId);
  if (!targetPiece) return false;

  // Check if the target piece is at the exit position
  // This is a simplified check. A real check would verify exact fit and no overlaps.
  return targetPiece.position.x === state.exitPosition.x && targetPiece.position.y === state.exitPosition.y;
}


// --- Reducer function to manage Huarong Pass game state ---
export function huarongPassReducer(state: HuarongPassState, action: { type: HuarongPassActionType; payload?: any }): HuarongPassState {
  let newPieces;
  let selectedPiece;
  let pieceIndex;
  let newPosition;

  switch (action.type) {
    case HuarongPassActionType.INIT_PUZZLE: {
      const { width = DEFAULT_GRID_WIDTH, height = DEFAULT_GRID_HEIGHT } = action.payload || {};
      const { grid, pieces, targetPieceId, exitPosition } = generateHuarongPuzzle(width, height);
      return {
        ...state,
        grid: grid,
        pieces: pieces,
        targetPieceId: targetPieceId,
        exitPosition: exitPosition,
        gridSize: { width, height },
        moves: 0,
        isPuzzleComplete: false,
      };
    }
    case HuarongPassActionType.SELECT_PIECE: {
      const { pieceId } = action.payload;
      return { ...state, selectedPieceId: pieceId };
    }
    case HuarongPassActionType.MOVE_PIECE: {
      const { dx, dy } = action.payload; // Delta in grid units
      if (!state.selectedPieceId) return state;

      pieceIndex = state.pieces.findIndex(p => p.id === state.selectedPieceId);
      if (pieceIndex === -1) return state;
      
      selectedPiece = state.pieces[pieceIndex];
      newPosition = { x: selectedPiece.position.x + dx, y: selectedPiece.position.y + dy };

      // Basic boundary check
      if (newPosition.x < 0 || newPosition.x + selectedPiece.width > DEFAULT_GRID_WIDTH || newPosition.y < 0 || newPosition.y + selectedPiece.height > DEFAULT_GRID_HEIGHT) {
        return state; // Cannot move out of bounds
      }

      // TODO: Implement collision detection with other pieces and target silhouette.
      // For now, we assume movement is valid if within bounds.

      const updatedPiece = { ...selectedPiece, position: newPosition };
      newPieces = [...state.pieces];
      newPieces[pieceIndex] = updatedPiece;
      
      return { ...state, pieces: newPieces, moves: state.moves + 1 }; // Increment moves
    }

    case HuarongPassActionType.ROTATE_PIECE: {
      if (!state.selectedPieceId) return state;

      pieceIndex = state.pieces.findIndex(p => p.id === state.selectedPieceId);
      if (pieceIndex === -1) return state;
      
      selectedPiece = state.pieces[pieceIndex];
      // Rotation logic would go here, potentially modifying selectedPiece.shape and selectedPiece.rotation
      // For classic Huarong Pass, pieces usually don't rotate.
      // For now, we'll call the placeholder rotatePiece function.
      const rotatedPiece = rotatePiece(selectedPiece); // This function needs to be implemented correctly

      // Check validity of rotated piece position/shape before applying
      // (Placeholder for validation)
      // A proper check would use canPlacePiece with the new rotated shape and current position.
      // if (canPlacePiece(state.grid, rotatedPiece, rotatedPiece.position, rotatedPiece.shape)) { ... }

      // For now, assuming rotation is not implemented or valid.
      return state;
    }

    case HuarongPassActionType.DESELECT_PIECE: {
      // Finalize piece placement, check for completion
      const isComplete = checkPuzzleCompletion(state);
      return { ...state, selectedPieceId: null, isPuzzleComplete: isComplete, moves: state.moves + 1 }; // Increment moves on finalization
    }

    case HuarongPassActionType.CHECK_PUZZLE_COMPLETE: {
      const isComplete = checkPuzzleCompletion(state);
      return { ...state, isPuzzleComplete: isComplete };
    }

    default:
      return state;
  }
}

// --- Initialization ---
export function getInitialHuarongPassState(width: number = DEFAULT_GRID_WIDTH, height: number = DEFAULT_GRID_HEIGHT): HuarongPassState {
  const { grid, pieces, targetPieceId, exitPosition } = generateHuarongPuzzle(width, height);
  return {
    grid: grid,
    pieces: pieces,
    targetPieceId: targetPieceId,
    exitPosition: exitPosition,
    gridSize: { width, height },
    moves: 0,
    isPuzzleComplete: false,
  };
}
