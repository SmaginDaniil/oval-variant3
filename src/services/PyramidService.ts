import Pyramid from "../entities/Pyramid";
import PyramidValidator from "../validators/PyramidValidator";

export default class PyramidService {
  public static baseArea(p: Pyramid): number {
    PyramidValidator.ensureValidDimensions(p);
    return p.baseSide ** 2;
  }

  public static volume(p: Pyramid): number {
    PyramidValidator.ensureValidDimensions(p);
    return (1 / 3) * this.baseArea(p) * p.height;
  }

  public static surfaceArea(p: Pyramid): number {
    PyramidValidator.ensureValidDimensions(p);
    const a = p.baseSide;
    const h = p.height;
    const l = Math.sqrt((a / 2) ** 2 + h ** 2);
    const base = a ** 2;
    const lateral = 2 * a * l;
    return base + lateral;
  }

  public static volumeRatioAbovePlane(p: Pyramid, planeZ: number): number {
    PyramidValidator.ensureValidDimensions(p);
    const baseZ = p.center.z;
    const apexZ = baseZ + p.height;
    if (planeZ >= apexZ) {
      return 0;
    }
    if (planeZ <= baseZ) {
      return 1;
    }
    const hPrime = apexZ - planeZ;
    return (hPrime / p.height) ** 3;
  }
}
