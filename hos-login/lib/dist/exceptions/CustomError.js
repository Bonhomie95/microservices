/**
 * @class CustomError
 */
class CustomError extends Error {
    /**
     * @constructor
     * @param statusCode
     * @param message
     * @param metaData
     */
    constructor(statusCode, message, metaData = {}) {
        super(message);
        this.statusCode = statusCode;
        this.metaData = metaData;
    }
}
export default CustomError;
