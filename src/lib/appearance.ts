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
};

export const BACKGROUND_THEMES: AppearanceTheme[] = [
  {
    id: "midnight-aurora",
    n: "01",
    name: "Midnight Aurora",
    blurb: "Deep navy with violet-cyan aurora landscape. Professional and modern.",
    accent: "8B5CF6",
    palette: ["#0B1224", "#6D28D9", "#22D3EE"],
    bannerUrl: "/banners/midnight-aurora.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "neon-cyber",
    n: "02",
    name: "Neon Cyber",
    blurb: "Futuristic grid with neon glow. Great for tech and cybersecurity.",
    accent: "22D3EE",
    palette: ["#020617", "#7C3AED", "#06B6D4"],
    bannerUrl: "/banners/neon-cyber.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "terminal-hacker",
    n: "03",
    name: "Terminal Hacker",
    blurb: "Matrix-style terminal inspired background. Perfect for security and systems profiles.",
    accent: "4ADE80",
    palette: ["#020202", "#14532D", "#4ADE80"],
    bannerUrl: "/banners/terminal-hacker.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "cosmic-galaxy",
    n: "04",
    name: "Cosmic Galaxy",
    blurb: "Deep space theme with planets and nebula. Creative and eye-catching.",
    accent: "C084FC",
    palette: ["#0F172A", "#6D28D9", "#38BDF8"],
    bannerUrl: "/banners/cosmic-galaxy.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "mountain-night",
    n: "05",
    name: "Mountain Night",
    blurb: "Minimal illustrated mountains with moon. Clean and aesthetic.",
    accent: "818CF8",
    palette: ["#0B1220", "#312E81", "#F9A8D4"],
    bannerUrl: "/banners/mountain-night.svg",
    bannerMotion: "none",
  },
  {
    id: "ocean-depths",
    n: "06",
    name: "Ocean Depths",
    blurb: "Dark ocean inspired theme with smooth gradients.",
    accent: "22D3EE",
    palette: ["#042F2E", "#0F766E", "#67E8F9"],
    bannerUrl: "/banners/ocean-depths.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "sunset-horizon",
    n: "07",
    name: "Sunset Horizon",
    blurb: "Warm sunset gradients with city skyline. Modern and vibrant.",
    accent: "F97316",
    palette: ["#4C0519", "#DB2777", "#F59E0B"],
    bannerUrl: "/banners/sunset-horizon.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "minimal-mono",
    n: "08",
    name: "Minimal Monochrome",
    blurb: "Clean grayscale with geometric shapes. Professional and minimal.",
    accent: "A1A1AA",
    palette: ["#18181B", "#71717A", "#E4E4E7"],
    bannerUrl: "/banners/minimal-mono.svg",
    bannerMotion: "none",
  },
  {
    id: "glass-prism",
    n: "09",
    name: "Glass Prism",
    blurb: "Translucent geometric prisms with realistic light refraction. Modern and premium look.",
    accent: "A78BFA",
    palette: ["#1E1B4B", "#8B5CF6", "#67E8F9"],
    bannerUrl: "/banners/glass-prism.svg",
    bannerMotion: "svg-anim",
  },
  {
    id: "editorial-light",
    n: "10",
    name: "Editorial Light",
    blurb: "Elegant minimalist mountain artwork inspired by Japanese prints.",
    accent: "57534E",
    palette: ["#FAFAF9", "#D6D3D1", "#44403C"],
    bannerUrl: "/banners/editorial-light.svg",
    bannerMotion: "none",
  },
];

export const DEFAULT_APPEARANCE_ID = "mountain-night";

