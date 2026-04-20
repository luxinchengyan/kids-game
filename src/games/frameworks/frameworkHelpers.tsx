import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface FrameworkStatItem {
  label: string;
  value: string;
  note?: string;
}

export function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

export function sampleItems<T>(items: T[], count: number): T[] {
  return shuffleArray(items).slice(0, Math.min(count, items.length));
}

export function speakText(text: string, lang = 'zh-CN'): void {
  if (!('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

export function FrameworkPanel({
  children,
  borderColor = '#FFE0B2',
  background = '#FFFFFF',
}: {
  children: ReactNode;
  borderColor?: string;
  background?: string;
}) {
  return (
    <div
      style={{
        background,
        borderRadius: '24px',
        padding: '24px',
        border: `3px solid ${borderColor}`,
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
      }}
    >
      {children}
    </div>
  );
}

export function FrameworkStatGrid({
  items,
  accent,
  surface,
}: {
  items: FrameworkStatItem[];
  accent: string;
  surface: string;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
        marginBottom: '20px',
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: surface,
            borderRadius: '18px',
            padding: '16px',
            textAlign: 'center',
            border: `2px solid ${accent}22`,
          }}
        >
          <div style={{ color: '#8D6E63', fontWeight: 800, marginBottom: '6px' }}>{item.label}</div>
          <div style={{ color: accent, fontWeight: 900, fontSize: '26px' }}>{item.value}</div>
          {item.note && <div style={{ marginTop: '6px', color: '#8D6E63', fontSize: '12px' }}>{item.note}</div>}
        </div>
      ))}
    </div>
  );
}

export function CompletionPanel({
  emoji,
  title,
  summary,
  accent,
  background,
  children,
}: {
  emoji: string;
  title: string;
  summary: string;
  accent: string;
  background: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background,
        borderRadius: '22px',
        padding: '24px',
        textAlign: 'center',
        border: `3px solid ${accent}55`,
      }}
    >
      <div style={{ fontSize: '52px', marginBottom: '8px' }}>{emoji}</div>
      <h3 style={{ margin: '0 0 8px 0', color: accent, fontSize: '28px' }}>{title}</h3>
      <p style={{ margin: '0 0 16px 0', color: '#5D4037', fontWeight: 700, lineHeight: 1.7 }}>{summary}</p>
      {children}
    </motion.div>
  );
}
