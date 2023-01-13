/**
 * Union type compass point for direction that rover is facing in
 */
export type CompassPoint = "N" | "E" | "S" | "W";
/**
 * Union type for rover instruction type, 
 * L - Rotate Left
 * M - Move forward
 * R - Rotate Right
 */
export type InstructionType = "L" | "M" | "R";

/**
 * Coordinates 
 */
export interface Coordinates {
  x: number;
  y: number;
  facing?: CompassPoint;
}

/**
 * Mars plateau, currently only coordinates
 */
export interface MarsPlateau {
  coordinates: Coordinates;
}

/**
 * Direction coordinates, x and y coordinates and facing direction
 */
export interface DirectionCoordinates {
  coordinates: Coordinates;
  facing: CompassPoint;
}

/**
 * Instructions for a rover : starting coordinates and instructions
 * command string
 */
export interface RoverInstructions {
  startCoordinates: DirectionCoordinates;
  instructions: string;
}

/**
 * Mission commands: plateau and array of rover instructions
 */
export interface MissionCommands {
  plateau: MarsPlateau;
  roverInstructionsArray: RoverInstructions[];
}
