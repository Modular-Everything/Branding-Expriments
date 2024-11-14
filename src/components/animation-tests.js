"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { animateSkew } from "@/animations/animateSkew";

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
