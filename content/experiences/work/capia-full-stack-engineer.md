---
companyId: capia
companyName: Capia AS
companyLogo: /company-logos/capia.webp
companyWebsite: https://capia.no/
isCurrentEmployer: true

title: Full Stack Engineer
startDate: '2025-08'
employmentType: Full-time
icon: code
skills:
  - TypeScript
  - React
  - TanStack
  - Tailwind CSS
  - Django
  - Docker
  - Nginx
  - UI/UX Design
  - Design System

order: 1
---

Full-stack engineer at a small Norwegian data analytics company, where I'm effectively the entire engineering function.

I've built two production apps from empty repo to deployed systems (a multi-tenant organization-data platform and a traffic dashboard), owning everything end to end: architecture, design, frontend, backend, infrastructure, CI/CD, and docs. I am also involved in consulting work and other collaborative projects.

I focus on:

- DX: type safety end to end (all-in on TanStack, frontend types generated from the backend OpenAPI schema, CI fails on drift), deliberate library choices, docs and one-command setup, ~1,500 tests with Playwright E2E and checks on every PR
- UI/UX: polished interfaces where every state is designed, refined through tight feedback loops with users
- Observability: OpenTelemetry across 8 repos into self-hosted SigNoz, so traces, errors, and usage back every claim, from the frontend API call down to the DB query
- Ownership: turning one-line briefs into systems ("build a chatbot" became a workspace-scoped analytics agent), and proposing solutions to silent problems nobody flagged: self-hosted runners, observability

<!-- more -->

I joined a small Norwegian data analytics company on the 4th of August 2025 as a full-stack engineer. The company builds analytical products for Norwegian industries. Everything is self-hosted with Docker behind a global nginx reverse proxy. Every project below involved the same shared plumbing: internal Docker networks, the proxy, and centralized environment configurations.

There is no engineering function around me that reviews code, sets standards, or enforces them. On CapREG and Traffic Dashboard I got tasks and ideas, not a spec, and made every technical and design choice from there.

##### CapREG

CapREG is a multi-tenant platform for exploring Norwegian organization data, using raw data from Brønnøysundregistrene plus accounting and employee enrichment in-house, stored in ClickHouse. It follows a common Client/Projects setup, with full RBAC. It was the first project I got after the client project calmed down; I started building it in October 2025.

The technical instruction I received were: build the backend with Django, the frontend with React, use Keycloak for authentication. I was given access to the two external ClickHouse sources with raw organization data. For the product itself, I got a drawing of the overview page and a Word document describing rough RBAC (client, project, access group) and the features needed. That's it. No requirements, no design system, no user research, no acceptance criteria.

So I made every technical, architectural, and design choice myself, organized my own work, and implemented it how I wanted. There is no one reviewing the architecture or enforcing standards. The quality of this codebase is a direct reflection of my will and nothing else.

###### Stack

- **Backend**: Django + DRF, drf-spectacular for the OpenAPI schema, Postgres for the app, Redis for caching, the external ClickHouse for organization data, Ruff + Pytest.
- **Frontend**: React 19 + Vite + TypeScript, TanStack Router (file-based, type-safe routes), TanStack Form/Table, Tailwind 4 + shadcn/ui, Paraglide for EN/NO translations, T3 Env for typed environment variables, Orval to generate the entire API client and React Query hooks from the backend schema.
- **Contract**: the OpenAPI schema is committed and generated from the code; the frontend's types are generated from the schema. CI fails if either is out of date. Backend and frontend can't silently drift.
- **Auth**: Keycloak JWT validation on the backend, redirect to the company's Keycloak on the frontend, separate clients per environment.
- **Deployment**: Docker, staging and production environments on the same server, containers on a shared Docker network behind the central reverse proxy.

Why: type safety end to end, one schema instead of hand-written API types and hand-pasted tokens, and boring, well-supported tools. I wanted CI to catch the failure modes instead of users. I also made the most of libraries rather than custom implementations.

###### What I built

About 1,090 commits in total, 929 non-merge, nearly all mine; 229 release tags so far.

