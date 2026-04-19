import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  elevated = false,
}) => {
  const baseStyles: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-lg)',
    boxShadow: elevated ? 'var(--shadow-lg)' : 'var(--shadow-md)',
  };

  const Component = onClick ? motion.div : 'div';

  const motionProps = onClick ? {
    whileHover: { scale: 1.02, boxShadow: 'var(--shadow-xl)' },
    whileTap: { scale: 0.98 },
  } : {};

  return (
    <Component
      className={`${className} no-select`}
      style={baseStyles}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Card;
