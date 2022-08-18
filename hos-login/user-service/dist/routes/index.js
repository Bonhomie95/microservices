import Root from "./Root.js";
import Auth from "./Auth.js";
import User from "./User.js";
import Role from "./Role.js";
import Organization from "./Organization.js";
import People from "./People.js";
import { NotFoundHandler } from "../../../lib/dist/middlewares/index.js";
/**
 * @class RouteManager
 * @classdesc Manager of all API routes
 */
export default class RouteManager {
    /**
     * @name installRoutes
     * @static
     * @param {Application} app
     */
    static installRoutes(app) {
        app.use(Root);
        app.use("/auth", Auth);
        app.use("/users", User);
        app.use("/roles", Role);
        app.use("/organizations", Organization);
        app.use("/people", People);
        app.use(NotFoundHandler);
    }
}
