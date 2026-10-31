import React, { useState, useEffect } from "react";
import {
  type Profile,
  type StatsCardConfig,
  type LangsCardConfig,
  type StreakCardConfig,
  type ActivityGraphConfig,
  type CustomLanguage,
  statsCardUrl,
  langsCardUrl,
  streakCardUrl,
  graphCardUrl,
  renderStatsSection,
  SKILL_CATEGORIES,
  esc,
} from "@/lib/profile";
import {
  STATS_CARD_THEMES,
  THEME_STATS_PALETTES,
  resolveThemePalette,
  type ThemeStatsPalette,
  applyStatsTheme,
  generateStatsCardDataUri,
  generateLangsCardDataUri,
} from "@/lib/appearance";
import { fetchGitHubProfile } from "@/lib/github";
import { StatsThemeGallery } from "@/components/builder/ThemeGalleries";
import { sanitizeHtml } from "@/lib/sanitize";
import { mdToHtml } from "@/components/ReadmePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Code2,
  Flame,
  Activity,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Layers,
  Palette,
  Sliders,
  Info,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  LayoutGrid,
  Plus,
  Trash2,
  Users,
  UserPlus,
  GitFork,
  BookOpen,
  FolderGit2,
  Star,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export type CardTypeId = "all-stacked" | "stats" | "langs" | "streak" | "graph" | "layout" | "repos";

interface StatsCardSectionProps {
  profile: Profile;
  onChange: (fn: (prev: Profile) => Profile) => void;
}

// Generate a local SVG for the GitHub Stats card that matches the reference design
// Uses fetched data + active palette so it always works even when the external service is down
function generateLocalStatsSvg(
  username: string,
  displayName: string,
  data: { publicRepos: number; followers: number; totalStars: number; totalForks: number } | null,
  palette: ThemeStatsPalette,
  borderRadius = 8
): string {
  const width = 495;
  const height = 165;
  const pad = 24;
  const fontFamily = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif`;
  const bg = palette.bg;
  const titleColor = palette.title;
  const textColor = palette.text;
  const iconColor = palette.icon;
  const borderColor = palette.border;

  const repos = data?.publicRepos ?? 0;
  const followers = data?.followers ?? 0;
  const stars = data?.totalStars ?? 0;
  const forks = data?.totalForks ?? 0;

  const title = `${esc(displayName || username)}'s GitHub Stats`;

  // GitHub Octocat logo circle (right side)
  const logoX = width - 75;
  const logoY = height / 2;

  // Each metric row
  const metrics = [
    { icon: "⭐", label: "Total Stars", value: stars },
    { icon: "📁", label: "Total Repos", value: repos },
    { icon: "🍴", label: "Total Forks", value: forks },
    { icon: "👥", label: "Followers", value: followers },
  ];

  const metricRows = metrics.map((m, i) => {
    const y = 62 + i * 26;
    return `
      <text x="${pad}" y="${y}" font-family="${fontFamily}" font-size="13" fill="#${iconColor}">${m.icon}</text>
      <text x="${pad + 22}" y="${y}" font-family="${fontFamily}" font-size="13" font-weight="500" fill="#${textColor}">${m.label}:</text>
      <text x="${pad + 175}" y="${y}" font-family="${fontFamily}" font-size="13" font-weight="700" fill="#${titleColor}">${m.value.toLocaleString()}</text>
    `;
  }).join("");

  // GitHub logo SVG path (simplified octocat)
  const ghLogoPath = `M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
    <rect width="${width}" height="${height}" rx="${borderRadius}" fill="#${bg}" stroke="#${borderColor}" stroke-width="1"/>
    <text x="${pad}" y="36" font-family="${fontFamily}" font-size="16" font-weight="600" fill="#${titleColor}">${title}</text>
    ${metricRows}
    <!-- GitHub logo circle -->
    <circle cx="${logoX}" cy="${logoY}" r="32" fill="none" stroke="#${borderColor}" stroke-width="2.5"/>
    <circle cx="${logoX}" cy="${logoY}" r="28" fill="none" stroke="#${iconColor}" stroke-width="1.5" opacity="0.3"/>
    <g transform="translate(${logoX - 12}, ${logoY - 12}) scale(1)">
      <path d="${ghLogoPath}" fill="#FFFFFF" opacity="0.95"/>
    </g>
  </svg>`;
}

