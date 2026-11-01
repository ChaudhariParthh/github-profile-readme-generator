import { useId } from "react";

/** Brand mark: gradient </> on a dark rounded tile, matching the favicon. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.6 0.24 295)" />
          <stop offset="0.5" stopColor="oklch(0.62 0.2 262)" />
          <stop offset="1" stopColor="oklch(0.78 0.15 215)" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="oklch(0.16 0.02 270)" />
      <g
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 21 L12 32 L22 43" />
        <path d="M42 21 L52 32 L42 43" />
        <path d="M36 15 L28 49" />
      </g>
    </svg>
  );
}

export function BrandLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight">
          Git<span className="text-gradient">Profile</span>
        </span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Studio
        </span>
      </span>
    </span>
  );
}
