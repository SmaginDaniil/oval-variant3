import fs from "fs/promises";
import path from "path";
import { readOvalsFromFile } from "../src/utils/fileReader";
import Oval from "../src/entities/Oval";
import { consoleLogger } from "../src/utils/logger";

describe("FileReader", () => {
  const testFilePath = path.join(__dirname, "test_ovals.txt");

  beforeAll(async () => {
    const content = `
oval1 0 0 4 2
oval2 1 1 1 1
badline abc 1 2 3
oval3 0 0 2 2
`;
    await fs.writeFile(testFilePath, content);
  });

  afterAll(async () => {
    await fs.unlink(testFilePath);
  });

  test("reads only valid ovals", async () => {
    const ovals = await readOvalsFromFile(testFilePath);
    expect(ovals.length).toBe(3);
    expect(ovals.every((o) => o instanceof Oval)).toBe(true);
  });

  test("skips invalid lines and logs warnings", async () => {
    const spy = jest.spyOn(consoleLogger, "warn").mockImplementation(() => {});
    await readOvalsFromFile(testFilePath);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
