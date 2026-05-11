import React from 'react';
import type { Tetrimino } from './TetrisEngine';

interface TetriminoComponentProps {
  piece: Tetrimino;
  gridWidth: number;
  gridHeight: number;
}

const TetriminoComponent: React.FC<TetriminoComponentProps> = ({ piece, gridWidth, gridHeight }) => {
  if (!piece) return null;

  const cellSize = 30; // Example cell size in pixels
  const gridOffsetX = (gridWidth - piece.shape[0].length) * cellSize / 2; // Basic centering offset
  const gridOffsetY = 0; // Pieces start at the top

  // Calculate positions for each block of the tetrimino
  // This rendering assumes the piece.shape is a 2D array where 1 represents a block
  // and 0 represents an empty space within the piece's bounding box.
  
  // To render correctly, we need to map the piece's shape blocks to grid coordinates.
  // The piece.position.x and piece.position.y are the top-left corner of the piece's bounding box on the main grid.
  // The piece.shape is relative to its own bounding box.

  return (
    <g transform={`translate(${piece.position.x * cellSize + gridOffsetX}, ${piece.position.y * cellSize + gridOffsetY})`}>
      {piece.shape.map((row, y) =>
        row.map((cell, x) => {
          if (cell === 1) {
            return (
              <rect
                key={`${y}-${x}`}
                x={x * cellSize}
                y={y * cellSize}
                width={cellSize}
                height={cellSize}
                fill={piece.color}
                stroke="#333" // Dark border for blocks
                strokeWidth="1"
              />
            );
          }
          return null;
        })
      )}
    </g>
  );
};

export default TetriminoComponent;
