# Testing

## Automated suite

Run `npm run test` for Vitest in jsdom. Tests cover v1 migration, corrupt local-data preservation, schema validation, persistence across app remount, backup round trip and corrupt-backup rejection, weighted GPA math, integer-minor finance math, goal progress math, cross-module search, task create/complete, a generic module record create/delete flow, language/direction switch, and restore UI error behavior.

The current suite is useful foundation coverage, not full acceptance coverage. Habit completion history, every module form/validation, edit flows, calendar behavior, performance, offline shell, actual browser restart, browser file download, mobile breakpoints, full Arabic content quality, and data integrity under concurrent tabs remain unverified.

## Release checks

`npm run build` performs TypeScript project compilation and Vite production build. `npm run lint` runs Oxlint. Always report actual output; do not treat generic CRUD tests as proof of module completeness. See `IMPLEMENTATION_STATUS.md` for the current test count and module coverage.
