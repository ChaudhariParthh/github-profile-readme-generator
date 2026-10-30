import {
  appearanceById,
  DEFAULT_APPEARANCE_ID,
  DEFAULT_STATS_THEME_ID,
  resolvedAccent,
  resolvedBanner,
  statsThemeById,
  trophyCardUrl,
} from "./appearance";

// ---------- Technology catalog ----------
// [label, simple-icons slug, hex color, optional devicon path for logos simple-icons doesn't ship]
export type SkillDef = [string, string, string, string?];

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

export const SKILL_CATEGORIES: Record<string, SkillDef[]> = {
  Languages: [
    ["JavaScript", "javascript", "F7DF1E"],
    ["TypeScript", "typescript", "3178C6"],
    ["Python", "python", "3776AB"],
    ["C", "c", "A8B9CC"],
    ["C++", "cplusplus", "00599C"],
    ["C#", "csharp", "512BD4", "csharp/csharp-original.svg"],
    ["Go", "go", "00ADD8"],
    ["Rust", "rust", "000000"],
    ["Java", "openjdk", "ED8B00", "java/java-original.svg"],
    ["Kotlin", "kotlin", "7F52FF"],
    ["Swift", "swift", "F05138"],
    ["Dart", "dart", "0175C2"],
    ["PHP", "php", "777BB4"],
    ["Ruby", "ruby", "CC342D"],
    ["Scala", "scala", "DC322F"],
    ["Elixir", "elixir", "4B275F"],
    ["Haskell", "haskell", "5D4F85"],
    ["Lua", "lua", "2C2D72"],
    ["Bash", "gnubash", "4EAA25"],
  ],
  Frontend: [
    ["React", "react", "61DAFB"],
    ["Next.js", "nextdotjs", "000000"],
    ["Vue.js", "vuedotjs", "4FC08D"],
    ["Nuxt", "nuxtdotjs", "00DC82"],
    ["Svelte", "svelte", "FF3E00"],
    ["Angular", "angular", "DD0031"],
    ["Tailwind CSS", "tailwindcss", "06B6D4"],
    ["Bootstrap", "bootstrap", "7952B3"],
    ["HTML5", "html5", "E34F26"],
    ["CSS3", "css3", "1572B6", "css3/css3-original.svg"],
    ["Sass", "sass", "CC6699"],
    ["Redux", "redux", "764ABC"],
    ["Vite", "vite", "646CFF"],
    ["Webpack", "webpack", "8DD6F9"],
    ["Three.js", "threedotjs", "000000"],
  ],
  Backend: [
    ["Node.js", "nodedotjs", "339933"],
    ["Express", "express", "000000"],
    ["NestJS", "nestjs", "E0234E"],
    ["Django", "django", "092E20"],
    ["FastAPI", "fastapi", "009688"],
    ["Flask", "flask", "000000"],
    ["Spring Boot", "springboot", "6DB33F"],
    ["Laravel", "laravel", "FF2D20"],
    ["GraphQL", "graphql", "E10098"],
    ["tRPC", "trpc", "2596BE"],
    [".NET", "dotnet", "512BD4"],
    ["Rails", "rubyonrails", "D30001"],
    ["Flutter", "flutter", "02569B"],
    ["React Native", "react", "61DAFB"],
    ["Android", "android", "3DDC84"],
  ],
  "AI / ML": [
    ["PyTorch", "pytorch", "EE4C2C"],
    ["TensorFlow", "tensorflow", "FF6F00"],
    ["scikit-learn", "scikitlearn", "F7931E"],
    ["Pandas", "pandas", "150458"],
    ["NumPy", "numpy", "013243"],
    ["OpenCV", "opencv", "5C3EE8"],
    ["Hugging Face", "huggingface", "FFD21E"],
    ["LangChain", "langchain", "1C3C3C"],
    ["Jupyter", "jupyter", "F37626"],
    ["Keras", "keras", "D00000"],
    ["OpenAI", "openai", "412991", "openai/openai-original.svg"],
  ],
  Cybersecurity: [
    ["Kali Linux", "kalilinux", "557C94"],
    ["Wireshark", "wireshark", "1679A7"],
    ["Metasploit", "metasploit", "2596CD"],
    ["Burp Suite", "burpsuite", "FF6633"],
    ["OWASP", "owasp", "000000"],
    ["Hack The Box", "hackthebox", "9FEF00"],
    ["TryHackMe", "tryhackme", "212C42"],
    ["Snyk", "snyk", "4C4A73"],
    ["Splunk", "splunk", "000000"],
    ["Parrot OS", "parrotsecurity", "15E0ED"],
  ],
  Cloud: [
    [
      "AWS",
      "amazonwebservices",
      "232F3E",
      "amazonwebservices/amazonwebservices-original-wordmark.svg",
    ],
    ["Google Cloud", "googlecloud", "4285F4"],
    ["Azure", "microsoftazure", "0078D4", "azure/azure-original.svg"],
    ["Vercel", "vercel", "000000"],
    ["Netlify", "netlify", "00C7B7"],
    ["Cloudflare", "cloudflare", "F38020"],
    ["Firebase", "firebase", "FFCA28"],
    ["Supabase", "supabase", "3FCF8E"],
    ["Heroku", "heroku", "430098"],
  ],
  Databases: [
    ["PostgreSQL", "postgresql", "4169E1"],
    ["MongoDB", "mongodb", "47A248"],
    ["MySQL", "mysql", "4479A1"],
    ["Redis", "redis", "DC382D"],
    ["SQLite", "sqlite", "003B57"],
    ["MariaDB", "mariadb", "003545"],
    ["Elasticsearch", "elasticsearch", "005571"],
    ["DynamoDB", "amazondynamodb", "4053D6"],
    ["Prisma", "prisma", "2D3748"],
  ],
  DevOps: [
    ["Docker", "docker", "2496ED"],
    ["Kubernetes", "kubernetes", "326CE5"],
    ["Linux", "linux", "FCC624"],
    ["Nginx", "nginx", "009639"],
    ["GitHub Actions", "githubactions", "2088FF"],
    ["Terraform", "terraform", "844FBA"],
    ["Jenkins", "jenkins", "D24939"],
    ["Ansible", "ansible", "EE0000"],
    ["Git", "git", "F05032"],
    ["GitHub", "github", "181717"],
    ["Grafana", "grafana", "F46800"],
    ["Prometheus", "prometheus", "E6522C"],
  ],
  Tools: [
    ["Figma", "figma", "F24E1E"],
    ["Postman", "postman", "FF6C37"],
    ["VS Code", "visualstudiocode", "007ACC", "vscode/vscode-original.svg"],
    ["Jest", "jest", "C21325"],
    ["Vitest", "vitest", "6E9F18"],
    ["Cypress", "cypress", "17202C"],
    ["Playwright", "playwright", "2EAD33", "playwright/playwright-original.svg"],
    ["Blender", "blender", "F5792A"],
    ["Notion", "notion", "000000"],
  ],
};

