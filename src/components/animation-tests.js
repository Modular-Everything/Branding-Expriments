"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { createNoise2D } from "simplex-noise";
import Alea from "alea";
import { calculateEffectiveWidth } from "@/helpers/calculateEffectiveWidth";
import { calculateMaxSkew } from "@/helpers/calculateMaxSkew";

export function Animation() {
  const [iterate, setIterate] = useState(new Date());

  const mainGrid = useRef(null);

  useEffect(() => {
    const rowSplit = gsap.utils.random(10, 80, 10); // Default split percentage for row 1
    const numColsRow1 = gsap.utils.random(16, 24, 1); // Random number of columns for row 1
    const numColsRow2 = gsap.utils.random(16, 24, 1); // Random number of columns for row 2
    const gap = gsap.utils.random(0, 24, 4); // Random gap between rows

    function generateGrid() {
      mainGrid.current.innerHTML = ""; // Clear previous grid
      mainGrid.current.style.gap = `${gap}px`;

      // Create Row 1
      const row1 = document.createElement("div");
      row1.className = "row";
      row1.style.flex = `${rowSplit}`;
      populateRow(row1, numColsRow1);
      mainGrid.current.appendChild(row1);

      // Create Row 2
      const row2 = document.createElement("div");
      row2.className = "row";
      row2.style.flex = `${100 - rowSplit}`;
      populateRow(row2, numColsRow2);
      mainGrid.current.appendChild(row2);
    }

    function populateRow(row, numCols) {
      for (let i = 0; i < numCols; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
      }
    }

    // Initial Grid Setup
    generateGrid();

    const seed = Math.random() * 10;
    const prng = Alea(seed);
    const noise2D = createNoise2D(prng);

    function perlinNoiseGenerator(index) {
      // Generates a noise value between -1 and 1 based on the index
      const noiseValue = noise2D(index * 0.1, 0);

      // Maps the noise value from -1...1 to the desired skew range (e.g., -20...20 degrees).
      return mapRange(noiseValue, -1, 1, -20, 20);
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    // Perlin Noise Pattern
    function animateSkew(cells) {
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

    const cells = document.querySelectorAll(".cell");
    animateSkew(cells);
  }, [iterate]);

  useEffect(() => {
    // Regenerate Grid
    const reloadButton = document.querySelector("#reload");
    reloadButton.addEventListener("click", () => {
      const date = new Date();
      setIterate(date);
    });
  }, []);

  return <div ref={mainGrid} className="main-grid"></div>;
}
