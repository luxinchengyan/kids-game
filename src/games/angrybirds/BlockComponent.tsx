import React from 'react';
import type { GameObject } from './AngryBirdsEngine';

interface BlockProps {
  block: GameObject;
}

const BlockComponent: React.FC<BlockProps> = ({ block }) => {
  const { body, color, shape } = block;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: body.position.x - (shape === 'rectangle' ? body.width : (body as any).radius) / 2,
    top: body.position.y - (shape === 'rectangle' ? body.height : (body as any).radius) / 2,
    width: shape === 'rectangle' ? body.width : (body as any).radius * 2,
    height: shape === 'rectangle' ? body.height : (body as any).radius * 2,
    backgroundColor: color || '#8B4513', // Brown color for blocks
    transform: `rotate(${body.angle}rad)`,
    transformOrigin: 'center',
  };

  return (
    <div className="block" style={style}></div>
  );
};

export default BlockComponent;
