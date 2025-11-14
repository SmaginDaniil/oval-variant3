import pino from "pino";
import fs from "fs";

const logToFile = pino(pino.destination("./oval.log"));
const consoleLogger = pino();

export { logToFile, consoleLogger };
