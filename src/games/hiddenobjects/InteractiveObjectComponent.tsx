import React from 'react';
import type { GameObject } from './HiddenObjectsEngine';

interface InteractiveObjectProps {
  object: GameObject;
  cellSize: number;
  isFound: boolean;
  onClick: (objectId: string) => void;
}

const InteractiveObjectComponent: React.FC<InteractiveObjectProps> = ({ object, cellSize, isFound, onClick }) => {
  const handleClick = () => {
    if (!isFound) {
      onClick(object.id);
    }
  };

  // Basic rendering based on object properties (position, size, image URL, color)
  // A real game might use more sophisticated rendering like sprites or SVG.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: object.position.x * cellSize,
    top: object.position.y * cellSize,
    width: object.size.width * cellSize,
    height: object.size.height * cellSize,
    backgroundColor: object.color || 'transparent', // Use object color or transparent if not specified
    backgroundImage: object.imageUrl ? `url(${object.imageUrl})` : 'none', // Use image if available
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: isFound ? '2px dashed #ccc' : 'none', // Visual cue for found objects
    opacity: isFound ? 0.5 : 1, // Fade found objects
    cursor: isFound ? 'default' : 'pointer',
    zIndex: object.isTarget ? 100 : 1, // Bring target objects forward if applicable
  };

  return (
    <div
      className={`hidden-object ${object.type} ${isFound ? 'found' : ''}`}
      style={style}
      onClick={handleClick}
      data-testid={`object-${object.id}`}
    >
      {/* Object content or hidden visual representation */}
    </div>
  );
};

export default InteractiveObjectComponent;
