# Copilot instructions for this repository

Use the actual project structure in this repo, not the older placeholder assumptions.

## Build, test, and lint commands

### Frontend app (repo root)

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run test:coverage
npm run test:ui
npm run storybook
npm run build-storybook
```

Run a single unit test file or a single test case with Vitest:

```bash
npm run test -- src/__tests__/registry.test.ts
npx vitest run src/__tests__/registry.test.ts -t "resolves theme games"
```

Run E2E tests with Playwright:

```bash
npm run preview -- --port 4173
npm run test:e2e
npx playwright test tests/e2e/homepage.spec.js --project=chromium
```

Playwright does **not** start the app for you. The E2E specs hardcode `http://localhost:4173`, so start the frontend on that port first.

### Backend service (`server/`)

```bash
cd server
npm install
npm run dev
npm run build
```

There is currently no dedicated server test script in `server/package.json`.

## High-level architecture

- The repo is a Vite + React 18 SPA in `src/` plus a separate Express + TypeScript backend in `server/`. The frontend talks to the backend through `src/services/api.ts`, which manages bearer tokens and automatic refresh against `/api/auth/refresh`.
- `src/App.tsx` is the application shell: it restores auth on startup, enables dev-only trial mode, and builds most game routes from `gameRegistry`. That registry is populated by side-effect imports such as `./games/pinyin`, `./games/math`, and other subject modules.
- Each subject under `src/games/*/index.ts` registers its own hub and lesson/challenge pages with `registerGame(...)`. Home navigation, route order, recommended worlds, and the parent learning map all come from registry metadata like `themeId`, `isThemeHub`, age ranges, and `learningPath`.
- Persistent client state is split by concern. `useUserStore` holds parent/child session data, while `useGameStore` is the main gameplay source of truth for mission progress, rewards, achievements, and spaced-repetition knowledge. `useRewardStore` is a compatibility wrapper over `useGameStore`, so reward changes should usually go through `useGameStore` instead of creating new parallel state.
- Gameplay is local-first. `useGameStore.recordTaskResult(...)` updates local progress, rewards, and spaced-repetition data immediately, then best-effort syncs subject progress to `/api/progress/:childId/task`. The parent dashboard combines local catalog metadata with backend progress and reward APIs.
- The backend uses a database factory in `server/db/factory.ts` to choose SQLite by default or MongoDB when `DB_DRIVER=mongodb`. Child records returned from auth and user routes are normalized through `server/services/childSerializer.ts`, which applies `inferLearnerProfile(...)` so the frontend receives inferred age and recommended difficulty data, not just raw child rows.
- Global growth-ranking data lives on the server, not in client-side family aggregations. Use `/api/leaderboard` plus `server/services/leaderboard.ts` as the source of truth, and preserve nickname masking for children outside the current parent account.

## Key conventions

- Add new games by registering them in the subject `index.ts` file with `registerGame(...)`; do not hardcode new routes or home-page cards separately. The registry metadata drives routing, home recommendations, theme grouping, and parent dashboards.
- Keep game interactions local-first and fast. The project guidance from `.cursorrules` expects visible feedback within 200ms, bright child-friendly UI, and very shallow navigation. Do not make core game interactions wait on network round-trips.
- Age drives content selection across the stack. On the client, `getEffectiveChildAge(...)` and `syncKnowledgeWithAge(...)` decide recommended hubs and unlocked knowledge units. On the server, `inferLearnerProfile(...)` adjusts inferred age and recommended difficulty from birth date plus progress history.
- Preserve the existing persisted storage contract unless intentionally migrating it. Important keys already in use include `kids-game-user-storage`, `kids-game-state-v3`, `kids_game_access_token`, and `kids_game_refresh_token`.
- Prefer functional React components with Zustand for shared state. For UI work, keep using CSS variables/design tokens instead of hardcoded colors, keep touch targets at least 64px, and add a Storybook story for new reusable components.
- Parent-facing growth and sharing features should be mobile-first and WeChat-friendly. Prefer layouts that wrap cleanly on narrow screens, provide explicit copy/download fallbacks when `navigator.share` or `navigator.clipboard` is unavailable, and bias the UX toward “download poster + paste copy” for Moments sharing.
- When changing ranking or share-copy formulas, add or update Vitest coverage in `src/__tests__/socialGrowth.test.ts` so score ordering, audience-size handling, and SVG escaping stay stable.
