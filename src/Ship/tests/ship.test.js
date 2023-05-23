import Ship from "../ship";

describe("Ship tests", () => {
  test("Medium ship length is 4", () => {
    const ship = Ship(4);
    expect(ship.len()).toBe(4);
  });

  test("Medium ship of length 4 cannot be hit 5 times", () => {
    const ship = Ship(4);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(3);
    expect(ship.hit()).toBe(4);
    expect(ship.hit()).toBe("Ship cannot be hit more than its length");
  });

  test("Medium ship of length 4 is hit 2 times", () => {
    const ship = Ship(4);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
  });

  test("Medium ship of length 4 is hit 2 times, it has not sunk", () => {
    const ship = Ship(4);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.isSink()).toBeFalsy();
  });

  test("Medium ship of length 4 is hit 4 times, the ship has sunk!", () => {
    const ship = Ship(4);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(3);
    expect(ship.hit()).toBe(4);
    expect(ship.isSink()).toBeTruthy();
  });
});
