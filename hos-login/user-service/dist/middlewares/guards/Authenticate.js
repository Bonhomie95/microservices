import { JwtHelper } from "../../helpers/index.js";
import { UnauthenticatedError } from "../../../../lib/dist/exceptions/index.js";
/**
 * @function Authenticate
 * @description Middleware to perform authentication in API routes
 * @param {IUserRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const Authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const authToken = _checkThatValidTokenFormatIsProvided(authHeader);
        const authPayload = JwtHelper.verifyToken(authToken);
        req.user = authPayload;
        next();
    }
    catch (err) {
        next(err);
    }
};
/**
 * @function _checkThatValidTokenFormatIsProvided
 * @param {string|undefined} authToken
 * @returns {string} auth token
 */
const _checkThatValidTokenFormatIsProvided = (authToken) => {
    let splitToken;
    if (!authToken ||
        (splitToken = authToken.split(" ")).length !== 2 ||
        splitToken[0].toLowerCase() !== "bearer" ||
        !splitToken[1]) {
        throw new UnauthenticatedError("Invalid token!");
    }
    return splitToken[1];
};
export default Authenticate;
