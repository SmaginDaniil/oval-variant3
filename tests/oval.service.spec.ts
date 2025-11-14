import Oval from "../src/entities/Oval";
import Point from "../src/entities/Point";
import OvalService from "../src/services/OvalService";
import { DomainError } from "../src/errors/DomainError";

describe("OvalService", () => {
  test("area and perimeter for normal oval", () => {
    const o = new Oval("o1", new Point(0, 0), new Point(4, 2));
    const area = OvalService.area(o);
    const perim = OvalService.perimeter(o);
    expect(area).toBeGreaterThan(0);
    expect(perim).toBeGreaterThan(0);
    expect(Math.abs(area - Math.PI * 2 * 1)).toBeLessThan(1e-9);
  });

  test("isCircle true for square bounding box", () => {
    const o = new Oval("o2", new Point(0, 0), new Point(2, 2));
    expect(OvalService.isCircle(o)).toBe(true);
  });

  test("isCircle false for non-square oval", () => {
    const o = new Oval("o3", new Point(0, 0), new Point(3, 2));
    expect(OvalService.isCircle(o)).toBe(false);
  });

  test("intersectsSingleAxisAtDistance works for x and y axes", () => {
    const o = new Oval("o4", new Point(-2, -1), new Point(2, 1));
    expect(OvalService.intersectsSingleAxisAtDistance(o, "x", 2)).toBe(true);
    expect(OvalService.intersectsSingleAxisAtDistance(o, "x", 2.1)).toBe(false);
    expect(OvalService.intersectsSingleAxisAtDistance(o, "y", 0)).toBe(true);
    expect(OvalService.intersectsSingleAxisAtDistance(o, "y", -1.1)).toBe(
      false
    );
  });

  test("throws error for degenerate oval (zero width)", () => {
    const o = new Oval("o5", new Point(1, 1), new Point(1, 3));
    expect(() => OvalService.area(o)).toThrow(DomainError);
    expect(() => OvalService.perimeter(o)).toThrow(DomainError);
  });
});
