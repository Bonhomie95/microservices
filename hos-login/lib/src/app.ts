import cors from "cors";
import C from "./constants";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import { IAppOptions } from "./interfaces";
import express, { Application } from "express";
import { Logger, LoggerStream } from "./helpers";
import { GlobalErrorHandler } from "./middlewares";

dotenv.config({path: `${process.env.PWD}/.env`});

export abstract class AbstractApp {

    readonly engine: Application;
    readonly inProduction: boolean;
    protected readonly port: number;
    protected options: IAppOptions;
    protected connection: any;

    constructor(engine: Application, port: number, options?: IAppOptions) {
        this.engine = engine;
        this.port = port;
        this.options = options || {};
        this.inProduction = process.env.NODE_ENV === C.Environment.PRODUCTION;
    }

    protected abstract setupDependencies(): Promise<void>;

    protected abstract installRoutes(): void;

    protected configure(): void {
        const {
            urlencodExtended = true,
            requestSizeLimit = "20mb",
            compression: compressionOption,
            cors: corsOption,
            errors: errorOption,
        } = this.options;

        this.engine.use(helmet());
        this.engine.use(helmet.hidePoweredBy());
        this.engine.use(cookieParser());
        this.engine.use(cors(corsOption));
        this.engine.use(compression(compressionOption));
        this.engine.use(express.json({ limit: requestSizeLimit }));
        this.engine.use(express.urlencoded({ limit: requestSizeLimit, extended: urlencodExtended }));

        if(!["staging", "production"].includes(<string>process.env.NODE_ENV)) {
            this.engine.use(morgan("combined", {stream: LoggerStream}));
        }

        this.installRoutes();

        this.engine.use(GlobalErrorHandler);
    }

    async initialize() {
        await this.setupDependencies();
        this.configure();
    }

    run(): void {
        this.connection = this.engine.listen(this.port, () => {
            Logger.info(`App now running on port ${this.port}`);
        });
    }

    close() {
        this.connection?.close();
    }
}
