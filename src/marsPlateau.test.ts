import {validatePlateau, isInPlateauBoundaries} from "./marsPlateau";

describe("Test validation of plateau", () => {
  const validPlateau = {coordinates: {x:5, y:5}};
  const inValidXPlateau = {coordinates: {x:-1, y:0}};
  const inValidYPlateau = {coordinates: {x:0, y:-9}};

  test("Plateau coordinates are valid, validatePlateau should return without error", () => {
    expect(validatePlateau(validPlateau)).toEqual(true);
  });

  test("Error when plateau x coordinate less than 0", () => {
    expect(() => validatePlateau(inValidXPlateau)).toThrowError(
      "Error: Mars Plateau x and y coordinates have to be positive"
    );
  }); 

  test("Error when plateau y coordinate less than 0", () => {
    expect(() => validatePlateau(inValidYPlateau)).toThrowError(
      "Error: Mars Plateau x and y coordinates have to be positive"
    );
  }); 

});

