import { Rover, createRover } from "../src/marsRover";
import {
  Coordinates,
  DirectionCoordinates,
  InstructionType,
  RoverInstructions,
} from "../src/marsMission.types";
import { initialisePlateau, isInPlateauBoundaries } from "../src/marsPlateau";

/**
 * Launch Mars Mission
 * @param plateauMaxCoordinates maximum x/y coordinates for plateau
 * @param roverInstructions array of rover startpoint/instructions
 * @returns array of rover final positions (x/y coordinates and facing direction)
 */
export const launchMission = (
  plateauMaxCoordinates: Coordinates,
  ...roverInstructions: Array<RoverInstructions>
): Array<DirectionCoordinates> => {
  const rovers: Array<Rover> = [];
  const results = new Array<DirectionCoordinates>();
  initialisePlateau(plateauMaxCoordinates);
  roverInstructions.forEach((roverInstruction) => {
    const rover = createRover(
      roverInstruction.startCoordinates.coordinates,
      roverInstruction.startCoordinates.facing
    );
    rovers.push(rover);
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
        if (isInPlateauBoundaries(nextDestination) !== true) {
          throw new Error(
            `Error: Coordinates x=${nextDestination.x}, y=${nextDestination.y} is outside the Plateau's boundary.`
          );
        } else if (rovers.find(otherRover => otherRover.id !== rover.id && otherRover.coordinates.x === nextDestination.x && otherRover.coordinates.y === nextDestination.y)) {
          throw new Error(
            `Error: Coordinates x=${nextDestination.x}, y=${nextDestination.y} is blocked by another rover.`
          );

        } else {
          rover.move();
        }
        // const found = rovers.find((otherRover) => {
        //   let found = false;
        //   if (otherRover.id !== rover.id) {
        //     if(otherRover.coordinates.x === nextDestination.x && otherRover.coordinates.y === nextDestination.y) {
        //       found = true;
        //     }
        //   }
        //   return found;          
        // });

      }
    }
    results.push({ coordinates: rover.coordinates, facing: rover.facing });
  });
  return results;
};
