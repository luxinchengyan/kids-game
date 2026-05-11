// src/games/tangram/TangramEngine.ts

// Represents a point in 2D space
interface Point {
  x: number;
  y: number;
}

// Defines a Tangram piece using its vertices, color, and current transformation state.
export interface TangramPiece {
  id: string;
  color: string;
  vertices: Point[]; // Vertices defining the polygon, relative to its origin (pivot)
  origin: Point; // The piece's pivot point for rotation
  position: Point; // The piece's current position on the grid (top-left of its bounding box for rendering)
  rotation: number; // Current rotation in degrees (0, 90, 180, 270)
  scale: number; // Scale factor (usually 1)
}

export interface TangramCell {
  isOccupied: boolean;
  color: string; // Color of the piece occupying it
  pieceId: string | null; // ID of the piece occupying it
}

export type TangramGrid = TangramCell[][];

export interface TangramState {
  grid: TangramGrid;
  pieces: TangramPiece[]; // All available pieces
  selectedPieceId: string | null; // ID of the currently dragged/manipulated piece
  targetSilhouette: { vertices: Point[]; color: string; position: Point } | null; // Outline of the target shape and its position on the grid
  isPuzzleComplete: boolean;
  // Other states like timer, score, etc. could be added
}

export enum TangramActionType {
  INIT_PUZZLE = 'INIT_PUZZLE',
  SELECT_PIECE = 'SELECT_PIECE',
  MOVE_PIECE = 'MOVE_PIECE',
  ROTATE_PIECE = 'ROTATE_PIECE',
  DESELECT_PIECE = 'DESELECT_PIECE',
  CHECK_PUZZLE_COMPLETE = 'CHECK_PUZZLE_COMPLETE',
}

// --- Game Constants ---
const GRID_WIDTH = 10; // Example grid dimensions
const GRID_HEIGHT = 10;
const CELL_SIZE = 30; // Pixels per grid unit

// --- Tangram Piece Definitions ---
// Define pieces by their vertices relative to an origin (pivot point).
// These shapes are basic approximations for demonstration.
const TANGRAM_PIECES_DEFINITION = {
  'square': { color: '#ff0000', vertices: [{x:0,y:0}, {x:1,y:0}, {x:1,y:1}, {x:0,y:1}], origin: {x:0.5, y:0.5} }, // Red Square
  'triangle-small-1': { color: '#00ff00', vertices: [{x:0,y:0}, {x:1,y:0}, {x:0,y:1}], origin: {x:0.5, y:0.5} }, // Green Small Triangle
  'triangle-small-2': { color: '#00ff00', vertices: [{x:0,y:1}, {x:1,y:1}, {x:1,y:0}], origin: {x:0.5, y:0.5} }, // Green Small Triangle (flipped)
  'triangle-medium': { color: '#0000ff', vertices: [{x:0,y:0}, {x:2,y:0}, {x:1,y:1}], origin: {x:1, y:0.5} }, // Blue Medium Triangle
  'triangle-large-1': { color: '#ffff00', vertices: [{x:0,y:0}, {x:2,y:0}, {x:1,y:1}], origin: {x:1, y:0.5} }, // Yellow Large Triangle
  'triangle-large-2': { color: '#ffff00', vertices: [{x:0,y:1}, {x:2,y:1}, {x:1,y:0}], origin: {x:1, y:0.5} }, // Yellow Large Triangle (flipped)
  'parallelogram': { color: '#ff00ff', vertices: [{x:0,y:0}, {x:1,y:0}, {x:1.5,y:1}, {x:0.5,y:1}], origin: {x:0.75, y:0.5} }, // Magenta Parallelogram
};

// --- Helper Functions ---

// Creates an empty grid
function createEmptyGrid(width: number, height: number): TangramGrid {
  return Array(height).fill(null).map(() =>
    Array(width).fill(null).map(() => ({ isOccupied: false, color: '', pieceId: null }))
  );
}

