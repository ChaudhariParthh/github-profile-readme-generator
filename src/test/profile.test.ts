import { describe, expect, it } from "vitest";
import {
  parseConfig,
  safeUrl,
  seedProfile,
  toMarkdown,
  statsCardUrl,
  langsCardUrl,
  streakCardUrl,
  graphCardUrl,
} from "@/lib/profile";
import { generateLangsCardSvg } from "@/lib/appearance";
import { sanitizeHtml } from "@/lib/sanitize";
import { moveItem } from "@/lib/reorder";
import { createZipBlob } from "@/lib/zip";

describe("safeUrl", () => {
  it("rejects javascript: URLs", () => expect(safeUrl("javascript:alert(1)")).toBe(""));
  it("rejects data: URLs", () => expect(safeUrl("data:text/html,<script>")).toBe(""));
  it("keeps https URLs", () =>
    expect(safeUrl("https://example.com/a")).toBe("https://example.com/a"));
  it("allows browser-prepared image data URLs", () =>
    expect(safeUrl("data:image/jpeg;base64,ZmFrZQ==")).toBe("data:image/jpeg;base64,ZmFrZQ=="));
  it("allows relative assets paths", () => {
    expect(safeUrl("./assets/avatar.png")).toBe("./assets/avatar.png");
    expect(safeUrl("../assets/avatar.png")).toBe("../assets/avatar.png");
  });
});

describe("toMarkdown", () => {
  it("escapes HTML typed into the name", () => {
    const md = toMarkdown({ ...seedProfile, name: "<script>x</script>" });
    expect(md).not.toContain("<script>");
    expect(md).toContain("&lt;script&gt;");
  });
  it("does not include a banner image tag", () => {
    const md = toMarkdown({ ...seedProfile });
    expect(md).not.toContain('alt="banner"');
    expect(md).not.toContain("assets/banner.png");
  });
  it("drops an unsafe avatar URL", () => {
    const md = toMarkdown({ ...seedProfile, avatarUrl: "javascript:alert(1)" });
    expect(md).not.toContain("javascript:");
  });
  it("leaves out hidden sections", () => {
    const sections = seedProfile.sections.map((s) =>
      s.id === "skills" ? { ...s, hidden: true } : s,
    );
    expect(toMarkdown({ ...seedProfile, sections })).not.toContain("Tech Stack");
  });
  it("follows section order", () => {
    const ids = ["socials", "skills"];
    const md = toMarkdown({
      ...seedProfile,
      skills: ["React"],
      socials: { GitHub: "octocat" },
      sections: ids.map((id) => ({ id, hidden: false })),
    });
    expect(md.indexOf("Connect with me")).toBeLessThan(md.indexOf("Tech Stack"));
  });
  it("does not create a malicious support destination", () => {
    const md = toMarkdown({
      ...seedProfile,
      support: { bmc: "javascript:alert(1)", kofi: "", chai: "", sponsors: false },
    });
    expect(md).not.toContain("javascript:");
    expect(md).not.toContain("buymeacoffee.com/javascript");
  });
  it("includes a trusted Buy Me Chai page", () => {
    const md = toMarkdown({
      ...seedProfile,
      support: { bmc: "", kofi: "", chai: "https://www.buymeachai.in/u/dev", sponsors: false },
      sections: seedProfile.sections.map((section) =>
        section.id === "support" ? { ...section, hidden: false } : section,
      ),
    });
    expect(md).toContain("buymeachai.in/u/dev");
  });
});

describe("parseConfig", () => {
  it("rejects prototype pollution and unknown keys", () => {
    const p = parseConfig(JSON.parse('{"name":"X","__proto__":{"polluted":true},"evil":"value"}'));
    expect(Object.prototype.hasOwnProperty.call(p, "evil")).toBe(false);
    expect((Object.prototype as { polluted?: boolean }).polluted).toBeUndefined();
  });
  it("validates handles, fonts, and colors", () => {
    const p = parseConfig({
      name: "X",
      username: "<script>",
      support: { bmc: "https://evil.test", kofi: "", chai: "", sponsors: false },
      typing: { font: "url(javascript:alert(1))", color: "123" },
    });
    expect(p.username).toBe("");
    expect(p.support.bmc).toBe("");
    expect(p.typing.font).toBe(seedProfile.typing.font);
    expect(p.typing.color).toBe("22D3EE");
  });
  it("drops unknown section ids", () => {
    const p = parseConfig({
      name: "X",
      sections: [
        { id: "evil", hidden: false },
        { id: "skills", hidden: false },
      ],
    });
    expect(p.sections.map((s) => s.id)).toEqual(["skills"]);
  });
  it("passes appearanceId through unchanged", () => {
    const p = parseConfig({ name: "X", appearanceId: "not-a-theme" });
    expect(p.appearanceId).toBe("not-a-theme");
  });
});