export const SKILL_INDEX: Record<string, SkillDef> = Object.fromEntries(
  Object.values(SKILL_CATEGORIES)
    .flat()
    .map((s) => [s[0], s]),
);

// ---------- Socials ----------
export const SOCIAL_META: Record<
  string,
  { color: string; logo: string; url: (h: string) => string; placeholder: string }
> = {
  GitHub: {
    color: "181717",
    logo: "github",
    url: (h) => `https://github.com/${enc(h)}`,
    placeholder: "username",
  },
  LinkedIn: {
    color: "0A66C2",
    logo: "linkedin",
    url: (h) => `https://linkedin.com/in/${enc(h)}`,
    placeholder: "username",
  },
  X: { color: "000000", logo: "x", url: (h) => `https://x.com/${enc(h)}`, placeholder: "username" },
  "Dev.to": {
    color: "0A0A0A",
    logo: "devdotto",
    url: (h) => `https://dev.to/${enc(h)}`,
    placeholder: "username",
  },
  Hashnode: {
    color: "2962FF",
    logo: "hashnode",
    url: (h) => `https://hashnode.com/@${enc(h.replace(/^@/, ""))}`,
    placeholder: "username",
  },
  Medium: {
    color: "000000",
    logo: "medium",
    url: (h) => `https://medium.com/@${enc(h.replace(/^@/, ""))}`,
    placeholder: "username",
  },
  YouTube: {
    color: "FF0000",
    logo: "youtube",
    url: (h) => `https://youtube.com/@${enc(h.replace(/^@/, ""))}`,
    placeholder: "channel",
  },
  Discord: {
    color: "5865F2",
    logo: "discord",
    url: (h) => `https://discord.gg/${enc(h)}`,
    placeholder: "invite code",
  },
  "Stack Overflow": {
    color: "F58025",
    logo: "stackoverflow",
    url: (h) => `https://stackoverflow.com/users/${enc(h)}`,
    placeholder: "user ID",
  },
  LeetCode: {
    color: "FFA116",
    logo: "leetcode",
    url: (h) => `https://leetcode.com/${enc(h)}`,
    placeholder: "username",
  },
  Kaggle: {
    color: "20BEFF",
    logo: "kaggle",
    url: (h) => `https://kaggle.com/${enc(h)}`,
    placeholder: "username",
  },
  "Hack The Box": {
    color: "111927",
    logo: "hackthebox",
    url: (h) => `https://app.hackthebox.com/profile/${enc(h)}`,
    placeholder: "profile ID",
  },
  TryHackMe: {
    color: "212C42",
    logo: "tryhackme",
    url: (h) => `https://tryhackme.com/p/${enc(h)}`,
    placeholder: "username",
  },
  Instagram: {
    color: "E4405F",
    logo: "instagram",
    url: (h) => `https://instagram.com/${enc(h)}`,
    placeholder: "username",
  },
  Portfolio: {
    color: "8B5CF6",
    logo: "googlechrome",
    url: (h) => (/^https?:\/\//i.test(h) ? h : `https://${h}`),
    placeholder: "yoursite.dev",
  },
  Email: {
    color: "EA4335",
    logo: "gmail",
    url: (h) => `mailto:${h}`,
    placeholder: "you@example.com",
  },
};

// ---------- Types ----------
export const BADGE_STYLES = ["for-the-badge", "flat", "flat-square", "plastic"] as const;
export type BadgeStyle = (typeof BADGE_STYLES)[number];
export const TECH_DISPLAYS = ["badges", "icons", "compact"] as const;
export type TechDisplay = (typeof TECH_DISPLAYS)[number];
export const TYPING_FONTS = [
  "Fira Code",
  "JetBrains Mono",
  "Roboto Mono",
  "Press Start 2P",
  "Orbitron",
  "Space Mono",
  "IBM Plex Mono",
  "Source Code Pro",
] as const;
export type TypingFont = (typeof TYPING_FONTS)[number];
export type BannerMotion = "none" | "svg-anim";
export type BlogSource = "none" | "devto" | "medium" | "rss";

export const BUILTIN_SECTIONS = {
  header: "Header & Intro",
  typing: "Animated Typing",
  visitors: "Visitor Counter",
  about: "About Me",
  work: "Work & Experience",
  skills: "Technologies & Tools",
  projects: "Featured Projects",
  trophies: "GitHub Trophies",
  stats: "GitHub Stats",
  graph: "Contribution Graph",
  blog: "Latest Blog Posts",
  socials: "Social Links",
  support: "Support",
} as const;
export type BuiltinId = keyof typeof BUILTIN_SECTIONS;
export type SectionEntry = { id: string; hidden: boolean };
export type CustomSection = { title: string; body: string };

export type Work = {
  working: string;
  workingLink: string;
  collab: string;
  collabLink: string;
  learning: string;
  askMe: string;
  reach: string;
  funFact: string;
  blog: string;
  resume: string;
};
export type Project = { name: string; url: string; description: string; gradientStart?: string; gradientEnd?: string };

export type GitHubStatsData = {
  repos: Array<{
    name: string;
    url: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
  }>;
  languages: string[];
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicRepos: number;
  warning: string | null;
};

export type Profile = {
  name: string;
  username: string;
  title: string;
  location: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string; // static image or GIF
  appearanceId: string;
  accentColor: string;
  customBanner: boolean;
  bannerMotion: BannerMotion;
  statsTheme: string;
  githubStats: GitHubStatsData | null;
  typing: { lines: string; font: TypingFont; size: number; color: string; center: boolean };
  work: Work;
  skills: string[];
  techDisplay: TechDisplay;
  badgeStyle: BadgeStyle;
  socials: Record<string, string>;
  projects: Project[];
  addons: { 
    blog: BlogSource; 
    blogHandle: string; 
    stats: boolean; 
    langs: boolean; 
    streak: boolean;
    statsOverview: boolean;
    contributionGraph: boolean;
  };
  support: { bmc: string; kofi: string; chai: string; sponsors: boolean };
  sections: SectionEntry[];
  custom: Record<string, CustomSection>;
};

const ALL_SECTIONS = (hide: BuiltinId[] = []): SectionEntry[] =>
  (Object.keys(BUILTIN_SECTIONS) as BuiltinId[]).map((id) => ({ id, hidden: hide.includes(id) }));

const emptyWork: Work = {
  working: "",
  workingLink: "",
  collab: "",
  collabLink: "",
  learning: "",
  askMe: "",
  reach: "",
  funFact: "",
  blog: "",
  resume: "",
};

export const seedProfile: Profile = {
  // New visitors start blank: no personal data ships with the app.
  name: "",
  username: "",
  title: "",
  location: "",
  bio: "",
  avatarUrl: "",
  bannerUrl: appearanceById(DEFAULT_APPEARANCE_ID).bannerUrl,
  appearanceId: DEFAULT_APPEARANCE_ID,
  accentColor: appearanceById(DEFAULT_APPEARANCE_ID).accent,
  customBanner: false,
  bannerMotion: "svg-anim",
  statsTheme: DEFAULT_STATS_THEME_ID,
  githubStats: null,
  typing: {
    lines: "",
    font: "Fira Code",
    size: 22,
    color: "22D3EE",
    center: true,
  },
  work: { ...emptyWork },
  skills: [],
  techDisplay: "badges",
  badgeStyle: "for-the-badge",
  socials: {},
  projects: [],
  addons: { blog: "none", blogHandle: "", stats: true, langs: true, streak: true, statsOverview: true, contributionGraph: true },
  support: { bmc: "", kofi: "", chai: "", sponsors: false },
  sections: ALL_SECTIONS(["trophies", "graph", "blog", "support", "projects"]),
  custom: {},
};

// ---------- Safety helpers ----------
export const enc = (s: string) => encodeURIComponent(s.trim());
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Only http(s) and mailto URLs are allowed; anything else (javascript:, data:, etc.) is dropped. */
export function safeUrl(raw: string | undefined | null): string {
  const s = (raw ?? "").trim();
  if (!s) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^mailto:[^\s<>"]+$/i.test(s)) return s;
  if (/^data:image\/(?:png|jpeg|gif|webp);base64,[a-z0-9+/]+=*$/i.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.protocol !== "https:" && u.protocol !== "http:") return "";
    return u.toString().replace(/"/g, "%22");
  } catch {
    return "";
  }
}

const safeChaiUrl = (raw: string): string => {
  const url = safeUrl(raw);
  if (!url) return "";
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === "buymeachai.in" || host === "www.buymeachai.in" ? url : "";
  } catch {
    return "";
  }
};

const hexOk = (h: string) => (/^[0-9a-f]{6}$/i.test(h) ? h.toUpperCase() : "22D3EE");
const validBadgeStyle = (style: string): BadgeStyle =>
  BADGE_STYLES.includes(style as BadgeStyle) ? (style as BadgeStyle) : "for-the-badge";
const validHandle = (value: string) => (/^[a-z\d][a-z\d._-]{0,79}$/i.test(value) ? value : "");
const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace(/^#/, "").toUpperCase();
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b];
};

