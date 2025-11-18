import Point from "../entities/Point";
import Point3 from "../entities/Point3";
import Oval from "../entities/Oval";
import Pyramid from "../entities/Pyramid";
import { FLOAT_REGEX } from "../types/constants";
import { DomainError } from "../errors/DomainError";

export default class ShapeFactory {
  public static createOvalFromTokens(tokens: string[]): Oval {
    if (tokens.length < 5) {
      throw new DomainError(
        "Not enough tokens to create Oval",
        "NOT_ENOUGH_TOKENS"
      );
    }
    const [id, sx1, sy1, sx2, sy2] = tokens;
    const all = [sx1, sy1, sx2, sy2];
    for (const t of all) {
      if (!FLOAT_REGEX.test(t)) {
        throw new DomainError(`Invalid numeric token: ${t}`, "INVALID_TOKEN");
      }
    }
    const x1 = Number(sx1);
    const y1 = Number(sy1);
    const x2 = Number(sx2);
    const y2 = Number(sy2);
    const p1 = new Point(x1, y1);
    const p2 = new Point(x2, y2);
    return new Oval(id, p1, p2);
  }

  public static createPyramidFromTokens(tokens: string[]): Pyramid {
    if (tokens.length < 6) {
      throw new DomainError(
        "Not enough tokens to create Pyramid",
        "NOT_ENOUGH_TOKENS"
      );
    }
    const [id, scx, scy, scz, sside, sheight] = tokens;
    const all = [scx, scy, scz, sside, sheight];
    for (const t of all) {
      if (!FLOAT_REGEX.test(t)) {
        throw new DomainError(`Invalid numeric token: ${t}`, "INVALID_TOKEN");
      }
    }
    const cx = Number(scx);
    const cy = Number(scy);
    const cz = Number(scz);
    const side = Number(sside);
    const height = Number(sheight);
    const center = new Point3(cx, cy, cz);
    return new Pyramid(id, center, side, height);
  }
}
