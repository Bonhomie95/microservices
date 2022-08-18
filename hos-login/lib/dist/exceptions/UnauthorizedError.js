import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class UnauthorizedError
 */
class UnauthorizedError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = K.ResponseMessage.ERR_UNAUTHENTICATED, metaData = {}) {
        super(K.HttpStatusCode.UNAUTHORIZED, message, metaData);
    }
}
export default UnauthorizedError;
