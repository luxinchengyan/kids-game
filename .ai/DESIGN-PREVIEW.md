# Design System Preview Catalog
# 童梦飞船 · 智趣成长 (DreamShip · Smart Growth)

This document serves as a visual reference for the design system. Use it to understand colors, typography, components, and spacing.

---

## 1. Color Palette

### 1.1 Primary Colors

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Sunshine Orange          Sky Blue              Grass Green │
│  #FF9800                  #2196F3               #4CAF50     │
│  ██████████               ██████████            ██████████  │
│  Main buttons             Secondary buttons     Success     │
│  Emphasis                 Links, info           Complete    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Strawberry Pink          Grape Purple                      │
│  #E91E63                  #9C27B0                           │
│  ██████████               ██████████                        │
│  Warnings (careful)       Rewards, special                  │
│  Important notes          Rare items                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Neutral Colors

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Warm Cloud               Warm Light            Deep Brown  │
│  #FFF8E1                  #FFECB3               #5D4037     │
│  ░░░░░░░░░░               ▒▒▒▒▒▒▒▒▒▒            ▓▓▓▓▓▓▓▓▓▓  │
│  Background               Dividers              Body text   │
│  Cards                    Secondary elements                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Night Black                                                │
│  #3E2723                                                    │
│  ████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                 │
│  Titles, important text                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Category Gradients

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Pinyin         Math          English       Stories         │
│  #FF9800        #2196F3       #4CAF50       #9C27B0         │
│  ▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓  │
│  → #FFB74D      → #64B5F6     → #81C784     → #CE93D8       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Typography Scale

### 2.1 Heading Hierarchy

```
H1 - Page Titles (48-64px, weight 900)
🌈 童梦飞船
========================================

H2 - Section Titles (28-32px, weight 800)
🎮 选择你的冒险之旅
========================================

H3 - Card Titles (22-24px, weight 700)
拼音冒险岛
========================================
```

### 2.2 Body Text

```
Child Body (20-24px, weight 700)
开启你的学习冒险之旅！✨
========================================

Parent Body (16-18px, weight 400)
查看孩子的学习报告和成长记录
========================================

Small Text (14-16px, weight 600)
星星  |  等级  |  连续天数
========================================
```

### 2.3 Font Families

- **Chinese**: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC'
- **English**: 'Comic Neue', 'Nunito', 'Quicksand'
- **Numbers**: Same as English (ensure b/d, p/q distinction)

---

## 3. Button Components

### 3.1 Primary Button

```
┌────────────────────────────┐
│                            │
│    🚀  开始冒险            │
│                            │
└────────────────────────────┘
  Orange gradient (#FF9800 → #F57C00)
  Min: 88x88px, Radius: 24px
  Shadow: 0 8px 20px rgba(255,152,0,0.4)
  
  States:
  - Hover: scale(1.05)
  - Tap: scale(0.95)
  - Disabled: opacity 0.5
```

### 3.2 Secondary Button

```
┌────────────────────────────┐
│                            │
│    ←  返回首页             │
│                            │
└────────────────────────────┘
  Blue outline (#2196F3)
  Background: #E3F2FD → #BBDEFB
  Min: 64x64px, Radius: 16px
  
  States: Same as primary
```

### 3.3 Icon Button

```
  ┌─────┐
  │  ⚙️  │
  └─────┘
  Circular, 56x56px
  Background: White → #FFF8E1
  Shadow: 0 6px 12px rgba(0,0,0,0.12)
```

---

## 4. Card Components

### 4.1 Base Card

```
┌─────────────────────────────────┐
│                                 │
│  Card Title                     │
│                                 │
│  Card content goes here         │
│  with multiple lines            │
│                                 │
└─────────────────────────────────┘
  Background: White (#FFFFFF)
  Radius: 16px
  Padding: 24px
  Shadow: var(--shadow-md)
  
  Interactive (if clickable):
  - Hover: scale(1.02)
  - Tap: scale(0.98)
```

### 4.2 Game Card (Category)

```
┌─────────────────────────────────┐
│  🎯                             │
│                                 │
│                                 │
│     拼音冒险岛                   │
│                                 │
│  ⭐⭐⭐  (progress)              │
└─────────────────────────────────┘
  Min: 120x120px (actual: 280px)
  Background: Category gradient
  Layout: Icon (top) + Title (center)
  
  Pinyin: Orange gradient
  Math: Blue gradient
  English: Green gradient
  Stories: Purple gradient
```

