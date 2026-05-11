import React, { useState, useEffect, memo } from 'react';
import type { SudokuCell } from './SudokuEngine';

interface CellProps {
  cell: SudokuCell;
  row: number;
  col: number;
  isSelected: boolean;
  isPreFilled: boolean;
  onClick: (row: number, col: number) => void;
  onContextMenu: (row: number, col: number) => void;
  candidates: Set<number>;
}

const Cell: React.FC<CellProps> = memo(({ cell, row, col, isSelected, isPreFilled, onClick, onContextMenu, candidates }) => {
  const [showCandidates, setShowCandidates] = useState<Set<number>>(new Set(candidates));

  useEffect(() => {
    // Update candidates when the prop changes
    setShowCandidates(new Set(candidates));
  }, [candidates]);

  const handleClick = () => {
    onClick(row, col);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default context menu
    onContextMenu(row, col);
  };

  const renderValue = () => {
    if (cell.value !== null) {
      return cell.value;
    }
    if (isPreFilled) {
      return cell.value; // Should not happen if value is null but isPreFilled is true
    }
    return null;
  };

  const cellClasses = [
    'cell',
    isSelected ? 'selected' : '',
    isPreFilled ? 'pre-filled' : '',
    cell.value !== null && !isPreFilled ? 'user-filled' : '',
    cell.isValid === false ? 'invalid' : '', // For error highlighting
    // Add classes for 3x3 box borders
    row % 3 === 2 && row !== 8 ? 'border-bottom-thick' : '',
    col % 3 === 2 && col !== 8 ? 'border-right-thick' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      role="button"
      tabIndex={0} // for keyboard navigation
      aria-pressed={isSelected}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${cell.value !== null ? `, value ${cell.value}` : ''}`}
    >
      <div className="cell-content">
        {renderValue() !== null ? (
          <span className="cell-number">{renderValue()}</span>
        ) : (
          <div className="cell-candidates">
            {Array.from(showCandidates).sort().map(num => (
              <span key={num} className="candidate-number">{num}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Cell.displayName = 'Cell'; // For React DevTools

export default Cell;
