import { useState } from "react";
import { Check, GripVertical, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SKILL_CATEGORIES, skillIconUrl } from "@/lib/profile";
import { moveItem } from "@/lib/reorder";

export function SkillPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [drag, setDrag] = useState<number | null>(null);
  const q = query.trim().toLowerCase();
  const pool = (cat === "All" ? Object.values(SKILL_CATEGORIES).flat() : SKILL_CATEGORIES[cat] ?? [])
    .filter(([n], i, arr) => arr.findIndex((x) => x[0] === n) === i)
    .filter(([n]) => !q || n.toLowerCase().includes(q));
  const toggle = (n: string) => onChange(value.includes(n) ? value.filter((x) => x !== n) : [...value, n]);

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Selected · drag to reorder</p>
          <div className="flex flex-wrap gap-1.5">
            {value.map((n, i) => (
              <div
                key={n}
                draggable
                onDragStart={() => setDrag(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (drag !== null) onChange(moveItem(value, drag, i)); setDrag(null); }}
                className={`flex cursor-grab items-center gap-1 rounded-md border border-primary/40 bg-primary/10 py-1 pl-1 pr-1.5 text-xs ${drag === i ? "opacity-40" : ""}`}
              >
                <GripVertical className="h-3 w-3 text-muted-foreground" />
                <img src={skillIconUrl(n)} alt="" className="h-4 w-4" loading="lazy" />
                <span className="font-mono">{n}</span>
                <button aria-label={`Remove ${n}`} onClick={() => toggle(n)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {["All", ...Object.keys(SKILL_CATEGORIES)].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-md px-2.5 py-1 text-xs ${cat === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search technologies…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="grid max-h-[360px] grid-cols-3 gap-2 overflow-auto pr-1 sm:grid-cols-4 md:grid-cols-5">
        {pool.map(([n]) => {
          const on = value.includes(n);
          return (
            <button
              key={n}
              onClick={() => toggle(n)}
              aria-pressed={on}
              className={`relative flex flex-col items-center gap-1.5 rounded-lg border p-2.5 text-[11px] transition-colors ${on ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground/40"}`}
            >
              {on && <Check className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full bg-primary p-0.5 text-primary-foreground" />}
              <img
                src={skillIconUrl(n)}
                alt=""
                className="h-7 w-7"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
              <span className="line-clamp-1">{n}</span>
            </button>
          );
        })}
        {!pool.length && <p className="col-span-full py-6 text-center text-sm text-muted-foreground">No technologies match "{query}".</p>}
      </div>
    </div>
  );
}
