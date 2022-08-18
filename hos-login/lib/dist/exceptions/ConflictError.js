import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class ConflictError
 */
class ConflictError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = K.ResponseMessage.ERR_CONFLICT, metaData = {}) {
        super(K.HttpStatusCode.CONFLICT, message, metaData);
    }
}
export default ConflictError;
