// iPhone photos default to HEIC, which uploads fine but can't be decoded by
// <img> in Chrome/Firefox/Edge (only Safari supports it natively) — silently
// breaking both the upload preview and the eventual public listing photo for
// most buyers. Convert client-side to JPEG before it ever reaches state.

// heic2any can hang forever on some HEIC variants (and on a stuck chunk load),
// which left the upload box spinning with no way out. Cap each conversion.
const HEIC_TIMEOUT_MS = 30_000

// Formats every major browser can display. Anything else (a HEIC we failed to
// convert, TIFF, RAW, PDF...) would upload but show up broken for buyers, so
// it's rejected and the seller is asked to convert it themselves.
const DISPLAYABLE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]
const DISPLAYABLE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms)
    promise.then(
      (v) => { clearTimeout(timer); resolve(v) },
      (e) => { clearTimeout(timer); reject(e) },
    )
  })
}

/** Returns a browser-displayable file, or null if the format can't be used. */
export async function normalizeImageFile(file: File): Promise<File | null> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.hei[cf]$/i.test(file.name)

  if (!isHeic) {
    const displayable = file.type ? DISPLAYABLE_TYPES.includes(file.type) : DISPLAYABLE_EXT.test(file.name)
    return displayable ? file : null
  }

  try {
    const result = await withTimeout(
      import("heic2any").then(({ default: heic2any }) =>
        heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 }),
      ),
      HEIC_TIMEOUT_MS,
    )
    const converted = Array.isArray(result) ? result[0] : result
    const newName = file.name.replace(/\.hei[cf]$/i, ".jpg")
    return new File([converted], newName, { type: "image/jpeg" })
  } catch (err) {
    console.error("[HEIC] Conversion failed, rejecting file:", err)
    return null
  }
}

/** Splits picked files into usable ones and the names of rejected ones. */
export async function normalizeImageFiles(files: File[]): Promise<{ files: File[]; rejected: string[] }> {
  const results = await Promise.all(files.map(normalizeImageFile))
  return {
    files: results.filter((f): f is File => f !== null),
    rejected: files.filter((_, i) => results[i] === null).map((f) => f.name),
  }
}

/** Fills the {files} placeholder of the localized errorImageFormat message. */
export function imageFormatError(template: string, rejected: string[]): string | null {
  return rejected.length ? template.replace("{files}", rejected.join(", ")) : null
}
