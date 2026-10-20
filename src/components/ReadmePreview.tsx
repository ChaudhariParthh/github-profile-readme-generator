import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import { toMarkdown, type Profile } from "@/lib/profile";

/** Tiny renderer for the subset of Markdown our generator emits (HTML blocks, ## headings, bullets, bold, links). */
function mdToHtml(md: string): string {
  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
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

export function ReadmePreview({ p, compact = false }: { p: Profile; compact?: boolean }) {
  const html = useMemo(() => {
    const src = compact
      ? toMarkdown({ ...p, addons: { ...p.addons, trophy: false, stats: false, langs: false, streak: false, blog: "none" }, support: { bmc: "", kofi: "", sponsors: false } })
      : toMarkdown(p);
    return mdToHtml(src);
  }, [p, compact]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
        <BookOpen className="h-4 w-4" />
        {p.username || "username"} / README.md
      </div>
      <article
        className={`readme ${compact ? "p-5 text-sm" : "p-6 md:p-8"}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
