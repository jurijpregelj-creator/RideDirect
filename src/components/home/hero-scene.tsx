export function HeroScene() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg
        viewBox="0 0 1440 460"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: "auto", maxHeight: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hs-dusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2A03D" stopOpacity=".16" />
            <stop offset="55%" stopColor="#F2A03D" stopOpacity=".04" />
            <stop offset="100%" stopColor="#0B1730" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hs-veil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1730" stopOpacity=".78" />
            <stop offset="60%" stopColor="#0B1730" stopOpacity=".44" />
            <stop offset="100%" stopColor="#0D2A5E" stopOpacity=".62" />
          </linearGradient>
        </defs>

        <ellipse cx="620" cy="430" rx="900" ry="300" fill="url(#hs-dusk)" />

        <g stroke="rgba(242,160,61,.30)" strokeWidth="1.4" fill="none">
          <path d="M-20 42 Q 180 118 380 46 Q 580 118 780 46 Q 980 118 1180 46 Q 1340 104 1460 52" />
        </g>
        <g fill="#F2A03D" opacity=".55">
          <circle cx="80" cy="76" r="2.6" /><circle cx="180" cy="98" r="2.6" /><circle cx="280" cy="88" r="2.6" />
          <circle cx="480" cy="78" r="2.6" /><circle cx="580" cy="100" r="2.6" /><circle cx="680" cy="86" r="2.6" />
          <circle cx="880" cy="78" r="2.6" /><circle cx="980" cy="100" r="2.6" /><circle cx="1080" cy="86" r="2.6" />
          <circle cx="1280" cy="82" r="2.6" /><circle cx="1380" cy="70" r="2.6" />
        </g>

        {/* Ferris wheel */}
        <g transform="translate(790 55)">
          <g stroke="rgba(255,255,255,.40)" strokeWidth="2.2" fill="none">
            <circle cx="300" cy="180" r="140" />
            <circle cx="300" cy="180" r="128" />
            <circle cx="300" cy="180" r="96" />
            <path d="M160 180 H440 M421 110 L179 250 M370 59 L230 301 M300 40 V320 M230 59 L370 301 M179 110 L421 250" />
            <path d="M421 110 L370 301 M370 59 L179 250 M300 40 L160 180 M230 59 L179 110" strokeOpacity=".45" strokeWidth="1.2" />
            <path d="M300 180 L226 344 M300 180 L374 344 M255 282 L345 282 M204 344 H396" />
            <path d="M239 312 L361 312" strokeOpacity=".5" strokeWidth="1.4" />
          </g>
          <g stroke="rgba(255,255,255,.34)" strokeWidth="1.5" fill="#071023" fillOpacity=".55">
            <path d="M431 188 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M412 118 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M361 67 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M291 48 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M221 67 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M170 118 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M151 188 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M170 258 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M221 309 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M291 328 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M361 309 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
            <path d="M412 258 h18 v6 q0 6 -9 6 q-9 0 -9 -6 z" />
          </g>
          <circle cx="300" cy="180" r="14" fill="#0D2A5E" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
          <circle cx="300" cy="180" r="5" fill="#F2A03D" />
          <g fill="#F2A03D">
            <circle cx="440" cy="180" r="4.4" /><circle cx="421" cy="110" r="4.4" /><circle cx="370" cy="59" r="4.4" />
            <circle cx="300" cy="40" r="4.4" /><circle cx="230" cy="59" r="4.4" /><circle cx="179" cy="110" r="4.4" />
            <circle cx="160" cy="180" r="4.4" /><circle cx="179" cy="250" r="4.4" /><circle cx="230" cy="301" r="4.4" />
            <circle cx="300" cy="320" r="4.4" /><circle cx="370" cy="301" r="4.4" /><circle cx="421" cy="250" r="4.4" />
          </g>
        </g>

        {/* Carousel */}
        <g transform="translate(470 150)" stroke="rgba(255,255,255,.38)" strokeWidth="2.2" fill="none">
          <path d="M0 150 Q 110 44 220 150" />
          <path d="M22 150 Q 110 68 198 150" strokeOpacity=".5" strokeWidth="1.4" />
          <path d="M0 150 q13.75 17 27.5 0 q13.75 17 27.5 0 q13.75 17 27.5 0 q13.75 17 27.5 0 q13.75 17 27.5 0 q13.75 17 27.5 0 q13.75 17 27.5 0 q13.75 17 27.5 0" />
          <path d="M110 44 V14 M110 14 H152 L139 27 H110" />
          <path d="M110 60 V252" strokeOpacity=".6" />
          <circle cx="110" cy="120" r="7" strokeOpacity=".55" strokeWidth="1.4" />
          <circle cx="110" cy="176" r="7" strokeOpacity=".55" strokeWidth="1.4" />
          <path d="M25 162 V252 M63 168 V252 M157 168 V252 M195 162 V252" strokeWidth="1.8" />
          <path d="M14 196 h22 v14 q0 5 -11 5 q-11 0 -11 -5 z M146 196 h22 v14 q0 5 -11 5 q-11 0 -11 -5 z" fill="#071023" fillOpacity=".5" strokeWidth="1.5" />
          <path d="M-8 252 H228 M-8 264 H228" />
          <path d="M6 252 V264 M42 252 V264 M78 252 V264 M114 252 V264 M150 252 V264 M186 252 V264 M216 252 V264" strokeOpacity=".4" strokeWidth="1.2" />
          <path d="M228 264 l16 12 h-16" />
        </g>
        <g transform="translate(470 150)" fill="#F2A03D" opacity=".7">
          <circle cx="0" cy="150" r="3.6" /><circle cx="55" cy="122" r="3.6" /><circle cx="110" cy="112" r="3.6" />
          <circle cx="165" cy="122" r="3.6" /><circle cx="220" cy="150" r="3.6" />
        </g>

        {/* Coaster hill */}
        <g transform="translate(60 205)" stroke="rgba(255,255,255,.30)" strokeWidth="2.2" fill="none">
          <path d="M0 166 L90 64 L180 166" />
          <path d="M0 166 q15 15 30 0 q15 15 30 0 q15 15 30 0 q15 15 30 0 q15 15 30 0 q15 15 30 0" />
          <path d="M0 166 V182 M180 166 V182" />
          <path d="M68 182 V158 Q90 144 112 158 V182" />
          <path d="M90 64 V38 M90 38 H126 L115 50 H90" />
          <path d="M45 115 L90 64 L135 115" strokeOpacity=".4" strokeWidth="1.2" />
          <path d="M200 166 L268 92 L336 166" />
          <path d="M200 166 q8.5 12 17 0 q8.5 12 17 0 q8.5 12 17 0 q8.5 12 17 0 q8.5 12 17 0 q8.5 12 17 0 q8.5 12 17 0 q8.5 12 17 0" />
          <path d="M200 166 V182 M336 166 V182" />
          <path d="M268 92 V64 M268 64 H300 L290 75 H268" />
          <path d="M360 182 V148 H424 V182 M352 148 H432 M392 148 V134" />
          <path d="M352 148 q13 12 26 0 q13 12 26 0 q13 12 26 0" strokeOpacity=".55" strokeWidth="1.4" />
          <path d="M-20 182 H460" />
        </g>

        <rect x="0" y="382" width="1440" height="80" fill="#071023" opacity=".85" />
        <rect x="0" y="0" width="1440" height="460" fill="url(#hs-veil)" />
      </svg>
    </div>
  )
}
