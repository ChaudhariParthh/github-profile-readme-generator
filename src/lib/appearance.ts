import type { Profile } from "./profile";

const enc = (s: string) => encodeURIComponent(s.trim());
const hexOk = (h: string) => (/^[0-9a-f]{6}$/i.test(h) ? h : "8B5CF6");
const user = (p: Profile) => enc(p.username.trim() || "github");

export const DEFAULT_ACCENT = "8B5CF6";

export function resolvedAccent(p: Profile): string {
  return hexOk(p.accentColor || DEFAULT_ACCENT);
}

export function trophyCardUrl(p: Profile): string {
  return user(p) ? `https://github.com/${user(p)}?tab=achievements` : "";
}

// ---------- Stats theme types & configuration ----------

export type StatsTheme = {
  id: string;
  n: string;
  name: string;
  description: string;
  accent: string;
  layout:
    | "glassmorphism"
    | "neon-glow"
    | "minimalist"
    | "gradient-waves"
    | "card-stack"
    | "timeline"
    | "hexagon"
    | "isometric";
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
  // Five distinct stat value colors for the stats card metrics
  statColorCommits: string;
  statColorStars: string;
  statColorPrs: string;
  statColorIssues: string;
  statColorForks: string;
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
    statColorCommits: "58A6FF",
    statColorStars: "3FB950",
    statColorPrs: "D29922",
    statColorIssues: "F85149",
    statColorForks: "A371F7",
  },
  "sunset-orange": {
    id: "sunset-orange",
    name: "Sunset Orange",
    bg: "0C0A04",
    title: "FB923C",
    text: "FDBA74",
    icon: "FB923C",
    border: "3B1A03",
    ring: "FB923C",
    fire: "FB923C",
    sideNums: "FB923C",
    currStreakNum: "FFFFFF",
    graphColor: "FB923C",
    statColorCommits: "FB923C",
    statColorStars: "A3E635",
    statColorPrs: "FBBF24",
    statColorIssues: "F87171",
    statColorForks: "C084FC",
  },
  "emerald-green": {
    id: "emerald-green",
    name: "Emerald Green",
    bg: "020C0A",
    title: "10B981",
    text: "6EE7B7",
    icon: "10B981",
    border: "064E3B",
    ring: "10B981",
    fire: "10B981",
    sideNums: "10B981",
    currStreakNum: "FFFFFF",
    graphColor: "10B981",
    statColorCommits: "10B981",
    statColorStars: "4ADE80",
    statColorPrs: "FBBF24",
    statColorIssues: "F87171",
    statColorForks: "C084FC",
  },
  "rose-pink": {
    id: "rose-pink",
    name: "Rose Pink",
    bg: "0A0306",
    title: "F472B6",
    text: "FBCFE8",
    icon: "F472B6",
    border: "831843",
    ring: "F472B6",
    fire: "F472B6",
    sideNums: "F472B6",
    currStreakNum: "FFFFFF",
    graphColor: "F472B6",
    statColorCommits: "F472B6",
    statColorStars: "86EFAC",
    statColorPrs: "FCD34D",
    statColorIssues: "FCA5A5",
    statColorForks: "D8B4FE",
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

export function resolveStatsApiBase(cfg?: { apiProvider?: string; customApiUrl?: string }): string {
  if (cfg?.apiProvider === "official") {
    return "https://github-readme-stats.vercel.app";
  }
  if (cfg?.apiProvider === "custom" && cfg.customApiUrl?.trim()) {
    const raw = cfg.customApiUrl.trim();
    const clean = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
    return clean.replace(/\/+$/, "");
  }
  return "https://github-stats-extended.vercel.app";
}

export function statsCardUrl(p: Profile): string {
  const username = user(p);
  const cfg = p.statsCard;
  const palette = resolveThemePalette(p);
  const baseUrl = resolveStatsApiBase(cfg);
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
  if (cfg?.includeAllCommits === true) params.set("include_all_commits", "true");
  if (cfg?.countPrivate) params.set("count_private", "true");
  if (cfg?.hideRank) params.set("hide_rank", "true");
  if (cfg?.hideMetrics && cfg.hideMetrics.length > 0) params.set("hide", cfg.hideMetrics.join(","));
  const radius = cfg?.borderRadius ?? 12;
  if (radius !== undefined) params.set("border_radius", String(radius));
  if (cfg?.bgColor && cfg.theme && cfg.theme !== "default")
    params.set("bg_color", cfg.bgColor.replace(/^#/, ""));
  if (cfg?.textColor && cfg.theme && cfg.theme !== "default")
    params.set("text_color", cfg.textColor.replace(/^#/, ""));
  if (cfg?.accentColor && cfg.theme && cfg.theme !== "default")
    params.set("title_color", cfg.accentColor.replace(/^#/, ""));
  if (cfg?.borderColor && cfg.theme && cfg.theme !== "default")
    params.set("border_color", cfg.borderColor.replace(/^#/, ""));
  if (cfg?.customTitle) params.set("custom_title", cfg.customTitle);
  const hasBorder = !!(cfg?.borderColor || palette.border);
  if (!hasBorder) params.set("hide_border", "true");
  return `${baseUrl}/api?${params.toString()}`;
}

export function langsCardUrl(p: Profile): string {
  const username = user(p);
  const cfg = p.langsCard;
  const palette = resolveThemePalette(p);
  const baseUrl = resolveStatsApiBase(cfg);
  const params = new URLSearchParams();
  params.set("username", username);
  params.set("layout", cfg?.layout || "compact");
  params.set("langs_count", String(Math.min(10, Math.max(1, cfg?.langsCount ?? 6))));

  if (cfg?.includeForks === true) {
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
  if (!hasBorder) params.set("hide_border", "true");
  // Clean endpoint with NO trailing slash before query params
  return `${baseUrl}/api/top-langs?${params.toString()}`;
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
  if (cfg?.fireColor && cfg.theme && cfg.theme !== "default")
    params.set("fire", cfg.fireColor.replace(/^#/, ""));
  if (cfg?.ringColor && cfg.theme && cfg.theme !== "default")
    params.set("ring", cfg.ringColor.replace(/^#/, ""));
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

const xmlEsc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Generate a self-contained SVG for the GitHub Stats card matching the reference design in black/theme colors. */
export function generateStatsCardSvg(p: Profile): string {
  const username = p.username.trim() || "github";
  const displayName = p.name.trim() || username;
  const palette = resolveThemePalette(p);
  const cfg = p.statsCard;

  const bg = (cfg?.bgColor || palette.bg).replace(/^#/, "");
  const titleColor = (cfg?.accentColor || palette.title).replace(/^#/, "");
  const textColor = (cfg?.textColor || palette.text).replace(/^#/, "");
  const iconColor = palette.icon.replace(/^#/, "");
  const borderColor = (cfg?.borderColor || palette.border).replace(/^#/, "");
  // Five distinct stat value colors
  const statColorCommits = (cfg?.statColorCommits || palette.statColorCommits).replace(/^#/, "");
  const statColorStars = (cfg?.statColorStars || palette.statColorStars).replace(/^#/, "");
  const statColorPrs = (cfg?.statColorPrs || palette.statColorPrs).replace(/^#/, "");
  const statColorIssues = (cfg?.statColorIssues || palette.statColorIssues).replace(/^#/, "");
  const statColorForks = (cfg?.statColorForks || palette.statColorForks).replace(/^#/, "");
  const radius = cfg?.borderRadius ?? 12;

  const width = 495;
  const height = 245;
  const pad = 25;
  const fontFamily = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif`;

  const data = p.githubStats;
  const repos = data?.publicRepos ?? 0;
  const stars = data?.totalStars ?? 0;
  const forks = data?.totalForks ?? 0;
  const followers = data?.followers ?? 0;

  // Real or demo stats formatted like the reference card
  const commitsLabel = `Total Commits (${new Date().getFullYear()}):`;
  const commitsVal = stars * 12 + repos * 25 + forks * 8 || 523;
  const prsVal = forks || 8;
  const issuesVal = Math.max(1, Math.round(stars / 4)) || 2;

  const title = cfg?.customTitle?.trim() || `${displayName}'s GitHub Stats`;

  const logoX = width - 82;
  const logoY = 105;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <rect width="${width}" height="${height}" rx="${radius}" fill="#${bg}" stroke="#${borderColor}" stroke-width="1"/>
  <text x="${pad}" y="42" font-family="${fontFamily}" font-size="18" font-weight="700" fill="#${titleColor}">${xmlEsc(title)}</text>
  
  <!-- Row 1: Total Commits -->
  <g transform="translate(${pad}, 68)" fill="#${statColorCommits}">
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.375.65l2.5 1.5a.75.75 0 00.75-1.3L8.5 7.91V4.75z"></path>
    </svg>
    <text x="28" y="14" font-family="${fontFamily}" font-size="14" font-weight="600" fill="#${textColor}">${xmlEsc(commitsLabel)}</text>
    <text x="210" y="14" font-family="${fontFamily}" font-size="14" font-weight="700" fill="#${statColorCommits}">${commitsVal.toLocaleString()}</text>
  </g>

  <!-- Row 2: Total PRs -->
  <g transform="translate(${pad}, 104)" fill="#${statColorPrs}">
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
    </svg>
    <text x="28" y="14" font-family="${fontFamily}" font-size="14" font-weight="600" fill="#${textColor}">Total PRs:</text>
    <text x="210" y="14" font-family="${fontFamily}" font-size="14" font-weight="700" fill="#${statColorPrs}">${prsVal.toLocaleString()}</text>
  </g>

  <!-- Row 3: Total Issues -->
  <g transform="translate(${pad}, 140)" fill="#${statColorIssues}">
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
      <path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
    </svg>
    <text x="28" y="14" font-family="${fontFamily}" font-size="14" font-weight="600" fill="#${textColor}">Total Issues:</text>
    <text x="210" y="14" font-family="${fontFamily}" font-size="14" font-weight="700" fill="#${statColorIssues}">${issuesVal.toLocaleString()}</text>
  </g>

  <!-- Row 4: Total Stars -->
  <g transform="translate(${pad}, 176)" fill="#${statColorStars}">
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path fill-rule="evenodd" d="M16 6.31a.498.498 0 00-.76-.439l-2.74-.956 1.09-4.235a.499.499 0 00-1.395-.29l-1.54 2.363-2.74-.956a.499.499 0 00-.61 0l-2.74.956 1.09 4.235a.5.5 0 001.395.29l1.54-2.362 2.74.956a.5.5 0 00.76-.439zM8 10.625a.5.5 0 01-.5-.5V8a.5.5 0 00-1 0v2.125a.5.5 0 01-1 0V8a.5.5 0 00-1 0v2.125a.5.5 0 01-1 0V8a.5.5 0 00-1 0v2.125a.5.5 0 01-1 0V8a.5.5 0 00-1 0v2.125a.5.5 0 01-1 0V8a.5.5 0 00-1 0V7a.5.5 0 011 0v1a.5.5 0 001 0v1a.5.5 0 011 0v1a.5.5 0 001 0v1a.5.5 0 011 0v1a.5.5 0 001 0v1a.5.5 0 011 0v1a.5.5 0 001 0z"></path>
    </svg>
    <text x="28" y="14" font-family="${fontFamily}" font-size="14" font-weight="600" fill="#${textColor}">Total Stars:</text>
    <text x="210" y="14" font-family="${fontFamily}" font-size="14" font-weight="700" fill="#${statColorStars}">${(data?.totalStars ?? stars).toLocaleString()}</text>
  </g>

  <!-- Row 5: Total Forks -->
  <g transform="translate(${pad}, 212)" fill="#${statColorForks}">
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
      <path fill-rule="evenodd" d="M7.25 1H5.5A2.75 2.75 0 002.75 3.75v1.168c0 .437.156.847.416 1.169l.858 1.072a1.75 1.75 0 012.434 0l.858-1.072A1.75 1.75 0 016.334 4.918V3.75C6.334 3.336 6.747 3 7.25 3s.916.336.916.75v1.168a1.75 1.75 0 012.434 0l.858 1.072a1.75 1.75 0 012.434 0l.858-1.072A1.75 1.75 0 019.416 4.918V3.75c0-.414.414-.75.916-.75S10.25 3.336 10.25 3.75v1.168a1.75 1.75 0 012.434 0l.858 1.072a1.75 1.75 0 012.434 0l.858-1.072A2.75 2.75 0 0013.25 3.75V1.75C13.25.784 12.466 0 11.5 0H7.25C6.354 0 5.566.784 5.566 1.75zM4.25 4c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v1.373c0 .324-.145.634-.383.84l-.922.784c-.299.254-.437.604-.345.945l.108.402c.121.455.573.74 1.019.74s.899-.285 1.019-.74l.108-.402c.092-.34-.046-.69-.345-.945l-.922-.784c-.238-.205-.383-.516-.383-.84V4zM11.25 4c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v1.373c0 .324-.145.634-.383.84l-.922.784c-.299.254-.437.604-.345.945l.108.402c.121.455.573.74 1.019.74s.899-.285 1.019-.74l.108-.402c.092-.34-.046-.69-.345-.945l-.922-.784c-.238-.205-.383-.516-.383-.84V4zM8.25 8c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v1.373c0 .324-.145.634-.383.84l-.922.784c-.299.254-.437.604-.345.945l.108.402c.121.455.573.74 1.019.74s.899-.285 1.019-.74l.108-.402c.092-.34-.046-.69-.345-.945l-.922-.784c-.238-.205-.383-.516-.383-.84V8z"></path>
    </svg>
    <text x="28" y="14" font-family="${fontFamily}" font-size="14" font-weight="600" fill="#${textColor}">Total Forks:</text>
    <text x="210" y="14" font-family="${fontFamily}" font-size="14" font-weight="700" fill="#${statColorForks}">${(data?.totalForks ?? forks).toLocaleString()}</text>
  </g>

  <!-- Right side Octocat Circle Gauge -->
  <circle cx="${logoX}" cy="${logoY}" r="42" fill="none" stroke="#${borderColor}" stroke-width="4" opacity="0.4"/>
  <circle cx="${logoX}" cy="${logoY}" r="42" fill="none" stroke="#${iconColor}" stroke-width="4" stroke-dasharray="264" stroke-dashoffset="66" stroke-linecap="round"/>
  <circle cx="${logoX}" cy="${logoY}" r="34" fill="#${bg}" stroke="#${borderColor}" stroke-width="1"/>
  <g transform="translate(${logoX - 18}, ${logoY - 18})" fill="#FFFFFF">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
    </svg>
  </g>
</svg>`;
}

export function generateStatsCardDataUri(p: Profile): string {
  const svg = generateStatsCardSvg(p);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Generate a self-contained SVG for the Top Languages card matching the reference design in black/theme colors. */
export function generateLangsCardSvg(p: Profile): string {
  const palette = resolveThemePalette(p);
  const cfg = p.langsCard;

  const bg = palette.bg.replace(/^#/, "");
  const titleColor = palette.title.replace(/^#/, "");
  const textColor = palette.text.replace(/^#/, "");
  const borderColor = palette.border.replace(/^#/, "");
  const radius = cfg?.borderRadius ?? 12;

  // Priority 1: Real calculated languageStats from fetched GitHub profile
  // Priority 2: Custom languages if defined by user
  // Priority 3: Default reference languages
  let langs: Array<{ name: string; percent: number; color: string }>;

  if (p.githubStats?.languageStats && p.githubStats.languageStats.length > 0) {
    langs = p.githubStats.languageStats.slice(0, 6).map((l) => ({
      name: l.name,
      percent: l.percent,
      color: l.color,
    }));
  } else if (cfg?.customLanguages && cfg.customLanguages.length > 0) {
    langs = cfg.customLanguages;
  } else {
    langs = [
      { name: "HTML", percent: 32.93, color: "E34F26" },
      { name: "CSS", percent: 32.55, color: "1572B6" },
      { name: "Java", percent: 23.98, color: "ED8B00" },
      { name: "JavaScript", percent: 6.25, color: "F7DF1E" },
      { name: "Python", percent: 4.04, color: "3776AB" },
      { name: "Dockerfile", percent: 0.24, color: "2496ED" },
    ];
  }

  const width = 495;
  const pad = 25;
  const contentWidth = width - pad * 2;
  const barHeight = 10;
  const fontFamily = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif`;

  const total = langs.reduce((sum, l) => sum + (l.percent || 0), 0) || 100;

  let currentX = pad;
  const barSegments = langs.map((lang) => {
    const segWidth = ((lang.percent || 0) / total) * contentWidth;
    const x = currentX;
    currentX += segWidth;
    return `<rect x="${x}" y="56" width="${Math.max(2, segWidth)}" height="${barHeight}" fill="#${(lang.color || "58A6FF").replace(/^#/, "")}" />`;
  });

  const col1 = langs.filter((_, i) => i % 2 === 0);
  const col2 = langs.filter((_, i) => i % 2 === 1);
  const rowCount = Math.max(col1.length, col2.length, 1);
  const cardHeight = Math.max(165, 80 + rowCount * 26 + 15);

  const langItemsCol1 = col1.map((lang, idx) => {
    const y = 92 + idx * 26;
    return `
      <circle cx="${pad + 6}" cy="${y - 4}" r="5" fill="#${(lang.color || "58A6FF").replace(/^#/, "")}" />
      <text x="${pad + 20}" y="${y}" font-family="${fontFamily}" font-size="13" font-weight="500" fill="#${textColor}">${xmlEsc(lang.name)}</text>
      <text x="${pad + 130}" y="${y}" font-family="${fontFamily}" font-size="12" fill="#${textColor}" opacity="0.8">${Number(lang.percent).toFixed(2)}%</text>
    `;
  });

  const langItemsCol2 = col2.map((lang, idx) => {
    const y = 92 + idx * 26;
    const col2X = pad + 230;
    return `
      <circle cx="${col2X + 6}" cy="${y - 4}" r="5" fill="#${(lang.color || "58A6FF").replace(/^#/, "")}" />
      <text x="${col2X + 20}" y="${y}" font-family="${fontFamily}" font-size="13" font-weight="500" fill="#${textColor}">${xmlEsc(lang.name)}</text>
      <text x="${col2X + 130}" y="${y}" font-family="${fontFamily}" font-size="12" fill="#${textColor}" opacity="0.8">${Number(lang.percent).toFixed(2)}%</text>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${cardHeight}" viewBox="0 0 ${width} ${cardHeight}" fill="none">
    <rect width="${width}" height="${cardHeight}" rx="${radius}" fill="#${bg}" stroke="#${borderColor}" stroke-width="1"/>
    <text x="${pad}" y="38" font-family="${fontFamily}" font-size="18" font-weight="700" fill="#${titleColor}">Most Used Languages</text>
    <g clip-path="url(#bar-clip-main)">
      <rect x="${pad}" y="56" width="${contentWidth}" height="${barHeight}" rx="5" fill="#1e2638" />
      ${barSegments.join("")}
    </g>
    <defs>
      <clipPath id="bar-clip-main">
        <rect x="${pad}" y="56" width="${contentWidth}" height="${barHeight}" rx="5" />
      </clipPath>
    </defs>
    ${langItemsCol1.join("")}
    ${langItemsCol2.join("")}
  </svg>`;
}

export function generateLangsCardDataUri(p: Profile): string {
  const svg = generateLangsCardSvg(p);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
