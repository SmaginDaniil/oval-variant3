import Oval from "../entities/Oval";
import { DomainError } from "../errors/DomainError";

export default class OvalValidator {
  public static ensureNotCollinearWithAxes(oval: Oval): void {
    const width = Math.abs(oval.p1.x - oval.p2.x);
    const height = Math.abs(oval.p1.y - oval.p2.y);
    if (width === 0 || height === 0) {
      throw new DomainError(
        "Invalid Oval: width or height is zero",
        "DEGENERATE_OVAL"
      );
    }
  }

  public static isCircle(oval: Oval): boolean {
    const width = Math.abs(oval.p1.x - oval.p2.x);
    const height = Math.abs(oval.p1.y - oval.p2.y);
    return Math.abs(width - height) < Number.EPSILON;
  }
}
