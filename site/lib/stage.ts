// Shared, mutable state between the DOM sections and the single home-page canvas.
// Scroll handlers write, the render loop reads. No React re-renders per frame.
export const stage = {
  hero: 0, // hero scroll progress 0..1
  story: 0, // story scroll progress 0..1
  px: 0, // pointer -1..1
  py: 0,
  scene: "hero" as "hero" | "story",
  heroEl: null as HTMLElement | null,
  storyEl: null as HTMLElement | null,
  onHero: null as null | ((p: number, color: number, light: number) => void),
  onStory: null as null | ((q: number) => void),
};