// ---------- URL builders ----------
const badge = (label: string, color: string, logo: string, style: BadgeStyle) =>
  `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--").replace(/_/g, "__"))}-${hexOk(color)}?style=${validBadgeStyle(style)}&logo=${encodeURIComponent(logo)}&logoColor=white`;

export const skillBadgeUrl = (t: string, style: BadgeStyle = "for-the-badge") => {
  const s = SKILL_INDEX[t];
  return badge(t, s?.[2] ?? "555555", s?.[1] ?? "", validBadgeStyle(style));
};
const relativeLuminance = (hex: string) => {
  const channels = [0, 2, 4].map((index) => {
    const value = parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
};
/** Clear, branded icons for skill chips — Simple Icons preferred, DevIcons fallback. */
export const skillIconUrl = (t: string) => {
  const s = SKILL_INDEX[t];
  if (!s) return "";
  // Simple Icons URL (clear, branded SVG): https://simpleicons.org/
  const slug = s[1];
  return `https://cdn.simpleicons.org/${slug}`;
};
export const socialBadgeUrl = (p: string, style: BadgeStyle = "for-the-badge") => {
  const m = SOCIAL_META[p];
  return badge(p, m?.color ?? "555555", m?.logo ?? "", validBadgeStyle(style));
};

const u = (p: Profile) => {
  const username = p.username.trim();
  return /^[a-z\d](?:[a-z\d-]{0,38})$/i.test(username) ? enc(username) : "";
};
export const trophyUrl = (p: Profile) => trophyCardUrl(p);
export const visitorsUrl = (p: Profile) =>
  u(p)
    ? `https://komarev.com/ghpvc/?username=${u(p)}&label=Profile%20views&color=${resolvedAccent(p)}&style=flat`
    : "";
export const graphUrl = (p: Profile): string =>
  u(p) ? `https://ghchart.rshah.org/${resolvedAccent(p)}/${u(p)}` : "";
export const pinUrl = (p: Profile, owner: string, repo: string): string =>
  `https://github-readme-stats.vercel.app/api/pin/?username=${enc(owner)}&repo=${enc(repo)}&theme=default&hide_border=true`;
export const typingUrl = (p: Profile) => {
  const lines = p.typing.lines
    .split("\n")
    .map((l) => l.replace(/;/g, ",").trim())
    .filter(Boolean)
    .slice(0, 8);
  const font = TYPING_FONTS.includes(p.typing.font as TypingFont)
    ? p.typing.font
    : seedProfile.typing.font;
  const size = Math.min(40, Math.max(12, Number(p.typing.size) || 22));
  return `https://readme-typing-svg.demolab.com?font=${encodeURIComponent(font).replace(/%20/g, "+")}&weight=600&size=${size}&pause=1000&color=${hexOk(p.typing.color)}&center=${p.typing.center}&vCenter=true&width=600&lines=${lines.map(encodeURIComponent).join(";")}`;
};

// ---------- Stats section renderer ----------

const STATS_IMG = (src: string, alt: string) => (src ? `<img src="${src}" alt="${esc(alt)}" />` : "");

/** Render the GitHub Stats section as Markdown lines using the selected stats theme and live widget data. */
export function renderStatsSection(p: Profile): string[] {
  const { stats, langs, streak, contributionGraph } = p.addons;
  const data = p.githubStats;
  const username = u(p);
  if (!username) return [];

  const theme = statsThemeById(p.statsTheme);
  const accent = resolvedAccent(p);

  const statsUrl = stats
    ? `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true`
    : "";
  const langsUrl = langs
    ? `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true`
    : "";
  const streakUrl = streak
    ? `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=default&hide_border=true`
    : "";
  const graphUrl = contributionGraph ? `https://ghchart.rshah.org/${accent}/${username}` : "";

  const out: string[] = [];
  out.push("## GitHub Stats", "");

  const metrics = data
    ? [
        { label: "Public repos", value: data.publicRepos },
        { label: "Followers", value: data.followers },
        { label: "Following", value: data.following },
        { label: "Total stars", value: data.totalStars },
      ]
    : [];

  switch (theme.id) {
    case "glassmorphism":
      out.push(...glassmorphismTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
    case "neon-glow":
      out.push(...neonGlowTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
    case "minimalist":
      out.push(...minimalistTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent, metrics));
      break;
    case "gradient-waves":
      out.push(...gradientWavesTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
    case "card-stack":
      out.push(...cardStackTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
    case "timeline":
      out.push(...timelineTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
    case "hexagon":
      out.push(...hexagonTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
    case "isometric":
      out.push(...isometricTheme(statsUrl, langsUrl, streakUrl, graphUrl, theme.accent));
      break;
  }

  return out.filter((line, i, arr) => !(line === "" && arr[i - 1] === ""));
}

function wrap(style: string, inner: string): string {
  return `<div style="${style}">${inner}</div>`;
}

function row(inner: string, gap = "12px"): string {
  return `<div style="display:flex;flex-wrap:wrap;gap:${gap};align-items:flex-start;">${inner}</div>`;
}

function glassmorphismTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return ["", wrap(`display:flex;flex-direction:column;gap:14px;background:rgba(255,255,255,0.04);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.2);border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.45),inset 0 0 0 1px rgba(255,255,255,0.1);padding:20px;`, body), ""];
}

function neonGlowTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return [
    "",
    wrap(`font-family:'Courier New',Courier,monospace;display:flex;flex-direction:column;gap:14px;background:#0a0a0a;border:2px solid ${a};border-radius:12px;box-shadow:0 0 22px ${a}44,inset 0 0 18px ${a}22;color:#fff;padding:18px;`, body),
    "",
  ];
}

function minimalistTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string, metrics: Array<{ label: string; value: number }>): string[] {
  const a = `#${accent}`;
  const metricHtml = metrics
    .map((m) => `<div style="display:flex;flex-direction:column;gap:2px;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;opacity:0.6;">${esc(m.label)}</div><div style="font-size:24px;font-weight:800;color:${a};">${m.value}</div></div>`)
    .join("");
  const metricsBlock = metrics.length ? wrap(`display:flex;gap:26px;`, metricHtml) : "";
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const cards = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return ["", wrap(`display:flex;flex-direction:column;gap:18px;background:#ffffff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06);padding:26px;color:#111;`, metricsBlock + wrap(`display:flex;flex-wrap:wrap;gap:14px;`, cards)), ""];
}

function gradientWavesTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const b = accent === "8B5CF6" ? "F472B6" : accent;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return [
    "",
    wrap(`position:relative;overflow:hidden;display:flex;flex-direction:column;gap:14px;border-radius:22px;box-shadow:0 20px 50px rgba(0,0,0,0.45);padding:22px;background:linear-gradient(135deg,${a}22,${b}22);border:1px solid rgba(255,255,255,0.15);`, `<div style="position:absolute;inset:-20%;z-index:0;border-radius:inherit;background:conic-gradient(from 0deg,transparent,${a}40,transparent,${b}40,transparent);opacity:0.55;"></div><div style="position:relative;z-index:1;">${body}</div>`),
    "",
  ];
}

function cardStackTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return [
    "",
    wrap(`perspective:1200px;display:flex;flex-direction:column;gap:8px;padding:26px;border-radius:18px;background:#111;border:1px solid #333;box-shadow:0 30px 60px rgba(0,0,0,0.5);`, `<div style="transform:rotateX(8deg) rotateY(-4deg) scale(0.98);transform-origin:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.6);border:1px solid ${a}55;border-radius:14px;overflow:hidden;">${body}</div>`),
    "",
  ];
}

function timelineTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return [
    "",
    wrap(`display:flex;flex-direction:column;gap:10px;border-radius:16px;background:#0b1120;border:1px solid ${a}55;box-shadow:0 0 30px ${a}22;padding:18px;color:#e5e7eb;`, `<div style="height:3px;background:linear-gradient(90deg,${a},transparent);border-radius:2px;margin-bottom:10px;"></div><div style="display:flex;flex-wrap:wrap;gap:10px;opacity:0.95;">${body}</div>`),
    "",
  ];
}

function hexagonTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return [
    "",
    wrap(`display:flex;flex-wrap:wrap;gap:16px;justify-content:center;border-radius:16px;background:#0a0a0a;border:1px solid ${a}44;box-shadow:0 0 40px ${a}20;padding:20px;`, body),
    "",
  ];
}

