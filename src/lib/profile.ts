// Skill catalog: [label, simple-icons slug, hex color]
type SkillDef = [string, string, string];

export const SKILL_CATEGORIES: Record<string, SkillDef[]> = {
  "Programming Languages": [
    ["JavaScript", "javascript", "F7DF1E"], ["TypeScript", "typescript", "3178C6"], ["Python", "python", "3776AB"],
    ["C", "c", "A8B9CC"], ["C++", "cplusplus", "00599C"], ["C#", "csharp", "512BD4"], ["Go", "go", "00ADD8"],
    ["Rust", "rust", "000000"], ["Java", "openjdk", "ED8B00"], ["Kotlin", "kotlin", "7F52FF"], ["Swift", "swift", "F05138"],
    ["Dart", "dart", "0175C2"], ["PHP", "php", "777BB4"], ["Ruby", "ruby", "CC342D"], ["Scala", "scala", "DC322F"],
    ["Elixir", "elixir", "4B275F"], ["Haskell", "haskell", "5D4F85"], ["Lua", "lua", "2C2D72"],
  ],
  Frontend: [
    ["React", "react", "20232A"], ["Next.js", "nextdotjs", "000000"], ["Vue.js", "vuedotjs", "4FC08D"],
    ["Nuxt", "nuxtdotjs", "00DC82"], ["Svelte", "svelte", "FF3E00"], ["Angular", "angular", "DD0031"],
    ["Tailwind CSS", "tailwindcss", "06B6D4"], ["Bootstrap", "bootstrap", "7952B3"], ["HTML5", "html5", "E34F26"],
    ["CSS3", "css3", "1572B6"], ["Sass", "sass", "CC6699"], ["Redux", "redux", "764ABC"], ["Vite", "vite", "646CFF"],
    ["Webpack", "webpack", "8DD6F9"],
  ],
  "Backend & APIs": [
    ["Node.js", "nodedotjs", "339933"], ["Express", "express", "000000"], ["NestJS", "nestjs", "E0234E"],
    ["Django", "django", "092E20"], ["FastAPI", "fastapi", "009688"], ["Flask", "flask", "000000"],
    ["Spring Boot", "springboot", "6DB33F"], ["Laravel", "laravel", "FF2D20"], ["GraphQL", "graphql", "E10098"],
    ["tRPC", "trpc", "2596BE"], [".NET", "dotnet", "512BD4"], ["Rails", "rubyonrails", "D30001"],
  ],
  Mobile: [
    ["Flutter", "flutter", "02569B"], ["React Native", "react", "61DAFB"], ["Android", "android", "3DDC84"],
    ["iOS", "apple", "000000"], ["Ionic", "ionic", "3880FF"], ["Expo", "expo", "000020"],
  ],
  Databases: [
    ["PostgreSQL", "postgresql", "4169E1"], ["MongoDB", "mongodb", "47A248"], ["MySQL", "mysql", "4479A1"],
    ["Redis", "redis", "DC382D"], ["Supabase", "supabase", "3FCF8E"], ["Firebase", "firebase", "FFCA28"],
    ["SQLite", "sqlite", "003B57"], ["MariaDB", "mariadb", "003545"], ["Elasticsearch", "elasticsearch", "005571"],
    ["DynamoDB", "amazondynamodb", "4053D6"],
  ],
  "DevOps & Cloud": [
    ["Docker", "docker", "2496ED"], ["Kubernetes", "kubernetes", "326CE5"], ["AWS", "amazonwebservices", "232F3E"],
    ["Google Cloud", "googlecloud", "4285F4"], ["Azure", "microsoftazure", "0078D4"], ["Vercel", "vercel", "000000"],
    ["Netlify", "netlify", "00C7B7"], ["Cloudflare", "cloudflare", "F38020"], ["Linux", "linux", "FCC624"],
    ["Nginx", "nginx", "009639"], ["GitHub Actions", "githubactions", "2088FF"], ["Terraform", "terraform", "844FBA"],
  ],
  "AI / ML & Data": [
    ["PyTorch", "pytorch", "EE4C2C"], ["TensorFlow", "tensorflow", "FF6F00"], ["scikit-learn", "scikitlearn", "F7931E"],
    ["Pandas", "pandas", "150458"], ["NumPy", "numpy", "013243"], ["OpenCV", "opencv", "5C3EE8"],
    ["Hugging Face", "huggingface", "FFD21E"], ["LangChain", "langchain", "1C3C3C"],
  ],
  Design: [
    ["Figma", "figma", "F24E1E"], ["Photoshop", "adobephotoshop", "31A8FF"], ["Illustrator", "adobeillustrator", "FF9A00"],
    ["Blender", "blender", "F5792A"], ["Canva", "canva", "00C4CC"],
  ],
  "Testing & Tools": [
    ["Jest", "jest", "C21325"], ["Vitest", "vitest", "6E9F18"], ["Cypress", "cypress", "17202C"],
    ["Playwright", "playwright", "2EAD33"], ["Postman", "postman", "FF6C37"], ["Git", "git", "F05032"],
    ["GitHub", "github", "181717"], ["VS Code", "visualstudiocode", "007ACC"], ["Bash", "gnubash", "4EAA25"],
  ],
};

