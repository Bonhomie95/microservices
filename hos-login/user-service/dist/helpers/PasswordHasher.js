import bcrypt from "bcryptjs";
/**
 * @class PasswordHasher
 */
class PasswordHasher {
    /**
     * @name hash
     * @static
     * @memberof PasswordHasher
     * @param plainTextPasword
     * @returns
     */
    static hash(plainTextPasword) {
        if (!plainTextPasword) {
            throw new Error("Invalid plain-text password");
        }
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainTextPasword, salt);
    }
    /**
     * @name verify
     * @static
     * @memberof PasswordHasher
     * @param plainTextPasword
     * @param hashedPassword
     * @returns
     */
    static verify(plainTextPasword, hashedPassword) {
        return bcrypt.compareSync(plainTextPasword, hashedPassword);
    }
}
export default PasswordHasher;
