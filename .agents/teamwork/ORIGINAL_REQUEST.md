# Original User Request

## Initial Request — 2026-11-07T05:48:52Z

Perform an exhaustive, forensic, zero-trust audit of the entire Confecciones Liss web project across security, performance, accessibility, and code quality/architecture, delivering a structured audit report with prioritized remediations without executing or modifying code.

Integrity mode: benchmark
The team must NOT: give generic or theoretical recommendations without referencing the exact file path and line number, execute code or run modification scripts in the workspace, omit any of the four mandatory audit areas (Security, Performance, Accessibility, Code Quality/Architecture), or report findings without providing concrete ready-to-use remediation code snippets.

## Requirements

### R1. Full-Spectrum Zero-Trust Codebase Audit

Inspect the complete codebase—including configuration files, frontend and backend source code, database schemas, middlewares, API routes, build scripts, dependencies, and static assets—under a Zero Trust policy without executing code across four mandatory areas:

1. **Security**: Secrets/credential exposure in code/config/comments/bundle, authentication and session management (token storage, expiration, cookies), authorization/access control (IDOR, privilege escalation), input validation/injection risks (DB queries, dynamic eval, prototype pollution), client-side security (XSS, CSRF, DOM manipulation), HTTP headers/CORS/rate limiting, error handling/info leakage (stack traces, raw DB errors), and dependency/supply chain vulnerabilities.
2. **Performance**: Bundle size and import overhead, code splitting/lazy loading, React/Next.js rendering lifecycle and re-renders, memory leaks (uncleaned event listeners/timers), static asset optimization (image dimensions, formats, font loading), and backend/database query efficiency (N+1 queries, unindexed searches, unpaginated reads).
3. **Accessibility**: Semantic HTML element hierarchy (`h1`–`h6`, landmarks), keyboard navigation and focus management (focus traps, visible focus styles), forms and screen reader support (explicit labels, ARIA announcements, accessible icon names, alt texts), and visual contrast / reduced motion adaptivity.
4. **Code Quality and Architecture**: Error handling (unhandled promise rejections, silent `try/catch`), concurrency/race conditions, strict typing vs untyped `any` or unsafe assertions, architectural boundaries and clean separation of concerns, dead/orphaned code, lingering debug logs (`console.log`), and technical SEO resilience (metadata, canonical tags, HTTP status handling).

### R2. Deliverable Format and Reporting Structure

Deliver a structured audit report—either written to a dedicated file in the project (such as `AUDIT_REPORT.md`) or delivered as the final output report—formatted strictly as follows:

1. **Audited Surface Map**: Key modules, directories, and inspected files, identifying any missing tooling, tests, or configurations.
2. **Executive Risk Summary**: Table detailing finding counts categorized by area (Security, Performance, Accessibility, Code/Architecture) across severity levels (Critical, High, Medium, Low).
3. **Detailed Findings Registry (Ordered from Critical to Low)**: Each issue must contain:
   - ID and Title
   - Category and Severity
   - Exact Location (`path/to/file.ext:line`)
   - Diagnosis and Failure Scenario (technical explanation of impact or exploitation)
   - Exact Remediation Code (ready-to-apply corrected snippet)
4. **Prioritized Action Plan**: Exact, non-breaking sequence for applying remediations to stabilize and harden the site.

### R3. Passive Auditor Execution Constraint

The team operates strictly as an auditor and must not execute code, run active penetration scripts, or apply modifications to the repository code.

## Verification Resources

Audit findings and recommendations must be validated against:

- OWASP Top 10 / ASVS (Application Security Verification Standard)
- WCAG 2.1 AA (Web Content Accessibility Guidelines)
- Core Web Vitals & Next.js App Router architectural guidelines
- Project architecture and design preservation rules in `AGENTS.md` and `.agents/AGENTS.md`

## Acceptance Criteria

### Audit Scope and Depth

- [ ] Every listed inspection dimension across all four categories (Security, Performance, Accessibility, Code Quality/Architecture) is explicitly examined.
- [ ] Every identified issue references an exact, verified file path and line number (`path/to/file.ext:line`).
- [ ] No generic advice or ungrounded assertions are present; each finding includes a concrete, ready-to-use code remediation snippet.

### Report Structure and Consistency

- [ ] The report contains the complete Audited Surface Map, Executive Risk Summary table, Detailed Findings Registry (ordered Critical to Low), and Prioritized Action Plan.
- [ ] The total counts and severities in the Executive Risk Summary table match the individual entries in the Detailed Findings Registry.
- [ ] The Prioritized Action Plan defines a safe order of fixes that preserves existing design and functionality.

### Non-Execution and Integrity

- [ ] No repository files are modified or patched during the audit run.
- [ ] No executable code or destructive testing commands are run against the project environment.

## Follow-up — 2026-11-07T06:31:46Z

porque mierda esta en ingles? lo quiero en español