export function appearanceById(id: string | undefined): AppearanceTheme {
  return (
    BACKGROUND_THEMES.find((t) => t.id === id) ??
    BACKGROUND_THEMES.find((t) => t.id === DEFAULT_APPEARANCE_ID) ??
    BACKGROUND_THEMES[0]!
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

export function trophyCardUrl(p: Profile): string {
  return user(p) ? `https://github.com/${user(p)}?tab=achievements` : "";
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
    statsCard: {
      ...p.statsCard,
      themePalette: theme.id,
    },
  };
}

// ---------- Stats theme types & configuration ----------

export type StatsTheme = {
  id: string;
  n: string;
  name: string;
  description: string;
  accent: string;
  layout: "glassmorphism" | "neon-glow" | "minimalist" | "gradient-waves" | "card-stack" | "timeline" | "hexagon" | "isometric";
};

export const STATS_THEMES: StatsTheme[] = [
  {
    id: "glassmorphism",
    n: "01",
    name: "Glassmorphism",
    description: "Frosted glass blur effect with semi-transparent backgrounds and soft shadows",
    accent: "A78BFA",
    layout: "glassmorphism",
  },
  {
    id: "neon-glow",
    n: "02",
    name: "Neon Glow Matrix",
    description: "Cyberpunk aesthetic with bright neon borders and terminal fonts",
    accent: "22D3EE",
    layout: "neon-glow",
  },
  {
    id: "minimalist",
    n: "03",
    name: "Minimalist Metrics",
    description: "Ultra-clean with large typography and minimal colors",
    accent: "18181B",
    layout: "minimalist",
  },
  {
    id: "gradient-waves",
    n: "04",
    name: "Gradient Waves",
    description: "Flowing gradient backgrounds with wave patterns",
    accent: "8B5CF6",
    layout: "gradient-waves",
  },
  {
    id: "card-stack",
    n: "05",
    name: "Card Stack",
    description: "Multiple cards with depth and layered shadows",
    accent: "6366F1",
    layout: "card-stack",
  },
  {
    id: "timeline",
    n: "06",
    name: "Timeline View",
    description: "Horizontal timeline with chronological hierarchy",
    accent: "F59E0B",
    layout: "timeline",
  },
  {
    id: "hexagon",
    n: "07",
    name: "Hexagon Grid",
    description: "Stats in hexagonal shapes with honeycomb pattern",
    accent: "10B981",
    layout: "hexagon",
  },
  {
    id: "isometric",
    n: "08",
    name: "3D Isometric",
    description: "Isometric perspective with pseudo-3D depth",
    accent: "EC4899",
    layout: "isometric",
  },
];

export const DEFAULT_STATS_THEME_ID = "glassmorphism";

export function statsThemeById(id: string | undefined): StatsTheme {
  return (
    STATS_THEMES.find((t) => t.id === id) ??
    STATS_THEMES.find((t) => t.id === DEFAULT_STATS_THEME_ID) ??
    STATS_THEMES[0]!
  );
}

export function applyStatsTheme(p: Profile, id: string): Profile {
  const theme = statsThemeById(id);
  return { ...p, statsTheme: theme.id };
}

export const STATS_CARD_THEMES = [
  { id: "default", name: "Default" },
  { id: "dark", name: "GitHub Dark" },
  { id: "radical", name: "Radical Neon" },
  { id: "tokyonight", name: "Tokyo Night" },
  { id: "onedark", name: "One Dark" },
  { id: "dracula", name: "Dracula" },
  { id: "cobalt", name: "Cobalt" },
  { id: "synthwave", name: "Synthwave" },
  { id: "gruvbox", name: "Gruvbox" },
  { id: "merko", name: "Merko" },
  { id: "highcontrast", name: "High Contrast" },
] as const;


export type ThemeStatsPalette = {
  id: string;
  name: string;
  bg: string;
  title: string;
  text: string;
  icon: string;
  border: string;
  ring: string;
  fire: string;
  sideNums: string;
  currStreakNum: string;
  graphColor: string;
};

export const THEME_STATS_PALETTES: Record<string, ThemeStatsPalette> = {
  "classic-blue": {
    id: "classic-blue",
    name: "Classic Blue (Default)",
    bg: "080B14",
    title: "58A6FF",
    text: "C9D1D9",
    icon: "58A6FF",
    border: "1E2638",
    ring: "58A6FF",
    fire: "58A6FF",
    sideNums: "58A6FF",
    currStreakNum: "FFFFFF",
    graphColor: "58A6FF",
  },
  "midnight-aurora": {
    id: "midnight-aurora",
    name: "Midnight Aurora",
    bg: "0B1224",
    title: "A78BFA",
    text: "E2E8F0",
    icon: "22D3EE",
    border: "1E293B",
    ring: "22D3EE",
    fire: "A78BFA",
    sideNums: "A78BFA",
    currStreakNum: "FFFFFF",
    graphColor: "8B5CF6",
  },
  "neon-cyber": {
    id: "neon-cyber",
    name: "Neon Cyber",
    bg: "020617",
    title: "22D3EE",
    text: "F8FAFC",
    icon: "A855F7",
    border: "06B6D4",
    ring: "22D3EE",
    fire: "A855F7",
    sideNums: "22D3EE",
    currStreakNum: "FFFFFF",
    graphColor: "22D3EE",
  },
  "terminal-hacker": {
    id: "terminal-hacker",
    name: "Terminal Hacker",
    bg: "020202",
    title: "4ADE80",
    text: "E2E8F0",
    icon: "22C55E",
    border: "14532D",
    ring: "4ADE80",
    fire: "22C55E",
    sideNums: "4ADE80",
    currStreakNum: "FFFFFF",
    graphColor: "4ADE80",
  },
  "cosmic-galaxy": {
    id: "cosmic-galaxy",
    name: "Cosmic Galaxy",
    bg: "0F172A",
    title: "C084FC",
    text: "F1F5F9",
    icon: "38BDF8",
    border: "312E81",
    ring: "38BDF8",
    fire: "C084FC",
    sideNums: "C084FC",
    currStreakNum: "FFFFFF",
    graphColor: "C084FC",
  },
  "mountain-night": {
    id: "mountain-night",
    name: "Mountain Night",
    bg: "0B1220",
    title: "818CF8",
    text: "FDF2F8",
    icon: "F472B6",
    border: "312E81",
    ring: "F472B6",
    fire: "818CF8",
    sideNums: "818CF8",
    currStreakNum: "FFFFFF",
    graphColor: "818CF8",
  },
  "ocean-depths": {
    id: "ocean-depths",
    name: "Ocean Depths",
    bg: "042F2E",
    title: "22D3EE",
    text: "CCFBF1",
    icon: "14B8A6",
    border: "0F766E",
    ring: "22D3EE",
    fire: "14B8A6",
    sideNums: "22D3EE",
    currStreakNum: "FFFFFF",
    graphColor: "22D3EE",
  },
  "sunset-horizon": {
    id: "sunset-horizon",
    name: "Sunset Horizon",
    bg: "1E0B14",
    title: "F97316",
    text: "FFF1F2",
    icon: "F43F5E",
    border: "831843",
    ring: "F97316",
    fire: "F59E0B",
    sideNums: "F97316",
    currStreakNum: "FFFFFF",
    graphColor: "F97316",
  },
  "minimal-mono": {
    id: "minimal-mono",
    name: "Minimal Monochrome",
    bg: "09090B",
    title: "FAFAFA",
    text: "A1A1AA",
    icon: "D4D4D8",
    border: "27272A",
    ring: "E4E4E7",
    fire: "A1A1AA",
    sideNums: "FAFAFA",
    currStreakNum: "FFFFFF",
    graphColor: "71717A",
  },
  "glass-prism": {
    id: "glass-prism",
    name: "Glass Prism",
    bg: "0F0C29",
    title: "A78BFA",
    text: "F5F3FF",
    icon: "67E8F9",
    border: "4C1D95",
    ring: "67E8F9",
    fire: "A78BFA",
    sideNums: "A78BFA",
    currStreakNum: "FFFFFF",
    graphColor: "A78BFA",
  },
  "editorial-light": {
    id: "editorial-light",
    name: "Editorial Light",
    bg: "FAFAF9",
    title: "1C1917",
    text: "44403C",
    icon: "DC2626",
    border: "D6D3D1",
    ring: "DC2626",
    fire: "EA580C",
    sideNums: "1C1917",
    currStreakNum: "1C1917",
    graphColor: "DC2626",
  },
};

export function resolveThemePalette(p: Profile): ThemeStatsPalette {
  const chosen = p.statsCard?.themePalette;
  if (chosen && chosen !== "auto" && THEME_STATS_PALETTES[chosen]) {
    return THEME_STATS_PALETTES[chosen]!;
  }
  if (p.appearanceId && THEME_STATS_PALETTES[p.appearanceId]) {
    return THEME_STATS_PALETTES[p.appearanceId]!;
  }
  return THEME_STATS_PALETTES["classic-blue"]!;
}

export function statsCardUrl(p: Profile): string {
  const username = user(p);
  const cfg = p.statsCard;
  const palette = resolveThemePalette(p);
  const params = new URLSearchParams();
  params.set("username", username);
  if (cfg?.showIcons ?? true) params.set("show_icons", "true");
  if (cfg?.theme && cfg.theme !== "default") {
    params.set("theme", cfg.theme);
  } else {
    params.set("bg_color", (cfg?.bgColor || palette.bg).replace(/^#/, ""));
    params.set("title_color", (cfg?.accentColor || palette.title).replace(/^#/, ""));
    params.set("text_color", (cfg?.textColor || palette.text).replace(/^#/, ""));
    params.set("icon_color", palette.icon.replace(/^#/, ""));
    if (cfg?.borderColor || palette.border) {
      params.set("border_color", (cfg?.borderColor || palette.border).replace(/^#/, ""));
    }
  }
  if (cfg?.includeAllCommits ?? true) params.set("include_all_commits", "true");
  if (cfg?.countPrivate) params.set("count_private", "true");
  if (cfg?.hideRank) params.set("hide_rank", "true");
  if (cfg?.hideMetrics && cfg.hideMetrics.length > 0) params.set("hide", cfg.hideMetrics.join(","));
  const radius = cfg?.borderRadius ?? 12;
  if (radius !== undefined) params.set("border_radius", String(radius));
  if (cfg?.bgColor && cfg.theme && cfg.theme !== "default") params.set("bg_color", cfg.bgColor.replace(/^#/, ""));
  if (cfg?.textColor && cfg.theme && cfg.theme !== "default") params.set("text_color", cfg.textColor.replace(/^#/, ""));
  if (cfg?.accentColor && cfg.theme && cfg.theme !== "default") params.set("title_color", cfg.accentColor.replace(/^#/, ""));
  if (cfg?.borderColor && cfg.theme && cfg.theme !== "default") params.set("border_color", cfg.borderColor.replace(/^#/, ""));
  if (cfg?.customTitle) params.set("custom_title", cfg.customTitle);
  const hasBorder = !!(cfg?.borderColor || palette.border);
  params.set("hide_border", hasBorder ? "false" : "true");
  return `https://github-readme-stats.vercel.app/api?${params.toString()}`;
}

export function langsCardUrl(p: Profile): string {
  const username = user(p);
  const cfg = p.langsCard;
  const palette = resolveThemePalette(p);
  const params = new URLSearchParams();
  params.set("username", username);
  params.set("layout", cfg?.layout || "compact");
  params.set("langs_count", String(Math.min(10, Math.max(1, cfg?.langsCount ?? 6))));

  // Fix for "Top Languages Unavailable": include forks and optional private count
  if (cfg?.includeForks ?? true) {
    params.set("include_forks", "true");
  }
  if (cfg?.countPrivate) {
    params.set("count_private", "true");
  }

  if (cfg?.theme && cfg.theme !== "default") {
    params.set("theme", cfg.theme);
  } else {
    params.set("bg_color", palette.bg.replace(/^#/, ""));
    params.set("title_color", palette.title.replace(/^#/, ""));
    params.set("text_color", palette.text.replace(/^#/, ""));
    if (palette.border) {
      params.set("border_color", palette.border.replace(/^#/, ""));
    }
  }
  if (cfg?.hideProgress) params.set("hide_progress", "true");
  const radius = cfg?.borderRadius ?? 12;
  if (radius !== undefined) params.set("border_radius", String(radius));
  if (cfg?.cardWidth && cfg.cardWidth !== 400) params.set("card_width", String(cfg.cardWidth));
  const hasBorder = !!palette.border;
  params.set("hide_border", hasBorder ? "false" : "true");
  return `https://github-readme-stats.vercel.app/api/top-langs/?${params.toString()}`;
}

export function streakCardUrl(p: Profile): string {
  const username = user(p);
  const cfg = p.streakCard;
  const palette = resolveThemePalette(p);
  const params = new URLSearchParams();
  params.set("user", username);
  if (cfg?.theme && cfg.theme !== "default") {
    params.set("theme", cfg.theme);
  } else {
    params.set("background", palette.bg.replace(/^#/, ""));
    params.set("border", palette.border.replace(/^#/, ""));
    params.set("stroke", palette.border.replace(/^#/, ""));
    params.set("ring", (cfg?.ringColor || palette.ring).replace(/^#/, ""));
    params.set("fire", (cfg?.fireColor || palette.fire).replace(/^#/, ""));
    params.set("currStreakNum", palette.currStreakNum.replace(/^#/, ""));
    params.set("sideNums", palette.sideNums.replace(/^#/, ""));
    params.set("currStreakLabel", palette.title.replace(/^#/, ""));
    params.set("sideLabels", palette.text.replace(/^#/, ""));
    params.set("dates", "64748B");
  }
  const radius = cfg?.borderRadius ?? 12;
  if (radius !== undefined) params.set("border_radius", String(radius));
  if (cfg?.mode === "weekly") params.set("mode", "weekly");
  if (cfg?.fireColor && cfg.theme && cfg.theme !== "default") params.set("fire", cfg.fireColor.replace(/^#/, ""));
  if (cfg?.ringColor && cfg.theme && cfg.theme !== "default") params.set("ring", cfg.ringColor.replace(/^#/, ""));
  const hasBorder = !!palette.border;
  params.set("hide_border", hasBorder ? "false" : "true");
  return `https://streak-stats.demolab.com/?${params.toString()}`;
}

export function graphCardUrl(p: Profile): string {
  const username = user(p);
  const cfg = p.activityGraph;
  const palette = resolveThemePalette(p);
  const color = (cfg?.color || palette.graphColor || p.accentColor || "8B5CF6").replace(/^#/, "");
  
  if (cfg?.graphType === "activity-graph") {
    const params = new URLSearchParams();
    params.set("username", username);
    params.set("bg_color", palette.bg.replace(/^#/, ""));
    params.set("color", color);
    params.set("line", color);
    params.set("point", palette.title.replace(/^#/, ""));
    params.set("area", cfg.area !== false ? "true" : "false");
    params.set("hide_border", "true");
    params.set("radius", String(cfg.radius ?? 12));
    return `https://github-readme-activity-graph.vercel.app/graph?${params.toString()}`;
  }
  
  return `https://ghchart.rshah.org/${color}/${username}`;
}

