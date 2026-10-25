import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

type BuilderActions = {
  onSave: () => void;
  onDownload: () => void;
  onExport: () => void;
  onPreview: () => void;
};

const nav = [
  { to: "/", label: "Dashboard", hash: "" },
  { to: "/", label: "Templates", hash: "themes" },
  { to: "/builder", label: "Builder", hash: "" },
] as const;

export function SiteHeader({ builder }: { builder?: BuilderActions }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1680px] items-center gap-3 px-3 md:px-5">
        <Link to="/" aria-label="GitProfile Studio home" className="shrink-0">
          <BrandLogo />
        </Link>
        {builder ? (
          <>
            <nav className="ml-2 hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  className={`rounded-md px-3 py-1.5 text-sm ${item.label === "Builder" ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={builder.onPreview}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={builder.onExport}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Export
              </button>
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={builder.onSave}>
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button size="sm" onClick={builder.onDownload}>
                <Download className="h-4 w-4" /> Download README.md
              </Button>
            </div>
          </>
        ) : (
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="bg-gradient-brand shadow-glow hover:opacity-90">
              <Link to="/builder">
                Open Builder <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
