/**
 * @function Authorize
 * @description Middleware to perform authorization in API routes
 * @param {string[]} roles
 * @param {boolean} specifiedAllowed
 * @returns
 */
const Authorize = (roles = [], specifiedAllowed = true) => {
    return (req, res, next) => {
        try {
            // TODO: Implementation to verify authorized role-access
            // throw new UnauthorizedError("Access denied!");
            // next();
        }
        catch (err) {
            next(err);
        }
    };
};
export default Authorize;
