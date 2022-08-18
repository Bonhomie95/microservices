import AuthService from "../services/AuthService.js";
import { ResponseHandler } from "../../../lib/dist/helpers/index.js";
/**
 * @class AuthController
 */
class AuthController {
    /**
     * @method login
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userWithToken = await AuthService.authenticate(email, password, req.ip, req.headers["user-agent"] || "");
            delete userWithToken.password;
            ResponseHandler.ok(res, userWithToken, "Logged-in successfully!");
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method verifyAccount
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async verifyAccount(req, res, next) {
        try {
            const { userId, token } = req.params;
            await AuthService.verifyAccount(userId, token);
            ResponseHandler.ok(res, undefined, "Account verified successfully!");
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method sendResetLink
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async sendResetLink(req, res, next) {
        try {
            const { email } = req.body;
            await AuthService.sendResetLink(email);
            ResponseHandler.ok(res, undefined, "Password reset link sent successfully!");
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method verifyPasswordResetToken
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async verifyPasswordResetToken(req, res, next) {
        try {
            const { userId, token } = req.params;
            await AuthService.verifyPasswordResetToken(userId, token);
            ResponseHandler.ok(res, undefined, "Password reset token verified successfully!");
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @method resetPassword
     * @static
     * @async
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {object}
     */
    static async resetPassword(req, res, next) {
        try {
            const { userId } = req.params, { token, password } = req.body;
            await AuthService.resetPassword(userId, token, password);
            ResponseHandler.ok(res, undefined, "Password reset successfully!");
        }
        catch (err) {
            next(err);
        }
    }
}
export default AuthController;
