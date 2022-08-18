import C from "../constants/index.js";
import { HttpStatusCode } from "../constants/HttpStatusCode.js";
/**
 * @description
 * ```
 * import { ResponseHandler } from "@nestcoin/guildos-core";
 * ```
 * @class ResponseHandler
 */
export default class ResponseHandler {
    /**
     * @method send
     * @param {Response} res Express response object
     * @param {HttpStatusCode} statusCode Response status code
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static send(res, statusCode, data, message = C.ResponseMessage.SUCCESS) {
        return res.status(statusCode).json(data || { message });
    }
    /**
     * @method ok
     * @param {Response} res Express response object
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static ok(res, data, message = C.ResponseMessage.OK) {
        return ResponseHandler.send(res, HttpStatusCode.SUCCESS, data, message);
    }
    /**
     * @method created
     * @param {Response} res Express response object
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static created(res, data, message = C.ResponseMessage.CREATED) {
        return ResponseHandler.send(res, HttpStatusCode.CREATED, data, message);
    }
    /**
     * @method accepted
     * @param {Response} res Express response object
     * @param {object} [data] Response data
     * @param {string} [message] Optional response message
     * @memberOf ResponseHandler
     */
    static accepted(res, data, message = C.ResponseMessage.ACCEPTED) {
        return ResponseHandler.send(res, HttpStatusCode.ACCEPTED, data, message);
    }
    /**
     * @method redirect
     * @param {Response} res Express response object
     * @param {string} url Url to redirect to
     * @param {RedirectStatusCode} [statusCode=301] Redirect status code, accept either 301 or 302
     * @memberOf ResponseHandler
     */
    static redirect(res, url) {
        return res.status(HttpStatusCode.REDIRECT_TEMP).redirect(url);
    }
}
