# GitHub Stats Section Themes — Feature Completion Plan

**Plan file:** `.kilo/plans/1793259107577-stats-themes-implementation.md`
**Date:** 2026-10-29
**Status:** Implementation-ready

## Root Cause

The user wants the GitHub Stats feature fully working: toggle switches for Stats card/Top languages/Contribution streak, real data from imported GitHub profile, all 10 themes rendering distinct layouts, and Markdown export including stats. Currently:

1. **`addons` type** only has `{ blog, blogHandle }` — missing `stats`, `langs`, `streak` booleans
2. **`seedProfile.addons`** missing these fields
3. **`parseConfig`** doesn't parse stats/langs/streak from addons input
4. **`seedProfile.sections`** doesn't include `"stats"` section
5. **Builder `active === "stats"`** renders `StatsCard` (gallery preview card) instead of actual rendered stats content with user's data
6. **No toggle switches** in builder for stats/langs/streak addons (user's screenshot shows these)

## Files to Modify

### 1. `src/lib/profile.ts`
- Add `stats: boolean`, `langs: boolean`, `streak: boolean` to `addons` type
- Add `stats: true, langs: true, streak: true` to `seedProfile.addons`
- Add parsing in `parseConfig`: `stats: addonsInput["stats"] !== false`, `langs: addonsInput["langs"] !== false`, `streak: addonsInput["streak"] !== false`
- Update all PRESETS to include `stats`, `langs`, `streak` in their `addons` objects

### 2. `src/routes/builder.tsx`
- Replace the `active === "stats"` block content:
  - Add toggle switches for Stats card, Top languages, Contribution streak (bound to `p.addons.stats`, `p.addons.langs`, `p.addons.streak`)
  - Below toggles, render actual stats content: call `renderStatsSection(p)` → `mdToHtml` → `sanitizeHtml` → `dangerouslySetInnerHTML`
  - When `githubStats` is null or no username: show text fallback "Enter your GitHub username to import your profile"
  - When addons.stats is false: don't render stats section content
- Remove now-unused `StatsCard` import if no longer needed

## Verification Checklist

- TypeScript typecheck: `npx tsc --noEmit` — clean
- ESLint on modified files — clean
- Tests: `npx vitest run` — 35+ pass
- Stats toggle switches appear in builder when `active === "stats"`
- Toggling stats/langs/streak addons updates `p.addons`
- When username entered + GitHub imported + stats addon on: builder stats section shows real data (public repos, stars, followers, languages)
- Each of 10 themes renders distinct structure in builder stats section
- README preview shows selected theme's stats layout
- Markdown export includes stats section with selected theme layout
- Gallery sample data never leaks into preview/export
- No `streak-stats.demolab.com` anywhere
- No empty `src=""` images

## Plan Summary

Three targeted changes:
1. **`profile.ts`**: Add `stats`/`langs`/`streak` to `addons` type, `seedProfile`, `parseConfig`, and all PRESETS
2. **`builder.tsx`**: Replace `StatsCard` in stats section with toggle switches + actual `renderStatsSection(p)` output rendered via `mdToHtml` + `sanitizeHtml`

All theme definitions, renderers, gallery components, and tests are already in place and verified.