// Generate an SVG for the custom languages card matching the screenshot design
function generateCustomLangsSvg(
  languages: CustomLanguage[],
  palette: ThemeStatsPalette,
  borderRadius = 12
): string {
  const width = 360;
  const padding = 22;
  const contentWidth = width - padding * 2;
  const barHeight = 8;
  const total = languages.reduce((sum, l) => sum + (l.percent || 0), 0) || 100;

  // Compute bar segments
  let currentX = padding;
  const barSegments = languages.map((lang) => {
    const segWidth = ((lang.percent || 0) / total) * contentWidth;
    const x = currentX;
    currentX += segWidth;
    return `<rect x="${x}" y="52" width="${Math.max(2, segWidth)}" height="${barHeight}" fill="#${(lang.color || "58A6FF").replace(/^#/, "")}" />`;
  });

  // 2 columns of languages
  const col1 = languages.filter((_, i) => i % 2 === 0);
  const col2 = languages.filter((_, i) => i % 2 === 1);
  const rowCount = Math.max(col1.length, col2.length, 1);
  const cardHeight = Math.max(160, 75 + rowCount * 24 + 14);

  const langItemsCol1 = col1.map((lang, idx) => {
    const y = 84 + idx * 24;
    return `
      <circle cx="${padding + 6}" cy="${y - 4}" r="5" fill="#${(lang.color || "58A6FF").replace(/^#/, "")}" />
      <text x="${padding + 18}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="12" font-weight="500" fill="#${palette.text}">${esc(lang.name)}</text>
      <text x="${padding + 115}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="11" fill="#${palette.text}" opacity="0.75">${Number(lang.percent).toFixed(1)}%</text>
    `;
  });

  const langItemsCol2 = col2.map((lang, idx) => {
    const y = 84 + idx * 24;
    const col2X = padding + 155;
    return `
      <circle cx="${col2X + 6}" cy="${y - 4}" r="5" fill="#${(lang.color || "58A6FF").replace(/^#/, "")}" />
      <text x="${col2X + 18}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="12" font-weight="500" fill="#${palette.text}">${esc(lang.name)}</text>
      <text x="${col2X + 115}" y="${y}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="11" fill="#${palette.text}" opacity="0.75">${Number(lang.percent).toFixed(1)}%</text>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${cardHeight}" viewBox="0 0 ${width} ${cardHeight}" fill="none">
    <rect width="${width}" height="${cardHeight}" rx="${borderRadius}" fill="#${palette.bg}" stroke="#${palette.border}" stroke-width="1"/>
    <text x="${padding}" y="36" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="16" font-weight="600" fill="#${palette.title}">Most Used Languages</text>
    <g clip-path="url(#bar-clip)">
      <rect x="${padding}" y="52" width="${contentWidth}" height="${barHeight}" rx="4" fill="#1e2638" />
      ${barSegments.join("")}
    </g>
    <defs>
      <clipPath id="bar-clip">
        <rect x="${padding}" y="52" width="${contentWidth}" height="${barHeight}" rx="4" />
      </clipPath>
    </defs>
    ${langItemsCol1.join("")}
    ${langItemsCol2.join("")}
  </svg>`;
}

export function StatsCardSection({ profile: p, onChange }: StatsCardSectionProps) {
  const [selectedCard, setSelectedCard] = useState<CardTypeId>("all-stacked");
  const [copied, setCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [usernameInput, setUsernameInput] = useState(p.username);
  const [fetching, setFetching] = useState(false);
  const [addedRepoNames, setAddedRepoNames] = useState<Set<string>>(new Set());

  const username = p.username.trim() || "github";
  const hasRealUser = !!p.username.trim();

  // Resolved active color palette for the stats cards
  const activePalette = resolveThemePalette(p);
  const isAutoSync = !p.statsCard?.themePalette || p.statsCard.themePalette === "auto";

  // Check if custom languages are used
  const useCustomLangs = p.langsCard?.useCustomLanguages ?? false;
  const customLangsList = p.langsCard?.customLanguages || [
    { name: "HTML", percent: 32.9, color: "E34F26" },
    { name: "CSS", percent: 32.5, color: "1572B6" },
    { name: "Java", percent: 24.0, color: "ED8B00" },
    { name: "JavaScript", percent: 6.3, color: "F7DF1E" },
    { name: "Python", percent: 4.0, color: "3776AB" },
    { name: "Dockerfile", percent: 0.3, color: "2496ED" },
  ];

  // SVG representation for custom languages
  const customLangsSvg = generateCustomLangsSvg(
    customLangsList,
    activePalette,
    p.langsCard?.borderRadius ?? 12
  );
  const customLangsDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(customLangsSvg)}`;

  // Local SVG-based stats card (always works, uses fetched data + theme colors)
  const localStatsSvg = generateLocalStatsSvg(
    username,
    p.name || username,
    p.githubStats
      ? {
          publicRepos: p.githubStats.publicRepos,
          followers: p.githubStats.followers,
          totalStars: p.githubStats.totalStars,
          totalForks: p.githubStats.totalForks,
        }
      : null,
    activePalette,
    p.statsCard?.borderRadius ?? 8
  );
  const localStatsDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(localStatsSvg)}`;

  // Individual card URLs
  const statsUrl = statsCardUrl(p);
  const langsUrl = useCustomLangs ? customLangsDataUri : langsCardUrl(p);
  const streakUrl = streakCardUrl(p);
  const graphUrl = graphCardUrl(p);

  // Badge URLs
  const accent = p.accentColor || activePalette.title;
  const followersBadgeUrl = `https://img.shields.io/github/followers/${username}?label=Followers&style=for-the-badge&logo=github&color=${accent}`;
  const reposCount = p.githubStats?.publicRepos ?? "0";
  const reposBadgeUrl = `https://img.shields.io/badge/Repositories-${encodeURIComponent(String(reposCount))}-${accent}?style=for-the-badge&logo=github`;
  const followingCount = p.githubStats?.following ?? "0";
  const followingBadgeUrl = `https://img.shields.io/badge/Following-${encodeURIComponent(String(followingCount))}-555555?style=for-the-badge&logo=github`;

  // URL for the selected single card
  const getSelectedCardUrl = (): string => {
    switch (selectedCard) {
      case "stats":
        return generateStatsCardDataUri(p);
      case "langs":
        return useCustomLangs ? customLangsDataUri : generateLangsCardDataUri(p);
      case "streak":
        return streakUrl;
      case "graph":
        return graphUrl;
      default:
        return "";
    }
  };

  const getSelectedCardAlt = (): string => {
    switch (selectedCard) {
      case "stats":
        return `${p.name || username}'s GitHub Stats`;
      case "langs":
        return `${p.name || username}'s Most Used Languages`;
      case "streak":
        return `${p.name || username}'s GitHub Streak`;
      case "graph":
        return `${p.name || username}'s Contribution Activity Graph`;
      default:
        return "GitHub Stats";
    }
  };

  const cardUrl = getSelectedCardUrl();
  const cardAlt = getSelectedCardAlt();

  // Reset image states when card URL changes
  useEffect(() => {
    if (selectedCard !== "layout" && selectedCard !== "all-stacked" && selectedCard !== "repos") {
      if (cardUrl.startsWith("data:")) {
        setImageLoading(false);
        setImageError(false);
      } else {
        setImageLoading(true);
        setImageError(false);
      }
    }
  }, [cardUrl, selectedCard, previewKey]);

  // Generate markdown snippet for export
  const generateMarkdown = (): string => {
    const linkTarget = `https://github.com/${username}`;
    if (selectedCard === "all-stacked") {
      const parts: string[] = ["## 📊 GitHub Stats", ""];
      // Include badges if selected
      const badges: string[] = [];
      if (p.addons.followersBadge) {
        badges.push(`[![GitHub Followers](${followersBadgeUrl})](https://github.com/${username}?tab=followers)`);
      }
      if (p.addons.reposBadge) {
        badges.push(`[![GitHub Repositories](${reposBadgeUrl})](https://github.com/${username}?tab=repositories)`);
      }
      if (p.addons.followingBadge) {
        badges.push(`[![GitHub Following](${followingBadgeUrl})](https://github.com/${username}?tab=following)`);
      }
      if (badges.length > 0) {
        parts.push(`<p align="center">`, ...badges.map((b) => `  ${b}`), `</p>`, "");
      }

      if (p.addons.stats) {
        parts.push(
          `<p align="center">`,
          `  <a href="${linkTarget}">`,
          `    <img src="${statsUrl}" alt="${p.name || username}'s GitHub Stats" />`,
          `  </a>`,
          `</p>`
        );
      }
      if (p.addons.streak) {
        parts.push(
          `<p align="center">`,
          `  <a href="${linkTarget}">`,
          `    <img src="${streakUrl}" alt="${p.name || username}'s Streak Stats" />`,
          `  </a>`,
          `</p>`
        );
      }
      if (p.addons.langs) {
        const exportLangsUrl = useCustomLangs ? langsCardUrl(p) : langsUrl;
        parts.push(
          `<p align="center">`,
          `  <a href="${linkTarget}">`,
          `    <img src="${exportLangsUrl}" alt="${p.name || username}'s Most Used Languages" />`,
          `  </a>`,
          `</p>`
        );
      }
      if (p.addons.contributionGraph) {
        parts.push(
          `<p align="center">`,
          `  <a href="${linkTarget}">`,
          `    <img src="${graphUrl}" alt="${p.name || username}'s Contribution Graph" />`,
          `  </a>`,
          `</p>`
        );
      }
      return parts.join("\n");
    }

    if (selectedCard === "layout") {
      return renderStatsSection(p).join("\n");
    }

    const exportUrl = selectedCard === "langs" && useCustomLangs
      ? langsCardUrl(p)
      : selectedCard === "stats"
        ? statsUrl
        : cardUrl;
    return `[![${cardAlt}](${exportUrl})](${linkTarget})`;
  };

  const handleCopyMarkdown = async () => {
    const md = generateMarkdown();
    let ok = false;
    try {
      await navigator.clipboard.writeText(md);
      ok = true;
    } catch {
      /* fall back to execCommand for browsers that block the Clipboard API */
      try {
        const ta = document.createElement("textarea");
        ta.value = md;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        /* fall through to manual copy */
      }
    }
    if (ok) {
      setCopied(true);
      toast.success(
        selectedCard === "all-stacked"
          ? "All stacked stats cards Markdown copied!"
          : selectedCard === "layout"
            ? "README stats section Markdown copied!"
            : "Stats card Markdown copied to clipboard!"
      );
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Copy blocked. Select the text and press Ctrl+C / Cmd+C.");
    }
  };

  // Updaters for configs
  const updateStatsCard = (fn: (cfg: StatsCardConfig) => StatsCardConfig) => {
    onChange((prev) => ({
      ...prev,
      statsCard: fn(prev.statsCard),
    }));
  };

  const updateLangsCard = (fn: (cfg: LangsCardConfig) => LangsCardConfig) => {
    onChange((prev) => ({
      ...prev,
      langsCard: fn(prev.langsCard),
    }));
  };

  const updateStreakCard = (fn: (cfg: StreakCardConfig) => StreakCardConfig) => {
    onChange((prev) => ({
      ...prev,
      streakCard: fn(prev.streakCard),
    }));
  };

  const updateActivityGraph = (fn: (cfg: ActivityGraphConfig) => ActivityGraphConfig) => {
    onChange((prev) => ({
      ...prev,
      activityGraph: fn(prev.activityGraph),
    }));
  };

  const setAddon = (
    key: "stats" | "langs" | "streak" | "contributionGraph" | "followersBadge" | "reposBadge" | "followingBadge",
    val: boolean
  ) => {
    onChange((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [key]: val,
      },
    }));
  };

  const setPaletteTheme = (paletteId: string) => {
    updateStatsCard((c) => ({
      ...c,
      themePalette: paletteId,
      theme: "default",
      bgColor: "",
      accentColor: "",
      textColor: "",
      borderColor: "",
    }));
    updateLangsCard((c) => ({ ...c, theme: "default" }));
    updateStreakCard((c) => ({ ...c, theme: "default", fireColor: "", ringColor: "" }));
    toast.success(`Applied ${THEME_STATS_PALETTES[paletteId]?.name || paletteId} color theme!`);
  };

  // Automatically fetch user repositories, followers, and following
  const handleFetchProfile = async (uname?: string) => {
    const targetUser = (uname || usernameInput || p.username).trim();
    if (!targetUser) {
      toast.error("Please enter a GitHub username to fetch data.");
      return;
    }
    setFetching(true);
    try {
      const data = await fetchGitHubProfile(targetUser);
      const totalStars = (data.repos || []).reduce((sum, r) => sum + r.stargazers_count, 0);
      const totalForks = (data.repos || []).reduce((sum, r) => sum + r.forks_count, 0);

      const realLangs: CustomLanguage[] = (data.languageStats || []).slice(0, 6).map((l) => ({
        name: l.name,
        percent: l.percent,
        color: l.color,
      }));

      onChange((prev) => ({
        ...prev,
        username: data.user.login,
        name: prev.name || data.user.name || data.user.login,
        bio: prev.bio || data.user.bio || "",
        location: prev.location || data.user.location || "",
        langsCard: {
          ...prev.langsCard,
          customLanguages: realLangs.length > 0 ? realLangs : prev.langsCard.customLanguages,
        },
        githubStats: {
          repos: (data.repos || []).map((r) => ({
            name: r.name,
            url: r.html_url,
            description: r.description ?? null,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
          })),
          languages: data.languages,
          languageStats: data.languageStats,
          totalStars,
          totalForks,
          followers: data.followers,
          following: data.following,
          publicRepos: data.publicRepos,
          warning: data.warning,
        },
      }));

      setUsernameInput(data.user.login);
      toast.success(`Successfully fetched @${data.user.login}'s profile!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to fetch GitHub profile.");
    } finally {
      setFetching(false);
    }
  };

  // Add a repository to featured projects
  const handleAddRepoToProjects = (repo: { name: string; url: string; description: string | null }) => {
    onChange((prev) => {
      const exists = prev.projects.some((pr) => pr.name.toLowerCase() === repo.name.toLowerCase());
      if (exists) {
        toast.info(`${repo.name} is already in your Featured Projects.`);
        return prev;
      }
      return {
        ...prev,
        projects: [
          ...prev.projects,
          {
            name: repo.name,
            url: repo.url,
            description: repo.description || "",
          },
        ],
        sections: prev.sections.map((s) => (s.id === "projects" ? { ...s, hidden: false } : s)),
      };
    });
    setAddedRepoNames((prev) => new Set(prev).add(repo.name));
    toast.success(`Added ${repo.name} to Featured Projects section!`);
  };

  return (
    <div className="space-y-6">
      {/* ==================== 1. AUTOMATIC GITHUB DATA FETCH & QUICK METRICS ==================== */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-4 space-y-3.5 shadow-sm">
        <div className="flex items-center gap-2">
          <FolderGit2 className="h-4 w-4 text-primary shrink-0" />
          <Input
            placeholder="GitHub username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetchProfile()}
            className="h-8 w-44 text-xs font-mono"
          />
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5 shrink-0"
            onClick={() => handleFetchProfile()}
            disabled={fetching}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${fetching ? "animate-spin" : ""}`} />
            {fetching ? "Fetching..." : "Fetch Stats"}
          </Button>
        </div>

        {/* Live Fetched Badges & Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-border/60">
          {/* Followers Button Card */}
          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/80 bg-background/80">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {p.githubStats?.followers ?? (hasRealUser ? "Live" : "0")} Followers
                </div>
                <div className="text-[10px] text-muted-foreground">Followers Badge</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Switch
                checked={p.addons.followersBadge ?? false}
                onCheckedChange={(val) => {
                  setAddon("followersBadge", val);
                  toast.success(val ? "Added Followers Badge to README!" : "Removed Followers Badge from README");
                }}
              />
            </div>
          </div>

          {/* Repositories Button Card */}
          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/80 bg-background/80">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {p.githubStats?.publicRepos ?? (hasRealUser ? "Live" : "0")} Repositories
                </div>
                <div className="text-[10px] text-muted-foreground">Repositories Badge</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Switch
                checked={p.addons.reposBadge ?? false}
                onCheckedChange={(val) => {
                  setAddon("reposBadge", val);
                  toast.success(val ? "Added Repositories Badge to README!" : "Removed Repositories Badge from README");
                }}
              />
            </div>
          </div>

          {/* Following Button Card */}
          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/80 bg-background/80">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {p.githubStats?.following ?? (hasRealUser ? "Live" : "0")} Following
                </div>
                <div className="text-[10px] text-muted-foreground">Following Badge</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Switch
                checked={p.addons.followingBadge ?? false}
                onCheckedChange={(val) => {
                  setAddon("followingBadge", val);
                  toast.success(val ? "Added Following Badge to README!" : "Removed Following Badge from README");
                }}
              />
            </div>
          </div>
        </div>

        {/* Live Badge Preview Row (if any badges enabled) */}
        {(p.addons.followersBadge || p.addons.reposBadge || p.addons.followingBadge) && (
          <div className="pt-2 border-t border-border/40 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted-foreground font-medium">Active Badges:</span>
              {p.addons.followersBadge && (
                <img src={followersBadgeUrl} alt="Followers Badge" className="h-5 rounded" />
              )}
              {p.addons.reposBadge && (
                <img src={reposBadgeUrl} alt="Repositories Badge" className="h-5 rounded" />
              )}
              {p.addons.followingBadge && (
                <img src={followingBadgeUrl} alt="Following Badge" className="h-5 rounded" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==================== 2. THEME COLOR PALETTE SELECTOR ==================== */}
      <div className="rounded-xl border border-border bg-card/80 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/60">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-primary" />
              Stats Color Theme Sync
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Stats cards automatically change color when you select themes from the editor, or choose a custom palette below.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setPaletteTheme("auto")}
              className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all flex items-center gap-1.5 ${
                isAutoSync
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>Auto-Sync with Active Theme</span>
            </button>
          </div>
        </div>

        {/* Theme Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {Object.values(THEME_STATS_PALETTES).map((pal) => {
            const isSelected =
              (!p.statsCard?.themePalette && pal.id === (p.appearanceId || "classic-blue")) ||
              p.statsCard?.themePalette === pal.id ||
              (p.statsCard?.themePalette === "auto" && pal.id === (p.appearanceId || "classic-blue"));

            return (
              <button
                key={pal.id}
                type="button"
                onClick={() => setPaletteTheme(pal.id)}
                className={`flex flex-col gap-1.5 p-2 rounded-lg border text-left transition-all ${
                  isSelected
                    ? "border-primary ring-1 ring-primary bg-primary/10 shadow-sm"
                    : "border-border bg-background/60 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-semibold text-foreground truncate">
                    {pal.name.replace(/ \(.*\)/, "")}
                  </span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>
                <div
                  className="h-4 w-full rounded flex overflow-hidden border border-border/80 shadow-inner"
                  style={{ backgroundColor: `#${pal.bg}` }}
                >
                  <div className="w-1/3 h-full" style={{ backgroundColor: `#${pal.title}` }} />
                  <div className="w-1/3 h-full" style={{ backgroundColor: `#${pal.ring}` }} />
                  <div className="w-1/3 h-full" style={{ backgroundColor: `#${pal.bg}` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==================== 3. CARD TYPE SELECTOR ==================== */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Card View &amp; Customization
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          <button
            type="button"
            onClick={() => setSelectedCard("all-stacked")}
            className={`col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "all-stacked"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="font-semibold">All Stacked</span>
            <span className="text-[10px] text-primary opacity-90 font-mono">Screenshot</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCard("stats")}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "stats"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Classic Stats</span>
            <span className="text-[10px] opacity-70">
              {p.addons.stats ? "Enabled" : "Off"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCard("streak")}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "streak"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Flame className="h-4 w-4" />
            <span>Streak Stats</span>
            <span className="text-[10px] opacity-70">
              {p.addons.streak ? "Enabled" : "Off"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCard("langs")}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "langs"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Top Languages</span>
            <span className="text-[10px] opacity-70">
              {p.addons.langs ? "Enabled" : "Off"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCard("repos")}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "repos"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Repositories</span>
            <span className="text-[10px] opacity-70">Add Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCard("graph")}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "graph"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Activity Graph</span>
            <span className="text-[10px] opacity-70">
              {p.addons.contributionGraph ? "Enabled" : "Off"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCard("layout")}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-all ${
              selectedCard === "layout"
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Container Style</span>
            <span className="text-[10px] opacity-70">Theme</span>
          </button>
        </div>
      </div>

      {/* ==================== 4. LIVE PREVIEW PANEL ==================== */}
      <div className="rounded-xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {selectedCard === "all-stacked"
                ? "Live Stacked Preview (Matching Screenshot)"
                : selectedCard === "layout"
                  ? "Section Container Preview"
                  : selectedCard === "repos"
                    ? "Your Fetched GitHub Repositories"
                    : "Live Card Preview"}
            </span>
            <Badge variant="outline" className="text-[10px] font-mono">
              Theme: {activePalette.name}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setPreviewKey((k) => k + 1)}
            title="Refresh preview image"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Reload
          </Button>
        </div>

        {/* ALL STACKED VIEW */}
        {selectedCard === "all-stacked" && (
          <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border/80 bg-background/50 overflow-auto">
            {/* Optional Top Badges */}
            {(p.addons.followersBadge || p.addons.reposBadge || p.addons.followingBadge) && (
              <div className="flex flex-wrap items-center justify-center gap-2 pb-1">
                {p.addons.followersBadge && (
                  <img src={followersBadgeUrl} alt="Followers Badge" className="h-7 rounded" />
                )}
                {p.addons.reposBadge && (
                  <img src={reposBadgeUrl} alt="Repositories Badge" className="h-7 rounded" />
                )}
                {p.addons.followingBadge && (
                  <img src={followingBadgeUrl} alt="Following Badge" className="h-7 rounded" />
                )}
              </div>
            )}

            {p.addons.stats && (
              <img
                key={`stacked-stats-local-${previewKey}`}
                src={generateStatsCardDataUri(p)}
                alt="GitHub Stats"
                className="max-w-full rounded-xl shadow-sm transition-all hover:scale-[1.01]"
              />
            )}
            {p.addons.streak && (
              <img
                key={`stacked-streak-${streakUrl}-${previewKey}`}
                src={streakUrl}
                alt="GitHub Streak"
                className="max-w-full rounded-xl shadow-sm transition-all hover:scale-[1.01]"
              />
            )}
            {p.addons.langs && (
              <img
                key={`stacked-langs-${previewKey}`}
                src={useCustomLangs ? customLangsDataUri : generateLangsCardDataUri(p)}
                alt="Top Languages"
                className="max-w-full rounded-xl shadow-sm transition-all hover:scale-[1.01]"
              />
            )}
            {p.addons.contributionGraph && (
              <img
                key={`stacked-graph-${graphUrl}-${previewKey}`}
                src={graphUrl}
                alt="Contribution Graph"
                className="max-w-full rounded-xl shadow-sm transition-all hover:scale-[1.01]"
              />
            )}
            {!p.addons.stats && !p.addons.streak && !p.addons.langs && !p.addons.contributionGraph && (
              <p className="text-xs text-muted-foreground py-6">
                All stats cards are currently toggled off. Enable one or more cards to view the stack.
              </p>
            )}
          </div>
        )}

        {/* REPOSITORIES BROWSER */}
        {selectedCard === "repos" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/50">
              <span className="text-xs text-muted-foreground">
                Click <strong>+ Add to Projects</strong> on any repository to include it in your README Featured Projects:
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1"
                onClick={() => handleFetchProfile()}
                disabled={fetching}
              >
                <RefreshCw className={`h-3 w-3 ${fetching ? "animate-spin" : ""}`} />
                Refresh Repos
              </Button>
            </div>

            {p.githubStats?.repos && p.githubStats.repos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-auto pr-1">
                {p.githubStats.repos.map((repo, idx) => {
                  const isAdded =
                    addedRepoNames.has(repo.name) ||
                    p.projects.some((pr) => pr.name.toLowerCase() === repo.name.toLowerCase());

                  return (
                    <div
                      key={idx}
                      className="flex flex-col justify-between p-3 rounded-lg border border-border/70 bg-background/60 hover:bg-muted/40 transition-all gap-2"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-xs text-primary hover:underline flex items-center gap-1 truncate"
                          >
                            {repo.name}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            <span>{repo.stars}</span>
                          </div>
                        </div>
                        {repo.description && (
                          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-border/40">
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {repo.language || "Markdown"}
                        </span>
                        <Button
                          size="sm"
                          variant={isAdded ? "outline" : "secondary"}
                          className={`h-6 text-[11px] px-2 gap-1 ${
                            isAdded ? "text-green-500 border-green-500/40" : ""
                          }`}
                          onClick={() => handleAddRepoToProjects(repo)}
                          disabled={isAdded}
                        >
                          {isAdded ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                          {isAdded ? "Added to Projects" : "Add to Projects"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-muted-foreground">
                <FolderGit2 className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-60" />
                <p>No repositories loaded yet.</p>
                <p className="text-[11px] mt-1">
                  Enter your GitHub username above and click <strong>Fetch Stats</strong> to load your repositories.
                </p>
              </div>
            )}
          </div>
        )}

        {/* INDIVIDUAL CARD PREVIEW */}
        {selectedCard !== "all-stacked" && selectedCard !== "layout" && selectedCard !== "repos" && (
          <div className="min-h-[170px] flex items-center justify-center p-3 rounded-lg border border-border/60 bg-background/50 overflow-auto">
            {imageLoading && (
              <div className="text-xs text-muted-foreground flex items-center gap-2 py-8">
                <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                <span>Loading live card with {activePalette.name} colors...</span>
              </div>
            )}
            {imageError && (
              <div className="text-center py-6 px-4 max-w-sm">
                <AlertCircle className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">
                  Card service is taking longer to respond
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  If showing "Top Languages Unavailable", check that your GitHub username is entered above, or switch to "Custom / Selected Languages" below!
                </p>
                <a
                  href={cardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-primary mt-2 hover:underline"
                >
                  Open card directly <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
            <img
              key={`${cardUrl}-${previewKey}`}
              src={cardUrl}
              alt={cardAlt}
              className={`max-w-full rounded-lg transition-opacity duration-200 ${
                imageLoading || imageError ? "hidden" : "block"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          </div>
        )}

        {/* CONTAINER THEME PREVIEW */}
        {selectedCard === "layout" && (
          <div className="rounded-lg border border-border bg-background p-4 overflow-auto max-h-[340px]">
            {(() => {
              const lines = renderStatsSection(p);
              if (lines.length === 0) {
                return (
                  <p className="text-xs text-muted-foreground italic text-center py-4">
                    No stats widgets are currently enabled in addons. Enable one or more widgets above to see the framed layout preview.
                  </p>
                );
              }
              const html = sanitizeHtml(mdToHtml(lines.join("\n")));
              return <div className="text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
            })()}
          </div>
        )}

        {/* Markdown Snippet & Copy Action */}
        <div className="mt-3 pt-3 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <div className="text-[11px] text-muted-foreground truncate font-mono">
            {selectedCard === "all-stacked"
              ? "## 📊 GitHub Stats (All 3 Stacked Cards + Badges)"
              : selectedCard !== "layout" && selectedCard !== "repos"
                ? `[![${cardAlt}]...]`
                : `## GitHub Stats (${p.statsTheme})`}
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 text-xs font-medium gap-1.5 shrink-0"
            onClick={handleCopyMarkdown}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : selectedCard === "all-stacked" ? "Copy Stacked Markdown" : selectedCard === "layout" ? "Copy Full Section" : "Copy Card Markdown"}
          </Button>
        </div>
      </div>

      {/* ==================== 5. CUSTOMIZATION CONTROLS ==================== */}
      <div className="space-y-4">
        {/* ==================== ALL STACKED QUICK TOGGLES ==================== */}
        {selectedCard === "all-stacked" && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Cards &amp; Badges Included in Stack</h4>
            <p className="text-xs text-muted-foreground">
              Toggle the cards and badges you want stacked in your GitHub Stats section:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">1. Stats Card</span>
                <Switch
                  checked={p.addons.stats}
                  onCheckedChange={(val) => setAddon("stats", val)}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">2. Streak Card</span>
                <Switch
                  checked={p.addons.streak}
                  onCheckedChange={(val) => setAddon("streak", val)}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">3. Top Languages</span>
                <Switch
                  checked={p.addons.langs}
                  onCheckedChange={(val) => setAddon("langs", val)}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">4. Activity Graph</span>
                <Switch
                  checked={p.addons.contributionGraph}
                  onCheckedChange={(val) => setAddon("contributionGraph", val)}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">Followers Badge</span>
                <Switch
                  checked={p.addons.followersBadge ?? false}
                  onCheckedChange={(val) => setAddon("followersBadge", val)}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">Repos Badge</span>
                <Switch
                  checked={p.addons.reposBadge ?? false}
                  onCheckedChange={(val) => setAddon("reposBadge", val)}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <span className="text-xs font-medium text-foreground">Following Badge</span>
                <Switch
                  checked={p.addons.followingBadge ?? false}
                  onCheckedChange={(val) => setAddon("followingBadge", val)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 1. CLASSIC STATS ==================== */}
        {selectedCard === "stats" && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Classic Stats Settings</h4>
                <p className="text-xs text-muted-foreground">
                  Commits, stars, PRs, issues, and contributions card
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Include in README:</span>
                <Switch
                  checked={p.addons.stats}
                  onCheckedChange={(val) => setAddon("stats", val)}
                />
              </div>
            </div>

            {/* API Service Provider */}
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-foreground block">Stats Card API Service</span>
                  <span className="text-[11px] text-muted-foreground">
                    Select endpoint to avoid GitHub image proxy rate limits &amp; 504 timeouts
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-background border border-border p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => updateStatsCard((c) => ({ ...c, apiProvider: "extended" }))}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      (p.statsCard?.apiProvider ?? "extended") === "extended"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Extended (Fast &amp; Cached)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatsCard((c) => ({ ...c, apiProvider: "official" }))}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      p.statsCard?.apiProvider === "official"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Official Vercel
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatsCard((c) => ({ ...c, apiProvider: "custom" }))}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      p.statsCard?.apiProvider === "custom"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>
              {p.statsCard?.apiProvider === "custom" && (
                <div className="pt-2">
                  <label className="text-xs font-medium text-foreground mb-1 block">Custom API Base URL</label>
                  <Input
                    value={p.statsCard?.customApiUrl || ""}
                    onChange={(e) => updateStatsCard((c) => ({ ...c, customApiUrl: e.target.value }))}
                    placeholder="https://your-custom-stats.vercel.app"
                    className="h-8 text-xs font-mono"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <div className="text-xs">
                  <div className="font-medium text-foreground">Show Metric Icons</div>
                  <div className="text-muted-foreground text-[11px]">Display commit, star, and PR icons</div>
                </div>
                <Switch
                  checked={p.statsCard?.showIcons ?? true}
                  onCheckedChange={(val) => updateStatsCard((c) => ({ ...c, showIcons: val }))}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <div className="text-xs">
                  <div className="font-medium text-foreground">Count All Commits</div>
                  <div className="text-muted-foreground text-[11px]">Include all-time commits (may timeout if large)</div>
                </div>
                <Switch
                  checked={p.statsCard?.includeAllCommits ?? false}
                  onCheckedChange={(val) => updateStatsCard((c) => ({ ...c, includeAllCommits: val }))}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <div className="text-xs">
                  <div className="font-medium text-foreground">Count Private Commits</div>
                  <div className="text-muted-foreground text-[11px]">Show private repo contribution counts</div>
                </div>
                <Switch
                  checked={p.statsCard?.countPrivate ?? false}
                  onCheckedChange={(val) => updateStatsCard((c) => ({ ...c, countPrivate: val }))}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/70 bg-background/50">
                <div className="text-xs">
                  <div className="font-medium text-foreground">Hide Rank Badge</div>
                  <div className="text-muted-foreground text-[11px]">Remove the circular score grade</div>
                </div>
                <Switch
                  checked={p.statsCard?.hideRank ?? false}
                  onCheckedChange={(val) => updateStatsCard((c) => ({ ...c, hideRank: val }))}
                />
              </div>
            </div>

            {/* Metric Filtering */}
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">
                Hide Specific Metrics
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: "issues", label: "Issues" },
                  { id: "prs", label: "Pull Requests" },
                  { id: "contribs", label: "Contributed To" },
                ].map((item) => {
                  const isHidden = (p.statsCard?.hideMetrics || []).includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        updateStatsCard((c) => ({
                          ...c,
                          hideMetrics: isHidden
                            ? (c.hideMetrics || []).filter((m) => m !== item.id)
                            : [...(c.hideMetrics || []), item.id],
                        }))
                      }
                      className={`px-3 py-1 rounded-full border text-xs transition-colors ${
                        isHidden
                          ? "bg-destructive/15 text-destructive border-destructive/40"
                          : "bg-muted text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      {isHidden ? `✕ ${item.label} (Hidden)` : `✓ ${item.label} (Shown)`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-foreground">Border Radius</span>
                  <span className="text-muted-foreground">{p.statsCard?.borderRadius ?? 12}px</span>
                </div>
                <Slider
                  min={0}
                  max={25}
                  step={1}
                  value={[p.statsCard?.borderRadius ?? 12]}
                  onValueChange={(vals) => {
                    const v = vals[0] ?? 12;
                    updateStatsCard((c) => ({ ...c, borderRadius: v }));
                  }}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Custom Card Title (optional)
                </label>
                <Input
                  placeholder="e.g. My GitHub Statistics"
                  value={p.statsCard?.customTitle || ""}
                  onChange={(e) => updateStatsCard((c) => ({ ...c, customTitle: e.target.value }))}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. CONTRIBUTION STREAK ==================== */}
        {selectedCard === "streak" && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Contribution Streak Settings</h4>
                <p className="text-xs text-muted-foreground">
                  Current streak, longest streak, and total contribution days
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Include in README:</span>
                <Switch
                  checked={p.addons.streak}
                  onCheckedChange={(val) => setAddon("streak", val)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Streak Calculation Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateStreakCard((c) => ({ ...c, mode: "daily" }))}
                    className={`py-1.5 px-3 text-xs rounded-lg border font-medium transition-all ${
                      (p.streakCard?.mode || "daily") === "daily"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Daily Streak
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStreakCard((c) => ({ ...c, mode: "weekly" }))}
                    className={`py-1.5 px-3 text-xs rounded-lg border font-medium transition-all ${
                      p.streakCard?.mode === "weekly"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Weekly Streak
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-foreground">Border Radius</span>
                  <span className="text-muted-foreground">{p.streakCard?.borderRadius ?? 12}px</span>
                </div>
                <Slider
                  min={0}
                  max={25}
                  step={1}
                  value={[p.streakCard?.borderRadius ?? 12]}
                  onValueChange={(vals) => {
                    const v = vals[0] ?? 12;
                    updateStreakCard((c) => ({ ...c, borderRadius: v }));
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. TOP LANGUAGES ==================== */}
        {selectedCard === "langs" && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Top Languages Settings</h4>
                <p className="text-xs text-muted-foreground">
                  Display most-used programming languages with progress bar and percentages
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Include in README:</span>
                <Switch
                  checked={p.addons.langs}
                  onCheckedChange={(val) => setAddon("langs", val)}
                />
              </div>
            </div>

            {/* API Service Provider for Languages */}
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-foreground block">Languages Card API Service</span>
                  <span className="text-[11px] text-muted-foreground">
                    Select endpoint to avoid GitHub image proxy rate limits &amp; 504 timeouts
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-background border border-border p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => updateLangsCard((c) => ({ ...c, apiProvider: "extended" }))}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      (p.langsCard?.apiProvider ?? "extended") === "extended"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Extended (Fast &amp; Cached)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLangsCard((c) => ({ ...c, apiProvider: "official" }))}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      p.langsCard?.apiProvider === "official"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Official Vercel
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLangsCard((c) => ({ ...c, apiProvider: "custom" }))}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      p.langsCard?.apiProvider === "custom"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>
              {p.langsCard?.apiProvider === "custom" && (
                <div className="pt-2">
                  <label className="text-xs font-medium text-foreground mb-1 block">Custom API Base URL</label>
                  <Input
                    value={p.langsCard?.customApiUrl || ""}
                    onChange={(e) => updateLangsCard((c) => ({ ...c, customApiUrl: e.target.value }))}
                    placeholder="https://your-custom-stats.vercel.app"
                    className="h-8 text-xs font-mono"
                  />
                </div>
              )}
            </div>

            {/* Language Mode Selector */}
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-foreground block">Language Data Source</span>
                  <span className="text-[11px] text-muted-foreground">
                    Choose whether languages are calculated from your GitHub repositories or customized manually:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-background border border-border p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      if (p.githubStats?.languageStats && p.githubStats.languageStats.length > 0) {
                        const newLangs = p.githubStats.languageStats.slice(0, 6).map((l) => ({
                          name: l.name,
                          percent: l.percent,
                          color: l.color,
                        }));
                        updateLangsCard((c) => ({
                          ...c,
                          useCustomLanguages: false,
                          customLanguages: newLangs,
                        }));
                        toast.success(`Auto-filled ${newLangs.length} languages with real repository percentages!`);
                      } else if (p.githubStats?.languages && p.githubStats.languages.length > 0) {
                        const count = Math.min(p.githubStats.languages.length, 6);
                        const equal = Number((100 / count).toFixed(1));
                        const colors = ["E34F26", "1572B6", "ED8B00", "F7DF1E", "3776AB", "2496ED", "A855F7"];
                        const newLangs = p.githubStats.languages.slice(0, 6).map((langName, i) => {
                          const found = SKILL_CATEGORIES["Languages"]?.find((s) => s[0].toLowerCase() === langName.toLowerCase());
                          return {
                            name: langName,
                            percent: equal,
                            color: found ? found[2] : colors[i % colors.length]!,
                          };
                        });
                        updateLangsCard((c) => ({
                          ...c,
                          useCustomLanguages: false,
                          customLanguages: newLangs,
                        }));
                        toast.success(`Auto-filled ${newLangs.length} languages from your repositories!`);
                      } else {
                        updateLangsCard((c) => ({ ...c, useCustomLanguages: false }));
                        toast.success("Switched to Auto-fill from Repositories");
                      }
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      !useCustomLangs
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Auto-fill from Repositories
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLangsCard((c) => ({ ...c, useCustomLanguages: true }))}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      useCustomLangs
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Custom / Manual
                  </button>
                </div>
              </div>

              {/* Auto-fill from Repositories Mode settings */}
              {!useCustomLangs && (
                <div className="space-y-2 pt-1 border-t border-border/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-md border border-border/60 bg-background/50">
                      <div>
                        <div className="font-medium text-foreground">Include Forked Repositories</div>
                        <div className="text-[10px] text-muted-foreground">Search forks (may cause Camo timeout if large)</div>
                      </div>
                      <Switch
                        checked={p.langsCard?.includeForks ?? false}
                        onCheckedChange={(val) => updateLangsCard((c) => ({ ...c, includeForks: val }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md border border-border/60 bg-background/50">
                      <div>
                        <div className="font-medium text-foreground">Count Private Repos</div>
                        <div className="text-[10px] text-muted-foreground">Include private commits &amp; code</div>
                      </div>
                      <Switch
                        checked={p.langsCard?.countPrivate ?? false}
                        onCheckedChange={(val) => updateLangsCard((c) => ({ ...c, countPrivate: val }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Custom / Manual Languages Editor */}
              {useCustomLangs && (
                <div className="space-y-3 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">Languages Shown in Card:</span>
                  </div>

                  <div className="space-y-2">
                    {customLangsList.map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-border/60 bg-background/60">
                        <div
                          className="h-5 w-5 rounded-full border border-black/20 shrink-0 shadow-sm"
                          style={{ backgroundColor: `#${lang.color.replace(/^#/, "")}` }}
                        />
                        <Input
                          value={lang.name}
                          onChange={(e) => {
                            const updated = [...customLangsList];
                            updated[idx] = { ...updated[idx]!, name: e.target.value };
                            updateLangsCard((c) => ({ ...c, customLanguages: updated }));
                          }}
                          className="h-7 text-xs font-medium w-28 shrink-0"
                          placeholder="Language"
                        />
                        <div className="flex-1 flex items-center gap-2">
                          <Slider
                            min={1}
                            max={100}
                            step={0.5}
                            value={[lang.percent || 1]}
                            onValueChange={(vals) => {
                              const updated = [...customLangsList];
                              updated[idx] = { ...updated[idx]!, percent: vals[0] ?? 1 };
                              updateLangsCard((c) => ({ ...c, customLanguages: updated }));
                            }}
                          />
                          <span className="text-xs font-mono text-muted-foreground w-12 text-right shrink-0">
                            {Number(lang.percent).toFixed(1)}%
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            const updated = customLangsList.filter((_, i) => i !== idx);
                            updateLangsCard((c) => ({ ...c, customLanguages: updated }));
                          }}
                          title="Remove language"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-7 text-xs gap-1"
                      onClick={() => {
                        const newEntry: CustomLanguage = {
                          name: "TypeScript",
                          percent: 10,
                          color: "3178C6",
                        };
                        updateLangsCard((c) => ({
                          ...c,
                          customLanguages: [...customLangsList, newEntry],
                        }));
                      }}
                    >
                      <Plus className="h-3 w-3" />
                      Add Language
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Visualization Layout */}
            <div>
              <label className="text-xs font-medium text-foreground mb-2 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-primary" /> Visualization Layout
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "compact", title: "Horizontal Bar", desc: "Classic multi-colored bar (like screenshot)" },
                  { id: "donut", title: "Donut Chart", desc: "Circular radial distribution" },
                  { id: "pie", title: "Pie Chart", desc: "Full solid circular chart" },
                ].map((layout) => {
                  const active = (p.langsCard?.layout || "compact") === layout.id;
                  return (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() =>
                        updateLangsCard((c) => ({
                          ...c,
                          layout: layout.id as "compact" | "donut" | "pie",
                        }))
                      }
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-background hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="font-semibold text-xs text-foreground">{layout.title}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{layout.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-foreground">Language Count</span>
                  <span className="text-muted-foreground">{p.langsCard?.langsCount ?? 6} languages</span>
                </div>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[p.langsCard?.langsCount ?? 6]}
                  onValueChange={(vals) => {
                    const v = vals[0] ?? 6;
                    updateLangsCard((c) => ({ ...c, langsCount: v }));
                  }}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-foreground">Border Radius</span>
                  <span className="text-muted-foreground">{p.langsCard?.borderRadius ?? 12}px</span>
                </div>
                <Slider
                  min={0}
                  max={25}
                  step={1}
                  value={[p.langsCard?.borderRadius ?? 12]}
                  onValueChange={(vals) => {
                    const v = vals[0] ?? 12;
                    updateLangsCard((c) => ({ ...c, borderRadius: v }));
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. CONTRIBUTION ACTIVITY GRAPH ==================== */}
        {selectedCard === "graph" && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Activity Graph Settings</h4>
                <p className="text-xs text-muted-foreground">
                  GitHub-style 365-day contribution heatmap with months, weekdays, and intensity levels
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Include in README:</span>
                <Switch
                  checked={p.addons.contributionGraph}
                  onCheckedChange={(val) => setAddon("contributionGraph", val)}
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="text-xs font-medium text-foreground mb-1.5 block">
                Custom Heatmap Hex Color (6 digits without #)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g. 216E39"
                  value={p.activityGraph?.color || ""}
                  onChange={(e) => updateActivityGraph((c) => ({ ...c, color: e.target.value }))}
                  className="h-8 text-xs font-mono max-w-[200px]"
                />
                {p.activityGraph?.color && (
                  <div
                    className="h-6 w-6 rounded border border-border shrink-0 shadow-sm"
                    style={{ backgroundColor: `#${p.activityGraph.color.replace(/^#/, "")}` }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. CONTAINER LAYOUT THEME ==================== */}
        {selectedCard === "layout" && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground">README Section Frame Style</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose the visual frame and container theme used when rendering all your active stats cards together in your README.
              </p>
            </div>
            <StatsThemeGallery
              value={p.statsTheme}
              onChange={(id) => onChange((prev) => applyStatsTheme(prev, id))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
