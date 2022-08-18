import config from "../config/index.js";
import { DateTimeCalculator, RandomCodeGenerator } from "../helpers/index.js";
import { ConflictError, NotFoundError } from "../../../lib/dist/exceptions/index.js";
import PasswordResetToken from "../database/entity/PasswordResetToken.js";
/**
 * @class PasswordResetTokenService
 */
class PasswordResetTokenService {
    /**
     * @method getResetPasswordLink
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<string>}
     */
    static async getResetPasswordLink(userId) {
        const TOKEN_SEPERATOR = ":";
        const resetToken = await this.generateToken(userId);
        const userToken = `${resetToken.token}${TOKEN_SEPERATOR}${userId}`;
        const encodedUserToken = Buffer.from(userToken)
            .toString("base64");
        return `${config.FRONT_END_URL}/auth/account/password/reset/${encodedUserToken}`;
    }
    /**
     * @method verifyPasswordResetToken
     * @static
     * @async
     * @param {string} userId
     * @param {string} tokenToVerify
     * @returns {Promise<void>}
     */
    static async verifyPasswordResetToken(userId, tokenToVerify) {
        let userResetToken = await this.checkThatTokenExistForUser(userId);
        if (userResetToken.token !== tokenToVerify) {
            throw new ConflictError("Invalid reset password verification link!");
        }
    }
    /**
     * @method generateToken
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<PasswordResetToken>}
     */
    static async generateToken(userId) {
        let passwordResetTokenToUpsert = await this.getByUserId(userId);
        if (!passwordResetTokenToUpsert) {
            passwordResetTokenToUpsert = new PasswordResetToken();
            passwordResetTokenToUpsert.userId = userId;
        }
        passwordResetTokenToUpsert.token = RandomCodeGenerator.get(60);
        passwordResetTokenToUpsert.expiresAt = DateTimeCalculator.getDateTimeInNext(config.PASSWORD_RESET_TOKEN_TTL_IN_HOURS);
        return passwordResetTokenToUpsert.save();
    }
    /**
     * @method getByUserId
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<PasswordResetToken|null>}
     */
    static async getByUserId(userId) {
        return PasswordResetToken.findOne({ where: { userId } });
    }
    /**
     * @method checkThatTokenExistForUser
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<PasswordResetToken>}
     */
    static async checkThatTokenExistForUser(userId) {
        let passwordResetToken = await this.getByUserId(userId);
        if (passwordResetToken) {
            return passwordResetToken;
        }
        throw new NotFoundError("Invalid user token!");
    }
}
export default PasswordResetTokenService;
