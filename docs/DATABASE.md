# Data and persistence

## Current version 2 model

`src/domain.ts` defines Zod schemas and the persistence boundary. The app stores one JSON envelope at localStorage key `life-os-data-v1`:

```json
{
  "schemaVersion": 2,
  "name": "Your name",
  "tasks": [],
  "habits": [],
  "records": {
    "education": [], "career": [], "finance": [], "journal": [],
    "spiritual": [], "wellness": [], "goals": [], "projects": [], "calendar": []
  }
}
```

Task records have an ID, title, time, completion flag, tag, and optional due date/creation timestamp. Habits include completion dates. Generic module records have ID, title, notes, creation time, and update time. Generic records are an interim shape; they do not model module relationships or specialized fields.

Preferences use `life-os-language` and `life-os-theme`. The v1 `{ name, tasks, habits }` object migrates in place to version 2. Parsing/validation errors do not overwrite the original stored value. A malformed store currently displays an error and uses an in-memory empty model; export of corrupted raw bytes and guided recovery are not implemented.

## Backup

Export wraps the envelope with app name, backupVersion 1, and ISO export time. Restore limits files to 10 MB, parses JSON, validates wrapper version and every model field, and only then commits. Invalid files leave existing data unchanged. Export is unencrypted JSON; store it with care. There is no checksum/signature, encryption, merge, or version conversion beyond current supported format.

## Limitations and target

localStorage is browser-origin/profile scoped, synchronous, and not equivalent to a database; it has no cross-device sync, transaction isolation, encryption, or guaranteed capacity. Before expanding substantial data, move behind a repository interface to IndexedDB with migrations. Platform adapters can later use SQLite. Use integer minor currency units for financial amounts. See `IMPLEMENTATION_STATUS.md` for module gaps.
