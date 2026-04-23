import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Inserat kostenlos erstellen | RideDirect.eu"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0D2A5E 0%, #1565C0 60%, #1E88E5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,109,0,0.15)",
          }}
        />

        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)", marginBottom: 24, letterSpacing: 2 }}>
          RIDEDIRECT<span style={{ color: "#FF6D00" }}>.EU</span>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            marginBottom: 20,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Ihr Fahrgeschäft verkaufen.<br />
          <span style={{ color: "#FF6D00" }}>Ganz Europa erreichen.</span>
        </div>

        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.80)",
            marginBottom: 48,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Kostenlos inserieren · Keine Provision · Direktkontakt
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {["🆓 Kostenlos", "🌍 29 Länder", "📩 Direktkontakt"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(255,255,255,0.13)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                padding: "12px 24px",
                color: "white",
                fontSize: 18,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
