import type { StatsTheme } from "@/lib/appearance";

/** Shared sample data for gallery previews only. Never leaks into README export. */
const SAMPLE = {
  repos: [
    {
      name: "awesome-project",
      url: "https://github.com/sample-user/awesome-project",
      description: "A sample project",
      stars: 1200,
      forks: 150,
      language: "TypeScript",
    },
    {
      name: "cli-tool",
      url: "https://github.com/sample-user/cli-tool",
      description: "Command line utility",
      stars: 800,
      forks: 90,
      language: "Go",
    },
    {
      name: "web-app",
      url: "https://github.com/sample-user/web-app",
      description: "React web application",
      stars: 2000,
      forks: 250,
      language: "JavaScript",
    },
  ],
  languages: ["TypeScript", "JavaScript", "Go", "Python", "Rust"],
  totalStars: 4600,
  totalForks: 550,
  warning: null,
};

const cardBase = "rounded-lg p-2 border border-border/30 bg-card/30";
const labelBase = "text-[8px] font-mono text-muted-foreground";
const valueBase = "text-xs font-bold text-foreground";

/** Build a badge row like: ★ Total Stars: 3.1k */
function badgeRow(label: string, value: string, color: string, icon: string) {
  return (
    <div className="flex items-center gap-1 mb-1">
      <span className={labelBase}>{icon}</span>
      <span className={labelBase}>{label}</span>
      <span className={valueBase} style={{ color }}>
        {value}
      </span>
    </div>
  );
}

