import { NotFoundError } from "../exceptions/index.js";
/**
 * @description
 * This is a validation middleware that checks all request location for the field to be validated
 *
 * @function notFoundHandler
 * @param {Request} req Express req object
 */
export default (req) => {
    throw new NotFoundError(`Method [${req.method}] not found for route [${req.originalUrl}]`);
};
