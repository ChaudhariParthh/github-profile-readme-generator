import { describe, expect, it } from "vitest";
import { parseConfig, safeUrl, seedProfile, toMarkdown } from "@/lib/profile";
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
});

describe("moveItem", () => {
  it("moves an item to a new index", () => expect(moveItem(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]));
});
