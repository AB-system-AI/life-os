# Architecture

## Current implementation

Vite 8 + React 19 + TypeScript 7 web app. `src/App.tsx` renders the responsive shell and first-pass module screens. `src/domain.ts` contains Zod models, migration, localStorage adapter functions, backup validation, and pure calculation/search helpers. `src/App.css` and `src/index.css` define component styling and semantic design tokens. Vitest covers domain logic and key UI flows.

## Persistence flow

Startup reads `life-os-data-v1`, migrates and validates it, then React state holds the validated envelope. Every user mutation is validated and synchronously persisted before state is updated. Failures show a banner; malformed source data is not silently rewritten. Backup restore validates its entire wrapper before calling the same save boundary.

## Module boundaries

Tasks and habits have structured records. Other modules currently share a generic record collection per module; their forms categorize entries but do not create domain-complete entities or relations. This limits dashboard integrations and should be replaced incrementally with module schemas and repository functions.

## Decisions and constraints

- Continue in the existing React shell and preserve its design rather than reinitialize the project.
- Use Zod at persistence/import boundaries. Use localStorage only for this modest current slice; it is not a complete database.
- No remote records API, accounts, telemetry, Supabase, or sync.
- Rust/Cargo is available, but native packaging is intentionally deferred. Android SDK was not detected and iOS builds need macOS/Xcode.
