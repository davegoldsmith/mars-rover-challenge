import { Coordinates } from "../src/marsMission.types";

let maxCoordinates = { x: 0, y: 0 };

export const initialisePlateau = (coordinates: Coordinates) => {
  if (coordinates.x < 0 || coordinates.y < 0) {
    throw new Error("Error: x and y coordinates have to be positive");
  }
  maxCoordinates = coordinates;
};

export const isInPlateauBoundaries = (coordinates: Coordinates): boolean => {
  let isInBounds = true;
  if (
    coordinates.x < 0 ||
    coordinates.y < 0 ||
    coordinates.x > maxCoordinates.x ||
    coordinates.y > maxCoordinates.y
  ) {
    isInBounds = false;
  }
  return isInBounds;
};
