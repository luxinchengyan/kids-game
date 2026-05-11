import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface BrandPalette {
  primary: string;
  secondary: string;
  soft: string;
  border: string;
  gradient: string;
  text?: string;
}

export function SurfaceCard({
  children,
  style,
  borderColor = 'rgba(255, 204, 128, 0.35)',
  background = 'rgba(255, 255, 255, 0.96)',
  shadow = '0 12px 30px rgba(62, 39, 35, 0.08)',
}: {
  children: ReactNode;
  style?: CSSProperties;
  borderColor?: string;
  background?: string;
  shadow?: string;
}) {
  return (
    <div
      style={{
        background,
        borderRadius: '24px',
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function BrandPill({
  children,
  background = '#FFF3E0',
  color = '#E65100',
  style,
}: {
  children: ReactNode;
  background?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        minHeight: '30px',
        padding: '4px 12px',
        borderRadius: '999px',
        background,
        color,
        fontSize: '13px',
        fontWeight: 800,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function IconActionButton({
  icon,
  activeIcon,
  active = false,
  label,
  onClick,
  background,
  activeBackground,
  color,
}: {
  icon: string;
  activeIcon?: string;
  active?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  background: string;
  activeBackground?: string;
  color: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: 'none',
        background: active ? activeBackground ?? background : background,
        color,
        fontSize: '18px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active ? '0 6px 14px rgba(62, 39, 35, 0.16)' : '0 4px 10px rgba(62, 39, 35, 0.1)',
      }}
    >
      {active ? activeIcon ?? icon : icon}
    </motion.button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent = '#1976D2',
  style,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  accent?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      {eyebrow ? (
        <div
          style={{
            fontSize: '13px',
            fontWeight: 900,
            color: accent,
            marginBottom: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h2>
      {description ? (
        <p
          style={{
            margin: '10px 0 0',
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function EmptyState({
  emoji,
  title,
  description,
  accent = '#FF9800',
}: {
  emoji: string;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <SurfaceCard
      borderColor={`${accent}33`}
      background="rgba(255, 255, 255, 0.9)"
      style={{
        textAlign: 'center',
        padding: '48px 24px',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>{emoji}</div>
      <div style={{ fontSize: '22px', fontWeight: 900, color: accent, marginBottom: '10px' }}>{title}</div>
      <div style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-text-secondary)', fontWeight: 600 }}>
        {description}
      </div>
    </SurfaceCard>
  );
}
