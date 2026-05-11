// src/games/jigsaw/JigsawEngine.ts

// --- Interfaces ---
export interface Point {
  x: number;
  y: number;
}

export interface JigsawPiece {
  id: string;
  vertices: Point[]; // Vertices defining the piece's shape, relative to its origin
  color: string; // For visualization or debugging
  position: Point; // Current position on the grid
  rotation: number; // Current rotation in degrees (e.g., 0, 90, 180, 270)
  scale: number; // Scale factor
  // Additional properties for puzzle generation: edge types, connections etc.
  // For simplicity, we'll focus on basic shape and placement for now.
}

export interface JigsawCell {
  isOccupied: boolean;
  pieceId: string | null;
  // Could store which part of which piece occupies this cell if grid is cell-based
}

export type JigsawGrid = JigsawCell[][]; // Grid for piece placement validation

export interface JigsawState {
  grid: JigsawGrid; // Represents the solved state or placement area
  pieces: JigsawPiece[]; // All available puzzle pieces
  selectedPieceId: string | null; // ID of the currently dragged/manipulated piece
  targetImage: { src: string; width: number; height: number }; // Source image and its dimensions
  gridSize: { width: number; height: number }; // Dimensions of the puzzle grid/canvas
  moves: number;
  isPuzzleComplete: boolean;
  // Other states like timer, score, etc.
}

export enum JigsawActionType {
  INIT_PUZZLE = 'INIT_PUZZLE',
  SELECT_PIECE = 'SELECT_PIECE',
  MOVE_PIECE = 'MOVE_PIECE',
  ROTATE_PIECE = 'ROTATE_PIECE',
  DESELECT_PIECE = 'DESELECT_PIECE',
  CHECK_PUZZLE_COMPLETE = 'CHECK_PUZZLE_COMPLETE',
}

// --- Game Constants ---
const DEFAULT_GRID_WIDTH = 10; // Example canvas dimensions in grid units
const DEFAULT_GRID_HEIGHT = 10;
const CELL_SIZE = 30; // Pixels per grid unit for rendering

// --- Helper Functions ---

// Creates an empty grid
function createEmptyGrid(width: number, height: number): JigsawGrid {
  return Array(height).fill(null).map(() =>
    Array(width).fill(null).map(() => ({ isOccupied: false, pieceId: null }))
  );
}

// Placeholder for puzzle generation (cutting an image into pieces)
// This is a complex process involving image processing and defining piece shapes/connections.
// For demonstration, we'll create a few predefined pieces that could form a simple shape.
function generateJigsawPuzzle(imageSrc: string, imageWidth: number, imageHeight: number, rows: number, cols: number): { pieces: JigsawPiece[]; targetGrid: JigsawGrid; targetImage: { src: string; width: number; height: number } } {
  const pieces: JigsawPiece[] = [];
  let idCounter = 0;
  const pieceWidthUnits = DEFAULT_GRID_WIDTH / cols; // Approximate units per piece
  const pieceHeightUnits = DEFAULT_GRID_HEIGHT / rows;

  // Simplified piece generation: create rectangular pieces that fit into a grid.
  // Real jigsaw generation involves complex interlocking shapes.
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      pieces.push({
        id: `piece-${idCounter++}`,
        // Using simple square vertices for each piece for now
        vertices: [{x:0,y:0}, {x:pieceWidthUnits,y:0}, {x:pieceWidthUnits,y:pieceHeightUnits}, {x:0,y:pieceHeightUnits}],
        color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color for visualization
        position: { x: c * pieceWidthUnits, y: r * pieceHeightUnits }, // Initial position in the tray/off-grid
        rotation: 0,
        scale: 1,
      });
    }
  }
  
  // Placeholder for target grid representation (e.g., mapping piece IDs to grid cells)
  const targetGrid = createEmptyGrid(DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT); 
  
  return { pieces, targetGrid, targetImage: { src: imageSrc, width: imageWidth, height: imageHeight } };
}

// --- Geometric Transformation Logic ---
// Functions for rotating and translating piece vertices (similar to Tangram, but needs to be accurate for puzzle fitting)

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

function translatePiece(piece: JigsawPiece, dx: number, dy: number): JigsawPiece {
  return {
    ...piece,
    position: { x: piece.position.x + dx, y: piece.position.y + dy },
  };
}

// Rotates a piece and updates its vertices and rotation state
function rotatePiece(piece: JigsawPiece): JigsawPiece {
  const newRotation = (piece.rotation + 90) % 360;
  // For simplicity, we use a fixed origin for rotation. Real puzzles might have complex pivots.
  const pivot = { x: 0.5, y: 0.5 }; // Center of a unit square piece
  const rotatedVertices = rotateVertices(piece.vertices, pivot, 90);

  return {
    ...piece,
    vertices: rotatedVertices,
    rotation: newRotation,
  };
}

// --- Collision and Placement Logic ---
// Checks if a piece can be placed at a given position without overlapping or going out of bounds.
// Crucially, this needs to check for actual edge-to-edge fitting for jigsaw puzzles.
function canPlacePiece(grid: JigsawGrid, piece: JigsawPiece, newPosition: Point, cellSize: number): boolean {
  const gridWidthCells = grid[0].length;
  const gridHeightCells = grid.length;

  // This is a highly simplified check. A real jigsaw needs to check edge connections.
  // For now, it checks if the piece's bounding box is within grid limits and doesn't overlap occupied cells.
  
  // Calculate piece's bounding box in grid units based on its vertices and position.
  // This requires finding min/max x/y of transformed vertices and mapping to grid cells.
  // For simplicity, we'll assume piece.width/height and piece.position are sufficient for basic boundary checks.
  
  const pieceGridWidth = piece.width; // Assuming width/height are in grid units
  const pieceGridHeight = piece.height;
  
  const finalX = newPosition.x;
  const finalY = newPosition.y;

  // Check grid boundaries
  if (finalX < 0 || finalX + pieceGridWidth > gridWidthCells || finalY < 0 || finalY + pieceGridHeight > gridHeightCells) {
    return false; // Out of bounds
  }

  // Check collision with existing occupied cells on the grid
  // This requires iterating over the cells the piece would occupy.
  // For simplicity, we'll skip detailed overlap check here.
  
  return true; // Assume valid for now
}

