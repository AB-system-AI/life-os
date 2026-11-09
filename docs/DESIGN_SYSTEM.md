# Design system

## Current tokens

Global tokens live in `src/index.css`. The dark palette is charcoal with a lavender action accent, muted gray text, green completion, and amber focus. `[data-theme="light"]` swaps semantic surface and text tokens. The interface uses DM Sans for body text and Manrope for headings, with system fallbacks. The external font stylesheet is optional decoration; system fonts remain available offline.

## Interaction and layout

Reusable patterns in the first slice include sidebar navigation, top-level search, primary and secondary buttons, task and habit rows, status cards, and a modal task-entry form. Layout breakpoints adapt sidebar width and switch to bottom navigation on narrow screens. Buttons and inputs expose visible keyboard focus. Arabic toggles document direction and selected time labels retain left-to-right ordering.

## Scope gap

There is no independent design-system package, component library, full accessibility audit, or visual regression suite yet. Several icon glyphs and content cards are illustrative. Validate color contrast, screen reader behavior, Arabic typography, and touch targets before claiming accessibility conformance.
