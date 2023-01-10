import { Rover, createRover } from "../src/marsRover";
import { Coordinates, DirectionCoordinates, InstructionType, RoverInstructions  } from "../src/marsMission.types";
import { initialisePlateau, isInPlateauBoundaries } from "../src/marsPlateau";

export const rovers: Array<Rover> = [];

export const runMission = (
  plateauMaxCoordinates: Coordinates,
  ...roverInstructions: Array<RoverInstructions>
): Array<DirectionCoordinates> => {
  const results = new Array<DirectionCoordinates>();

  initialisePlateau(plateauMaxCoordinates);

  roverInstructions.forEach((roverInstruction) => {
    const rover = createRover(
      roverInstruction.startCoordinates.coordinates,
      roverInstruction.startCoordinates.facing
    );
    const instructionsArray = roverInstruction.instructions.split(
      ""
    ) as Array<InstructionType>;
    for (const instruction of instructionsArray) {
      if (instruction === "L") {
        rover.rotateLeft();
      } else if (instruction === "R") {
        rover.rotateRight();
      } else {
        const nextDestination = rover.getNextDestination();
        if (isInPlateauBoundaries(nextDestination) === true) {
          rover.move();
        } else {
          throw new Error(
            `Coordinates x=${nextDestination.x}, y=${nextDestination.y} is outside the Plateau's boundary.`
          );
        }
      }
    }
    results.push({ coordinates: rover.coordinates, facing: rover.facing });
  });
  return results;
};
