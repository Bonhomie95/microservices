var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cors from "cors";
import C from "./constants/index.js";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import { Logger, LoggerStream } from "./helpers/index.js";
import { GlobalErrorHandler } from "./middlewares/index.js";
dotenv.config({ path: `${process.env.PWD}/.env` });
export class AbstractApp {
    constructor(engine, port, options) {
        this.engine = engine;
        this.port = port;
        this.options = options || {};
        this.inProduction = process.env.NODE_ENV === C.Environment.PRODUCTION;
    }
    configure() {
        const { urlencodExtended = true, requestSizeLimit = "20mb", compression: compressionOption, cors: corsOption, errors: errorOption, } = this.options;
        this.engine.use(helmet());
        this.engine.use(helmet.hidePoweredBy());
        this.engine.use(cookieParser());
        this.engine.use(cors(corsOption));
        this.engine.use(compression(compressionOption));
        this.engine.use(express.json({ limit: requestSizeLimit }));
        this.engine.use(express.urlencoded({ limit: requestSizeLimit, extended: urlencodExtended }));
        if (!["staging", "production"].includes(process.env.NODE_ENV)) {
            this.engine.use(morgan("combined", { stream: LoggerStream }));
        }
        this.installRoutes();
        this.engine.use(GlobalErrorHandler);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupDependencies();
            this.configure();
        });
    }
    run() {
        this.connection = this.engine.listen(this.port, () => {
            Logger.info(`App now running on port ${this.port}`);
        });
    }
    close() {
        var _a;
        (_a = this.connection) === null || _a === void 0 ? void 0 : _a.close();
    }
}
