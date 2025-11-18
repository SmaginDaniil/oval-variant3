import Pyramid from "../src/entities/Pyramid";
import Point3 from "../src/entities/Point3";
import PyramidService from "../src/services/PyramidService";
import PyramidValidator from "../src/validators/PyramidValidator";

describe("Pyramid", () => {
  test("base area and volume and surface area", () => {
    const p = new Pyramid("py1", new Point3(0, 0, 0), 2, 3);
    expect(PyramidValidator.isPyramid(p)).toBe(true);
    const base = PyramidService.baseArea(p);
    const vol = PyramidService.volume(p);
    const sa = PyramidService.surfaceArea(p);
    expect(base).toBe(4);
    expect(Math.abs(vol - (1 / 3) * 4 * 3)).toBeLessThan(1e-9);
    expect(sa).toBeGreaterThan(base);
    expect(sa).toBeGreaterThan(0);
  });

  test("volume ratio after slicing with plane z", () => {
    const p = new Pyramid("py2", new Point3(1, 2, 0), 4, 3);
    const ratio = PyramidService.volumeRatioAbovePlane(p, 2);
    expect(ratio).toBeGreaterThan(0);
    expect(Math.abs(ratio - (1 / 27))).toBeLessThan(1e-9);
    expect(PyramidService.volumeRatioAbovePlane(p, -1)).toBe(1);
    expect(PyramidService.volumeRatioAbovePlane(p, 3)).toBe(0);
  });
});
