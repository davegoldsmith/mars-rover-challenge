import { Coordinates, MarsPlateau } from "../src/marsMission.types";

/**
 * Check that the given plateau object is valid
 * 
 * @param {MarsPlateau} plateau - mars plateau to validate
 */
export const validatePlateau = (plateau: MarsPlateau) :boolean => {
  if (plateau.coordinates.x < 0 || plateau.coordinates.y < 0) {
    throw new Error("Error: Mars Plateau x and y coordinates have to be positive");
  }
  return true;
};

/**
 * Checks to see if the given coordinates are within the boundaries of the given plateau
 * 
 * @param {Coordinate} checkCoordinates - coordinates to check
 * @param {MarsPlateau} plateau - plateau to check 
 * @returns true if the given coordinates are within the boundaries of the given plateau otherwise false
 */
export const isInPlateauBoundaries = (
  checkCoordinates: Coordinates,
  plateau: MarsPlateau
): boolean => {
  return (
    checkCoordinates.x >= 0 &&
    checkCoordinates.y >= 0 &&
    checkCoordinates.x <= plateau.coordinates.x &&
    checkCoordinates.y <= plateau.coordinates.y
  );
};
