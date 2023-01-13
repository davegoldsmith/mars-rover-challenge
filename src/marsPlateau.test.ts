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

describe("Test given coordinates are within the Mars plateau boundaries", () => {
  const plateau = {coordinates: {x:5, y:5}};
  const validCoords = {x:1, y:1};
  const xToLowCoords = {x:-1, y:1};
  const yToLowCoords = {x:2, y:-1};
  const xToHighCoords = {x:6, y:1};
  const yToHighCoords = {x:2, y:7};  

  test("Coordinates are within boundaries, isInPlateauBoundaries() returns true", () => {
    expect(isInPlateauBoundaries(validCoords, plateau)).toEqual(true);
  });

  test("X is too low, error expected", () => {
    expect(isInPlateauBoundaries(xToLowCoords, plateau)).toEqual(false);
  }); 
  test("Y is too low, error expected", () => {
    expect(isInPlateauBoundaries(yToLowCoords, plateau)).toEqual(false);
  }); 
  test("X is too high, error expected", () => {
    expect(isInPlateauBoundaries(xToHighCoords, plateau)).toEqual(false);
  });  
  test("Y is too high, error expected", () => {
    expect(isInPlateauBoundaries(yToHighCoords, plateau)).toEqual(false);
  });      

});

