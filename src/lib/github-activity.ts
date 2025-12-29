import { formatRelativeTime, fetchWithTimeout } from "@/lib/telemetry/shared";

export interface GitHubActivityResponse {
  username: string;
  commitsLast7Days: number;
  commitsLast30Days: number;
  lastCommitAtISO: string | null;
  lastCommitRelative: string | null;
  topLanguages: Array<{ name: string; bytes: number }>;
  topLanguagesText: string;
  fetchedAtISO: string;
  isPartial: boolean;
  partialReason?: string;
}

export interface GitHubTelemetry {
  items: Array<{
    text: string;
    repoShort: string;
    repoFull: string;
    url: string;
    hash?: string;
    whenISO: string;
    whenRelative: string;
  }>;
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      c7?: { totalCommitContributions: number };
      c30?: { totalCommitContributions: number };
      repositories?: {
        nodes?: Array<{
          nameWithOwner: string;
          pushedAt: string | null;
          languages?: {
            edges?: Array<{ size: number; node?: { name: string } | null }>;
          };
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string }>;
    head?: string;
    pull_request?: { title: string; html_url: string; number: number };
    release?: { name: string; tag_name: string; html_url: string };
  };
}

let cachedActivity: { data: GitHubActivityResponse; fetchedAt: number } | null =
  null;
const CACHE_WINDOW_MS = 5 * 60 * 1000;

export async function getGitHubActivity(): Promise<GitHubActivityResponse> {
  const now = Date.now();
  if (cachedActivity && now - cachedActivity.fetchedAt < CACHE_WINDOW_MS) {
    return cachedActivity.data;
  }

  const username = process.env.GITHUB_USERNAME || "MathanKA";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    const partial = {
      username,
      commitsLast7Days: 0,
      commitsLast30Days: 0,
      lastCommitAtISO: null,
      lastCommitRelative: null,
      topLanguages: [],
      topLanguagesText: "",
      fetchedAtISO: new Date().toISOString(),
      isPartial: true,
      partialReason: "Missing GITHUB_TOKEN"
    } satisfies GitHubActivityResponse;
    cachedActivity = { data: partial, fetchedAt: now };
    return partial;
  }

  const to = new Date();
  const from7 = new Date();
  from7.setDate(to.getDate() - 7);
  const from30 = new Date();
  from30.setDate(to.getDate() - 30);

  const query = `
    query($login: String!, $from7: DateTime!, $from30: DateTime!, $to: DateTime!) {
      user(login: $login) {
        c7: contributionsCollection(from: $from7, to: $to) { totalCommitContributions }
        c30: contributionsCollection(from: $from30, to: $to) { totalCommitContributions }
        repositories(
          first: 50,
          ownerAffiliations: OWNER,
          isFork: false,
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            nameWithOwner
            pushedAt
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name } }
            }
          }
        }
      }
    }
  `;

  const body = JSON.stringify({
    query,
    variables: {
      login: username,
      from7: from7.toISOString(),
      from30: from30.toISOString(),
      to: to.toISOString()
    }
  });

  const fetchCommitCount = async (since: Date) => {
    try {
      const date = since.toISOString().split("T")[0];

      const q = `author:${username} committer-date:>=${date}`;
      const url = `https://api.github.com/search/commits?q=${encodeURIComponent(q)}&per_page=1`;

      const res = await fetchWithTimeout(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.cloak-preview+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "mathan.pro"
        },
        timeout: 10000,
        next: { revalidate: 0 }
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Commit search HTTP ${res.status} ${text}`);
      }

      const json = (await res.json()) as { total_count?: number };
      return typeof json.total_count === "number" ? json.total_count : 0;
    } catch (error) {
      console.warn(
        `[Telemetry] Commit search handled: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return 0;
    }
  };

  try {
    const res = await fetchWithTimeout("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body,
      timeout: 10000,
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      throw new Error(`GitHub GraphQL ${res.status}`);
    }

    const json = (await res.json()) as GitHubGraphQLResponse;
    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join("; "));
    }
    const user = json.data?.user;
    if (!user) {
      throw new Error("GitHub user not found");
    }
    const [search7, search30] = await Promise.all([
      fetchCommitCount(from7),
      fetchCommitCount(from30)
    ]);

    const commitsLast7Days = search7 || user.c7?.totalCommitContributions || 0;
    const commitsLast30Days =
      search30 || user.c30?.totalCommitContributions || 0;
    const repos = user.repositories?.nodes || [];

    const languageTotals: Record<string, number> = {};
    let latestPush: string | null = null;

    for (const repo of repos) {
      if (repo.pushedAt) {
        if (!latestPush || new Date(repo.pushedAt) > new Date(latestPush)) {
          latestPush = repo.pushedAt;
        }
      }
      const edges = repo.languages?.edges || [];
      for (const edge of edges) {
        if (!edge?.node?.name || typeof edge.size !== "number") continue;
        languageTotals[edge.node.name] =
          (languageTotals[edge.node.name] || 0) + edge.size;
      }
    }

    const topLanguages = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, bytes]) => ({ name, bytes }));

    const lastCommitRelative = latestPush
      ? formatRelativeTime(latestPush)
      : null;
    const topLanguagesText = topLanguages.map((lang) => lang.name).join(", ");

    const data: GitHubActivityResponse = {
      username,
      commitsLast7Days,
      commitsLast30Days,
      lastCommitAtISO: latestPush,
      lastCommitRelative,
      topLanguages,
      topLanguagesText,
      fetchedAtISO: new Date().toISOString(),
      isPartial: false
    };

    cachedActivity = { data, fetchedAt: now };
    return data;
  } catch (error: unknown) {
    console.warn(
      `[Telemetry] GitHub activity fetch handled: ${error instanceof Error ? error.message : String(error)}`
    );
    const partial: GitHubActivityResponse = {
      username,
      commitsLast7Days: 0,
      commitsLast30Days: 0,
      lastCommitAtISO: null,
      lastCommitRelative: null,
      topLanguages: [],
      topLanguagesText: "",
      fetchedAtISO: new Date().toISOString(),
      isPartial: true,
      partialReason: "GitHub API unavailable"
    };
    cachedActivity = { data: partial, fetchedAt: now };
    return partial;
  }
}

