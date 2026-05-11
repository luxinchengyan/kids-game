import React from 'react';
import type { GameObject } from './AngryBirdsEngine';

interface BirdProps {
  bird: GameObject;
}

const BirdComponent: React.FC<BirdProps> = ({ bird }) => {
  const { body, color, shape } = bird;

  // Basic rendering based on Matter.js body properties
  // A real game would use sprites and more complex rendering.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: body.position.x - (shape === 'circle' ? (body as any).radius : (body as any).width) / 2,
    top: body.position.y - (shape === 'circle' ? (body as any).radius : (body as any).height) / 2,
    width: shape === 'circle' ? (body as any).radius * 2 : (body as any).width,
    height: shape === 'circle' ? (body as any).radius * 2 : (body as any).height,
    backgroundColor: color || 'red',
    borderRadius: shape === 'circle' ? '50%' : '0',
    transform: `rotate(${body.angle}rad)`,
    transformOrigin: 'center',
    // Add transition for smoother movement if desired, but physics updates often override it.
    // transition: 'transform 0.1s linear', 
  };

  return (
    <div className="bird" style={style}></div>
  );
};

export default BirdComponent;
