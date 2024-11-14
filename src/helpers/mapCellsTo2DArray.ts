type Cell = HTMLElement;

export function mapCellsTo2DArray(
  cells: Cell[],
  numColsRow1: number,
  numColsRow2: number,
  subGridRow1: number,
  subGridRow2: number
): Cell[][][] {
  const grid = [];

  const row1: Cell[][] = [];
  for (let i = 0; i < subGridRow1; i++) {
    row1.push(cells.slice(i * numColsRow1, (i + 1) * numColsRow1));
  }
  grid.push(row1);

  const row2: Cell[][] = [];
  for (let i = 0; i < subGridRow2; i++) {
    const remainingCells = cells.filter((el) => !row1.flat().includes(el));
    row2.push(remainingCells.slice(i * numColsRow2, (i + 1) * numColsRow2));
  }
  grid.push(row2);

  return grid;
}
