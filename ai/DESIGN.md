# Design Guidelines
# 产品名称:童梦飞船 · 智趣成长 (DreamShip · Smart Growth)
# 版本：v3.0

---

## 0. Visual Theme & Atmosphere

### 0.1 Design Philosophy
**看见即理解，触摸即学习，反馈即成长**  
(See is understand, touch is learn, feedback is grow)

### 0.2 Visual Identity
- **Mood**: Playful, warm, magical, child-centric
- **Density**: Low - children need whitespace and breathing room
- **Personality**: Like a friendly older sibling - encouraging, patient, joyful
- **Metaphor**: A magical spaceship traveling through learning galaxies

### 0.3 Design Principles (Children First)
1. **Simplicity**: ≤ 5 elements per screen, no clutter
2. **Large & Bold**: Touch targets ≥ 64x64 dp, key buttons ≥ 88x88 dp
3. **Instant Feedback**: Response < 200ms, clear cause-and-effect
4. **Forgiving**: Undoable actions, guided errors, no punitive feedback
5. **Multi-sensory**: Visual + Audio + Haptic synergy
6. **Positive**: Always encourage, always celebrate, always hope

---

## 1. Color Palette & Roles

### 1.1 Brand Identity & Logo
- **Logo Concept**: Rainbow bridge + little star + child's smile
- **Brand Colors**: Magic rainbow palette (see below)
- **Brand Font**: Rounded sans-serif, cute like bubbles

### 1.2 Core Color System (Magic Rainbow Palette)

| Color Role | Name | Hex | RGB | Usage |
|-----------|------|-----|-----|-------|
| **Primary 1** | Sunshine Orange | #FF9800 | 255, 152, 0 | Main buttons, emphasis, positive feedback |
| **Primary 2** | Sky Blue | #2196F3 | 33, 150, 243 | Secondary buttons, links, info areas |
| **Primary 3** | Grass Green | #4CAF50 | 76, 175, 80 | Correct, complete, growth |
| **Accent 1** | Strawberry Pink | #E91E63 | 233, 30, 99 | Warnings, important notes (use carefully) |
| **Accent 2** | Grape Purple | #9C27B0 | 156, 39, 176 | Rewards, rare, special |
| **Neutral 1** | Warm Cloud | #FFF8E1 | 255, 248, 225 | Background, cards |
| **Neutral 2** | Warm Light | #FFECB3 | 255, 236, 179 | Dividers, secondary elements |
| **Neutral 3** | Deep Brown | #5D4037 | 93, 64, 55 | Body text |
| **Neutral 4** | Night Black | #3E2723 | 62, 39, 35 | Titles, important text |

### 1.3 Category-Specific Gradients

| Category | Gradient | Usage |
|----------|----------|-------|
| **Pinyin** | `linear-gradient(135deg, #FF9800, #FFB74D)` | Pinyin game cards, buttons |
| **Math** | `linear-gradient(135deg, #2196F3, #64B5F6)` | Math game cards, buttons |
| **English** | `linear-gradient(135deg, #4CAF50, #81C784)` | English game cards, buttons |
| **Stories** | `linear-gradient(135deg, #9C27B0, #CE93D8)` | Stories game cards, buttons |

### 1.4 Semantic Colors

| Semantic | Color | Hex | Usage |
|----------|-------|-----|-------|
| **Success** | Grass Green | #4CAF50 | Correct answers, completion |
| **Warning** | Sunshine Orange | #FF9800 | Cautions, attention needed |
| **Error** | Strawberry Pink | #E91E63 | Wrong answers (gentle) |
| **Info** | Sky Blue | #2196F3 | Information, hints |

