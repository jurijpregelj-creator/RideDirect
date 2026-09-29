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

// Full-size phone photos (12–48 MP) held as previews add up to hundreds of MB
// of decoded bitmaps; on iPhone that gets the tab killed and reloaded, wiping
// everything the seller typed. Shrink to a sensible listing size up front —
// also makes uploads much faster on mobile data.
const MAX_DIMENSION = 2000
const MAX_UNTOUCHED_BYTES = 2_500_000

async function loadImage(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; release: () => void }> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file)
      return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() }
    } catch {
      // fall through to <img>
    }
  }
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.src = url
  await img.decode()
  return { source: img, width: img.naturalWidth, height: img.naturalHeight, release: () => URL.revokeObjectURL(url) }
}

/** Downscales large photos to JPEG; returns the original on any failure. */
export async function downscaleImageFile(file: File): Promise<File> {
  if (file.type === "image/gif") return file // keep animation
  let loaded: Awaited<ReturnType<typeof loadImage>> | null = null
  try {
    loaded = await loadImage(file)
    const { width, height } = loaded
    if (Math.max(width, height) <= MAX_DIMENSION && file.size <= MAX_UNTOUCHED_BYTES) return file

    const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    const ctx = canvas.getContext("2d")
    if (!ctx) return file
    ctx.drawImage(loaded.source, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85))
    canvas.width = canvas.height = 0 // free canvas memory right away (iOS keeps it otherwise)
    if (!blob || blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" })
  } catch (err) {
    console.error("[image] Downscale failed, keeping original:", err)
    return file
  } finally {
    loaded?.release()
  }
}

/** Splits picked files into usable ones and the names of rejected ones. */
export async function normalizeImageFiles(files: File[]): Promise<{ files: File[]; rejected: string[] }> {
  // One at a time: decoding several full-size photos in parallel is exactly
  // the memory spike that crashes mobile Safari/Chrome.
  const results: (File | null)[] = []
  for (const f of files) {
    const normalized = await normalizeImageFile(f)
    results.push(normalized ? await downscaleImageFile(normalized) : null)
  }
  return {
    files: results.filter((f): f is File => f !== null),
    rejected: files.filter((_, i) => results[i] === null).map((f) => f.name),
  }
}

/** Fills the {files} placeholder of the localized errorImageFormat message. */
export function imageFormatError(template: string, rejected: string[]): string | null {
  return rejected.length ? template.replace("{files}", rejected.join(", ")) : null
}