const SKILL_INDEX: Record<string, SkillDef> = Object.fromEntries(
  Object.values(SKILL_CATEGORIES).flat().map((s) => [s[0], s]),
);

export const SOCIAL_META: Record<string, { color: string; logo: string; url: (h: string) => string; placeholder: string }> = {
  GitHub: { color: "181717", logo: "github", url: (h) => `https://github.com/${h}`, placeholder: "username" },
  LinkedIn: { color: "0A66C2", logo: "linkedin", url: (h) => `https://linkedin.com/in/${h}`, placeholder: "username" },
  X: { color: "000000", logo: "x", url: (h) => `https://x.com/${h}`, placeholder: "username" },
  "Dev.to": { color: "0A0A0A", logo: "devdotto", url: (h) => `https://dev.to/${h}`, placeholder: "username" },
  Hashnode: { color: "2962FF", logo: "hashnode", url: (h) => `https://hashnode.com/${h.startsWith("@") ? h : "@" + h}`, placeholder: "@username" },
  Medium: { color: "000000", logo: "medium", url: (h) => `https://medium.com/${h.startsWith("@") ? h : "@" + h}`, placeholder: "@username" },
  YouTube: { color: "FF0000", logo: "youtube", url: (h) => `https://youtube.com/@${h.replace(/^@/, "")}`, placeholder: "channel" },
  Discord: { color: "5865F2", logo: "discord", url: (h) => (h.startsWith("http") ? h : `https://discord.gg/${h}`), placeholder: "invite code" },
  "Stack Overflow": { color: "F58025", logo: "stackoverflow", url: (h) => `https://stackoverflow.com/users/${h}`, placeholder: "user ID" },
  CodePen: { color: "000000", logo: "codepen", url: (h) => `https://codepen.io/${h}`, placeholder: "username" },
  LeetCode: { color: "FFA116", logo: "leetcode", url: (h) => `https://leetcode.com/${h}`, placeholder: "username" },
  Kaggle: { color: "20BEFF", logo: "kaggle", url: (h) => `https://kaggle.com/${h}`, placeholder: "username" },
  Twitch: { color: "9146FF", logo: "twitch", url: (h) => `https://twitch.tv/${h}`, placeholder: "username" },
  Instagram: { color: "E4405F", logo: "instagram", url: (h) => `https://instagram.com/${h}`, placeholder: "username" },
  Portfolio: { color: "8B5CF6", logo: "googlechrome", url: (h) => (h.startsWith("http") ? h : `https://${h}`), placeholder: "yoursite.dev" },
  Email: { color: "EA4335", logo: "gmail", url: (h) => `mailto:${h}`, placeholder: "you@example.com" },
};

