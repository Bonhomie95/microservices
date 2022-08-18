import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class BadRequestError
 */
class BadRequestError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = K.ResponseMessage.ERR_BAD_REQUEST, metaData = {}) {
        super(K.HttpStatusCode.BAD_REQUEST, message, metaData);
    }
}
export default BadRequestError;
