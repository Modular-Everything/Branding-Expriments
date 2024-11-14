import Alea from "alea";

import { createNoise2D } from "simplex-noise";
import { mapRange } from "./mapRange";

// Generates a random seed
const seed = Math.random() * 10;

// Creates a pseudo-random number generator based on the seed
const prng = Alea(seed);

// Creates a 2D noise function based on the seed
const noise2D = createNoise2D(prng);

export function perlinNoiseGenerator(index: number) {
  // Generates a noise value based on the index
  const noiseValue = noise2D(index * 0.4, 0);

  // Maps the noise value from -1...1 to the desired skew range (e.g., -20...20 degrees).
  return mapRange(noiseValue, -1, 1, -20, 20);
}
