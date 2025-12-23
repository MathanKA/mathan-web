---
title: "Case Study #1 — Privacy-First Consent + DSAR Platform (Next.js)"
slug: "privacy-first-consent-dsar-platform"
date: "2025-12-14"
role: "Senior Front-end Engineer • Solo Founder"
company: "Quansentz / SealForge"
featured: true
modes: ["recruiter", "manager", "engineer"]
stack:
  - "Next.js (App Router)"
  - "TypeScript"
  - "PostgreSQL"
  - "Prisma"
  - "Redis / Queue (BullMQ or equivalent)"
  - "S3-compatible storage (exports)"
  - "Tailwind + shadcn/ui"
tags:
  - "frontend systems"
  - "privacy engineering"
  - "GDPR"
  - "DSAR"
  - "consent management"
  - "multi-tenant"
  - "audit logging"
summary_one_liner: "<<One sentence: what changed + why it matters>>"
impact:
  outcome: "<<Metric or concrete result (or proxy)>>"
  constraint: "GDPR/DPDP compliance + privacy-first design"
  scale: "<<Tenants/users/requests/day or complexity proxy>>"
---

# Privacy-First Consent + DSAR Platform (Next.js)

> **One-liner:** <<Repeat summary_one_liner here in human-friendly language.>>

## TL;DR (Mode-based summaries)
### Recruiter TL;DR
- Built a privacy-first consent + DSAR workflow end-to-end in Next.js.
- Delivered <<key capability>> with <<impact metric/proxy>>.
- Stack: Next.js + TS + Postgres + Redis/Queue + S3 exports.

### Hiring Manager TL;DR
- Shipped a compliance workflow with clear auditability, operational safety, and UX clarity.
- Balanced security/privacy constraints with speed-to-delivery through vertical slices.
- Managed tradeoffs: <<example tradeoff>> and de-risked with <<validation>>.

### Engineer TL;DR
- Implemented multi-tenant architecture + tamper-evident audit events + async export pipeline.
- Key design choices: <<auth model>>, <<data isolation>>, <<queue strategy>>, <<streaming export>>.
- Verified with: <<tests>>, <<perf checks>>, <<failure-mode handling>>.

---

# 1) Problem

## The user pain
- **Who**: <<DPOs / founders / compliance teams / SaaS teams>>
- **Pain**: <<Describe what breaks today: manual DSAR, fragmented consent records, audit gaps>>
- **Cost of pain**: <<time, legal risk, churn, engineering overhead>>

## What success looks like
- A user can: <<give consent / withdraw / view preferences>>
- A company can: respond to DSAR reliably, export data, and prove actions with audit trails
- Audit evidence is: consistent, queryable, and hard to tamper with

---

# 2) Constraints & Non-Negotiables

## Compliance & privacy constraints
- GDPR/DPDP expectations: lawful basis, minimal data exposure, traceable actions
- DSAR: identity verification, scoped data retrieval, export format, retention rules (policy-driven)

## Technical constraints
- Multi-tenant isolation (data + access)
- Performance budget: fast UX, avoid blocking exports on request thread
- Reliability: exports must survive retries/failures; resumable where possible
- Time constraint: shipped via vertical slices (MVP-first)

## Business constraints
- Solo founder: must optimize for build speed + maintainability
- Hosting cost awareness: avoid unnecessary infra complexity

---

# 3) Existing Alternatives (and why they weren’t enough)
- Manual processes (spreadsheets + email): slow, inconsistent, not auditable
- Big enterprise suites: expensive, heavy integration overhead
- Generic form tools: not end-to-end, weak auditability

---

# 4) Solution Overview

## What I built
- Consent collection + preference management UX
- DSAR intake + orchestration
- Async export worker producing downloadable exports
- Audit logging with tamper-evident structure

## What makes it “privacy-first”
- Data minimization defaults
- Tenant isolation
- Controlled exports + access policies
- Audit evidence as a first-class feature

---

# 5) Architecture (High level)

## System diagram (placeholder)
> Add an image here later (Mermaid or PNG).
- **Web app** (Next.js App Router)
- **DB** (Postgres + Prisma)
- **Queue** (Redis + worker)
- **Storage** (S3 export artifacts)
- **Email/notifications** (optional)

