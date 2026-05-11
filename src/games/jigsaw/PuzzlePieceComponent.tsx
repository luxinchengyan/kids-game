import React from 'react';
import type { JigsawPiece } from './JigsawEngine';

interface PuzzlePieceProps {
  piece: JigsawPiece;
  cellSize: number;
  isSelected: boolean;
  onDragStart: (pieceId: string, startX: number, startY: number) => void;
  onDrag: (pieceId: string, deltaX: number, deltaY: number) => void;
  onDragEnd: (pieceId: string) => void;
  onClick: (pieceId: string) => void; // For selecting pieces
}

const PuzzlePieceComponent: React.FC<PuzzlePieceProps> = ({ piece, cellSize, isSelected, onDragStart, onDrag, onDragEnd, onClick }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(piece.id);
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

  // Apply transformations for rendering.
  // Note: Precise positioning and rotation for jigsaw pieces require complex geometric calculations,
  // especially for fitting edges. This is a simplified rendering.
  const transformedVertices = piece.vertices.map(v => {
    // Apply rotation around piece's origin
    const rad = piece.rotation * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const rotatedX = v.x * cos - v.y * sin;
    const rotatedY = v.x * sin + v.y * cos;

    // Apply scale and then translate to the piece's grid position
    const finalX = (rotatedX * piece.scale) + piece.position.x;
    const finalY = (rotatedY * piece.scale) + piece.position.y;

    return { x: finalX, y: finalY };
  });

  // Calculate bounding box for positioning the group
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  transformedVertices.forEach(v => {
    minX = Math.min(minX, v.x);
    minY = Math.min(minY, v.y);
    maxX = Math.max(maxX, v.x);
    maxY = Math.max(maxY, v.y);
  });
  const width = (maxX - minX) * cellSize;
  const height = (maxY - minY) * cellSize;

  return (
    <g
      className={`jigsaw-piece ${isSelected ? 'selected' : ''}`}
      onMouseDown={handleMouseDown}
      style={{ cursor: 'grab', transform: `translate(${minX * cellSize}px, ${minY * cellSize}px)` }} // Position the group
    >
      {/* Render the piece shape using polygon or path */}
      {/* For this example, we'll simulate blocks using rects. */}
      {transformedVertices.map((v, index) => {
        // Offset vertices relative to the group's minX, minY for rendering within the group
        const localX = (v.x - minX) * cellSize;
        const localY = (v.y - minY) * cellSize;
        return (
          <rect
            key={index}
            x={localX}
            y={localY}
            width={cellSize * 0.9} // Slightly smaller than cell size to see borders
            height={cellSize * 0.9}
            fill={piece.color}
            stroke="#333"
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
};

export default PuzzlePieceComponent;
