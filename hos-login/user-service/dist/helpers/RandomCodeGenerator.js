import crypto from "crypto";
/**
 * @class RandomCodeGenerator
 */
class RandomCodeGenerator {
    /**
     * @name get
     * @static
     * @param length
     * @returns {string}
     */
    static get(length = 40) {
        if (length < 1) {
            throw new Error("Minimum length of token is 1");
        }
        return crypto.randomBytes(length).toString("base64")
            .replace(/[^a-zA-Z0-9]/, '-')
            .substr(0, length);
    }
}
export default RandomCodeGenerator;
