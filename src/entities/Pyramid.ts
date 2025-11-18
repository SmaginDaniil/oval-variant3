import Point3 from "./Point3";

export default class Pyramid {
  public readonly id: string;

  public readonly center: Point3;

  public readonly baseSide: number;

  public readonly height: number;

  constructor(id: string, center: Point3, baseSide: number, height: number) {
    this.id = id;
    this.center = center;
    this.baseSide = baseSide;
    this.height = height;
  }
}
