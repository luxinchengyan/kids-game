# Technical Design & Implementation Notes
# 童梦飞船 · 智趣成长 (DreamShip · Smart Growth)
# 版本：v3.0

---

## 数据库

**注意**: 数据库连接字符串应通过环境变量配置，请勿在代码中硬编码。

MongoDB 配置示例（.env 文件）：
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/
```

具体配置请参考 `.env.example` 文件。

面向 3–6 岁儿童的互动学习产品技术说明，目标：快速迭代 MVP、保证触控流畅与低延迟音画同步、易于扩展题库与多语言内容。

---

## 1. Technology Stack

### 1.1 Core Stack (Fixed)
- **Framework**: React 18+ + TypeScript 5+
- **Component Pattern**: Function components + Hooks (NO Class components)
- **State Management**: Zustand (lightweight, performant)
- **Routing**: React Router v6+
- **Styling**: CSS Custom Properties + CSS-in-JS (framer-motion for animations)
- **Build Tool**: Vite (fast HMR, lightweight builds)

### 1.2 Animation & Interaction
- **UI Animations**: Framer Motion (whileHover, whileTap, AnimatePresence)
- **Complex Animations**: Canvas/SVG for reward visualizations
- **Gesture Handling**: Pointer events + hit testing for drag & drop

### 1.3 Testing & CI
- **Unit/Component**: Vitest + React Testing Library
- **E2E**: Playwright (critical user flows)
- **Component Stories**: Storybook with a11y addon
- **Performance**: Lighthouse CI for regression tracking
- **CI/CD**: GitHub Actions (lint, test, build, deploy)

---

## 2. Project Architecture

### 2.1 Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Button component with variants
│   ├── Card/           # Card component with elevation
│   ├── Modal/          # Modal/Dialog component
│   ├── GameNavigation/ # Game grid, cards, user stats
│   ├── ChoiceTask.jsx  # Multiple choice task
│   ├── MatchTask.jsx   # Matching task
│   ├── MicroTask.jsx   # Micro task template
│   ├── RewardToast.jsx # Reward notification
│   └── ...
├── games/              # Game modules (lazy loaded)
│   ├── pinyin/         # Pinyin adventure game
│   ├── math/           # Math town game
│   ├── english/        # English playground game
│   ├── stories/        # Story kingdom game
│   └── registry.ts     # Game registration & routing
├── stores/             # Zustand state stores
│   ├── useUserStore.ts    # User profiles, preferences
│   ├── useRewardStore.ts  # Stars, levels, badges
│   └── useGameStore.ts    # Game state, progress
├── hooks/              # Custom React hooks
│   ├── useGameCompletion.ts
│   └── useGameProgress.ts
├── lib/                # Utility libraries
│   ├── analytics.ts    # Event tracking
│   ├── audio.ts        # Audio playback
│   ├── dragdrop.ts     # Drag & drop handling
│   ├── gameHelpers.ts  # Game utilities
│   ├── i18n.ts         # Internationalization
│   └── storage.ts      # Local storage
├── pages/              # Page components
│   └── HomePage.tsx    # Main landing page
├── styles/             # Global styles & design tokens
│   ├── tokens.css      # CSS custom properties
│   └── global.css      # Global reset & utilities
├── data/               # Static data
│   ├── learningContent.js  # Task definitions
│   └── rewards.js          # Reward configurations
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Root component & routing
├── main.tsx            # Entry point
└── config.ts           # App configuration
```

### 2.2 Component Architecture

#### Component Pattern
```tsx
// 1. Imports
import React from 'react';
import { motion } from 'framer-motion';

// 2. Types
interface MyComponentProps {
  title: string;
  onComplete?: () => void;
}

// 3. Component
export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onComplete 
}) => {
  // 4. Hooks
  const [state, setState] = React.useState(initialValue);
  
  // 5. Event handlers
  const handleClick = () => {
    onComplete?.();
  };
  
  // 6. Render
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {title}
    </motion.button>
  );
};

export default MyComponent;
```

#### Design Token Usage
```tsx
// ✅ CORRECT: Use CSS custom properties
style={{
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--color-surface)',
  boxShadow: 'var(--shadow-md)',
}}

// ❌ WRONG: Hardcoded values
style={{
  padding: '24px',
  borderRadius: '16px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}}
```

---

## 3. State Management (Zustand)

