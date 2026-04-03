---
title: 'Between Tradition and Modernity: Building a Full Stack App with Django and React'
description: 'A deep dive into bridging the gap between isolated APIs, enforcing type safety across the stack, and finding the value in building robust architecture for small user bases.'
date: '2026-03-16'
tags: ['web-development', 'software-architecture', 'react', 'django']
published: true
---

If I tell you I made a full-stack app with [React 19](https://react.dev/blog/2024/12/05/react-19) (+ [Compiler](https://react.dev/learn/react-compiler)), [Tanstack Router](https://tanstack.com/router/latest), [tailwindcss](https://tailwindcss.com/), [Base UI](https://base-ui.com/), and [pnpm](https://pnpm.io/), you would probably expect a [Hono backend](https://hono.dev/) or Tanstack Start [Server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions) with [Drizzle](https://orm.drizzle.team/), or at least some cutting-edge TS solution. Well, I've built a [Django](https://www.django-rest-framework.org/) backend, and it works pretty well!

## The Constraints vs. The Freedom

When starting a new project, you always face constraints. Your job as the person designing the software architecture is to find the most elegant way to build around them.

Here are the constraints I was handed:

- Django for the backend (to match the team's existing legacy projects).
- [Keycloak](https://www.keycloak.org/) for authentication.
- Dockerizing the entire stack for self-hosted deployment.

The freedom? I got to decide absolutely everything else.

If you’ve read my previous blog posts, you know I’ve fallen in love with the Tanstack ecosystem. I went with Tanstack Router, Query, Form, Table, and Pacer. Notice that I _didn't_ go with Tanstack Start. Given the actual goals of this app, I couldn't justify the SSR overhead, and I absolutely did not want to spend a single second fixing hydration issues (I still have nightmares about them).

For the UI, I finally got to use TailwindCSS and shadcn/ui at work, freeing myself from plain CSS and the horrors of `styled-components`. I really love the pattern of creating headless, reusable components:

```tsx
export function PageHeader({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn('grid auto-rows-min items-start gap-2', className)}
      data-slot="page-header"
      {...props}
    >
      {children}
    </header>
  )
}
```

_(Yes, it kind of looks like styled-components in a way. Maybe time is a flat circle?)_

A quick shoutout to two other bangers in the frontend stack:

- **[Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs):** After fighting with `react-i18next` (lack of type safety, fetching all keys client-side), I switched to Paraglide JS on [Tanstack's recommendation](https://tanstack.com/router/latest/docs/guide/internationalization-i18n#tanstack-router--paraglide-client-only). Zero downsides so far.
- **[Knip](https://knip.dev/):** Analyzes your codebase for unused files, exports, and dependencies. Even with the strictest ESLint/Prettier setup, you’ll have dead code. Knip is a godsend for cleanup.

---

## Bridging the Gap: The Auth Weirdness

Let's talk about the _weird_ authentication layer in the app, that I am not a big fan of.

The client authenticates with Keycloak. This means I need to check auth on the frontend (using `react-oidc-context` and `oidc-client-ts`, which have pretty bad documentation) and [store the auth context](https://tanstack.com/router/latest/docs/how-to/setup-authentication#2-configure-router).

I then pass the key to the backend during API calls, where Django verifies it using `jwt.decode` against the public key. It doesn't sound that bad, except that Django has its own pre-built auth system with user tables, and Keycloak isn't designed to store app-specific user metadata. So, I had to build a weird, performant sync layer between the two (e.g., if a Keycloak email changes, reflecting it locally in the Postgres DB). It’s clunky, but it works.

## Type Safety is still possible

I love type safety. Coming from TypeScript, and having played with C and Dart in school, dynamic typing gives me hives.

Out of the box, Python can feel a bit like the Wild West compared to a strict TypeScript setup. With standard dependencies often living in a simple `.txt` file and optional linting, it gives you a lot of freedom. But that freedom means you have to actively put in the work to enforce a strong Developer Experience, otherwise code quality can slip quickly.

However, having a Python backend and a TypeScript frontend doesn't mean you have to sacrifice end-to-end type safety. Here is how I forced the two to play nice:

- Django properly defines the models with strict types and comments.
- Backend views have full documentation on response types using those models.
- [drf-spectacular](https://drf-spectacular.readthedocs.io/en/latest/) generates the OpenAPI specs.
- [Orval](https://orval.dev/) generates TS types and query hooks from those specs.
- The frontend consumes the [Tanstack Query Hooks](https://tanstack.com/query/latest) to fetch data.

And just like that... End-to-end type safety. You know exactly what the endpoint needs, and exactly what it's going to return. When you make a change in a model, you get the feedback all the way to your frontend component.

---

## DX: Making the Containers Bearable

After the users, my top priority is the developers (and code quality). Because of the strict constraints, I got to tear my hair out properly learning Docker. Setting up multiple services, ensuring they communicate, and managing deployment across two environments in a server full of existing apps was a massive headache.

But once it works, Docker is magic. Starting the project takes one command. You get fully reproducible environments between local dev and production. So now you can use the "But it works on my machine" excuse more confidently.

I also spent some time creating [Make commands](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html). These Docker commands are quite long and spending 5 minutes going up in the terminal history trying to find the specific command to run the tests can be quite annoying. So I wrote a `Makefile`. Now, a simple `make codegen` spins up the OpenAPI specs and frontend types:

```makefile
COMPOSE_FILE := docker-compose.dev.yml
ENV_FILE     := .env.local
COMPOSE      := docker compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE)

.PHONY: codegen
codegen: schema types ## Generate both Schema and Types

.PHONY: schema
schema: ## Generate Open API schema from Backend
    $(COMPOSE) exec backend python manage.py spectacular --file openapi.yml --validate

.PHONY: types
types: ## Generate TypeScript types from Open API schema
    $(COMPOSE) exec frontend pnpm run generate-types
```

I also built a strong CI pipeline. It handles backend linting and formatting, 800+ Django tests, migration checks, OpenAPI schema validation, Frontend Schema Types validation, frontend type checking, frontend build, and finally Playwright tests.

It sounds heavy, but it only takes ~7 minutes if _all_ steps run, thanks to aggressive caching, sharding, and parallel jobs. If I only touch backend code, the pipeline finishes in 2 minutes. Stop the pipeline early, run only what changed. It’s worth the initial setup time.

---

## Boring isn't bad

Django is not the most exciting tech, but it’s great for a CRUD app exposing APIs to Postgres. Yes, I still have to handle some complexity: RBAC, Redis caching, querying a Clickhouse DB with raw SQL, and WebSockets for live notifications, but I’m not building a crazy app for millions of users.

Django is simple, predictable, and LLMs understand it perfectly. Need a cache layer? Two lines of code. It’s fast enough that running 800+ tests (including DB writes) takes 10 seconds.
I still have some issues with it, like if there is an internal server error, an endpoint will return some html by default. So you need a custom middleware to formalize all kinds of errors. And of course, it has to be in Python. But overall: it just works.

---

## The Silo Problem: Designing APIs in a Vacuum

Now, for a bit of a reality check regarding backend development.

In theory, backend engineers handle incredibly important tasks: complex business logic, rock-solid security, scaling, and database optimizations. This should put to shame frontend engineers like me who spend 2 hours changing the color of a button.

But in my early years of corporate experience, my reality has been quite different. I have only encountered codebases where basic software engineering practices, like mandatory PR reviews, automated testing, or even basic linting, just weren't part of the culture. When teams don't put effort into those foundations, you quickly end up with messy codebases, weak RBAC, major security oversights, and poor performance. More importantly, I’ve encountered the "Silo Problem."

Here’s a story from a past job. We were building an AI Chat app. I was the solo frontend dev, working with a UI/UX designer, a handful of backend devs, and some AI engineers.

The backend team held their planning meetings without bringing in the frontend or the UI designer. Because of that disconnect, the database relations and endpoints were designed without the actual client application in mind. The result made zero sense for the UI: they added data models for UI themes using variables that completely clashed with the design system, and created endpoints structured in a way that required six separate workarounds on the client just to render a basic view. I ended up rewriting the frontend logic three separate times to keep up with OpenAPI specs that were handed down after the fact (which, naturally, rarely matched the live responses). It was an incredibly frustrating but valuable lesson in why API design has to be collaborative.

If you are a backend developer adding a new endpoint, you aren't doing it for fun. You are doing it because the user interface needs that data. Designing APIs without consulting the client-side needs is like building a steering wheel without checking what kind of car it's going into.

Thankfully, on my current project, I am the frontend, backend, and DevOps engineer. Everything communicates nicely, because I actually talk to myself.

## The Corporate Reality

I started this new grad job in mid-2025 at a small non-tech company. I turned down a crazy offer at a massive corporation specifically because I wanted the freedom to build good products and care about software architecture, things that weren't possible there.

And I did get that freedom. I spent hours refining small details, optimizing DX, and over-engineering the type safety.

But as the months go by, a weird realization has set in:

1. This app will likely never have more than 8 concurrent users.
2. Looking at the history of internal projects over the years, business priorities pivot fast, and apps are often abandoned or replaced after a year or two.
3. The business goal is to ship a solution, not to build a lasting technical marvel.

What’s the point of writing perfectly scalable code if it might just gather dust in 12 months? I’ve put so much effort into the craftsmanship of this app, but I'm learning that in the corporate world, you don't always get a 'good job' for a flawless architecture. You just get the next Jira ticket.

But in life, you make compromises. I’m getting paid to learn, I built an architecture I’m proud of, and at the end of the day, I get to log off and live in one of the [most beautiful places in the world](https://www.google.com/search?q=tromsø+aurora&tbm=isch).
