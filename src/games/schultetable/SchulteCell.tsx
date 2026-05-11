import React from 'react';
import type { SchulteCell } from './SchulteTableEngine';

interface SchulteCellProps {
  cell: SchulteCell;
  row: number;
  col: number;
  isTarget: boolean;
  isSelected: boolean;
  onTap: (row: number, col: number) => void;
}

const SchulteCellComponent: React.FC<SchulteCellProps> = ({ cell, row, col, isTarget, isSelected, onTap }) => {
  const handleClick = () => {
    onTap(row, col);
  };

  const cellClasses = [
    'schulte-cell',
    cell.isTapped ? 'tapped' : '',
    isTarget ? 'target' : '',
    cell.value === null ? 'empty' : '', // Potentially for empty cells
    isSelected ? 'selected' : '',
    // Add classes for 3x3 box borders if needed, similar to Sudoku
    row % 3 === 2 && row !== 4 ? 'border-bottom-thick' : '',
    col % 3 === 2 && col !== 4 ? 'border-right-thick' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0} // for keyboard navigation
      aria-pressed={isSelected}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${cell.value !== null ? `, value ${cell.value}` : ''}`}
    >
      {cell.value !== null && (
        <span className="cell-value">{cell.value}</span>
      )}
    </div>
  );
};

export default SchulteCellComponent;
