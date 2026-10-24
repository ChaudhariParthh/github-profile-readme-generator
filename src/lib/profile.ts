import {
  appearanceById,
  DEFAULT_APPEARANCE_ID,
  DEFAULT_STATS_LAYOUT_ID,
  graphCardUrl,
  pinCardUrl,
  renderStatsSection,
  resolvedAccent,
  resolvedAvatar,
  resolvedBanner,
  statsLayoutById,
  trophyCardUrl,
} from "./appearance";

// ---------- Technology catalog ----------
// [label, simple-icons slug, hex color, optional devicon path for logos simple-icons doesn't ship]
export type SkillDef = [string, string, string, string?];

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

export const SKILL_CATEGORIES: Record<string, SkillDef[]> = {
  Languages: [
    ["JavaScript", "javascript", "F7DF1E"], ["TypeScript", "typescript", "3178C6"], ["Python", "python", "3776AB"],
    ["C", "c", "A8B9CC"], ["C++", "cplusplus", "00599C"], ["C#", "csharp", "512BD4", "csharp/csharp-original.svg"],
    ["Go", "go", "00ADD8"], ["Rust", "rust", "000000"], ["Java", "openjdk", "ED8B00", "java/java-original.svg"],
    ["Kotlin", "kotlin", "7F52FF"], ["Swift", "swift", "F05138"], ["Dart", "dart", "0175C2"], ["PHP", "php", "777BB4"],
    ["Ruby", "ruby", "CC342D"], ["Scala", "scala", "DC322F"], ["Elixir", "elixir", "4B275F"], ["Haskell", "haskell", "5D4F85"],
    ["Lua", "lua", "2C2D72"], ["Bash", "gnubash", "4EAA25"],
  ],
  Frontend: [
    ["React", "react", "61DAFB"], ["Next.js", "nextdotjs", "000000"], ["Vue.js", "vuedotjs", "4FC08D"],
    ["Nuxt", "nuxtdotjs", "00DC82"], ["Svelte", "svelte", "FF3E00"], ["Angular", "angular", "DD0031"],
    ["Tailwind CSS", "tailwindcss", "06B6D4"], ["Bootstrap", "bootstrap", "7952B3"], ["HTML5", "html5", "E34F26"],
    ["CSS3", "css3", "1572B6", "css3/css3-original.svg"], ["Sass", "sass", "CC6699"], ["Redux", "redux", "764ABC"],
    ["Vite", "vite", "646CFF"], ["Webpack", "webpack", "8DD6F9"], ["Three.js", "threedotjs", "000000"],
  ],
  Backend: [
    ["Node.js", "nodedotjs", "339933"], ["Express", "express", "000000"], ["NestJS", "nestjs", "E0234E"],
    ["Django", "django", "092E20"], ["FastAPI", "fastapi", "009688"], ["Flask", "flask", "000000"],
    ["Spring Boot", "springboot", "6DB33F"], ["Laravel", "laravel", "FF2D20"], ["GraphQL", "graphql", "E10098"],
    ["tRPC", "trpc", "2596BE"], [".NET", "dotnet", "512BD4"], ["Rails", "rubyonrails", "D30001"],
    ["Flutter", "flutter", "02569B"], ["React Native", "react", "61DAFB"], ["Android", "android", "3DDC84"],
  ],
  "AI / ML": [
    ["PyTorch", "pytorch", "EE4C2C"], ["TensorFlow", "tensorflow", "FF6F00"], ["scikit-learn", "scikitlearn", "F7931E"],
    ["Pandas", "pandas", "150458"], ["NumPy", "numpy", "013243"], ["OpenCV", "opencv", "5C3EE8"],
    ["Hugging Face", "huggingface", "FFD21E"], ["LangChain", "langchain", "1C3C3C"], ["Jupyter", "jupyter", "F37626"],
    ["Keras", "keras", "D00000"], ["OpenAI", "openai", "412991", "openai/openai-original.svg"],
  ],
  Cybersecurity: [
    ["Kali Linux", "kalilinux", "557C94"], ["Wireshark", "wireshark", "1679A7"], ["Metasploit", "metasploit", "2596CD"],
    ["Burp Suite", "burpsuite", "FF6633"], ["OWASP", "owasp", "000000"], ["Hack The Box", "hackthebox", "9FEF00"],
    ["TryHackMe", "tryhackme", "212C42"], ["Snyk", "snyk", "4C4A73"], ["Splunk", "splunk", "000000"],
    ["Parrot OS", "parrotsecurity", "15E0ED"],
  ],
  Cloud: [
    ["AWS", "amazonwebservices", "232F3E", "amazonwebservices/amazonwebservices-original-wordmark.svg"],
    ["Google Cloud", "googlecloud", "4285F4"], ["Azure", "microsoftazure", "0078D4", "azure/azure-original.svg"],
    ["Vercel", "vercel", "000000"], ["Netlify", "netlify", "00C7B7"], ["Cloudflare", "cloudflare", "F38020"],
    ["Firebase", "firebase", "FFCA28"], ["Supabase", "supabase", "3FCF8E"], ["Heroku", "heroku", "430098"],
  ],
  Databases: [
    ["PostgreSQL", "postgresql", "4169E1"], ["MongoDB", "mongodb", "47A248"], ["MySQL", "mysql", "4479A1"],
    ["Redis", "redis", "DC382D"], ["SQLite", "sqlite", "003B57"], ["MariaDB", "mariadb", "003545"],
    ["Elasticsearch", "elasticsearch", "005571"], ["DynamoDB", "amazondynamodb", "4053D6"], ["Prisma", "prisma", "2D3748"],
  ],
  DevOps: [
    ["Docker", "docker", "2496ED"], ["Kubernetes", "kubernetes", "326CE5"], ["Linux", "linux", "FCC624"],
    ["Nginx", "nginx", "009639"], ["GitHub Actions", "githubactions", "2088FF"], ["Terraform", "terraform", "844FBA"],
    ["Jenkins", "jenkins", "D24939"], ["Ansible", "ansible", "EE0000"], ["Git", "git", "F05032"],
    ["GitHub", "github", "181717"], ["Grafana", "grafana", "F46800"], ["Prometheus", "prometheus", "E6522C"],
  ],
  Tools: [
    ["Figma", "figma", "F24E1E"], ["Postman", "postman", "FF6C37"], ["VS Code", "visualstudiocode", "007ACC", "vscode/vscode-original.svg"],
    ["Jest", "jest", "C21325"], ["Vitest", "vitest", "6E9F18"], ["Cypress", "cypress", "17202C"],
    ["Playwright", "playwright", "2EAD33", "playwright/playwright-original.svg"], ["Blender", "blender", "F5792A"],
    ["Notion", "notion", "000000"],
  ],
};

