import React from 'react';

interface NumberPaletteProps {
  onNumberSelect: (num: number) => void;
  onErase: () => void;
  selectedNumber: number | null;
  setSelectedNumber: (num: number | null) => void;
}

const NumberPalette: React.FC<NumberPaletteProps> = ({ onNumberSelect, onErase, selectedNumber, setSelectedNumber }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleNumberClick = (num: number) => {
    setSelectedNumber(num);
    onNumberSelect(num);
  };

  const handleEraseClick = () => {
    setSelectedNumber(null);
    onErase();
  };

  return (
    <div className="number-palette">
      {numbers.map((num) => (
        <button
          key={num}
          className={`palette-number ${selectedNumber === num ? 'selected' : ''}`}
          onClick={() => handleNumberClick(num)}
        >
          {num}
        </button>
      ))}
      <button className={`palette-erase ${selectedNumber === null ? 'selected' : ''}`} onClick={handleEraseClick}>Erase</button>
    </div>
  );
};

export default NumberPalette;
