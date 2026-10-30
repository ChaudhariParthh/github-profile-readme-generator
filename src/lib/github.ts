// Public GitHub REST API only. No access token is sent or stored.
export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  size?: number;
};

export type LanguageStat = {
  name: string;
  count: number;
  percent: number;
  color: string;
};

export const GITHUB_LANG_COLORS: Record<string, string> = {
  JavaScript: "F1E05A",
  TypeScript: "3178C6",
  Python: "3572A5",
  Java: "B07219",
  HTML: "E34C26",
  CSS: "563D7C",
  "C++": "F34B7D",
  C: "555555",
  "C#": "178600",
  PHP: "4F5D95",
  Go: "00ADD8",
  Rust: "DEA584",
  Ruby: "701516",
  Kotlin: "A97BFF",
  Swift: "F05138",
  Dart: "00B4AB",
  Shell: "89E051",
  Bash: "89E051",
  Vue: "41B883",
  Svelte: "FF3E00",
  SCSS: "C6538C",
  R: "198CE7",
  Lua: "000080",
  Dockerfile: "384D54",
  Markdown: "083FA1",
  "Jupyter Notebook": "DA5B0B",
};

const CACHE_PREFIX = "gps-github-public:v1:";
const CACHE_TTL_MS = 10 * 60 * 1000;
const inFlight = new Map<string, Promise<unknown>>();

function readCache<T>(path: string): T | undefined {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + path);
    if (!raw) return;
    const entry = JSON.parse(raw) as { expiresAt?: number; value?: T };
    if (!entry.expiresAt || entry.expiresAt <= Date.now() || !("value" in entry)) {
      sessionStorage.removeItem(CACHE_PREFIX + path);
      return;
    }
    return entry.value;
  } catch {
    // Browser storage is optional; in-memory request sharing still applies.
    return;
  }
}

function writeCache(path: string, value: unknown) {
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + path,
      JSON.stringify({ expiresAt: Date.now() + CACHE_TTL_MS, value }),
    );
  } catch {
    // Private browsing and storage limits must not prevent importing a profile.
  }
}

async function gh<T>(path: string): Promise<T> {
  const cached = readCache<T>(path);
  if (cached !== undefined) return cached;

  const existing = inFlight.get(path);
  if (existing) return existing as Promise<T>;

  const request = (async () => {
    let res: Response;
    try {
      res = await fetch(`https://api.github.com${path}`, {
        headers: { Accept: "application/vnd.github+json" },
      });
    } catch {
      throw new Error("Couldn't reach GitHub. Check your connection and try again.");
    }
    if (res.status === 404) throw new Error("No GitHub user with that username.");
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get("x-ratelimit-reset"));
      const retryAfter = Number(res.headers.get("retry-after"));
      const when = reset
        ? ` Try again after ${new Date(reset * 1000).toLocaleTimeString()}.`
        : retryAfter
          ? ` Try again in about ${retryAfter} seconds.`
          : " Try again in a few minutes.";
      throw new Error(`GitHub's anonymous API rate limit was reached.${when}`);
    }
    if (!res.ok) throw new Error(`GitHub returned an error (${res.status}).`);
    const value = (await res.json()) as T;
    writeCache(path, value);
    return value;
  })();
  inFlight.set(path, request);
  try {
    return await request;
  } finally {
    inFlight.delete(path);
  }
}

export async function fetchGitHubProfile(username: string) {
  const name = username.trim();
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(name))
    throw new Error("That isn't a valid GitHub username.");
  const encoded = encodeURIComponent(name);
  const user = await gh<GitHubUser>(`/users/${encoded}`);

  let repos: GitHubRepo[];
  let warning: string | null = null;
  try {
    repos = await gh<GitHubRepo[]>(`/users/${encoded}/repos?per_page=100&sort=updated`);
  } catch (error) {
    repos = [];
    warning =
      error instanceof Error
        ? error.message
        : "GitHub couldn't return repositories right now. Try again later.";
  }

  const owned = repos.filter((repo) => !repo.fork && repo.name.toLowerCase() !== name.toLowerCase());
  const top = [...owned].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4);

  // Compute real language percentages based on actual repo sizes / code frequency
  const targetRepos = owned.length > 0 ? owned : repos;
  const langMap = new Map<string, { count: number; weight: number }>();
  let totalWeight = 0;

  for (const repo of targetRepos) {
    if (repo.language) {
      // Use repo.size (KB) if available, with a reasonable floor so small repos count
      const weight = Math.max(repo.size || 50, 10);
      const existing = langMap.get(repo.language) || { count: 0, weight: 0 };
      existing.count += 1;
      existing.weight += weight;
      langMap.set(repo.language, existing);
      totalWeight += weight;
    }
  }

  const sortedLangs = [...langMap.entries()].sort((a, b) => b[1].weight - a[1].weight);
  const languages = sortedLangs.map(([lang]) => lang);

  const languageStats: LanguageStat[] = sortedLangs.map(([langName, data]) => ({
    name: langName,
    count: data.count,
    percent: totalWeight > 0 ? Number(((data.weight / totalWeight) * 100).toFixed(2)) : 0,
    color: GITHUB_LANG_COLORS[langName] || "58A6FF",
  }));

  return {
    user,
    repos,
    top,
    languages,
    languageStats,
    warning,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
  };
}
