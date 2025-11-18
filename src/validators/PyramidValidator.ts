import Pyramid from "../entities/Pyramid";
import { DomainError } from "../errors/DomainError";

export default class PyramidValidator {
  public static ensureValidDimensions(pyramid: Pyramid): void {
    if (pyramid.baseSide <= 0) {
      throw new DomainError("Invalid Pyramid: base side must be positive", "INVALID_BASE_SIDE");
    }
    if (pyramid.height <= 0) {
      throw new DomainError("Invalid Pyramid: height must be positive", "INVALID_HEIGHT");
    }
  }

  public static isPyramid(pyramid: Pyramid): boolean {
    try {
      this.ensureValidDimensions(pyramid);
      return true;
    } catch (e) {
      return false;
    }
  }
}
