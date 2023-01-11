import { Coordinates, CardinalPoint } from "../src/marsMission.types";

let roverCounter = 0;

export class Rover {
  id: string;
  coordinates: Coordinates;
  facing: CardinalPoint;

  private static rotateLeftMap = new Map([
    ["N", "W"],
    ["W", "S"],
    ["S", "E"],
    ["E", "N"],
  ]);
  private static rotateRightMap = new Map([
    ["N", "E"],
    ["E", "S"],
    ["S", "W"],
    ["W", "N"],
  ]);

  constructor(coordinates: Coordinates, facing: CardinalPoint, id?: string) {
    if (typeof id === "undefined") {
      this.id = `Rover${++roverCounter}`;
    } else {
      this.id = id;
    }
    this.coordinates = coordinates;
    this.facing = facing;
  }

  rotateLeft(): void {
    this.rotate("L");
  }

  rotateRight(): void {
    this.rotate("R");
  }

  private rotate(direction: "L" | "R"): void {
    let map;
    if (direction === "L") {
      map = Rover.rotateLeftMap;
    } else {
      map = Rover.rotateRightMap;
    }

    this.facing = map.get(this.facing) as CardinalPoint;
  }

  move(): void {
    this.coordinates = this.getNextDestination();
  }

  getNextDestination(): Coordinates {
    const destination = { ...this.coordinates };
    switch (this.facing) {
      case "N":
        destination.y++;
        break;
      case "E":
        destination.x++;
        break;
      case "S":
        destination.y--;
        break;
      case "W":
        destination.x--;
      default:
      // shouldn't ever get here
    }
    return destination;
  }
}
export const createRover = (
  coordinates: Coordinates,
  facing: CardinalPoint
): Rover => {
  const rover = new Rover(coordinates, facing);
  return rover;
};