export async function fetchGitHubEvents(
  username: string
): Promise<GitHubTelemetry> {
  const fallback: GitHubTelemetry = { items: [] };
  if (!username) return fallback;
  try {
    const res = await fetchWithTimeout(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      {
        timeout: 8000,
        next: { revalidate: 3600 },
        headers: process.env.GITHUB_TOKEN
          ? {
              Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
          : {}
      }
    );
    if (!res.ok) return fallback;
    const data = (await res.json()) as GitHubEvent[];
    if (!Array.isArray(data)) return fallback;
    const items = data
      .filter((event) =>
        ["PushEvent", "PullRequestEvent", "ReleaseEvent"].includes(event.type)
      )
      .slice(0, 2)
      .map((event) => {
        let text = "";
        let url = "";
        let hash = "";
        if (event.type === "PushEvent") {
          text =
            event.payload.commits?.[0]?.message ||
            "Pushed to " + event.repo.name;
          url = `https://github.com/${event.repo.name}/commit/${event.payload.head}`;
          hash = event.payload.head?.substring(0, 7) || "";
        } else if (event.type === "PullRequestEvent") {
          text =
            event.payload.pull_request?.title ||
            "Pull request in " + event.repo.name;
          url = event.payload.pull_request?.html_url || "";
          hash = `#${event.payload.pull_request?.number}`;
        } else if (event.type === "ReleaseEvent") {
          text =
            event.payload.release?.name ||
            event.payload.release?.tag_name ||
            "Released in " + event.repo.name;
          url = event.payload.release?.html_url || "";
        }
        const relative = formatRelativeTime(event.created_at);
        return {
          text,
          repoShort: event.repo.name.split("/")[1],
          repoFull: event.repo.name,
          url,
          hash,
          whenISO: event.created_at,
          whenRelative: relative ? `~ ${relative}` : ""
        };
      });
    return { items };
  } catch (error: unknown) {
    console.warn(
      `[Telemetry] GitHub events fetch handled: ${error instanceof Error ? error.message : String(error)}`
    );
    return fallback;
  }
}
