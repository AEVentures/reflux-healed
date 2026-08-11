# Reflux Healed

A peer-led community for people with **LPR, silent reflux, GERD, and hiatal hernia** to share what helped them heal — and find hope from people who understand.

## What this is

- A public, searchable wall of recovery stories.
- Stage-based support: newly diagnosed, investigating, healing, and healed mentors.
- Privacy-first: the first version uses email review for story submissions.
- Safety-first: no medical advice, no prescriptions, no miracle cures.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) icons
- [Zod](https://zod.dev/) for runtime validation
- [Vitest](https://vitest.dev/) for testing

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Test

```bash
pnpm test
```

## Deploy

The live site is at [https://reflux-healed.org](https://reflux-healed.org). Pushes to `main` trigger the `.github/workflows/deploy.yml` action, which builds and deploys to GitHub Pages.

## Domains

- Primary: [https://reflux-healed.org](https://reflux-healed.org)
- Redirect: [https://refluxhealed.org](https://refluxhealed.org) → primary

## Adding a story

For this first version, stories are submitted by email for moderation. The share form on the site opens the user’s email client with a pre-formatted submission. Once reviewed, a maintainer adds the story to `src/data/stories.json` and redeploys.

## Disclaimer

This is a peer support and educational site, not a medical practice. Nothing here is medical advice, diagnosis, or treatment. Always consult a licensed healthcare professional for personal medical decisions.
