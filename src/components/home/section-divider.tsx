export function WaveLightsDivider({ bg = "#FFFFFF" }: { bg?: string }) {
  return (
    <div
      style={{
        background: bg,
        height: 26,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='26' viewBox='0 0 60 26'%3E%3Cpath d='M0 3 Q30 21 60 3' fill='none' stroke='%230D2A5E' stroke-opacity='.3' stroke-width='1'/%3E%3Cpath d='M15 11.6 V13.2 M30 14.6 V16.2 M45 11.6 V13.2' stroke='%230D2A5E' stroke-opacity='.45' stroke-width='1'/%3E%3Ccircle cx='15' cy='15.8' r='2.6' fill='%23F5821F'/%3E%3Ccircle cx='30' cy='18.8' r='2' fill='%230D2A5E' fill-opacity='.4'/%3E%3Ccircle cx='45' cy='15.8' r='2.6' fill='%23F5821F'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "60px 26px",
        backgroundPosition: "left top",
      }}
    />
  )
}

export function ScallopDivider({ bg = "#F7F8FA" }: { bg?: string }) {
  return (
    <div
      style={{
        background: bg,
        height: 24,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Cpath d='M0 0 H40 V2 Q20 23 0 2 Z' fill='%23FFFFFF'/%3E%3Cpath d='M0 2 Q20 23 40 2' fill='none' stroke='%23F2A03D' stroke-width='1.3'/%3E%3Cpath d='M0 2 Q20 16 40 2' fill='none' stroke='%230D2A5E' stroke-opacity='.14' stroke-width='.9'/%3E%3Ccircle cx='20' cy='14.2' r='1.7' fill='%230D2A5E' fill-opacity='.35'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "40px 24px",
        backgroundPosition: "left top",
      }}
    />
  )
}
