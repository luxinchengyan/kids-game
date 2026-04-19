import React from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { minHeight: '48px', fontSize: '16px', padding: '8px 16px' };
      case 'medium':
        return { minHeight: '56px', fontSize: '18px', padding: '12px 24px' };
      case 'large':
        return { minHeight: '64px', fontSize: '20px', padding: '16px 32px' };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #FF9800, #F57C00)',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px rgba(255, 152, 0, 0.4)',
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
          color: '#1976D2',
          border: '3px solid #2196F3',
        };
      case 'icon':
        return {
          background: 'linear-gradient(135deg, #FFFFFF, #FFF8E1)',
          color: '#3E2723',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      className={`${className} no-select`}
      style={{
        ...sizeStyles,
        ...variantStyles,
        borderRadius: '24px',
        border: variant === 'secondary' ? variantStyles.border : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 700,
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {icon}
      {children}
    </motion.button>
  );
};

export default Button;