export const STATS_THEMES = ["tokyonight", "radical", "dracula", "github_dark", "transparent"];
export const BADGE_STYLES = ["for-the-badge", "flat", "flat-square", "plastic"] as const;
export type BadgeStyle = (typeof BADGE_STYLES)[number];
export type BlogSource = "none" | "devto" | "medium" | "rss";

export type Work = {
  working: string; workingLink: string;
  collab: string; collabLink: string;
  learning: string; askMe: string; reach: string;
  funFact: string; blog: string; resume: string;
};

export type Profile = {
  name: string;
  username: string;
  title: string;
  location: string;
  bio: string;
  typingBanner: boolean;
  bannerUrl: string;
  work: Work;
  skills: string[];
  badgeStyle: BadgeStyle;
  socials: Record<string, string>;
  addons: {
    visitors: boolean; trophy: boolean; stats: boolean; langs: boolean; streak: boolean;
    blog: BlogSource; blogHandle: string;
  };
  statsTheme: string;
  support: { bmc: string; kofi: string; sponsors: boolean };
};

export const seedProfile: Profile = {
  name: "Parth Chaudhari",
  username: "parthchaudhari",
  title: "Full-Stack Developer",
  location: "India",
  bio: "I build fast, accessible web apps with TypeScript end to end. I love clean APIs, thoughtful UI, and shipping things people actually use.",
  typingBanner: true,
  bannerUrl: "",
  work: {
    working: "GitProfile Studio", workingLink: "https://github.com/parthchaudhari",
    collab: "open-source developer tools", collabLink: "",
    learning: "Rust and distributed systems", askMe: "React, Node.js and TypeScript",
    reach: "hello@parth.dev", funFact: "I debug best after midnight ☕",
    blog: "", resume: "",
  },
  skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "Git"],
  badgeStyle: "for-the-badge",
  socials: { LinkedIn: "parthchaudhari", X: "parthcodes", Portfolio: "parth.dev", Email: "hello@parth.dev" },
  addons: { visitors: true, trophy: true, stats: true, langs: true, streak: true, blog: "none", blogHandle: "" },
  statsTheme: "tokyonight",
  support: { bmc: "", kofi: "", sponsors: false },
};

const emptyWork: Work = { working: "", workingLink: "", collab: "", collabLink: "", learning: "", askMe: "", reach: "", funFact: "", blog: "", resume: "" };

export const PRESETS: Record<string, Profile> = {
  "Full-Stack Dev": seedProfile,
  "Frontend Specialist": {
    ...seedProfile,
    title: "Frontend Engineer",
    bio: "Pixel-perfect interfaces, design systems and buttery animations.",
    work: { ...emptyWork, working: "a React component library", learning: "WebGL and Three.js", askMe: "CSS, accessibility, design systems" },
    skills: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "Sass", "Vite", "Figma", "Vitest"],
    addons: { ...seedProfile.addons, trophy: false },
    statsTheme: "radical",
  },
  "AI/ML Engineer": {
    ...seedProfile,
    title: "AI / ML Engineer",
    bio: "Training models, building data pipelines and shipping AI features to production.",
    work: { ...emptyWork, working: "LLM-powered search", learning: "reinforcement learning", askMe: "PyTorch, RAG, MLOps" },
    skills: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain", "Docker", "Google Cloud"],
    statsTheme: "dracula",
  },
  Minimalist: {
    ...seedProfile,
    bio: "",
    typingBanner: false,
    work: { ...emptyWork, working: "something new" },
    skills: ["TypeScript", "React", "Node.js"],
    socials: { GitHub: "parthchaudhari", Email: "hello@parth.dev" },
    addons: { visitors: false, trophy: false, stats: true, langs: false, streak: false, blog: "none", blogHandle: "" },
    statsTheme: "transparent",
    badgeStyle: "flat-square",
  },
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const badge = (label: string, color: string, logo: string, style: BadgeStyle) =>
  `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--").replace(/_/g, "__"))}-${color}?style=${style}&logo=${logo}&logoColor=white`;

