# LIFE OS product requirements

## Vision

A private, local-first personal system that brings daily planning and long-term life areas into one calm interface. Default locale is English; Arabic is supported with right-to-left document direction. The product should work without an account or cloud service.

## V1 target modules

Command center; tasks and calendar; habits and routine; education; career and skills; finance; journal and notes; spiritual life; wellness; goals and planning; projects and portfolio; settings, backup, search and data management.

## Current delivery scope

The current code implements the initial web command center, local task and habit checklists, task search, display direction/language preference, and theme preference. It does not satisfy the twelve-module V1 target. See `FEATURES.md` for implementation status and `ROADMAP.md` for sequence.

## Product principles

- Keep personal records local by default. Any future sync must be an explicit opt-in.
- Use platform-specific storage behind a small persistence interface.
- Treat habits as supportive tracking, not a score of personal worth.
- Make financial amounts decimal-safe and academic grading policy configurable before presenting these modules as complete.
- Never surface demo metrics as real user analytics.
