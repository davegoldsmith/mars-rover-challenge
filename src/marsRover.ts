import { Coordinates, CompassPoint } from "../src/marsMission.types";

let roverCounter = 0;

/**
 * Class to encapsulate the behaviour for the Mars Rover object
 * 
 */
export class Rover {
  id: string;
  coordinates: Coordinates;
  facing: CompassPoint;

  /**
   * 
   */
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

  /**
   * Mars Rover constructor
   * @param coordinates - x/y 
   * @param facing 
   * @param id 
   */
  constructor(coordinates: Coordinates, facing: CompassPoint, id?: string) {
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

    this.facing = map.get(this.facing) as CompassPoint;
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
  facing: CompassPoint
): Rover => {
  const rover = new Rover(coordinates, facing);
  return rover;
};