- **Oct 2025** — the repo: environment management that fails the build when not configured, pnpm enforcement, TanStack Router setup, Docker/nginx, Keycloak login, i18n, theme and shadcn, header, overview skeleton.
- **Nov 2025** — frontend and backend talking; ClickHouse connection; the organizations endpoint with filtering, sorting, search, pagination; the data table, sidebar filters, CSV export. The core query design landed here: one SQL statement does the workspace scope + filters + full-text search + parent/contact inheritance + sorting + pagination + aggregate metadata (total, employees, ...).
- **Dec 2025 – Jan 2026** — organization profile (header, information, structure tree of parent/subunits, activity, charts and metrics), RBAC on the manage pages, workspace breadcrumbs, seed-data commands (DX), Redis cache, a 10x improvement of the organizations query, session persistence, frontend caching.
- **Feb – Jun 2026** — notifications inbox and preferences, saved views, the analysis pages (financial, municipalities, value creation, registrations and bankruptcies, per-organization charts), a second-generation organizations query (a pre-computed ClickHouse table, frontend prefetching, query timing and logging, auth performance work), certificates, help page, and repeated rounds of content/translation changes from my manager's feedback.
- **Jul – Sep 2026** — the AI chat (below) and historical snapshots.

###### The AI chat

My task was literally "build a chatbot". What I built is an analytics agent scoped to the user's current workspace:

- An async streaming agent loop (tool-calling, SSE in the TanStack AI chunk format) against a self-hosted OpenAI-compatible model.
- The system prompt is built per request from the user's actual workspace: tenant, register, access group, municipality codes, NACE business codes, snapshot date, and the years of history that exist. It teaches the model what the data means and what it doesn't.
- The toolset covers read-only SQL over the workspace-scoped relations and a multi-year variant, a column-semantics lookup, workspace headline figures, single-organization detail, organization search, value-creation series, and reference-code translation.
- Safety: the agent's SQL is validated before it runs, single statement only, SELECT/WITH only, no DDL/DML/connection keywords, a table allow-list limited to the scoped relations plus the model's own CTEs, reserved CTEs can't be shadowed, comments and string literals are stripped before scanning, LIMITs are clamped, results are truncated, and raw ClickHouse errors are rewritten so the model doesn't receive the full expanded query and hosts. The query is wrapped in the same scoped CTEs the UI uses, so it **physically cannot read outside the user's workspace**.
- Per-tenant feature flag, conversation persistence, reasoning display, tool-call UI, and Vega-Lite charts that the frontend themes.

It's the most technically interesting thing I've built here and it's working extremely well. I refined the context, prompt, and tools over and over, to make sure the outputs were as good as possible.

###### The practices I chose to make non-optional

- ~1,530 backend test functions across ~67 files at the time of writing.
- Ruff lint/format, ESLint/Prettier, Django system checks and migration checks, frontend build check.
- CI on every PR: backend lint + tests (with CTRF reports published to the PR) + Django checks, frontend lint, OpenAPI schema sync, generated-types sync, frontend build.
- CD: every push to main auto-deploys to staging with an automatically bumped semver tag; production deploys only on a published GitHub release. Every deploy backs up the database first, then does `docker compose up -d --wait` so health checks gate it.
- DX: a Makefile with tasks for setup, code generation, pre-commit checks, seeding and admin promotion; READMEs; and agent instructions in the repo. Generated API client. i18n discipline (no hardcoded strings). A frontend Playwright suite with ~15 specs for auth, RBAC and workspace flows.

###### Technical craft

**Design and UX**

- Feature-first layout: each route owns its page and a colocated components folder (overview table, filters, org profile sections, chat); shared UI primitives built on Base UI and reusable form fields live separately.
- One form system: TanStack Form is composed once into typed field components (input, select, combobox, switch, file upload, textarea, business codes, municipalities, registers, users) plus submit/cancel form components. Pages don't hand-roll forms; server errors get mapped back to fields centrally instead of a generic banner.
- Two table layers: a generic table for management pages and an infinite-scrolling table for the organizations list. Table state (pagination, sorting, search) lives in URL search params; column visibility and order persist per table to localStorage with try/catch around parsing.
- Filters are URL state, not component state: a filters hook reads and writes typed search params inside `useTransition`, resets pagination on change, and keeps the scroll position so the list doesn't jump. Multi-value filters are comma-separated strings with shared parse/format helpers; saved views and filter counts sit on top of that.
- The workspace is first-class in the URL (`/{tenantSlug}/{accessGroupSlug}/{registerSlug}/**`). Resolution is URL → zod-validated localStorage → first API result, with stale-storage detection when the tenant in the URL differs from the stored one, and permission-gated selectors.
- Loading/error/empty states are app-level rather than reinvented per page. Chat adds its own empty state, streaming/tool-call states and a context-usage widget.
- Dark/light/system theme through a small custom provider; components use semantic tokens rather than raw colors.
- Accessibility is decent but not systematic: over 200 `aria-*`/`role=` attributes, real buttons and labels, keyboard behavior from Base UI, copy buttons via `navigator.clipboard`.
- Fully responsive design: a `matchMedia`-based mobile hook drives the sidebar (a slide-over panel on mobile), hides hover tooltips on touch, and several tables/charts switch layout or axis density on small screens. A dev-only breakpoint indicator shows the active Tailwind breakpoint while building.

