import ShapeFactory from "../src/factories/ShapeFactory";
import Oval from "../src/entities/Oval";
import Point from "../src/entities/Point";
import { DomainError } from "../src/errors/DomainError";

describe("ShapeFactory", () => {
  test("creates Oval from valid tokens", () => {
    const tokens = ["o1", "0", "0", "4", "2"];
    const oval = ShapeFactory.createOvalFromTokens(tokens);
    expect(oval).toBeInstanceOf(Oval);
    expect(oval.p1).toBeInstanceOf(Point);
    expect(oval.p2).toBeInstanceOf(Point);
  });

  test("throws error on insufficient tokens", () => {
    const tokens = ["o2", "0", "0", "4"];
    expect(() => ShapeFactory.createOvalFromTokens(tokens)).toThrow(
      DomainError
    );
  });

  test("throws error on invalid numeric token", () => {
    const tokens = ["o3", "0", "a", "4", "2"];
    expect(() => ShapeFactory.createOvalFromTokens(tokens)).toThrow(
      DomainError
    );
  });
});
