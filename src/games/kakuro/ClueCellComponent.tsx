import React from 'react';
import type { Clue } from './KakuroEngine';

interface ClueCellProps {
  clue: Clue | null;
  row: number;
  col: number;
}

const ClueCellComponent: React.FC<ClueCellProps> = ({ clue, row, col }) => {
  const clueClasses = [
    'kakuro-clue-cell',
    clue ? clue.direction : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={clueClasses} data-testid={`clue-${row}-${col}`}>
      {clue && (
        <>
          {clue.direction === 'across' && <span className="clue-across">{clue.sum}</span>}
          {clue.direction === 'down' && <span className="clue-down">{clue.sum}</span>}
        </>
      )}
    </div>
  );
};

export default ClueCellComponent;
