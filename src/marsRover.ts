import { Coordinates, CardinalPoint } from "../src/marsMission.types";

let roverCounter = 0;
const rotateLeftMap =[ ['N','W'], ['W','S'], ['S','E'],['E','N']];
const rotateRightMap =[ ['N','E'], ['E','S'], ['S','W'],['W','N']];

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

  rotateLeft () :void {
    this.rotate('L');
  }

  rotateRight () :void {
    this.rotate('R');
  }

  rotate (direction: 'L' | 'R') :void {
    let map;
    if (direction === 'L') {
      map = rotateLeftMap;
    } else {
      map = rotateRightMap;
    }

    const directionPair = map.find((rotation) => rotation[0] === this.facing);

    if (typeof directionPair !== "undefined") {
      this.facing =  directionPair[1] as CardinalPoint;
    }
  }

  move () :void {
    this.coordinates = this.getNextDestination();
  }

  getNextDestination() :Coordinates {
    const destination = {...this.coordinates};
    switch (this.facing) {
      case 'N':
        destination.y++;
        break;
      case 'E':
        destination.x++;
        break;
      case 'S':
        destination.y--;
        break;
      case 'W':
        destination.x--;
      default:
      // shouldn't ever get here
    }
    return destination;
  }

}


