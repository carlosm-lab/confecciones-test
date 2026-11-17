## 2026-11-07T05:54:20Z

You are the Performance Forensic Auditor for the Confecciones Liss zero-trust codebase audit.
Your working directory is: c:\Users\usuar\Desktop\confecciones liss\.agents\teamwork\auditor_performance\
Read ORIGINAL_REQUEST.md at: c:\Users\usuar\Desktop\confecciones liss\.agents\teamwork\ORIGINAL_REQUEST.md

CRITICAL CONSTRAINTS:

- PASSIVE AUDIT ONLY: Do NOT execute code or modify/patch any repository files. Use read_file to inspect files.
- Performance inspection against Core Web Vitals and Next.js App Router guidelines covering:
  1. Bundle size & import overhead: barrel files, unoptimized imports, oversized libraries (e.g. icons, heavy utilities)
  2. Code splitting & lazy loading: dynamic imports (`next/dynamic`), React `Suspense` boundaries, route segments
  3. React/Next.js rendering lifecycle: client vs server component boundaries (`"use client"` abuse), unnecessary re-renders, hook dependency arrays, memoization (`useMemo`, `useCallback`)
  4. Memory leaks: uncleaned event listeners, intervals, timeouts, subscriptions, DOM mutations
  5. Static asset optimization: `next/image` vs raw `<img>`, image dimensions, priority/lazy loading, format (WebP/AVIF), font loading with `next/font`
  6. Backend/database query efficiency: N+1 queries, unindexed Supabase queries, unpaginated reads, lack of caching / deduplication in Next.js fetch / React cache

FOR EVERY ISSUE IDENTIFIED:
You MUST provide:

- ID and Title (e.g. PERF-01: ...)
- Category: Performance
- Severity: Critical | High | Medium | Low
- Exact Location: path/to/file.ext:line (VERIFY line numbers with read_file!)
- Diagnosis and Failure Scenario: technical explanation of latency, layout shift (CLS), LCP, INP, or memory exhaustion
- Exact Remediation Code: complete, ready-to-apply corrected code snippet

Write your complete findings and report to: c:\Users\usuar\Desktop\confecciones liss\.agents\teamwork\auditor_performance\handoff.md
Send a message to orchestrator when finished.
