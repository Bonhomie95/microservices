import { UserRole, SubscriptionPlan } from "../../constants";
import { BodyValidator, checkRequestValidations } from "../../../../lib/dist/middlewares";

/**
 * @class OrganizationValidator
 */
class OrganizationValidator {

    /**
     * @method checkCreate
     * @static
     * @returns {any[]}
     */
    static checkCreate(): any[] {
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