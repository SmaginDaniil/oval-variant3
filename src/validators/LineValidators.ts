import { DomainError } from "../errors/DomainError";
import Point from "../entities/Point";

export default class LineValidators {
  public static ensureNotAxisAligned(p1: Point, p2: Point): void {
    if (p1.x === p2.x || p1.y === p2.y) {
      throw new DomainError(
        `Points are aligned with axes: (${p1.x},${p1.y}) - (${p2.x},${p2.y})`,
        "AXIS_ALIGNED_POINTS"
      );
    }
  }

  public static ensureNotSamePoint(p1: Point, p2: Point): void {
    if (p1.x === p2.x && p1.y === p2.y) {
      throw new DomainError(
        `Points are identical: (${p1.x},${p1.y})`,
        "IDENTICAL_POINTS"
      );
    }
  }
}
