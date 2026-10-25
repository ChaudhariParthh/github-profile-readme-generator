import { describe, expect, it } from "vitest";
import { parseConfig, safeUrl, seedProfile, toMarkdown } from "@/lib/profile";
import {
  applyAppearance,
  applyStatsLayout,
  BACKGROUND_THEMES,
  STATS_LAYOUTS,
} from "@/lib/appearance";
import { sanitizeHtml } from "@/lib/sanitize";
import { moveItem } from "@/lib/reorder";

describe("safeUrl", () => {
  it("rejects javascript: URLs", () => expect(safeUrl("javascript:alert(1)")).toBe(""));
  it("rejects data: URLs", () => expect(safeUrl("data:text/html,<script>")).toBe(""));
  it("keeps https URLs", () =>
    expect(safeUrl("https://example.com/a")).toBe("https://example.com/a"));
});

describe("toMarkdown", () => {
  it("escapes HTML typed into the name", () => {
    const md = toMarkdown({ ...seedProfile, name: "<script>x</script>" });
    expect(md).not.toContain("<script>");
    expect(md).toContain("&lt;script&gt;");
  });
  it("includes a custom image URL as the banner", () => {
    const md = toMarkdown({
      ...seedProfile,
      bannerUrl: "https://images.example.com/banner.jpg",
      customBanner: true,
    });
    expect(md).toContain(
      '<img src="https://images.example.com/banner.jpg" alt="banner" width="100%" />',
    );
  });
  it("drops an unsafe banner URL", () => {
    const md = toMarkdown({ ...seedProfile, bannerUrl: "javascript:alert(1)" });
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
    const md = toMarkdown({ ...seedProfile, skills: ["React"], socials: { GitHub: "octocat" }, sections: ids.map((id) => ({ id, hidden: false })) });
    expect(md.indexOf("Connect with me")).toBeLessThan(md.indexOf("Tech Stack"));
  });
  it("URL-encodes the username in widget links", () => {
    expect(toMarkdown({ ...seedProfile, username: "a b" })).toContain("username=a%20b");
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
  it("falls back to seed appearance and stats layout", () => {
    const p = parseConfig({ name: "X", appearanceId: "not-a-theme", statsLayout: "nope" });
    expect(p.appearanceId).toBe(seedProfile.appearanceId);
    expect(p.statsLayout).toBe(seedProfile.statsLayout);
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

describe("appearance and stats layouts", () => {
  it("ships exactly 10 background themes and 10 stats layouts", () => {
    expect(BACKGROUND_THEMES).toHaveLength(10);
    expect(STATS_LAYOUTS).toHaveLength(15);
    expect(new Set(BACKGROUND_THEMES.map((t) => t.id)).size).toBe(10);
    expect(new Set(STATS_LAYOUTS.map((t) => t.id)).size).toBe(15);
  });
  it("applies a background theme without resetting profile content", () => {
    const next = applyAppearance({ ...seedProfile, name: "Ada", skills: ["Rust"] }, "neon-cyber");
    expect(next.name).toBe("Ada");
    expect(next.skills).toEqual(["Rust"]);
    expect(next.appearanceId).toBe("neon-cyber");
    expect(next.bannerUrl).toBe(BACKGROUND_THEMES.find((t) => t.id === "neon-cyber")?.bannerUrl);
    expect(toMarkdown(next)).toContain(next.bannerUrl);
  });
  it("emits a distinct stats heading/layout per design", () => {
    const headings = STATS_LAYOUTS.map((layout) => {
      const md = toMarkdown(applyStatsLayout(seedProfile, layout.id));
      expect(md).toMatch(/github-readme-stats|img\.shields\.io|streak-stats|activity-graph/);
      return md;
    });
    expect(new Set(headings).size).toBe(15);
  });
  it("keeps stats visibility toggles", () => {
    const md = toMarkdown({
      ...seedProfile,
      addons: { ...seedProfile.addons, stats: false, langs: false, streak: false },
    });
    expect(md).not.toContain("github-readme-stats.vercel.app/api?");
  });
});

describe("moveItem", () => {
  it("moves an item to a new index", () =>
    expect(moveItem(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]));
});

describe("new visitor profile", () => {
  it("starts with blank profile fields", () => {
    expect([seedProfile.name, seedProfile.username, seedProfile.title, seedProfile.location, seedProfile.bio]).toEqual(["", "", "", "", ""]);
    expect(seedProfile.skills).toEqual([]);
    expect(seedProfile.socials).toEqual({});
    expect(Object.values(seedProfile.work).every((v) => v === "")).toBe(true);
  });
});
