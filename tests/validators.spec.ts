import Oval from "../src/entities/Oval";
import Point from "../src/entities/Point";
import OvalValidator from "../src/validators/OvalValidator";
import { DomainError } from "../src/errors/DomainError";

describe("OvalValidator", () => {
  test("throws for zero width or height", () => {
    const o1 = new Oval("v1", new Point(0, 0), new Point(0, 2));
    const o2 = new Oval("v2", new Point(0, 0), new Point(2, 0));
    expect(() => OvalValidator.ensureNotCollinearWithAxes(o1)).toThrow(
      DomainError
    );
    expect(() => OvalValidator.ensureNotCollinearWithAxes(o2)).toThrow(
      DomainError
    );
  });

  test("isCircle detects equality", () => {
    const o = new Oval("v3", new Point(1, 1), new Point(3, 3));
    expect(OvalValidator.isCircle(o)).toBe(true);
  });

  test("isCircle detects non-equality", () => {
    const o = new Oval("v4", new Point(0, 0), new Point(2, 3));
    expect(OvalValidator.isCircle(o)).toBe(false);
  });
});
