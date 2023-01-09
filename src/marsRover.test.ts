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

describe("Test Rover move", () => {
  const rover = new Rover({x:0, y:0}, 'N', 'Rover3');

  test("move returns 0, 1 when pointed North", () => {
    rover.move();
    expect(rover.coordinates).toEqual({x:0, y:1});
  });
  test("move returns 1, 1 when pointed East", () => {
    rover.rotateRight(); // now pointing East
    rover.move();
    expect(rover.coordinates).toEqual({x:1, y:1});
  });
  test("move returns 1, 0 when pointed South", () => {
    rover.rotateRight(); // now pointing East
    rover.move();
    expect(rover.coordinates).toEqual({x:1, y:0});
  });
  test("move returns 0, 0 when pointed West", () => {
    rover.rotateRight(); // now pointing East
    rover.move();
    expect(rover.coordinates).toEqual({x:0, y:0});
  });  
});

describe("Test Rover getDestination", () => {
  const rover = new Rover({x:0, y:0}, 'N', 'Rover4');

  test("move returns 0, 1 when pointed North", () => {
    expect(rover.getNextDestination()).toEqual({x:0, y:1});
    rover.move();
  });
  test("move returns 1, 1 when pointed East", () => {
    rover.rotateRight(); // now pointing East
    expect(rover.getNextDestination()).toEqual({x:1, y:1});
    rover.move();
  });
  test("move returns 1, 0 when pointed South", () => {
    rover.rotateRight(); // now pointing East    
    expect(rover.getNextDestination()).toEqual({x:1, y:0});
    rover.move();
  });
  test("move returns 0, 0 when pointed West", () => {
    rover.rotateRight(); // now pointing East
    expect(rover.getNextDestination()).toEqual({x:0, y:0});
  });  
});