// Generates the 7 standard Tangram pieces
function generateTangramPieces(): TangramPiece[] {
  const pieces: TangramPiece[] = [];
  let idCounter = 0;
  const pieceDefinitions = Object.entries(TANGRAM_PIECES_DEFINITION);

  // Place pieces initially in a tray or off-grid, ready to be dragged
  const startX = -5; // Off-grid to the left
  const startY = 2; // Some vertical offset

  pieceDefinitions.forEach(([id, def]) => {
    pieces.push({
      id: `p${idCounter++}`,
      color: def.color,
      vertices: def.vertices,
      origin: def.origin,
      position: { x: startX, y: startY + idCounter * 1.5 }, // Stagger initial positions
      rotation: def.initialRotation || 0,
      scale: 1, // Assuming pieces are scaled to fit a unit grid initially
    });
  });
  return pieces;
}

// Placeholder for target silhouette definition
function generateTargetSilhouette(): { vertices: Point[]; color: string; position: Point } {
  // Example: A simple house shape for the target
  const unit = 2; // Scale unit for the silhouette
  return {
    vertices: [
      {x:0,y:0}, {x:4*unit,y:0}, {x:4*unit,y:3*unit}, {x:2*unit,y:5*unit}, {x:0,y:3*unit}
    ], // Polygon vertices defining the silhouette
    color: '#808080', // Gray
    position: { x: 2, y: 1 }, // Position on the main grid
  };
}


// --- Geometric Transformation Logic ---

// Rotates a set of vertices around a pivot point
function rotateVertices(vertices: Point[], pivot: Point, angle: number): Point[] {
  const rad = angle * Math.PI / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return vertices.map(v => {
    const translatedX = v.x - pivot.x;
    const translatedY = v.y - pivot.y;
    const rotatedX = translatedX * cos - translatedY * sin;
    const rotatedY = translatedX * sin + translatedY * cos;
    return { x: rotatedX + pivot.x, y: rotatedY + pivot.y };
  });
}

// Translates a piece's position
function translatePiece(piece: TangramPiece, dx: number, dy: number): TangramPiece {
  return {
    ...piece,
    position: { x: piece.position.x + dx, y: piece.position.y + dy },
  };
}

// Rotates a piece by applying rotation to its vertices and updating rotation state
function rotatePiece(piece: TangramPiece): TangramPiece {
  const newRotation = (piece.rotation + 90) % 360;
  const rotatedVertices = rotateVertices(piece.vertices, piece.origin, 90);

  // Re-center the piece's position after rotation if its bounding box changes significantly
  // This is complex and depends on how 'position' is used (e.g., centroid, top-left).
  // For simplicity, we'll assume position refers to a stable reference point.
  
  return {
    ...piece,
    vertices: rotatedVertices,
    rotation: newRotation,
  };
}

// --- Collision and Placement Logic ---

// Checks if a piece can be placed at a given position without overlapping occupied cells or boundaries.
// This is a simplified check. A full implementation needs to consider overlapping pieces and target silhouette boundaries.
function canPlacePiece(grid: TangramGrid, piece: TangramPiece, newPosition: Point): boolean {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  for (const vertex of piece.vertices) {
    // Transform vertex relative to piece's new position
    const transformedX = newPosition.x + vertex.x * piece.scale;
    const transformedY = newPosition.y + vertex.y * piece.scale;

    // Check grid boundaries
    if (transformedX < 0 || transformedX >= gridWidth || transformedY < 0 || transformedY >= gridHeight) {
      return false; // Out of bounds
    }

    // Check collision with existing occupied cells on the grid
    // This requires mapping the transformed vertex to a grid cell index.
    // For simplicity, let's assume vertex coordinates directly map to grid cells for now.
    const gridX = Math.floor(transformedX);
    const gridY = Math.floor(transformedY);
    if (grid[gridY][gridX].isOccupied) {
      return false; // Collision with another piece
    }
  }
  return true; // No collisions found
}

// --- Puzzle Completion Logic ---
// Checks if all pieces are placed correctly within the target silhouette and perfectly fit together.
function checkPuzzleCompletion(grid: TangramGrid, pieces: TangramPiece[], target: { vertices: Point[]; color: string; position: Point }): boolean {
  // This is a highly complex geometric check.
  // It requires verifying:
  // 1. All vertices of all placed pieces align perfectly with each other and the target silhouette.
  // 2. No gaps exist within the target silhouette where a piece block should be.
  // 3. No piece blocks overlap.
  // 4. All target silhouette area is covered exactly by piece blocks.
  // Placeholder: Always returns false.
  return false;
}


