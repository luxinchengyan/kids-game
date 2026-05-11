import React from 'react';
import type { GameObject } from './AngryBirdsEngine';

interface PigProps {
  pig: GameObject;
}

const PigComponent: React.FC<PigProps> = ({ pig }) => {
  const { body, color, shape } = pig;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: body.position.x - (shape === 'circle' ? (body as any).radius : (body as any).width) / 2,
    top: body.position.y - (shape === 'circle' ? (body as any).radius : (body as any).height) / 2,
    width: shape === 'circle' ? (body as any).radius * 2 : (body as any).width,
    height: shape === 'circle' ? (body as any).radius * 2 : (body as any).height,
    backgroundColor: color || 'green', // Default pig color
    borderRadius: shape === 'circle' ? '50%' : '0',
    transform: `rotate(${body.angle}rad)`,
    transformOrigin: 'center',
  };

  return (
    <div className="pig" style={style}></div>
  );
};

export default PigComponent;