---

## 5. Spacing Scale

All spacing uses 8px base unit:

```
--spacing-xs:   4px   [····]
--spacing-sm:   8px   [········]
--spacing-md:  16px   [················]
--spacing-lg:  24px   [························]
--spacing-xl:  32px   [······························]
--spacing-2xl: 48px   [········································]
--spacing-3xl: 64px   [··············································]
```

### Usage Examples

```
Card padding:        var(--spacing-lg)     [24px]
Button gap:          var(--spacing-sm)     [8px]
Section margin:      var(--spacing-xl)     [32px]
Grid gap:            24px                  [3x spacing-sm]
Screen margin:       var(--spacing-md)     [16px]
```

---

## 6. Shadow System

### 6.1 Elevation Levels

```
Level 0 (None)
┌─────────────┐
│  Background │
└─────────────┘
No shadow

Level 1 (sm)
┌─────────────┐
│  Card       │  ← 0 1px 2px rgba(0,0,0,0.05)
└─────────────┘

Level 2 (md)
┌─────────────┐
│  Elevated   │  ← 0 4px 6px -1px rgba(0,0,0,0.1)
└─────────────┘

Level 3 (lg)
┌─────────────┐
│  Modal      │  ← 0 10px 15px -3px rgba(0,0,0,0.1)
└─────────────┘

Level 4 (xl)
┌─────────────┐
│  Toast      │  ← 0 20px 25px -5px rgba(0,0,0,0.1)
└─────────────┘
```

---

## 7. Z-Index Scale

```
Layer 200 ─────────────────────  Toasts, popovers
       │
Layer 100 ─────────────────────  Modals, dialogs
       │
Layer  10 ─────────────────────  Sticky headers, nav
       │
Layer   1 ─────────────────────  Main content, cards
       │
Layer   0 ─────────────────────  Background
```

---

## 8. Animation Timing

### 8.1 Duration Scale

```
Fast (150ms)       [░░░░░░░░░░░░░░░░░░]  Micro-interactions
Normal (200ms)     [░░░░░░░░░░░░░░░░░░░░░]  State changes
Slow (300ms)       [░░░░░░░░░░░░░░░░░░░░░░░░░░░]  Page transitions
Emphasis (400ms)   [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  Rewards
```

### 8.2 Easing Functions

```
ease-out:          Standard transitions
                   Starts fast, slows down

ease-in-out:       Page transitions
                   Slow start, fast middle, slow end

ease-out-back:     Entrance animations
                   Overshoots slightly, then settles

ease-out-elastic:  Reward celebrations
                   Bouncy, playful, elastic
```

---

## 9. Touch Targets

### 9.1 Minimum Sizes

```
Small:   48x48px  [████████████████]  Minimum for parents
Medium:  64x64px  [████████████████████████]  Standard for children
Large:   88x88px  [████████████████████████████████]  Key buttons
```

### 9.2 Examples

```
Button (small):   48px height  ✅
Button (medium):  56px height  ✅
Button (large):   64px height  ✅
GameCard:         280px height ✅
Quick Actions:    64px height  ✅
```

---

## 10. Responsive Breakpoints

```
Mobile:    < 768px    [████████████████████████████████]  2 columns
Tablet:    768-1024px [████████████████████████████████████████████████]  3 columns
Desktop:   > 1024px   [████████████████████████████████████████████████████████████████]  4 columns
```

### Grid Collapse Strategy

```
Desktop (4 cols):
┌────┐ ┌────┐ ┌────┐ ┌────┐
│ 1  │ │ 2  │ │ 3  │ │ 4  │
└────┘ └────┘ └────┘ └────┘

Tablet (3 cols):
┌────┐ ┌────┐ ┌────┐
│ 1  │ │ 2  │ │ 3  │
└────┘ └────┘ └────┘
         ┌────┐
         │ 4  │
         └────┘

Mobile (2 cols):
┌────┐ ┌────┐
│ 1  │ │ 2  │
└────┘ └────┘
┌────┐ ┌────┐
│ 3  │ │ 4  │
└────┘ └────┘
```

---

## 11. Layout Examples

### 11.1 Home Page Layout

