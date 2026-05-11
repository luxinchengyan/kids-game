import React from 'react';
import type { ChineseCharCell } from './ChineseCharEngine';

interface CharacterCellProps {
  cell: ChineseCharCell;
  row: number;
  col: number;
  isTarget: boolean; // For highlighting the target character/cell
  isSelected: boolean;
  onTap: (row: number, col: number) => void;
}

const CharacterCellComponent: React.FC<CharacterCellProps> = ({ cell, row, col, isTarget, isSelected, onTap }) => {
  const handleClick = () => {
    onTap(row, col);
  };

  const cellClasses = [
    'char-cell',
    isSelected ? 'selected' : '',
    cell.isComponent ? 'component-cell' : '', // For cells that are part of a character component
    isTarget ? 'target-cell' : '', // For the target character being decomposed/composed
    cell.isCorrect ? 'correct' : '',
    cell.isIncorrect ? 'incorrect' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0} // for keyboard navigation
      aria-pressed={isSelected}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${cell.value !== null ? `, character ${cell.value}` : ''}`}
    >
      {cell.value !== null && <span className="cell-character">{cell.value}</span>}
      {/* Could render components or visual cues for composition/decomposition */}
    </div>
  );
};

export default CharacterCellComponent;
