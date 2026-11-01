# GitProfile Studio

GitHub Profile README Generator — create beautiful GitHub profile READMEs with customizable templates, badges, stats cards, and developer widgets.

## Overview

GitProfile Studio is a front-end application for building polished GitHub profile README files with a visual workflow. It helps developers create a profile that communicates skills, projects, social links, and personal branding without writing raw Markdown from scratch.

The project is designed to be lightweight, responsive, and easy to use. It focuses on a clean generation workflow, live previewing, and static deployment support.

## Built with

This project was developed using a combination of modern AI-assisted and collaborative tools:

- Antigravity
- Lovable
- Bolt.new
- Replit

The application was deployed and published using Lovable.

## Key features

- GitHub profile README generation
- Configurable templates and layouts
- Custom badges, stat cards, and widgets
- Social and contact link configuration
- Real-time Markdown preview
- Responsive browser-based interface
- Static deployment support for GitHub Pages

## Technology stack

| Category | Technology |
| --- | --- |
| Frontend | React 19 |
| Language | TypeScript 5.8 |
| Build tooling | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | TanStack Router and TanStack Start |
| UI | Radix UI and shadcn-style primitives |
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
├── LICENSE
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

Run the development server:

```bash
npm run dev
```

Build the project for production:

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

The project includes a GitHub Pages-friendly build configuration for static hosting.

- Production base path: `/gitprofile-studio/`
- Live demo: https://chaudhariparthh.github.io/gitprofile-studio/
- Lovable deployment: https://gitprofilestudio.lovable.app/

The project was deployed using Lovable, with static hosting support for GitHub Pages.

## License

This project is licensed under the Apache License, Version 2.0.

See the [LICENSE](LICENSE) file for the full license text.

## Links

- [Live Demo](https://chaudhariparthh.github.io/gitprofile-studio/)
- [Lovable App](https://gitprofilestudio.lovable.app/)
- [GitHub Repository](https://github.com/ChaudhariParthh/gitprofile-studio)

## Notes

This project is a client-side application focused on generating and previewing GitHub profile README content directly in the browser. It does not depend on a backend service for core functionality, which keeps the experience lightweight and easy to deploy.
