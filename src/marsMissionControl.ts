type CardinalPoint = "N" | "E" | "S" | "W";

interface Coordinates {
  x: number;
  y: number;
}

interface RoverInterface {
  id: string;
  coordinates: Coordinates;
  facing: CardinalPoint;
}

export class Rover {
  id: string;
  coordinates: Coordinates;
  facing: CardinalPoint;

  constructor(coordinates: Coordinates, facing: CardinalPoint, id?: string) {
    if (typeof id === "undefined") {
      this.id = `Rover${++roverCounter}`;
    } else {
      this.id = id;
    }
    this.coordinates = coordinates;
    this.facing = facing;
  }
}

let roverCounter = 0;
const rovers: Rover[] = [];

export const createRover = (
  coordinates: Coordinates,
  facing: CardinalPoint
): Rover => {
  const rover: RoverInterface = new Rover(coordinates, facing);
  rovers.push(rover);
  console.log("created Rover => " + rover.id);
  return rover;
};
