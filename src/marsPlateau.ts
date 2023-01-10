import { Coordinates } from "../src/marsMission.types";

let maxCoordinates = { x: 0, y: 0 };

export const initialisePlateau = (coordinates: Coordinates) => {
  maxCoordinates = coordinates;
};

export const isInPlateauBoundaries = (coordinates: Coordinates): boolean => {
  return coordinates.x <= maxCoordinates.x && coordinates.y <= maxCoordinates.x;
};