export const skillBadgeUrl = (t: string, style: BadgeStyle = "for-the-badge") => {
  const s = SKILL_INDEX[t];
  return badge(t, s?.[2] ?? "555555", s?.[1] ?? "", style);
};
export const socialBadgeUrl = (p: string, style: BadgeStyle = "for-the-badge") => {
  const m = SOCIAL_META[p];
  return badge(p, m?.color ?? "555555", m?.logo ?? "", style);
};

const u = (p: Profile) => encodeURIComponent(p.username || "github");
export const statsUrl = (p: Profile) =>
  `https://github-readme-stats.vercel.app/api?username=${u(p)}&show_icons=true&theme=${p.statsTheme}&hide_border=true`;
export const langsUrl = (p: Profile) =>
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${u(p)}&layout=compact&theme=${p.statsTheme}&hide_border=true`;
export const streakUrl = (p: Profile) =>
  `https://streak-stats.demolab.com?user=${u(p)}&theme=${p.statsTheme}&hide_border=true`;
export const trophyUrl = (p: Profile) =>
  `https://github-profile-trophy.vercel.app/?username=${u(p)}&theme=${p.statsTheme === "github_dark" ? "darkhub" : p.statsTheme}&no-frame=true&row=1&column=7`;
export const visitorsUrl = (p: Profile) =>
  `https://komarev.com/ghpvc/?username=${u(p)}&label=Profile%20views&color=8B5CF6&style=flat`;
export const typingUrl = (p: Profile) =>
  `https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1000&color=22D3EE&center=true&vCenter=true&width=500&lines=${encodeURIComponent(p.title || "Developer")};${encodeURIComponent(p.work.askMe ? "Ask me about " + p.work.askMe : "Welcome to my profile!")}`;

const link = (text: string, href: string) => (href ? `[${esc(text)}](${href})` : `**${esc(text)}**`);

