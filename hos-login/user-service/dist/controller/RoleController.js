import RoleService from "../services/RoleService.js";
import { ResponseHandler } from "../../../lib/dist/helpers/index.js";
/**
 * @class RoleController
 */
class RoleController {
    /**
     * @method getUserRoles
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async getUserRoles(req, res, next) {
        try {
            ResponseHandler.ok(res, {
                records: RoleService.getUserRoles()
            });
        }
        catch (err) {
            next(err);
        }
    }
}
export default RoleController;
