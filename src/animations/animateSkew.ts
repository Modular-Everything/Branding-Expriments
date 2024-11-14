import gsap from "gsap";
import { calculateEffectiveWidth } from "@/helpers/calculateEffectiveWidth";
import { calculateMaxSkew } from "@/helpers/calculateMaxSkew";
import { perlinNoiseGenerator } from "@/helpers/perlinNoiseGenerator";

interface Cell {
  offsetWidth: number;
  offsetHeight: number;
}

export function animateSkew(cells: Cell[]): void {
  const skewThreshold = 0.6; // Threshold to decide which cells are part of a skewed group

  cells.forEach((cell, i) => {
    const noiseValue = perlinNoiseGenerator(i);
    if (noiseValue > skewThreshold) {
      let skewX = perlinNoiseGenerator(i); // Noise-based skew value
      const originalWidth = cell.offsetWidth;
      const cellHeight = cell.offsetHeight;

      const maxSkew = calculateMaxSkew(originalWidth, cellHeight);

      skewX = Math.max(-maxSkew, Math.min(skewX, maxSkew)); // Clamp skew value
      skewX = -skewX;

      const newWidth = calculateEffectiveWidth(
        originalWidth,
        cellHeight,
        skewX
      );

      gsap.to(cell, {
        transformOrigin: "bottom left",
        skewX,
        width: `${newWidth}px`,
        duration: 1,
        ease: "expo.out",
        repeat: 0,
        yoyo: true,
        delay: 0.5,
      });
    }
  });
}
