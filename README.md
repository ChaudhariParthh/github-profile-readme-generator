# GitProfile Studio

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=for-the-badge&logo=github)](https://pages.github.com/)

GitProfile Studio is a modern front-end application for creating polished GitHub profile README files. It gives developers a fast, visual way to design a profile that communicates skills, projects, and contact information without writing raw Markdown from scratch.

## Table of contents

- [Overview](#overview)
- [Key features](#key-features)
- [How it works](#how-it-works)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Links](#links)

## Overview

The project is designed for a streamlined profile-building experience. Instead of hand-crafting README sections and theme details line by line, users can configure layout, typography, badges, social links, project statistics, and generated Markdown in a single interface.

This app focuses on a clean experience, responsive UI, and static deployment support. It is built to run entirely on the client side, making it easy to generate and preview content without a backend service.

## Key features

- Configurable GitHub profile README layouts
- Flexible theme and styling controls
- Social links, badges, and status widgets
- Dynamic Markdown preview panel
- Responsive layout for desktop and browser-based usage
- Template-driven generation for consistent output
- Static hosting support for GitHub Pages

## How it works

1. Select a profile layout or starting template.
2. Customize branding, sections, links, and styling.
3. Preview the generated Markdown in real time.
4. Copy the final content into your GitHub profile repository.

This workflow helps reduce iteration time while maintaining a high-quality final result.

## Technology stack

| Category | Technology |
| --- | --- |
| Frontend | React 19 |
| Language | TypeScript 5.8 |
| Build tooling | Vite 8 |
| Styling | Tailwind CSS 4 |
| UI primitives | Radix UI and shadcn-style patterns |
| Routing | TanStack Router and TanStack Start |
| Testing | Vitest |
| Quality | ESLint and Prettier |

## Project structure

```bash
github-profile-readme-generator/
├── .github/
├── public/
├── scripts/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── routes/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── .prettierrc
├── .prettierignore
├── AGENTS.md
├── README.md
├── components.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── roadmap.md
├── tsconfig.json
├── vite.config.ts
├── vite.config.github.ts
├── vitest.config.ts
├── bun.lock
├── bunfig.toml
└── public/
```

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Regenerate template fixtures if needed:

```bash
npm run templates:render
```

## Deployment

The project includes a GitHub Pages-friendly build configuration for static deployment.

- Production base path: `/gitprofile-studio/`
- Public deployment URL: https://chaudhariparthh.github.io/gitprofile-studio/
- Lovable prototype: https://gitprofilestudio.lovable.app/

The repository is configured to support deployment in a subfolder environment, which is suitable for GitHub Pages hosting.

## Links

- [Live Demo](https://chaudhariparthh.github.io/gitprofile-studio/)
- [Lovable App](https://gitprofilestudio.lovable.app/)
- [GitHub Repository](https://github.com/ChaudhariParthh/gitprofile-studio)

## Notes

This project is focused on creating and previewing GitHub profile README content directly in the browser. It does not rely on a server-side backend for core functionality, which keeps the experience lightweight and easy to deploy.

## License

This project does not define a repository license in the current configuration and is intended for use within the project's existing deployment and distribution context.
