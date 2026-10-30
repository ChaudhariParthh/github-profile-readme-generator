import {
  BACKGROUND_THEMES,
  STATS_THEMES,
  DEFAULT_STATS_THEME_ID,
  type AppearanceTheme,
  type StatsTheme,
} from "@/lib/appearance";

export function BackgroundGallery({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">
          10 Background Themes{" "}
          <span className="font-normal text-muted-foreground">
            Beautiful, unique banners for your GitHub profile README.
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {BACKGROUND_THEMES.map((t) => (
          <ThemeCard key={t.id} theme={t} active={value === t.id} onSelect={() => onChange(t.id)} />
        ))}
      </div>
    </section>
  );
}

function ThemeCard({
  theme,
  active,
  onSelect,
}: {
  theme: AppearanceTheme;
  active: boolean;
  onSelect: () => void;
}) {
  const isLight = theme.id === "editorial-light";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`overflow-hidden rounded-xl border text-left transition-all duration-200 ${
        active
          ? "border-primary ring-2 ring-primary/40 shadow-md scale-[1.01]"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="relative h-24 w-full overflow-hidden">
        <img
          src={theme.bannerUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute left-2.5 top-2 font-mono text-[10px] font-bold tracking-wider ${
            isLight
              ? "text-stone-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
              : "text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          }`}
        >
          {theme.n}
        </span>
        <span className="absolute bottom-2 right-2.5 flex gap-1">
          {theme.palette.map((c) => (
            <span
              key={c}
              className={`h-2.5 w-2.5 rounded-full ${
                isLight ? "border border-black/20" : "border border-white/40 shadow-sm"
              }`}
              style={{ background: c }}
            />
          ))}
        </span>
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="text-xs font-semibold">{theme.name}</p>
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{theme.blurb}</p>
      </div>
    </button>
  );
}

/** Gallery for the 8 GitHub stats themes. */
export function StatsThemeGallery({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">
          8 Stats Themes{" "}
          <span className="font-normal text-muted-foreground">
            Distinct layouts for your GitHub stats cards.
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS_THEMES.map((t) => (
          <StatsThemeCard key={t.id} theme={t} active={value === t.id} onSelect={() => onChange(t.id)} />
        ))}
      </div>
    </section>
  );
}

function StatsThemeCard({
  theme,
  active,
  onSelect,
}: {
  theme: StatsTheme;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`overflow-hidden rounded-xl border text-left transition-all duration-200 ${
        active
          ? "border-primary ring-2 ring-primary/40 shadow-md scale-[1.01]"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="relative h-24 w-full overflow-hidden">
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background: `linear-gradient(135deg, #${theme.accent}44, #${theme.accent}11)`,
          }}
        >
          <span
            className="absolute left-2.5 top-2 font-mono text-[10px] font-bold tracking-wider text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            {theme.n}
          </span>
          <span className="absolute bottom-2 right-2.5 flex gap-1">
            <span
              className={`h-2.5 w-2.5 rounded-full border border-white/40 shadow-sm`}
              style={{ background: `#${theme.accent}` }}
            />
          </span>
        </div>
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="text-xs font-semibold">{theme.name}</p>
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">{theme.description}</p>
      </div>
    </button>
  );
}