function isometricTheme(statsUrl: string, langsUrl: string, streakUrl: string, graphUrl: string, accent: string): string[] {
  const a = `#${accent}`;
  const inner = [STATS_IMG(statsUrl, "GitHub stats"), STATS_IMG(langsUrl, "Top languages")].filter(Boolean).join("");
  const streakHtml = STATS_IMG(streakUrl, "GitHub streak");
  const graphHtml = STATS_IMG(graphUrl, "Contribution graph");
  const body = [inner, streakHtml, graphHtml].filter(Boolean).join("");
  return [
    "",
    wrap(`transform:rotateX(45deg) scale(0.92);transform-origin:center;display:flex;flex-direction:column;gap:10px;border-radius:16px;background:linear-gradient(135deg,#161b22,#1f2937);border:1px solid ${a}55;box-shadow:0 40px 80px rgba(0,0,0,0.6);padding:24px;`, body),
    "",
  ];
}

const mdLink = (text: string, href: string) => {
  const h = safeUrl(href);
  return h ? `[${esc(text)}](${h})` : `**${esc(text)}**`;
};
const ghRepo = (url: string) => {
  const m = safeUrl(url).match(/^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/i);
  return m ? { owner: m[1]!, repo: m[2]! } : null;
};

// ---------- Markdown ----------
function renderSection(p: Profile, id: string): string[] {
  const w = p.work;
  const out: string[] = [];
  switch (id) {
    case "header": {
      const banner = safeUrl(resolvedBanner(p));
      if (banner)
        out.push(`<p align="center"><img src="${banner}" alt="banner" width="100%" /></p>`, "");
      const avatar = safeUrl(p.avatarUrl);
      if (avatar)
        out.push(
          `<p align="center"><img src="${avatar}" alt="${esc(p.name || p.username)} avatar" width="112" height="112" /></p>`,
          "",
        );
      out.push(`<h1 align="center">Hi, I'm ${esc(p.name)}</h1>`);
      if (p.title || p.location)
        out.push(
          `<h3 align="center">${esc(p.title)}${p.location ? ` · ${esc(p.location)}` : ""}</h3>`,
        );
      break;
    }
    case "typing":
      if (p.typing.lines.trim())
        out.push(
          `<p align="${p.typing.center ? "center" : "left"}"><img src="${typingUrl(p)}" alt="Typing SVG" /></p>`,
        );
      break;
    case "visitors":
      out.push(
        u(p)
          ? `<p align="left"><img src="${visitorsUrl(p)}" alt="profile views" /></p>`
          : `> Enter your GitHub username, then click the GitHub icon to import your profile.`,
      );
      break;
    case "about":
      if (p.bio.trim()) out.push("## About Me", "", esc(p.bio.trim()).replace(/\n+/g, " "));
      break;
    case "work": {
      if (w.working) out.push(`- I'm currently working on ${mdLink(w.working, w.workingLink)}`);
      if (w.collab) out.push(`- I'm looking to collaborate on ${mdLink(w.collab, w.collabLink)}`);
      if (w.learning) out.push(`- I'm currently learning **${esc(w.learning)}**`);
      if (w.askMe) out.push(`- Ask me about **${esc(w.askMe)}**`);
      if (w.reach) out.push(`- How to reach me **${esc(w.reach)}**`);
      if (safeUrl(w.blog)) out.push(`- I regularly write articles on ${mdLink(w.blog, w.blog)}`);
      if (safeUrl(w.resume))
        out.push(`- Know about my experiences ${mdLink("my resume", w.resume)}`);
      if (w.funFact) out.push(`- Fun fact: **${esc(w.funFact)}**`);
      break;
    }
    case "skills": {
      const skills = p.skills.filter((s) => SKILL_INDEX[s]);
      if (!skills.length) break;
      out.push("## Tech Stack", "", `<p align="left">`);
      if (p.techDisplay === "badges") {
        skills.forEach((t) =>
          out.push(`  <img src="${skillBadgeUrl(t, p.badgeStyle)}" alt="${esc(t)}" />`),
        );
      } else {
        const size = p.techDisplay === "icons" ? 48 : 24;
        skills.forEach((t) =>
          out.push(
            `  <img src="${skillIconUrl(t)}" alt="${esc(t)}" title="${esc(t)}" height="${size}" width="${size}" />`,
          ),
        );
      }
      out.push(`</p>`);
      break;
    }
    case "projects": {
      const list = p.projects.filter((x) => x.name.trim());
      if (!list.length) break;
      out.push("## Featured Projects", "");
      
      // Render all projects with gradient boxes
      list.forEach((x) => {
        const gradStart = x.gradientStart || "8B5CF6";
        const gradEnd = x.gradientEnd || "22D3EE";
        const rgb1 = hexToRgb(gradStart);
        const rgb2 = hexToRgb(gradEnd);
        out.push(
          `<div class="project-card" style="background: linear-gradient(135deg, #${gradStart}, #${gradEnd}); background-size: 200% 200%; padding: 2px; border-radius: 10px; margin: 1rem 0; animation: gradient-shift 3s ease infinite;"><div style="background: #0d1117; padding: 1.5rem; border-radius: 8px;"><a href="${safeUrl(x.url)}" style="text-decoration: none; color: inherit;"><h3 style="margin: 0 0 0.5rem; background: linear-gradient(135deg, #${gradStart}, #${gradEnd}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 15px rgba(${rgb1[0]}, ${rgb1[1]}, ${rgb1[2]}, 0.6)) drop-shadow(0 0 30px rgba(${rgb2[0]}, ${rgb2[1]}, ${rgb2[2]}, 0.4)); font-weight: 700; font-size: 1.25rem; animation: text-glow 2s ease-in-out infinite;">${esc(x.name)}</h3>${x.description ? `<p style="margin: 0; color: #8b949e; font-size: 0.9rem; line-height: 1.5;">${esc(x.description)}</p>` : ""}</a></div></div>`,
        );
      });
      break;
    }
    case "trophies":
      out.push(
        "## GitHub Achievements",
        "",
        `<p align="left"><img src="${trophyUrl(p)}" alt="GitHub trophies" /></p>`,
      );
      break;
    case "stats":
      out.push(...renderStatsSection(p));
      break;
    case "graph":
      out.push(
        "## Contribution Graph",
        "",
        `<p align="center"><img src="${graphUrl(p)}" alt="Contribution graph" width="100%" /></p>`,
      );
      break;
    case "blog":
      if (p.addons.blog === "none") break;
      out.push(
        "## Latest Blog Posts",
        "",
        "<!-- BLOG-POST-LIST:START -->",
        "<!-- BLOG-POST-LIST:END -->",
      );
      break;
    case "socials": {
      const socials = Object.entries(p.socials).filter(([k, v]) => v.trim() && SOCIAL_META[k]);
      if (!socials.length) break;
      out.push("## Connect with me", "", `<p align="left">`);
      socials.forEach(([k, v]) => {
        const href = safeUrl(SOCIAL_META[k]!.url(v));
        const img = `<img src="${socialBadgeUrl(k, p.badgeStyle)}" alt="${esc(k)}" />`;
        out.push(href ? `  <a href="${href}" target="_blank">${img}</a>` : `  ${img}`);
      });
      out.push(`</p>`);
      break;
    }
    case "support": {
      const s = p.support;
      const chai = safeChaiUrl(s.chai);
      if (!(s.bmc || s.kofi || chai || s.sponsors)) break;
      out.push("## Support", "", `<p align="left">`);
      const bmc = validHandle(s.bmc);
      const kofi = validHandle(s.kofi);
      if (bmc)
        out.push(
          `  <a href="https://www.buymeacoffee.com/${enc(bmc)}"><img src="${badge("Buy Me a Coffee", "FFDD00", "buymeacoffee", p.badgeStyle)}" alt="Buy me a coffee" /></a>`,
        );
      if (kofi)
        out.push(
          `  <a href="https://ko-fi.com/${enc(kofi)}"><img src="${badge("Ko-fi", "FF5E5B", "kofi", p.badgeStyle)}" alt="Ko-fi" /></a>`,
        );
      if (chai)
        out.push(
          `  <a href="${chai}"><img src="${badge("Buy Me Chai", "F59E0B", "", p.badgeStyle)}" alt="Buy me chai" /></a>`,
        );
      if (s.sponsors)
        out.push(
          `  <a href="https://github.com/sponsors/${u(p)}"><img src="${badge("Sponsor", "EA4AAA", "githubsponsors", p.badgeStyle)}" alt="GitHub Sponsors" /></a>`,
        );
      out.push(`</p>`);
      break;
    }
    default: {
      const c = p.custom[id];
      if (!c || !(c.title.trim() || c.body.trim())) break;
      if (c.title.trim()) out.push(`## ${esc(c.title.trim())}`, "");
      // Custom body: plain text / simple markdown; HTML is escaped so it can't inject tags or scripts.
      c.body.split("\n").forEach((l) => out.push(esc(l)));
    }
  }
  return out;
}

