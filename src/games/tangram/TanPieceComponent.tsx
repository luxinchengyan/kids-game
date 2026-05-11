import React from 'react';
import type { TangramPiece } from './TangramEngine';

interface TanPieceProps {
  piece: TangramPiece;
  cellSize: number;
  isSelected: boolean;
  onClick: (pieceId: string) => void;
  onDragStart: (pieceId: string, startX: number, startY: number) => void;
  onDrag: (pieceId: string, deltaX: number, deltaY: number) => void;
  onDragEnd: (pieceId: string) => void;
}

const TanPieceComponent: React.FC<TanPieceComponentProps> = ({ piece, cellSize, isSelected, onClick, onDragStart, onDrag, onDragEnd }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default drag behavior if needed
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

  // Transform vertices based on piece's position, rotation, and scale
  // This is a simplified transformation for rendering. Actual collision/placement needs more precise geometric math.
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

  // For rendering, we might need to find the bounding box of transformedVertices
  // to correctly position the SVG element representing the piece.
  // Let's assume we draw the piece centered around its position for now.
  // A more robust approach would use SVG path or polygon elements and position the container.

  return (
    <g
      className={`tangram-piece ${isSelected ? 'selected' : ''}`}
      onMouseDown={handleMouseDown}
      style={{ cursor: 'grab' }}
      // Position the group based on piece's top-left corner (simplified)
      transform={`translate(${piece.position.x * cellSize}, ${piece.position.y * cellSize})`}
    >
      {/* Render the piece shape as a polygon or path */}
      {/* This requires converting vertices to SVG path data or polygon points */}
      {/* For simplicity, let's render small rects for each vertex block (less accurate for complex shapes) */}
      {transformedVertices.map((v, index) => (
        <rect
          key={index}
          x={v.x * cellSize} // Scale and position vertex
          y={v.y * cellSize}
          width={cellSize * 0.9} // Slightly smaller than cell size to see borders
          height={cellSize * 0.9}
          fill={piece.color}
          stroke="#333"
          strokeWidth="1"
        />
      ))}
    </g>
  );
};

export default TanPieceComponent;
