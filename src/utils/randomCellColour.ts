import gsap from "gsap";

type Cell = HTMLElement;

export function randomCellColour(grid: Cell[][][]): void {
  const colours = {
    light: "#20D269",
    dark: "transparent",
  };

  grid.forEach((row, rowIndex) => {
    row.forEach((subGrid, subGridIndex) => {
      let lastColour = "";

      subGrid.forEach((cell, cellIndex) => {
        let chosenColour;

        if (subGridIndex === 0) {
          if (cellIndex === 0) {
            chosenColour = Math.random() > 0.5 ? colours.light : colours.dark;
          } else {
            if (lastColour === colours.dark) {
              chosenColour = Math.random() > 0.5 ? colours.dark : colours.light;
            } else {
              chosenColour = colours.dark;
            }
          }
        } else {
          const topNeighbour =
            grid[rowIndex][subGridIndex - 1][cellIndex]?.style.backgroundColor;

          if (topNeighbour === colours.dark && lastColour === colours.dark) {
            chosenColour = Math.random() > 0.5 ? colours.dark : colours.light;
          } else {
            chosenColour = colours.dark;
          }
        }

        gsap.set(cell, { backgroundColor: chosenColour });

        lastColour = chosenColour;
      });
    });
  });
}
