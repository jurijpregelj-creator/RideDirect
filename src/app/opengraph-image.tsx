import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "RideDirect.eu — European Amusement Ride Marketplace"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0D2A5E 0%, #1E88E5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: -2 }}>
          RideDirect<span style={{ color: "#FF6D00" }}>.eu</span>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)", marginBottom: 40, textAlign: "center", maxWidth: 800 }}>
          Europe's B2B Marketplace for Amusement Rides & Attractions
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["Verified B2B Sellers", "29 European Countries", "Free to List & Browse"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "10px 20px",
                color: "rgba(255,255,255,0.9)",
                fontSize: 16,
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
