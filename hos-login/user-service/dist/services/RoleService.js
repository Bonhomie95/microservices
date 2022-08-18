import { UserRole } from "../constants/index.js";
/**
 * @class RoleService
 */
class RoleService {
    /**
     * @method getUserRoles
     * @static
     * @returns {string[]}
     */
    static getUserRoles() {
        return Object.values(UserRole);
    }
}
export default RoleService;