describe("sanitizeHtml", () => {
  it("removes scripts, SVG, event handlers, and unsafe links", () => {
    const html = sanitizeHtml(
      '<svg><script>alert(1)</script></svg><img src="https://example.com/a" onerror="alert(1)"><a href="javascript:alert(1)">open</a>',
    );
    expect(html).not.toContain("script");
    expect(html).not.toContain("svg");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
    expect(html).toContain('src="https://example.com/a"');
  });
});

describe("reorder", () => {
  it("moves an item from one index to another", () => {
    expect(moveItem(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
    expect(moveItem(["a", "b", "c"], 2, 0)).toEqual(["c", "a", "b"]);
  });
  it("ignores out-of-range indices safely", () => {
    expect(moveItem(["a", "b"], -1, 5)).toEqual(["a", "b"]);
  });
});

describe("GitHub Stats Cards URL generators", () => {
  const testProfile = {
    ...seedProfile,
    username: "octocat",
    statsCard: {
      theme: "radical",
      bgColor: "0a0a0a",
      textColor: "ffffff",
      accentColor: "8B5CF6",
      borderColor: "333333",
      statColorCommits: "58A6FF",
      statColorStars: "3FB950",
      statColorPrs: "D29922",
      statColorIssues: "F85149",
      statColorForks: "A371F7",
      borderRadius: 12,
      showIcons: true,
      hideRank: true,
      includeAllCommits: true,
      countPrivate: false,
      hideMetrics: ["issues", "prs"],
      customTitle: "Octo Stats",
    },
    langsCard: {
      theme: "tokyonight",
      layout: "donut" as const,
      langsCount: 8,
      hideProgress: false,
      borderRadius: 14,
      cardWidth: 450,
      includeForks: true,
      countPrivate: false,
      useCustomLanguages: false,
      customLanguages: [],
    },
    streakCard: {
      theme: "dracula",
      borderRadius: 10,
      mode: "weekly" as const,
      fireColor: "F97316",
      ringColor: "8B5CF6",
    },
    activityGraph: {
      theme: "default",
      color: "22D3EE",
      lineColor: "22D3EE",
      pointColor: "22D3EE",
      area: true,
      radius: 12,
    },
  };

  it("generates classic stats card URL with custom options", () => {
    const url = statsCardUrl(testProfile);
    expect(url).toContain("https://github-stats-extended.vercel.app/api?");
    expect(url).toContain("username=octocat");
    expect(url).toContain("theme=radical");
    expect(url).toContain("show_icons=true");
    expect(url).toContain("hide_rank=true");
    expect(url).toContain("include_all_commits=true");
    expect(url).toContain("hide=issues%2Cprs");
    expect(url).toContain("border_radius=12");
    expect(url).toContain("custom_title=Octo+Stats");
    expect(url).toContain("bg_color=0a0a0a");
    expect(url).toContain("border_color=333333");
  });

  it("generates top languages card URL with donut layout and language count", () => {
    const url = langsCardUrl(testProfile);
    expect(url).toContain("https://github-stats-extended.vercel.app/api/top-langs?");
    expect(url).toContain("username=octocat");
    expect(url).toContain("layout=donut");
    expect(url).toContain("langs_count=8");
    expect(url).toContain("theme=tokyonight");
    expect(url).toContain("border_radius=14");
    expect(url).toContain("card_width=450");
  });

  it("supports switching API providers between extended, official and custom instances", () => {
    const officialProfile = {
      ...testProfile,
      statsCard: { ...testProfile.statsCard, apiProvider: "official" as const },
      langsCard: { ...testProfile.langsCard, apiProvider: "official" as const },
    };
    expect(statsCardUrl(officialProfile)).toContain("https://github-readme-stats.vercel.app/api?");
    expect(langsCardUrl(officialProfile)).toContain(
      "https://github-readme-stats.vercel.app/api/top-langs?",
    );

    const customProfile = {
      ...testProfile,
      statsCard: {
        ...testProfile.statsCard,
        apiProvider: "custom" as const,
        customApiUrl: "https://my-stats.vercel.app",
      },
      langsCard: {
        ...testProfile.langsCard,
        apiProvider: "custom" as const,
        customApiUrl: "https://my-stats.vercel.app",
      },
    };
    expect(statsCardUrl(customProfile)).toContain("https://my-stats.vercel.app/api?");
    expect(langsCardUrl(customProfile)).toContain("https://my-stats.vercel.app/api/top-langs?");
  });

  it("generates contribution streak card URL with weekly mode and custom fire color", () => {
    const url = streakCardUrl(testProfile);
    expect(url).toContain("https://streak-stats.demolab.com/?");
    expect(url).toContain("user=octocat");
    expect(url).toContain("theme=dracula");
    expect(url).toContain("mode=weekly");
    expect(url).toContain("fire=F97316");
    expect(url).toContain("ring=8B5CF6");
    expect(url).toContain("border_radius=10");
  });

  it("generates contribution activity graph heatmap URL with chosen accent", () => {
    const url = graphCardUrl(testProfile);
    expect(url).toBe("https://ghchart.rshah.org/22D3EE/octocat");
  });

  it("parses and validates custom stats configuration safely", () => {
    const parsed = parseConfig({
      name: "Parth",
      username: "parth",
      statsCard: {
        theme: "synthwave",
        borderRadius: 16,
        showIcons: false,
        hideRank: true,
        hideMetrics: ["issues", "<script>", "invalid metric name!"],
      },
      langsCard: {
        theme: "gruvbox",
        layout: "pie",
        langsCount: 20, // Should be clamped to 10
      },
      streakCard: {
        mode: "weekly",
        fireColor: "#FF5500",
      },
      activityGraph: {
        color: "4ADE80",
      },
    });

    expect(parsed.statsCard.theme).toBe("synthwave");
    expect(parsed.statsCard.borderRadius).toBe(16);
    expect(parsed.statsCard.showIcons).toBe(false);
    expect(parsed.statsCard.hideRank).toBe(true);
    expect(parsed.statsCard.hideMetrics).toEqual(["issues"]);
    expect(parsed.langsCard.layout).toBe("pie");
    expect(parsed.langsCard.langsCount).toBe(10);
    expect(parsed.streakCard.mode).toBe("weekly");
    expect(parsed.streakCard.fireColor).toBe("FF5500");
    expect(parsed.activityGraph.color).toBe("4ADE80");
  });

  it("renders custom stats card settings in Markdown export", () => {
    const md = toMarkdown({
      ...testProfile,
      sections: [{ id: "stats", hidden: false }],
    });
    expect(md).toContain("## GitHub Stats");
    expect(md).toContain(
      "https://github-stats-extended.vercel.app/api?username=octocat&show_icons=true&theme=radical",
    );
    expect(md).toContain(
      "https://github-stats-extended.vercel.app/api/top-langs?username=octocat&layout=donut&langs_count=8&include_forks=true&theme=tokyonight",
    );
    expect(md).toContain("https://streak-stats.demolab.com/?user=octocat&theme=dracula");
    expect(md).toContain("https://ghchart.rshah.org/22D3EE/octocat");
  });

  it("renders real language percentages from fetched profile data instead of equal shares", async () => {
    const profileWithRealLangs = {
      ...seedProfile,
      githubStats: {
        repos: [],
        languages: ["TypeScript", "Python"],
        languageStats: [
          { name: "TypeScript", percent: 78.45, color: "3178C6" },
          { name: "Python", percent: 21.55, color: "3572A5" },
        ],
        totalStars: 10,
        totalForks: 2,
        followers: 5,
        following: 3,
        publicRepos: 4,
        warning: null,
      },
    };

    const svg = generateLangsCardSvg(profileWithRealLangs);
    expect(svg).toContain("TypeScript");
    expect(svg).toContain("78.45%");
    expect(svg).toContain("Python");
    expect(svg).toContain("21.55%");
    expect(svg).not.toContain("50.00%");
  });

  it("creates a valid ZIP blob with README.md", () => {
    const blob = createZipBlob([{ name: "README.md", data: "# Readme" }]);
    expect(blob.type).toBe("application/zip");
    expect(blob.size).toBeGreaterThan(100);
  });
});
