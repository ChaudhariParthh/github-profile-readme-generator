import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, Palette, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandLogo } from "@/components/BrandLogo";

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
    text: "Choose tech stack badges, socials and stats cards.",
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background geometry: stepped diagonal panels + purple/cyan glows, matching reference */}
      <div className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            /* corner dot grids */
            radial-gradient(1px 1px at 62% 16%, color-mix(in oklab, var(--border) 50%, transparent), transparent),
            radial-gradient(1px 1px at 64% 16%, color-mix(in oklab, var(--border) 50%, transparent), transparent),
            radial-gradient(1px 1px at 64% 18%, color-mix(in oklab, var(--border) 50%, transparent), transparent),
            radial-gradient(1px 1px at 66% 16%, color-mix(in oklab, var(--border) 50%, transparent), transparent),
            radial-gradient(1px 1px at 66% 18%, color-mix(in oklab, var(--border) 50%, transparent), transparent),
            radial-gradient(1px 1px at 38% 76%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 36% 78%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 38% 80%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 40% 76%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 40% 78%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 42% 76%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 42% 80%, color-mix(in oklab, var(--border) 45%, transparent), transparent),
            radial-gradient(1px 1px at 44% 78%, color-mix(in oklab, var(--border) 45%, transparent), transparent),

            /* stepped panel fills - right panel */
            linear-gradient(135deg, transparent 36%, color-mix(in oklab, var(--primary) 6%, transparent) 38%, transparent 40%),
            linear-gradient(135deg, transparent 44%, color-mix(in oklab, var(--accent) 6%, transparent) 46%, transparent 48%),
            linear-gradient(135deg, transparent 52%, color-mix(in oklab, var(--primary) 5%, transparent) 54%, transparent 56%),

            /* middle stepped panel fill */
            linear-gradient(135deg, transparent 58%, color-mix(in oklab, color-mix(in oklab, var(--primary) 60%, var(--accent) 40%) 5%, transparent) 60%, transparent 62%),

            /* glowing panel borders - cyan/blue */
            linear-gradient(135deg, transparent 39%, oklch(0.82 0.16 212) 40%, oklch(0.82 0.16 212) 41%, transparent 42%),
            linear-gradient(135deg, transparent 47%, oklch(0.8 0.15 211.5) 48%, oklch(0.8 0.15 211.5) 49%, transparent 50%),

            /* glowing panel borders - purple */
            linear-gradient(135deg, transparent 53%, oklch(0.62 0.22 295) 54%, oklch(0.62 0.22 295) 55%, transparent 56%),
            linear-gradient(135deg, transparent 61%, oklch(0.6 0.24 295) 62%, oklch(0.6 0.24 295) 63%, transparent 64%),
          `,
        }}
      />

      <SiteHeader />

      {/* Hero */}
      <section className="relative px-4 pt-20 pb-32 md:px-6 lg:py-40 lg:pt-32 lg:pb-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Your GitHub profile, <span className="text-gradient">designed in minutes.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Build a polished profile README with live preview, tech badges, stats cards and
                socials — then copy the Markdown.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-brand shadow-glow hover:opacity-90"
                >
                  <Link to="/builder">
                    Open Builder <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div
                className="absolute inset-0 rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-2xl"
                style={{
                  backgroundImage: `
                    radial-gradient(600px circle at 10% 10%, color-mix(in oklab, var(--primary) 12%, transparent), transparent),
                    radial-gradient(500px circle at 90% 90%, color-mix(in oklab, var(--accent) 12%, transparent), transparent)
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 lg:py-32">
        <div className="text-center mx-auto max-w-3xl">
          <p className="font-mono text-sm text-accent">// how it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Three steps to a better first impression
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-background pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:text-left lg:items-start">
              <BrandLogo />
              <p className="mt-8 max-w-[340px] text-sm text-muted-foreground leading-relaxed lg:mt-10">
                Build a polished profile README with live preview, tech badges, stats cards and
                socials — then copy the Markdown.
              </p>
              <div className="mt-10 flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-brand shadow-glow hover:opacity-90"
                >
                  <Link to="/builder">
                    Open Builder <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-2 lg:pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3 lg:mt-2">
                <li>
                  <Link
                    to="/builder"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Generator
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.buymeachai.in/parthc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-2 lg:pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Resources
              </h3>
              <ul className="flex flex-col gap-3 lg:mt-2">
                <li>
                  <a
                    href="https://github.com/ChaudhariParthh/github-profile-readme-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ChaudhariParthh/github-profile-readme-generator/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Report Issues
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.apache.org/licenses/LICENSE-2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    License
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-2 lg:pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Connect
              </h3>
              <ul className="flex flex-col gap-3 lg:mt-2">
                <li>
                  <a
                    href="https://github.com/ChaudhariParthh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/chaudhariparth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-10">
            <p className="mx-auto max-w-[640px] text-center text-sm text-muted-foreground">
              © 2026 GitProfile Studio. Made with <span className="text-foreground">❤️</span> by{" "}
              <a
                href="https://github.com/ChaudhariParthh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/90"
              >
                Parth Chaudhari
              </a>{" "}
              · Open source under the{" "}
              <a
                href="https://www.apache.org/licenses/LICENSE-2.0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/90"
              >
                Apache License 2.0
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
