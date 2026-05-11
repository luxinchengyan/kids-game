import React, { useReducer, useEffect, useState, useRef } from 'react';
import TanPieceComponent from './TanPieceComponent';
import { tangramReducer, getInitialTangramState, TangramState, TangramActionType, TangramPiece } from './TangramEngine';
import type { TangramGrid } from './TangramEngine';
import './Tangram.css'; // Assuming a CSS file for styling

// Placeholder for SilhouetteDisplay component
const SilhouetteDisplay: React.FC<{ silhouette: { vertices: { x: number; y: number }[]; color: string; position: { x: number; y: number } } | null }> = ({ silhouette }) => {
  if (!silhouette) return null;

  // Convert vertices to SVG path data
  const pathData = silhouette.vertices
    .map(v => `L ${v.x} ${v.y}`)
    .join(' ')
    .replace('L', 'M'); // Replace first 'L' with 'M' for moveto

  return (
    <g transform={`translate(${silhouette.position.x * 30}, ${silhouette.position.y * 30})`}> {/* Assuming CELL_SIZE is 30 */}
      <path d={pathData} fill="rgba(128,128,128,0.3)" stroke={silhouette.color} strokeWidth="2" />
    </g>
  );
};

const initialTangramState = getInitialTangramState();

const PuzzleCanvas: React.FC = () => {
  const [state, dispatch] = useReducer(tangramReducer, initialTangramState);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const draggedPieceId = useRef<string | null>(null);
  const cellSize = 30; // Must match the value used in TetrisEngine/TetriminoComponent for consistency

  // Initialize puzzle on mount
  useEffect(() => {
    dispatch({ type: TangramActionType.INIT_PUZZLE });
  }, []);

  // --- Drag and Drop Handlers ---
  const handlePieceSelect = (pieceId: string) => {
    dispatch({ type: TangramActionType.SELECT_PIECE, payload: { pieceId } });
    draggedPieceId.current = pieceId;
  };

  const handlePieceDragStart = (pieceId: string, startX: number, startY: number) => {
    setIsDragging(true);
    const piece = state.pieces.find(p => p.id === pieceId);
    if (piece) {
      // Calculate offset from the piece's top-left corner to the mouse click point
      // This is a simplification; accurate drag offset calculation depends on how piece.position is defined.
      // Assuming piece.position.x/y is top-left of bounding box.
      const offsetX = startX - (piece.position.x * cellSize);
      const offsetY = startY - (piece.position.y * cellSize);
      dragOffset.current = { x: offsetX, y: offsetY };
    }
  };

  const handlePieceDrag = (pieceId: string, deltaX: number, deltaY: number) => {
    if (!isDragging || !draggedPieceId.current) return;

    const pieceIndex = state.pieces.findIndex(p => p.id === pieceId);
    if (pieceIndex === -1) return;

    const currentPiece = state.pieces[pieceIndex];
    // Calculate new position based on drag delta and offset
    const newX = currentPiece.position.x + (deltaX - dragOffset.current.x) / cellSize;
    const newY = currentPiece.position.y + (deltaY - dragOffset.current.y) / cellSize;

    dispatch({ type: TangramActionType.MOVE_PIECE, payload: { dx: newX - currentPiece.position.x, dy: newY - currentPiece.position.y } });
  };

  const handlePieceDragEnd = (pieceId: string) => {
    setIsDragging(false);
    dispatch({ type: TangramActionType.DESELECT_PIECE }); // Finalize piece placement
    draggedPieceId.current = null;
  };

  const handlePieceRotate = (pieceId: string) => {
    dispatch({ type: TangramActionType.ROTATE_PIECE });
  };
  
  const handlePieceClick = (pieceId: string) => {
      dispatch({ type: TangramActionType.SELECT_PIECE, payload: { pieceId }});
  }

  // Render grid cells (for background context, pieces are rendered separately)
  const renderGrid = () => {
    const gridElements: JSX.Element[] = [];
    for (let r = 0; r < GRID_HEIGHT; r++) {
      for (let c = 0; c < GRID_WIDTH; c++) {
        gridElements.push(
          <div
            key={`${r}-${c}`}
            className="tangram-grid-cell"
            data-testid={`cell-${r}-${c}`}
          ></div>
        );
      }
    }
    return gridElements;
  };

  return (
    <div className="tangram-canvas-container">
      <svg
        className="tangram-svg-canvas"
        width={GRID_WIDTH * cellSize}
        height={GRID_HEIGHT * cellSize}
        viewBox={`0 0 ${GRID_WIDTH * cellSize} ${GRID_HEIGHT * cellSize}`}
      >
        {/* Render Grid Background */}
        <g className="tangram-grid">
          {renderGrid()}
        </g>

        {/* Render Target Silhouette */}
        {state.targetSilhouette && (
          <SilhouetteDisplay silhouette={state.targetSilhouette} />
        )}

        {/* Render Tangram Pieces */}
        {state.pieces.map((piece) => (
          <TanPieceComponent
            key={piece.id}
            piece={piece}
            cellSize={cellSize}
            isSelected={state.selectedPieceId === piece.id}
            onClick={handlePieceSelect}
            onDragStart={handlePieceDragStart}
            onDrag={handlePieceDrag}
            onDragEnd={handlePieceDragEnd}
            // Rotation would likely be handled by a separate button or interaction
          />
        ))}
      </svg>

      {/* Piece tray or list for selecting pieces */}
      <div className="tangram-piece-tray">
        {state.pieces.filter(p => p.id !== state.selectedPieceId).map(piece => ( // Filter out selected piece
          <div
            key={piece.id}
            className="tray-piece-container"
            onClick={() => handlePieceSelect(piece.id)}
            style={{ borderColor: piece.color }}
          >
            <svg width={piece.vertices.length * cellSize/2} height={piece.vertices.length * cellSize/2}>
              {/* Render a simplified preview of the piece */}
              <TanPieceComponent 
                piece={piece} 
                cellSize={cellSize/2} // Smaller size for tray
                isSelected={false} 
                onClick={() => {}} // No click action for tray preview
                onDragStart={() => {}} onDrag={() => {}} onDragEnd={() => {}}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Placeholder for Rotation Button - needs piece selection logic */}
      {state.selectedPieceId && (
        <button onClick={() => handlePieceRotate(state.selectedPieceId!)}>Rotate</button>
      )}
      
      {state.isPuzzleComplete && <div>Puzzle Complete!</div>}
    </div>
  );
};

export default PuzzleCanvas;
