import { query } from "express-validator";
import BaseValidator from "./BaseValidator.js";
/**
 * @description
 * This is a validation middleware that checks only the request param for the field to be validated.
 * It extends from BaseValidator, therefore all static methods on BaseValidator exists on this class
 *
 * @class ParamValidator
 * @extends BaseValidator
 */
export default class ParamValidator extends BaseValidator {
    constructor() {
        super(...arguments);
        this.location = query;
    }
}
