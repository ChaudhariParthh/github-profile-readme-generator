import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Code2, Copy, Eye, Plus, RotateCcw, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { ReadmePreview } from "@/components/ReadmePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  SOCIAL_META,
  STATS_THEMES,
  TECH_OPTIONS,
  seedProfile,
  toMarkdown,
  type Profile,
} from "@/lib/profile";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Builder — GitProfile Studio" },
      { name: "description", content: "Customize your GitHub profile README with a live preview and copy the Markdown." },
      { property: "og:title", content: "Builder — GitProfile Studio" },
      { property: "og:description", content: "Live GitHub README builder with badges, stats and socials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Builder,
});

function Builder() {
  const [p, setP] = useState<Profile>(seedProfile);
  const [tab, setTab] = useState<"editor" | "preview">("editor");
  const [raw, setRaw] = useState(false);
  const [copied, setCopied] = useState(false);
  const md = useMemo(() => toMarkdown(p), [p]);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((s) => ({ ...s, [k]: v }));

  const copy = async () => {
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="sticky top-16 z-20 flex border-b border-border bg-background lg:hidden">
        {(["editor", "preview"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium capitalize ${tab === t ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[420px_1fr]">
        <aside className={`space-y-4 ${tab === "editor" ? "" : "hidden"} lg:block`}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Customize</h1>
            <Button variant="ghost" size="sm" onClick={() => setP(seedProfile)}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>

          <Panel title="Profile info">
            <Field label="Name"><Input value={p.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="GitHub username">
              <Input className="font-mono" value={p.username} onChange={(e) => set("username", e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><Input value={p.title} onChange={(e) => set("title", e.target.value)} /></Field>
              <Field label="Location"><Input value={p.location} onChange={(e) => set("location", e.target.value)} /></Field>
            </div>
          </Panel>

          <Panel title="Bio">
            <Field label="About you"><Textarea rows={4} value={p.bio} onChange={(e) => set("bio", e.target.value)} /></Field>
            <Field label="Currently working on"><Input value={p.currentlyWorking} onChange={(e) => set("currentlyWorking", e.target.value)} /></Field>
            <Field label="Currently learning"><Input value={p.learning} onChange={(e) => set("learning", e.target.value)} /></Field>
          </Panel>

          <Panel title="Tech stack badges">
            <div className="flex flex-wrap gap-2">
              {Object.keys(TECH_OPTIONS).map((t) => {
                const on = p.tech.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => set("tech", on ? p.tech.filter((x) => x !== t) : [...p.tech, t])}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs transition-colors ${on ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />} {t}
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel title="Socials">
            {Object.keys(SOCIAL_META).map((platform) => {
              const s = p.socials.find((x) => x.platform === platform);
              return (
                <Field key={platform} label={platform}>
                  <div className="flex gap-2">
                    <Input
                      className="font-mono"
                      placeholder={platform === "Email" ? "you@example.com" : "handle"}
                      value={s?.handle ?? ""}
                      onChange={(e) => {
                        const rest = p.socials.filter((x) => x.platform !== platform);
                        set("socials", [...rest, { platform, handle: e.target.value }]);
                      }}
                    />
                    {s?.handle && (
                      <Button variant="ghost" size="icon" onClick={() => set("socials", p.socials.filter((x) => x.platform !== platform))}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Field>
              );
            })}
          </Panel>

          <Panel title="GitHub stats">
            <Toggle label="Stats card" checked={p.showStats} onChange={(v) => set("showStats", v)} />
            <Toggle label="Top languages" checked={p.showLangs} onChange={(v) => set("showLangs", v)} />
            <Toggle label="Contribution streak" checked={p.showStreak} onChange={(v) => set("showStreak", v)} />
            <Field label="Card theme">
              <div className="flex flex-wrap gap-2">
                {STATS_THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => set("statsTheme", t)}
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs ${p.statsTheme === t ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
          </Panel>
        </aside>

        <section className={`${tab === "preview" ? "" : "hidden"} lg:block`}>
          <div className="sticky top-20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex rounded-lg border border-border bg-card p-1">
                <Button size="sm" variant={raw ? "ghost" : "secondary"} onClick={() => setRaw(false)}>
                  <Eye className="h-4 w-4" /> Preview
                </Button>
                <Button size="sm" variant={raw ? "secondary" : "ghost"} onClick={() => setRaw(true)}>
                  <Code2 className="h-4 w-4" /> Markdown
                </Button>
              </div>
              <Button size="sm" onClick={copy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Markdown"}
              </Button>
            </div>
            <div className="max-h-[calc(100vh-9rem)] overflow-auto rounded-xl">
              {raw ? (
                <pre className="whitespace-pre-wrap break-all rounded-xl border border-border bg-card p-5 font-mono text-xs leading-relaxed text-muted-foreground">
                  {md}
                </pre>
              ) : (
                <ReadmePreview p={p} />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      <h2 className="font-mono text-xs uppercase tracking-wider text-accent">{title}</h2>
      {children}
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
