import { readOvalsFromFile } from "./utils/fileReader";
import OvalService from "./services/OvalService";
import { consoleLogger, logToFile } from "./utils/logger";
import { DomainError } from "./errors/DomainError";

async function main() {
  const file = "./data/ovals.txt";
  let ovals = [];
  try {
    ovals = await readOvalsFromFile(file);
    consoleLogger.info(
      `Successfully read ${ovals.length} valid ovals from file.`
    );
  } catch (err) {
    if (err instanceof DomainError) {
      consoleLogger.error({ err }, "Domain error while reading ovals");
    } else {
      consoleLogger.error(err, "Unexpected error while reading ovals");
    }
    process.exit(1);
  }

  for (const oval of ovals) {
    try {
      const area = OvalService.area(oval);
      const perimeter = OvalService.perimeter(oval);
      const isCircle = OvalService.isCircle(oval);
      const intersectsX = OvalService.intersectsSingleAxisAtDistance(
        oval,
        "x",
        0
      );
      const intersectsY = OvalService.intersectsSingleAxisAtDistance(
        oval,
        "y",
        0
      );

      consoleLogger.info(
        {
          id: oval.id,
          area,
          perimeter,
          isCircle,
          intersectsX,
          intersectsY,
        },
        "Computed oval properties"
      );

      logToFile.info(
        {
          id: oval.id,
          area,
          perimeter,
          isCircle,
          intersectsX,
          intersectsY,
        },
        "Computed oval properties"
      );
    } catch (err) {
      if (err instanceof DomainError) {
        consoleLogger.warn(
          { err, id: oval.id },
          "Domain error during computation"
        );
      } else {
        consoleLogger.error(
          { err, id: oval.id },
          "Unexpected error during computation"
        );
      }
      continue; 
    }
  }
}

main().catch((err) => {
  consoleLogger.fatal({ err }, "Fatal error in main");
  process.exit(1);
});
