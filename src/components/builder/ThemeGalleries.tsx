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
        <ThemeArt theme={theme} />
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

function ThemeArt({ theme }: { theme: AppearanceTheme }) {
  const [dark, mid, light] = theme.palette;
  const common = {
    fill: "none",
    stroke: light,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  let artwork: React.ReactNode;

  switch (theme.id) {
    case "midnight-aurora":
      artwork = (
        <>
          <path d="M-20 82C68 8 122 108 211 33S336 87 425 4" stroke={light} strokeWidth="15" opacity=".18" fill="none" />
          <path d="M-20 91C74 25 135 103 215 43S340 78 420 18" stroke={light} strokeWidth="4" opacity=".75" fill="none" />
          <path d="M-20 103C75 42 129 112 216 55S333 91 425 35" stroke={mid} strokeWidth="2" opacity=".8" fill="none" />
        </>
      );
      break;
    case "neon-cyber":
      artwork = (
        <>
          {Array.from({ length: 8 }, (_, i) => <path key={`v${i}`} d={`M${40 + i * 46} 0v96`} {...common} opacity=".35" />)}
          {Array.from({ length: 4 }, (_, i) => <path key={`h${i}`} d={`M0 ${18 + i * 22}h400`} {...common} opacity=".3" />)}
          <circle cx="282" cy="48" r="29" {...common} strokeWidth="2" opacity=".8" />
          <path d="M0 71h99l18-25h74l17 18h92l18-18h82" {...common} strokeWidth="3" />
          <circle cx="117" cy="46" r="3" fill={light} />
          <circle cx="300" cy="64" r="3" fill={light} />
        </>
      );
      break;
    case "terminal-hacker":
      artwork = (
        <>
          {[30, 77, 140, 212, 300, 362].map((x, i) => (
            <g key={x} opacity={0.32 + (i % 3) * 0.18}>
              <path d={`M${x} 4v${26 + ((i * 17) % 53)}`} stroke={light} strokeWidth="2" />
              <text x={x + 4} y="18" fill={light} fontSize="9" fontFamily="monospace">{i % 2 ? "10" : "01"}</text>
              <text x={x - 8} y="60" fill={light} fontSize="9" fontFamily="monospace">{"{}"}</text>
            </g>
          ))}
          <path d="M0 83h400" stroke={light} strokeWidth="1" opacity=".7" />
        </>
      );
      break;
    case "cosmic-galaxy":
      artwork = (
        <>
          {[["58", "22", "1.2"], ["330", "17", "1.4"], ["260", "74", "1"], ["130", "70", "1.6"], ["375", "54", "1"]].map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={light} opacity=".9" />
          ))}
          <ellipse cx="255" cy="46" rx="67" ry="23" transform="rotate(-18 255 46)" {...common} strokeWidth="2" opacity=".8" />
          <circle cx="255" cy="46" r="18" fill={mid} stroke={light} strokeWidth="2" />
          <circle cx="348" cy="66" r="9" fill={dark} stroke={light} strokeWidth="2" />
        </>
      );
      break;
    case "mountain-night":
      artwork = (
        <>
          <circle cx="318" cy="24" r="12" fill={light} opacity=".9" />
          <path d="M0 83 95 28l52 32 67-46 103 69Z" fill={mid} opacity=".68" />
          <path d="m85 34 10-6 12 7-8-1-6 5Zm119-13 10-7 13 8-9-2-6 7Z" fill={light} opacity=".95" />
          <path d="m0 88 100-32 67 32 80-43 153 48Z" fill={dark} opacity=".86" />
          <path d="M0 89h400" stroke={light} strokeWidth="2" opacity=".75" />
        </>
      );
      break;
    case "ocean-depths":
      artwork = (
        <>
          <path d="M-8 39c38-26 72 26 110 0s72 26 110 0 72 26 110 0 72 26 110 0" {...common} strokeWidth="3" opacity=".9" />
          <path d="M-8 59c38-26 72 26 110 0s72 26 110 0 72 26 110 0 72 26 110 0" {...common} strokeWidth="2" opacity=".7" />
          <path d="M-8 78c38-26 72 26 110 0s72 26 110 0 72 26 110 0 72 26 110 0" {...common} strokeWidth="1.5" opacity=".5" />
          <circle cx="303" cy="20" r="6" {...common} opacity=".8" />
          <circle cx="329" cy="32" r="3" {...common} opacity=".7" />
        </>
      );
      break;
    case "sunset-horizon":
      artwork = (
        <>
          <circle cx="308" cy="38" r="23" fill={light} opacity=".85" />
          <path d="M0 66h400" stroke={light} strokeWidth="2" opacity=".75" />
          <path d="M0 96V68h32V52h20v20h29V42h31v31h20V57h34v20h30V48h17v25h35V59h35v16h35V46h22v22h60v28Z" fill={dark} opacity=".83" />
          <path d="M0 80h400" stroke={light} strokeWidth="1" strokeDasharray="3 8" opacity=".6" />
        </>
      );
      break;
    case "minimal-mono":
      artwork = (
        <>
          <rect x="34" y="14" width="137" height="68" {...common} strokeWidth="2" opacity=".8" />
          <rect x="48" y="25" width="137" height="68" {...common} strokeWidth="1.5" opacity=".55" />
          <circle cx="300" cy="48" r="31" {...common} strokeWidth="2" opacity=".9" />
          <circle cx="300" cy="48" r="18" {...common} strokeWidth="1" opacity=".7" />
          <path d="M239 48h122M300 0v96" {...common} opacity=".35" />
        </>
      );
      break;
    case "glass-prism":
      artwork = (
        <>
          <path d="m35 91 83-77 64 61-57 21Z" fill={light} opacity=".24" stroke={light} strokeWidth="2" />
          <path d="m118 14 93 2 65 78-151-19Z" fill={mid} opacity=".45" stroke={light} strokeWidth="2" />
          <path d="m211 16 142 18 24 50-101 10Z" fill={light} opacity=".2" stroke={light} strokeWidth="2" />
          <path d="m118 14 29 58m64-56 1 76m70-54-21 57" stroke={light} opacity=".65" />
        </>
      );
      break;
    case "editorial-light":
      artwork = (
        <>
          <circle cx="318" cy="30" r="20" fill={light} opacity=".82" />
          <path d="M46 14h101v68H46zM163 26h48v56h-48zM225 39h19v43h-19z" fill={mid} opacity=".22" stroke={dark} strokeWidth="1.5" />
          <path d="M0 83h400M59 25h62m-62 9h49m-49 9h40m59-4h27m-27 9h27" stroke={dark} strokeWidth="1.2" opacity=".72" />
        </>
      );
      break;
    default:
      artwork = null;
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 96"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {artwork}
    </svg>
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
