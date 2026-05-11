import React from 'react';
import type { Piece } from './HuarongPassEngine';

interface PieceComponentProps {
  piece: Piece;
  cellSize: number;
  isSelected: boolean;
  onDragStart: (pieceId: string, startX: number, startY: number) => void;
  onDrag: (pieceId: string, deltaX: number, deltaY: number) => void;
  onDragEnd: (pieceId: string) => void;
}

const PieceComponent: React.FC<PieceComponentProps> = ({ piece, cellSize, isSelected, onDragStart, onDrag, onDragEnd }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    onDragStart(piece.id, startX, startY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      onDrag(piece.id, deltaX, deltaY);
    };

    const handleMouseUp = () => {
      onDragEnd(piece.id);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // For rendering, we'll use absolute positioning based on piece.position.
  // A more accurate approach would involve calculating the bounding box of the piece based on its vertices and orientation.
  // For now, we assume piece.position is the top-left corner of its bounding box.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: piece.position.x * cellSize,
    top: piece.position.y * cellSize,
    width: piece.width * cellSize,
    height: piece.height * cellSize,
    backgroundColor: piece.color,
    border: '2px solid #333', // Border for pieces
    borderRadius: '3px', // Slight rounding
    cursor: 'grab',
    transformOrigin: 'center', // For potential future rotations
    zIndex: isSelected ? 1000 : 1, // Bring selected piece to front
    // Rotation transform would be applied here if implemented
  };

  return (
    <div
      className={`huarong-piece ${isSelected ? 'selected' : ''}`}
      style={style}
      onMouseDown={handleMouseDown}
    >
      {/* Piece ID or type could be displayed here for debugging */}
      {/* <span style={{ fontSize: '0.7em', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{piece.id.slice(-1)}</span> */}
    </div>
  );
};

export default PieceComponent;
