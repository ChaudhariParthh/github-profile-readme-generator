import {
  BACKGROUND_THEMES,
  STATS_LAYOUTS,
  type AppearanceTheme,
  type StatsLayout,
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

export function StatsGallery({
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
          {STATS_LAYOUTS.length} GitHub Stats Section Themes{" "}
          <span className="font-normal text-muted-foreground">
            Unique, non-generic stats layouts for the generated README.
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STATS_LAYOUTS.map((t) => (
          <StatsCard
            key={t.id}
            layout={t}
            active={value === t.id}
            onSelect={() => onChange(t.id)}
          />
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
      <div
        className={`relative h-24 w-full ${theme.bannerMotion === "svg-anim" ? "theme-motion" : ""}`}
        style={{ background: theme.thumb }}
      >
        <ThemeArt theme={theme} />
        <span
          className={`absolute left-2.5 top-2 font-mono text-[10px] font-bold tracking-wider ${
            isLight ? "text-stone-700" : "text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
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

function ThemeArt({ theme }: { theme: AppearanceTheme }) {
  const [dark, mid, light] = theme.palette;

  switch (theme.id) {
    case "midnight-aurora":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="ma-aurora-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ma-aurora-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="ma-moon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep night sky glow */}
          <rect width="400" height="96" fill="#060918" opacity="0.4" />

          {/* Star field with varying sizes & sparkles */}
          {([
            [22, 10, 0.9], [48, 16, 0.7], [78, 8, 1.2], [112, 14, 0.8], [145, 6, 1.0],
            [175, 18, 0.7], [205, 9, 1.3], [238, 15, 0.7], [268, 7, 1.1], [298, 17, 0.8],
            [328, 8, 1.0], [352, 19, 0.7], [382, 12, 1.2], [35, 26, 0.7], [92, 24, 0.9],
            [158, 22, 0.7], [222, 25, 0.8], [282, 23, 0.9], [370, 26, 0.7]
          ] as const).map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#F8FAFC" opacity={0.65 + (i % 4) * 0.1} />
          ))}
          {/* Sparkle star */}
          <path d="M78 8 L79 5 L80 8 L83 9 L80 10 L79 13 L78 10 L75 9 Z" fill="#E0F2FE" opacity="0.85" />
          <path d="M268 7 L269 4 L270 7 L273 8 L270 9 L269 12 L268 9 L265 8 Z" fill="#E0F2FE" opacity="0.85" />

          {/* Crescent Moon with glow */}
          <circle cx="348" cy="18" r="14" fill="url(#ma-moon-glow)" />
          <circle cx="348" cy="18" r="7.5" fill="#F1F5F9" />
          <circle cx="351" cy="16" r="6.2" fill="#0a0e27" />

          {/* Aurora sweeping bands */}
          <path
            d="M-20 62 C 60 22, 120 74, 210 32 C 285 0, 340 50, 420 28 L 420 60 C 340 75, 275 35, 205 65 C 120 100, 55 50, -20 85 Z"
            fill="url(#ma-aurora-1)"
            opacity="0.85"
          />
          <path
            d="M-20 48 C 70 12, 130 60, 220 26 C 295 2, 350 42, 420 18"
            stroke="url(#ma-aurora-2)"
            strokeWidth="10"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M-10 54 C 80 20, 145 66, 235 34 C 310 10, 360 48, 420 30"
            stroke="#22D3EE"
            strokeWidth="3.5"
            fill="none"
            opacity="0.8"
          />

          {/* Distant mountain silhouettes */}
          <polygon
            points="-10,96 15,64 45,76 80,52 115,70 150,46 195,68 235,42 275,64 315,48 355,66 395,54 415,68 415,96"
            fill="#1E1B4B"
            opacity="0.85"
          />
          <polygon
            points="-10,96 30,72 65,82 105,62 140,78 180,58 220,74 260,54 300,72 340,58 385,74 415,64 415,96"
            fill="#0F172A"
            opacity="0.95"
          />

          {/* Foreground dense pine forest silhouettes */}
          {([
            [5, 58, 20], [22, 54, 24], [40, 60, 18], [58, 52, 26], [75, 56, 22],
            [95, 62, 18], [112, 55, 23], [130, 50, 28], [150, 57, 21], [170, 62, 18],
            [190, 54, 24], [210, 51, 27], [230, 58, 20], [250, 53, 25], [270, 60, 18],
            [290, 52, 26], [310, 55, 23], [330, 49, 29], [350, 56, 22], [370, 52, 26],
            [390, 55, 22], [405, 50, 28]
          ] as const).map(([x, top, h], i) => (
            <polygon
              key={`p-${i}`}
              points={`${x},${top} ${x - h * 0.38},${top + h} ${x + h * 0.38},${top + h}`}
              fill="#060914"
            />
          ))}
          <rect x="0" y="86" width="400" height="10" fill="#04060E" />
        </svg>
      );

    case "neon-cyber":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="nc-ring-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.4" />
              <stop offset="65%" stopColor="#A855F7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="nc-ring-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="nc-grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Dark futuristic sky */}
          <rect width="400" height="52" fill="#050517" opacity="0.6" />

          {/* Glowing central Neon Portal Ring */}
          <circle cx="280" cy="34" r="32" fill="url(#nc-ring-glow)" />
          <circle cx="280" cy="34" r="23" stroke="#EC4899" strokeWidth="6" opacity="0.25" fill="none" />
          <circle cx="280" cy="34" r="23" stroke="url(#nc-ring-stroke)" strokeWidth="2.5" fill="none" />
          <circle cx="280" cy="34" r="21" stroke="#F43F5E" strokeWidth="1" opacity="0.8" fill="none" />

          {/* Futuristic skyscraper skyline silhouette */}
          <polygon
            points="
              0,52 0,28 14,28 14,35 24,35 24,20 34,20 34,14 36,8 38,14 38,36 50,36 50,24 64,24 64,38 78,38 78,16
              86,16 86,10 88,6 90,10 90,40 104,40 104,30 118,30 118,44 135,44 135,26 148,26 148,46 160,46
              160,34 175,34 175,48 190,48 190,52
            "
            fill="#090A22"
          />
          {/* Distant skyline towers on right */}
          <polygon
            points="
              325,52 325,42 336,42 336,32 346,32 346,22 348,15 350,22 350,44 362,44 362,28 376,28 376,40
              388,40 388,18 390,12 392,18 392,36 400,36 400,52
            "
            fill="#090A22"
          />

          {/* Lit building windows / neon signs */}
          {([
            [18, 30], [28, 25], [28, 29], [70, 28], [70, 32], [82, 22], [82, 26], [82, 30],
            [110, 34], [140, 30], [140, 36], [340, 36], [370, 32], [382, 24]
          ] as const).map(([x, y], i) => (
            <rect key={`w-${i}`} x={x} y={y} width="2.5" height="1.8" fill={i % 2 === 0 ? "#22D3EE" : "#F43F5E"} opacity="0.85" />
          ))}

          {/* Glowing horizon line */}
          <line x1="0" y1="52" x2="400" y2="52" stroke="#06B6D4" strokeWidth="2" opacity="0.9" />
          <line x1="0" y1="52" x2="400" y2="52" stroke="#EC4899" strokeWidth="0.8" opacity="0.7" />

          {/* Perspective grid floor */}
          {[-180, -120, -70, -30, 0, 30, 70, 110, 150, 190, 240, 290, 340, 400, 470, 540].map((vx, i) => (
            <line
              key={`pg-${i}`}
              x1="260"
              y1="52"
              x2={vx}
              y2="96"
              stroke="url(#nc-grid-fade)"
              strokeWidth="0.9"
            />
          ))}
          {/* Horizontal perspective rungs */}
          {[54, 57, 61, 66, 73, 82, 94].map((y, i) => (
            <line
              key={`ph-${i}`}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="#06B6D4"
              strokeWidth={0.6 + i * 0.15}
              opacity={0.3 + i * 0.1}
            />
          ))}
        </svg>
      );

    case "terminal-hacker":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="th-glow" cx="68%" cy="50%" r="45%">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#052E16" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="th-hood-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14532D" />
              <stop offset="40%" stopColor="#052E16" />
              <stop offset="100%" stopColor="#020804" />
            </linearGradient>
          </defs>

          {/* Deep terminal background */}
          <rect width="400" height="96" fill="#020804" opacity="0.6" />

          {/* Matrix code streams in background */}
          {([
            [15, "01101001 0x7F #!/bin/sh 10110 0101"],
            [45, "function breach() { return true; } 0x9A"],
            [80, "GET /api/v1/auth?token=root 200 OK 010"],
            [115, "SSH-2.0-OpenSSH_9.2p1 debian-1_all 11"],
            [150, "sys.traceback(0x4F); bypass_sandbox()"],
            [185, "10110010 01010110 11001010 00101010"],
            [220, "const cipher = crypto.createDecipherIv"],
            [255, "0x4A 0x82 0xFF 0x1B 0x00 0xDE 0xAD 0xBE"],
            [290, "iptables -A INPUT -p tcp --dport 22 -j"],
            [325, "grep -rnw '/var/log/' -e 'SECRET_KEY'"],
            [360, "11010010 10101101 01010010 11100010"],
            [388, "chmod +x /etc/init.d/daemon && ./run"]
          ] as const).map(([x, txt], i) => (
            <text
              key={`m-${i}`}
              x={x}
              y="10"
              fill="#4ADE80"
              fontSize="6"
              fontFamily="monospace"
              opacity={0.3 + (i % 3) * 0.15}
              style={{ writingMode: "vertical-rl" }}
            >
              {txt}
            </text>
          ))}

          {/* Ambient green monitor glow */}
          <circle cx="280" cy="50" r="80" fill="url(#th-glow)" />

          {/* Floating diagnostic terminal windows on left & mid */}
          <rect x="18" y="22" width="70" height="42" rx="3" fill="#041F0E" stroke="#166534" strokeWidth="0.8" opacity="0.85" />
          <rect x="18" y="22" width="70" height="7" fill="#14532D" opacity="0.7" />
          <circle cx="23" cy="25.5" r="1.5" fill="#EF4444" opacity="0.8" />
          <circle cx="28" cy="25.5" r="1.5" fill="#EAB308" opacity="0.8" />
          <circle cx="33" cy="25.5" r="1.5" fill="#22C55E" opacity="0.8" />
          <text x="24" y="38" fill="#86EFAC" fontSize="5" fontFamily="monospace">&gt; status: CONNECTED</text>
          <text x="24" y="46" fill="#4ADE80" fontSize="5" fontFamily="monospace">&gt; ip: 127.0.0.1</text>
          <text x="24" y="54" fill="#22C55E" fontSize="5" fontFamily="monospace">&gt; payload: active</text>

          {/* Center-right multi-display terminal monitors */}
          <rect x="105" y="16" width="92" height="52" rx="3" fill="#03160A" stroke="#22C55E" strokeWidth="1" opacity="0.9" />
          <rect x="105" y="16" width="92" height="7" fill="#052E16" />
          <text x="112" y="31" fill="#4ADE80" fontSize="5.5" fontFamily="monospace">root@cyber:~# cat /etc/shadow</text>
          <text x="112" y="39" fill="#86EFAC" fontSize="4.5" fontFamily="monospace">parth:$6$rounds=50000$g7K2m...:19420</text>
          <text x="112" y="47" fill="#4ADE80" fontSize="4.5" fontFamily="monospace">root:$6$rounds=65536$k9X8z...:19420</text>
          <text x="112" y="55" fill="#22C55E" fontSize="5" fontFamily="monospace">[SYS_OK] decrypting stream_</text>

          {/* Hooded hacker silhouette (viewed from back) */}
          <g transform="translate(195, 8)">
            {/* Shoulders & torso */}
            <path
              d="M 20 88 C 22 55, 38 42, 60 40 C 82 42, 98 55, 100 88 Z"
              fill="url(#th-hood-grad)"
              stroke="#22C55E"
              strokeWidth="0.8"
              opacity="0.95"
            />
            {/* Hood peak & head */}
            <path
              d="M 45 42 C 43 24, 52 14, 60 12 C 68 14, 77 24, 75 42 C 70 45, 60 46, 45 42 Z"
              fill="#062814"
              stroke="#4ADE80"
              strokeWidth="0.9"
            />
            {/* Inner dark shadow in hood */}
            <ellipse cx="60" cy="30" rx="10" ry="11" fill="#010A04" />
          </g>

          {/* CRT scanlines overlay */}
          {[12, 24, 36, 48, 60, 72, 84].map((y, i) => (
            <line key={`scan-${i}`} x1="0" y1={y} x2="400" y2={y} stroke="#4ADE80" strokeWidth="0.4" opacity="0.1" />
          ))}
        </svg>
      );

    case "cosmic-galaxy":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="cg-nebula-1" cx="62%" cy="42%" r="50%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#A855F7" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0B0F2A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cg-nebula-2" cx="30%" cy="60%" r="45%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0B0F2A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cg-planet-1" cx="32%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="35%" stopColor="#7C3AED" />
              <stop offset="70%" stopColor="#312E81" />
              <stop offset="100%" stopColor="#050816" />
            </radialGradient>
            <radialGradient id="cg-planet-2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="40%" stopColor="#0284C7" />
              <stop offset="85%" stopColor="#03264A" />
              <stop offset="100%" stopColor="#020D1A" />
            </radialGradient>
          </defs>

          {/* Deep cosmos black */}
          <rect width="400" height="96" fill="#040612" opacity="0.5" />

          {/* Swirling celestial nebulae */}
          <ellipse cx="250" cy="40" rx="140" ry="44" fill="url(#cg-nebula-1)" />
          <ellipse cx="120" cy="55" rx="100" ry="38" fill="url(#cg-nebula-2)" />

          {/* Rich stellar field */}
          {([
            [14, 18, 0.7], [35, 12, 1.1], [65, 28, 0.8], [95, 14, 0.9], [125, 22, 0.7],
            [155, 10, 1.2], [185, 26, 0.8], [215, 12, 1.0], [245, 24, 0.8], [275, 14, 1.3],
            [305, 28, 0.7], [335, 16, 1.1], [365, 24, 0.8], [390, 12, 1.0], [45, 75, 0.7],
            [85, 82, 0.9], [170, 78, 1.1], [225, 84, 0.8], [290, 76, 1.0], [350, 80, 0.8]
          ] as const).map(([x, y, r], i) => (
            <circle key={`s-${i}`} cx={x} cy={y} r={r} fill="#FFFFFF" opacity={0.7 + (i % 3) * 0.15} />
          ))}

          {/* Sparkling nova crosses */}
          <path d="M275 14 L276 9 L277 14 L282 15 L277 16 L276 21 L275 16 L270 15 Z" fill="#FDF4FF" opacity="0.9" />
          <path d="M155 10 L156 6 L157 10 L161 11 L157 12 L156 16 L155 12 L151 11 Z" fill="#E0F2FE" opacity="0.85" />

          {/* Large Ringed Saturn-like Planet on left */}
          <g transform="translate(68, 50)">
            {/* Planet sphere */}
            <circle cx="0" cy="0" r="28" fill="url(#cg-planet-1)" />
            {/* Atmospheric bands */}
            <path d="M -26 -8 C -15 -2, 15 -2, 26 -8" stroke="#A78BFA" strokeWidth="1.2" opacity="0.3" fill="none" />
            <path d="M -27 2 C -15 8, 15 8, 27 2" stroke="#4C1D95" strokeWidth="1.5" opacity="0.4" fill="none" />
            {/* Tilted outer rings */}
            <ellipse
              cx="0"
              cy="0"
              rx="48"
              ry="14"
              transform="rotate(-22)"
              stroke="#A855F7"
              strokeWidth="5"
              fill="none"
              opacity="0.4"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="48"
              ry="14"
              transform="rotate(-22)"
              stroke="#E0F2FE"
              strokeWidth="1.5"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Glowing blue Exoplanet on center-right */}
          <g transform="translate(320, 48)">
            <circle cx="0" cy="0" r="19" fill="url(#cg-planet-2)" />
            {/* Crescent sunlit rim */}
            <path
              d="M -14 -12 A 19 19 0 0 1 12 14 A 18 18 0 0 0 -14 -12"
              fill="#BAE6FD"
              opacity="0.85"
            />
          </g>

          {/* Distant moon */}
          <circle cx="365" cy="24" r="5" fill="#E9D5FF" opacity="0.85" />
          <circle cx="367" cy="23" r="4.2" fill="#0B0E23" />
        </svg>
      );

    case "mountain-night":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="mn-moon-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F472B6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mn-water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0B1220" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Starry night sky */}
          {([
            [25, 12], [55, 18], [95, 8], [130, 20], [165, 10], [205, 16],
            [240, 9], [275, 22], [305, 12], [375, 14], [70, 28], [180, 26]
          ] as const).map(([x, y], i) => (
            <circle key={`mn-s-${i}`} cx={x} cy={y} r={0.8} fill="#FFFFFF" opacity={0.65 + (i % 3) * 0.15} />
          ))}

          {/* Luminous crescent moon */}
          <circle cx="340" cy="20" r="15" fill="url(#mn-moon-halo)" />
          <circle cx="340" cy="20" r="8" fill="#FEF08A" />
          <circle cx="343" cy="18" r="6.8" fill="#131638" />

          {/* Distant background mountain ridge (lavender haze) */}
          <polygon
            points="0,75 35,46 75,64 125,36 175,58 220,38 270,56 315,40 365,60 400,44 400,75 0,75"
            fill="#312E81"
            opacity="0.65"
          />

          {/* Middle mountain range with faceted snow peaks */}
          <polygon
            points="0,80 40,54 85,74 135,42 165,58 200,32 245,62 290,44 340,68 385,50 400,58 400,82 0,82"
            fill="#1E1B4B"
          />
          {/* Lit snow facets on left flanks */}
          <polygon points="135,42 120,54 135,50" fill="#E0E7FF" opacity="0.6" />
          <polygon points="200,32 182,46 200,42" fill="#E0E7FF" opacity="0.65" />
          <polygon points="290,44 274,56 290,52" fill="#E0E7FF" opacity="0.55" />

          {/* Foreground dark craggy mountain silhouette */}
          <polygon
            points="0,85 55,62 105,78 150,56 195,72 235,58 280,74 330,58 375,76 400,66 400,86 0,86"
            fill="#0F172A"
          />

          {/* Calm reflective lake */}
          <rect x="0" y="82" width="400" height="14" fill="url(#mn-water-grad)" />
          {/* Water reflection ripples */}
          <line x1="180" y1="86" x2="220" y2="86" stroke="#818CF8" strokeWidth="0.8" opacity="0.4" />
          <line x1="330" y1="86" x2="350" y2="86" stroke="#FEF08A" strokeWidth="1" opacity="0.5" />
          <line x1="325" y1="90" x2="355" y2="90" stroke="#FEF08A" strokeWidth="0.6" opacity="0.3" />

          {/* Silhouetted pines on shoreline */}
          {[12, 35, 68, 120, 245, 275, 385].map((x, i) => (
            <polygon key={`pine-${i}`} points={`${x},74 ${x - 5},86 ${x + 5},86`} fill="#0B1220" />
          ))}
        </svg>
      );

    case "ocean-depths":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="od-rays" x1="0%" y1="0%" x2="40%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#0891B2" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#042F2E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="od-deep" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0891B2" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#021C1B" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Deep ocean body */}
          <rect width="400" height="96" fill="url(#od-deep)" />

          {/* Sunbeams / caustics radiating down from surface */}
          <polygon points="60,0 120,0 180,96 100,96" fill="url(#od-rays)" />
          <polygon points="150,0 210,0 300,96 220,96" fill="url(#od-rays)" opacity="0.8" />
          <polygon points="240,0 290,0 380,96 320,96" fill="url(#od-rays)" opacity="0.6" />

          {/* Floating air bubbles */}
          {([
            [90, 35, 2], [140, 22, 1.5], [175, 45, 2.5], [210, 18, 1.2],
            [260, 38, 2], [315, 28, 1.8], [350, 48, 2.2]
          ] as const).map(([x, y, r], i) => (
            <circle key={`b-${i}`} cx={x} cy={y} r={r} fill="none" stroke="#67E8F9" strokeWidth="0.8" opacity="0.65" />
          ))}

          {/* Graceful Manta Ray silhouette gliding through light beam */}
          <g transform="translate(195, 36) scale(0.7)">
            <path
              d="M 0 0 C 15 -14, 38 -12, 45 -4 C 36 6, 12 12, 0 10 C -12 12, -36 6, -45 -4 C -38 -12, -15 -14, 0 0 Z"
              fill="#064E3B"
              opacity="0.85"
            />
            {/* Tail */}
            <path d="M 0 10 C 2 24, -1 35, 1 44" stroke="#064E3B" strokeWidth="1.2" fill="none" opacity="0.85" />
          </g>

          {/* School of distant small fish silhouettes */}
          {([
            [110, 52], [118, 50], [125, 53], [132, 49], [140, 52],
            [280, 24], [288, 22], [296, 25]
          ] as const).map(([x, y], i) => (
            <path key={`f-${i}`} d={`M ${x} ${y} Q ${x + 4} ${y - 1.5} ${x + 7} ${y} Q ${x + 4} ${y + 1.5} ${x} ${y} Z`} fill="#0D9488" opacity="0.75" />
          ))}

          {/* Intricate Coral Reef & Sea Floor silhouette */}
          <path
            d="
              M 0 96 L 0 78
              C 12 76, 18 68, 24 76 C 30 65, 36 62, 44 74 C 52 68, 58 72, 65 80
              C 76 74, 84 62, 92 78 C 105 76, 115 82, 130 80 C 145 74, 155 66, 168 78
              C 180 72, 192 68, 205 78 C 220 74, 235 80, 250 78 C 265 65, 275 62, 288 76
              C 298 70, 310 64, 324 76 C 338 68, 350 72, 362 82 C 375 74, 388 66, 400 78
              L 400 96 Z
            "
            fill="#02211F"
          />

          {/* Branching coral fans in foreground */}
          <path d="M 35 96 C 35 82, 30 76, 24 70 M 35 82 C 42 75, 48 68, 46 62" stroke="#0F766E" strokeWidth="2" fill="none" />
          <path d="M 370 96 C 370 80, 376 74, 384 68 M 370 82 C 362 76, 358 68, 360 60" stroke="#0F766E" strokeWidth="2" fill="none" />
        </svg>
      );

    case "sunset-horizon":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="sh-sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#DB2777" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4C0519" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sh-sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4C0519" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#BE185D" stopOpacity="0.4" />
              <stop offset="85%" stopColor="#F97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Sky base */}
          <rect width="400" height="96" fill="url(#sh-sky-grad)" />

          {/* Giant radiant setting sun on horizon */}
          <circle cx="270" cy="54" r="38" fill="url(#sh-sun-glow)" />
          <circle cx="270" cy="54" r="18" fill="#FEF08A" />

          {/* Atmospheric horizontal cloud bands cutting the sun */}
          <rect x="220" y="44" width="100" height="2" fill="#BE185D" opacity="0.75" />
          <rect x="235" y="49" width="80" height="2.2" fill="#BE185D" opacity="0.8" />
          <rect x="245" y="55" width="60" height="2.5" fill="#9D174D" opacity="0.85" />

          {/* Distant skyline layer (warm haze) */}
          <polygon
            points="
              0,64 15,64 15,58 25,58 25,62 38,62 38,54 48,54 48,60 62,60 62,52 75,52 75,64
              95,64 95,56 110,56 110,62 135,62 135,50 150,50 150,60 180,60 180,52 200,52 200,64
              320,64 320,54 340,54 340,58 360,58 360,50 375,50 375,64 400,64 400,96 0,96
            "
            fill="#831843"
            opacity="0.85"
          />

          {/* Midground dense cityscape silhouette */}
          <polygon
            points="
              0,72 10,72 10,58 20,58 20,64 28,64 28,48 36,48 36,42 38,36 40,42 40,70 54,70
              54,52 68,52 68,66 82,66 82,44 92,44 92,38 94,32 96,38 96,68 112,68 112,56
              128,56 128,66 142,66 142,48 156,48 156,68 174,68 174,54 188,54 188,68 205,68
              205,58 220,58 220,68 238,68 238,72 255,72 255,62 268,62 268,72 284,72 284,56
              296,56 296,68 312,68 312,46 322,46 322,66 338,66 338,52 352,52 352,68 368,68
              368,48 378,48 378,64 390,64 390,56 400,56 400,96 0,96
            "
            fill="#4C0519"
          />

          {/* Lit skyscraper windows in warm amber */}
          {([
            [32, 54], [32, 60], [86, 50], [86, 56], [86, 62], [148, 54], [148, 60],
            [316, 52], [316, 58], [344, 58], [372, 54]
          ] as const).map(([x, y], i) => (
            <rect key={`sh-w-${i}`} x={x} y={y} width="2" height="1.8" fill="#FDE047" opacity="0.9" />
          ))}

          {/* Foreground reflective water / boulevard */}
          <rect x="0" y="74" width="400" height="22" fill="#2E020E" opacity="0.9" />
          <line x1="240" y1="78" x2="300" y2="78" stroke="#F97316" strokeWidth="1.2" opacity="0.8" />
          <line x1="250" y1="83" x2="290" y2="83" stroke="#FDE047" strokeWidth="1" opacity="0.65" />
          <line x1="260" y1="88" x2="280" y2="88" stroke="#FDE047" strokeWidth="0.8" opacity="0.5" />
        </svg>
      );

    case "minimal-mono":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="mm-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#A1A1AA" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#3F3F46" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mm-wave-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E4E4E7" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#71717A" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#09090B" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="mm-ribbon" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#27272A" />
              <stop offset="35%" stopColor="#FAFAFA" />
              <stop offset="65%" stopColor="#71717A" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>
          </defs>

          {/* Deep charcoal background */}
          <rect width="400" height="96" fill="#09090B" opacity="0.7" />

          {/* Large sculptural flowing ribbon waves */}
          <path
            d="M -20 25 C 70 65, 140 10, 240 55 C 330 95, 380 40, 420 60 L 420 96 L -20 96 Z"
            fill="url(#mm-wave-2)"
          />

          <path
            d="M -20 70 C 80 15, 160 85, 260 30 C 340 -10, 390 50, 420 20"
            stroke="url(#mm-wave-1)"
            strokeWidth="24"
            fill="none"
            opacity="0.35"
            strokeLinecap="round"
          />

          {/* Sharp 3D ribbon crest curve */}
          <path
            d="M -20 72 C 80 16, 160 86, 260 32 C 340 -8, 390 52, 420 22"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            fill="none"
            opacity="0.9"
          />

          {/* Counter-flowing metallic accent wave */}
          <path
            d="M -20 40 C 60 85, 180 20, 280 68 C 350 100, 390 70, 420 80"
            stroke="#A1A1AA"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
          />

          {/* Deep dark fold contour */}
          <path
            d="M 120 96 C 180 65, 240 50, 320 75 C 360 88, 390 92, 420 96 Z"
            fill="#121215"
            opacity="0.85"
          />
        </svg>
      );

    case "glass-prism":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="gp-prism-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gp-prism-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="gp-prism-3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Deep violet-black space */}
          <rect width="400" height="96" fill="#0C0A22" opacity="0.6" />

          {/* Background refracted light beams */}
          <polygon points="180,0 260,0 340,96 160,96" fill="#818CF8" opacity="0.15" />
          <polygon points="260,0 340,0 420,96 240,96" fill="#06B6D4" opacity="0.12" />

          {/* Prismatic rainbow refraction dispersion */}
          <line x1="265" y1="80" x2="390" y2="52" stroke="#F43F5E" strokeWidth="2" opacity="0.65" />
          <line x1="265" y1="80" x2="392" y2="56" stroke="#FB923C" strokeWidth="2" opacity="0.65" />
          <line x1="265" y1="80" x2="395" y2="60" stroke="#FACC15" strokeWidth="2" opacity="0.65" />
          <line x1="265" y1="80" x2="397" y2="64" stroke="#4ADE80" strokeWidth="2" opacity="0.65" />
          <line x1="265" y1="80" x2="399" y2="68" stroke="#22D3EE" strokeWidth="2" opacity="0.65" />
          <line x1="265" y1="80" x2="400" y2="72" stroke="#A855F7" strokeWidth="2" opacity="0.65" />

          {/* Multi-faceted 3D Glass Crystal / Prisms */}
          {/* Main central diamond prism */}
          <polygon
            points="140,88 205,14 270,88 205,96"
            fill="url(#gp-prism-1)"
            stroke="#E0E7FF"
            strokeWidth="1.2"
          />
          {/* Facet split */}
          <polygon
            points="205,14 270,88 205,96"
            fill="url(#gp-prism-2)"
            stroke="#C7D2FE"
            strokeWidth="0.8"
          />

          {/* Overlapping left cyan-violet crystal */}
          <polygon
            points="70,88 125,24 180,88"
            fill="url(#gp-prism-2)"
            stroke="#A5F3FC"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Right magenta-indigo crystal */}
          <polygon
            points="230,88 295,20 360,88"
            fill="url(#gp-prism-3)"
            stroke="#FBCFE8"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Specular edge glints & reflection lines */}
          <line x1="125" y1="24" x2="205" y2="14" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85" />
          <line x1="205" y1="14" x2="295" y2="20" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85" />
          <circle cx="205" cy="14" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="125" cy="24" r="2" fill="#FFFFFF" opacity="0.8" />
          <circle cx="295" cy="20" r="2" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case "editorial-light":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 400 96"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="el-sun-disc" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="85%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#B91C1C" />
            </radialGradient>
          </defs>

          {/* Soft washi paper tone */}
          <rect width="400" height="96" fill="#F8F6F0" opacity="0.4" />

          {/* Japanese rising crimson sun disc */}
          <circle cx="318" cy="34" r="20" fill="url(#el-sun-disc)" opacity="0.9" />

          {/* Atmospheric morning mist bands across the sun */}
          <rect x="270" y="26" width="95" height="1.8" fill="#F8F6F0" opacity="0.6" />
          <rect x="280" y="36" width="80" height="2" fill="#F8F6F0" opacity="0.55" />

          {/* Layer 4: Distant pale sumi ink mountain ridge */}
          <polygon
            points="0,86 45,54 95,72 155,44 210,68 265,48 315,66 360,52 400,62 400,96 0,96"
            fill="#D6D3D1"
            opacity="0.45"
          />

          {/* Layer 3: Mid-distance mountain silhouettes */}
          <polygon
            points="0,88 60,62 110,76 160,52 215,74 270,58 320,74 370,60 400,70 400,96 0,96"
            fill="#A8A29E"
            opacity="0.6"
          />

          {/* Layer 2: Near craggy mountains with brush-stroke aesthetic */}
          <polygon
            points="0,92 40,74 85,84 135,62 180,82 225,66 280,84 330,68 375,82 400,76 400,96 0,96"
            fill="#78716C"
            opacity="0.75"
          />

          {/* Layer 1: Foreground bold calligraphic black ink mountain crags */}
          <polygon
            points="0,96 25,82 65,90 115,74 150,86 195,78 245,90 295,76 345,88 385,82 400,88 400,96 0,96"
            fill="#292524"
            opacity="0.9"
          />

          {/* Delicate silhouetted Japanese pine branch accents */}
          <path d="M 0 45 C 18 42, 32 46, 45 42" stroke="#44403C" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="32" cy="43" r="4" fill="#57534E" opacity="0.5" />
          <circle cx="45" cy="41" r="3.5" fill="#57534E" opacity="0.5" />
        </svg>
      );

    default:
      return null;
  }
}

function StatsCard({
  layout,
  active,
  onSelect,
}: {
  layout: StatsLayout;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`overflow-hidden rounded-xl border text-left transition-colors ${active ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/50"}`}
    >
      <div className="relative h-24 w-full p-2.5" style={{ background: layout.thumb }}>
        <StatsThumb kind={layout.kind} />
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="text-[10px] font-mono text-muted-foreground">{layout.n}</p>
        <p className="text-xs font-semibold">{layout.name}</p>
        <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
          {layout.blurb}
        </p>
      </div>
    </button>
  );
}

function StatsThumb({ kind }: { kind: StatsLayout["kind"] }) {
  const bar = "h-1.5 rounded-sm bg-white/30";
  if (kind === "strip") {
    return (
      <div className="flex h-full items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 flex-1 rounded bg-white/20" />
        ))}
      </div>
    );
  }
  if (kind === "heatmap") {
    return (
      <div className="grid h-full grid-cols-12 gap-0.5">
        {Array.from({ length: 48 }, (_, i) => (
          <div
            key={i}
            className="rounded-[1px] bg-emerald-400"
            style={{ opacity: 0.2 + ((i * 13) % 8) / 10 }}
          />
        ))}
      </div>
    );
  }
  if (kind === "langs" || kind === "neon") {
    return (
      <div className="flex h-full items-end gap-1 px-1">
        {[70, 45, 30, 18, 12].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-white/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  if (kind === "terminal" || kind === "pixel") {
    return (
      <div className="flex h-full flex-col justify-center gap-1 font-mono">
        <div className="h-1.5 w-4/5 rounded bg-emerald-400/50" />
        <div className="h-1.5 w-2/3 rounded bg-emerald-400/35" />
        <div className="h-8 w-full rounded border border-dashed border-emerald-400/40" />
      </div>
    );
  }
  return (
    <div className="grid h-full grid-cols-2 gap-1.5">
      <div className="rounded bg-white/10 p-1.5 space-y-1">
        <div className={bar} />
        <div className={`${bar} w-2/3`} />
        <div className={`${bar} w-1/2`} />
      </div>
      <div className="rounded bg-white/10 p-1.5 space-y-1">
        <div className={`${bar} w-1/2`} />
        <div className={bar} />
        <div className={`${bar} w-3/4`} />
      </div>
    </div>
  );
}
