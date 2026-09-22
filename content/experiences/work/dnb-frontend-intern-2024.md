---
companyId: dnb
companyName: DNB
companyLogo: /company-logos/dnb.webp
companyWebsite: https://dnb.no

title: Frontend Engineer Intern
startDate: '2024-04'
endDate: '2024-08'
employmentType: Internship
icon: code
skills:
  - TypeScript
  - React
  - Redux
  - CSS
  - Storybook
  - Playwright

order: 3
---

Built the frontend of a GenAI chatbot platform used by 100+ users. From blank repo to well-tested app (92% coverage, Storybook, documented architecture). Focused on developer experience: clean code, consistent styling, and full test setup.

<!-- more -->

---

From April to August 2024, I returned to the same team at DNB. I got to see my previous project live in production, with ~10 users, and developers that had built on top of it without issues!

Once again, I started right when they started a new project, so I got to build a brand new frontend mostly alone. This was a new chatbot application, but it's not sharing the same base as the other chatbots that I got to build the admin panel of, this one was an LLM RAG chatbot, built from the ground up. It's called the Smartdocs Platform: a multi-tenant chatbot that plugs into DNB's internal SharePoint sites so teams can ask questions over their own documents. First tenant was "AML Justina" for the Anti-Money Laundering team, who otherwise had to dig through hundreds of pages of docs.

Requirements for the frontend codebase got elevated a bit by my mentor, with TypeScript (Vite), and Redux with RTK Query for data fetching, Storybook to render components in isolation with mocks, and Playwright for E2E testing.

Once again it was collaboration with the same UI/UX designer for the Figma sketches and the feedback, with the backend and AI engineers to make it work, and all the meetings that come around. We started 6-7 devs on the frontend splitting components, and ended up just 2 of us.

What I actually built there (257 out of 362 commits, top contributor):

- Components: started with the `ChatForm` (textarea + Send button, which sounds trivial but meant autofocus on load, Enter to send vs Shift+Enter for newline, blocking empty sends, blocking send while streaming, clearing after send, theme variables), then 19 other components the same way. Same tricky Eufemia overwrites as before, using deep CSS selectors found via Chrome DevTools to force the Figma look.
- E2E testing, with 107 tests in total, 92% coverage.
- API integration, 3 rewrites: I was first asked to work without a backend and use Microsoft's AI chat template instead, as they would follow it. I made it clean and working, with nicely typed logic. Then they shared the OpenAPI specs, which largely differed from the template, so I adapted everything (and found Prism to generate a mock server straight from OpenAPI, so I had a backend working sending mocks). Then they shared the first draft of the backend, which did not match the OpenAPI specs at all, so I refactored a third time and took the initiative to rewrite the OpenAPI docs to reflect reality. The solution architect also asked me for a Sequence Diagram of the app flow to make the UI logic understandable.
- Streaming: I implemented SSE streaming on top of a backend that couldn't stream at first, so the frontend had to handle both. That meant stripping `data:` prefixes, accumulating chunks, splitting on newlines, buffering incomplete JSON until `JSON.parse` succeeded, and appending content progressively. Gated behind feature flags with a type-safe `useFlag` hook I wrote (only boolean keys from the config type show up in autocomplete, typesafety all the way of course).
- Theme customizer: the designer asked how to do per-tenant theming (primary color, secondary, etc.) with no spec as it was difficult for her to do it over Figma, so I built a `/theme` page where she could try colors live, different icons and copy the resulting JSON. The custom bot icon was the tricky part since it came from the backend, which I solved with `api.util.updateQueryData` to patch the cached config from the frontend.
- Smaller stuff: chat history took 2-3 hours to implement as the backend guy was very quick to make it available in the backend. We add a settings menu with a single setting for a zoom slider for font size that I thought shouldn't exist (browser Ctrl+ already does it, but I built it anyway).
- PDF export, the hardest task: first attempt rasterized HTML to PDF, style preserved and designer happy, but links were dead (citations to source docs, the key feature) and page breaks cutting messages in half. Started over with react-pdf (custom `<Document>/<Page>/<View>/<Text>` tags, no HTML reuse) to fully control layout, links and breaks. There is very little docs online, lots of blind experimenting, but proud it worked perfectly.
- Docs and transfer: comprehensive README (install, run, how to add component/localization/tests...), then a Knowledge Transfer session.
- Non-technical: mentored 2 high-schoolers with another intern for 3 days with ~20 progressive Python exercises I prepared, plus final presentation coaching.

But once again, the project did not reach production once I finished my internship, so I couldn't see users using my work.
