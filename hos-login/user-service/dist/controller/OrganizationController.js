import { ResponseHandler } from "../../../lib/dist/helpers/index.js";
import OrganizationService from "../services/OrganizationService.js";
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
    static async create(req, res, next) {
        try {
            const createdOrg = await OrganizationService.create(req.body.name, req.body.countryCode, req.user.id);
            ResponseHandler.created(res, createdOrg);
        }
        catch (err) {
            next(err);
        }
    }
}
export default OrganizationController;
