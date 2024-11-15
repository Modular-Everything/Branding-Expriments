import gsap from "gsap";

type Cell = HTMLElement;

export function randomCellColour(grid: Cell[][][]): void {
  const colours = {
    light: ["#9FF1FF", "#F9F9F7", "#B2B2B2"],
    dark: "transparent",
  };

  grid.forEach((row, rowIndex) => {
    row.forEach((subGrid, subGridIndex) => {
      let lastColour = "";

      subGrid.forEach((cell, cellIndex) => {
        let chosenColour;
        const randomLightColour =
          colours.light[Math.floor(Math.random() * colours.light.length)];

        if (subGridIndex === 0) {
          if (cellIndex === 0) {
            chosenColour =
              Math.random() > 0.5 ? randomLightColour : colours.dark;
          } else {
            if (lastColour === colours.dark) {
              chosenColour =
                Math.random() > 0.5 ? colours.dark : randomLightColour;
            } else {
              chosenColour = colours.dark;
            }
          }
        } else {
          const topNeighbour =
            grid[rowIndex][subGridIndex - 1][cellIndex]?.style.backgroundColor;

          if (topNeighbour === colours.dark && lastColour === colours.dark) {
            chosenColour =
              Math.random() > 0.5 ? colours.dark : randomLightColour;
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
