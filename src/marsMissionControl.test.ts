import { runMission } from "../src/marsMissionControl";
import { RoverInstructions} from "../src/marsMission.types";

describe("Test valid rover instructions to runMission", () => {
  const plateauMax = {x:5, y:5};
  const roverOneInstructions = {startCoordinates: {coordinates:{x:1, y:2}, facing: 'N'}, instructions:'LMLMLMLMM'} as RoverInstructions;
  const roverInstructions = new Array<RoverInstructions>;
  roverInstructions.push(roverOneInstructions);
  it("should return a new rover object", () => {
    expect(runMission(plateauMax, ...roverInstructions)).toEqual([{coordinates:{x:1, y:3}, facing: 'N'}]);
  });
  // it("should return 5 for add(2,3)", () => {
  //   expect(add(2, 3)).toBe(5);
  // });
});


