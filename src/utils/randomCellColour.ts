import gsap from "gsap";

interface Cell {
  style: {
    backgroundColor: string;
  };
}

export function randomCellColour(cells: Cell[]): void {
  const colours = { dominant: "transparent", accent: "#20D269" };

  let lastColour = "";

  cells.forEach((cell) => {
    let chosenColour;

    if (lastColour === colours.accent || Math.random() > 0.6) {
      chosenColour = colours.dominant;
    } else {
      chosenColour = colours.accent;
    }

    gsap.set(cell, { backgroundColor: chosenColour });

    lastColour = chosenColour;
  });
}
