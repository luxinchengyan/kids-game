import React from 'react';
import type { GameObject } from './AngryBirdsEngine';

interface GroundProps {
  ground: GameObject;
}

const GroundComponent: React.FC<GroundProps> = ({ ground }) => {
  const { body, color } = ground;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: body.position.x - body.width / 2,
    top: body.position.y - body.height / 2,
    width: body.width,
    height: body.height,
    backgroundColor: color || '#8B4513', // Brown color for ground
    // Ground is typically static, so rotation might not be visually apparent
  };

  return (
    <div className="ground" style={style}></div>
  );
};

export default GroundComponent;
