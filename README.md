# GitProfile Studio

Build Phase 1 of GitProfile Studio, a modern GitHub Profile README Generator.

Aesthetic & Theme:

- Dark developer aesthetic: Background #0B0D12, Surface #11151D, Accent Violet #8B5CF6, Accent Cyan #22D3EE, Text #F3F4F6, Muted #9CA3AF.

- Clean typography with monospace accents for code/markdown and Lucide icons.

Key Pages & Layout:

1. Landing Page (`/`):

   - Header with GitProfile Studio wordmark and "Open Builder" CTA.

   - Hero section with headline, value prop, and an interactive-looking preview card of a styled GitHub profile README.

   - 3-step workflow: Configure profile → Pick theme & badges → Copy Markdown.

   - 6 theme preset cards (e.g. Minimal, Modern Dev, Neon Dark, Gradient, Contributor, Portfolio).

2. Builder Workspace (`/builder`):

   - Desktop: Two-column layout with a left customization panel (Profile info, Bio, Tech Stack Badges, Socials, GitHub Stats) and a right live-rendered GitHub README preview. Include a toggle to view raw Markdown and copy buttons.

   - Mobile: Tabbed switch between "Editor" and "Preview".

   - Seed the initial preview with a polished developer profile (Parth Chaudhari — Full-Stack Developer, TypeScript, React, Node.js, GitHub stats card, and social badges).

Keep it strictly client-side UI with mock preview state. No backend, auth, or external API keys needed for this phase.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/efc59f6e-8ea1-4078-9759-ba3f1eb8ea20).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
