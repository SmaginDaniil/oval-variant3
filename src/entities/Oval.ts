import Point from "./Point";

export default class Oval {
  public readonly id: string;

  public readonly p1: Point;

  public readonly p2: Point;

  constructor(id: string, p1: Point, p2: Point) {
    this.id = id;
    this.p1 = p1;
    this.p2 = p2;
  }
}
