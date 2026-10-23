import { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { toMarkdown, type Profile } from "@/lib/profile";
import { sanitizeHtml } from "@/lib/sanitize";

/** Renders the subset of Markdown our generator emits (HTML blocks, ## headings, bullets, bold, links). */
function mdToHtml(md: string): string {
  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  const html: string[] = [];
  let list = false;
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (t.startsWith("- ")) {
      if (!list) html.push("<ul>"), (list = true);
      html.push(`<li>${inline(t.slice(2))}</li>`);
      continue;
    }
    if (list) html.push("</ul>"), (list = false);
    if (!t || t.startsWith("<!--")) continue;
    if (t.startsWith("## ")) html.push(`<h2>${inline(t.slice(3))}</h2>`);
    else if (t.startsWith("<")) html.push(line);
    else html.push(`<p>${inline(t)}</p>`);
  }
  if (list) html.push("</ul>");
  return html.join("\n");
}

const COMPACT_HIDE = new Set(["trophies", "stats", "graph", "blog", "support", "projects", "visitors"]);

export function ReadmePreview({ p, compact = false }: { p: Profile; compact?: boolean }) {
  const raw = useMemo(() => {
    const src = compact ? { ...p, sections: p.sections.filter((s) => !COMPACT_HIDE.has(s.id)) } : p;
    return mdToHtml(toMarkdown(src));
  }, [p, compact]);

  // Sanitizing needs the browser DOM parser, so it runs after mount.
  const [html, setHtml] = useState("");
  useEffect(() => setHtml(sanitizeHtml(raw)), [raw]);

  // Broken external images (rate limits, service outages, bad URLs) become a small label instead of a broken icon.
  const onImgError = (e: React.SyntheticEvent<HTMLElement>) => {
    const img = e.target as HTMLImageElement;
    if (img.tagName !== "IMG" || img.dataset['failed']) return;
    img.dataset['failed'] = "1";
    const span = document.createElement("span");
    span.className = "readme-broken";
    span.textContent = `${img.alt || "image"} unavailable`;
    img.replaceWith(span);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
        <BookOpen className="h-4 w-4" />
        {p.username || "username"} / README.md
      </div>
      <article
        key={html}
        onErrorCapture={onImgError}
        className={`readme ${compact ? "p-5 text-sm" : "p-6 md:p-8"}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