### 3.1 Store Pattern
```typescript
import { create } from 'zustand';

interface RewardState {
  rewards: {
    stars: number;
    level: number;
    streakDays: number;
  };
  addStars: (count: number) => void;
  checkIn: () => void;
}

export const useRewardStore = create<RewardState>((set) => ({
  rewards: {
    stars: 0,
    level: 1,
    streakDays: 0,
  },
  addStars: (count) => set((state) => ({
    rewards: {
      ...state.rewards,
      stars: state.rewards.stars + count,
    },
  })),
  checkIn: () => set((state) => ({
    rewards: {
      ...state.rewards,
      streakDays: state.rewards.streakDays + 1,
    },
  })),
}));
```

### 3.2 Store Usage
```tsx
// Select specific state (use shallow comparison for performance)
import { useShallow } from 'zustand/react/shallow';

const { stars, level } = useRewardStore(
  useShallow((s) => ({
    stars: s.rewards.stars,
    level: s.rewards.level,
  }))
);

// Select action
const addStars = useRewardStore((s) => s.addStars);
```

### 3.3 Data Flow
```
User Action → Store Update → UI Re-render → Analytics Track
```

**Example**:
```tsx
// 1. User clicks
<Button onClick={() => addStars(1)} />

// 2. Store updates (automatic)
addStars(1) → state.rewards.stars += 1

// 3. UI re-renders (automatic)
const stars = useRewardStore((s) => s.rewards.stars)

// 4. Analytics tracked
track('add_stars', { count: 1 })
```

---

## 4. Animation System (Framer Motion)

### 4.1 Basic Animations

#### Hover & Tap
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

#### Entrance Animation
```tsx
<motion.div
  initial={{ y: -30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Exit Animation (AnimatePresence)
```tsx
<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### 4.2 Animation Best Practices

#### Performance
- ✅ Use `transform` and `opacity` only (GPU accelerated)
- ✅ Limit concurrent animations to ≤ 3
- ✅ Use `will-change: transform` for complex animations
- ❌ Animate properties that trigger reflow (width, height, top, left)

#### Accessibility
```tsx
// Respect prefers-reduced-motion
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

### 4.3 Common Animation Patterns

#### Page Transitions
```tsx
// Forward navigation
initial={{ x: '100%', opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: '-100%', opacity: 0 }}
transition={{ duration: 0.3, ease: 'easeInOut' }}
```

#### Modal/Dialog
```tsx
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.8, opacity: 0 }}
transition={{ duration: 0.2, ease: 'easeOutBack' }}
```

#### Reward Celebration
```tsx
initial={{ scale: 0, rotate: -180 }}
animate={{ scale: 1, rotate: 0 }}
transition={{ 
  duration: 0.4, 
  ease: 'easeOutElastic',
  type: 'spring',
  stiffness: 200
}}
```

---

## 5. Game Architecture

### 5.1 Game Registry Pattern
```typescript
// src/games/registry.ts
export interface GameConfig {
  id: string;
  name: string;
  path: string;
  icon: string;
  category: 'pinyin' | 'math' | 'english' | 'stories';
  component: React.LazyExoticComponent<() => JSX.Element>;
}

export const gameRegistry: GameConfig[] = [];