export const SKILL_INDEX: Record<string, SkillDef> = Object.fromEntries(
  Object.values(SKILL_CATEGORIES).flat().map((s) => [s[0], s]),
);

// ---------- Socials ----------
export const SOCIAL_META: Record<string, { color: string; logo: string; url: (h: string) => string; placeholder: string }> = {
  GitHub: { color: "181717", logo: "github", url: (h) => `https://github.com/${enc(h)}`, placeholder: "username" },
  LinkedIn: { color: "0A66C2", logo: "linkedin", url: (h) => `https://linkedin.com/in/${enc(h)}`, placeholder: "username" },
  X: { color: "000000", logo: "x", url: (h) => `https://x.com/${enc(h)}`, placeholder: "username" },
  "Dev.to": { color: "0A0A0A", logo: "devdotto", url: (h) => `https://dev.to/${enc(h)}`, placeholder: "username" },
  Hashnode: { color: "2962FF", logo: "hashnode", url: (h) => `https://hashnode.com/@${enc(h.replace(/^@/, ""))}`, placeholder: "username" },
  Medium: { color: "000000", logo: "medium", url: (h) => `https://medium.com/@${enc(h.replace(/^@/, ""))}`, placeholder: "username" },
  YouTube: { color: "FF0000", logo: "youtube", url: (h) => `https://youtube.com/@${enc(h.replace(/^@/, ""))}`, placeholder: "channel" },
  Discord: { color: "5865F2", logo: "discord", url: (h) => `https://discord.gg/${enc(h)}`, placeholder: "invite code" },
  "Stack Overflow": { color: "F58025", logo: "stackoverflow", url: (h) => `https://stackoverflow.com/users/${enc(h)}`, placeholder: "user ID" },
  LeetCode: { color: "FFA116", logo: "leetcode", url: (h) => `https://leetcode.com/${enc(h)}`, placeholder: "username" },
  Kaggle: { color: "20BEFF", logo: "kaggle", url: (h) => `https://kaggle.com/${enc(h)}`, placeholder: "username" },
  "Hack The Box": { color: "111927", logo: "hackthebox", url: (h) => `https://app.hackthebox.com/profile/${enc(h)}`, placeholder: "profile ID" },
  TryHackMe: { color: "212C42", logo: "tryhackme", url: (h) => `https://tryhackme.com/p/${enc(h)}`, placeholder: "username" },
  Instagram: { color: "E4405F", logo: "instagram", url: (h) => `https://instagram.com/${enc(h)}`, placeholder: "username" },
  Portfolio: { color: "8B5CF6", logo: "googlechrome", url: (h) => (/^https?:\/\//i.test(h) ? h : `https://${h}`), placeholder: "yoursite.dev" },
  Email: { color: "EA4335", logo: "gmail", url: (h) => `mailto:${h}`, placeholder: "you@example.com" },
};

// ---------- Types ----------
export const STATS_THEMES = ["tokyonight", "radical", "dracula", "github_dark", "transparent", "onedark", "gruvbox"];
export const BADGE_STYLES = ["for-the-badge", "flat", "flat-square", "plastic"] as const;
export type BadgeStyle = (typeof BADGE_STYLES)[number];
export const TECH_DISPLAYS = ["badges", "icons", "compact"] as const;
export type TechDisplay = (typeof TECH_DISPLAYS)[number];
export const TYPING_FONTS = ["Fira Code", "JetBrains Mono", "Roboto Mono", "Press Start 2P", "Orbitron"];
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
  working: string; workingLink: string; collab: string; collabLink: string;
  learning: string; askMe: string; reach: string; funFact: string; blog: string; resume: string;
};
export type Project = { name: string; url: string; description: string };

export type Profile = {
  name: string;
  username: string;
  title: string;
  location: string;
  bio: string;
  bannerUrl: string; // static image or GIF
  showBanner: boolean; // banner is opt-in
  avatarUrl: string; // optional; empty uses GitHub avatar
  appearanceId: string;
  statsLayout: string;
  accentColor: string;
  customBanner: boolean;
  typing: { lines: string; font: string; size: number; color: string; center: boolean };
  work: Work;
  skills: string[];
  techDisplay: TechDisplay;
  badgeStyle: BadgeStyle;
  socials: Record<string, string>;
  projects: Project[];
  addons: { stats: boolean; langs: boolean; streak: boolean; blog: BlogSource; blogHandle: string };
  statsTheme: string;
  support: { bmc: string; kofi: string; sponsors: boolean };
  sections: SectionEntry[];
  custom: Record<string, CustomSection>;
};

const ALL_SECTIONS = (hide: BuiltinId[] = []): SectionEntry[] =>
  (Object.keys(BUILTIN_SECTIONS) as BuiltinId[]).map((id) => ({ id, hidden: hide.includes(id) }));

const emptyWork: Work = { working: "", workingLink: "", collab: "", collabLink: "", learning: "", askMe: "", reach: "", funFact: "", blog: "", resume: "" };

export const seedProfile: Profile = {
  name: "Parth Chaudhari",
  username: "parthchaudhari",
  title: "Full-Stack Developer",
  location: "India",
  bio: "I build fast, accessible web apps with TypeScript end to end. I love clean APIs, thoughtful UI, and shipping things people actually use.",
  bannerUrl: appearanceById(DEFAULT_APPEARANCE_ID).bannerUrl,
  showBanner: false,
  avatarUrl: "",
  appearanceId: DEFAULT_APPEARANCE_ID,
  statsLayout: DEFAULT_STATS_LAYOUT_ID,
  accentColor: appearanceById(DEFAULT_APPEARANCE_ID).accent,
  customBanner: false,
  typing: { lines: "Full-Stack Developer\nTypeScript · React · Node.js\nBuilding GitProfile Studio", font: "Fira Code", size: 22, color: "22D3EE", center: true },
  work: {
    ...emptyWork,
    working: "GitProfile Studio", learning: "Rust and distributed systems", askMe: "React, Node.js and TypeScript",
    reach: "hello@parth.dev", funFact: "I enjoy building fast, reliable developer tools",
  },
  skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "Git"],
  techDisplay: "badges",
  badgeStyle: "for-the-badge",
  socials: { LinkedIn: "parthchaudhari", X: "parthcodes", Portfolio: "parth.dev", Email: "hello@parth.dev" },
  projects: [],
  addons: { stats: true, langs: true, streak: true, blog: "none", blogHandle: "" },
  statsTheme: statsLayoutById(DEFAULT_STATS_LAYOUT_ID).widgetTheme,
  support: { bmc: "", kofi: "", sponsors: false },
  sections: ALL_SECTIONS(["trophies", "graph", "blog", "support", "projects"]),
  custom: {},
};

