import config from "../config/index.js";
import UserVerifyToken from "../database/entity/UserVerifyToken.js";
import { DateTimeCalculator, RandomCodeGenerator } from "../helpers/index.js";
import { ConflictError, NotFoundError } from "../../../lib/dist/exceptions/index.js";
/**
 * @class AccountVerifyTokenService
 */
class AccountVerifyTokenService {
    /**
     * @method getVerifyAccountUrl
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<string>}
     */
    static async getVerifyAccountUrl(userId) {
        const TOKEN_SEPERATOR = ":";
        const verifyToken = await this.generateToken(userId);
        const userToken = `${verifyToken.token}${TOKEN_SEPERATOR}${userId}`;
        const encodedUserToken = Buffer.from(userToken)
            .toString("base64");
        return `${config.FRONT_END_URL}/auth/account/verify/${encodedUserToken}`;
    }
    /**
     * @method verifyAccountToken
     * @static
     * @async
     * @param {string} userId
     * @param {string} tokenToVerify
     * @returns {Promise<void>}
     */
    static async verifyAccountToken(userId, tokenToVerify) {
        let userVerifyToken = await this.checkThatTokenExistForUser(userId);
        if (userVerifyToken.token !== tokenToVerify) {
            throw new ConflictError("Invalid account verification link!");
        }
    }
    /**
     * @method generateToken
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<UserVerifyToken>}
     */
    static async generateToken(userId) {
        let verifyTokenToUpsert = await this.getByUserId(userId);
        if (!verifyTokenToUpsert) {
            verifyTokenToUpsert = new UserVerifyToken();
            verifyTokenToUpsert.userId = userId;
        }
        verifyTokenToUpsert.token = RandomCodeGenerator.get();
        verifyTokenToUpsert.expiresAt = DateTimeCalculator.getDateTimeInNext(config.ACCOUNT_VERIFY_TOKEN_TTL_IN_HOURS);
        return verifyTokenToUpsert.save();
    }
    /**
     * @method getByUserId
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<UserVerifyToken|null>}
     */
    static async getByUserId(userId) {
        return UserVerifyToken.findOne({ where: { userId } });
    }
    /**
     * @method checkThatTokenExistForUser
     * @static
     * @async
     * @param {string} userId
     * @returns {Promise<UserVerifyToken>}
     */
    static async checkThatTokenExistForUser(userId) {
        let verifyToken = await this.getByUserId(userId);
        if (verifyToken) {
            return verifyToken;
        }
        throw new NotFoundError("Invalid user token!");
    }
}
export default AccountVerifyTokenService;
