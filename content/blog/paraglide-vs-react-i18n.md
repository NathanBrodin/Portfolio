---
title: 'react-i18next Was Fine. Then I Found Paraglide.'
description: 'A comparison of react-i18next and Paraglide JS from someone who has shipped both in production: what I was missing, why I switched, and the honest downsides.'
date: '2026-05-04'
tags: ['web-development', 'react', 'i18n']
published: true
---

I have a confession: I used react-i18next for years and genuinely never questioned it. It worked. It was everywhere. Every project I joined during my internships at DNB had it set up. You install it, you configure it, you wrap your app in a provider, and you ship. Done.

But then I started building more things on my own, projects where I got to choose the stack from scratch, and I started noticing friction I had previously just accepted. So let me tell you what I was silently tolerating with react-i18next, and why Paraglide JS fixed basically all of it.

## The react-i18next Era

To be clear: react-i18next is a solid library. It's been around forever, it has a massive community, and it handles a lot of edge cases out of the box. I'm not here to drag it through the mud.

But here are the three things that made me raise an eyebrow every single time. Worth noting: my hands-on react-i18next experience was back in 2024, so some of this may have improved since, but these were real pain points at the time, and the defaults still matter.

> Quick reality check before I complain: I once set up internationalization in a Flutter app at uni. After that experience, anything in the React ecosystem is a luxury. So take my "rants" with the appropriate grain of salt.

### 1. No type safety (or not by default, at least)

This one was the most egregious for me back then. When you use react-i18next, your translation key is just... a string.

```tsx
const { t } = useTranslation()

return <p>{t('dashboard.welcome.title')}</p>
```

TypeScript has absolutely no idea if `dashboard.welcome.title` is a real key or something you mistyped at 2am. You only find out at runtime, when your users see an empty string or the raw key rendered on screen. I love type safety. Coming from a TypeScript-first mindset, that kind of feedback loop gives me actual anxiety.

You can [set up type augmentation](https://www.i18next.com/overview/typescript) manually and make it work. And to be fair, i18next has been actively improving here, v25 shipped a proper `enableSelector` option that makes keys fully typed, with plans to make it the default in [v26](https://www.i18next.com/overview/typescript). So this is becoming less of a valid complaint over time. But in 2024, none of that was there, it required extra configuration, and the fact that it was opt-in told you everything you needed to know about where it sat on the priority list. Paraglide just gives you this for free, from day one, no setup required.

### 2. Your entire translation file ships to the client

This is the quiet performance problem that nobody talks about enough. By default, react-i18next loads your full JSON translation file on the client, regardless of which keys are actually used on the current page.

If your app has been around for a while, that JSON file is probably enormous. Every abandoned feature, every old marketing copy, every screen the current user will never visit, it all gets shipped. Every time.
It also opens the door to accidental data leaks, shipping unreleased feature copy or internal admin strings to the client simply because they share a JSON file.

### 3. You need a hook. For everything.

```tsx
// Server component? Utility function? Class? Doesn't matter.
// You need useTranslation() or you're not translating anything.
const { t } = useTranslation()
```

The `useTranslation` hook is fine in a standard React component tree. But the moment you step outside that, a utility function, a constant, a non-component file and you're stuck. You either restructure your code to work around it, or you do something hacky. Neither is great.

---

## Enter Paraglide JS

[Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) is an i18n library by the folks at [inlang](https://inlang.com/). I first heard about it from TanStack's own [internationalization docs](https://tanstack.com/router/latest/docs/guide/internationalization-i18n#tanstack-router--paraglide-client-only), where it's the officially recommended solution. Given that I use TanStack for everything at this point, that was enough of an endorsement for me to try it.

I've now used it in both personal projects and at work, and here is what actually changed.

### Direct imports, no hook required

This is the one that immediately felt right. Paraglide generates your translation messages as real importable functions:

```tsx
import { m } from '@/paraglide/messages'

// In a component
;<p>{m.dashboard_welcome_title()}</p>

// In a utility function
export function formatGreeting(name: string) {
  return m.welcome_user({ name })
}

// In a constant
const PAGE_TITLE = m.page_title()
```

No hook. No provider wrapping. No `useTranslation()` call at the top of every file. You just import and call. It works everywhere: components, utilities, server code, wherever. That simplicity compounds surprisingly fast when you're translating dozens of strings across a whole app.

### Type safety out of the box

Because Paraglide generates actual TypeScript functions from your message files, you get full type safety for free. Autocomplete works. Typos are caught at compile time. If a message has parameters, TypeScript tells you exactly what you need to pass:

```tsx
// m.welcome_user expects { name: string } — TypeScript knows this
m.welcome_user({ name: 'Nathan' }) // ✅
m.welcome_user() // ❌ TypeScript error
m.wellcome_user({ name: 'Nathan' }) // ❌ TypeScript error, key doesn't exist
```

This is the baseline I want from any typed language. The fact that it just works without extra setup is a big deal.

### Tree shaking

Here's the quiet win: Paraglide only ships the messages that are actually used. Because translations are imported as individual functions, your bundler can tree shake everything else away. If a page only uses five translation keys, only those five keys end up in the bundle. Not your entire dictionary. Not every string from every screen your users will never visit.

For smaller projects it's a nice-to-have. For larger apps, this is genuinely meaningful.

### Ultralight, and SSR-friendly

The runtime is tiny. We're talking a few hundred bytes. Compare that to react-i18next's runtime overhead and the JSON payload you're loading on top of it, and the difference is noticeable. It also works well with SSR, which was a concern before I tried it, TanStack Start's server rendering plays nicely with Paraglide's design, no hydration weirdness.

---

## The Honest Downsides

I said I wasn't here to drag react-i18next, but I should be equally honest about Paraglide's rough edges.

### A lot of files in your repo

Setting up Paraglide means you're going to have a `project.inlang/` directory at the root, and a generated `src/paraglide/` directory with all the output. It's not one config file you forget about, it's a handful of files you'll see every time you open your project tree. Nothing breaks, but it's visually noisier than what you'd get with other i18n setups.

### The docs are scattered

This is my biggest complaint. The documentation lives across [inlang.com](https://inlang.com), the Paraglide-specific pages, and the TanStack docs. None of them are bad on their own, but if you're trying to piece together a specific setup — say, Paraglide + TanStack Router + SSR, you'll end up jumping between multiple sites and cross-referencing. It works out eventually, but it's not the smooth onboarding you'd hope for.

---

## So, Should You Switch?

If you're starting a new project with React and TanStack (you should), use Paraglide. It's the officially recommended solution, it's designed to match how modern React apps are structured, and the DX improvement is real.

If you're maintaining an existing app heavily invested in react-i18next, the migration cost is probably not worth it unless you're already hitting the pain points I described. It works fine. You'll just be quietly annoyed every time you need to translate something outside a component.

For me, the no-hook import alone was enough to never look back.

---

- Paraglide JS: [inlang.com/m/gerre34r/library-inlang-paraglideJs](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- TanStack i18n guide: [tanstack.com/router/latest/docs/guide/internationalization-i18n](https://tanstack.com/router/latest/docs/guide/internationalization-i18n)
- react-i18next TypeScript setup: [i18next.com/overview/typescript](https://www.i18next.com/overview/typescript)
- Portfolio: [brodin.dev](https://brodin.dev)
