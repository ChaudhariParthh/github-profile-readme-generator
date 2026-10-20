import { Link } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
            <Github className="h-4 w-4" />
          </span>
          GitProfile<span className="text-gradient">Studio</span>
        </Link>
        <Button asChild size="sm">
          <Link to="/builder">
            Open Builder <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
