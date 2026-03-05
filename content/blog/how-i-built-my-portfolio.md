---
title: '"You Wouldn’t Steal a DIV": How I Built My Portfolio'
description: 'A story about how I built my portfolio and what went through my mind while building it'
date: '2026-03-04'
tags: ['web-development']
published: true
---

Hello, World! Here's my first ever blog.

I wanted to talk a bit about my [portfolio](https://brodin.dev), how I built it, why I made some of these architectural and design decisions, and why I shamelessly 'borrowed' my way to designs I love.

## 1 Stack, 2 Stack, Tech Stack, 4

> (If you didn't read that header [in Slim Shady's voice](https://youtu.be/F2hiFbuQ-Qw?si=h6omylv9pJwJIVgp&t=93), I don't know what to tell you.)

First of all, let's talk tech stack. I used to have all of my personal projects (including my previous portfolio) built with [Next.js](https://nextjs.org/). These were small side projects, without complicated logic, and with simple needs. Yet, I would always run into Next.js edge cases. Turbopack was failing my dev builds because it wouldn't play nice with Contentlayer, HMR was taking actual seconds to refresh, and production builds were taking 50 seconds for projects that barely scaled. When I got to choose a stack for a new project at my job, I couldn't justify the Next.js overhead for production apps, considering the friction I had with small personal projects.

At that time, everyone was talking about [Tanstack Start](https://tanstack.com/start/latest): the "DX God." But even their starter app had linting and TS issues, so I wasn't fully impressed. I stuck with only Tanstack Router for that project, and as weeks passed by working with the entire Tanstack Ecosystem (except Start), I was really enjoying it. The documentation is well written and extensive (even too much sometimes), DX actually made sense, and I could find all of the features I liked about Next.js (file base routing for example) while still having great performance (15s builds).

So this led me to build this portfolio with Tanstack Start! I still love Vercel's UX, and wander around their dashboard to see how I should implement my stuff, but I think I'll leave Next.js behind for now.

Then for the component library, I was really into [coss ui](https://coss.com/ui). I stumbled upon it randomly one day and loved it so much. My [Nathan's AI](https://chat.brodin.dev) project already had a UI heavily inspired by [cal.com](https://cal.com/): send button, message suggestions... So when I saw they had a [shadcn/ui](https://ui.shadcn.com/) library with that kind of style, it was perfect for what I needed.

I can also consider myself a proud Open Source Contributor after getting **two PRs** merged into [coss ui](https://coss.com/ui) (a 2-line diff and I'm not even kidding, but quality over quantity, I guess...?).

## Stealing...I Mean, Getting Inspired By Chanhdai and Zed

Now I'm not going to lie and say I designed and coded everything myself. I took large parts of the code and page layout from the open-source portfolio by [Chanhdai](https://chanhdai.com) and design inspiration from [zed.dev](https://zed.dev), which I had previously attempted in unfinished side projects (https://trends.brodin.dev and https://ui.brodin.dev if they're still available).

I still went a different way than Chanhdai for the code implementation. For example, I chose to store my content in markdown files using [Content Collections](https://www.content-collections.dev/). I did this specifically so I could easily serve my portfolio's content in plain text in the future, perfect for LLM consumption, which ties right back into the needs of my [Nathan's AI](https://chat.brodin.dev) project. I also used Base-ui (because of coss ui) for components, and generally went with a different style. So this was not just a simple copy/paste or a fork, there was still a lot of work involved.

For Zed, I took the [same fonts](https://zed.dev/attributions#fonts) for the headings and text, and the grid layout with the "diamonds" at the intersections. It really adds personality to my portfolio (not _my_ personality since I stole it, but **some** personality).

Also, by a great coincidence, Chanhdai had very basic sound design, like a sound when changing the theme, and I wanted to push things further by having different sounds around the entire app. I was looking around on the web for good sound libraries and all, but couldn't find anything interesting. Then the next day, I saw a tweet about the upcoming release of [Soundcn](https://www.soundcn.xyz/), which was **exactly** what I was looking for. So now you get a bunch of sounds when clicking on stuff in my portfolio. It's a nice touch!

## From good to WHOA

Lastly, the thing that elevated my portfolio from a good portfolio to a **Whoa** portfolio are the dither shaders (from [Paper Shaders](https://shaders.paper.design/dithering)) that I have for page headings and section dividers. I had dither shaders in mind since the first day I saw them on [React Bits](https://reactbits.dev/backgrounds/dither), but couldn't find a good way to integrate them. So it ended up being a crossover between stealing the idea from zed.dev (open the dev console and see `data-paper-shader` on the headings) and [Fumadocs](https://www.fumadocs.dev/), which had them as well.

## To wrap things up

So in conclusion, I would say this portfolio is a cross between Chanhdai and Zed, with a better stack.

Go ahead, click around to hear the sound integration (it gets annoying after a while, be careful), check out the dither shaders on the headings, and [check out the source code here](https://github.com/NathanBrodin/Portfolio) if you want to steal from me like I stole from everyone (but at least leave a star on the repo pls).

- Blog Title reference: [This classic: "You Wouldn't Steal a Car"](https://www.youtube.com/watch?v=P-pYiWGSN8w)
- My Portfolio: [brodin.dev](https://brodin.dev)
