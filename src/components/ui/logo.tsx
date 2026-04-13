export function RideDirectLogo({ className }: { className?: string }) {
  const cx = 62, cy = 60, outerR = 50, innerR = 31

  const gondolas = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180)
    return {
      ox: cx + outerR * Math.cos(angle),
      oy: cy + outerR * Math.sin(angle),
    }
  })

  return (
    <svg
      viewBox="0 0 470 155"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RideDirect.eu — Europe's Amusement Ride Marketplace"
    >
      <defs>
        <linearGradient id="rdBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74D4F8" />
          <stop offset="60%" stopColor="#1E88E5" />
          <stop offset="100%" stopColor="#1253A4" />
        </linearGradient>
        <linearGradient id="rdOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA726" />
          <stop offset="60%" stopColor="#FF6D00" />
          <stop offset="100%" stopColor="#C43D00" />
        </linearGradient>
        <linearGradient id="rdWheel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#74D4F8" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>
      </defs>

      {/* ── FERRIS WHEEL ── */}
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="url(#rdWheel)" strokeWidth="2.5" />
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="url(#rdWheel)" strokeWidth="1.5" />
      {/* 12 spokes */}
      {gondolas.map((g, i) => (
        <line key={i} x1={cx} y1={cy} x2={g.ox} y2={g.oy} stroke="url(#rdWheel)" strokeWidth="1.2" />
      ))}
      {/* Gondola cars */}
      {gondolas.map((g, i) => (
        <circle key={`gc-${i}`} cx={g.ox} cy={g.oy} r="2.8" fill="url(#rdWheel)" />
      ))}
      {/* Center hub */}
      <circle cx={cx} cy={cy} r="4.5" fill="url(#rdWheel)" />
      {/* Support legs */}
      <line x1={cx - 22} y1={cy + outerR + 11} x2={cx} y2={cy + outerR - 6} stroke="url(#rdWheel)" strokeWidth="2.2" />
      <line x1={cx + 22} y1={cy + outerR + 11} x2={cx} y2={cy + outerR - 6} stroke="url(#rdWheel)" strokeWidth="2.2" />
      <line x1={cx - 26} y1={cy + outerR + 13} x2={cx + 26} y2={cy + outerR + 13} stroke="url(#rdWheel)" strokeWidth="1.5" />

      {/* ── TEXT ── */}
      {/* "Ride" */}
      <text
        x="14"
        y="133"
        fontFamily="'Arial Black', 'Impact', 'Helvetica Neue', sans-serif"
        fontSize="64"
        fontStyle="italic"
        fontWeight="900"
        fill="url(#rdBlue)"
      >
        Ride
      </text>

      {/* Blue swash under Ride */}
      <path d="M 16 140 Q 80 148 148 139" stroke="url(#rdBlue)" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />

      {/* "DIRECT" */}
      <text
        x="146"
        y="133"
        fontFamily="'Arial Black', 'Impact', 'Helvetica Neue', sans-serif"
        fontSize="71"
        fontStyle="italic"
        fontWeight="900"
        fill="url(#rdOrange)"
      >
        DIRECT
      </text>

      {/* Arrow after DIRECT */}
      <polygon points="413,103 447,118 413,133" fill="url(#rdOrange)" />

      {/* ".eu" */}
      <text
        x="451"
        y="137"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontSize="19"
        fontStyle="italic"
        fontWeight="700"
        fill="url(#rdOrange)"
      >
        .eu
      </text>

      {/* Orange swash under DIRECT */}
      <path d="M 148 141 Q 295 151 415 140" stroke="url(#rdOrange)" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />

      {/* Tagline */}
      <text
        x="235"
        y="154"
        textAnchor="middle"
        fontFamily="'Arial', 'Helvetica', sans-serif"
        fontSize="12"
        fontStyle="italic"
        fontWeight="400"
        fill="#4A5568"
        letterSpacing="0.3"
      >
        Europe's Amusement Ride Marketplace
      </text>
    </svg>
  )
}
