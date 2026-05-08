# Architecture Decision Records (ADR)

This document tracks important architectural decisions made during the project lifecycle.
**CRITICAL RULE:** Whenever you (the AI agent) decide on a significant technical approach (e.g., state management structure, API integration pattern, routing changes), you MUST document it here.

## Template for new decisions:

### Format

**Date:** YYYY-MM-DD
**Decision:** [What was decided?]
**Context:** [Why was this decided? What problem does it solve?]
**Consequences:** [What are the trade-offs or things to keep in mind moving forward?]

---

## Logged Decisions

_ (Add new decisions below this line)_

**Date:** 2026-04-23
**Decision:** Patrón Server Actions con Zod y next-safe-action
**Context:** Se usa `next-safe-action` combinado con esquemas `Zod` estrictos ubicados en `src/schemas/` para validar toda la información que entra al sistema (Auth, Profiles, Products, Orders).
**Consequences:** Las mutaciones son Type-Safe de extremo a extremo y seguras. Los esquemas Zod también se pueden reutilizar en Client Components con `react-hook-form`.
