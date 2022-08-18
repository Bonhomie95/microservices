import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class NotFoundError
 */
class NotFoundError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = K.ResponseMessage.ERR_NOT_FOUND, metaData = {}) {
        super(K.HttpStatusCode.NOT_FOUND, message, metaData);
    }
}
export default NotFoundError;
