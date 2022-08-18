import "reflect-metadata";
import RouteManager from "./routes/index.js";
import { AbstractApp } from "../../lib/dist/app.js";
import PostgreSqlConnector from "./database/connectors/PostgreSqlConnector.js";
import connectDB from "./database/config/mongodb.js";
/**
 * @class App
 */
class App extends AbstractApp {
    dbConnector;
    /**
     * @method installRoutes
     * @returns {void}
     */
    installRoutes() {
        RouteManager.installRoutes(this.engine);
    }
    /**
     * @method setupDependencies
     * @async
     * @returns {Promise<void>}
     */
    async setupDependencies() {
        connectDB();
        this.dbConnector = new PostgreSqlConnector();
        await this.dbConnector.connect();
    }
    /**
     * @method checkDependencies
     * @returns {void}
     */
    checkDependencies() {
        if (!PostgreSqlConnector.getClient()) {
            throw new Error("Initialize DB!!!");
        }
    }
    /**
     * @method close
     */
    close() {
        this.dbConnector?.disconnect();
        super.close();
    }
}
export default App;
