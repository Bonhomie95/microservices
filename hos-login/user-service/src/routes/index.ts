import Root from "./Root";
import Auth from "./Auth";
import User from "./User";
import Role from "./Role";
import { Application } from "express";
import Organization from "./Organization";
import { NotFoundHandler } from "../../../lib/dist/middlewares";

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
    static installRoutes(app: Application) {
        app.use(Root);
        app.use("/auth", Auth);
        app.use("/users", User);
        app.use("/roles", Role);
        app.use("/organizations", Organization);
        app.use(NotFoundHandler);
    }

}