export function toMarkdown(p: Profile): string {
  const blocks = p.sections
    .filter((s) => !s.hidden)
    .map((s) => renderSection(p, s.id))
    .filter((b) => b.length);
  return (
    blocks
      .map((b) => b.join("\n"))
      .join("\n\n")
      .trim() + "\n"
  );
}

export function blogWorkflow(p: Profile): string {
  const h = (p.addons.blogHandle || "your-handle").replace(/["\n]/g, "");
  const feed =
    p.addons.blog === "devto"
      ? `https://dev.to/feed/${enc(h)}`
      : p.addons.blog === "medium"
        ? `https://medium.com/feed/@${enc(h.replace(/^@/, ""))}`
        : safeUrl(h) || "https://example.com/rss.xml";
  return `name: Latest blog post workflow
on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:
jobs:
  update-readme-with-blog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gautamkrishnar/blog-post-workflow@v1
        with:
          feed_list: "${feed}"
`;
}

export function parseConfig(raw: unknown): Profile {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid config");
  const input = raw as Record<string, unknown>;
  const text = (value: unknown, fallback: string, max = 500): string =>
    typeof value === "string" ? value.slice(0, max) : fallback;
  const source = (value: unknown): Record<string, unknown> =>
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const validHandle = (value: unknown, max = 80): string => {
    const valueText = text(value, "", max).trim();
    return /^[a-z0-9][a-z0-9._-]*$/i.test(valueText) ? valueText : "";
  };
  if (typeof input["name"] !== "string") throw new Error("Missing name");

  const typingInput = source(input["typing"]);
  const workInput = source(input["work"]);
  const addonsInput = source(input["addons"]);
  const supportInput = source(input["support"]);
  const customInput = source(input["custom"]);
  const custom: Record<string, CustomSection> = {};
  for (const id of Object.keys(customInput).slice(0, 20)) {
    const value = source(customInput[id]);
    custom[id] = {
      title: text(value["title"], "New section", 80),
      body: text(value["body"], "", 2000),
    };
  }
  const validIds = new Set<string>([...Object.keys(BUILTIN_SECTIONS), ...Object.keys(custom)]);
  const sectionInput = Array.isArray(input["sections"]) ? input["sections"] : [];
  const sections = sectionInput
    .filter(
      (section): section is Record<string, unknown> =>
        !!section && typeof section === "object" && !Array.isArray(section),
    )
    .filter((section) => typeof section["id"] === "string" && validIds.has(section["id"]))
    .map((section) => ({ id: section["id"] as string, hidden: section["hidden"] === true }));
  const projects = Array.isArray(input["projects"])
    ? input["projects"]
        .filter(
          (project): project is Record<string, unknown> =>
            !!project && typeof project === "object" && !Array.isArray(project),
        )
        .filter((project) => typeof project["name"] === "string")
        .slice(0, 8)
        .map((project) => ({
          name: text(project["name"], "", 80),
          url: text(project["url"], "", 500),
          description: text(project["description"], "", 160),
        }))
    : [];
  const socials: Record<string, string> = {};
  const socialInput = source(input["socials"]);
  for (const key of Object.keys(SOCIAL_META)) socials[key] = text(socialInput[key], "", 120);
  const skills = Array.isArray(input["skills"])
    ? input["skills"]
        .filter((skill): skill is string => typeof skill === "string" && !!SKILL_INDEX[skill])
        .slice(0, 30)
    : [];
  const blog =
    addonsInput["blog"] === "devto" ||
    addonsInput["blog"] === "medium" ||
    addonsInput["blog"] === "rss"
      ? addonsInput["blog"]
      : "none";
  return {
    ...seedProfile,
    name: text(input["name"], seedProfile.name, 80),
    username: validHandle(input["username"], 39),
    title: text(input["title"], seedProfile.title, 120),
    location: text(input["location"], seedProfile.location, 60),
    bio: text(input["bio"], seedProfile.bio, 500),
    avatarUrl: safeUrl(text(input["avatarUrl"], "", 500)),
    bannerUrl: text(input["bannerUrl"], seedProfile.bannerUrl, 500),
    appearanceId: appearanceById(
      typeof input["appearanceId"] === "string" ? input["appearanceId"] : seedProfile.appearanceId,
    ).id,
    accentColor: hexOk(
      typeof input["accentColor"] === "string" ? input["accentColor"] : seedProfile.accentColor,
    ),
    customBanner: input["customBanner"] === true,
    bannerMotion: input["bannerMotion"] === "none" ? "none" : "svg-anim",
    statsTheme: statsThemeById(
      typeof input["statsTheme"] === "string" ? input["statsTheme"] : seedProfile.statsTheme,
    ).id,
    typing: {
      lines: text(typingInput["lines"], seedProfile.typing.lines, 1000),
      font: TYPING_FONTS.includes(typingInput["font"] as TypingFont)
        ? (typingInput["font"] as TypingFont)
        : seedProfile.typing.font,
      size: Math.min(40, Math.max(12, Number(typingInput["size"]) || seedProfile.typing.size)),
      color: hexOk(
        typeof typingInput["color"] === "string" ? typingInput["color"] : seedProfile.typing.color,
      ),
      center: typingInput["center"] !== false,
    },
    work: Object.fromEntries(
      Object.keys(emptyWork).map((key) => [key, text(workInput[key], "", 120)]),
    ) as Work,
    skills,
    socials,
    projects,
    addons: {
      blog,
      blogHandle: text(addonsInput["blogHandle"], "", 500),
      stats: addonsInput["stats"] !== false,
      langs: addonsInput["langs"] !== false,
      streak: addonsInput["streak"] !== false,
      statsOverview: addonsInput["statsOverview"] !== false,
      contributionGraph: addonsInput["contributionGraph"] !== false,
    },
    support: {
      bmc: validHandle(supportInput["bmc"]),
      kofi: validHandle(supportInput["kofi"]),
      chai: safeChaiUrl(text(supportInput["chai"], "", 500)),
      sponsors: supportInput["sponsors"] === true,
    },
    githubStats: null,
    techDisplay: TECH_DISPLAYS.includes(input["techDisplay"] as TechDisplay)
      ? (input["techDisplay"] as TechDisplay)
      : seedProfile.techDisplay,
    badgeStyle: BADGE_STYLES.includes(input["badgeStyle"] as BadgeStyle)
      ? (input["badgeStyle"] as BadgeStyle)
      : seedProfile.badgeStyle,
    sections: sections.length ? sections : seedProfile.sections,
    custom,
  };
}
