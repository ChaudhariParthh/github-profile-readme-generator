import { useEffect, useState, useCallback } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "system" | "light" | "dark";

const THEME_LABELS: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const THEME_ICONS: Record<Theme, React.ElementType> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  const resolveTheme = useCallback((t: Theme): "light" | "dark" => {
    if (t === "system") {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return t;
  }, []);

  const applyTheme = useCallback(
    (t: Theme) => {
      const resolved = resolveTheme(t);
      document.documentElement.classList.toggle("light", resolved === "light");
      try {
        localStorage.setItem("gps-theme", t);
      } catch {
        /* storage unavailable */
      }
    },
    [resolveTheme],
  );

  useEffect(() => {
    setMounted(true);
    let saved: Theme | null = null;
    try {
      saved = (localStorage.getItem("gps-theme") as Theme) ?? null;
      if (!saved || !["system", "light", "dark"].includes(saved)) saved = null;
    } catch {
      /* storage unavailable */
    }
    const initial = saved ?? "system";
    setTheme(initial);
    applyTheme(initial);
  }, [applyTheme]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, mounted, applyTheme]);

  const NEXT: Record<Theme, Theme> = { system: "light", light: "dark", dark: "system" };

  const cycle = () => {
    const next = NEXT[theme];
    setTheme(next);
    applyTheme(next);
  };

  const Icon = THEME_ICONS[theme];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycle}
      aria-label={`Theme: ${THEME_LABELS[theme]}`}
      title={THEME_LABELS[theme]}
      disabled={!mounted}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
