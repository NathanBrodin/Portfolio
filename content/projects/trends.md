---
id: trends
title: Trends
icon: trending-up
link: https://github.com/NathanBrodin/trends
type: personal
startDate: '2026-06'
skills:
  - TypeScript
  - React
  - TanStack Start
  - Tailwind CSS
  - shadcn/ui
  - Convex
---

That's a project that has been going on and off for years, with no output still. I wanted to create my own personal finance application, which is focused on the future by using the current and past income/expenses to see how my finances will evolve in the future.

<!-- more -->

I started it in 2023 I think, with a Next.js app, with a Zed UI (previous to my UI lib, which is a big part of the reason why I created it), but couldn't be satisfied by it.

Then I tried again in 2025 but stopped again, then trying again since June 2026, I first had to create the Template to have a strong foundation, then work on it, but the code was starting to be messy for my standards, at that time you had to manually enter the data, which gave great results, but it would not be usable as the data would drift from reality the day after you entered the data, and I made a complete overview page with lots of charts, spent lots of time to make it really really nice, but realized that the information you get out of it was not that valuable.

So I refactored it with a mono-repo structure to keep everything perfect using the better-t-stack template, and decided to rebuild it entirely from the ground to fetch the data directly from my accounts, using the "Enable Banking" PSD2 provider, but after a month building on it, realized that the data is unusable, like transactions are not categorized and contain little info, and the worst was that you have to first connect your accounts to the Enable Banking admin dashboard and then you could use it in my app, but this means I can never publish the app.

Then I switched to the GoCardless API, which is a bit better, but I kinda lost motivation as the data is still missing lots of information.
