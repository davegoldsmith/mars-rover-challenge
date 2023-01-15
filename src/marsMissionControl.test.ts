import { launchMission } from "./marsMissionControl";
import { RoverInstructions } from "./marsMission.types";

describe("Test valid rover instructions to runMission", () => {
  const marsPlateau = {coordinates:{ x: 5, y: 5 }};
  const roverOneInstructions = {
    startCoordinates: { coordinates: { x: 1, y: 2 }, facing: "N" },
    instructions: "LMLMLMLMM",
  } as RoverInstructions;
  const roverTwoInstructions = {
    startCoordinates: { coordinates: { x: 3, y: 3 }, facing: "E" },
    instructions: "MMRMMRMRRM",
  } as RoverInstructions;
  const roverInstructions = new Array<RoverInstructions>();

  test("Test single rover1 : should return x=1, y=3 & facing=North", () => {
    const mission1 = {plateau: marsPlateau, roverInstructionsArray: [roverOneInstructions]};
    expect(launchMission(mission1)).toEqual([
      { coordinates: { x: 1, y: 3 }, facing: "N" },
    ]);
  });
  test("Test single rover2: should return x=5, y=1 and facing=East", () => {
    const mission2 = {plateau: marsPlateau, roverInstructionsArray: [roverTwoInstructions]};
    expect(launchMission(mission2)).toEqual([
      { coordinates: { x: 5, y: 1 }, facing: "E" },
    ]);
  });  
  test("Test 2 Rovers : should return x=1, y=3 & facing=North; x=5, y=1 and facing=East", () => {
    roverInstructions.push(roverOneInstructions);
    roverInstructions.push(roverTwoInstructions);
    const mission3 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(launchMission(mission3)).toEqual([
      { coordinates: { x: 1, y: 3 }, facing: "N" },
      { coordinates: { x: 5, y: 1 }, facing: "E" },
    ]);
  });
});

describe("Test plateau boundary error situations", () => {  
  const marsPlateau = {coordinates: { x: 5, y: 5 }};
  const yToLowRoverInstructions = {
    startCoordinates: { coordinates: { x: 1, y: 1 }, facing: "S" },
    instructions: "MM",
  } as RoverInstructions;
  const xToLowRoverInstructions = {
    startCoordinates: { coordinates: { x: 1, y: 1 }, facing: "W" },
    instructions: "MM",
  } as RoverInstructions;
  const xToHighRoverInstructions = {
    startCoordinates: { coordinates: { x: 4, y: 1 }, facing: "E" },
    instructions: "MM",
  } as RoverInstructions;
  const yToHighRoverInstructions = {
    startCoordinates: { coordinates: { x: 1, y: 4 }, facing: "N" },
    instructions: "MM",
  } as RoverInstructions;    
  let roverInstructions = new Array<RoverInstructions>();
  roverInstructions.push(yToLowRoverInstructions);  

  test("Error when Destination y coordinate less than 0", () => {
    const mission1 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(() => launchMission(mission1)).toThrowError(
      "Error: Cannot move as coordinates x=1, y=-1 are outside the Plateau's boundary."
    );
  });  
  test("Error when Destination x coordinate less than 0", () => {
    roverInstructions = [];
    roverInstructions.push(xToLowRoverInstructions);
    const mission2 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(() => launchMission(mission2)).toThrowError(
      "Error: Cannot move as coordinates x=-1, y=1 are outside the Plateau's boundary."
    );
  });  
  test("Error when Destination y coordinate greater than 5 (max boundary)", () => {
    roverInstructions = [];
    roverInstructions.push(yToHighRoverInstructions);
    const mission3 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(() => launchMission(mission3)).toThrowError(
      "Error: Cannot move as coordinates x=1, y=6 are outside the Plateau's boundary."
    );
  });  
  test("Error when Destination x coordinate greater than 5 (max boundary)", () => {
    roverInstructions = [];
    roverInstructions.push(xToHighRoverInstructions);
    const mission4 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(() => launchMission(mission4)).toThrowError(
      "Error: Cannot move as coordinates x=6, y=1 are outside the Plateau's boundary."
    );
  }); 

  test("Error when Rover's initial position x coordinate greater than 5 (max boundary)", () => {
    const startOutsideRoverInstructions = {
      startCoordinates: { coordinates: { x: 6, y: 5 }, facing: "N" },
      instructions: "MM",
    } as RoverInstructions; 
    
    roverInstructions = [];
    roverInstructions.push(startOutsideRoverInstructions);
    const mission5 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(() => launchMission(mission5)).toThrowError(
      "Error: Rover starting coordinates x=6, y=5 are outside the Plateau's boundary."
    );
  }); 

});

describe("Test collision situations", () => {  
  const marsPlateau = {coordinates:{ x: 3, y: 3 }};
  const rover1Instructions = {
    startCoordinates: { coordinates: { x: 0, y: 0 }, facing: "N" },
    instructions: "MRMLMRM",
  } as RoverInstructions;
  const rover2Instructions = {
    startCoordinates: { coordinates: { x: 0, y: 0 }, facing: "E" },
    instructions: "MMLMM",
  } as RoverInstructions;    
  let roverInstructions = new Array<RoverInstructions>();
  roverInstructions.push(rover1Instructions);
  roverInstructions.push(rover2Instructions);
  
  test("Tests that a rover2 is blocked by rover1", () => {
    const mission1 = {plateau: marsPlateau, roverInstructionsArray: roverInstructions};
    expect(() => launchMission(mission1)).toThrowError(
      "Error: Cannot move as coordinates x=2, y=2 is blocked by another rover."
    );
  });   

});
