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
  fork: boolean;
  language: string | null;
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
  const languageCounts = new Map<string, number>();
  for (const repo of owned) {
    if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }
  const languages = [...languageCounts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([language]) => language);

  return { user, repos, top, languages, warning };
}
