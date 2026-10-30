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

      <footer className="border-t border-border bg-background pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:text-left lg:items-start">
              <BrandLogo />
              <p className="mt-6 max-w-[340px] text-sm text-muted-foreground leading-relaxed lg:mt-8">
                Build a polished profile README with live preview, tech badges, stats cards and
                socials — then copy the Markdown.
              </p>
              <div className="mt-8 flex items-center gap-2">
                <Button asChild size="sm" className="bg-gradient-brand shadow-glow hover:opacity-90">
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
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Generator
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Addons
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
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
                    href="https://github.com/Parth-CyberParth/github-profile-readme-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Parth-CyberParth/github-profile-readme-generator/issues"
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
                    href="https://github.com/Parth-CyberParth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/parth-chaudhari/"
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

          <div className="border-t border-border pt-8">
            <p className="mx-auto max-w-[640px] text-center text-sm text-muted-foreground">
              © 2026 GitProfile Studio. Made with{" "}
              <span className="text-foreground">❤️</span> by{" "}
              <a
                href="https://github.com/Parth-CyberParth"
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