export const PRESETS: Record<string, Profile> = {
  Minimal: {
    ...seedProfile,
    bio: "",
    work: { ...emptyWork, working: "something new" },
    skills: ["TypeScript", "React", "Node.js"],
    techDisplay: "compact",
    badgeStyle: "flat-square",
    socials: { GitHub: seedProfile.username, Email: "hello@parth.dev" },
    addons: { ...seedProfile.addons, langs: false, streak: false },
    statsTheme: "transparent",
    sections: ALL_SECTIONS(["typing", "visitors", "trophies", "graph", "blog", "support", "projects", "work"]),
  },
  Professional: {
    ...seedProfile,
    techDisplay: "badges",
    badgeStyle: "flat",
    statsTheme: "github_dark",
    sections: ALL_SECTIONS(["typing", "trophies", "graph", "blog", "support"]),
  },
  "Animated Developer": {
    ...seedProfile,
    showBanner: true,
    bannerUrl: "https://capsule-render.vercel.app/api?type=waving&color=0:8B5CF6,100:22D3EE&height=160&section=header&text=Hello%20World&fontColor=ffffff&animation=fadeIn",
    typing: { ...seedProfile.typing, font: "Press Start 2P", size: 18, color: "8B5CF6" },
    techDisplay: "icons",
    statsTheme: "radical",
    sections: ALL_SECTIONS(["blog", "support"]),
  },
  "AI Engineer": {
    ...seedProfile,
    title: "AI / ML Engineer",
    bio: "Training models, building data pipelines and shipping AI features to production.",
    typing: { ...seedProfile.typing, lines: "AI / ML Engineer\nLLMs · RAG · MLOps" },
    work: { ...emptyWork, working: "LLM-powered search", learning: "reinforcement learning", askMe: "PyTorch, RAG, MLOps" },
    skills: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain", "Jupyter", "Docker"],
    techDisplay: "icons",
    statsTheme: "dracula",
    sections: ALL_SECTIONS(["trophies", "blog", "support"]),
  },
  Cybersecurity: {
    ...seedProfile,
    title: "Security Engineer",
    bio: "Pentesting, CTFs and hardening systems. Breaking things so others can't.",
    typing: { ...seedProfile.typing, lines: "> whoami\nSecurity Engineer\nCTF player · Bug hunter", font: "JetBrains Mono", color: "9FEF00", center: false },
    work: { ...emptyWork, learning: "malware analysis", askMe: "web app security, OWASP Top 10" },
    skills: ["Python", "Bash", "Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "OWASP", "Linux", "Docker"],
    techDisplay: "badges",
    socials: { GitHub: seedProfile.username, TryHackMe: "", "Hack The Box": "" },
    statsTheme: "gruvbox",
    sections: ALL_SECTIONS(["trophies", "blog", "support", "projects"]),
  },
  "Student Portfolio": {
    ...seedProfile,
    title: "Computer Science Student",
    bio: "Learning in public. Building projects, contributing to open source and looking for internships.",
    typing: { ...seedProfile.typing, lines: "CS Student\nOpen to internships\nAlways learning" },
    work: { ...emptyWork, learning: "Data Structures & Algorithms", collab: "beginner-friendly open source", reach: "hello@parth.dev" },
    skills: ["C", "C++", "Java", "Python", "JavaScript", "React", "Git", "GitHub"],
    techDisplay: "icons",
    socials: { GitHub: seedProfile.username, LinkedIn: "parthchaudhari", LeetCode: "" },
    projects: [{ name: "My first project", url: "", description: "Describe a project you're proud of" }],
    sections: ALL_SECTIONS(["trophies", "blog", "support"]),
  },
};

// ---------- Safety helpers ----------
export const enc = (s: string) => encodeURIComponent(s.trim());
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Only http(s) and mailto URLs are allowed; anything else (javascript:, data:, etc.) is dropped. */
export function safeUrl(raw: string | undefined | null): string {
  const s = (raw ?? "").trim();
  if (!s) return "";
  if (/^mailto:[^\s<>"]+$/i.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.protocol !== "https:" && u.protocol !== "http:") return "";
    return u.toString().replace(/"/g, "%22");
  } catch {
    return "";
  }
}

const hexOk = (h: string) => (/^[0-9a-f]{6}$/i.test(h) ? h : "22D3EE");

// ---------- URL builders ----------
const badge = (label: string, color: string, logo: string, style: BadgeStyle) =>
  `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--").replace(/_/g, "__"))}-${color}?style=${style}&logo=${encodeURIComponent(logo)}&logoColor=white`;

export const skillBadgeUrl = (t: string, style: BadgeStyle = "for-the-badge") => {
  const s = SKILL_INDEX[t];
  return badge(t, s?.[2] ?? "555555", s?.[1] ?? "", style);
};
const isDark = (hex: string) => {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
};
/** Authentic logo URL: devicon when simple-icons lacks it, otherwise the simple-icons CDN in brand color. */
export const skillIconUrl = (t: string) => {
  const s = SKILL_INDEX[t];
  if (!s) return "";
  if (s[3]) return DEV + s[3];
  return `https://cdn.simpleicons.org/${s[1]}/${isDark(s[2]) ? "white" : s[2]}`;
};
export const socialBadgeUrl = (p: string, style: BadgeStyle = "for-the-badge") => {
  const m = SOCIAL_META[p];
  return badge(p, m?.color ?? "555555", m?.logo ?? "", style);
};

const u = (p: Profile) => enc(p.username || "github");
export const statsUrl = (p: Profile) =>
  `https://github-readme-stats.vercel.app/api?username=${u(p)}&show_icons=true&theme=${statsLayoutById(p.statsLayout).widgetTheme}&hide_border=${statsLayoutById(p.statsLayout).hideBorder}`;
export const langsUrl = (p: Profile) =>
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${u(p)}&layout=${statsLayoutById(p.statsLayout).langsLayout}&theme=${statsLayoutById(p.statsLayout).widgetTheme}&hide_border=${statsLayoutById(p.statsLayout).hideBorder}`;
export const streakUrl = (p: Profile) =>
  `https://streak-stats.demolab.com?user=${u(p)}&theme=${statsLayoutById(p.statsLayout).streakTheme}&hide_border=${statsLayoutById(p.statsLayout).hideBorder}`;
export const trophyUrl = (p: Profile) => trophyCardUrl(p);
export const visitorsUrl = (p: Profile) =>
  `https://komarev.com/ghpvc/?username=${u(p)}&label=Profile%20views&color=${resolvedAccent(p)}&style=flat`;
export const graphUrl = (p: Profile) => graphCardUrl(p);
export const pinUrl = (p: Profile, owner: string, repo: string) => pinCardUrl(p, owner, repo);
export const typingUrl = (p: Profile) => {
  const lines = p.typing.lines.split("\n").map((l) => l.replace(/;/g, ",").trim()).filter(Boolean);
  const size = Math.min(40, Math.max(12, Number(p.typing.size) || 22));
  return `https://readme-typing-svg.demolab.com?font=${encodeURIComponent(p.typing.font).replace(/%20/g, "+")}&weight=600&size=${size}&pause=1000&color=${hexOk(p.typing.color)}&center=${p.typing.center}&vCenter=true&width=600&lines=${lines.map(encodeURIComponent).join(";")}`;
};

const mdLink = (text: string, href: string) => {
  const h = safeUrl(href);
  return h ? `[${esc(text)}](${h})` : `**${esc(text)}**`;
};
const ghRepo = (url: string) => {
  const m = safeUrl(url).match(/^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/i);
  return m ? { owner: m[1]!, repo: m[2]! } : null;
};

const BMC_HOSTS = new Set(["buymeacoffee.com", "www.buymeacoffee.com"]);
/** Accepts a Buy Me a Coffee username or full URL; returns the full https URL only for allow-listed hosts. */
export function bmcUrl(raw: string): string {
  const v = (raw || "").trim();
  if (!v) return "";
  if (/^[\w.-]+$/.test(v)) return `https://buymeacoffee.com/${v}`;
  const ok = safeUrl(/^https?:\/\//i.test(v) ? v : `https://${v}`);
  try {
    const u = new URL(ok);
    return u.protocol === "https:" && BMC_HOSTS.has(u.hostname.toLowerCase()) && u.pathname.length > 1 ? u.href : "";
  } catch {
    return "";
  }
}

export const STATS_PRIMARY_HOST = "github-readme-stats.vercel.app";
export const STATS_FALLBACK_HOST = "github-readme-stats-git-masterrstaa-rickstaa.vercel.app";
/** Fallback mirror for a stats-widget URL (used by the preview when the primary is down or rate limited). */
export function statsFallbackUrl(src: string): string {
  try {
    const u = new URL(src);
    if (u.hostname !== STATS_PRIMARY_HOST) return "";
    u.hostname = STATS_FALLBACK_HOST;
    return u.href;
  } catch {
    return "";
  }
}

// ---------- Markdown ----------
function renderSection(p: Profile, id: string): string[] {
  const w = p.work;
  const out: string[] = [];
  switch (id) {
    case "header": {
      const banner = p.showBanner ? safeUrl(resolvedBanner(p)) : "";
      if (banner) out.push(`<p align="center"><img src="${banner}" alt="banner" width="100%" /></p>`, "");
      const avatar = safeUrl(resolvedAvatar(p));
      if (avatar) out.push(`<p align="center"><img src="${avatar}" alt="${esc(p.name || p.username)} avatar" width="110" height="110" /></p>`);
      out.push(`<h1 align="center">Hi, I'm ${esc(p.name)}</h1>`);
      if (p.title || p.location) out.push(`<h3 align="center">${esc(p.title)}${p.location ? ` · ${esc(p.location)}` : ""}</h3>`);
      break;
    }
    case "typing":
      if (p.typing.lines.trim())
        out.push(`<p align="${p.typing.center ? "center" : "left"}"><img src="${typingUrl(p)}" alt="Typing SVG" /></p>`);
      break;
    case "visitors":
      out.push(`<p align="left"><img src="${visitorsUrl(p)}" alt="profile views" /></p>`);
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
      if (safeUrl(w.resume)) out.push(`- Know about my experiences ${mdLink("my resume", w.resume)}`);
      if (w.funFact) out.push(`- Fun fact: **${esc(w.funFact)}**`);
      break;
    }
    case "skills": {
      const skills = p.skills.filter((s) => SKILL_INDEX[s]);
      if (!skills.length) break;
      out.push("## Tech Stack", "", `<p align="left">`);
      if (p.techDisplay === "badges") {
        skills.forEach((t) => out.push(`  <img src="${skillBadgeUrl(t, p.badgeStyle)}" alt="${esc(t)}" />`));
      } else {
        const size = p.techDisplay === "icons" ? 40 : 28;
        skills.forEach((t) => out.push(`  <img src="${skillIconUrl(t)}" alt="${esc(t)}" title="${esc(t)}" width="${size}" height="${size}" />&nbsp;`));
      }
      out.push(`</p>`);
      break;
    }
    case "projects": {
      const list = p.projects.filter((x) => x.name.trim());
      if (!list.length) break;
      out.push("## Featured Projects", "");
      const pins = list.map((x) => ({ x, gh: ghRepo(x.url) }));
      const cards = pins.filter((q) => q.gh);
      if (cards.length) {
        out.push(`<p align="left">`);
        cards.forEach(({ x, gh }) => out.push(`  <a href="${safeUrl(x.url)}"><img src="${pinUrl(p, gh!.owner, gh!.repo)}" alt="${esc(x.name)}" /></a>`));
        out.push(`</p>`, "");
      }
      pins.filter((q) => !q.gh).forEach(({ x }) =>
        out.push(`- ${mdLink(x.name, x.url).replace(/^\*\*(.*)\*\*$/, "**$1**")}${x.description ? ` — ${esc(x.description)}` : ""}`),
      );
      break;
    }
    case "trophies":
      out.push("## GitHub Achievements", "", `<p align="left"><img src="${trophyUrl(p)}" alt="GitHub trophies" /></p>`);
      break;
    case "stats":
      out.push(...renderStatsSection(p));
      break;
    case "graph":
      out.push("## Contribution Graph", "", `<p align="center"><img src="${graphUrl(p)}" alt="Contribution graph" width="100%" /></p>`);
      break;
    case "blog":
      if (p.addons.blog === "none") break;
      out.push("## Latest Blog Posts", "", "<!-- BLOG-POST-LIST:START -->", "<!-- BLOG-POST-LIST:END -->");
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
      if (!(bmcUrl(s.bmc) || s.kofi || s.sponsors)) break;
      out.push("## Support", "", `<p align="left">`);
      const bmc = bmcUrl(s.bmc);
      if (bmc) out.push(`  <a href="${bmc}"><img src="${badge("Buy Me a Coffee", "FFDD00", "buymeacoffee", p.badgeStyle)}" alt="Buy me a coffee" /></a>`);
      if (s.kofi) out.push(`  <a href="https://ko-fi.com/${enc(s.kofi)}"><img src="${badge("Ko-fi", "FF5E5B", "kofi", p.badgeStyle)}" alt="Ko-fi" /></a>`);
      if (s.sponsors) out.push(`  <a href="https://github.com/sponsors/${u(p)}"><img src="${badge("Sponsor", "EA4AAA", "githubsponsors", p.badgeStyle)}" alt="GitHub Sponsors" /></a>`);
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
  return blocks.map((b) => b.join("\n")).join("\n\n").trim() + "\n";
}

export function blogWorkflow(p: Profile): string {
  const h = (p.addons.blogHandle || "your-handle").replace(/["\n]/g, "");
  const feed =
    p.addons.blog === "devto" ? `https://dev.to/feed/${enc(h)}` :
    p.addons.blog === "medium" ? `https://medium.com/feed/@${enc(h.replace(/^@/, ""))}` : safeUrl(h) || "https://example.com/rss.xml";
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

/** Merge an imported/saved JSON object onto the seed, so older or partial configs still load. */
export function parseConfig(raw: unknown): Profile {
  if (!raw || typeof raw !== "object") throw new Error("Invalid config");
  const r = raw as Partial<Profile> & { typingBanner?: boolean; addons?: Record<string, unknown> };
  if (typeof r.name !== "string") throw new Error("Missing name");
  const custom = r.custom && typeof r.custom === "object" ? r.custom : {};
  const validIds = new Set<string>([...Object.keys(BUILTIN_SECTIONS), ...Object.keys(custom)]);
  const sections = Array.isArray(r.sections)
    ? r.sections.filter((s) => s && typeof s.id === "string" && validIds.has(s.id)).map((s) => ({ id: s.id, hidden: !!s.hidden }))
    : seedProfile.sections;
  return {
    ...seedProfile,
    ...r,
    typing: { ...seedProfile.typing, ...(r.typing ?? {}) },
    work: { ...emptyWork, ...(r.work ?? {}) },
    addons: { ...seedProfile.addons, ...(r.addons ?? {}) } as Profile["addons"],
    support: { ...seedProfile.support, ...(r.support ?? {}) },
    socials: { ...(r.socials ?? {}) },
    skills: Array.isArray(r.skills) ? r.skills.filter((x) => typeof x === "string") : [],
    projects: Array.isArray(r.projects) ? r.projects.filter((x) => x && typeof x.name === "string") : [],
    techDisplay: TECH_DISPLAYS.includes(r.techDisplay as TechDisplay) ? (r.techDisplay as TechDisplay) : "badges",
    sections,
    custom,
    appearanceId: appearanceById(typeof r.appearanceId === "string" ? r.appearanceId : seedProfile.appearanceId).id,
    statsLayout: statsLayoutById(typeof r.statsLayout === "string" ? r.statsLayout : seedProfile.statsLayout).id,
    accentColor: hexOk(typeof r.accentColor === "string" ? r.accentColor : seedProfile.accentColor),
    customBanner: !!r.customBanner,
    showBanner: r.showBanner === true,
    avatarUrl: typeof r.avatarUrl === "string" ? r.avatarUrl : "",
  };
}
