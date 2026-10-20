export type Social = { platform: string; handle: string };

export type Profile = {
  name: string;
  username: string;
  title: string;
  location: string;
  bio: string;
  currentlyWorking: string;
  learning: string;
  tech: string[];
  socials: Social[];
  showStats: boolean;
  showLangs: boolean;
  showStreak: boolean;
  statsTheme: string;
};

export const TECH_OPTIONS: Record<string, { color: string; logo: string }> = {
  TypeScript: { color: "3178C6", logo: "typescript" },
  JavaScript: { color: "F7DF1E", logo: "javascript" },
  React: { color: "20232A", logo: "react" },
  "Node.js": { color: "339933", logo: "nodedotjs" },
  "Next.js": { color: "000000", logo: "nextdotjs" },
  TailwindCSS: { color: "06B6D4", logo: "tailwindcss" },
  PostgreSQL: { color: "4169E1", logo: "postgresql" },
  MongoDB: { color: "47A248", logo: "mongodb" },
  Docker: { color: "2496ED", logo: "docker" },
  Python: { color: "3776AB", logo: "python" },
  GraphQL: { color: "E10098", logo: "graphql" },
  Git: { color: "F05032", logo: "git" },
  AWS: { color: "232F3E", logo: "amazonwebservices" },
  Go: { color: "00ADD8", logo: "go" },
  Rust: { color: "000000", logo: "rust" },
  Figma: { color: "F24E1E", logo: "figma" },
};

export const SOCIAL_META: Record<string, { color: string; logo: string; url: (h: string) => string }> = {
  LinkedIn: { color: "0A66C2", logo: "linkedin", url: (h) => `https://linkedin.com/in/${h}` },
  X: { color: "000000", logo: "x", url: (h) => `https://x.com/${h}` },
  "Dev.to": { color: "0A0A0A", logo: "devdotto", url: (h) => `https://dev.to/${h}` },
  Portfolio: { color: "8B5CF6", logo: "googlechrome", url: (h) => (h.startsWith("http") ? h : `https://${h}`) },
  Email: { color: "EA4335", logo: "gmail", url: (h) => `mailto:${h}` },
};

export const STATS_THEMES = ["tokyonight", "radical", "dracula", "github_dark", "transparent"];

export const seedProfile: Profile = {
  name: "Parth Chaudhari",
  username: "parthchaudhari",
  title: "Full-Stack Developer",
  location: "India",
  bio: "I build fast, accessible web apps with TypeScript end to end. I love clean APIs, thoughtful UI, and shipping things people actually use.",
  currentlyWorking: "GitProfile Studio — a README generator for developers",
  learning: "Rust and distributed systems",
  tech: ["TypeScript", "React", "Node.js", "Next.js", "TailwindCSS", "PostgreSQL", "Docker", "Git"],
  socials: [
    { platform: "LinkedIn", handle: "parthchaudhari" },
    { platform: "X", handle: "parthcodes" },
    { platform: "Portfolio", handle: "parth.dev" },
    { platform: "Email", handle: "hello@parth.dev" },
  ],
  showStats: true,
  showLangs: true,
  showStreak: true,
  statsTheme: "tokyonight",
};

const badge = (label: string, color: string, logo: string) =>
  `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--"))}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;

export const techBadgeUrl = (t: string) => {
  const m = TECH_OPTIONS[t] ?? { color: "555555", logo: "" };
  return badge(t, m.color, m.logo);
};
export const socialBadgeUrl = (p: string) => {
  const m = SOCIAL_META[p];
  return badge(p, m?.color ?? "555555", m?.logo ?? "");
};
export const statsUrl = (p: Profile) =>
  `https://github-readme-stats.vercel.app/api?username=${p.username}&show_icons=true&theme=${p.statsTheme}&hide_border=true`;
export const langsUrl = (p: Profile) =>
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${p.username}&layout=compact&theme=${p.statsTheme}&hide_border=true`;
export const streakUrl = (p: Profile) =>
  `https://streak-stats.demolab.com?user=${p.username}&theme=${p.statsTheme}&hide_border=true`;

export function toMarkdown(p: Profile): string {
  const out: string[] = [];
  out.push(`<h1 align="center">Hi 👋, I'm ${p.name}</h1>`);
  out.push(`<h3 align="center">${p.title}${p.location ? ` · ${p.location}` : ""}</h3>`, "");
  if (p.bio) out.push(p.bio, "");
  if (p.currentlyWorking) out.push(`- 🔭 I'm currently working on **${p.currentlyWorking}**`);
  if (p.learning) out.push(`- 🌱 I'm currently learning **${p.learning}**`);
  if (p.currentlyWorking || p.learning) out.push("");
  if (p.tech.length) {
    out.push("## 🛠️ Tech Stack", "", `<p>`);
    p.tech.forEach((t) => out.push(`  <img src="${techBadgeUrl(t)}" alt="${t}" />`));
    out.push(`</p>`, "");
  }
  if (p.showStats || p.showLangs || p.showStreak) {
    out.push("## 📊 GitHub Stats", "", `<p align="center">`);
    if (p.showStats) out.push(`  <img src="${statsUrl(p)}" alt="GitHub stats" />`);
    if (p.showLangs) out.push(`  <img src="${langsUrl(p)}" alt="Top languages" />`);
    if (p.showStreak) out.push(`  <img src="${streakUrl(p)}" alt="GitHub streak" />`);
    out.push(`</p>`, "");
  }
  const socials = p.socials.filter((s) => s.handle);
  if (socials.length) {
    out.push("## 🤝 Connect with me", "", `<p>`);
    socials.forEach((s) =>
      out.push(`  <a href="${SOCIAL_META[s.platform]?.url(s.handle) ?? "#"}"><img src="${socialBadgeUrl(s.platform)}" alt="${s.platform}" /></a>`),
    );
    out.push(`</p>`);
  }
  return out.join("\n");
}