// --- Reducer function to manage Tangram game state ---
export function tangramReducer(state: TangramState, action: { type: TangramActionType; payload?: any }): TangramState {
  let updatedPieces;
  let selectedPiece;
  let pieceIndex;
  let newPosition;

  switch (action.type) {
    case TangramActionType.INIT_PUZZLE: {
      const pieces = generateTangramPieces();
      const targetSilhouette = generateTargetSilhouette();
      const initialGrid = createEmptyGrid(GRID_WIDTH, GRID_HEIGHT);
      return {
        ...state,
        grid: initialGrid,
        pieces: pieces,
        selectedPieceId: null,
        targetSilhouette: targetSilhouette,
        isPuzzleComplete: false,
      };
    }

    case TangramActionType.SELECT_PIECE: {
      const { pieceId } = action.payload;
      return { ...state, selectedPieceId: pieceId };
    }

    case TangramActionType.MOVE_PIECE: {
      const { dx, dy } = action.payload;
      if (!state.selectedPieceId) return state;

      pieceIndex = state.pieces.findIndex(p => p.id === state.selectedPieceId);
      if (pieceIndex === -1) return state;
      
      selectedPiece = state.pieces[pieceIndex];
      newPosition = { x: selectedPiece.position.x + dx, y: selectedPiece.position.y + dy };

      // Check if the move is valid
      // This check needs to consider the piece's current shape and position,
      // and whether the target cells on the grid are occupied.
      // For simplicity, we'll rely on a basic boundary check and assume collision logic is refined later.
      // A robust check would involve projecting the piece's current blocks to their new grid positions.
      
      // Simplified check: Move if within bounds of the main grid (not the target silhouette yet)
      // The actual `canPlacePiece` needs to be more sophisticated for Tangram.
      if (newPosition.x >= 0 && newPosition.x < GRID_WIDTH && newPosition.y >= 0 && newPosition.y < GRID_HEIGHT) { // Basic boundary check
        const updatedPiece = { ...selectedPiece, position: newPosition };
        updatedPieces = [...state.pieces];
        updatedPieces[pieceIndex] = updatedPiece;
        return { ...state, pieces: updatedPieces };
      }
      return state; // Move not possible
    }

    case TangramActionType.ROTATE_PIECE: {
      if (!state.selectedPieceId) return state;

      pieceIndex = state.pieces.findIndex(p => p.id === state.selectedPieceId);
      if (pieceIndex === -1) return state;
      
      selectedPiece = state.pieces[pieceIndex];
      const rotatedPiece = rotatePiece(selectedPiece); // This function needs to be implemented correctly

      // Check validity of rotated piece position/shape before applying
      // (Placeholder for validation)
      // A proper check would use `canPlacePiece` with the new rotated shape and current position.
      const newShape = Object.values(TANGRAM_PIECES_DEFINITION).find(p => p.color === rotatedPiece.color)?.shapes[rotatedPiece.rotation];
      if (newShape && canPlacePiece(state.grid, rotatedPiece, rotatedPiece.position, newShape)) {
         updatedPieces = [...state.pieces];
         updatedPieces[pieceIndex] = rotatedPiece;
         return { ...state, pieces: updatedPieces };
      }
      return state; // If rotation is not valid, keep current state
    }

    case TangramActionType.DESELECT_PIECE: {
      // Logic to finalize piece placement:
      // 1. Check if the piece is over the target silhouette.
      // 2. Check if it overlaps with other placed pieces.
      // 3. If valid, 'lock' the piece onto the grid.
      // For now, just deselect.
      return { ...state, selectedPieceId: null };
    }

    case TangramActionType.CHECK_PUZZLE_COMPLETE: {
      const isComplete = checkPuzzleCompletion(state.grid, state.pieces, state.targetSilhouette);
      return { ...state, isPuzzleComplete: isComplete };
    }

    default:
      return state;
  }
}

// --- Initialization ---
export function getInitialTangramState(): TangramState {
  const pieces = generateTangramPieces();
  const targetSilhouette = generateTargetSilhouette();
  const initialGrid = createEmptyGrid(GRID_WIDTH, GRID_HEIGHT);

  return {
    grid: initialGrid,
    pieces: pieces,
    selectedPieceId: null,
    targetSilhouette: targetSilhouette,
    isPuzzleComplete: false,
  };
}
