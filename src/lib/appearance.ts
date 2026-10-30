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
