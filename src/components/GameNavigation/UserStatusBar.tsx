import { useShallow } from 'zustand/react/shallow';
import { Card } from '../Card';
import { useUserStore } from '../../stores/useUserStore';
import { useRewardStore } from '../../stores/useRewardStore';

function StatDisplay({ icon, value, label }: { icon: string; value: number | string; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '100px' }}>
      <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-primary-1)', lineHeight: 1 }}>
        {icon} {value}
      </div>
      <div
        style={{
          fontSize: 'var(--font-size-md)',
          color: 'var(--color-text-secondary)',
          marginTop: '8px',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function UserStatusBar() {
  const currentChild = useUserStore((s) => s.currentChild);
  const { stars, level, streakDays } = useRewardStore(
    useShallow((s) => ({
      stars: s.rewards.stars,
      level: s.rewards.level,
      streakDays: s.rewards.streakDays,
    }))
  );

  return (
    <div style={{ marginBottom: '28px' }}>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: '20px' }}>
            👋 你好，{currentChild?.nickname || '小朋友'}！
          </p>
          <div
            style={{
              display: 'flex',
              gap: '28px',
              justifyContent: 'center',
              marginBottom: '28px',
              flexWrap: 'wrap',
            }}
          >
            <StatDisplay icon="⭐" value={stars} label="星星" />
            <StatDisplay icon="Lv." value={level} label="等级" />
            <StatDisplay icon="🔥" value={streakDays} label="连续天数" />
          </div>
        </div>
      </Card>
    </div>
  );
}
