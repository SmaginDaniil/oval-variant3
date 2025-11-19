import fs from "fs/promises";
import path from "path";
import ShapeFactory from "../factories/ShapeFactory";
import { FLOAT_REGEX } from "../types/constants";
import { DomainError } from "../errors/DomainError";
import { logToFile, consoleLogger } from "./logger";

export async function readOvalsFromFile(relPath: string) {
  const filePath = path.isAbsolute(relPath)
    ? relPath
    : path.join(process.cwd(), relPath);
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  const lines = content.split(/\r?\n/).filter((l) => l.trim() !== "");
  const result = [];
  for (const raw of lines) {
    const line = raw.replace(/#.*/u, "").trim();
    if (line === "") {
      continue;
    }
    const tokens = line.split(/\s+/);
    try {
      if (tokens.length < 5) {
        throw new DomainError("Too few tokens", "TOO_FEW");
      }

      const numericTokens = tokens.slice(1);
      for (const t of numericTokens) {
        if (!FLOAT_REGEX.test(t)) {
          throw new DomainError(`Bad numeric token: ${t}`, "BAD_NUM");
        }
      }
      const oval = ShapeFactory.createOvalFromTokens(tokens);
      result.push(oval);
    } catch (err) {
      try {
        consoleLogger.warn({ err, line: raw }, "Skipping invalid line");
      } catch (_) {}
      try {
        logToFile.warn({ err, line: raw }, "Skipping invalid line");
      } catch (_) {}
      continue;
    }
  }
  return result;
}
