import User from "../database/entity/User";
import { IChangePassword, ICreateUser, IUpdateProfile } from "../interfaces";
import { PasswordHasher } from "../helpers";
import EmailService from "./external/EmailService";
import AccountVerifyTokenService from "./AccountVerifyTokenService";
import { ConflictError, NotFoundError, UnauthenticatedError, UnprocessableError } from "../../../lib/dist/exceptions";
import AuthService from "./AuthService";
import Organization from "../database/entity/Organization";

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
    static async create(name: string, countryCode: string, owner: string): Promise<Organization> {
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
    private static async checkThatOwnerDoesNotHaveOrganization(owner: string): Promise<void> {
        const foundOrganization = await Organization.findOne({ where: { owner } });

        if(foundOrganization) { throw new ConflictError("Organization already exists for owner!"); }
    }

    /**
     * @method checkThatRecordDoesNotExist
     * @static
     * @async
     * @param {string} name 
     * @param {string} countryCode 
     * @returns {Promise<void>}
     */
    private static async checkThatRecordDoesNotExist(name: string, countryCode: string): Promise<void> {
        const foundOrganization = await Organization.findOne({ where: { name, countryCode } });

        if(foundOrganization) {
            throw new ConflictError(`Organization already exists with name '${name}'' in '${countryCode}'!`);
        }
    }

}

export default OrganizationService;