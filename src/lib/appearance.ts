import type { Profile } from "./profile";

const enc = (s: string) => encodeURIComponent(s.trim());
const hexOk = (h: string) => (/^[0-9a-f]{6}$/i.test(h) ? h : "8B5CF6");
const user = (p: Profile) => enc(p.username.trim() || "github");

export type AppearanceTheme = {
  id: string;
  n: string;
  name: string;
  blurb: string;
  accent: string;
  palette: string[];
  bannerUrl: string;
  bannerMotion: "none" | "svg-anim";
  /** CSS background for editor thumbnails only — not exported to GitHub. */
  thumb: string;
};

const cap = (
  type: string,
  colors: string,
  fontColor: string,
  motion: AppearanceTheme["bannerMotion"] = "none",
) =>
  `https://capsule-render.vercel.app/api?type=${type}&color=${colors}&height=240&section=header&fontColor=${fontColor}${motion === "svg-anim" ? "&animation=twinkling" : ""}`;

export const BACKGROUND_THEMES: AppearanceTheme[] = [
  {
    id: "midnight-aurora",
    n: "01",
    name: "Midnight Aurora",
    blurb: "Deep navy with violet-cyan aurora landscape. Professional and modern.",
    accent: "8B5CF6",
    palette: ["#0B1224", "#6D28D9", "#22D3EE"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/midnight-aurora.svg",
    bannerMotion: "svg-anim",
    thumb:
      "radial-gradient(ellipse at 15% 25%,#c084fc88 0%,transparent 40%),radial-gradient(ellipse at 85% 60%,#22d3ee77 0%,transparent 35%),radial-gradient(ellipse at 50% 10%,#4ade8055 0%,transparent 30%),linear-gradient(160deg,#060918 0%,#1e1b4b 35%,#3b0764 60%,#0e7490 85%,#0f1e2e 100%)",
  },
  {
    id: "neon-cyber",
    n: "02",
    name: "Neon Cyber",
    blurb: "Futuristic grid with neon glow. Great for tech and cybersecurity.",
    accent: "22D3EE",
    palette: ["#020617", "#7C3AED", "#06B6D4"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/neon-cyber.svg",
    bannerMotion: "svg-anim",
    thumb:
      "repeating-linear-gradient(0deg,transparent 0 20px,#06b6d418 21px 22px),repeating-linear-gradient(90deg,transparent 0 30px,#7c3aed18 31px 32px),radial-gradient(ellipse at 50% 100%,#06b6d488 0%,transparent 55%),radial-gradient(circle at 50% 38%,#7c3aed66 0%,transparent 25%),linear-gradient(180deg,#020617 0%,#0c0a2e 50%,#0a2540 100%)",
  },
  {
    id: "terminal-hacker",
    n: "03",
    name: "Terminal Hacker",
    blurb: "Matrix-style terminal inspired background. Perfect for security and systems profiles.",
    accent: "4ADE80",
    palette: ["#020202", "#14532D", "#4ADE80"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/terminal-hacker.svg",
    bannerMotion: "svg-anim",
    thumb:
      "repeating-linear-gradient(90deg,transparent 0 15px,#4ade8018 16px 17px),repeating-linear-gradient(0deg,transparent 0 8px,#14532d30 9px 10px),radial-gradient(ellipse at 50% 35%,#14532d88 0%,transparent 50%),linear-gradient(180deg,#000000 0%,#020d02 40%,#052e16 70%,#14532d 100%)",
  },
  {
    id: "cosmic-galaxy",
    n: "04",
    name: "Cosmic Galaxy",
    blurb: "Deep space theme with planets and nebula. Creative and eye-catching.",
    accent: "C084FC",
    palette: ["#0F172A", "#6D28D9", "#38BDF8"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/cosmic-galaxy.svg",
    bannerMotion: "svg-anim",
    thumb:
      "radial-gradient(circle at 65% 45%,#4c1d9577 0%,transparent 45%),radial-gradient(circle at 30% 25%,#0369a177 0%,transparent 35%),radial-gradient(circle at 80% 20%,#c084fc55 0%,transparent 25%),linear-gradient(135deg,#020617 0%,#0f0a2e 50%,#0a1628 100%)",
  },
  {
    id: "mountain-night",
    n: "05",
    name: "Mountain Night",
    blurb: "Minimal illustrated mountains with moon. Clean and aesthetic.",
    accent: "818CF8",
    palette: ["#0B1220", "#312E81", "#F9A8D4"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/mountain-night.svg",
    bannerMotion: "none",
    thumb: "linear-gradient(180deg,#060b18 0%,#0b1220 25%,#1a1745 55%,#312e81 75%,#be185d55 88%,#0b1220 100%)",
  },
  {
    id: "ocean-depths",
    n: "06",
    name: "Ocean Depths",
    blurb: "Dark ocean inspired theme with smooth gradients.",
    accent: "22D3EE",
    palette: ["#042F2E", "#0F766E", "#67E8F9"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/ocean-depths.svg",
    bannerMotion: "svg-anim",
    thumb:
      "radial-gradient(ellipse at 30% 0%,#67e8f944 0%,transparent 40%),radial-gradient(ellipse at 70% 0%,#22d3ee33 0%,transparent 35%),linear-gradient(180deg,#001a1a 0%,#042f2e 20%,#064e3b 50%,#0f766e 75%,#0891b2 100%)",
  },
  {
    id: "sunset-horizon",
    n: "07",
    name: "Sunset Horizon",
    blurb: "Warm sunset gradients with city skyline. Modern and vibrant.",
    accent: "F97316",
    palette: ["#4C0519", "#DB2777", "#F59E0B"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/sunset-horizon.svg",
    bannerMotion: "svg-anim",
    thumb:
      "linear-gradient(180deg,#FCD34D 0%,#F97316 20%,#BE185D 45%,#7C2D12 65%,#431407 80%,#1a0005 100%)",
  },
  {
    id: "minimal-mono",
    n: "08",
    name: "Minimal Monochrome",
    blurb: "Clean grayscale with geometric shapes. Professional and minimal.",
    accent: "A1A1AA",
    palette: ["#18181B", "#71717A", "#E4E4E7"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/minimal-mono.svg",
    bannerMotion: "none",
    thumb:
      "linear-gradient(135deg,#09090B 0%,#18181B 30%,#27272A 55%,#3F3F46 75%,#52525B 90%,#71717A 100%)",
  },
  {
    id: "glass-prism",
    n: "09",
    name: "Glass Prism",
    blurb: "Abstract prism shapes with glass effect. Modern and premium look.",
    accent: "A78BFA",
    palette: ["#1E1B4B", "#8B5CF6", "#67E8F9"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/glass-prism.svg",
    bannerMotion: "svg-anim",
    thumb:
      "radial-gradient(circle at 35% 50%,#8b5cf677 0%,transparent 50%),radial-gradient(circle at 75% 30%,#06b6d455 0%,transparent 40%),linear-gradient(135deg,#0f0d2e 0%,#1e1b4b 45%,#0e1a35 100%)",
  },
  {
    id: "editorial-light",
    n: "10",
    name: "Editorial Light",
    blurb: "Clean light theme with artistic landscape. Unique and minimal.",
    accent: "57534E",
    palette: ["#FAFAF9", "#D6D3D1", "#44403C"],
    bannerUrl: "https://raw.githubusercontent.com/ChaudhariParthh/github-profile-readme-generator/main/public/banners/editorial-light.svg",
    bannerMotion: "none",
    thumb:
      "radial-gradient(circle at 80% 25%,#e0703066 0%,#d6d3d100 30%),linear-gradient(180deg,#FAFAF9 0%,#F5F5F4 40%,#E7E5E4 70%,#D6D3D1 100%)",
  },
];

export type StatsLayout = {
  id: string;
  n: string;
  name: string;
  blurb: string;
  heading: string;
  widgetTheme: string;
  langsLayout: "compact" | "donut" | "donut-vertical" | "pie" | "default";
  graphTheme: string;
  streakTheme: string;
  trophyTheme: string;
  hideBorder: boolean;
  showIcons: boolean;
  kind:
    | "command-center"
    | "terminal"
    | "heatmap"
    | "neon"
    | "editorial"
    | "glass"
    | "langs"
    | "impact"
    | "strip"
    | "pixel";
  thumb: string;
};

export const STATS_LAYOUTS: StatsLayout[] = [
  {
    id: "command-center",
    n: "01",
    name: "Developer Command Center",
    blurb: "Asymmetric dashboard with compact metrics, activity panel, and language bars.",
    heading: "GitHub Activity",
    widgetTheme: "tokyonight",
    langsLayout: "compact",
    graphTheme: "tokyo-night",
    streakTheme: "tokyonight",
    trophyTheme: "tokyonight",
    hideBorder: true,
    showIcons: true,
    kind: "command-center",
    thumb: "linear-gradient(135deg,#0f172a,#1e1b4b)",
  },
  {
    id: "terminal-analytics",
    n: "02",
    name: "Terminal Analytics",
    blurb: "Terminal-style stats with monospace font and hacker vibe.",
    heading: "GITHUB_ANALYTICS.exe",
    widgetTheme: "chartreuse",
    langsLayout: "compact",
    graphTheme: "chartreuse-dark",
    streakTheme: "chartreuse-dark",
    trophyTheme: "matrix",
    hideBorder: false,
    showIcons: true,
    kind: "terminal",
    thumb: "linear-gradient(180deg,#020617,#052e16)",
  },
  {
    id: "contribution-heatmap",
    n: "03",
    name: "Contribution Heatmap",
    blurb: "Focus on contribution activity with clean and enhanced layout.",
    heading: "Contributions",
    widgetTheme: "github_dark",
    langsLayout: "compact",
    graphTheme: "github-compact",
    streakTheme: "dark",
    trophyTheme: "darkhub",
    hideBorder: true,
    showIcons: false,
    kind: "heatmap",
    thumb: "linear-gradient(180deg,#0b1220,#14532d)",
  },
  {
    id: "neon-pulse",
    n: "04",
    name: "Neon Pulse",
    blurb: "Neon cards with dynamic visual elements.",
    heading: "GitHub Stats",
    widgetTheme: "radical",
    langsLayout: "compact",
    graphTheme: "radical",
    streakTheme: "radical",
    trophyTheme: "radical",
    hideBorder: false,
    showIcons: true,
    kind: "neon",
    thumb: "linear-gradient(135deg,#4c1d95,#db2777,#22d3ee)",
  },
  {
    id: "minimal-editorial",
    n: "05",
    name: "Minimal Editorial",
    blurb: "Clean and minimal layout with elegant typography and open spacing.",
    heading: "GitHub Statistics",
    widgetTheme: "default",
    langsLayout: "compact",
    graphTheme: "github-compact",
    streakTheme: "default",
    trophyTheme: "flat",
    hideBorder: true,
    showIcons: false,
    kind: "editorial",
    thumb: "linear-gradient(180deg,#fafaf9,#e7e5e4)",
  },
  {
    id: "glass-dashboard",
    n: "06",
    name: "Glass Dashboard",
    blurb: "Translucent glass-style cards with modern aesthetic.",
    heading: "GitHub Overview",
    widgetTheme: "transparent",
    langsLayout: "compact",
    graphTheme: "react-dark",
    streakTheme: "transparent",
    trophyTheme: "transparent",
    hideBorder: true,
    showIcons: true,
    kind: "glass",
    thumb: "linear-gradient(135deg,#1e1b4b99,#0ea5e999)",
  },
  {
    id: "language-spotlight",
    n: "07",
    name: "Language Spotlight",
    blurb: "Prominent language visualization with modern charts.",
    heading: "Most Used Languages",
    widgetTheme: "tokyonight",
    langsLayout: "donut",
    graphTheme: "tokyo-night",
    streakTheme: "tokyonight",
    trophyTheme: "tokyonight",
    hideBorder: true,
    showIcons: true,
    kind: "langs",
    thumb: "linear-gradient(135deg,#0f172a,#2563eb)",
  },
  {
    id: "oss-impact",
    n: "08",
    name: "Open Source Impact",
    blurb: "Showcase open source activity with detailed metrics.",
    heading: "Open Source Impact",
    widgetTheme: "radical",
    langsLayout: "compact",
    graphTheme: "github-dark",
    streakTheme: "dark",
    trophyTheme: "discord",
    hideBorder: true,
    showIcons: true,
    kind: "impact",
    thumb: "linear-gradient(135deg,#111827,#7c3aed)",
  },
  {
    id: "compact-strip",
    n: "09",
    name: "Compact Metrics Strip",
    blurb: "Single row of key metrics for minimal README designs.",
    heading: "",
    widgetTheme: "transparent",
    langsLayout: "compact",
    graphTheme: "github-compact",
    streakTheme: "transparent",
    trophyTheme: "flat",
    hideBorder: true,
    showIcons: false,
    kind: "strip",
    thumb: "linear-gradient(90deg,#0f172a,#312e81,#0f172a)",
  },
  {
    id: "retro-pixel",
    n: "10",
    name: "Retro Pixel Terminal",
    blurb: "Pixel-art inspired layout with terminal styling and retro aesthetics.",
    heading: "[ GITHUB STATS ]",
    widgetTheme: "chartreuse",
    langsLayout: "compact",
    graphTheme: "chartreuse-dark",
    streakTheme: "chartreuse-dark",
    trophyTheme: "matrix",
    hideBorder: false,
    showIcons: true,
    kind: "pixel",
    thumb: "linear-gradient(180deg,#052e16,#14532d)",
  },
  {
    id: "signal-radar",
    n: "11",
    name: "Signal Radar",
    blurb: "A focused activity readout with a clear visual hierarchy.",
    heading: "Signal Radar",
    widgetTheme: "github_dark",
    langsLayout: "donut-vertical",
    graphTheme: "github-compact",
    streakTheme: "dark",
    trophyTheme: "darkhub",
    hideBorder: true,
    showIcons: true,
    kind: "command-center",
    thumb: "linear-gradient(135deg,#082f49,#0e7490)",
  },
  {
    id: "aurora-metrics",
    n: "12",
    name: "Aurora Metrics",
    blurb: "Bright metric cards for a high-energy developer profile.",
    heading: "Aurora Metrics",
    widgetTheme: "react",
    langsLayout: "pie",
    graphTheme: "react-dark",
    streakTheme: "react",
    trophyTheme: "discord",
    hideBorder: true,
    showIcons: true,
    kind: "neon",
    thumb: "linear-gradient(135deg,#064e3b,#0891b2,#2563eb)",
  },
  {
    id: "ship-log",
    n: "13",
    name: "Ship Log",
    blurb: "A compact release-oriented layout for builders who ship often.",
    heading: "SHIP LOG",
    widgetTheme: "transparent",
    langsLayout: "compact",
    graphTheme: "github-compact",
    streakTheme: "transparent",
    trophyTheme: "flat",
    hideBorder: true,
    showIcons: false,
    kind: "strip",
    thumb: "linear-gradient(90deg,#172554,#1d4ed8,#0f172a)",
  },
  {
    id: "deep-space",
    n: "14",
    name: "Deep Space",
    blurb: "Layered stats for a cinematic, dark-space README design.",
    heading: "Deep Space Telemetry",
    widgetTheme: "dracula",
    langsLayout: "donut",
    graphTheme: "dracula",
    streakTheme: "dracula",
    trophyTheme: "dracula",
    hideBorder: false,
    showIcons: true,
    kind: "glass",
    thumb: "linear-gradient(135deg,#172554,#4338ca,#0f172a)",
  },
  {
    id: "green-room",
    n: "15",
    name: "Green Room",
    blurb: "Terminal-inspired contribution metrics with a calm green palette.",
    heading: "GREEN ROOM // ACTIVITY",
    widgetTheme: "chartreuse",
    langsLayout: "default",
    graphTheme: "chartreuse-dark",
    streakTheme: "chartreuse-dark",
    trophyTheme: "matrix",
    hideBorder: false,
    showIcons: true,
    kind: "terminal",
    thumb: "linear-gradient(180deg,#052e16,#166534,#65a30d)",
  },
];

export const DEFAULT_APPEARANCE_ID = "mountain-night";
export const DEFAULT_STATS_LAYOUT_ID = "command-center";

export function appearanceById(id: string | undefined): AppearanceTheme {
  return (
    BACKGROUND_THEMES.find((t) => t.id === id) ??
    BACKGROUND_THEMES.find((t) => t.id === DEFAULT_APPEARANCE_ID) ??
    BACKGROUND_THEMES[0]!
  );
}

export function statsLayoutById(id: string | undefined): StatsLayout {
  return (
    STATS_LAYOUTS.find((t) => t.id === id) ??
    STATS_LAYOUTS.find((t) => t.id === DEFAULT_STATS_LAYOUT_ID) ??
    STATS_LAYOUTS[0]!
  );
}

export function resolvedBanner(p: Profile): string {
  if (p.customBanner) return p.bannerUrl.trim();
  if (p.bannerUrl.trim()) return p.bannerUrl.trim();
  return appearanceById(p.appearanceId).bannerUrl;
}

export function resolvedAccent(p: Profile): string {
  return hexOk(p.accentColor || appearanceById(p.appearanceId).accent);
}

function qs(layout: StatsLayout): string {
  return `theme=${enc(layout.widgetTheme)}&hide_border=${layout.hideBorder}&show_icons=${layout.showIcons}`;
}

export function statsCardUrl(p: Profile, extra = ""): string {
  if (!user(p)) return "";
  const layout = statsLayoutById(p.statsLayout);
  return `https://github-readme-stats.vercel.app/api?username=${user(p)}&${qs(layout)}${extra}`;
}

export function langsCardUrl(p: Profile): string {
  if (!user(p)) return "";
  const layout = statsLayoutById(p.statsLayout);
  const lang = layout.langsLayout === "default" ? "" : `&layout=${layout.langsLayout}`;
  return `https://github-readme-stats.vercel.app/api/top-langs/?username=${user(p)}${lang}&theme=${enc(layout.widgetTheme)}&hide_border=${layout.hideBorder}`;
}

export function streakCardUrl(p: Profile): string {
  if (!user(p)) return "";
  const layout = statsLayoutById(p.statsLayout);
  return `https://streak-stats.demolab.com?user=${user(p)}&theme=${enc(layout.streakTheme)}&hide_border=${layout.hideBorder}`;
}

export function trophyCardUrl(p: Profile): string {
  return user(p) ? `https://github.com/${user(p)}?tab=achievements` : "";
}

export function graphCardUrl(p: Profile): string {
  return user(p)
    ? `https://ghchart.rshah.org/${hexOk(resolvedAccent(p))}/${user(p)}`
    : "";
}

export function pinCardUrl(p: Profile, owner: string, repo: string): string {
  const layout = statsLayoutById(p.statsLayout);
  return `https://github-readme-stats.vercel.app/api/pin/?username=${enc(owner)}&repo=${enc(repo)}&theme=${enc(layout.widgetTheme)}&hide_border=${layout.hideBorder}`;
}

/** Live GitHub metrics via Shields → public GitHub JSON. Never hardcoded. */
function metricBadge(p: Profile, query: string, label: string, color: string): string {
  if (!user(p)) return "";
  const endpoint = enc(`https://api.github.com/users/${p.username.trim()}`);
  return `https://img.shields.io/badge/dynamic/json?url=${endpoint}&query=${enc(query)}&label=${enc(label)}&style=for-the-badge&color=${hexOk(color)}&logo=github&logoColor=white`;
}

function img(src: string, alt: string, width?: string): string {
  return width
    ? `<img src="${src}" alt="${alt}" width="${width}" />`
    : `<img src="${src}" alt="${alt}" />`;
}

function table(cells: string[][]): string[] {
  const rows = cells
    .filter((r) => r.length)
    .map((r) => `  <tr>${r.map((c) => `<td valign="top">${c}</td>`).join("")}</tr>`);
  if (!rows.length) return [];
  return ["<table>", ...rows, "</table>"];
}

export function renderStatsSection(p: Profile): string[] {
  const layout = statsLayoutById(p.statsLayout);
  const { stats, langs, streak } = p.addons;
  if (!(stats || langs || streak)) return [];
  if (!user(p))
    return [
      `> Enter your GitHub username, then click the GitHub icon to import your profile.`,
    ];

  const accent = resolvedAccent(p);
  const out: string[] = [];
  const statsImg = stats
    ? img(
        statsCardUrl(
          p,
          layout.kind === "impact" ? "&include_all_commits=true&count_private=false" : "",
        ),
        "GitHub stats",
      )
    : "";
  const langsImg = langs ? img(langsCardUrl(p), "Top languages") : "";
  const streakImg = streak ? img(streakCardUrl(p), "GitHub streak") : "";
  const graphImg = img(graphCardUrl(p), "Contribution graph", "100%");
  const badges = stats
    ? [
        img(metricBadge(p, "public_repos", "Repos", accent), "public repositories"),
        img(metricBadge(p, "followers", "Followers", accent), "followers"),
        img(metricBadge(p, "following", "Following", "22D3EE"), "following"),
      ].join(" ")
    : "";

  const title = (t: string) => {
    if (!t) return;
    out.push(`## ${t}`, "");
  };

  switch (layout.id) {
    case "command-center":
      title(layout.heading);
      out.push(`<p align="left">${badges}</p>`, "");
      out.push(...table([[statsImg, langsImg].filter(Boolean)]));
      if (streakImg) out.push("", `<p align="left">${streakImg}</p>`);
      break;
    case "terminal-analytics":
      out.push(`## \`${layout.heading}\``, "");
      out.push(`<p align="left"><code>// building. learning. contributing...</code></p>`, "");
      if (statsImg) out.push(`<p align="left">${statsImg}</p>`);
      if (langsImg) out.push(`<p align="left">${langsImg}</p>`);
      if (streakImg) out.push(`<p align="left">${streakImg}</p>`);
      break;
    case "contribution-heatmap":
      title(layout.heading);
      out.push(`<p align="center">${graphImg}</p>`, "");
      out.push(...table([[statsImg, langsImg].filter(Boolean)]));
      if (streakImg) out.push("", `<p align="center">${streakImg}</p>`);
      break;
    case "neon-pulse":
      title(layout.heading);
      out.push(...table([[statsImg, langsImg].filter(Boolean), [streakImg].filter(Boolean)]));
      break;
    case "minimal-editorial":
      title(layout.heading);
      if (badges) out.push(`<p align="center">${badges}</p>`, "");
      if (statsImg) out.push(`<p align="center">${statsImg}</p>`);
      out.push(...table([[langsImg, streakImg].filter(Boolean)]));
      break;
    case "glass-dashboard":
      title(layout.heading);
      out.push(...table([[statsImg].filter(Boolean), [langsImg, streakImg].filter(Boolean)]));
      break;
    case "language-spotlight":
      title(layout.heading);
      if (langsImg) out.push(`<p align="center">${langsImg}</p>`, "");
      out.push(...table([[statsImg, streakImg].filter(Boolean)]));
      break;
    case "oss-impact":
      title(layout.heading);
      if (badges) out.push(`<p align="left">${badges}</p>`, "");
      if (statsImg) out.push(`<p align="left">${statsImg}</p>`);
      if (langsImg) out.push(`<p align="left">${langsImg}</p>`);
      if (streakImg) out.push(`<p align="center">${streakImg}</p>`);
      break;
    case "compact-strip":
      if (layout.heading) title(layout.heading);
      if (badges) out.push(`<p align="center">${badges}</p>`);
      if (streakImg) out.push(`<p align="center">${streakImg}</p>`);
      break;
    case "retro-pixel":
      out.push(`## \`${layout.heading}\``, "");
      out.push(`<p align="left"><code>&gt; live data · never guessed</code></p>`, "");
      out.push(...table([[streakImg].filter(Boolean), [statsImg, langsImg].filter(Boolean)]));
      break;
    case "signal-radar":
      title(layout.heading);
      out.push(`<p align="center">${graphImg}</p>`, "");
      if (statsImg) out.push(`<p align="center">${statsImg}</p>`);
      out.push(...table([[badges, langsImg].filter(Boolean)]));
      if (streakImg) out.push(`<p align="right">${streakImg}</p>`);
      break;
    case "aurora-metrics":
      title(layout.heading);
      if (badges) out.push(`<p align="center">${badges}</p>`, "");
      out.push(...table([[statsImg].filter(Boolean), [langsImg, streakImg].filter(Boolean)]));
      break;
    case "ship-log":
      title(layout.heading);
      out.push(`<p align="left"><code>PUBLIC PROFILE SNAPSHOT</code></p>`, "");
      if (badges) out.push(`<p align="left">${badges}</p>`);
      if (statsImg) out.push(`<p align="right">${statsImg}</p>`);
      if (langsImg) out.push(`<p align="left">${langsImg}</p>`);
      if (streakImg) out.push(`<p align="right">${streakImg}</p>`);
      break;
    case "deep-space":
      title(layout.heading);
      out.push(`<p align="center">${graphImg}</p>`, "");
      out.push(...table([[langsImg].filter(Boolean), [streakImg, statsImg].filter(Boolean)]));
      break;
    case "green-room":
      out.push(`## \`${layout.heading}\``, "");
      out.push(`<p align="left"><code>DATA SOURCE: PUBLIC GITHUB PROFILE</code></p>`, "");
      if (badges) out.push(`<p align="left">${badges}</p>`, "");
      if (langsImg) out.push(`<p align="left">${langsImg}</p>`);
      if (streakImg) out.push(`<p align="center">${streakImg}</p>`);
      if (statsImg) out.push(`<p align="right">${statsImg}</p>`);
      break;
  }
  return out.filter((line, i, arr) => !(line === "" && arr[i - 1] === ""));
}

export function applyAppearance(p: Profile, id: string): Profile {
  const theme = appearanceById(id);
  return {
    ...p,
    appearanceId: theme.id,
    accentColor: theme.accent,
    bannerUrl: theme.bannerUrl,
    bannerMotion: theme.bannerMotion,
    customBanner: false,
  };
}

export function applyStatsLayout(p: Profile, id: string): Profile {
  const layout = statsLayoutById(id);
  return { ...p, statsLayout: layout.id, statsTheme: layout.widgetTheme };
}
