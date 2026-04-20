import { motion } from 'framer-motion';
import { TYPING_KEYBOARD_ROWS, displayTypingKey } from './typingUtils';

export const typingThemeColors = {
  primary: '#7C4DFF',
  secondary: '#26C6DA',
  accent: '#FFD54F',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF7FF',
  text: '#1F2A44',
  border: '#C5CAE9',
  success: '#43A047',
  danger: '#EF5350',
};

export function TypingStatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        padding: '16px',
        border: '2px solid #D1C4E9',
        minWidth: '120px',
        flex: 1,
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#5E35B1', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 900, color: '#1F2A44' }}>{value}</div>
      {note ? (
        <div style={{ fontSize: '13px', color: '#5C6B8A', marginTop: '6px', lineHeight: 1.5 }}>
          {note}
        </div>
      ) : null}
    </div>
  );
}

export function TypingKeyboard({
  activeKeys = [],
  masteredKeys = [],
  errorKey,
}: {
  activeKeys?: string[];
  masteredKeys?: string[];
  errorKey?: string | null;
}) {
  const activeSet = new Set(activeKeys);
  const masteredSet = new Set(masteredKeys);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '18px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, #0F172A, #1E293B)',
        boxShadow: '0 14px 28px rgba(15, 23, 42, 0.25)',
      }}
    >
      {TYPING_KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={row.join('-')}
          style={{
            display: 'grid',
            gap: '10px',
            gridTemplateColumns:
              row[0] === 'SPACE'
                ? 'minmax(0, 1fr)'
                : `repeat(${row.length}, minmax(${rowIndex === 1 ? '44px' : '42px'}, 1fr))`,
            justifyItems: 'center',
          }}
        >
          {row.map((key) => {
            const isActive = activeSet.has(key);
            const isMastered = masteredSet.has(key);
            const isError = errorKey === key;

            return (
              <motion.div
                key={key}
                animate={{
                  scale: isActive ? [1, 1.06, 1] : 1,
                  boxShadow: isActive
                    ? ['0 0 0 rgba(38, 198, 218, 0.2)', '0 0 22px rgba(38, 198, 218, 0.7)', '0 0 0 rgba(38, 198, 218, 0.2)']
                    : '0 6px 14px rgba(15, 23, 42, 0.3)',
                }}
                transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                style={{
                  minHeight: '54px',
                  width: key === 'SPACE' ? '100%' : '100%',
                  borderRadius: key === 'SPACE' ? '999px' : '16px',
                  background: isError
                    ? '#FFCDD2'
                    : isActive
                      ? 'linear-gradient(135deg, #26C6DA, #80DEEA)'
                      : isMastered
                        ? 'linear-gradient(135deg, #C5E1A5, #E6EE9C)'
                        : 'linear-gradient(135deg, #FFFFFF, #E2E8F0)',
                  color: isError ? '#B71C1C' : '#1F2A44',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: key === 'SPACE' ? '18px' : '22px',
                  fontWeight: 900,
                  border: isActive
                    ? '2px solid rgba(255,255,255,0.9)'
                    : isError
                      ? '2px solid #EF5350'
                      : '2px solid rgba(148, 163, 184, 0.65)',
                }}
              >
                {displayTypingKey(key)}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function TypingCallout({
  title,
  detail,
  tone = 'info',
}: {
  title: string;
  detail: string;
  tone?: 'info' | 'success' | 'warning';
}) {
  const background =
    tone === 'success'
      ? 'linear-gradient(135deg, #E8F5E9, #F1F8E9)'
      : tone === 'warning'
        ? 'linear-gradient(135deg, #FFF8E1, #FFF3E0)'
        : 'linear-gradient(135deg, #E3F2FD, #F3E5F5)';
  const borderColor = tone === 'success' ? '#81C784' : tone === 'warning' ? '#FFCC80' : '#B39DDB';

  return (
    <div
      style={{
        borderRadius: '20px',
        border: `2px solid ${borderColor}`,
        background,
        padding: '18px',
      }}
    >
      <div style={{ fontSize: '16px', fontWeight: 900, color: '#283593', marginBottom: '8px' }}>
        {title}
      </div>
      <div style={{ fontSize: '15px', color: '#3949AB', lineHeight: 1.7 }}>{detail}</div>
    </div>
  );
}
