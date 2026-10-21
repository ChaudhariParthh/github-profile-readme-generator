// Public GitHub REST API (no token). Returns only real data; errors are mapped to friendly messages.
export type GitHubUser = {
  login: string; name: string | null; bio: string | null; location: string | null;
  blog: string | null; twitter_username: string | null; public_repos: number;
};
export type GitHubRepo = { name: string; html_url: string; description: string | null; stargazers_count: number; fork: boolean };

async function gh<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`https://api.github.com${path}`, { headers: { Accept: "application/vnd.github+json" } });
  } catch {
    throw new Error("Couldn't reach GitHub. Check your connection and try again.");
  }
  if (res.status === 404) throw new Error("No GitHub user with that username.");
  if (res.status === 403 || res.status === 429) {
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    const when = reset ? ` Try again after ${new Date(reset * 1000).toLocaleTimeString()}.` : " Try again in a few minutes.";
    throw new Error(`GitHub's hourly limit for anonymous requests was reached.${when}`);
  }
  if (!res.ok) throw new Error(`GitHub returned an error (${res.status}).`);
  return res.json() as Promise<T>;
}

export async function fetchGitHubProfile(username: string) {
  const name = username.trim();
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(name)) throw new Error("That isn't a valid GitHub username.");
  const user = await gh<GitHubUser>(`/users/${encodeURIComponent(name)}`);
  let repos: GitHubRepo[] = [];
  try {
    repos = await gh<GitHubRepo[]>(`/users/${encodeURIComponent(name)}/repos?per_page=100&sort=updated`);
  } catch {
    /* repos are optional; the profile itself still imports */
  }
  const top = repos
    .filter((r) => !r.fork && r.name.toLowerCase() !== name.toLowerCase())
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);
  return { user, top };
}