**Web standards and browser-native choices**

- The platform is the state store: URL search params, sessionStorage for the sign-in return path, localStorage (with zod parsing) for workspace preference, column prefs and chat reasoning effort. No Redux/Zustand for server or filter state.
- Native WebSocket for live notifications; each message triggers targeted query invalidation for suggestion and workspace data. Honest weaknesses: no reconnect/backoff/heartbeat, and the access token travels in the query string: if the socket drops, it stays down until the component remounts.
- `matchMedia` for the mobile hook; `ResizeObserver` + `MutationObserver` to redraw a canvas decoration; `navigator.clipboard`; `usehooks-ts` for debounce and resize where it earns its place.
- React 19 + React Compiler enabled globally, with TanStack Router preloading routes on intent. `useTransition` is used for filter/table navigation and dialog submissions, route guards fetch data before rendering instead of `useEffect` fetching, and compiler opt-outs are explicit where third-party patterns can't be analyzed.
- Chat streaming uses a fetch-based SSE transport (so POST + bearer auth work) instead of the browser `EventSource`, plus a custom localStorage persistence adapter and history hook. The Django side speaks the library's streaming chunk protocol over a streaming response, and tool execution runs in a worker thread because the ClickHouse client is synchronous.

**Caching and invalidation**

- **Client (TanStack Query).** Defaults in the global query client, no query retry (mutations retry once). Per-endpoint overrides are declared centrally in the Orval configuration rather than scattered in components.
- **Client invalidation.** Mutations invalidate by generated query key. Workspace switches invalidate through a predicate that clears everything under the tenant's API prefix. Notification preferences are written directly into the cache with `setQueryData` from the mutation response instead of refetching. There are no optimistic updates anywhere: I chose refetch-on-success over rollback complexity.
- **Server (Redis, with a real invalidation story).** The organization pages are cached through a custom decorator instead of Django's built-in page cache. Two things make it safe: (1) the workspace access check re-runs before the cache is consulted; (2) because cache keys are URL hashes that can't be enumerated on write, each tenant has a monotonically increasing "generation" counter folded into the key prefix. A write bumps the generation, which orphans every cached organization page for that tenant at once; old entries die by TTL.
- **Auth caches.** Keycloak's public key is cached, decoded JWT payloads are cached per token until expiry, and the User object is cached per request path.
- **Precomputed ClickHouse table.** A scheduled job rebuilds the current snapshot from the raw register + other sources tables. The API reads the precomputed table, so the heavy enrichment happens once a day instead of per request; this led to very good performance (~0.3s queries) even when reading 20 million rows with heavy filtering.
- **HTTP/browser.** The frontend nginx caches hashed assets, gzips text, sets security headers and a CSP that whitelists Keycloak, and proxies WebSockets.

**Library usage**

- Orval is leaned on hard: tags-split client, zod schemas, MSW mocks, per-operation query options, and a custom request client for the generated API layer.
- TanStack Form's composition API is used as intended; because it's wired once, every form gets the same fields and error rendering.
- Base UI was a deliberate choice over Radix (migrated in Jan 2026): accessibility behavior from the library, styling and composition ours.
- `react-oidc-context` handles Keycloak redirect/silent SSO; the refresh queue is ours on top.

**What's uncertain**

A few test users only to this day. I can see the risk that I optimized for the codebase I wanted rather than the product the company needed. I also can't prove the codebase is as good as I think it is: nobody reviewed it.

What I do know: I can take a domain I don't know, an empty repo, and a one-page brief, and end up with a deployed, tested, documented, type-safe system that I'm proud of: mostly alone. The project is stable, working, fast, and accurate.

##### Traffic Dashboard

