import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D2A5E",
          borderRadius: "7px",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Ferris wheel simplified */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="11" r="9" stroke="#1E88E5" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="20" stroke="#1E88E5" strokeWidth="1" />
          <line x1="3" y1="11" x2="21" y2="11" stroke="#1E88E5" strokeWidth="1" />
          <line x1="5.6" y1="4.6" x2="18.4" y2="17.4" stroke="#1E88E5" strokeWidth="1" />
          <line x1="18.4" y1="4.6" x2="5.6" y2="17.4" stroke="#1E88E5" strokeWidth="1" />
          <circle cx="12" cy="11" r="1.8" fill="#1E88E5" />
          <circle cx="12" cy="2" r="1.3" fill="white" />
          <circle cx="18.4" cy="4.6" r="1.3" fill="white" />
          <circle cx="21" cy="11" r="1.3" fill="white" />
          <circle cx="18.4" cy="17.4" r="1.3" fill="white" />
          <circle cx="12" cy="20" r="1.3" fill="white" />
          <circle cx="5.6" cy="17.4" r="1.3" fill="white" />
          <circle cx="3" cy="11" r="1.3" fill="white" />
          <circle cx="5.6" cy="4.6" r="1.3" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
