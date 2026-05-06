import { useMemo } from 'react';
import { useUserStore } from '../stores/useUserStore';

interface ChildSwitcherProps {
  compact?: boolean;
}

export function ChildSwitcher({ compact = false }: ChildSwitcherProps) {
  const { children, currentChild, setCurrentChild } = useUserStore((state) => ({
    children: state.children,
    currentChild: state.currentChild,
    setCurrentChild: state.setCurrentChild,
  }));

  const shouldShow = children.length > 1;
  const label = useMemo(() => (
    currentChild ? `${currentChild.nickname} · ${currentChild.age}岁` : '选择小朋友'
  ), [currentChild]);

  if (!shouldShow) return null;

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#FFFFFF',
        borderRadius: compact ? 12 : 16,
        border: '1px solid #E3EAF7',
        padding: compact ? '6px 10px' : '10px 14px',
      }}
    >
      <span style={{ fontSize: compact ? 12 : 13, fontWeight: 700, color: '#5C6BC0' }}>当前宝贝</span>
      <select
        value={currentChild?._id || ''}
        onChange={(event) => {
          const next = children.find((child) => child._id === event.target.value) || null;
          setCurrentChild(next);
        }}
        aria-label="切换小朋友"
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontWeight: 800,
          color: '#1A237E',
          fontSize: compact ? 13 : 14,
          cursor: 'pointer',
          maxWidth: compact ? 140 : 180,
        }}
      >
        <option value={currentChild?._id || ''}>{label}</option>
        {children
          .filter((child) => child._id !== currentChild?._id)
          .map((child) => (
            <option key={child._id} value={child._id}>
              {child.nickname} · {child.age}岁
            </option>
          ))}
      </select>
    </label>
  );
}
