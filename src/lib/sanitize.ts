import { safeUrl } from "@/lib/profile";

const ALLOWED_TAGS = new Set(["H1", "H2", "H3", "P", "IMG", "A", "B", "STRONG", "EM", "I", "UL", "OL", "LI", "BR", "CODE", "PRE", "DIV", "SPAN", "PICTURE", "SOURCE"]);
const DROP_WITH_CONTENT = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "NOSCRIPT", "TEMPLATE", "SVG", "MATH", "FORM"]);
const ALLOWED_ATTRS = new Set(["align", "alt", "title", "width", "height", "src", "href", "srcset", "media"]);

/** Browser-only allow-list sanitizer: keeps GitHub-README-safe tags, strips every event handler and unsafe URL. */
export function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild as HTMLElement;
  const walk = (el: Element) => {
    for (const child of Array.from(el.children)) {
      if (DROP_WITH_CONTENT.has(child.tagName)) { child.remove(); continue; }
      if (!ALLOWED_TAGS.has(child.tagName)) {
        child.replaceWith(doc.createTextNode(child.textContent ?? ""));
        continue;
      }
      for (const a of Array.from(child.attributes)) {
        const name = a.name.toLowerCase();
        if (!ALLOWED_ATTRS.has(name)) { child.removeAttribute(a.name); continue; }
        if (name === "src" || name === "href" || name === "srcset") {
          const ok = safeUrl(a.value);
          if (!ok || (name !== "href" && ok.startsWith("mailto:"))) child.removeAttribute(a.name);
          else child.setAttribute(a.name, ok);
        }
      }
      if (child.tagName === "A") { child.setAttribute("target", "_blank"); child.setAttribute("rel", "noopener noreferrer nofollow"); }
      if (child.tagName === "IMG") { child.setAttribute("loading", "lazy"); child.setAttribute("referrerpolicy", "no-referrer"); }
      walk(child);
    }
  };
  walk(root);
  return root.innerHTML;
}
