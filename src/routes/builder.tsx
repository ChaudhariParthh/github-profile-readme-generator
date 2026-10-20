import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Check, Code2, Copy, Download, Eye, FileJson, Plus, RotateCcw, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { ReadmePreview } from "@/components/ReadmePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  BADGE_STYLES, PRESETS, SKILL_CATEGORIES, SOCIAL_META, STATS_THEMES,
  blogWorkflow, parseConfig, seedProfile, toMarkdown,
  type BlogSource, type Profile, type Work,
} from "@/lib/profile";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Builder — GitProfile Studio" },
      { name: "description", content: "Build your GitHub profile README with 100+ skill badges, stats widgets, trophies and a live preview." },
      { property: "og:title", content: "Builder — GitProfile Studio" },
      { property: "og:description", content: "Live GitHub README builder with skills, widgets, socials and JSON backup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Builder,
});

function downloadFile(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

const WORK_FIELDS: { key: keyof Work; label: string; placeholder: string }[] = [
  { key: "working", label: "🔭 Currently working on", placeholder: "project name" },
  { key: "workingLink", label: "Project link", placeholder: "https://..." },
  { key: "collab", label: "👯 Looking to collaborate on", placeholder: "project or idea" },
  { key: "collabLink", label: "Collaboration link", placeholder: "https://..." },
  { key: "learning", label: "🌱 Currently learning", placeholder: "frameworks, courses etc." },
  { key: "askMe", label: "💬 Ask me about", placeholder: "react, vue and gsap" },
  { key: "reach", label: "📫 How to reach me", placeholder: "you@example.com" },
  { key: "blog", label: "📝 Blog link", placeholder: "https://blog..." },
  { key: "resume", label: "📄 Resume link", placeholder: "https://..." },
  { key: "funFact", label: "⚡ Fun fact", placeholder: "I think I am funny" },
];

function Builder() {
  const [p, setP] = useState<Profile>(seedProfile);
  const [tab, setTab] = useState<"editor" | "preview">("editor");
  const [raw, setRaw] = useState(false);
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const md = useMemo(() => toMarkdown(p), [p]);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((s) => ({ ...s, [k]: v }));
  const setWork = (k: keyof Work, v: string) => setP((s) => ({ ...s, work: { ...s.work, [k]: v } }));
  const setAddon = <K extends keyof Profile["addons"]>(k: K, v: Profile["addons"][K]) =>
    setP((s) => ({ ...s, addons: { ...s.addons, [k]: v } }));
  const toggleSkill = (t: string) =>
    setP((s) => ({ ...s, skills: s.skills.includes(t) ? s.skills.filter((x) => x !== t) : [...s.skills, t] }));

  const copy = async (text: string, msg: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(msg);
  };
  const copyMd = async () => {
    await copy(md, "Markdown copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const importJson = async (file: File) => {
    try {
      setP(parseConfig(JSON.parse(await file.text())));
      toast.success("Config restored");
    } catch {
      toast.error("That file isn't a valid GitProfile Studio config");
    }
  };

  const q = query.trim().toLowerCase();

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
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-2">
        <aside className={`space-y-4 ${tab === "editor" ? "" : "hidden"} lg:block`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-lg font-semibold">Customize</h1>
            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="sm" onClick={() => downloadFile("gitprofile-config.json", JSON.stringify(p, null, 2), "application/json")}>
                <FileJson className="h-4 w-4" /> Export
              </Button>
              <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" /> Restore
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importJson(f);
                  e.target.value = "";
                }}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm"><RotateCcw className="h-4 w-4" /> Reset</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset the form?</AlertDialogTitle>
                    <AlertDialogDescription>All your changes will be replaced with the sample profile. Export first if you want to keep them.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { setP(seedProfile); toast("Form reset"); }}>Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">Start from a template</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map((name) => (
                <Button key={name} size="sm" variant="secondary" onClick={() => { setP(PRESETS[name] ?? seedProfile); toast(`Loaded "${name}"`); }}>
                  {name}
                </Button>
              ))}
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["intro", "skills"]} className="space-y-3">
            <Section value="intro" title="Header & intro">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name"><Input value={p.name} onChange={(e) => set("name", e.target.value)} /></Field>
                <Field label="GitHub username">
                  <Input className="font-mono" value={p.username} onChange={(e) => set("username", e.target.value)} />
                </Field>
                <Field label="Subtitle / role"><Input value={p.title} onChange={(e) => set("title", e.target.value)} /></Field>
                <Field label="Location"><Input value={p.location} onChange={(e) => set("location", e.target.value)} /></Field>
              </div>
              <Field label="About me"><Textarea rows={3} value={p.bio} onChange={(e) => set("bio", e.target.value)} /></Field>
              <Field label="Banner image URL (optional)">
                <Input className="font-mono" placeholder="https://..." value={p.bannerUrl} onChange={(e) => set("bannerUrl", e.target.value)} />
              </Field>
              <Toggle label="Animated typing line" checked={p.typingBanner} onChange={(v) => set("typingBanner", v)} />
            </Section>

            <Section value="work" title="Work & activity">
              <div className="grid gap-3 sm:grid-cols-2">
                {WORK_FIELDS.map((f) => (
                  <Field key={f.key} label={f.label}>
                    <Input placeholder={f.placeholder} value={p.work[f.key]} onChange={(e) => setWork(f.key, e.target.value)} />
                  </Field>
                ))}
              </div>
            </Section>

            <Section value="skills" title={`Skills (${p.skills.length} selected)`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search skills" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <Field label="Badge style">
                <Chips options={[...BADGE_STYLES]} value={p.badgeStyle} onChange={(v) => set("badgeStyle", v as Profile["badgeStyle"])} />
              </Field>
              <div className="max-h-[420px] space-y-4 overflow-auto pr-1">
                {Object.entries(SKILL_CATEGORIES).map(([cat, list]) => {
                  const items = list.filter(([n]) => !q || n.toLowerCase().includes(q));
                  if (!items.length) return null;
                  return (
                    <div key={cat}>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">{cat}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map(([n]) => {
                          const on = p.skills.includes(n);
                          return (
                            <button
                              key={n}
                              onClick={() => toggleSkill(n)}
                              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs transition-colors ${on ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
                            >
                              {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />} {n}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section value="socials" title="Socials">
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(SOCIAL_META).map(([platform, meta]) => (
                  <Field key={platform} label={platform}>
                    <Input
                      className="font-mono"
                      placeholder={meta.placeholder}
                      value={p.socials[platform] ?? ""}
                      onChange={(e) => set("socials", { ...p.socials, [platform]: e.target.value })}
                    />
                  </Field>
                ))}
              </div>
            </Section>

            <Section value="addons" title="Add-ons & widgets">
              <Toggle label="👁️ Profile visitor counter" checked={p.addons.visitors} onChange={(v) => setAddon("visitors", v)} />
              <Toggle label="🏆 GitHub trophies" checked={p.addons.trophy} onChange={(v) => setAddon("trophy", v)} />
              <Toggle label="📊 GitHub stats card" checked={p.addons.stats} onChange={(v) => setAddon("stats", v)} />
              <Toggle label="📈 Top languages" checked={p.addons.langs} onChange={(v) => setAddon("langs", v)} />
              <Toggle label="🔥 Contribution streak" checked={p.addons.streak} onChange={(v) => setAddon("streak", v)} />
              <Field label="Widget theme">
                <Chips options={STATS_THEMES} value={p.statsTheme} onChange={(v) => set("statsTheme", v)} />
              </Field>
              <Field label="📜 Latest blog posts (GitHub Action)">
                <Chips
                  options={["none", "devto", "medium", "rss"]}
                  value={p.addons.blog}
                  onChange={(v) => setAddon("blog", v as BlogSource)}
                />
              </Field>
              {p.addons.blog !== "none" && (
                <div className="space-y-2">
                  <Input
                    className="font-mono"
                    placeholder={p.addons.blog === "rss" ? "https://yourblog.com/rss.xml" : "username"}
                    value={p.addons.blogHandle}
                    onChange={(e) => setAddon("blogHandle", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Save this as <code className="font-mono">.github/workflows/blog-post-workflow.yml</code> in your profile repo:
                  </p>
                  <pre className="overflow-auto rounded-lg bg-background p-3 font-mono text-[11px] text-muted-foreground">{blogWorkflow(p)}</pre>
                  <Button size="sm" variant="secondary" onClick={() => copy(blogWorkflow(p), "Workflow copied")}>
                    <Copy className="h-4 w-4" /> Copy workflow
                  </Button>
                </div>
              )}
            </Section>

            <Section value="support" title="Support">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Buy Me a Coffee username">
                  <Input className="font-mono" value={p.support.bmc} onChange={(e) => set("support", { ...p.support, bmc: e.target.value })} />
                </Field>
                <Field label="Ko-fi username">
                  <Input className="font-mono" value={p.support.kofi} onChange={(e) => set("support", { ...p.support, kofi: e.target.value })} />
                </Field>
              </div>
              <Toggle label="GitHub Sponsors button" checked={p.support.sponsors} onChange={(v) => set("support", { ...p.support, sponsors: v })} />
            </Section>
          </Accordion>
        </aside>

        <section className={`${tab === "preview" ? "" : "hidden"} lg:block`}>
          <div className="sticky top-20 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex rounded-lg border border-border bg-card p-1">
                <Button size="sm" variant={raw ? "ghost" : "secondary"} onClick={() => setRaw(false)}>
                  <Eye className="h-4 w-4" /> Preview
                </Button>
                <Button size="sm" variant={raw ? "secondary" : "ghost"} onClick={() => setRaw(true)}>
                  <Code2 className="h-4 w-4" /> Markdown
                </Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => { downloadFile("README.md", md, "text/markdown"); toast.success("README.md downloaded"); }}>
                  <Download className="h-4 w-4" /> Download
                </Button>
                <Button size="sm" onClick={copyMd}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy Markdown"}
                </Button>
              </div>
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

function Section({ value, title, children }: { value: string; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={value} className="rounded-xl border border-border bg-card px-4">
      <AccordionTrigger className="font-mono text-xs uppercase tracking-wider text-accent hover:no-underline">{title}</AccordionTrigger>
      <AccordionContent className="space-y-3 pb-4">{children}</AccordionContent>
    </AccordionItem>
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
function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-md border px-2.5 py-1 font-mono text-xs ${value === t ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
