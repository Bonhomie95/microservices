import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class UnprocessableError
 */
class UnprocessableError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message = K.ResponseMessage.ERR_UNPROCESSABLE, metaData = {}) {
        super(K.HttpStatusCode.UNPROCESSABLE_ENTITY, message, metaData);
    }
}
export default UnprocessableError;