The Traffic Dashboard is a dashboard for Norwegian traffic: flights data and cruise ships data combined into one view. It reads from four databases: a local Postgres (auth/users), an internal Postgres (flights + taxonomies), an internal MariaDB (cruise voyages and ships), and an internal ClickHouse (occupancy data).

Before me, a student had built a very rough dashboard with flights only in 2 weeks. My task was one sentence: "Build the traffic dashboard for flights and cruises" with rough product specs. No stack discussion, no design. I chose the stack, the architecture, the design and everything else myself, and then refined it based on feedback. To this day, 1 external user has used the application.

###### Stack

A full TypeScript Turborepo monorepo: pnpm workspaces + Turborepo; a web app (React 19, TanStack Router, Tailwind 4 + shadcn); a server app (Hono + oRPC, Drizzle ORM, Better-Auth); and shared packages.

I built it this way to remove the headaches I had with CapREG:

- **Backend/frontend contract** — oRPC gives end-to-end type safety between server and client, with no OpenAPI → codegen round trip to keep in sync.
- **Auth** — Better-Auth with the Keycloak OIDC plugin, cookie sessions, and a Keycloak group check. No hand-rolled JWT storage.
- **Python** — I didn't want another Django codebase. Python deeply lacks the safety and tooling I want for maintaining a clean codebase; one language end to end means one type checker.

###### What it does

Filters by destinations and origins, time range and months, transport mode, passenger counts, and stay duration. It shows KPIs, table with details, traffic trends, traffic distribution, top origins, and a routes map with tooltips. Cruise-specific work: filtering out cancelled and non-cruise vessels, stay duration, estimating a ship's capacity from its own historical maximum passengers, and occupancy rate.

###### The data plumbing that took real work

- Cross-database joins are impossible, so flights and cruises are fetched separately and merged in the API layer.
- Hand-maintained Drizzle schemas for the read-only external databases; the app is never allowed to write to them (enforced by the ORM config by construction).
- Keyset pagination per database: Postgres row-value comparison; MariaDB has no tuple comparison, so the keyset is expanded into OR/AND.
- Occupancy is pre-computed into a lookup table refreshed from ClickHouse + Postgres, so the dashboard doesn't hit the raw data on every request.

###### Technical craft

**Design and UX**

- One shared validation schema defines every filter and is reused by both the client-side route validation and every server procedure. That single decision keeps client and server in agreement and makes every filter state a shareable URL.
- All filter writes go through a small navigation helper that does functional search-param updates without resetting scroll. Server state is TanStack Query through oRPC query utils; everything ephemeral is local `useState`. There is no global store.
- Loading/error/empty: card skeletons, 50 skeleton table rows, 15 tree rows, shimmer overlays, a shared empty state per card, a global query-error toast with a retry action, and a WebGL-failure fallback on the map. Previous data is kept visible while new data loads on the 16 data queries.
- Responsive choices are explicit rather than fluid: fixed card heights on mobile, a viewport-locked grid at xl with escape hatches for short screens, sticky table columns for the numbers that matter, and minimum tap targets on coarse pointers.

**Web standards and browser-native choices**

- URL/History as the state machine, `IntersectionObserver` for infinite scroll, `ResizeObserver` for table filler height and tree sizing, `MutationObserver` + `matchMedia` + `getComputedStyle` to keep MapLibre's canvas style in sync with the CSS theme.

**Caching and freshness**

- **Server process cache.** A small in-memory LRU cache holds three computed things: the location tree keyed by date range + mode, a ship-capacity map, and data-coverage bounds.
- **Precomputed table.** A precomputed occupancy lookup table is built from two datasets plus the company mapping, averaged per airport/month/flight-type over the last 3 years with national fallbacks, then replaced in chunked inserts.
- **Query-layer caching in SQL.** Keyset pagination instead of COUNT, aggregates batched with the rows in `Promise.all`, `MAX()/AVG()` pushed into SQL, module-level lookup maps built once at import, and client memoization keyed on the full filter tuple.

**Library usage**

- `@orpc/tanstack-query` is used as designed (`queryOptions`, `infiniteOptions`, client + query client in router context).
- TanStack Table v9 API: the feature-based table setup and selector-based subscriptions so only the sorting/expanded state that changed re-renders.

I built the first meaningful version over about two and a half months (~168 commits, all mine, Jun–Sep 2026) and I've been refining it from feedback since.

##### Client project

