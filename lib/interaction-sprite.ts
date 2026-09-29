export const interactionSprite = {
  navigate: [0, 120],
  theme: [200, 120],
  open: [400, 140],
  close: [600, 120],
  success: [800, 160],
  error: [1000, 140],
  greeting: [1300, 1500],
} satisfies Record<string, [number, number]>;

export type SoundCue = keyof typeof interactionSprite;
