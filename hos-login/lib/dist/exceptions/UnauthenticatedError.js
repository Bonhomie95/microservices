import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class UnauthenticatedError
 */
class UnauthenticatedError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = K.ResponseMessage.ERR_UNAUTHENTICATED, metaData = {}) {
        super(K.HttpStatusCode.UNAUTHENTICATED, message, metaData);
    }
}
export default UnauthenticatedError;