```
┌─────────────────────────────────────┐
│                                     │
│        🌈 童梦飞船 (H1)             │  20%
│   开启你的学习冒险之旅！✨          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  👋 小朋友    ⭐50  Lv.5  🔥7       │  15%
│                                     │
├─────────────────────────────────────┤
│                                     │
│   [+1 ⭐]      [每日签到]           │  10%
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐      │
│  │拼音│ │数学│ │英语│ │故事│      │  45%
│  └────┘ └────┘ └────┘ └────┘      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   [🏠]  [📊]  [⚙️]                 │  10%
│                                     │
└─────────────────────────────────────┘
```

### 11.2 Game Page Layout

```
┌─────────────────────────────────────┐
│                                     │
│  [← 返回]  任务 1/3                 │  10%
│                                     │
├─────────────────────────────────────┤
│                                     │
│                                     │
│         Game Content                │
│         (Large display)             │  70%
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      [Answer A]  [Answer B]         │  20%
│                                     │
└─────────────────────────────────────┘
```

---

## 12. Component States

### 12.1 Button States

```
Default:
┌─────────────┐
│  Click me   │  Normal opacity, full shadow
└─────────────┘

Hover (desktop):
┌──────────────┐
│   Click me   │  scale(1.05), enhanced shadow
└──────────────┘

Tap/Active:
┌────────────┐
│  Click me  │   scale(0.95), deeper color
└────────────┘

Disabled:
┌─────────────┐
│  Click me   │  opacity(0.5), not-allowed cursor
└─────────────┘
```

### 12.2 Card States

```
Rest:
┌─────────────┐
│  Card       │  shadow-md
└─────────────┘

Hover (if clickable):
┌──────────────┐
│   Card       │  scale(1.02), shadow-xl
└──────────────┘

Tap:
┌────────────┐
│  Card      │   scale(0.98)
└────────────┘
```

---

## 13. Quick Reference Card

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  DESIGN SYSTEM QUICK REFERENCE                            ║
║                                                           ║
║  Primary Colors:                                          ║
║  Orange: #FF9800  Blue: #2196F3  Green: #4CAF50          ║
║                                                           ║
║  Touch Targets:                                           ║
║  Small: 48px  Medium: 64px  Large: 88px                  ║
║                                                           ║
║  Spacing: 4, 8, 16, 24, 32, 48, 64 (8px base)            ║
║                                                           ║
║  Animation: 150ms, 200ms, 300ms, 400ms                    ║
║                                                           ║
║  Breakpoints: 768px (mobile), 1024px (tablet)             ║
║                                                           ║
║  Font Sizes: 14-16 (small), 20-24 (child), 48-64 (H1)    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

## 14. Usage Examples

### 14.1 Creating a Primary Button

```tsx
import { Button } from './components/Button';

<Button
  variant="primary"
  size="large"
  onClick={handleClick}
>
  🚀 开始冒险
</Button>
```

**Result**: Orange gradient button, 64px min height, hover/tap animations

### 14.2 Creating a Game Card

```tsx
<GameCard
  game={{
    id: 'pinyin',
    name: '拼音冒险岛',
    icon: '🎯',
    category: 'pinyin'
  }}
  onClick={() => navigate('/pinyin')}
/>
```

**Result**: Orange gradient card, 280px height, icon + title layout

### 14.3 Using Design Tokens

```tsx
<div style={{
  padding: 'var(--spacing-lg)',        // 24px
  borderRadius: 'var(--radius-md)',    // 16px
  backgroundColor: 'var(--color-surface)',  // White
  boxShadow: 'var(--shadow-md)',       // Medium shadow
  fontSize: 'var(--font-size-xl)',     // 24px
}}>
  Content
</div>
```

---

## Summary

This preview catalog provides a visual reference for the entire design system. Use it to:

1. **Understand Colors**: See all primary, neutral, and semantic colors
2. **Learn Typography**: Understand heading hierarchy and font usage
3. **Build Components**: Reference button, card, and other component specs
4. **Apply Spacing**: Use the 8px-based spacing scale consistently
5. **Implement Animations**: Follow timing and easing guidelines
6. **Ensure Accessibility**: Meet touch target and contrast requirements

For detailed specifications, see [DESIGN.md](./DESIGN.md).  
For technical implementation, see [TECH.md](./TECH.md).

---

**Version**: v3.0  
**Last Updated**: 2026-04-19
