import { createRover } from "../src/marsMissionControl";
import { Rover } from "../src/marsRover";

describe("test addRover function", () => {
  const rover1 = new Rover({x:0, y:0}, 'N', 'Rover1');
  it("should return a new rover object", () => {
    expect(createRover({x:0, y:0}, 'N')).toEqual(rover1);
  });
  // it("should return 5 for add(2,3)", () => {
  //   expect(add(2, 3)).toBe(5);
  // });
});
