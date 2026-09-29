// Stable ref callback: scrolls an element into view once, when it mounts.
// Used on form error banners that render at the top of long forms, which were
// otherwise off-screen when the user pressed submit at the bottom (the button
// looked like it did nothing).
export function scrollIntoViewRef(el: HTMLElement | null) {
  el?.scrollIntoView({ behavior: "smooth", block: "center" })
}
