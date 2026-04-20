/**
 * ShipLogo — 童梦神舟 产品 Logo（小船形状 SVG）
 * 儿童友好风格，带渐变色彩
 */
import React from 'react';

interface ShipLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ShipLogo({ size = 64, className, style }: ShipLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="童梦神舟 Logo"
      role="img"
    >
      <defs>
        {/* 船身渐变 */}
        <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
        {/* 帆渐变 */}
        <linearGradient id="sailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="60%" stopColor="#9C27B0" />
          <stop offset="100%" stopColor="#E91E63" />
        </linearGradient>
        {/* 旗渐变 */}
        <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>
        {/* 水波渐变 */}
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64B5F6" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#2196F3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#64B5F6" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* ── 水波 ── */}
      <ellipse cx="32" cy="52" rx="26" ry="5" fill="url(#waveGrad)" />
      <path
        d="M6 52 Q14 48 22 52 Q30 56 38 52 Q46 48 58 52"
        stroke="#2196F3"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* ── 船身 ── */}
      <path
        d="M10 44 L12 50 Q32 56 52 50 L54 44 Z"
        fill="url(#hullGrad)"
      />
      {/* 船身高光 */}
      <path
        d="M14 44 L16 49 Q32 53 48 49 L50 44 Z"
        fill="#FFB74D"
        opacity="0.5"
      />
      {/* 船舷 */}
      <rect x="10" y="41" width="44" height="5" rx="2.5" fill="#EF6C00" />

      {/* ── 桅杆 ── */}
      <line x1="32" y1="12" x2="32" y2="43" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── 主帆 ── */}
      <path
        d="M32 14 L50 38 L32 38 Z"
        fill="url(#sailGrad)"
        opacity="0.92"
      />
      {/* 副帆 */}
      <path
        d="M32 18 L16 36 L32 36 Z"
        fill="#4CAF50"
        opacity="0.85"
      />

      {/* ── 旗子 ── */}
      <path
        d="M32 12 L42 16 L32 20 Z"
        fill="url(#flagGrad)"
      />

      {/* ── 窗口装饰 ── */}
      <circle cx="20" cy="43" r="2.5" fill="#FFF9C4" opacity="0.9" />
      <circle cx="44" cy="43" r="2.5" fill="#FFF9C4" opacity="0.9" />

      {/* ── 星星点缀 ── */}
      <circle cx="8" cy="22" r="1.5" fill="#FFD54F" opacity="0.9" />
      <circle cx="56" cy="18" r="1" fill="#FFD54F" opacity="0.8" />
      <circle cx="4" cy="34" r="1" fill="#B39DDB" opacity="0.7" />
    </svg>
  );
}
