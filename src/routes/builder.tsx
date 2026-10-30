import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Code2,
  Copy,
  Eye,
  FileJson,
  GithubIcon,
  GripVertical,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { ReadmePreview } from "@/components/ReadmePreview";
import { SkillPicker } from "@/components/builder/SkillPicker";
import { BackgroundGallery, StatsGallery } from "@/components/builder/ThemeGalleries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BannerAdjustDialog } from "@/components/builder/BannerAdjustDialog";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BADGE_STYLES,
  BUILTIN_SECTIONS,
  SOCIAL_META,
  TECH_DISPLAYS,
  TYPING_FONTS,
  blogWorkflow,
  parseConfig,
  safeUrl,
  seedProfile,
  toMarkdown,
  type BlogSource,
  type BuiltinId,
  type Profile,
  type Work,
} from "@/lib/profile";
import { applyAppearance, applyStatsTheme, appearanceById } from "@/lib/appearance";
import { renderStatsSection } from "@/lib/profile";
import { mdToHtml } from "@/components/ReadmePreview";
import { sanitizeHtml } from "@/lib/sanitize";
import { fetchGitHubProfile } from "@/lib/github";
import { moveItem } from "@/lib/reorder";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Builder â€” GitProfile Studio" },
      {
        name: "description",
        content:
          "Build your GitHub profile README with real tech logos, animated headers, stats widgets and a live preview.",
      },
      { property: "og:title", content: "Builder â€” GitProfile Studio" },
      {
        property: "og:description",
        content:
          "Live GitHub README builder with tech icons, section manager and Markdown export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Builder,
});

const DRAFT_KEY = "gitprofile-studio:draft";

function downloadFile(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

async function prepareBannerImage(file: File): Promise<string> {
  const isImage = file.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name);
  if (!isImage || file.size > 10 * 1024 * 1024) {
    throw new Error("Choose an image (PNG, JPG, JPEG, WebP, GIF) smaller than 10 MB.");
  }

  // Use FileReader as the primary reader (immune to blob: CSP restrictions)
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("That image could not be read."));
      }
    };
    reader.onerror = () => reject(new Error("That image could not be read."));
    reader.readAsDataURL(file);
  });

  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("That image could not be read."));
    image.src = dataUrl;
  });

  const width = 1600;
  const height = 600;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare that image.");

  const scale = Math.max(width / (image.naturalWidth || 1), height / (image.naturalHeight || 1));
  const drawnWidth = image.naturalWidth * scale;
  const drawnHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    (width - drawnWidth) / 2,
    (height - drawnHeight) / 2,
    drawnWidth,
    drawnHeight,
  );
  return canvas.toDataURL("image/jpeg", 0.88);
}

const WORK_FIELDS: { key: keyof Work; label: string; placeholder: string }[] = [
  { key: "working", label: "Currently working on", placeholder: "project name" },
  { key: "workingLink", label: "Project link", placeholder: "https://..." },
  { key: "collab", label: "Looking to collaborate on", placeholder: "project or idea" },
  { key: "collabLink", label: "Collaboration link", placeholder: "https://..." },
  { key: "learning", label: "Currently learning", placeholder: "frameworks, courses etc." },
  { key: "askMe", label: "Ask me about", placeholder: "react, vue and gsap" },
  { key: "reach", label: "How to reach me", placeholder: "you@example.com" },
  { key: "blog", label: "Blog link", placeholder: "https://blog..." },
  { key: "resume", label: "Resume link", placeholder: "https://..." },
  { key: "funFact", label: "Fun fact", placeholder: "I think I am funny" },
];

const sectionLabel = (p: Profile, id: string) =>
  (BUILTIN_SECTIONS as Record<string, string>)[id] ??
  (p.custom[id]?.title.trim() || "Custom section");

