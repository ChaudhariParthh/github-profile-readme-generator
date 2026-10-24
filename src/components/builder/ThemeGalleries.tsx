import {
  BACKGROUND_THEMES,
  STATS_LAYOUTS,
  type AppearanceTheme,
  type StatsLayout,
} from "@/lib/appearance";
import { TEMPLATES } from "@/lib/templates";

export function TemplateGallery({ onApply }: { onApply: (id: string) => void }) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">
          Template previews{" "}
          <span className="font-normal text-muted-foreground">
            Apply a complete README starting point.
          </span>
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onApply(template.id)}
            className="group overflow-hidden rounded-xl border border-border text-left transition-colors hover:border-primary/50"
          >
            <img
              src={template.preview}
              alt={`${template.title} template preview`}
              width={1280}
              height={720}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <p className="p-2.5 text-xs font-semibold">{template.title}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function BackgroundGallery({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">
          10 Background Themes{" "}
          <span className="font-normal text-muted-foreground">
            Beautiful, unique banners for your GitHub profile README.
          </span>
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {BACKGROUND_THEMES.map((t) => (
          <ThemeCard key={t.id} theme={t} active={value === t.id} onSelect={() => onChange(t.id)} />
        ))}
      </div>
    </section>
  );
}

export function StatsGallery({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">
          {STATS_LAYOUTS.length} GitHub Stats Section Themes{" "}
          <span className="font-normal text-muted-foreground">
            Unique, non-generic stats layouts for the generated README.
          </span>
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STATS_LAYOUTS.map((t) => (
          <StatsCard
            key={t.id}
            layout={t}
            active={value === t.id}
            onSelect={() => onChange(t.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ThemeCard({
  theme,
  active,
  onSelect,
}: {
  theme: AppearanceTheme;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`overflow-hidden rounded-xl border text-left transition-colors ${active ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/50"}`}
    >
      <div
        className={`relative h-24 w-full ${theme.bannerMotion === "svg-anim" ? "theme-motion" : ""}`}
        style={{ background: theme.thumb }}
      >
        <span className="absolute left-2 top-2 font-mono text-[10px] text-white/90 drop-shadow">
          {theme.n}
        </span>
        <span className="absolute bottom-2 right-2 flex gap-1">
          {theme.palette.map((c) => (
            <span
              key={c}
              className="h-2.5 w-2.5 rounded-full border border-white/30"
              style={{ background: c }}
            />
          ))}
        </span>
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="text-xs font-semibold">{theme.name}</p>
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{theme.blurb}</p>
      </div>
    </button>
  );
}

function StatsCard({
  layout,
  active,
  onSelect,
}: {
  layout: StatsLayout;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`overflow-hidden rounded-xl border text-left transition-colors ${active ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/50"}`}
    >
      <div className="relative h-24 w-full p-2.5" style={{ background: layout.thumb }}>
        <StatsThumb kind={layout.kind} />
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="text-[10px] font-mono text-muted-foreground">{layout.n}</p>
        <p className="text-xs font-semibold">{layout.name}</p>
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
          {layout.blurb}
        </p>
      </div>
    </button>
  );
}

function StatsThumb({ kind }: { kind: StatsLayout["kind"] }) {
  const bar = "h-1.5 rounded-sm bg-white/30";
  if (kind === "strip") {
    return (
      <div className="flex h-full items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 flex-1 rounded bg-white/20" />
        ))}
      </div>
    );
  }
  if (kind === "heatmap") {
    return (
      <div className="grid h-full grid-cols-12 gap-0.5">
        {Array.from({ length: 48 }, (_, i) => (
          <div
            key={i}
            className="rounded-[1px] bg-emerald-400"
            style={{ opacity: 0.2 + ((i * 13) % 8) / 10 }}
          />
        ))}
      </div>
    );
  }
  if (kind === "langs" || kind === "neon") {
    return (
      <div className="flex h-full items-end gap-1 px-1">
        {[70, 45, 30, 18, 12].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-white/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  if (kind === "terminal" || kind === "pixel") {
    return (
      <div className="flex h-full flex-col justify-center gap-1 font-mono">
        <div className="h-1.5 w-4/5 rounded bg-emerald-400/50" />
        <div className="h-1.5 w-2/3 rounded bg-emerald-400/35" />
        <div className="h-8 w-full rounded border border-dashed border-emerald-400/40" />
      </div>
    );
  }
  return (
    <div className="grid h-full grid-cols-2 gap-1.5">
      <div className="rounded bg-white/10 p-1.5 space-y-1">
        <div className={bar} />
        <div className={`${bar} w-2/3`} />
        <div className={`${bar} w-1/2`} />
      </div>
      <div className="rounded bg-white/10 p-1.5 space-y-1">
        <div className={`${bar} w-1/2`} />
        <div className={bar} />
        <div className={`${bar} w-3/4`} />
      </div>
    </div>
  );
}