export function toMarkdown(p: Profile): string {
  const out: string[] = [];
  const w = p.work;
  if (p.bannerUrl) out.push(`<p align="center"><img src="${p.bannerUrl}" alt="banner" /></p>`, "");
  out.push(`<h1 align="center">Hi 👋, I'm ${esc(p.name)}</h1>`);
  if (p.title || p.location)
    out.push(`<h3 align="center">${esc(p.title)}${p.location ? ` · ${esc(p.location)}` : ""}</h3>`);
  out.push("");
  if (p.typingBanner) out.push(`<p align="center"><img src="${typingUrl(p)}" alt="Typing SVG" /></p>`, "");
  if (p.addons.visitors) out.push(`<p align="left"><img src="${visitorsUrl(p)}" alt="profile views" /></p>`, "");
  if (p.bio) out.push(esc(p.bio), "");

  const bullets: string[] = [];
  if (w.working) bullets.push(`- 🔭 I'm currently working on ${link(w.working, w.workingLink)}`);
  if (w.collab) bullets.push(`- 👯 I'm looking to collaborate on ${link(w.collab, w.collabLink)}`);
  if (w.learning) bullets.push(`- 🌱 I'm currently learning **${esc(w.learning)}**`);
  if (w.askMe) bullets.push(`- 💬 Ask me about **${esc(w.askMe)}**`);
  if (w.reach) bullets.push(`- 📫 How to reach me **${esc(w.reach)}**`);
  if (w.blog) bullets.push(`- 📝 I regularly write articles on [${esc(w.blog)}](${w.blog})`);
  if (w.resume) bullets.push(`- 📄 Know about my experiences [${esc(w.resume)}](${w.resume})`);
  if (w.funFact) bullets.push(`- ⚡ Fun fact **${esc(w.funFact)}**`);
  if (bullets.length) out.push(...bullets, "");

  if (p.skills.length) {
    out.push("## 🛠️ Tech Stack", "", `<p align="left">`);
    p.skills.forEach((t) => out.push(`  <img src="${skillBadgeUrl(t, p.badgeStyle)}" alt="${esc(t)}" />`));
    out.push(`</p>`, "");
  }

  if (p.addons.trophy) out.push("## 🏆 GitHub Trophies", "", `<p align="left"><img src="${trophyUrl(p)}" alt="trophies" /></p>`, "");

  if (p.addons.stats || p.addons.langs || p.addons.streak) {
    out.push("## 📊 GitHub Stats", "", `<p align="center">`);
    if (p.addons.stats) out.push(`  <img src="${statsUrl(p)}" alt="GitHub stats" />`);
    if (p.addons.langs) out.push(`  <img src="${langsUrl(p)}" alt="Top languages" />`);
    if (p.addons.streak) out.push(`  <img src="${streakUrl(p)}" alt="GitHub streak" />`);
    out.push(`</p>`, "");
  }

  if (p.addons.blog !== "none") {
    out.push("## ✍️ Latest Blog Posts", "", "<!-- BLOG-POST-LIST:START -->", "<!-- BLOG-POST-LIST:END -->", "");
  }

  const socials = Object.entries(p.socials).filter(([k, v]) => v && SOCIAL_META[k]);
  if (socials.length) {
    out.push("## 🤝 Connect with me", "", `<p align="left">`);
    socials.forEach(([k, v]) =>
      out.push(`  <a href="${SOCIAL_META[k]!.url(v)}" target="_blank"><img src="${socialBadgeUrl(k, p.badgeStyle)}" alt="${k}" /></a>`),
    );
    out.push(`</p>`, "");
  }

  const s = p.support;
  if (s.bmc || s.kofi || s.sponsors) {
    out.push("## ☕ Support", "", `<p align="left">`);
    if (s.bmc) out.push(`  <a href="https://www.buymeacoffee.com/${s.bmc}"><img src="${badge("Buy Me a Coffee", "FFDD00", "buymeacoffee", p.badgeStyle)}" alt="Buy me a coffee" /></a>`);
    if (s.kofi) out.push(`  <a href="https://ko-fi.com/${s.kofi}"><img src="${badge("Ko-fi", "FF5E5B", "kofi", p.badgeStyle)}" alt="Ko-fi" /></a>`);
    if (s.sponsors) out.push(`  <a href="https://github.com/sponsors/${u(p)}"><img src="${badge("Sponsor", "EA4AAA", "githubsponsors", p.badgeStyle)}" alt="GitHub Sponsors" /></a>`);
    out.push(`</p>`, "");
  }
  return out.join("\n").trim() + "\n";
}

export function blogWorkflow(p: Profile): string {
  const h = p.addons.blogHandle || "your-handle";
  const feed =
    p.addons.blog === "devto" ? `https://dev.to/feed/${h}` :
    p.addons.blog === "medium" ? `https://medium.com/feed/${h.startsWith("@") ? h : "@" + h}` : h;
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

/** Merge an imported JSON object onto the seed, so older/partial configs still load. */
export function parseConfig(raw: unknown): Profile {
  if (!raw || typeof raw !== "object") throw new Error("Invalid config");
  const r = raw as Partial<Profile>;
  if (typeof r.name !== "string") throw new Error("Missing name");
  return {
    ...seedProfile,
    ...r,
    work: { ...emptyWork, ...(r.work ?? {}) },
    addons: { ...seedProfile.addons, ...(r.addons ?? {}) },
    support: { ...seedProfile.support, ...(r.support ?? {}) },
    socials: { ...(r.socials ?? {}) },
    skills: Array.isArray(r.skills) ? r.skills.filter((x) => typeof x === "string") : [],
  };
}
