---
companyId: capia
companyName: Capia AS
companyLogo: /company-logos/capia.webp
companyWebsite: https://capia.no/
isCurrentEmployer: true

title: Full Stack Engineer
startDate: '08.2025'
employmentType: Full-time
icon: code
skills:
  - TypeScript
  - React.js
  - Tailwind CSS
  - Tanstack
  - Django
  - Docker
  - NGINX
  - UI/UX Design
  - Design System

order: 1
---

I'm building a production grade web application from scratch: frontend, backend and infrastructure.

- Frontend with [React 19](https://react.dev/) + [Compiler](https://react.dev/learn/react-compiler), [Vite](https://vite.dev/), [TanStack Router](https://tanstack.com/router/latest)/[Query](https://tanstack.com/query/latest)/[Table](https://tanstack.com/table/latest)/[Pacer](https://tanstack.com/pacer/latest), [Tailwind](https://tailwindcss.com/), [Base UI](https://base-ui.com/), [shadcn/ui](https://ui.shadcn.com/) (and [coss ui](https://coss.com/ui/docs))
- Backend with [Django REST Framework](https://www.django-rest-framework.org/) with [Redis](https://redis.io/) for caching, [ClickHouse](https://clickhouse.com/) integration, and [PostgreSQL](https://www.postgresql.org/)
- Infrastructure with [Docker](https://www.docker.com/), deployed via [NGINX](https://nginx.org/) on [self-managed servers](https://www.hetzner.com/)
- I've set up full end-to-end type safety with [drf-spectacular](https://drf-spectacular.readthedocs.io/en/latest/) (OpenAPI schema generation) and [Orval-generated](https://orval.dev/) TanStack Query hooks
- Implemented [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control), admin tooling, and resource management
- Made the [CI](https://github.com/features/actions) covers linting, builds, schema generation, and automated testing (~700 backend tests, ~100 [Playwright](https://playwright.dev/) E2E tests) with caching and sharding
- Wrote full docs, DX tooling, DB seeding, and [Makefile commands](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html) so the whole project sets up in a few commands
