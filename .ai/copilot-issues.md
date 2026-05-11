# Copilot review issues

This document tracks repeated audit/fix loops against the current repository state with a commercial children's game bar in mind.

## Loop 1 - Build blockers and onboarding continuity

### Findings

| ID | Severity | Area | File(s) | Problem | Status |
| --- | --- | --- | --- | --- | --- |
| L1-01 | Critical | Build | `src/lib/audio.ts` | Duplicate object keys in the pinyin speech map break the frontend build. | Fixed |
| L1-02 | Critical | Build | `src/games/common/PuzzleFramework.tsx`, `src/games/common/SchulteFramework.tsx`, `src/games/common/MatchFramework.tsx` | Shared framework files use invalid import paths, so common game frameworks cannot build reliably. | Fixed |
| L1-03 | Critical | Backend build | `server/routes/user.ts` | Child update flow allows `null` age from derived birth date and breaks TypeScript build. | Fixed |
| L1-04 | High | Onboarding/runtime | `src/pages/WeChatCallbackPage.tsx` | WeChat callback restores parent and children but does not restore the current child, which can leave home/dashboard in an inconsistent child context. | Fixed |
| L1-05 | Medium | Child UX | `src/pages/SetupChildPage.tsx` | Avatar preset list contains a broken replacement character, which makes the profile setup feel unfinished in a core onboarding step. | Fixed |

### Notes

- Loop 1 focuses on restoring build health and preventing broken first-session flows.
- Follow-up loops will focus on login/setup UX, backend validation, dashboard typing/error handling, and broader framework consistency.

## Loop 2 - Login flow correctness and session consistency

### Findings

| ID | Severity | Area | File(s) | Problem | Status |
| --- | --- | --- | --- | --- | --- |
| L2-01 | High | Login UX | `src/pages/LoginPage.tsx` | OTP input used `type="number"`, which ignores `maxLength`, allows browser steppers, and can mangle SMS codes. | Fixed |
| L2-02 | Medium | Login UX | `src/pages/LoginPage.tsx` | Countdown logic created unmanaged intervals per resend path, which is easy to desynchronize during retries/unmounts. | Fixed |
| L2-03 | High | Session consistency | `src/App.tsx`, `src/pages/LoginPage.tsx`, `src/pages/WeChatCallbackPage.tsx`, `src/pages/SetupChildPage.tsx` | Parent/child payload mapping was duplicated in several flows, which caused drift and made auth/session bugs more likely. | Fixed |
| L2-04 | Medium | Type safety | `src/pages/SetupChildPage.tsx` | Child creation used `any` payload mapping in a critical onboarding path, increasing the chance of malformed store state. | Fixed |

### Notes

- Loop 2 centralizes session mapping in `src/lib/sessionMappers.ts` so future auth/onboarding changes stay consistent.
- The login and setup flows now share the same parent/child normalization path instead of re-implementing it in each page.

## Loop 3 - Backend validation and parent dashboard reliability

### Findings

| ID | Severity | Area | File(s) | Problem | Status |
| --- | --- | --- | --- | --- | --- |
| L3-01 | High | Backend validation | `server/routes/rewards.ts` | Reward update requests accepted arbitrary payload fields, which risked malformed reward state and future persistence drift. | Fixed |
| L3-02 | Medium | Backend typing | `server/routes/progress.ts` | Child ownership checks used `any` in a security-sensitive path, weakening type safety around authorization logic. | Fixed |
| L3-03 | High | Parent dashboard data handling | `src/pages/ParentDashboard.tsx` | Dashboard parsing assumed valid JSON and generic labels, so malformed progress blobs or unknown subject keys degraded parent insight quality. | Fixed |
| L3-04 | Medium | Parent dashboard resilience | `src/pages/ParentDashboard.tsx` | Sync failures quietly collapsed into empty stats without parent-facing explanation. | Fixed |

### Notes

- Loop 3 hardens parent-facing analytics surfaces so data quality problems do not silently erode trust.
- The dashboard now keeps weak-point labels child-readable and surfaces cloud-sync failures explicitly.

## Loop 4 - Growth leaderboard and sharing conversion

### Findings

| ID | Severity | Area | File(s) | Problem | Status |
| --- | --- | --- | --- | --- | --- |
| L4-01 | High | Social growth | `src/pages/ParentDashboard.tsx`, `server/routes/leaderboard.ts`, `server/services/leaderboard.ts` | Initial leaderboard design was family-scoped on the client, which did not satisfy the growth-marketing goal of platform-wide competition. | Fixed |
| L4-02 | High | Privacy and consistency | `server/services/leaderboard.ts` | Global ranking needed a server-backed source of truth plus nickname masking for other families, otherwise the feature would be inconsistent and privacy-risky. | Fixed |
| L4-03 | Medium | Mobile share UX | `src/components/ParentZone/GrowthLeaderboardSharePanel.tsx` | Leaderboard rows used a rigid multi-column layout that is brittle in narrow mobile/WeChat viewports. | Fixed |
| L4-04 | Medium | Share reliability | `src/lib/socialGrowth.ts`, `src/components/ParentZone/GrowthLeaderboardSharePanel.tsx` | Share text/poster could show invalid audience totals during partial loads, and clipboard support depended entirely on `navigator.clipboard`. | Fixed |
| L4-05 | Medium | Regression coverage | `src/__tests__/socialGrowth.test.ts` | Ranking/share helpers had no automated tests, making future formula, poster, and copy regressions easy to miss. | Fixed |

### Notes

- The leaderboard is now global across all users and rendered from backend aggregation rather than client-side family snapshots.
- The share panel is optimized for WeChat-style flows: download poster first, then share/copy copywriting, with a clipboard fallback for older browsers.

## Loop 5 - Pending

To be filled after the fifth audit pass.