### Data flow (Consent)
1. <<User sees banner / preference center>>
2. <<Consent stored with versioning>>
3. <<Audit event logged>>
4. <<Downstream systems consume consent record>>

### Data flow (DSAR)
1. DSAR request created
2. Verification + scope defined
3. Worker generates export
4. Signed URL/download delivered
5. Audit trail recorded at each step

---

# 6) Key Product Decisions (what I chose and why)

## UX decisions
- Preference center structure: <<tabs / categories / clarity>>
- DSAR form design: ask only what’s needed; reduce friction but keep compliance

## Engineering decisions
- Multi-tenancy approach: <<row-level tenant_id, schema-per-tenant, etc.>>
- Audit logging model: <<hash-chained events, append-only discipline>>
- Export pipeline: async job + streaming output vs naive synchronous export

---

# 7) Implementation Details (Engineer candy)

## Data model highlights
- Consent record: <<fields, versioning, purpose>>
- DSAR request: <<status machine, requester identity info, scope>>
- AuditEvent: <<event type, actor, timestamp, hash chain>>
- Export artifact: <<job id, storage path, retention policy>>

## State machines (recommended)
- DSAR states: `CREATED → VERIFIED → IN_PROGRESS → READY → EXPIRED/REJECTED`
- Failure states: `FAILED_RETRYABLE`, `FAILED_FINAL`

## Worker & queue strategy
- Job payload design (minimal PII)
- Retry policy (exponential backoff, max attempts)
- Idempotency: same request shouldn’t create duplicate exports
- Observability: logs + job metrics

## Performance considerations
- Streaming exports to avoid memory spikes
- Pagination/chunking in DB reads
- Avoid N+1 queries in DSAR data fetch

## Security considerations
- Access control: who can request, approve, download
- Signed download URLs + expiry
- Audit for every sensitive action
- Secrets handling (never in client)

---

# 8) Tradeoffs (tell the truth; it reads senior)

## Tradeoff #1
- Option A: <<describe>>
- Option B: <<describe>>
- **Chosen**: <<…>>
- **Why**: <<…>>
- **Cost**: <<what it made harder>>
- **Mitigation**: <<how you reduced risk>>

## Tradeoff #2
(Repeat)

## What I deliberately didn’t build (yet)
- <<Fancy thing>> because it didn’t move MVP outcome
- <<Edge feature>> scheduled for later

---

# 9) Results / Impact (must be concrete)

## Outcomes (use any honest proxy if you can’t share numbers)
- Reduced manual steps from <<X>> to <<Y>>
- Improved response time from <<X>> to <<Y>>
- Reliability: export success rate <<%>> / retries <<%>>
- Performance: Lighthouse Mobile <<score>>, INP/LCP improvements <<numbers>>
- Qualitative: feedback from <<user persona>>

## Evidence links (placeholders)
- Demo URL: <<…>>
- GitHub repo (public/private note): <<…>>
- Screenshots / recordings: <<…>>

---

# 10) Testing & Quality

## What I tested
- Unit tests: <<core utils, validators>>
- Integration tests: <<DSAR flow>>
- Manual QA checklist: <<cross-browser, keyboard nav>>
- Accessibility: headings, focus states, reduced motion
- Performance sanity: Lighthouse baseline and after optimizations

## Failure modes I validated
- Worker crash mid-export → job retry safe
- Partial export file → cleanup + regenerate
- Unauthorized download attempt → blocked + audited

---

# 11) What I’d do next (Roadmap)
- Short-term: <<improvements>>
- Mid-term: <<integrations>>
- Long-term: <<product expansion>>

---

# 12) Lessons learned (keep it real)
- Lesson #1: <<…>>
- Lesson #2: <<…>>
- Lesson #3: <<…>>

---

# Appendix (optional but powerful)

## Glossary
- DSAR: Data Subject Access Request
- Consent record: <<definition>>
- Audit chain: <<definition>>

## Screenshots placeholders
- Hero image: <<…>>
- Consent UI: <<…>>
- DSAR dashboard: <<…>>
- Export download flow: <<…>>
