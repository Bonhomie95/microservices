import K from "../constants/index.js";
import CustomError from "./CustomError.js";
/**
 * @class BadRequestError
 */
class ServerError extends CustomError {
    /**
     * @constructor
     * @param message
     * @param metaData
     */
    constructor(message, metaData = {}) {
        super(K.HttpStatusCode.SERVER_ERROR, message, metaData);
    }
}
export default ServerError;