function Builder() {
  const [p, setP] = useState<Profile>(seedProfile);
  const [tab, setTab] = useState<"editor" | "preview">("editor");
  const [active, setActive] = useState<string>("header");
  const [previewTab, setPreviewTab] = useState<"preview" | "markdown" | "import">("preview");
  const [copied, setCopied] = useState(false);
  const [drag, setDrag] = useState<number | null>(null);
  const [ghLoading, setGhLoading] = useState(false);
  const [ghInfo, setGhInfo] = useState<{ repos: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [adjustImageSrc, setAdjustImageSrc] = useState<string | null>(null);
  const md = useMemo(() => toMarkdown(p), [p]);

  // Restore a saved draft after mount (browser storage isn't available during server render).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        setP(parseConfig(JSON.parse(saved)));
        toast("Restored your saved draft");
      }
    } catch {
      /* ignore corrupt drafts */
    }
  }, []);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((s) => ({ ...s, [k]: v }));
  const setWork = (k: keyof Work, v: string) =>
    setP((s) => ({ ...s, work: { ...s.work, [k]: v } }));
  const setAddon = <K extends keyof Profile["addons"]>(k: K, v: Profile["addons"][K]) =>
    setP((s) => ({ ...s, addons: { ...s.addons, [k]: v } }));
  const setTyping = <K extends keyof Profile["typing"]>(k: K, v: Profile["typing"][K]) =>
    setP((s) => ({ ...s, typing: { ...s.typing, [k]: v } }));

  const copy = async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(msg);
    } catch {
      toast.error("Your browser blocked copying. Use the Markdown view and copy manually.");
    }
  };
  const copyMd = async () => {
    await copy(md, "Markdown copied");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const saveDraft = () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(p));
      toast.success("Draft saved in this browser");
    } catch {
      toast.error("Couldn't save the draft (browser storage is full or disabled).");
    }
  };
  const importJson = async (file: File) => {
    try {
      setP(parseConfig(JSON.parse(await file.text())));
      toast.success("Config restored");
    } catch {
      toast.error("That file isn't a valid GitProfile Studio config");
    }
  };
  const importBannerImage = async (file: File) => {
    try {
      const isImage =
        file.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name);
      if (!isImage || file.size > 10 * 1024 * 1024) {
        throw new Error("Choose an image (PNG, JPG, JPEG, WebP, GIF) smaller than 10 MB.");
      }
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") resolve(reader.result);
          else reject(new Error("That image could not be read."));
        };
        reader.onerror = () => reject(new Error("That image could not be read."));
        reader.readAsDataURL(file);
      });
      // Apply default crop
      const defaultCropped = await prepareBannerImage(file);
      setP((s) => ({ ...s, bannerUrl: defaultCropped, customBanner: true }));
      // Open adjustment dialog for fine-tuning position & zoom
      setAdjustImageSrc(dataUrl);
      setAdjustDialogOpen(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "That image could not be used.");
    }
  };
  const importGitHub = async (username?: string) => {
    setGhLoading(true);
    try {
      const { user, top, languages, warning } = await fetchGitHubProfile(username ?? p.username);
      const repos = top.map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description ?? null,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
      }));
      const totalStars = top.reduce((sum, r) => sum + r.stargazers_count, 0);
      const totalForks = top.reduce((sum, r) => sum + r.forks_count, 0);
      setP((s) => ({
        ...s,
        username: user.login,
        name: user.name || s.name,
        bio: user.bio || s.bio,
        location: user.location || s.location,
        socials: {
          ...s.socials,
          GitHub: user.login,
          ...(user.twitter_username ? { X: user.twitter_username } : {}),
          ...(user.blog ? { Portfolio: user.blog } : {}),
        },
        projects: top.length
          ? top.map((r) => ({ name: r.name, url: r.html_url, description: r.description ?? "" }))
          : s.projects,
        sections: top.length
          ? s.sections.map((x) => (x.id === "projects" ? { ...x, hidden: false } : x))
          : s.sections,
      }));
      setGhInfo({ repos: user.public_repos });
      toast.success(`Imported public profile for ${user.login}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "GitHub import failed");
    } finally {
      setGhLoading(false);
    }
  };

  // ----- section management -----
  const toggleHidden = (id: string) =>
    set(
      "sections",
      p.sections.map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s)),
    );
  const removeSection = (id: string) => {
    const custom = { ...p.custom };
    delete custom[id];
    setP((s) => ({ ...s, sections: s.sections.filter((x) => x.id !== id), custom }));
    if (active === id) setActive(p.sections.find((x) => x.id !== id)?.id ?? "header");
  };
  const addSection = (id: BuiltinId | "custom") => {
    if (id === "custom") {
      const cid = `custom-${Date.now().toString(36)}`;
      setP((s) => ({
        ...s,
        sections: [...s.sections, { id: cid, hidden: false }],
        custom: { ...s.custom, [cid]: { title: "New section", body: "" } },
      }));
      setActive(cid);
    } else {
      set("sections", [...p.sections, { id, hidden: false }]);
      setActive(id);
    }
  };
  const missing = (Object.keys(BUILTIN_SECTIONS) as BuiltinId[]).filter(
    (id) => !p.sections.some((s) => s.id === id),
  );
  const activeEntry = p.sections.find((s) => s.id === active);

  const exportJson = () =>
    downloadFile("gitprofile-config.json", JSON.stringify(p, null, 2), "application/json");
  const downloadReadme = () => {
    downloadFile("README.md", md, "text/markdown;charset=utf-8");
    toast.success("README.md downloaded");
  };
  const jumpPreview = () => {
    setTab("preview");
    requestAnimationFrame(() =>
      document
        .getElementById("readme-preview")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <div className="min-h-screen">
      <SiteHeader
        builder={{
          onSave: saveDraft,
          onDownload: downloadReadme,
          onExport: exportJson,
          onPreview: jumpPreview,
        }}
      />
      <div className="sticky top-14 z-20 flex border-b border-border bg-background xl:hidden">
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
      <input
        ref={bannerFileRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp,.png,.jpg,.jpeg,.webp,.gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) importBannerImage(f);
          e.target.value = "";
        }}
      />

      <main className="mx-auto grid max-w-[1680px] gap-3 p-3 md:p-4 xl:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Section manager */}
        <nav className={`${tab === "editor" ? "" : "hidden"} xl:block`}>
          <div className="space-y-1 rounded-xl border border-border bg-card p-2 xl:sticky xl:top-[4.25rem]">
            <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Customize Sections
            </p>
            {p.sections.map((s, i) => (
              <div
                key={s.id}
                draggable
                onDragStart={() => setDrag(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (drag !== null) set("sections", moveItem(p.sections, drag, i));
                  setDrag(null);
                }}
                onClick={() => setActive(s.id)}
                className={`group flex cursor-pointer items-center gap-1.5 rounded-lg border px-1.5 py-1.5 text-sm ${active === s.id ? "border-primary/60 bg-primary/10" : "border-transparent hover:bg-secondary"} ${drag === i ? "opacity-40" : ""}`}
              >
                <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                <span
                  className={`flex-1 truncate ${s.hidden ? "text-muted-foreground line-through" : ""}`}
                >
                  {sectionLabel(p, s.id)}
                </span>
                <Switch
                  aria-label={`Show ${sectionLabel(p, s.id)}`}
                  checked={!s.hidden}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleHidden(s.id)}
                  className="scale-75"
                />
              </div>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4" /> Add section
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {missing.map((id) => (
                  <DropdownMenuItem key={id} onClick={() => addSection(id)}>
                    {BUILTIN_SECTIONS[id]}
                  </DropdownMenuItem>
                ))}
                {missing.length > 0 && <DropdownMenuSeparator />}
                <DropdownMenuItem onClick={() => addSection("custom")}>
                  Custom section
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Section editor */}
        <section className={`${tab === "editor" ? "" : "hidden"} xl:block`}>
          <div className="space-y-4 rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="mr-auto text-base font-semibold">{sectionLabel(p, active)}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Config
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => fileRef.current?.click()}>
                    <Upload className="h-4 w-4" /> Restore config
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportJson}>
                    <FileJson className="h-4 w-4" /> Export JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset everything?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your changes and saved draft will be replaced with the sample profile. Export
                      first if you want to keep them.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setP(seedProfile);
                        setActive("header");
                        setGhInfo(null);
                        try {
                          localStorage.removeItem(DRAFT_KEY);
                        } catch {
                          /* ignore */
                        }
                        toast("Reset to the sample profile");
                      }}
                    >
                      Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {activeEntry && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Move up"
                    onClick={() => {
                      const i = p.sections.indexOf(activeEntry);
                      set("sections", moveItem(p.sections, i, i - 1));
                    }}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Move down"
                    onClick={() => {
                      const i = p.sections.indexOf(activeEntry);
                      set("sections", moveItem(p.sections, i, i + 1));
                    }}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toggleHidden(active)}>
                    <Eye className="h-4 w-4" /> {activeEntry.hidden ? "Show" : "Hide"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => removeSection(active)}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </>
              )}
            </div>
            {activeEntry?.hidden && (
              <p className="rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
                This section is hidden and won't appear in your README.
              </p>
            )}

            {active === "header" && (
              <>
                <p className="text-xs text-muted-foreground">
                  Set your basic information and profile style.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name">
                    <Input
                      value={p.name}
                      maxLength={80}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </Field>
                  <Field label="GitHub username">
                    <div className="flex gap-2">
                      <Input
                        className="font-mono"
                        value={p.username}
                        maxLength={39}
                        onChange={(e) => set("username", e.target.value.replace(/\s/g, ""))}
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        aria-label="Import from GitHub"
                        title="Import public GitHub profile"
                        onClick={() => importGitHub()}
                        disabled={ghLoading || !p.username}
                      >
                        {ghLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <GithubIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Field>
                  <Field label="Role / Title">
                    <Input
                      value={p.title}
                      maxLength={120}
                      onChange={(e) => set("title", e.target.value)}
                    />
                  </Field>
                  <Field label="Location">
                    <Input
                      value={p.location}
                      maxLength={60}
                      onChange={(e) => set("location", e.target.value)}
                    />
                  </Field>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tap the GitHub button to fill in your real public name, bio, location and top
                  repositories.
                  {ghInfo && ` Found ${ghInfo.repos} public repositories.`}
                </p>
                <Field label={`About Me (${p.bio.length}/500)`}>
                  <Textarea
                    rows={3}
                    maxLength={500}
                    value={p.bio}
                    onChange={(e) => set("bio", e.target.value)}
                  />
                </Field>
                <div>
                  <Field label="Banner / Cover">
                    {safeUrl(p.bannerUrl) && (
                      <img
                        src={safeUrl(p.bannerUrl)}
                        alt=""
                        className="mb-2 h-16 w-full rounded-lg object-cover"
                      />
                    )}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => bannerFileRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" /> Choose photo
                      </Button>
                      {safeUrl(p.bannerUrl) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setAdjustImageSrc(p.bannerUrl);
                            setAdjustDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" /> Edit / Adjust
                        </Button>
                      )}
                    </div>
                    <UrlField
                      label="Or paste a custom banner image URL"
                      value={p.bannerUrl}
                      onChange={(v) => setP((s) => ({ ...s, bannerUrl: v, customBanner: true }))}
                      hint="Photos are center-cropped to a 1600 Ã— 600 banner and kept in this browser."
                      placeholder="https://example.com/banner.jpg"
                    />
                    <div className="mt-1.5 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          setP((s) => {
                            const theme = appearanceById(s.appearanceId);
                            return { ...s, bannerUrl: theme.bannerUrl, customBanner: false };
                          })
                        }
                      >
                        Use theme banner
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setP((s) => ({ ...s, bannerUrl: "", customBanner: true }))}
                      >
                        Remove
                      </Button>
                    </div>
                  </Field>
                </div>
                <Field label="Custom accent color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      aria-label="Accent color"
                      value={`#${/^[0-9a-f]{6}$/i.test(p.accentColor) ? p.accentColor : "8B5CF6"}`}
                      onChange={(e) => set("accentColor", e.target.value.slice(1).toUpperCase())}
                      className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                    />
                    <Input
                      className="font-mono"
                      value={p.accentColor}
                      maxLength={6}
                      onChange={(e) =>
                        set("accentColor", e.target.value.replace(/[^0-9a-f]/gi, ""))
                      }
                    />
                  </div>
                </Field>
              </>
            )}

            {active === "typing" && (
              <>
                <Field label="Lines (one per line, typed in sequence)">
                  <Textarea
                    rows={4}
                    className="font-mono"
                    value={p.typing.lines}
                    onChange={(e) => setTyping("lines", e.target.value)}
                  />
                </Field>
                <Field label="Font">
                  <Chips
                    options={[...TYPING_FONTS]}
                    value={p.typing.font}
                    onChange={(v) => setTyping("font", v as Profile["typing"]["font"])}
                  />
                </Field>
                <p className="text-xs text-muted-foreground">
                  This font changes the typing-animation image only. GitHub controls the README body
                  font.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={`Size: ${p.typing.size}px`}>
                    <input
                      type="range"
                      min={12}
                      max={40}
                      value={p.typing.size}
                      onChange={(e) => setTyping("size", Number(e.target.value))}
                      className="w-full accent-[var(--primary)]"
                    />
                  </Field>
                  <Field label="Color">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        aria-label="Typing color"
                        value={`#${/^[0-9a-f]{6}$/i.test(p.typing.color) ? p.typing.color : "22D3EE"}`}
                        onChange={(e) => setTyping("color", e.target.value.slice(1).toUpperCase())}
                        className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                      />
                      <Input
                        className="font-mono"
                        value={p.typing.color}
                        maxLength={6}
                        onChange={(e) =>
                          setTyping("color", e.target.value.replace(/[^0-9a-f]/gi, ""))
                        }
                      />
                    </div>
                  </Field>
                </div>
                <Toggle
                  label="Center align"
                  checked={p.typing.center}
                  onChange={(v) => setTyping("center", v)}
                />
              </>
            )}

            {active === "visitors" && (
              <p className="text-sm text-muted-foreground">
                Shows a live profile-view counter for{" "}
                <span className="font-mono">{p.username || "your username"}</span>. Counts start
                once the README is on GitHub.
              </p>
            )}

            {active === "about" && (
              <Field label={`About me (${p.bio.length}/500)`}>
                <Textarea
                  rows={5}
                  maxLength={500}
                  value={p.bio}
                  onChange={(e) => set("bio", e.target.value)}
                />
              </Field>
            )}

            {active === "work" && (
              <div className="grid gap-3 sm:grid-cols-2">
                {WORK_FIELDS.map((f) =>
                  f.key.endsWith("Link") || f.key === "blog" || f.key === "resume" ? (
                    <UrlField
                      key={f.key}
                      label={f.label}
                      value={p.work[f.key]}
                      onChange={(v) => setWork(f.key, v)}
                    />
                  ) : (
                    <Field key={f.key} label={f.label}>
                      <Input
                        placeholder={f.placeholder}
                        maxLength={120}
                        value={p.work[f.key]}
                        onChange={(e) => setWork(f.key, e.target.value)}
                      />
                    </Field>
                  ),
                )}
              </div>
            )}

            {active === "skills" && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Display as">
                    <Chips
                      options={[...TECH_DISPLAYS]}
                      value={p.techDisplay}
                      onChange={(v) => set("techDisplay", v as Profile["techDisplay"])}
                    />
                  </Field>
                  {p.techDisplay === "badges" && (
                    <Field label="Badge style">
                      <Chips
                        options={[...BADGE_STYLES]}
                        value={p.badgeStyle}
                        onChange={(v) => set("badgeStyle", v as Profile["badgeStyle"])}
                      />
                    </Field>
                  )}
                </div>
                <SkillPicker value={p.skills} onChange={(v) => set("skills", v)} techDisplay={p.techDisplay} />
              </>
            )}

            {active === "projects" && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  GitHub repository links show as live pinned-repo cards. Other links show as a
                  list.
                </p>
                {p.projects.map((pr, i) => (
                  <div key={i} className="space-y-2 rounded-lg border border-border p-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Project name"
                        value={pr.name}
                        maxLength={80}
                        onChange={(e) =>
                          set(
                            "projects",
                            p.projects.map((x, j) =>
                              j === i ? { ...x, name: e.target.value } : x,
                            ),
                          )
                        }
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Move up"
                        onClick={() => set("projects", moveItem(p.projects, i, i - 1))}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Remove project"
                        onClick={() =>
                          set(
                            "projects",
                            p.projects.filter((_, j) => j !== i),
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <UrlField
                      label=""
                      value={pr.url}
                      onChange={(v) =>
                        set(
                          "projects",
                          p.projects.map((x, j) => (j === i ? { ...x, url: v } : x)),
                        )
                      }
                    />
                    <Input
                      placeholder="Short description"
                      value={pr.description}
                      maxLength={160}
                      onChange={(e) =>
                        set(
                          "projects",
                          p.projects.map((x, j) =>
                            j === i ? { ...x, description: e.target.value } : x,
                          ),
                        )
                      }
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Gradient start color">
                        <div className="flex gap-2">
                          <input
                            type="color"
                            aria-label="Gradient start color"
                            value={`#${/^[0-9a-f]{6}$/i.test(pr.gradientStart || "") ? pr.gradientStart : "8B5CF6"}`}
                            onChange={(e) =>
                              set(
                                "projects",
                                p.projects.map((x, j) =>
                                  j === i
                                    ? { ...x, gradientStart: e.target.value.slice(1).toUpperCase() }
                                    : x,
                                ),
                              )
                            }
                            className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                          />
                          <Input
                            className="font-mono"
                            value={pr.gradientStart || "8B5CF6"}
                            maxLength={6}
                            onChange={(e) =>
                              set(
                                "projects",
                                p.projects.map((x, j) =>
                                  j === i
                                    ? { ...x, gradientStart: e.target.value.replace(/[^0-9a-f]/gi, "") }
                                    : x,
                                ),
                              )
                            }
                          />
                        </div>
                      </Field>
                      <Field label="Gradient end color">
                        <div className="flex gap-2">
                          <input
                            type="color"
                            aria-label="Gradient end color"
                            value={`#${/^[0-9a-f]{6}$/i.test(pr.gradientEnd || "") ? pr.gradientEnd : "22D3EE"}`}
                            onChange={(e) =>
                              set(
                                "projects",
                                p.projects.map((x, j) =>
                                  j === i
                                    ? { ...x, gradientEnd: e.target.value.slice(1).toUpperCase() }
                                    : x,
                                ),
                              )
                            }
                            className="h-9 w-12 cursor-pointer rounded border border-border bg-transparent"
                          />
                          <Input
                            className="font-mono"
                            value={pr.gradientEnd || "22D3EE"}
                            maxLength={6}
                            onChange={(e) =>
                              set(
                                "projects",
                                p.projects.map((x, j) =>
                                  j === i
                                    ? { ...x, gradientEnd: e.target.value.replace(/[^0-9a-f]/gi, "") }
                                    : x,
                                ),
                              )
                            }
                          />
                        </div>
                      </Field>
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={p.projects.length >= 8}
                  onClick={() =>
                    set("projects", [...p.projects, { name: "", url: "", description: "", gradientStart: "8B5CF6", gradientEnd: "22D3EE" }])
                  }
                >
                  <Plus className="h-4 w-4" /> Add project
                </Button>
              </div>
            )}

            {(active === "trophies" || active === "graph") && (
              <>
                <p className="text-xs text-muted-foreground">
                  Widgets are live images from public GitHub stats services. If a service is busy,
                  the preview shows a placeholder. Numbers are never invented.
                </p>
              </>
            )}

            {active === "stats" && (
              <>
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Select the widgets you want to show in your README stats section:
                  </p>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={p.addons.stats}
                      onCheckedChange={(checked) => setAddon("stats", checked)}
                    />
                    <label className="text-sm">Stats card</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={p.addons.langs}
                      onCheckedChange={(checked) => setAddon("langs", checked)}
                    />
                    <label className="text-sm">Top languages</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={p.addons.streak}
                      onCheckedChange={(checked) => setAddon("streak", checked)}
                    />
                    <label className="text-sm">Contribution streak</label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Stats design is independent of the background theme. Pick a layout below — it
                    changes the generated Markdown, not just this editor.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 overflow-auto max-h-[200px]">
                  {(() => {
                    const lines = renderStatsSection(p);
                    if (lines.length === 0) {
                      return (
                        <p className="text-xs text-muted-foreground italic">
                          Stats section is not enabled. Add it in the Sections tab.
                        </p>
                      );
                    }
                    const html = sanitizeHtml(mdToHtml(lines.join("\n")));
                    return <div className="text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
                  })()}
                </div>
              </>
            )}

            {active === "blog" && (
              <>
                <Field label="Blog source">
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
                      placeholder={
                        p.addons.blog === "rss" ? "https://yourblog.com/rss.xml" : "username"
                      }
                      value={p.addons.blogHandle}
                      onChange={(e) => setAddon("blogHandle", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Save this as{" "}
                      <code className="font-mono">.github/workflows/blog-post-workflow.yml</code> in
                      your profile repo:
                    </p>
                    <pre className="overflow-auto rounded-lg bg-background p-3 font-mono text-[11px] text-muted-foreground">
                      {blogWorkflow(p)}
                    </pre>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copy(blogWorkflow(p), "Workflow copied")}
                    >
                      <Copy className="h-4 w-4" /> Copy workflow
                    </Button>
                  </div>
                )}
              </>
            )}

            {active === "socials" && (
              <>
                <Field label="Badge style">
                  <Chips
                    options={[...BADGE_STYLES]}
                    value={p.badgeStyle}
                    onChange={(v) => set("badgeStyle", v as Profile["badgeStyle"])}
                  />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(SOCIAL_META).map(([platform, meta]) => (
                    <Field key={platform} label={platform}>
                      <Input
                        className="font-mono"
                        placeholder={meta.placeholder}
                        maxLength={120}
                        value={p.socials[platform] ?? ""}
                        onChange={(e) =>
                          set("socials", { ...p.socials, [platform]: e.target.value })
                        }
                      />
                    </Field>
                  ))}
                </div>
              </>
            )}

            {active === "support" && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Buy Me a Coffee username">
                    <Input
                      className="font-mono"
                      value={p.support.bmc}
                      onChange={(e) => set("support", { ...p.support, bmc: e.target.value })}
                    />
                  </Field>
                  <Field label="Ko-fi username">
                    <Input
                      className="font-mono"
                      value={p.support.kofi}
                      onChange={(e) => set("support", { ...p.support, kofi: e.target.value })}
                    />
                  </Field>
                  <UrlField
                    label="Buy Me a Chai page"
                    value={p.support.chai}
                    onChange={(v) => set("support", { ...p.support, chai: v })}
                    hint="Use your https://www.buymeachai.in profile link."
                  />
                </div>
                <Toggle
                  label="GitHub Sponsors button"
                  checked={p.support.sponsors}
                  onChange={(v) => set("support", { ...p.support, sponsors: v })}
                />
              </>
            )}

            {p.custom[active] && (
              <>
                <Field label="Heading">
                  <Input
                    value={p.custom[active]!.title}
                    maxLength={80}
                    onChange={(e) =>
                      set("custom", {
                        ...p.custom,
                        [active]: { ...p.custom[active]!, title: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Content (plain text, **bold**, [links](https://â€¦) and - bullets)">
                  <Textarea
                    rows={6}
                    value={p.custom[active]!.body}
                    maxLength={2000}
                    onChange={(e) =>
                      set("custom", {
                        ...p.custom,
                        [active]: { ...p.custom[active]!, body: e.target.value },
                      })
                    }
                  />
                </Field>
              </>
            )}

            {!activeEntry && (
              <p className="text-sm text-muted-foreground">
                Pick a section on the left to edit it.
              </p>
            )}
          </div>
        </section>

        {/* Preview */}
        <section id="readme-preview" className={`${tab === "preview" ? "" : "hidden"} xl:block`}>
          <div className="space-y-3 xl:sticky xl:top-[4.25rem]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Live GitHub README Preview</h2>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-lg border border-border bg-card p-1">
                  <Button
                    size="sm"
                    variant={previewTab === "preview" ? "secondary" : "ghost"}
                    onClick={() => setPreviewTab("preview")}
                  >
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                  <Button
                    size="sm"
                    variant={previewTab === "markdown" ? "secondary" : "ghost"}
                    onClick={() => setPreviewTab("markdown")}
                  >
                    <Code2 className="h-4 w-4" /> Markdown
                  </Button>
                  <Button
                    size="sm"
                    variant={previewTab === "import" ? "secondary" : "ghost"}
                    onClick={() => setPreviewTab("import")}
                  >
                    <GithubIcon className="h-4 w-4" /> Import
                  </Button>
                </div>
                <Button size="sm" onClick={copyMd}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy Markdown"}
                </Button>
              </div>
            </div>
            <div className="max-h-[calc(100vh-8.5rem)] overflow-auto rounded-xl">
              {previewTab === "import" ? (
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold">Import from GitHub</h3>
                    <p className="text-xs text-muted-foreground">
                      Enter your GitHub username to import your public profile bio, social links,
                      and top repositories.
                    </p>
                  </div>
                  <div className="relative max-w-sm">
                    <Input
                      type="text"
                      placeholder="Enter GitHub username"
                      value={p.username}
                      maxLength={39}
                      onChange={(e) => set("username", e.target.value.replace(/\s/g, ""))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && p.username.trim() && !ghLoading) {
                          importGitHub();
                        }
                      }}
                      className="font-mono pr-9 h-9 text-xs bg-background/50 border-border/80 focus-visible:ring-1"
                    />
                    <button
                      type="button"
                      onClick={() => importGitHub()}
                      disabled={ghLoading || !p.username.trim()}
                      title="Import from GitHub"
                      aria-label="Import from GitHub"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {ghLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <GithubIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ) : previewTab === "markdown" ? (
                <pre className="whitespace-pre-wrap break-all rounded-xl border border-border bg-card p-5 font-mono text-xs leading-relaxed text-muted-foreground">
                  {md}
                </pre>
              ) : (
                <ReadmePreview p={p} onImport={importGitHub} />
              )}
            </div>
          </div>
        </section>
      </main>

      <div
        className={`${tab === "editor" ? "" : "hidden"} xl:block mx-auto max-w-[1680px] space-y-6 px-3 pb-8 md:px-4`}
      >
        <BackgroundGallery
          value={p.appearanceId}
          onChange={(id) => setP((s) => applyAppearance(s, id))}
        />
        <StatsGallery value={p.statsTheme} onChange={(id) => setP((s) => applyStatsTheme(s, id))} />
      </div>

      <BannerAdjustDialog
        open={adjustDialogOpen}
        onOpenChange={setAdjustDialogOpen}
        imageSrc={adjustImageSrc}
        onSave={(newBannerUrl) => {
          setP((s) => ({ ...s, bannerUrl: newBannerUrl, customBanner: true }));
          toast.success("Banner updated");
        }}
      />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      {label && <Label className="text-xs text-muted-foreground">{label}</Label>}
      {children}
    </div>
  );
}
function UrlField({
  label,
  value,
  onChange,
  hint,
  placeholder = "https://...",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  const bad = value.trim() !== "" && !safeUrl(value);
  return (
    <Field label={label}>
      <Input
        className={`font-mono ${bad ? "border-destructive" : ""}`}
        type="url"
        placeholder={placeholder}
        maxLength={500}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={bad}
      />
      {bad ? (
        <p className="text-xs text-destructive">
          Only full http(s) links are allowed â€” this one will be left out.
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </Field>
  );
}
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
function Chips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-md border px-2.5 py-1 font-mono text-xs ${value === t ? "border-accent text-accent" : "border-border text-muted-foreground hover:text-foreground"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
