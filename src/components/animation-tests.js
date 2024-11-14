"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { animateSkew } from "@/animations/animateSkew";
import { generateGrid } from "@/utils/generateGrid";

export function Animation() {
  const [iterate, setIterate] = useState(new Date());

  const mainGrid = useRef(null);

  useEffect(() => {
    const rowSplit = gsap.utils.random(20, 80, 10);
    const options = {
      rowSplit, // Default split percentage for row 1
      numColsRow1: gsap.utils.random(16, 24, 1), // Random number of columns for row 1
      numColsRow2: gsap.utils.random(16, 24, 1), // Random number of columns for row 2
      gap: gsap.utils.random(0, 24, 4), // Random gap between rows
      subGridRow1: gsap.utils.random(1, 4, 1), // Random number of subgrids
      subGridRow2: gsap.utils.random(1, 4, 1), // Random number of subgrids
    };

    // Initial Grid Setup
    generateGrid(mainGrid, options);

    // Find all cells
    const cells = document.querySelectorAll(".cell");

    // Animate the grid via a skew
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
