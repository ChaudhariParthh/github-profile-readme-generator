<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- README output is generated only by `toMarkdown` in src/lib/profile.ts; the preview renders that same string, so preview and copied Markdown never drift.
- App is client-side only (no backend); configs are saved and restored as JSON files via `parseConfig`, which merges onto the seed so older files still load.
- App is dark-only: theme tokens live in `:root` in src/styles.css; don't reintroduce a separate `.dark` override block.
