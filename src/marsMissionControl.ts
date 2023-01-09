import { Rover } from "../src/marsRover";
import { Coordinates, CardinalPoint } from "../src/marsMission.types";

const rovers: Rover[] = [];

export const createRover = (coordinates: Coordinates, facing: CardinalPoint): Rover => {
  const rover = new Rover(coordinates, facing);
  rovers.push(rover);
  return rover;
};
