<div align="center">
    <a href="https://brodin.dev"><h1 align="center">Portfolio</h1></a>

My personal website, built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and deployed to [Vercel](https://vercel.com/).

</div>

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Velite](https://velite.js.org/) (Same as ContentLayer, but maintained)
- [Vercel KV](https://vercel.com/storage/kv)
- [Bun](https://bun.sh)

## Running Locally

```sh-session
git https://github.com/NathanBrodin/Portfolio.git
cd Portfolio
```

Install dependencies:

```sh-session
bun install
```

if you don't have bun installed:

```sh-session
curl -fsSL https://bun.sh/install | bash
```

Run the development server:

```sh-session
bun run dev
```

Use Vercel CLI to initialize the redis database, follow [this documentation](https://vercel.com/docs/storage/vercel-kv/quickstart) to get started.

## Inspirations

[https://chronark.com] was of course a big inspiration for this project. I didn't forked it has I wanted to start from scratch, and implement it my way.
I also reverse engineered [Magic UI's](https://magicui.design/) bento to create my [about](https://brodin.dev/#about) section.

## Help me

Please leave a star if you like this project, it will help me a lot.
