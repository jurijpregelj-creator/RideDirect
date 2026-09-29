// iPhone photos default to HEIC, which uploads fine but can't be decoded by
// <img> in Chrome/Firefox/Edge (only Safari supports it natively) — silently
// breaking both the upload preview and the eventual public listing photo for
// most buyers. Convert client-side to JPEG before it ever reaches state.

// heic2any can hang forever on some HEIC variants (and on a stuck chunk load),
// which left the upload box spinning with no way out. Cap each conversion and
// fall back to the original file.
const HEIC_TIMEOUT_MS = 30_000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms)
    promise.then(
      (v) => { clearTimeout(timer); resolve(v) },
      (e) => { clearTimeout(timer); reject(e) },
    )
  })
}

export async function normalizeImageFile(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.hei[cf]$/i.test(file.name)

  if (!isHeic) return file

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
    console.error("[HEIC] Conversion failed, using original file:", err)
    return file
  }
}

export async function normalizeImageFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map(normalizeImageFile))
}
