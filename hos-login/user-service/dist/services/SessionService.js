import UserSession from "../database/entity/UserSession.js";
import { DateTimeCalculator, JwtHelper } from "../helpers/index.js";
/**
 * @class SessionService
 */
class SessionService {
    /**
     * @method createOrUpdatePlatformSession
     * @static
     * @async
     * @param {User} user
     * @param {DeviceMobileCategory} platform
     * @param {string} ipAddress
     * @returns {Promise<UserSession>}
     */
    static async createOrUpdatePlatformSession(user, platform, ipAddress) {
        let userSession = await this.getUserPlatformSession(user.id, platform);
        const AUTH_TOKEN_TTL_IN_HOURS = 24;
        const AUTH_TOKEN = await this.getAuthToken(user, AUTH_TOKEN_TTL_IN_HOURS);
        userSession.token = AUTH_TOKEN;
        userSession.ipAddress = ipAddress;
        userSession.expiresAt = DateTimeCalculator.getDateTimeInNext(AUTH_TOKEN_TTL_IN_HOURS);
        return userSession.save();
    }
    /**
     * @method getUserPlatformSession
     * @static
     * @async
     * @param {string} userId
     * @param {string} platform
     * @returns {Promise<UserSession>}
     */
    static async getUserPlatformSession(userId, platform) {
        let userSession = await UserSession.findOne({ where: { userId, platform } });
        if (!userSession) {
            userSession = new UserSession();
            userSession.userId = userId;
            userSession.platform = platform;
        }
        return userSession;
    }
    /**
     * @method getAuthToken
     * @static
     * @param param0
     * @param {number} ttlInHours
     * @returns {string}
     */
    static getAuthToken({ id, userType, role }, ttlInHours) {
        const PAYLOAD = { id, userType, role };
        return JwtHelper.generateToken(PAYLOAD, `${ttlInHours}h`);
    }
}
export default SessionService;
