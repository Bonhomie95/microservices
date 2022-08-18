import config from "../config/index.js";
import JWT from "jsonwebtoken";
import { UnauthenticatedError } from "../../../lib/dist/exceptions/index.js";
/**
 * @class JwtHelper
 */
class JwtHelper {
    /**
     * @method generateToken
     * @static
     * @param {object} payload
     * @param {string} expiresIn
     * @returns {string}
     */
    static generateToken(payload, expiresIn) {
        if (!expiresIn) {
            return JWT.sign(payload, config.JWT_TOKEN_SECRET);
        }
        return JWT.sign(payload, config.JWT_TOKEN_SECRET, { expiresIn });
    }
    /**
     * @method verifyToken
     * @static
     * @param {string} token
     * @returns {string|JwtPayload}
     */
    static verifyToken(token) {
        try {
            return JWT.verify(token, config.JWT_TOKEN_SECRET);
        }
        catch (err) {
            throw new UnauthenticatedError(err.message);
        }
    }
}
export default JwtHelper;
