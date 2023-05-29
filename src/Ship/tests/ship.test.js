import Ship from "../Ship";

describe("Ship tests", () => {
  test("A patrol boat is of size/ length 2", () => {
    const ship = Ship("patrol boat", 2);
    expect(ship.size()).toBe(2);
  });

  test("A patrol boat of size/ length 2 is hit once", () => {
    const ship = Ship("patrol boat", 2);
    expect(ship.hit()).toBe(1);
  });

  test("A patrol boat of size/ length 2 is hit 2 times to sink it", () => {
    const ship = Ship("patrol boat", 2);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(true);
  });

  test("A submarine of size/ length 3 is hit 3 times to sink it", () => {
    const ship = Ship("submarine", 3);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(true);
  });

  test("A destroyer of size/ length 3 is hit 3 times to sink it", () => {
    const ship = Ship("destroyer", 3);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(true);
  });

  test("A battleship of size/ length 4 is hit 4 times to sink it", () => {
    const ship = Ship("battleship", 4);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(3);
    expect(ship.hit()).toBe(true);
  });

  test("A carrier of size/ length 5 is hit 5 times to sink it", () => {
    const ship = Ship("carrier", 5);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(3);
    expect(ship.hit()).toBe(4);
    expect(ship.hit()).toBe(true);
  });
});
