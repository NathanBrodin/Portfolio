---
companyId: dnb
companyName: DNB
companyLogo: /company-logos/dnb.webp
companyWebsite: https://dnb.no

title: Frontend Engineer Intern
startDate: '2025-02'
endDate: '2025-07'
employmentType: Internship
icon: code
skills:
  - TypeScript
  - React.js
  - CSS
  - Playwright
  - Redux

order: 2
---

Worked across multiple AI products used by 100k+ users. It was my end of studies internship, of 6 months, that counted toward my Master's degree (graded 92/100).

- Managed to push to production 15+ massive features across 3 frontend applications
- Migrated a production app from Gatsby to Vite, cutting build times by 60%
- Built a full E2E test suite with Playwright. With 350+ tests across browsers, and a CI that runs under 90s with caching and sharding
- Wrote technical docs and analysis reports, generally tried to make the DX better for the team

<!-- more -->

## End of Studies Internship

From February to July 2025, I completed my end of studies internship, once again, in the same team at DNB. My previous project was in production, with ~100 users active users and ~2000 potential users, just for an internal tool.

This time, I had to work across the two previous projects I created, and an existing project of the team.
This one was the "Chat Framework" (CUF), which is the base of all chatbots that I created the admin panel for. It does ~50k daily conversations. The frontend was quite disappointing, with a lot of mess, legacy libraries, no formatting/linting, lots of complexity, no consistency... it was built by external backend consultants, in a team with no engineering culture or software engineering practices.
The main issue to work with it was that it communicates with an external backend "Boost AI", which is what powers the chat solution. This was a blackbox of functionalities that we could not recreate. Like for example the chat can show a credit card select, but we don't have anything to make it display in the chat during development, and the testing team only could do it once deployed.

What I did:

### Code Migration

CUF was from 2018, still on React 15, deps not updated since, install failing, no valid docs, 30s+ startup with useless logs, TS/lint errors everywhere, one-line change reformatting whole files, inconsistent DEV/UAT/PROD configs and silent feature toggles. Components were the opposite of best practices: 500+ line files with 10+ `useEffect`s, dead code, unused branches, console.log spam.
An offshore consultant was migrating Gatsby to Vite and everything broke, with no tests or mocks to understand expected behavior (I discovered the chat could show image responses 3 months in because someone reported it broken). My first task was fixing bugs she couldn't fix, mostly by diffing HTML output old vs new to find the tiny detail breaking a feature.
It also included Eufemia 9.x to 10.x upgrade: removed legacy `// Workaround to fix Eufemia issue` hacks, manual QA loops (testers report, we fix, repeat – works but leaky for subtle regressions). One Tooltip bug wasn't ours at all, it was in Eufemia itself. I reported it, saw their backlog being full, so I fixed it myself and made a PR, which was published in days, the team really like that.

The migration shipped with zero functional change, so ironically my first contribution to reach production was invisible to users.

## CAP History

The new features added on top of my work I initially mentionned was having an history of the changes applied to the Chat Admin Panel. Like if someone updated a link, it should be preserved in the history.
The data used to come from AWS Parameter Store (full config + history in one response), then team moved to AWS AppConfig which has no history, so backend had to fetch each old version separately.
The proper fix belongs in backend, but I was available and reknowned to be fast so raw unprocessed data got pushed to frontend for me to figure out. I built clean scoped history (each CAP page shows only its fields' history), demoed, then got told to show all history on every page because backend assumed scoped restore was impossible with AppConfig structure, so I ripped out my elegant filtering for a generic downgrade. Then endless back-and-forth with backend + QA with no clear spec, implement → partial feedback → revise. Still ended well: pagination, better UI/UX, better than original, shipped to prod to ~10 internal users, stakeholders happy.

One month in I already had 2 features in prod, vs 0 in my previous 7 months.

## Why people don't care about users?

In Smartdocs, a small link-parsing function I wrote last year to make links clickable in an assistnant message broke when backend started sending Markdown (links already formatted). It was reported Dec 2 2024, I diagnosed + fixed + tested + committed in 3 minutes in March. Even a stranger to the codebase could have done it in minutes. So why did a user-visible bug sit for 3 months, while it was an actual issue reported by many?

## Dark mode

My first customer-facing feature (Aino lives in the mobile bank app, 1.5M users): business wanted dark mode in chat. So I pitched two options: quick per-component manual recolor (fast, messy, tech debt) vs proper dark mode inside Eufemia then delete our custom styling (clean, consistent, but wait on Eufemia team + lose control). After lots of same-content meetings with different people, business chose quick now, proper later (Eufemia planned to support dark mode before summer). I had it working within a week in March, but lauch was stuck for 2 months: backend theme API changes given to a new hire (normal he was slow, wrong task to rush on), and there was a backend perf crisis at that time so deploy freeze. Then all of the sudden they started intensive testing on Monday with planned deployment on Thursday in June, so I received ~10 edge bugs in 3 days that I had to fix fast (my fast reputation helped) and the issue with that I could not reproduce anything. Shipped June 5th.

Technical side, why it was tough: theme JSON naming makes not much sense (`secondary_background` with no `primary_background`, `secondary_text_in_chat`, etc.), there was lots of per-component overrides with `!important` for hover/active/disabled but forgetting focus or hover+active combos (light colors leaking in dark mode), mixing custom vars with hardcoded `var(--color-white)`, it was only for Aino so I had to make sure I was not breaking the 4 other bots, and ~30 hidden components only QA can trigger (that credit-card select again). Blindfold painting: QA finds broken component, I fix without seeing it, hope deploy looks right.

In Smartdocs a few weeks later, I ripped all custom colors from ~25 components, replaced it with 4 lines of code at app root to override Eufemia at the start. And then tried dark mode in a few hours, no edge cases. So I saw the issues with CUF, and improved Smartdocs as I always want to make the best codebase possible

## Smartdocs DX

I always tried to make Smartdocs the best codebase possible: env setup was confusing backend devs despite README, so I reworked commands to pick local vs deployed backend with clear console logs (10-min task, zero questions after). Bumped all deps with breaking-change fixes (the thing CUF never did in 7 years). Added 75 Playwright E2E covering full user flows (send message, settings, language switch...) plus regression tests for old tricky bugs (send → don't wait → open history → send in old convo failing on loading states) plus visual screenshot diffing. Optimized from 12 min (75×3 browsers Chrome/Firefox/WebKit) down to 5 min (from 4 min before) via parallel + caching + structure. After that QA never reported a single issue, and I could refactor fearlessly. Left big 90-file cleanup PRs, best docs and DX I could.

I also wrote new CUF docs: how it works, what to rework, links to lib docs and best-practice articles.

Since this internship counted for my master degrees, as it replaced an entire semester, it got graded 92/100 for my work, presentation and report. Which for French schools is an extremly good grade.
