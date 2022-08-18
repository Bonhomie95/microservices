import { BodyValidator, checkRequestValidations } from "../../../../lib/dist/middlewares/index.js";
/**
 * @class OrganizationValidator
 */
class OrganizationValidator {
    /**
     * @method checkCreate
     * @static
     * @returns {any[]}
     */
    static checkCreate() {
        return [
            BodyValidator.checkNonEmptyString("name")
                .trim()
                .toUpperCase(),
            BodyValidator.checkNonEmptyString("countryCode")
                .isAlpha()
                .isLength({ min: 2, max: 2 })
                .toUpperCase(),
            checkRequestValidations()
        ];
    }
}
export default OrganizationValidator;
