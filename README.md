# GitProfile Studio

GitProfile Studio is a client-side GitHub profile README builder. Choose a complete template, tune your banner, typography, badges, stats, and social links, then copy or download the generated Markdown.

## Features

- Ten capsule-render banner recipes with optional SVG animation.
- App-only animated theme thumbnails that stop when `prefers-reduced-motion` is enabled.
- A validated typing-font allowlist. The selected font affects the typing-animation image only; GitHub controls the README body font.
- Ten template previews with Apply actions and 1280x720 static preview fixtures.
- Sanitized Markdown preview, safe URL handling, explicit config parsing, and a restrictive content security policy.

## Development

```sh
npm install
npm run build
npm test
```

Regenerate the template preview fixtures with:

```sh
npm run templates:render
```

The preview script checks every generated image against the template catalog and fails when a preset preview entry is missing. It uses deterministic local fixtures rather than live third-party widgets, so preview generation is stable in CI.
