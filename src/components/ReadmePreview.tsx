import { BookOpen } from "lucide-react";
import {
  SOCIAL_META,
  langsUrl,
  socialBadgeUrl,
  statsUrl,
  streakUrl,
  techBadgeUrl,
  type Profile,
} from "@/lib/profile";

export function ReadmePreview({ p, compact = false }: { p: Profile; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
        <BookOpen className="h-4 w-4" />
        {p.username || "username"} / README.md
      </div>
      <article className={compact ? "space-y-4 p-5" : "space-y-6 p-6 md:p-8"}>
        <header className="text-center">
          <h1 className={`${compact ? "text-xl" : "text-3xl"} font-bold`}>Hi 👋, I'm {p.name}</h1>
          <p className="mt-1 text-muted-foreground">
            {p.title}
            {p.location && ` · ${p.location}`}
          </p>
        </header>
        {p.bio && <p className="leading-relaxed">{p.bio}</p>}
        {(p.currentlyWorking || p.learning) && (
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {p.currentlyWorking && <li>🔭 I'm currently working on <b>{p.currentlyWorking}</b></li>}
            {p.learning && <li>🌱 I'm currently learning <b>{p.learning}</b></li>}
          </ul>
        )}
        {p.tech.length > 0 && (
          <section>
            <H>🛠️ Tech Stack</H>
            <div className="flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <img key={t} src={techBadgeUrl(t)} alt={t} className="h-7" loading="lazy" />
              ))}
            </div>
          </section>
        )}
        {!compact && (p.showStats || p.showLangs || p.showStreak) && (
          <section>
            <H>📊 GitHub Stats</H>
            <div className="flex flex-wrap justify-center gap-3">
              {p.showStats && <StatCard src={statsUrl(p)} label="Stats" />}
              {p.showLangs && <StatCard src={langsUrl(p)} label="Top languages" />}
              {p.showStreak && <StatCard src={streakUrl(p)} label="Streak" />}
            </div>
          </section>
        )}
        {p.socials.some((s) => s.handle) && (
          <section>
            <H>🤝 Connect with me</H>
            <div className="flex flex-wrap gap-1.5">
              {p.socials
                .filter((s) => s.handle)
                .map((s) => (
                  <a key={s.platform} href={SOCIAL_META[s.platform]?.url(s.handle)} target="_blank" rel="noreferrer">
                    <img src={socialBadgeUrl(s.platform)} alt={s.platform} className="h-7" loading="lazy" />
                  </a>
                ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 border-b border-border pb-2 text-lg font-semibold">{children}</h2>;
}

function StatCard({ src, label }: { src: string; label: string }) {
  return (
    <img
      src={src}
      alt={label}
      loading="lazy"
      className="h-40 max-w-full rounded-md bg-secondary"
      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
    />
  );
}
