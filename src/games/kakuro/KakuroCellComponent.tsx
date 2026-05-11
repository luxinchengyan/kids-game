import React from 'react';
import type { KakuroCell } from './KakuroEngine';

interface KakuroCellProps {
  cell: KakuroCell;
  row: number;
  col: number;
  isTarget: boolean; // For highlighting the target cell
  isSelected: boolean;
  onTap: (row: number, col: number) => void;
}

const KakuroCellComponent: React.FC<KakuroCellProps> = ({ cell, row, col, isTarget, isSelected, onTap }) => {
  const handleClick = () => {
    onTap(row, col);
  };

  const cellClasses = [
    'kakuro-cell',
    isSelected ? 'selected' : '',
    isTarget ? 'target' : '',
    cell.isPreFilled ? 'pre-filled' : '',
    cell.value !== null ? 'filled' : '',
    cell.isCandidate ? 'candidate' : '',
    cell.isValid === false ? 'invalid' : '', // For error highlighting
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
      {cell.value !== null && <span className="cell-value">{cell.value}</span>}
      {/* Render candidates if isCandidate is true and value is null */}
      {cell.value === null && cell.isCandidate && (
        <div className="cell-candidates">
          {/* Placeholder for candidate rendering */}
          {/* ... */}
        </div>
      )}
    </div>
  );
};

export default KakuroCellComponent;
