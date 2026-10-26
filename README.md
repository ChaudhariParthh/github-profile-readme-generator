# GitProfile Studio-Github Profile Readme Generator

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=for-the-badge&logo=github)](https://pages.github.com/)

GitProfile Studio is a front-end application for creating polished GitHub profile README files. It allows users to tailor layout, typography, badges, stats, social links, and generated Markdown content in a streamlined, browser-based workflow.

## Live links

- [Live Demo](https://chaudhariparthh.github.io/github-profile-readme-generator/)
- [Lovable App](https://gitprofilestudio.lovable.app/)
- [GitHub Repository](https://github.com/ChaudhariParthh/gitprofile-studio)

## Overview

GitProfile Studio is designed as a lightweight, client-side tool for generating README content without requiring a backend service. The application prioritizes a clean user experience, template-driven customization, and static deployment compatibility.
<img width="1892" height="896" alt="image" src="https://github.com/user-attachments/assets/ef2727aa-0dc8-44f2-8747-b8dc1d768d08" />

## Tools used

This project was developed using a combination of modern AI-assisted design and development tools:

- Lovable for rapid application prototyping and UI generation
- Cursor for code implementation, editing, and refinement
- Bolt.new for additional experimentation and development acceleration
- Deployment and publishing were handled through the Lovable workflow, with the final project deployed to GitHub Pages

## Features

- GitHub profile README generation
- Customizable banner and layout styling
- Badge, stat, and social link configuration
- Template-based design system
- Markdown preview of generated output
- Responsive browser interface
- Static deployment support for GitHub Pages

## Technology stack

The current project configuration includes:

- React 19
- TypeScript 5.8
- Vite 8
- Tailwind CSS 4
- TanStack Router and TanStack Start
- Radix UI and shadcn-style component primitives
- Vitest for automated testing
- ESLint and Prettier for code quality and formatting

## Project structure

```bash
gitprofile-studio/
├── .github/
├── .lovable/
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

## Application architecture

The project is organized as a front-end-only application with file-based routing and static asset generation. The repository includes a dedicated GitHub Pages configuration, which is important because the app is intended to be served from a repository subpath rather than from the root domain.

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the app:

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

## Important files

### package.json
Defines the main scripts and project dependencies, including development, build, lint, format, and test commands.

### vite.config.ts
Configures the application base path for deployment. In this repository, the configured base is `/gitprofile-studio/`.

### vite.config.github.ts
Contains the GitHub Pages-friendly static build setup for the project. This file is specifically aligned with repository-hosted deployment.

### tsconfig.json
Defines the TypeScript compiler configuration and project-level settings used by the application.

### vitest.config.ts
Configures the Vitest test runner used for validation.

### README.md
Documents the project and serves as the main project overview for developers and users.

## GitHub Pages deployment

This repository includes configuration for deployment on GitHub Pages using a repository subfolder path.

- Production base path: `/gitprofile-studio/`
- Public deployment URL: https://chaudhariparthh.github.io/gitprofile-studio/
- Lovable prototype URL: https://gitprofilestudio.lovable.app/

The static hosting setup is designed to work correctly when the app is served from `/gitprofile-studio/`, which is required for a GitHub Pages project site.

## Deployment status

The repository contains a real GitHub Pages build setup and the base path is explicitly configured to match the repository name. This indicates the project is intended to be served from the GitHub Pages URL above.

## Recommended workflow

1. Develop and test locally with `npm run dev`.
2. Validate the production build with `npm run build`.
3. Run `npm test` before deployment.
4. Keep the GitHub Pages base path aligned with the repository name.
5. Confirm that generated assets and routes work correctly after changes.
6. Publish the current static build using the GitHub Pages-compatible configuration.

## Notes

This project is a front-end-only application focused on generating and previewing GitHub profile README content in the browser. It does not rely on a server-side backend for core functionality and is well-suited for static hosting.

## Access links

- [Live Demo](https://chaudhariparthh.github.io/gitprofile-studio/)
- [Lovable App](https://gitprofilestudio.lovable.app/)
- [GitHub Repository](https://github.com/ChaudhariParthh/gitprofile-studio)
