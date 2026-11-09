# Feature status

This is an incremental locally usable web application. Generic record CRUD does not mean domain-specific module completion. Detailed module-by-module behavior and limitations are tracked in `IMPLEMENTATION_STATUS.md`.

| Area | Status | Current scope |
| --- | --- | --- |
| Command center | PARTIAL | Live task/habit counts and progress; record count summaries; quick task/habit entry. No event or real weekly analytics. |
| Tasks | PARTIAL | Add, complete, confirm-delete, persist, and title search. No dates, edit/archive, recurrence, subtasks, or history. |
| Habits | PARTIAL | Add, toggle with dated completion, confirm-delete, persist. No schedules or history UI. |
| Education | PARTIAL | Generic categorized records and a tested weighted GPA helper. No academic relationship model, grades UI, or configurable institutional scale. |
| Career & skills | PARTIAL | Generic categorized records. No structured career workflows. |
| Finance | PARTIAL | Add typed income/expense records, integer minor-unit summaries, default EGP presentation. No accounts, budgets, debts, or savings-goal workflows. |
| Journal & notes | PARTIAL | Generic dated notes and global text search. No tags/favorites/rich editor. |
| Spiritual life | PARTIAL | Generic records only. No prayer/Quran/adhkar-specific tracking. |
| Wellness | PARTIAL | Generic records only. No structured measures or history. |
| Goals & vision | PARTIAL | Generic records and tested milestone percentage helper. No milestone workflow. |
| Projects | PARTIAL | Generic records only. No Kanban/task relations. |
| Calendar | PARTIAL | Generic records only. No calendar views or reminders. |
| Settings/data | PARTIAL | Language, direction, theme, display name, validated JSON backup/restore, confirmed clear-all. |
| Web persistence | PARTIAL | Versioned and validated browser localStorage; legacy migration and reload persistence. Not a cross-platform database. |
| PWA/offline | NOT IMPLEMENTED | No manifest/service worker/offline shell. |
| Windows/Android/iOS | NOT IMPLEMENTED | No platform packages or release builds. |
