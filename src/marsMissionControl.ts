import { Rover, createRover } from "../src/marsRover";
import {
  Coordinates,
  DirectionCoordinates,
  InstructionType,
  MissionCommands,
  RoverInstructions,
} from "../src/marsMission.types";
import { validatePlateau, isInPlateauBoundaries } from "../src/marsPlateau";

/**
 * Launch Mars Mission with the given missionCommand - creates a mars plateau
 * and validates it and then issues the commands for each rover provided
 * 
 * @param {MissionCommands} missionCommands - mission commands to run the mission
 * @returns array of finish positions for the mission's rovers
 */
export const launchMission = (missionCommands: MissionCommands): Array<DirectionCoordinates> => {
  const rovers: Array<Rover> = [];
  const results = new Array<DirectionCoordinates>();
  validatePlateau(missionCommands.plateau);
  missionCommands.roverInstructionsArray.forEach((roverInstruction) => {
    if (isInPlateauBoundaries(roverInstruction.startCoordinates.coordinates, missionCommands.plateau) !== true) {
      throw new Error(
        `Error: Rover starting coordinates x=${roverInstruction.startCoordinates.coordinates.x}, y=${roverInstruction.startCoordinates.coordinates.y} are outside the Plateau's boundary.`
      );
    }
    const rover = createRover(
      roverInstruction.startCoordinates.coordinates,
      roverInstruction.startCoordinates.facing
    );
    rovers.push(rover);
    const instructionsArray = roverInstruction.instructions.split("") as Array<InstructionType>;
    for (const instruction of instructionsArray) {
      if (instruction === "L") {
        rover.rotateLeft();
      } else if (instruction === "R") {
        rover.rotateRight();
      } else {
        const nextDestination = rover.getNextDestination();
        if (isInPlateauBoundaries(nextDestination, missionCommands.plateau) !== true) {
          throw new Error(
            `Error: Cannot move as coordinates x=${nextDestination.x}, y=${nextDestination.y} are outside the Plateau's boundary.`
          );
        } else if (rovers.find(otherRover => otherRover.id !== rover.id && otherRover.coordinates.x === nextDestination.x && otherRover.coordinates.y === nextDestination.y)) {
          throw new Error(
            `Error: Cannot move as coordinates x=${nextDestination.x}, y=${nextDestination.y} is blocked by another rover.`
          );
        } else {
          rover.move();
        }
      }
    }
    results.push({ coordinates: rover.coordinates, facing: rover.facing });
  });
  return results;
};
