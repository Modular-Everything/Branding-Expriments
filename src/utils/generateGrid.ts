import { populateRow } from "./populateRow";

export function generateGrid(
  mainGrid: React.MutableRefObject<HTMLDivElement>,
  options: {
    rowSplit: number;
    numColsRow1: number;
    numColsRow2: number;
    gap: number;
    subGridRow1: number;
    subGridRow2: number;
  }
) {
  const { rowSplit, numColsRow1, numColsRow2, gap, subGridRow1, subGridRow2 } =
    options;

  mainGrid.current.innerHTML = ""; // Clear previous grid
  mainGrid.current.style.gap = `${gap}px`;

  // Create Row 1
  const row1 = document.createElement("div");
  row1.className = "row";
  row1.style.flex = `${rowSplit}`;

  // Create subgrids for row 1
  for (let i = 0; i < subGridRow1; i++) {
    const subGridElement = document.createElement("div");
    subGridElement.className = "sub-grid";
    subGridElement.style.flex = `${100 / subGridRow1}`;
    populateRow(subGridElement, numColsRow1);
    row1.appendChild(subGridElement);
  }

  // Append Row 1 to main grid
  mainGrid.current.appendChild(row1);

  // Create Row 2
  const row2 = document.createElement("div");
  row2.className = "row";
  row2.style.flex = `${100 - rowSplit}`;

  // Create subgrids for row 2
  for (let i = 0; i < subGridRow2; i++) {
    const subGridElement = document.createElement("div");
    subGridElement.className = "sub-grid";
    subGridElement.style.flex = `${100 / subGridRow2}`;
    populateRow(subGridElement, numColsRow2);
    row2.appendChild(subGridElement);
  }

  // Append Row 2 to main grid
  mainGrid.current.appendChild(row2);
}