/** Language progress bar */
function langBar(name: string, pct: number, color: string) {
  return (
    <div key={name} className="flex flex-col gap-1">
      <div className="flex justify-between text-[10px] font-mono">
        <span className={labelBase}>{name}</span>
        <span className={valueBase}>{pct}%</span>
      </div>
      <div className="h-1 rounded bg-white/10">
        <div
          className="h-full rounded bg-gradient-to-r from-gray-500 to-white"
          style={{ width: `${pct}%`, color }}
        />
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 01 — Developer Command Center
   Badges + table + languages, violet accent
   ========================================================================== */
function PreviewCommandCenter() {
  return (
    <div className="flex flex-col gap-2 h-full text-[8px] font-mono text-muted-foreground">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-[#8B5CF6] font-bold">★</span>
          <span className={labelBase}>Total Stars:</span>
          <span className={valueBase} style={{ color: "#8B5CF6" }}>
            {SAMPLE.totalStars}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#8B5CF6] font-bold">👥</span>
          <span className={labelBase}>Followers:</span>
          <span className={valueBase} style={{ color: "#8B5CF6" }}>
            {SAMPLE.totalStars}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#8B5CF6] font-bold">🍴</span>
          <span className={labelBase}>Total Forks:</span>
          <span className={valueBase} style={{ color: "#8B5CF6" }}>
            {SAMPLE.totalForks}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#8B5CF6] font-bold">📦</span>
          <span className={labelBase}>Public Repos:</span>
          <span className={valueBase} style={{ color: "#8B5CF6" }}>
            {SAMPLE.repos.length}
          </span>
        </div>
      </div>
      <div className="mt-1 border border-border/30 rounded bg-black/30 p-1 text-[8px]">
        <table className="w-full text-left text-[7px]">
          <tbody>
            {SAMPLE.repos.map((r) => (
              <tr key={r.name} className="text-[6px]">
                <td className="py-0">{r.name}</td>
                <td className="py-0 text-right">{r.stars}</td>
                <td className="py-0 text-right">{r.forks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2">
        {SAMPLE.languages.slice(0, 3).map((l) => (
          <span
            key={l}
            className="rounded px-2 py-0.5 border border-border/30 text-[7px] bg-black/30"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 02 — Terminal Analytics
   Dark terminal with green monospace text
   ========================================================================== */
function PreviewTerminalAnalytics() {
  return (
    <div className="h-full rounded-lg p-2 bg-[#052e16] border border-[#166534] text-[8px] font-mono text-[#4ADE80]">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[#4ADE80] font-bold">$</span>
        <span className="text-[#4ADE80]/70">node stats.js --user sample-user</span>
      </div>
      <div className="space-y-1 text-[#4ADE80]/80">
        <div className="flex justify-between">
          <span>Public Repos:</span>
          <span>{SAMPLE.repos.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Stars:</span>
          <span>{SAMPLE.totalStars}</span>
        </div>
        <div className="flex justify-between">
          <span>Followers:</span>
          <span>{SAMPLE.totalStars}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Forks:</span>
          <span>{SAMPLE.totalForks}</span>
        </div>
      </div>
      <div className="mt-1 text-[#4ADE80]/40">
        {[1, 2, 3, 4, 5].map((wk) => (
          <div key={wk} className="flex gap-0.5 mb-0.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <div key={d} className="h-1 w-1.5 rounded bg-[#4ADE80]/20" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 03 — Contribution Heatmap
   CSS grid heatmap + summary metrics
   ========================================================================== */
function PreviewContributionHeatmap() {
  return (
    <div className="h-full flex flex-col gap-1">
      <div className="flex-1 rounded-lg p-1 bg-[#052e16] border border-[#166534] grid grid-cols-7 gap-0.5 text-[7px]">
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <div key={d} className="text-center text-[6px] text-white/50">
            {["S", "M", "T", "W", "T", "F", "S"][d - 1]}
          </div>
        ))}
        {[...Array(52)].map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded bg-[#052e16]/40 border border-[#166534]/30" />
        ))}
      </div>
      <div className="flex justify-between text-[8px] font-mono text-[#4ADE80]">
        <span>Repos: {SAMPLE.repos.length}</span>
        <span>Stars: {SAMPLE.totalStars}</span>
        <span>Forks: {SAMPLE.totalForks}</span>
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 04 — Neon Pulse
   2x2 grid of glowing neon cards
   ========================================================================== */
function PreviewNeonPulse() {
  const cards = [
    { label: "Repos", value: "258", color: "#22D3EE" },
    { label: "Stars", value: "8.4K", color: "#DB2777" },
    { label: "Followers", value: "1.2K", color: "#4ADE80" },
    { label: "Following", value: "96", color: "#A78BFA" },
  ];
  return (
    <div className="grid grid-cols-2 gap-1 h-full">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-lg p-2 border border-border/30 ${cardBase} text-[8px] font-mono`}
          style={{
            boxShadow: `0 0 12px ${c.color}40`,
          }}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={labelBase}>{c.label}</span>
            <span className="text-[10px] font-bold" style={{ color: c.color }}>
              {c.value}
            </span>
          </div>
          <div className="h-1 w-full rounded bg-primary/20 mt-1" />
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
   Theme 05 — Minimal Editorial
   Typography-first, horizontal stats, bulleted lists
   ========================================================================== */
function PreviewMinimalEditorial() {
  return (
    <div className="h-full flex flex-col gap-2 p-1 text-stone-700">
      <div className="flex justify-between items-end">
        <span className="text-xs font-semibold">Public repos</span>
        <span className="text-xs font-bold text-foreground">{SAMPLE.repos.length}</span>
      </div>
      <div className="flex justify-between items-end">
        <span className="text-xs font-semibold">Followers</span>
        <span className="text-xs font-bold text-foreground">{SAMPLE.totalStars}</span>
      </div>
      <ul className="mt-1 space-y-0.5 text-[8px] text-muted-foreground list-disc list-inside">
        {SAMPLE.languages.slice(0, 3).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================================
   Theme 06 — Glass Dashboard
   Two-column translucent glass cards
   ========================================================================== */
function PreviewGlassDashboard() {
  return (
    <div className="h-full flex flex-col gap-1">
      <div className="flex-1 rounded-lg p-2 border border-border/30 bg-card/10 backdrop-blur-sm text-[8px] font-mono">
        <div className="mb-1 font-bold text-primary">{SAMPLE.repos.length} Repos</div>
        <div className="text-muted-foreground">Total stars: {SAMPLE.totalStars}</div>
      </div>
      <div className="flex-1 rounded-lg p-2 border border-border/30 bg-card/10 backdrop-blur-sm text-[8px] font-mono">
        {SAMPLE.repos.slice(0, 2).map((r) => (
          <div key={r.name} className="mb-1">
            <div className="text-xs font-bold text-primary">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.description ?? "No description"}</div>
          </div>
        ))}
      </div>
      <div className="mt-1 text-[8px] font-mono text-muted-foreground">
        {SAMPLE.languages.join(", ")}
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 07 — Language Spotlight
   Language bars + donut chart + repos list
   ========================================================================== */
function PreviewLanguageSpotlight() {
  return (
    <div className="h-full flex flex-col gap-1">
      <div className="flex-1 rounded-lg p-2 border border-border/30 bg-card/30 text-[8px] font-mono">
        {SAMPLE.languages.map((l, i) => (
          <div key={l} className="mb-1.5">
            <div className="flex justify-between text-[7px] text-muted-foreground mb-0.5">
              <span>{l}</span>
              <span>{["42%", "28%", "14%", "8%", "6%"][i]}</span>
            </div>
            <div className="h-1.5 rounded bg-primary/20 w-full">
              <div
                className="h-full rounded bg-primary"
                style={{ width: ["42%", "28%", "14%", "8%", "6%"][i] }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg p-2 border border-border/30 bg-card/30 text-[7px] font-mono">
        {SAMPLE.repos.slice(0, 3).map((r) => (
          <div key={r.name} className="flex justify-between mb-0.5">
            <span className="text-muted-foreground">{r.name}</span>
            <span className="text-primary">{r.stars}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 08 — Open Source Impact
   Impact metrics + featured repos table
   ========================================================================== */
function PreviewOssImpact() {
  return (
    <div className="h-full flex flex-col gap-1">
      <div className="flex-1 rounded-lg p-2 border border-border/30 bg-card/30 text-[8px] font-mono">
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">Total Stars</span>
          <span className="text-primary font-bold">{SAMPLE.totalStars}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">Total Forks</span>
          <span className="text-primary font-bold">{SAMPLE.totalForks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Public Repos</span>
          <span className="text-primary font-bold">{SAMPLE.repos.length}</span>
        </div>
      </div>
      <div className="flex-1 rounded-lg p-1.5 border border-border/30 bg-card/30 text-[7px] font-mono">
        <table className="w-full text-left">
          <tbody>
            {SAMPLE.repos.slice(0, 3).map((r) => (
              <tr key={r.name}>
                <td className="py-0.5">{r.name}</td>
                <td className="py-0.5 text-right text-primary">{r.stars}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================================
   Theme 09 — Compact Metrics Strip
   Single horizontal row of three badges
   ========================================================================== */
function PreviewCompactStrip() {
  return (
    <div className="h-full flex items-center gap-1 px-1 text-[8px] font-mono">
      {[
        ["Repos", "258", "#22D3EE"],
        ["Stars", "8.4K", "#DB2777"],
        ["Followers", "1.2K", "#4ADE80"],
      ].map(([label, value, color]) => (
        <div
          key={label}
          className={`flex-1 rounded bg-primary/20 p-1 text-center border border-primary/30`}
        >
          <div className="text-[7px] text-muted-foreground mb-0.5">{label}</div>
          <div className="text-xs font-bold text-primary">{value}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
   Theme 10 — Retro Pixel Terminal
   Green terminal with pixel aesthetics
   ========================================================================== */
function PreviewRetroPixel() {
  return (
    <div className="h-full rounded-lg p-1 bg-[#052e16] border border-[#166534] font-mono text-[8px] text-[#4ADE80]">
      <div className="mb-1">[ GITHUB STATS ]</div>
      <div className="text-[#4ADE80]/80">&gt; live data · never guessed</div>
      <div className="mt-1">
        <div className="flex justify-between text-[7px]">
          <span>REPOS:</span>
          <span>258</span>
        </div>
        <div className="flex justify-between text-[7px]">
          <span>STARS:</span>
          <span>8.4K</span>
        </div>
        <div className="flex justify-between text-[7px]">
          <span>FOLLOWERS:</span>
          <span>1.2K</span>
        </div>
        <div className="flex justify-between text-[7px] mt-1">
          <span>CONTRIB:</span>
          <span>1.2K</span>
        </div>
      </div>
    </div>
  );
}

const PREVIEW_COMPONENTS: Record<string, React.FC> = {
  "command-center": PreviewCommandCenter,
  "terminal-analytics": PreviewTerminalAnalytics,
  "contribution-heatmap": PreviewContributionHeatmap,
  "neon-pulse": PreviewNeonPulse,
  "minimal-editorial": PreviewMinimalEditorial,
  "glass-dashboard": PreviewGlassDashboard,
  "language-spotlight": PreviewLanguageSpotlight,
  "oss-impact": PreviewOssImpact,
  "compact-strip": PreviewCompactStrip,
  "retro-pixel": PreviewRetroPixel,
};

function StatsCard({
  theme,
  active,
  onSelect,
}: {
  theme: StatsTheme;
  active: boolean;
  onSelect: () => void;
}) {
  const Preview = PREVIEW_COMPONENTS[theme.id] ?? PreviewMinimalEditorial;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`overflow-hidden rounded-xl border text-left transition-all duration-200 ${
        active
          ? "border-primary ring-2 ring-primary/40 shadow-md scale-[1.01]"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="relative h-24 w-full overflow-hidden bg-card/50 p-1">
        <div className="absolute left-2 top-1 z-10 text-[9px] font-mono text-muted-foreground">
          {theme.n}
        </div>
        <div className="h-full flex items-center justify-center">
          <Preview />
        </div>
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="text-xs font-mono text-muted-foreground">{theme.n}</p>
        <p className="text-xs font-semibold">{theme.name}</p>
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{theme.blurb}</p>
      </div>
    </button>
  );
}

export { StatsCard };