This was consulting work for an external startup building a data analytics modeling tool: clients upload datasets, build models, and generate reports. It was already largely developed when I joined, having been built over several months prior.

Work came as heavily prescriptive tickets from the client. I never saw a product strategy or a technical plan for the system. The project lacked established software engineering practices, and work was largely restricted to executing narrow fixes.

I started in August 2025. My first weeks were literally the tickets I was given: rename "this" to "that", fix casing, fix a page name, update the logo. That set the pattern of the whole project: tickets priced in hours, with limited space to question whether the architectural foundation underneath was sound.

I made around 223 out of ~1,325 commits in the repo.

- **Main frontend ownership** — the biggest page in the product had grown into a single 1,635-line component. I split it into a container plus focused section components (151–535 lines each) so it was actually maintainable and could build upon it.
- **Feature work across the UI** — built new pages from scratch, wired forms and tables to a changing backend API, fixed state and pagination bugs, and added exports.
- **Auth and frontend infrastructure** — token refresh, user avatar, scoping by client, local development access and email handling.
- **Ops** — raised the nginx and Django upload body limits, fixed file serving in prod, fixed the logging package, cache invalidation.
- **Quality** — lint/format cleanup and a code-quality GitHub workflow (Aug 2025). In Sep 2025 I added the first E2E workflow in CI with a Playwright journey suite covering real user journeys. I also added CTRF test reporting, and then spent a long tail keeping the suite passing as the API and pages kept changing.
- **Backend/API when needed** — schema generation, settings, filtering and pagination on list endpoints, adapting forms to new API specs, and payload handling.
- **My last push (Sep 2026)** — server-side pagination. I added search/ordering/pagination across the main list endpoints and the pages that use them, and removed the frontend's oversized fetch limits (24 occurrences across 16 files) in favor of paginated queries. The frontend was making insane calls, and the backend gathering insane joins, which would time out a six-minute fetch request just to display 10 rows of 5 columns.

I formally audited the codebase and found significant architectural and security gaps, which I documented and escalated to the team. Beyond that, it was a complex legacy codebase with a ticket process that heavily rewarded one-to-five-line PRs over system architecture. The fixes that were authorized were often symptoms; the foundational code remained chaotic.

##### Self Hosted Runners

The company was hitting the GitHub Actions usage limits, and a large part of that was me: my CIs run lint, tests, schema/type checks and builds on every push and PR (CapREG, the client project, later Traffic Dashboard). Paying GitHub for minutes we could get from our own server didn't make sense, and the limits were starting to block work. So I set up self-hosted runners on a company server.

I deployed GitHub Actions self-hosted runners with Docker Compose: 12 containers of `myoung34/github-runner`, registered at the organization level so every repo in the org can use them. Then I switched my pipelines from `runs-on: ubuntu-latest` to `runs-on: self-hosted` and shared the setup with the team.

- A GitHub Actions workflow deploys over SSH with a runner-count input (default 12). It reads configuration from the server, scales the compose service to that many containers, and prints the result.
- Runners are ephemeral, auto-update is disabled, names get random suffixes, and container logs are capped.
- A cleanup script plus a daily scheduled workflow deletes _offline_ runner registrations. This one was learned the hard way: when a container dies hard, GitHub keeps the registration forever. Without cleanup the list grows until it hits GitHub's 10,000-runner limit and then no new runner can register. The script skips offline-but-busy runners so in-flight jobs are never cancelled.

##### Observability

In September 2026 I pitched the idea of implementing Observability at Capia as I saw that we had two painpoints that could be resolved with OTel:

1. The client project was falling apart, with slow queries and errors coming from all places, and it would only be reported to us with screenshot of the error toast saying "Server error". We had to look through the raw Docker logs to try to understand what was going on.
2. Management started giving away accesses to the different services we've been building, but we didn't knew if they actually used them, what they were using, if everything was working...

So I proposed the idea of OTel, and received great feedback that it could be very useful.

I spent a week setting up the OpenTelemetry SDK across the 8 repos of the company which all have a different tech stack, so trying to have the same implementation, and sending the same logs and traces to our collector.
I've setup a self hosted Signoz on the server to collect and view all data, and setup the MCP server so I can have my LLMs build dashboard and inspect logs.

Now we have traces going from the frontend API calls all the way to the individual DB calls, we have error alerts, analytics for users... We finally know what's going on at Capia.