export function registerGame(config: GameConfig) {
  gameRegistry.push(config);
}
```

### 5.2 Game Flow
```
Home → Game Select → Task 1 → Task 2 → Task 3 → Complete → Reward → Home
```

**Implementation**:
```tsx
// Game component structure
export default function PinyinGame() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const { handleGameComplete } = useGameCompletion('pinyin');
  
  const handleTaskComplete = (result) => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      handleGameComplete(result);
      navigate('/');
    }
  };
  
  return (
    <Suspense fallback={<LazyFallback />}>
      {renderTask(tasks[currentTaskIndex])}
    </Suspense>
  );
}
```

### 5.3 Task Components
- **ChoiceTask**: Multiple choice questions
- **MatchTask**: Drag & drop matching
- **MicroTask**: Quick interactive tasks
- **PinyinBattle**: Pinyin-specific challenges

All task components follow the same interface:
```tsx
interface TaskProps {
  task: TaskData;
  onComplete: (result: TaskResult) => void;
}
```

---

## 6. Core Subsystems

### 6.1 Audio System (src/lib/audio.ts)

**Interface**:
```typescript
play(id: string): void
preload(ids: string[]): Promise<void>
stop(): void
onFinish(callback: () => void): void
```

**Strategy**:
1. Local audio file (priority)
2. Cached audio
3. Web Speech API (fallback)

**Key Points**:
- Throttle parallel playback (avoid overlap)
- Optional subtitle synchronization
- Short audio segments (≤3s)
- Proper compression for performance

### 6.2 Drag & Drop (src/lib/dragdrop.ts)

**Requirements**:
- Forgiving trigger area (±20dp tolerance)
- Auto snap-to-grid
- One-step undo interface
- Low latency (Pointer events + hit testing)

**Implementation**: Lightweight custom implementation (no heavy libraries)

### 6.3 Reward System

**Event-Driven Architecture**:
```
Task Success/Failure → Reward Queue → Display Layer
```

**Features**:
- Immediate rewards (stars)
- Rare/random rewards (badges)
- State persistence in store
- Visual feedback (animations, sounds)

### 6.4 Analytics (src/lib/analytics.ts)

**Function**: `track(event: string, data?: object)`

**Events**:
- `game_select`: User selects a game
- `game_start`: Game begins
- `task_complete`: Task finished
- `check_in`: Daily check-in

**Privacy**: No PII, local processing preferred

---

## 7. Performance & Device Targets

### 7.1 Performance Goals
- **Interaction Feedback**: < 200ms latency
- **Animation Frame Rate**: 60fps (prefer short, layered animations)
- **First Screen Load**: < 2s (3G network)
- **Bundle Size**: < 100 MB

### 7.2 Resource Strategy
- **Lazy Loading**: Load game modules on demand
- **Code Splitting**: React.lazy + Suspense for games
- **Audio**: Short segments (≤3s), proper compression
- **Images**: WebP format, appropriate sizing, lazy loading

### 7.3 Optimization Techniques
- `React.memo` for avoiding unnecessary re-renders
- `useMemo` and `useCallback` for caching
- Virtual scrolling for long lists (if needed)
- Web Workers for complex calculations
- Debounce/throttle for frequent events

---

## 8. Testing & CI

### 8.1 Testing Strategy

**Component Testing**:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});
```

**E2E Testing (Playwright)**:
- Cover critical paths:
  - Click to hear audio
  - Drag & drop matching
  - Reward display
  - Parent summary export

### 8.2 Storybook
- All components should have at least one story
- Enable a11y addon
- Test different states (default, hover, disabled)

### 8.3 CI Pipeline
```
PR → lint → unit tests → Storybook build → Playwright tests → Lighthouse audit
```

**GitHub Actions**:
- Run on every PR
- Main branch: Deploy + performance audit
- Fail on lint errors or test failures

---

## 9. Scalability & Maintenance

### 9.1 Content Model
- **Question Bank**: JSON-indexed (filter by age/topic)
- **Audio Index**: Map audio files to content IDs
- **Easy Import**: Support backend/editorial platform integration

### 9.2 Backend (Optional)
- **Cloud Storage**: For large user bases
- **Analytics**: Server-side event tracking
- **Multi-device Sync**: Cross-platform progress
- **API**: Simple REST or serverless functions

### 9.3 Data & Privacy
- **Minimal Collection**: Only necessary, non-sensitive data
- **Anonymous Stats**: Practice statistics only
- **Parent Control**: Opt-in for upload/backup
- **Compliance**: COPPA, GDPR compliant

---

## 10. Engineering Best Practices

### 10.1 Component Design
- **Modular**: Small, testable components first
- **Reusable**: Micro-task templates independent and side-effect free
- **Composable**: Build complex UIs from simple components

### 10.2 Feature Flags
- **Gradual Rollout**: Enable new features progressively
- **A/B Testing**: Test different reward/difficulty strategies
- **Kill Switch**: Quickly disable problematic features

### 10.3 Offline Support
- **Local Mock Data**: Support development without backend
- **Offline Mode**: Question bank + basic audio available offline
- **Low Network**: Graceful degradation

### 10.4 Code Quality
- **TypeScript Strict Mode**: `strict: true` required
- **No `any` Type**: Unless absolutely necessary (with comment)
- **ESLint + Prettier**: Consistent code style
- **Code Review**: All PRs require review

---

## Summary

**Priority**: "Low-latency audio-visual sync + simple reusable micro-task components + scalable question bank + parent reporting"

**Goal**: Create an immersive learning experience for young children that is fast, engaging, and educationally effective.

**Key Principles**:
1. Performance first (< 200ms feedback, 60fps animations)
2. Child-friendly (large touch targets, warm colors, positive feedback)
3. Maintainable (modular, testable, well-documented)
4. Scalable (lazy loading, code splitting, offline support)
5. Privacy-focused (minimal data, COPPA/GDPR compliant)

---

**Document Maintenance Record**:
- v3.0 (2026-04-19): Complete restructure with component architecture, Zustand patterns, framer-motion guidelines, game architecture
- v2.0: Added technical specifications and best practices
- v1.0: Initial framework