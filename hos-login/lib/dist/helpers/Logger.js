import path from "path";
import C from "../constants/index.js";
import "winston-daily-rotate-file";
import { createLogger, transports, format } from "winston";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const rootPath = process.env.PWD;
const transport = new transports.DailyRotateFile({
    filename: "application-%DATE%.log",
    // dirname: path.join(rootPath, `./logs/`),
    dirname: path.join('./logs/'),
    level: "info",
    handleExceptions: true,
    json: true,
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
});
transport.on("rotate", function () {
    // do something fun
});
/**
 * @description
 * ```
 * import { Logger } from "@nestcoin/guildos-core";
 * ```
 * @const Logger
 * @property {LeveledLogMethod} info
 * @property {LeveledLogMethod} warn
 * @property {LeveledLogMethod} error
 * @property {LeveledLogMethod} debug
 */
const Logger = createLogger({
    transports: [transport]
});
if (process.env.NODE_ENV !== C.Environment.PRODUCTION) {
    Logger.add(new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
        level: "debug",
    }));
}
/**
 * @description
 * ```
 * import { LoggerStream } from "@nestcoin/guildos-core";
 * ```
 * @const LoggerStream
 * @property {function(string)} write
 */
const LoggerStream = {
    write: (message) => { Logger.info(message); }
};
export { Logger, LoggerStream };
