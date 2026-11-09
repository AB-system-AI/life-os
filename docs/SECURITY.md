# Security and privacy

## Current boundaries

No account, server, synchronization, telemetry, or remote records API is present. Application records are stored in browser localStorage and are not encrypted. Same-origin scripts can access them; browser profile access exposes them. Backups are unencrypted JSON. Avoid storing highly sensitive records or placing backups in shared folders until an explicit encryption design exists.

Zod validates local records and backup structure. Invalid local JSON/schema is left untouched and surfaced as a warning; the current UI does not yet provide raw recovery/download. Restore validates completely before replacing stored state. Destructive record deletion and clear-all require browser confirmation.

The stylesheet references Google Fonts, so page rendering may make a font request when online. It sends no application records but means the UI is not yet a strict no-network shell. Self-host fonts for that requirement.

## Remaining review

Review storage quota and storage failure UX, cross-tab writes, accessibility and focus behavior, import abuse/resource limits, export file exposure, production response headers, lockfile/dependency supply chain, and offline behavior before a release security claim.
