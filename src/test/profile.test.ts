import { describe, expect, it } from "vitest";
import { bmcUrl, parseConfig, PRESETS, safeUrl, seedProfile, statsFallbackUrl, toMarkdown } from "@/lib/profile";
import { applyAppearance, applyStatsLayout, BACKGROUND_THEMES, STATS_LAYOUTS } from "@/lib/appearance";
import { moveItem } from "@/lib/reorder";

describe("safeUrl", () => {
  it("rejects javascript: URLs", () => expect(safeUrl("javascript:alert(1)")).toBe(""));
  it("rejects data: URLs", () => expect(safeUrl("data:text/html,<script>")).toBe(""));
  it("keeps https URLs", () => expect(safeUrl("https://example.com/a")).toBe("https://example.com/a"));
});

describe("toMarkdown", () => {
  it("escapes HTML typed into the name", () => {
    const md = toMarkdown({ ...seedProfile, name: "<script>x</script>" });
    expect(md).not.toContain("<script>");
    expect(md).toContain("&lt;script&gt;");
  });
  it("drops an unsafe banner URL", () => {
    const md = toMarkdown({ ...seedProfile, bannerUrl: "javascript:alert(1)" });
    expect(md).not.toContain("javascript:");
  });
  it("leaves out hidden sections", () => {
    const sections = seedProfile.sections.map((s) => (s.id === "skills" ? { ...s, hidden: true } : s));
    expect(toMarkdown({ ...seedProfile, sections })).not.toContain("Tech Stack");
  });
  it("follows section order", () => {
    const ids = ["socials", "skills"];
    const md = toMarkdown({ ...seedProfile, sections: ids.map((id) => ({ id, hidden: false })) });
    expect(md.indexOf("Connect with me")).toBeLessThan(md.indexOf("Tech Stack"));
  });
  it("URL-encodes the username in widget links", () => {
    expect(toMarkdown({ ...seedProfile, username: "a b" })).toContain("username=a%20b");
  });
});

describe("parseConfig", () => {
  it("drops unknown section ids", () => {
    const p = parseConfig({ name: "X", sections: [{ id: "evil", hidden: false }, { id: "skills", hidden: false }] });
    expect(p.sections.map((s) => s.id)).toEqual(["skills"]);
  });
  it("falls back to seed appearance and stats layout", () => {
    const p = parseConfig({ name: "X", appearanceId: "not-a-theme", statsLayout: "nope" });
    expect(p.appearanceId).toBe(seedProfile.appearanceId);
    expect(p.statsLayout).toBe(seedProfile.statsLayout);
  });
});

describe("appearance and stats layouts", () => {
  it("ships exactly 10 background themes and 10 stats layouts", () => {
    expect(BACKGROUND_THEMES).toHaveLength(10);
    expect(STATS_LAYOUTS).toHaveLength(10);
    expect(new Set(BACKGROUND_THEMES.map((t) => t.id)).size).toBe(10);
    expect(new Set(STATS_LAYOUTS.map((t) => t.id)).size).toBe(10);
  });
  it("applies a background theme without resetting profile content", () => {
    const next = applyAppearance({ ...seedProfile, name: "Ada", skills: ["Rust"] }, "neon-cyber");
    expect(next.name).toBe("Ada");
    expect(next.skills).toEqual(["Rust"]);
    expect(next.appearanceId).toBe("neon-cyber");
    expect(next.bannerUrl).toBe(BACKGROUND_THEMES.find((t) => t.id === "neon-cyber")?.bannerUrl);
    expect(toMarkdown({ ...next, showBanner: true })).toContain(next.bannerUrl);
  });
  it("emits a distinct stats heading/layout per design", () => {
    const headings = STATS_LAYOUTS.map((layout) => {
      const md = toMarkdown(applyStatsLayout(seedProfile, layout.id));
      expect(md).toMatch(/github-readme-stats|img\.shields\.io|streak-stats|activity-graph/);
      return md;
    });
    expect(new Set(headings).size).toBe(10);
  });
  it("keeps stats visibility toggles", () => {
    const md = toMarkdown({ ...seedProfile, addons: { ...seedProfile.addons, stats: false, langs: false, streak: false } });
    expect(md).not.toContain("github-readme-stats.vercel.app/api?");
  });
});

describe("moveItem", () => {
  it("moves an item to a new index", () => expect(moveItem(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]));
});

describe("phase 1 correctness", () => {
  it("banner is off by default", () => {
    expect(seedProfile.showBanner).toBe(false);
    expect(toMarkdown(seedProfile)).not.toContain('alt="banner"');
  });
  it("banner toggle updates Markdown", () => {
    expect(toMarkdown({ ...seedProfile, showBanner: true })).toContain('alt="banner"');
  });
  it("each preset resolves by name for ?preset=", () => {
    expect(Object.keys(PRESETS)).toEqual(["Minimal", "Professional", "Animated Developer", "AI Engineer", "Cybersecurity", "Student Portfolio"]);
    expect(PRESETS["Cybersecurity"]!.title).toBe("Security Engineer");
  });
  it("stats widget has a fallback mirror", () => {
    expect(statsFallbackUrl("https://github-readme-stats.vercel.app/api?username=a")).toBe("https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=a");
    expect(statsFallbackUrl("https://example.com/x")).toBe("");
  });
  it("preserves a valid Buy Me a Coffee URL and rejects other hosts", () => {
    expect(bmcUrl("https://www.buymeacoffee.com/parth")).toBe("https://www.buymeacoffee.com/parth");
    expect(toMarkdown({ ...seedProfile, sections: [{ id: "support", hidden: false }], support: { ...seedProfile.support, bmc: "https://www.buymeacoffee.com/parth" } })).toContain('href="https://www.buymeacoffee.com/parth"');
    expect(bmcUrl("https://evil.com/parth")).toBe("");
    expect(bmcUrl("parth")).toBe("https://buymeacoffee.com/parth");
  });
  it("ships no Unsplash banners", () => {
    expect(BACKGROUND_THEMES.some((t) => t.bannerUrl.includes("unsplash"))).toBe(false);
  });
});
