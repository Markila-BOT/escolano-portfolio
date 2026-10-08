const revealEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const sectionReveal = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, ease: revealEase },
};

export const fadeInAnimationVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.min(index * 0.04, 0.36),
      duration: 0.35,
      ease: revealEase,
    },
  }),
};
