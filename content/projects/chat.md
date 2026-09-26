---
id: chat
title: Chat
icon: messages-square
link: https://chat.brodin.dev
type: personal
startDate: '2024-07'
endDate: '2025-03'
skills:
  - TypeScript
  - React
  - Next.js
  - Tailwind CSS
  - AI SDK
  - Drizzle
order: 1
---

A chatbot that knows everything about me: my experiences, projects, career, all of it. Users can just ask anything and get real answers. It works as a conversational portfolio. I'm using React Server Components with the [AI SDK](https://ai-sdk.dev/), which is genuinely hard to pull off since their docs are not even working (and [not even recommended anymore](https://ai-sdk.dev/docs/ai-sdk-rsc)), but it makes the streaming flow feel really smooth. Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Drizzle](https://orm.drizzle.team/), and the [Vercel AI SDK](https://ai-sdk.dev/).

<!-- more -->

That's one of my best projects, even if it's a bit old and I could do it much better now with the tech that came out since, but for that time, I've built a chat app where I give the system prompt the full context about me, and the LLM could answer users any questions about my career.

So I basically dumped my portfolio into an LLM that users can query. No login, but I store all conversations with Drizzle. I also use Vercel geolocation to give it to the LLM, so it can provide personalized answers.

I used the AI SDK, with RSC instead of UI, which is now deprecated because they couldn't make it work well, but I still did. They had some issues with flickering and stuff, but I found some ways and other tutorials, so everything runs on the server.

Full documentation for people to make it their own. Very nice UI, animations...

2 years after this project, I still haven't seen anyone build something similar. I'm truly a visionary.