### 1.5 Color Usage Rules
- **Ratio**: 60% background + 30% primary + 10% accent (golden ratio)
- **Avoid**: Red-green combinations (colorblind friendly), high-saturation adjacent colors
- **Contrast**: Text vs background ≥ 4.5:1 (WCAG AA standard)
- **Dark Mode** (Parent section only): Use dark backgrounds (#1A1A2E) with same accent colors

---

## 2. Typography Rules

### 2.1 Font Families

| Language | Font Stack | Characteristics |
|----------|-----------|-----------------|
| **Chinese** | 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif | Rounded, child-friendly |
| **English** | 'Comic Neue', 'Nunito', 'Quicksand', sans-serif | Rounded, playful, clear |
| **Numbers** | Same as English | Ensure b/d, p/q distinction |

### 2.2 Type Scale (Child-Friendly)

| Level | Usage | Size (px) | Weight | Line Height | Letter Spacing |
|-------|-------|-----------|--------|-------------|----------------|
| **H1** | Page titles | 48-64 | 900 | 1.2 | -0.02em |
| **H2** | Section titles | 28-32 | 800 | 1.3 | -0.01em |
| **H3** | Card titles | 22-24 | 700 | 1.4 | 0 |
| **Body** | Child text | 20-24 | 700 | 1.3 | 0.01em |
| **Parent** | Parent text | 16-18 | 400 | 1.5 | 0 |
| **Small** |辅助 info | 14-16 | 600 | 1.4 | 0.01em |

### 2.3 Typography Guidelines

**For Children (3-6 years)**:
- Length: 2-6 characters, max 1 line
- Tone: Positive, encouraging, warm (like older sibling)
- Examples:
  - ✅ "太棒了！" → "你真厉害！" → "继续加油！"
  - ❌ "再试一次" → ✅ "没关系，我们再来一次！"
  - Action: "点一点" → "拖一拖" → "听一听"

**For Parents**:
- Professional, clear, concise
- Standard UI patterns acceptable
- Can use longer text when needed

### 2.4 Font Principles
- Avoid thin strokes
- Moderate letter/number spacing
- Similar characters (b/d, p/q) must have clear distinction
- Support 1.2x-1.5x font scaling for accessibility

---

## 3. Component Stylings

### 3.1 Button Component
**Reference**: `src/components/Button/Button.tsx`

#### Primary Button
- **Size**: Min 88x88 dp (recommended), 64x64 dp (minimum)
- **Style**: Round corners 24px, gradient fill, icon + text
- **Gradient**: `linear-gradient(135deg, #FF9800, #F57C00)`
- **Shadow**: `0 8px 20px rgba(255, 152, 0, 0.4)`
- **States**:
  - Default: Orange gradient
  - Hover: Scale 1.05 (framer-motion `whileHover`)
  - Tap: Scale 0.95 (framer-motion `whileTap`)
  - Disabled: 50% opacity, not-allowed cursor

#### Secondary Button
- **Size**: Min 64x64 dp, 48x48 dp (minimum)
- **Style**: Round corners 16px, outline + transparent background
- **Background**: `linear-gradient(135deg, #E3F2FD, #BBDEFB)`
- **Border**: 3px solid #2196F3
- **States**: Same as primary

#### Icon Button
- **Size**: 56x56 dp
- **Style**: Circular, pure icon
- **Background**: `linear-gradient(135deg, #FFFFFF, #FFF8E1)`
- **Shadow**: `0 6px 12px rgba(0, 0, 0, 0.12)`

### 3.2 Card Component
**Reference**: `src/components/Card/Card.tsx`

#### Base Card
- **Background**: White (#FFFFFF)
- **Radius**: 16px (`var(--radius-md)`)
- **Padding**: 24px (`var(--spacing-lg)`)
- **Shadow**: `var(--shadow-md)` (elevated: `var(--shadow-lg)`)
- **Interaction** (if clickable):
  - Hover: Scale 1.02, shadow increases
  - Tap: Scale 0.98

#### Category Card (GameCard)
**Reference**: `src/components/GameNavigation/GameCard.tsx`
- **Size**: Min 120x120 dp
- **Background**: Category-specific gradient (see 1.3)
- **Layout**: Icon (top) + Title (bottom)
- **Progress**: Overlay indicator (top-right corner)
- **Touch Target**: Large, child-friendly

### 3.3 Modal/Dialog Component
**Reference**: `src/components/Modal/Modal.tsx`

- **Width**: 80% screen width
- **Radius**: 24px
- **Animation**: Scale in from center (200ms ease-out-back)
- **Backdrop**: Semi-transparent dark overlay (rgba(0,0,0,0.5))
- **Close Button**: Large, obvious, top-right
- **Auto-close**: Reward modals auto-close after 2-3s

### 3.4 Feedback Components

#### Success Feedback
**Reference**: `src/components/RewardToast.jsx`
- **Visual**: Green gradient + star explosion animation
- **Animation**: Scale up + particle effects
- **Duration**: 1.8s auto-dismiss
- **Sound**: "Ding" rising tone (500ms)

#### Error Feedback
**Reference**: `src/components/ChoiceTask.jsx`
- **Visual**: Gentle shake (2x, ≤10° rotation)
- **Message**: Warm, encouraging text
- **Color**: Slightly darker, no red flashing
- **Guidance**: Show retry option

#### Loading State
- **Animation**: Bouncing dots or spinner
- **Text**: "加载中…" (Loading...)
- **Fallback**: Skeleton screens for content

### 3.5 Input Components

#### Child Input
- **Size**: Large (min 64px height)
- **Radius**: 16px
- **Style**: Icon prefix, large text (20px+)
- **Focus**: Blue border highlight

#### Parent Input
- **Size**: Standard (48px height)
- **Style**: Professional, clean
- **Validation**: Clear error messages

---

## 4. Layout Principles

### 4.1 Spacing Scale (8px Base)
All spacing uses 8px multiples: 4, 8, 16, 24, 32, 48, 64

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
--spacing-3xl: 64px
```

### 4.2 Grid System
- **Game Grid**: 4-column layout (desktop)
  - Tablet: 3 columns
  - Mobile: 2 columns
- **Content**: Single column, max-width 600px
- **Screen Margins**: 16-24px padding

### 4.3 Layout Philosophy
- **Generous Whitespace**: Children need breathing room
- **Clear Hierarchy**: Important elements 30% larger
- **Progressive Disclosure**: Batch information, avoid overload
- **Center-aligned**: Content centered, width ≤ 600px (tablet friendly)

### 4.4 Page Layouts

#### Home Page (Dashboard)
```
┌─────────────────────────┐
│   Hero Section (20%)    │
│   Title + Subtitle      │
├─────────────────────────┤
│   Stats Bar (15%)       │
│   Stars, Level, Streak  │
├─────────────────────────┤
│   Quick Actions (10%)   │
│   Check-in, Bonus       │
├─────────────────────────┤
│   Game Grid (45%)       │
│   4-column cards        │
├─────────────────────────┤
│   Bottom Nav (10%)      │
│   3-4 icon buttons      │
└─────────────────────────┘
```

#### Game Page
```
┌─────────────────────────┐
│  Top: Progress + Pause  │
├─────────────────────────┤
│                         │
│   Core Game Area (70%)  │
│   Large content display │
│                         │
├─────────────────────────┤
│  Bottom: Action Buttons │
└─────────────────────────┘
```

---

## 5. Depth & Elevation

### 5.1 Shadow System
**Reference**: `src/styles/tokens.css`

| Level | Name | Shadow | Usage |
|-------|------|--------|-------|
| **0** | None | No shadow | Background |
| **1** | sm | `0 1px 2px rgba(0,0,0,0.05)` | Cards at rest |
| **2** | md | `0 4px 6px -1px rgba(0,0,0,0.1)` | Elevated cards, stat bars |
| **3** | lg | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, dropdowns |
| **4** | xl | `0 20px 25px -5px rgba(0,0,0,0.1)` | Toasts, popovers |

### 5.2 Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Background | 0 | Page background, decorative elements |
| Content | 1 | Main content, cards, buttons |
| Sticky | 10 | Fixed headers, nav bars |
| Modal | 100 | Dialog overlays |
| Toast | 200 | Notification toasts |

### 5.3 Surface Hierarchy
1. **Background**: Warm cloud (#FFF8E1)
2. **Surface**: White (#FFFFFF) cards
3. **Elevated**: Cards with shadows
4. **Overlay**: Modal backdrops
5. **Floating**: Toasts, tooltips

---

## 6. Interaction Patterns

### 6.1 Primary Interactions

| Interaction | Usage | Feedback | Tolerance |
|-------------|-------|----------|-----------|
| **Click/Tap** | Primary action | Immediate (< 200ms) | N/A |
| **Hover** | Desktop only | Scale 1.05, shadow increase | N/A |
| **Drag & Drop** | Matching games | Snap-to-grid | ±20dp |
| **Swipe** | Navigation | Slide transition | Horizontal/Vertical |
| **Long Press** | Context menus | Visual progress bar | Max 1s |

**Forbidden for 3-6 years**: Two-finger/multi-touch gestures

### 6.2 Feedback Patterns

#### Success Feedback
1. Scale up animation (1.05x)
2. Green flash overlay
3. Star particle explosion
4. "Ding" sound (rising tone, 500ms)
5. Character celebration (jump + happy face)

#### Error Feedback
1. Gentle shake (2x, ≤10° rotation)
2. Warm message: "没关系，我们再来一次！"
3. Color slightly darker (no red)
4. Character encouragement (head shake + smile)
5. **NEVER**: Red flash, vibration, negative sounds

#### Loading State
1. Bouncing dots animation
2. Skeleton screens for content
3. Text: "加载中…"
4. Max wait time: 2s (show fallback after)

#### Empty State
1. Friendly illustration
2. Encouraging text
3. Clear action button
4. Character guidance

### 6.3 Navigation Patterns

| Transition | Direction | Duration | Easing |
|-----------|-----------|----------|--------|
| Forward | Slide in from right | 300ms | ease-in-out |
| Back | Slide out to right | 300ms | ease-in-out |
| Modal | Scale in from center | 200ms | ease-out-back |
| Tab Switch | Fade | 200ms | ease-in-out |
| Toast | Slide down from top | 200ms | ease-out |

### 6.4 Interaction Flow Design
- **Steps**: Core tasks ≤ 3 steps
- **Flow Example**:
  ```
  1. Prompt (character speaks + voice)
  2. Action (click/drag)
  3. Feedback (result + reward)
  ```
- **Undo**: All actions reversible (last step)
- **Buffer**: 500ms buffer for accidental taps
- **Retries**: 3 attempts before guidance

---

## 7. Animation System

### 7.1 Animation Principles
- **Semantic**: Every animation has meaning, not just for motion
- **Lightweight**: Duration ≤ 600ms, avoid complex animations
- **Consistent**: Same interaction = same animation
- **Joyful**: Elastic, bounce, surprise elements

### 7.2 Timing Scale
**Reference**: `src/styles/tokens.css`

| Type | Duration | Usage | Easing |
|------|----------|-------|--------|
| Fast | 150ms | Micro-interactions | ease-out |
| Normal | 200ms | State changes | ease-out |
| Slow | 300ms | Page transitions | ease-in-out |
| Emphasis | 400ms | Rewards, celebrations | ease-out-back |

### 7.3 Easing Functions

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275)
--ease-out-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### 7.4 Animation Library

#### Entrance Animations
- **Bounce In**: Scale 0→1 + slight bounce (buttons, cards)
  - Framer Motion: `initial={{ scale: 0 }} animate={{ scale: 1 }}`
- **Slide In**: From screen edge (sidebars, notifications)
  - Framer Motion: `initial={{ x: -100 }} animate={{ x: 0 }}`
- **Fade In**: Opacity 0→1 (backgrounds, gradients)
  - Framer Motion: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- **Scale In**: From center (modals, rewards)
  - Framer Motion: `initial={{ scale: 0.8 }} animate={{ scale: 1 }}`

#### Feedback Animations
- **Success**: 
  - Star explosion: Particles fly outward from center
  - Bounce celebration: Element bounces 2-3 times
  - Color shift: Green gradient + glow
- **Error**:
  - Gentle shake: Left-right 1-2 times (≤10° rotation)
  - Soft retreat: Back to original position + slightly darker
  - Character encouragement: Head shake + "it's okay" expression

#### Reward Animations
- **Treasure Open**: Shake → lid flies → gold rays → reward appears
- **Sticker Collect**: Sticker flies into album + "pop" sound
- **Level Up**: Character grows + halo + upgrade glow
- **Achievement Unlock**: Badge rises from bottom + rotates + locks

#### Character Animations
- **Idle**: Gentle breathing (up-down 2-3px) + blink
- **Speaking**: Mouth open/close + body slight movement
- **Happy**: Jump + spin + star eyes
- **Thinking**: Hand on chin + question mark circle

### 7.5 Performance Rules
- **Use CSS transform/opacity only**: Avoid reflow/repaint
- **Hardware acceleration**: `will-change: transform`
- **Concurrent animations**: ≤ 3 at same time
- **Low-end devices**: Simplify complex animations
- **Reduced motion**: Respect `prefers-reduced-motion` media query

---

## 8. Do's and Don'ts

### 8.1 Design Guardrails

#### ✅ DO
- Use large touch targets (≥64x64dp)
- Provide immediate feedback for all interactions (< 200ms)
- Use icons + text together (dual coding)
- Keep screens simple (≤5 elements per screen)
- Use warm, encouraging language
- Test with colorblind simulators
- Support keyboard navigation
- Use positive reinforcement always
- Make errors forgiving and guided
- Animate with purpose, not decoration

#### ❌ DON'T
- Use red/green as sole indicators (colorblind accessibility)
- Show punitive error messages or negative feedback
- Overwhelm with information or cluttered layouts
- Use fast, jarring animations (> 600ms or rapid flashing)
- Require precise gestures (±20dp tolerance minimum)
- Use small text (<16px for children, <14px for parents)
- Auto-play sounds without user control
- Punish mistakes or create anxiety
- Use complex multi-finger gestures
- Ignore performance (maintain 60fps)

### 8.2 Accessibility Requirements
- **Colorblind Friendly**: Use shape + color双重标识
- **Low Vision**: Support 1.2x-1.5x font scaling
- **Motor Impairment**: Large touch targets, simple gestures
- **Hearing Impairment**: Subtitles for all audio, visual alternatives
- **Cognitive**: Simple language, consistent patterns, clear hierarchy

---

## 9. Responsive Behavior

### 9.1 Breakpoints

| Device | Width | Grid Columns | Touch Target | Font Scale |
|--------|-------|--------------|--------------|------------|
| Mobile | < 768px | 2 columns | ≥ 64px | 1.0x |
| Tablet | 768-1024px | 3 columns | ≥ 64px | 1.1x |
| Desktop | > 1024px | 4 columns | ≥ 64px | 1.2x |

### 9.2 Responsive Strategy
- **Mobile-First**: Design for mobile, enhance for larger screens
- **Grid Collapse**: 4 cols → 3 cols → 2 cols → 1 col
- **Touch Targets**: Always ≥ 48px, ideally 64px (all devices)
- **Font Scaling**: Support 1.2x-1.5x for accessibility
- **Safe Areas**: Respect notched devices (env(safe-area-inset-*))
- **Orientation**: Lock games to portrait mode

### 9.3 Implementation
```css
/* Mobile First */
.game-grid {
  grid-template-columns: repeat(2, 1fr);
}

/* Tablet */
@media (min-width: 768px) {
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .game-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 10. Data Flow & State Management

### 10.1 Architecture Overview

**State Management**: Zustand (lightweight, performant)

| Store | File | Purpose |
|-------|------|---------|
| **useUserStore** | `src/stores/useUserStore.ts` | Child profiles, preferences, settings |
| **useRewardStore** | `src/stores/useRewardStore.ts` | Stars, levels, badges, streaks |
| **useGameStore** | `src/stores/useGameStore.ts` | Current game, progress, rewards queue |

### 10.2 Data Flow Pattern

```
User Action → Store Update → UI Re-render → Analytics Track
```

**Example Flow**:
```typescript
// 1. User clicks button
<Button onClick={() => addStars(1)} />

// 2. Store updates
const addStars = useRewardStore((s) => s.addStars)

// 3. UI re-renders automatically
const stars = useRewardStore((s) => s.rewards.stars)

// 4. Analytics tracked
track('add_stars', { count: 1 })
```

### 10.3 Game Flow

```
Home → Game Select → Task 1 → Task 2 → Task 3 → Complete → Reward → Home
```

**Implementation**:
- Game selection: `gameRegistry` in `src/games/registry.ts`
- Task progression: `currentTaskIndex` state in game components
- Completion: `useGameCompletion` hook
- Reward display: `RewardToast` component

### 10.4 Reward System

| Reward Type | Trigger | Frequency | Storage |
|------------|---------|-----------|---------|
| **Stars** | Task completion | Immediate (1-3 per task) | useRewardStore |
| **Level Up** | Every 50 stars | Milestone | useRewardStore |
| **Streak** | Daily check-in | Daily | useRewardStore |
| **Badges** | Achievements | Milestone | useRewardStore |

### 10.5 Analytics Integration

**Function**: `track()` from `src/lib/analytics.ts`

| Event | When | Data |
|-------|------|------|
| `game_select` | User selects game | gameId, gameName |
| `game_start` | Game begins | gameId, taskCount |
| `task_complete` | Task finished | success, duration_ms, taskType |
| `check_in` | Daily check-in | date, streakDays |

**Privacy**: 
- No PII (Personally Identifiable Information)
- Local processing preferred
- Analytics opt-out available

---

## 11. Child Cognitive Adaptation

### 11.1 Visual Perception (3-6 years)
- **Graphics First**: Icons > text, large graphics > small graphics
- **Color Preference**: Warm tones > cool tones, high saturation > low saturation
- **Shape Preference**: Circles > squares > triangles, rounded > sharp
- **Motion Attraction**: Dynamic > static, slow motion > fast motion

### 11.2 Attention & Cognitive Load Management
- **Single Task Focus**: Only 1 core task per screen
- **Information Layering**: Clear visual hierarchy, important elements 30% larger
- **Progressive Disclosure**: Batch information, avoid overload
- **Break Reminders**: Auto-remind every 10-15 minutes (age-adjusted)

### 11.3 Memory & Learning Support
- **Multi-Sensory Encoding**: Visual (graphics) + Audio (voice) + Haptic (vibration)
- **Repetition & Reinforcement**: Key content repeats in different contexts
- **Connection & Association**: Visual connections between old and new knowledge
- **Contextual Learning**: Knowledge embedded in meaningful story/game scenarios

---

## 12. Agent Prompt Guide

### 12.1 Quick Color Reference

```markdown
## Primary Colors
- Primary button gradient: linear-gradient(135deg, #FF9800, #F57C00)
- Secondary button background: linear-gradient(135deg, #E3F2FD, #BBDEFB)
- Secondary button border: 3px solid #2196F3
- Success: #4CAF50
- Background: #FFF8E1
- Text primary: #3E2723
- Text secondary: #6D4C41

## Category Gradients
- Pinyin: linear-gradient(135deg, #FF9800, #FFB74D)
- Math: linear-gradient(135deg, #2196F3, #64B5F6)
- English: linear-gradient(135deg, #4CAF50, #81C784)
- Stories: linear-gradient(135deg, #9C27B0, #CE93D8)
```

### 12.2 Ready-to-Use Prompts

```markdown
## Component Creation
- "Create a child-friendly primary button with orange gradient, 88x88dp min size, 24px radius, using framer-motion for hover (scale 1.05) and tap (scale 0.95) animations"

- "Build a game card with category-specific gradient background, large icon, title, and progress indicator. Min size 120x120dp, responsive grid layout"

- "Design a reward modal that scales in from center (200ms ease-out-back), 80% screen width, 24px radius, with star explosion animation and auto-close after 1.8s"

## Layout & Styling
- "Create a responsive 4-column game grid using CSS Grid that collapses to 3 columns on tablet (768px) and 2 columns on mobile (<768px)"

- "Style a stats bar with three metrics (stars, level, streak) using flexbox, centered layout, with large emoji icons and child-friendly typography (20-24px, weight 700)"

## Animation
- "Add framer-motion entrance animation to component: initial y: -30, opacity: 0, animate to y: 0, opacity: 1, duration 0.6s"

- "Create celebration animation with star burst particles using framer-motion AnimatePresence, ease-out-elastic easing, 400ms duration"
```

### 12.3 Design Token Usage

```css
/* Always use design tokens, not hardcoded values */
✅ var(--color-primary-1)
✅ var(--spacing-lg)
✅ var(--radius-md)
✅ var(--shadow-md)

❌ #FF9800
❌ 24px
❌ 16px
```

### 12.4 Accessibility Checklist

When creating any component:
- [ ] Touch target ≥ 64x64dp
- [ ] Color contrast ≥ 4.5:1
- [ ] Icon + text (not text-only)
- [ ] Keyboard accessible (focus-visible styles)
- [ ] ARIA labels where needed
- [ ] Reduced motion support
- [ ] Error messages are encouraging

---

## 13. Performance & Quality Standards

### 13.1 Performance Metrics
- **First Screen Load**: ≤ 2s (3G network)
- **Interaction Response**: ≤ 200ms (click to feedback)
- **Animation Frame Rate**: ≥ 55 FPS (stable 60 FPS)
- **Bundle Size**: ≤ 100 MB (initial install)
- **Memory Usage**: ≤ 200 MB (peak)

### 13.2 Quality Standards
- **Crash Rate**: ≤ 0.1%
- **ANR Rate**: ≤ 0.05%
- **Compatibility**: Cover 90% mainstream devices
- **Test Coverage**: Core features automated tests ≥ 80%

---

## 14. Design Delivery & Acceptance

### 14.1 Design Deliverables
- [x] Design system document (this document)
- [ ] UI Kit (Figma/Sketch)
- [ ] Animation prototypes (Principle/Lottie)
- [ ] Sound effect library
- [ ] Icon/illustration resources
- [ ] High-fidelity prototypes

### 14.2 Acceptance Checklist
- [ ] Touch target size check (≥64x64dp)
- [ ] Color contrast check (≥4.5:1)
- [ ] Animation duration check (≤600ms)
- [ ] Text length check (≤6 chars for children)
- [ ] Colorblind friendly check
- [ ] Response speed check (<200ms)
- [ ] Child usability testing (5-8 target users)
- [ ] Parent usability testing (3-5 target users)

---

**Core Design Mantra**:
> For children, good design is not design they can understand,
> but design they don't need to "understand" to use.

---

**Document Maintenance Record**:
- v3.0 (2026-04-19): Complete restructure following awesome-design-md format, added component specs, interaction patterns, data flow, agent prompts
- v2.0 (2026-04-19): Comprehensive upgrade with brand system, cognitive adaptation, animation library, sound system, accessibility
- v1.0 (Initial): Basic framework
