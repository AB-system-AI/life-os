# LIFE OS

**Your life. Your system. Your direction.**

LIFE OS is an offline-friendly personal dashboard. This repository currently contains the first web implementation slice: a responsive command center, task checklist, habit checklist, English/Arabic direction switching, dark/light themes, and browser-local persistence. It is an early foundation, not the complete multi-platform product described in the source prompt.

## Run locally

Requirements: Node.js 24+ and npm 11+.

```powershell
npm install
npm run dev
```

For a production web bundle, run `npm run build` and serve the generated `dist/` directory with a static web server. `npm run preview` previews that bundle locally. No account, API, or backend is required for the current features.

## Data and privacy

The current web slice stores tasks, habits, and the display name in the browser's `localStorage`, under `life-os-data-v1`. Language and theme preferences use separate `life-os-*` keys. Data stays in the current browser profile; it does not synchronize between browsers or devices. Clearing browser site data removes it. There is no backup/import/export flow yet. Do not treat this initial implementation as a secure vault for highly sensitive records.

## Implemented in this slice

- Command center responsive layout and mobile navigation.
- Add and complete tasks; remove tasks with the row menu.
- Complete/uncomplete the sample daily habits.
- Search across the visible task list.
- English and Arabic display labels with `dir=ltr`/`dir=rtl`.
- Dark/light theme preference.
- Local persistence for task/habit state, theme, and language.

Some dashboard cards (weekly focus, streak, upcoming review, and quote) are visual editorial content and not connected to tracked records. Other navigation items switch the active label but do not yet have module pages. The shell currently shows an example first-run profile and starter checklist; replace or clear that local data in the product setup work.

## Architecture and next steps

The first slice is a Vite + React + TypeScript single application. Domain types and UI live together in `src/App.tsx` pending extraction into shared packages. Browser persistence is deliberately separate from framework state but is not yet backed by IndexedDB/Dexie or schema migrations. `docs/` records the target architecture, current scope, security boundaries, verification results, and remaining release work.

Planned next work includes module routes and CRUD, an IndexedDB repository with migrations and backup/restore, real calculations and analytics, accessible onboarding, offline shell/PWA, and separate Tauri/Expo applications with platform storage adapters.
