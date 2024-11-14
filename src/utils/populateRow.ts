interface Row {
  appendChild: (cell: HTMLElement) => void;
}

export function populateRow(row: Row, numCols: number): void {
  for (let i = 0; i < numCols; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    row.appendChild(cell);
  }
}
