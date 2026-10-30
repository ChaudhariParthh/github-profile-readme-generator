import { useEffect, useMemo, useState } from "react";
import { BookOpen, Github } from "lucide-react";
import { toMarkdown, type Profile } from "@/lib/profile";
import { generateStatsCardDataUri, generateLangsCardDataUri } from "@/lib/appearance";
import { sanitizeHtml } from "@/lib/sanitize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Renders the subset of Markdown our generator emits (HTML blocks, ## headings, bullets, bold, links). */
export function mdToHtml(md: string): string {
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
      if (!list) {
        html.push("<ul>");
        list = true;
      }
      html.push(`<li>${inline(t.slice(2))}</li>`);
      continue;
    }
    if (list) {
      html.push("</ul>");
      list = false;
    }
    if (!t || t.startsWith("<!--")) continue;
    if (t.startsWith("## ")) html.push(`<h2>${inline(t.slice(3))}</h2>`);
    else if (t.startsWith("<")) html.push(line);
    else html.push(`<p>${inline(t)}</p>`);
  }
  if (list) html.push("</ul>");
  return html.join("\n");
}

const COMPACT_HIDE = new Set([
  "trophies",
  "stats",
  "graph",
  "blog",
  "support",
  "projects",
  "visitors",
]);

export function ReadmePreview({
  p,
  compact = false,
  onImport,
}: {
  p: Profile;
  compact?: boolean;
  onImport?: (username: string) => void;
}) {
  const raw = useMemo(() => {
    const src = compact ? { ...p, sections: p.sections.filter((s) => !COMPACT_HIDE.has(s.id)) } : p;
    let md = toMarkdown(src);
    md = md.replace(
      /https:\/\/raw\.githubusercontent\.com\/ChaudhariParthh\/github-profile-readme-generator\/main\/public\/banners\/([a-z-]+)\.svg/g,
      "/banners/$1.svg",
    );
    return mdToHtml(md);
  }, [p, compact]);

  // Sanitizing needs the browser DOM parser, so it runs after mount.
  const [html, setHtml] = useState("");
  const [previewUsername, setPreviewUsername] = useState("");
  useEffect(() => setHtml(sanitizeHtml(raw)), [raw]);

  // Broken external images (rate limits, service outages, bad URLs) become a small label instead of a broken icon.
  const onImgError = (e: React.SyntheticEvent<HTMLElement>) => {
    const img = e.target as HTMLImageElement;
    if (img.tagName !== "IMG" || img.dataset["failed"]) return;
    const bannerMatch = img.src.match(/\/banners\/([a-z-]+)\.svg/i);
    if (bannerMatch && !img.dataset["retriedLocal"]) {
      img.dataset["retriedLocal"] = "1";
      img.src = `/banners/${bannerMatch[1]}.svg`;
      return;
    }

    // Graceful fallback for external GitHub stats card service outages or rate limits
    if (!img.dataset["retriedStatsFallback"] && img.src.includes("github-readme-stats.vercel.app")) {
      img.dataset["retriedStatsFallback"] = "1";
      if (img.src.includes("/top-langs")) {
        img.src = generateLangsCardDataUri(p);
        return;
      } else {
        img.src = generateStatsCardDataUri(p);
        return;
      }
    }

    img.dataset["failed"] = "1";
    const span = document.createElement("span");
    span.className = "readme-broken";
    span.textContent = `${img.alt || "image"} unavailable`;
    img.replaceWith(span);
  };

  const hasUsername = Boolean(p.username?.trim());

  const handleImport = () => {
    const val = previewUsername.trim();
    if (!val || !onImport) return;
    onImport(val);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {!compact && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          {p.username || "username"} / README.md
        </div>
      )}
      {!compact && !hasUsername && (
        <div className="readme p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
          <Github className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-sm font-semibold mb-1">Add GitHub Username</h3>
          <p className="text-xs text-muted-foreground mb-6">
            Import your public GitHub profile to populate stats, badges, and activity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-sm">
            <Input
              className="flex-1 font-mono"
              placeholder="username"
              value={previewUsername}
              onChange={(e) => setPreviewUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleImport();
              }}
            />
            <Button
              size="sm"
              onClick={handleImport}
              disabled={!onImport || !previewUsername.trim()}
              className="flex items-center gap-1.5"
            >
              <Github className="h-4 w-4" /> Import
            </Button>
          </div>
        </div>
      )}
      {!compact && hasUsername && (
        <article
          key={html}
          onErrorCapture={onImgError}
          className="readme p-6 md:p-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
