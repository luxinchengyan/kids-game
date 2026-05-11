import React, { useReducer, useEffect, useRef, useState } from 'react';
import PieceComponent from './PieceComponent';
import { huarongPassReducer, getInitialHuarongPassState, HuarongPassState, HuarongPassActionType, Piece } from './HuarongPassEngine';
import type { HuarongGrid } from './HuarongPassEngine';
import './HuarongPass.css'; // Import the CSS file

// Placeholder for GameInfo component
const GameInfo: React.FC<{ moves: number; isPuzzleComplete: boolean; resetGame: () => void }> = ({ moves, isPuzzleComplete, resetGame }) => (
  <div className="huarong-game-info">
    <div className="moves">Moves: {moves}</div>
    {isPuzzleComplete && <div className="puzzle-complete-message">Puzzle Complete!</div>}
    <button onClick={resetGame}>Reset</button>
  </div>
);

// Placeholder for TargetExit component
const TargetExitComponent: React.FC<{ position: { x: number; y: number }; cellSize: number }> = ({ position, cellSize }) => (
  <div
    className="huarong-exit"
    style={{
      left: position.x * cellSize,
      top: position.y * cellSize,
      width: cellSize * 2, // Assuming exit is 2 units wide for Cao Cao
      height: cellSize, // Assuming exit is 1 unit high
    }}
  ></div>
);

const initialHuarongPassState = getInitialHuarongPassState();

const HuarongGrid: React.FC = () => {
  const [state, dispatch] = useReducer(huarongPassReducer, initialHuarongPassState);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const draggedPieceIdRef = useRef<string | null>(null);
  const cellSize = 30; // Should match the value used in PieceComponent and Engine

  // Initialize puzzle on mount
  useEffect(() => {
    dispatch({ type: HuarongPassActionType.INIT_PUZZLE });
  }, []);

  // --- Drag and Drop Handlers ---
  const handlePieceSelect = (pieceId: string) => {
    dispatch({ type: HuarongPassActionType.SELECT_PIECE, payload: { pieceId } });
    draggedPieceId.current = pieceId;
  };

  const handlePieceDragStart = (pieceId: string, startX: number, startY: number) => {
    const piece = state.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    // Calculate offset from the piece's top-left corner to the mouse click point.
    const offsetX = startX - (piece.position.x * cellSize);
    const offsetY = startY - (piece.position.y * cellSize);
    dragOffset.current = { x: offsetX, y: offsetY };
  };

  const handlePieceDrag = (pieceId: string, deltaX: number, deltaY: number) => {
    if (!draggedPieceIdRef.current || !state.selectedPieceId) return;

    const pieceIndex = state.pieces.findIndex(p => p.id === pieceId);
    if (pieceIndex === -1) return;

    const currentPiece = state.pieces[pieceIndex];
    // Calculate new position in grid units. Convert screen delta to grid units.
    const newGridX = currentPiece.position.x + (deltaX - dragOffset.current.x) / cellSize;
    const newGridY = currentPiece.position.y + (deltaY - dragOffset.current.y) / cellSize;

    // Dispatching MOVE_PIECE needs to correctly calculate the delta in grid units.
    dispatch({ type: HuarongPassActionType.MOVE_PIECE, payload: { dx: newGridX - currentPiece.position.x, dy: newGridY - currentPiece.position.y } });
  };

  const handlePieceDragEnd = (pieceId: string) => {
    dispatch({ type: HuarongPassActionType.DESELECT_PIECE }); // Finalize piece placement, check for completion
    draggedPieceId.current = null;
  };

  const handlePieceRotate = (pieceId: string) => {
    // Only allow rotation if the piece is selected and rotation logic is implemented
    if (state.selectedPieceId === pieceId) {
      dispatch({ type: HuarongPassActionType.ROTATE_PIECE });
    }
  };

  // Render grid cells for background context
  const renderGrid = () => {
    const gridElements: JSX.Element[] = [];
    for (let r = 0; r < state.gridSize.height; r++) {
      for (let c = 0; c < state.gridSize.width; c++) {
        // Check if this cell is occupied by a piece, and if so, get its ID
        const pieceId = state.grid[r][c];
        const piece = pieceId ? state.pieces.find(p => p.id === pieceId) : null;

        gridElements.push(
          <div
            key={`${r}-${c}`}
            className={`huarong-grid-cell ${piece ? 'occupied' : ''}`}
            style={piece ? { backgroundColor: piece.color } : {}}
            data-testid={`cell-${r}-${c}`}
          ></div>
        );
      }
    }
    return gridElements;
  };

  return (
    <div className="huarong-game-container">
      <GameInfo moves={state.moves} isPuzzleComplete={state.isPuzzleComplete} resetGame={() => dispatch({ type: HuarongPassActionType.INIT_PUZZLE })} />
      
      <div
        className="huarong-game-world"
        style={{
          width: state.gridSize.width * cellSize,
          height: state.gridSize.height * cellSize,
        }}
      >
        {/* Render Grid Background */}
        <div className="huarong-grid">
          {renderGrid()}
        </div>

        {/* Render Target Exit */}
        {state.targetSilhouette && (
          <div className="huarong-target-exit"
               style={{
                 left: state.targetPosition.x * cellSize,
                 top: state.targetPosition.y * cellSize,
                 width: 2 * cellSize, // Example size for Cao Cao
                 height: cellSize,
               }}>
            {/* Visual representation of the exit */}
          </div>
        )}

        {/* Render Pieces */}
        {state.pieces.map((piece) => (
          <PieceComponent
            key={piece.id}
            piece={piece}
            cellSize={cellSize}
            isSelected={state.selectedPieceId === piece.id}
            onDragStart={handlePieceDragStart}
            onDrag={handlePieceDrag}
            onDragEnd={handlePieceDragEnd}
            onClick={handlePieceSelect}
          />
        ))}
      </div>

      {/* Rotation Button (if applicable for piece variants) */}
      {state.selectedPieceId && (
        <button onClick={() => handlePieceRotate(state.selectedPieceId!)}>Rotate</button>
      )}
    </div>
  );
};

export default HuarongGrid;