// --- Puzzle Completion Logic ---
// Checks if all pieces are placed correctly, forming the complete image without overlaps or gaps.
function checkPuzzleCompletion(grid: JigsawGrid, pieces: JigsawPiece[], targetImage: { width: number; height: number }): boolean {
  // This is a complex check. It requires:
  // 1. All grid cells within the target image area are occupied.
  // 2. No pieces overlap.
  // 3. All piece edges fit together correctly.
  // Placeholder: Always returns false.
  return false;
}


// --- Reducer function to manage Jigsaw Puzzle game state ---
export function jigsawReducer(state: JigsawState, action: { type: JigsawActionType; payload?: any }): JigsawState {
  let updatedPieces;
  let selectedPiece;
  let pieceIndex;
  let newPosition;

  switch (action.type) {
    case JigsawActionType.INIT_PUZZLE: {
      const { imageSrc, imageWidth, imageHeight, rows = 4, cols = 4 } = action.payload; // Default to 4x4 pieces
      const { pieces, targetGrid } = generateJigsawPuzzle(imageSrc, imageWidth, imageHeight, rows, cols);
      
      // Position pieces initially in a tray or off-grid
      const initialPieces = pieces.map((p, index) => ({
        ...p,
        position: { x: -5, y: index * 1.5 }, // Simple initial placement
      }));

      return {
        ...state,
        grid: targetGrid,
        pieces: initialPieces,
        selectedPieceId: null,
        targetImage: { src: imageSrc, width: imageWidth, height: imageHeight },
        gridSize: { width: cols * (imageWidth / cols), height: rows * (imageHeight / rows) }, // This should relate to the effective puzzle area
        moves: 0,
        isPuzzleComplete: false,
      };
    }

    case JigsawActionType.SELECT_PIECE: {
      const { pieceId } = action.payload;
      return { ...state, selectedPieceId: pieceId };
    }

    case JigsawActionType.MOVE_PIECE: {
      const { dx, dy } = action.payload; // Delta in screen pixels
      if (!state.selectedPieceId) return state;

      pieceIndex = state.pieces.findIndex(p => p.id === state.selectedPieceId);
      if (pieceIndex === -1) return state;
      
      selectedPiece = state.pieces[pieceIndex];
      
      // Calculate new position in grid units
      const newGridX = selectedPiece.position.x + dx / CELL_SIZE;
      const newGridY = selectedPiece.position.y + dy / CELL_SIZE;

      // Check if the move is valid (basic boundary check for now)
      // A full check would involve canPlacePiece with actual collision detection.
      const hypotheticalNewPosition = { x: newGridX, y: newGridY };
      
      // Use current piece shape for checking validity. Rotation state needs to be considered for accurate canPlacePiece.
      if (canPlacePiece(state.grid, selectedPiece, hypotheticalNewPosition, CELL_SIZE)) {
        const updatedPiece = { ...selectedPiece, position: hypotheticalNewPosition };
        updatedPieces = [...state.pieces];
        updatedPieces[pieceIndex] = updatedPiece;
        return { ...state, pieces: updatedPieces };
      }
      return state; // Move not possible
    }

    case JigsawActionType.ROTATE_PIECE: {
      if (!state.selectedPieceId) return state;

      pieceIndex = state.pieces.findIndex(p => p.id === state.selectedPieceId);
      if (pieceIndex === -1) return state;
      
      selectedPiece = state.pieces[pieceIndex];
      const rotatedPiece = rotatePiece(selectedPiece);

      // Check validity of rotated piece position/shape before applying
      if (canPlacePiece(state.grid, rotatedPiece, rotatedPiece.position, CELL_SIZE)) {
         updatedPieces = [...state.pieces];
         updatedPieces[pieceIndex] = rotatedPiece;
         return { ...state, pieces: updatedPieces };
      }
      return state; // If rotation is not valid, keep current state
    }

    case JigsawActionType.DESELECT_PIECE: {
      // Finalize piece placement, check for completion
      const isComplete = checkPuzzleCompletion(state.grid, state.pieces, state.targetImage);
      return { ...state, selectedPieceId: null, isPuzzleComplete: isComplete, moves: state.moves + 1 }; // Increment moves on finalization
    }

    case JigsawActionType.CHECK_PUZZLE_COMPLETE: {
      const isComplete = checkPuzzleCompletion(state.grid, state.pieces, state.targetImage);
      return { ...state, isPuzzleComplete: isComplete };
    }

    default:
      return state;
  }
}

// --- Initialization ---
// This function should load an image and cut it into pieces based on rows/cols.
// For now, it generates placeholder pieces.
export function getInitialJigsawState(imageSrc: string = 'placeholder.jpg', imageWidth: number = 600, imageHeight: number = 600, rows: number = 4, cols: number = 4): JigsawState {
  const { pieces, targetGrid } = generateJigsawPuzzle(imageSrc, imageWidth, imageHeight, rows, cols);
  
  return {
    grid: targetGrid,
    pieces: pieces,
    selectedPieceId: null,
    targetImage: { src: imageSrc, width: imageWidth, height: imageHeight },
    gridSize: { width: cols, height: rows }, // This should match the effective puzzle area in grid units
    moves: 0,
    isPuzzleComplete: false,
  };
}
