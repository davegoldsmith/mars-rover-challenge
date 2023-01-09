import{Rover} from "../src/marsRover";

describe("Test Rover left rotation", () => {
  const rover = new Rover({x:0, y:0}, 'N', 'Rover1');

  test("rotateLeft returns 'W'", () => {
    rover.rotateLeft()
    expect(rover.facing).toEqual("W");
  });
  test("rotateLeft returns 'S'", () => {
    rover.rotateLeft()
    expect(rover.facing).toEqual("S");
  });
  test("rotateLeft returns 'E'", () => {
    rover.rotateLeft()
    expect(rover.facing).toEqual("E");
  });
  test("rotateLeft returns 'N'", () => {
    rover.rotateLeft()
    expect(rover.facing).toEqual("N");
  });
});

describe("Test Rover right rotation", () => {
  const rover2 = new Rover({x:0, y:0}, 'N', 'Rover2');

  test("rotateRight returns 'E'", () => {
    rover2.rotateRight()
    expect(rover2.facing).toEqual("E");
  });
  test("rotateRight returns 'S'", () => {
    rover2.rotateRight()
    expect(rover2.facing).toEqual("S");
  });
  test("rotateRight returns 'W'", () => {
    rover2.rotateRight()
    expect(rover2.facing).toEqual("W");
  });
  test("rotateRight returns 'N'", () => {
    rover2.rotateRight()
    expect(rover2.facing).toEqual("N");
  });
});