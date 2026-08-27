// iPhone photos default to HEIC, which uploads fine but can't be decoded by
// <img> in Chrome/Firefox/Edge (only Safari supports it natively) — silently
// breaking both the upload preview and the eventual public listing photo for
// most buyers. Convert client-side to JPEG before it ever reaches state.
export async function normalizeImageFile(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.hei[cf]$/i.test(file.name)

  if (!isHeic) return file

  try {
    const heic2any = (await import("heic2any")).default
    const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 })
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
