import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, Palette, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GitProfile Studio — GitHub Profile README Generator" },
      {
        name: "description",
        content:
          "Design a standout GitHub profile README in minutes. Pick a theme, add badges and stats, copy Markdown.",
      },
      { property: "og:title", content: "GitProfile Studio — GitHub Profile README Generator" },
      {
        property: "og:description",
        content: "Design a standout GitHub profile README in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  {
    icon: UserRound,
    title: "Configure profile",
    text: "Name, role, bio, what you're building and learning.",
  },
  {
    icon: Palette,
    title: "Pick theme & badges",
    text: "Choose a preset, tech stack badges, socials and stats cards.",
  },
  {
    icon: Copy,
    title: "Copy Markdown",
    text: "Grab clean Markdown and paste into your profile repo.",
  },
];

const themes = [
  { name: "Minimal", desc: "Quiet, text-first, zero noise.", swatch: "from-muted to-secondary" },
  {
    name: "Modern Dev",
    desc: "Badges, stats and a crisp header.",
    swatch: "from-primary to-accent",
  },
  {
    name: "Neon Dark",
    desc: "High-contrast glow for night owls.",
    swatch: "from-accent to-primary",
  },
  {
    name: "Gradient",
    desc: "Bold gradient banner and accents.",
    swatch: "from-primary via-accent to-primary",
  },
  {
    name: "Contributor",
    desc: "Open-source streaks front and center.",
    swatch: "from-chart-3 to-accent",
  },
  {
    name: "Portfolio",
    desc: "Projects and links that convert.",
    swatch: "from-chart-4 to-chart-5",
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Your GitHub profile, <span className="text-gradient">designed in minutes.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Build a polished profile README with live preview, tech badges, stats cards and
              socials — then copy the Markdown.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/builder">
                  Open Builder <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#themes">Browse themes</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative shadow-glow transition-transform duration-500 hover:-translate-y-1 hover:rotate-0 lg:rotate-1" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <p className="font-mono text-sm text-accent">// how it works</p>
        <h2 className="mt-2 text-3xl font-bold">Three steps to a better first impression</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="themes" className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <p className="font-mono text-sm text-accent">// presets</p>
        <h2 className="mt-2 text-3xl font-bold">Start from a theme</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((t) => (
            <Link
              key={t.name}
              to="/builder"
              className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <div className={`h-28 rounded-lg bg-gradient-to-br ${t.swatch} p-4`}>
                <div className="h-2 w-1/2 rounded bg-background/60" />
                <div className="mt-2 h-2 w-1/3 rounded bg-background/40" />
                <div className="mt-6 flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-10 rounded bg-background/50" />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold">{t.name}</h3>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
        GitProfile Studio · built for developers
      </footer>
    </div>
  );
}
