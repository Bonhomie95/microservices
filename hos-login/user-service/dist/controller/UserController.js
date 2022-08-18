import UserService from "../services/UserService.js";
import { ResponseHandler } from "../../../lib/dist/helpers/index.js";
/**
 * @class UserController
 */
class UserController {
    /**
     * @method createUser
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async createUser(req, res, next) {
        try {
            const { email, password, firstName, lastName, role, subscriptionPlan } = req.body;
            const createUserData = {
                email,
                password,
                firstName,
                lastName,
                role,
                subscriptionPlan
            };
            const createdUser = await UserService.createUser(createUserData);
            ResponseHandler.created(res, createdUser);
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method getProfile
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async getProfile(req, res, next) {
        try {
            const foundUser = await UserService.checkThatUserExist(req.user.id);
            delete foundUser.password;
            ResponseHandler.ok(res, foundUser);
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method changePassword
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async changePassword(req, res, next) {
        try {
            const { password, newPassword } = req.body;
            await UserService.changePassword({
                userId: req.user.id,
                password,
                newPassword
            });
            ResponseHandler.ok(res, undefined, "Password changed successfully!");
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method updateProfile
     * @static
     * @async
     * @param {IUserRequest} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async updateProfile(req, res, next) {
        try {
            const { firstName, lastName, phoneNumber, dateOfBirth } = req.body;
            const updateData = { firstName, lastName, phoneNumber, dateOfBirth };
            const updatedProfile = await UserService.updateProfile(req.user.id, updateData);
            ResponseHandler.ok(res, updatedProfile, "Profile updated successfully!");
        }
        catch (err) {
            next(err);
        }
    }
}
export default UserController;
