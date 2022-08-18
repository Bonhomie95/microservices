import UserService from "../services/UserService";
import { NextFunction, Response } from "express";
import { ResponseHandler } from "../../../lib/dist/helpers";
import { IUserRequest } from "../../../lib/dist/interfaces";
import { ICreateUser } from "../interfaces";
import OrganizationService from "../services/OrganizationService";

/**
 * @class OrganizationController
 */
class OrganizationController {

    /**
     * @method create
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async create(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const createdOrg = await OrganizationService.create(
                req.body.name,
                req.body.countryCode,
                req.user.id
            );

            ResponseHandler.created(res, createdOrg);
        } catch(err) {
            next(err);
        }
    }

}

export default OrganizationController;