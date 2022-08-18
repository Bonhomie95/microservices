import { ConflictError } from "../../../lib/dist/exceptions/index.js";
import Organization from "../database/entity/Organization.js";
/**
 * @class OrganizationService
 */
class OrganizationService {
    /**
     * @method create
     * @static
     * @async
     * @param {string} name
     * @param {string} countryCode
     * @param {string} owner
     * @returns {Promise<User>}
     */
    static async create(name, countryCode, owner) {
        await this.checkThatOwnerDoesNotHaveOrganization(owner);
        await this.checkThatRecordDoesNotExist(name, countryCode);
        let organization = new Organization();
        organization.name = name;
        organization.countryCode = countryCode;
        organization.owner = owner;
        return organization.save();
    }
    /**
     * @method checkThatOwnerDoesNotHaveOrganization
     * @static
     * @async
     * @param {string} owner
     * @returns {Promise<void>}
     */
    static async checkThatOwnerDoesNotHaveOrganization(owner) {
        const foundOrganization = await Organization.findOne({ where: { owner } });
        if (foundOrganization) {
            throw new ConflictError("Organization already exists for owner!");
        }
    }
    /**
     * @method checkThatRecordDoesNotExist
     * @static
     * @async
     * @param {string} name
     * @param {string} countryCode
     * @returns {Promise<void>}
     */
    static async checkThatRecordDoesNotExist(name, countryCode) {
        const foundOrganization = await Organization.findOne({ where: { name, countryCode } });
        if (foundOrganization) {
            throw new ConflictError(`Organization already exists with name '${name}'' in '${countryCode}'!`);
        }
    }
}
export default OrganizationService;
