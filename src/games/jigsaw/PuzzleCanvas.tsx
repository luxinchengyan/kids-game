import React, { useReducer, useEffect, useRef, useState } from 'react';
import PuzzlePieceComponent from './PuzzlePieceComponent';
import { jigsawReducer, getInitialJigsawState, JigsawState, JigsawActionType, JigsawPiece } from './JigsawEngine';
import type { JigsawGrid } from './JigsawEngine';
import './Jigsaw.css'; // Import the CSS file

// Placeholder for GameInfo component
const GameInfo: React.FC<{ moves: number; isPuzzleComplete: boolean; resetGame: () => void }> = ({ moves, isPuzzleComplete, resetGame }) => (
  <div className="jigsaw-game-info">
    <div className="moves">Moves: {moves}</div>
    {isPuzzleComplete && <div className="puzzle-complete-message">Puzzle Complete!</div>}
    <button onClick={resetGame}>Reset</button>
  </div>
);

// Placeholder for ImagePreview component
const ImagePreview: React.FC<{ src: string; width: number; height: number }> = ({ src, width, height }) => (
  <div className="image-preview">
    <img src={src} alt="Target Puzzle Image" width={width / 4} height={height / 4} style={{ border: '1px solid #ccc' }} />
    <p>Assemble the pieces to match this image.</p>
  </div>
);

const initialJigsawState = getInitialJigsawState('example-image.jpg', 600, 600, 4, 4); // Default 4x4 puzzle

const PuzzleCanvas: React.FC = () => {
  const [state, dispatch] = useReducer(jigsawReducer, initialJigsawState);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const draggedPieceId = useRef<string | null>(null);
  const cellSize = 30; // Should match the value used in PieceComponent and Engine

  // Initialize puzzle on mount
  useEffect(() => {
    // Use a default image or load from state if available
    dispatch({ type: JigsawActionType.INIT_PUZZLE, payload: { imageSrc: 'example-image.jpg', imageWidth: 600, imageHeight: 600, rows: 4, cols: 4 } });
  }, []);

  // --- Drag and Drop Handlers ---
  const handlePieceSelect = (pieceId: string) => {
    dispatch({ type: JigsawActionType.SELECT_PIECE, payload: { pieceId } });
    draggedPieceId.current = pieceId;
  };

  const handlePieceDragStart = (pieceId: string, startX: number, startY: number) => {
    setIsDragging(true);
    const piece = state.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    // Calculate offset from the piece's top-left corner to the mouse click point.
    const offsetX = startX - (piece.position.x * cellSize);
    const offsetY = startY - (piece.position.y * cellSize);
    dragOffset.current = { x: offsetX, y: offsetY };
  };

  const handlePieceDrag = (pieceId: string, deltaX: number, deltaY: number) => {
    if (!isDragging || !draggedPieceId.current) return;

    const pieceIndex = state.pieces.findIndex(p => p.id === pieceId);
    if (pieceIndex === -1) return;

    const currentPiece = state.pieces[pieceIndex];
    // Calculate new position in grid units. Convert screen delta to grid units.
    const newGridX = currentPiece.position.x + (deltaX - dragOffset.current.x) / cellSize;
    const newGridY = currentPiece.position.y + (deltaY - dragOffset.current.y) / cellSize;

    // Dispatching MOVE_PIECE needs to correctly calculate the delta in grid units.
    dispatch({ type: JigsawActionType.MOVE_PIECE, payload: { dx: newGridX - currentPiece.position.x, dy: newGridY - currentPiece.position.y } });
  };

  const handlePieceDragEnd = (pieceId: string) => {
    setIsDragging(false);
    dispatch({ type: JigsawActionType.DESELECT_PIECE }); // Finalize piece placement, check for completion
    draggedPieceId.current = null;
  };

  const handlePieceRotate = (pieceId: string) => {
    // Only allow rotation if the piece is selected and rotation logic is implemented
    if (state.selectedPieceId === pieceId) {
      dispatch({ type: JigsawActionType.ROTATE_PIECE });
    }
  };

  // Render grid cells for background context
  const renderGrid = () => {
    const gridElements: JSX.Element[] = [];
    // Using state.gridSize derived from puzzle generation (rows/cols)
    for (let r = 0; r < state.gridSize.height; r++) {
      for (let c = 0; c < state.gridSize.width; c++) {
        gridElements.push(
          <div
            key={`${r}-${c}`}
            className="jigsaw-grid-cell"
            data-testid={`cell-${r}-${c}`}
          ></div>
        );
      }
    }
    return gridElements;
  };

  return (
    <div className="jigsaw-game-container">
      <GameInfo moves={state.moves} isPuzzleComplete={state.isPuzzleComplete} resetGame={() => dispatch({ type: JigsawActionType.INIT_PUZZLE, payload: { imageSrc: 'example-image.jpg', imageWidth: 600, imageHeight: 600, rows: 4, cols: 4 } })} />
      
      <div className="jigsaw-main-area">
        <div
          className="jigsaw-svg-canvas"
          style={{
            width: state.gridSize.width * cellSize,
            height: state.gridSize.height * cellSize,
          }}
        >
          {/* Render Grid Background */}
          <g className="jigsaw-grid">
            {renderGrid()}
          </g>

          {/* Render Tangram Pieces (using TanPieceComponent, which should be renamed/adapted for Jigsaw) */}
          {state.pieces.map((piece) => (
            <PuzzlePieceComponent // Renamed for clarity
              key={piece.id}
              piece={piece}
              cellSize={cellSize}
              isSelected={state.selectedPieceId === piece.id}
              onDragStart={handlePieceDragStart}
              onDrag={handlePieceDrag}
              onDragEnd={handlePieceDragEnd}
              onClick={handlePieceSelect} // Pass select handler
            />
          ))}
        </div>

        {/* Image Preview */}
        {state.targetImage && (
          <ImagePreview src={state.targetImage.src} width={state.targetImage.width} height={state.targetImage.height} />
        )}
      </div>

      {/* Rotation Button (if applicable) */}
      {state.selectedPieceId && (
        <button onClick={() => handlePieceRotate(state.selectedPieceId!)}>Rotate</button>
      )}
    </div>
  );
};

export default PuzzleCanvas;
