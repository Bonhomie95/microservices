import UserService from "./UserService.js";
import SessionService from "./SessionService.js";
import EmailService from "./external/EmailService.js";
import { UnauthenticatedError } from "../../../lib/dist/exceptions/index.js";
import { DevicePlatformDetector, PasswordHasher } from "../helpers/index.js";
import AccountVerifyTokenService from "./AccountVerifyTokenService.js";
import PasswordResetTokenService from "./PasswordResetTokenService.js";
/**
 * @class AuthService
 */
class AuthService {
    /**
     * @method authenticate
     * @static
     * @async
     * @param {string} email
     * @param {string} password
     * @param {string} ipAddress
     * @param {string} userAgent
     * @returns {Promise<User>}
     */
    static async authenticate(email, password, ipAddress, userAgent) {
        const user = await UserService.checkThatEmailExistForLogin(email);
        UserService.checkThatUserIsVerified(user);
        UserService.checkThatUserIsActive(user);
        this.checkThatPasswordIsValid(password, user.password);
        const userSession = await SessionService.createOrUpdatePlatformSession(user, DevicePlatformDetector.getMobileCategory(userAgent), ipAddress);
        user.lastLoginAt = new Date();
        return {
            ...await user.save(),
            authToken: userSession.token
        };
    }
    /**
     * @method verifyAccount
     * @static
     * @async
     * @param {string} userId
     * @param {string} token
     * @returns {Promise<User>}
     */
    static async verifyAccount(userId, token) {
        const user = await UserService.checkThatUserIsNotVerified(userId);
        await AccountVerifyTokenService.verifyAccountToken(userId, token);
        await UserService.markUserAccountAsVerified(user);
    }
    /**
     * @method verifyPasswordResetToken
     * @static
     * @async
     * @param {string} userId
     * @param {string} token
     * @returns {Promise<User>}
     */
    static async verifyPasswordResetToken(userId, token) {
        await PasswordResetTokenService.verifyPasswordResetToken(userId, token);
    }
    /**
     * @method resetPassword
     * @static
     * @async
     * @param {string} userId
     * @param {string} token
     * @param {string} newPassword
     * @returns {Promise<User>}
     */
    static async resetPassword(userId, token, newPassword) {
        const foundUser = await UserService.checkThatUserExist(userId);
        await PasswordResetTokenService.verifyPasswordResetToken(userId, token);
        foundUser.password = PasswordHasher.hash(newPassword);
        return foundUser.save();
    }
    /**
     * @method sendResetLink
     * @static
     * @async
     * @param {string} email
     * @returns {Promise<User>}
     */
    static async sendResetLink(email) {
        const user = await UserService.checkThatEmailExist(email);
        const RESET_PASSWORD_URL = await PasswordResetTokenService
            .getResetPasswordLink(user.id);
        (await EmailService.getInstance()).sendResetPasswordMail(email, UserService.getUserFullName(user), RESET_PASSWORD_URL);
        return user;
    }
    /**
     * @method checkThatPasswordIsValid
     * @static
     * @param {string} plainTextPasword
     * @param {string} hashedPassword
     */
    static checkThatPasswordIsValid(plainTextPasword, hashedPassword) {
        if (!PasswordHasher.verify(plainTextPasword, hashedPassword)) {
            throw new UnauthenticatedError("User credentials don't match!");
        }
    }
}
export default AuthService;
