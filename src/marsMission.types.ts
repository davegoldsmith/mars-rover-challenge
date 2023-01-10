export type CardinalPoint = "N" | "E" | "S" | "W";
export type InstructionType = "L" | "M" | "R";

export interface Coordinates {
  x: number;
  y: number;
}

export interface DirectionCoordinates {
  coordinates: Coordinates;
  facing: CardinalPoint;
}

export interface RoverInstructions {
  startCoordinates: DirectionCoordinates;
  instructions: string;
}
