import Oval from "../entities/Oval";
import OvalValidator from "../validators/OvalValidator";
import { DomainError } from "../errors/DomainError";

export default class OvalService {
  public static getAxes(oval: Oval): { a: number; b: number } {
    const a = Math.abs(oval.p1.x - oval.p2.x) / 2;
    const b = Math.abs(oval.p1.y - oval.p2.y) / 2;
    return { a: Math.max(a, b), b: Math.min(a, b) };
  }

  public static area(oval: Oval): number {
    OvalValidator.ensureNotCollinearWithAxes(oval);
    const { a, b } = this.getAxes(oval);
    return Math.PI * a * b;
  }

  public static perimeter(oval: Oval): number {
    OvalValidator.ensureNotCollinearWithAxes(oval);
    const { a, b } = this.getAxes(oval);
    const h = (a - b) ** 2 / (a + b) ** 2;

    return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  }

  public static intersectsSingleAxisAtDistance(
    oval: Oval,
    axis: "x" | "y",
    distance: number
  ): boolean {
    OvalValidator.ensureNotCollinearWithAxes(oval);
    if (distance < 0) {
      return false;
    }
    const centerX = (oval.p1.x + oval.p2.x) / 2;
    const centerY = (oval.p1.y + oval.p2.y) / 2;
    const { a, b } = this.getAxes(oval);
    if (axis === "x") {
      const val = (distance - centerX) ** 2 / a ** 2;
      return val <= 1;
    }
    const val = (distance - centerY) ** 2 / b ** 2;
    return val <= 1;
  }

  public static isCircle(oval: Oval): boolean {
    return OvalValidator.isCircle(oval);
  }
}
