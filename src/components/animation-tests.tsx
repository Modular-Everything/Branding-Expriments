"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import { animateSkew } from "@/animations/animateSkew";
import { generateGrid } from "@/utils/generateGrid";
import { randomCellColour } from "@/utils/randomCellColour";
import { mapCellsTo2DArray } from "@/helpers/mapCellsTo2DArray";

type Cell = HTMLElement;

export function Animation() {
  const [iterate, setIterate] = useState(new Date());

  const mainGrid = useRef<HTMLDivElement>({
    current: null,
  } as unknown as HTMLDivElement);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const cells = useRef<NodeListOf<Element> | null>(null);

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

    // Get all cells
    cells.current = document.querySelectorAll(".cell");
    const cellsGrid = mapCellsTo2DArray(
      Array.from(cells.current as NodeListOf<HTMLElement>),
      options.numColsRow1,
      options.numColsRow2,
      options.subGridRow1,
      options.subGridRow2
    );

    randomCellColour(cellsGrid);

    // Animate the grid via a skew
    // animateSkew(Array.from(cells.current) as Cell[]);
  }, [iterate]);

  useEffect(() => {
    tl.current = gsap.timeline();

    // Regenerate Grid
    const reloadButton = document.querySelector("#reload");
    reloadButton?.addEventListener("click", () => {
      const date = new Date();
      setIterate(date);
    });
  }, []);

  return <div ref={mainGrid} className="main-grid"></div>;
}
