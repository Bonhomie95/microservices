import config from "../../config/index.js";
import { EmailSender } from "../../../../lib/dist/helpers/index.js";
/**
 * @class EmailService
 */
class EmailService {
    static instance;
    emailSender;
    /**
     * @constructor
     */
    constructor() {
        this.emailSender = new EmailSender(config.HOS_EMAIL_NAME, config.HOS_EMAIL_PASSWORD);
    }
    /**
     * @method getInstance
     * @static
     * @async
     * @returns {Promise<EmailService>}
     */
    static async getInstance() {
        if (!this.instance) {
            this.instance = await new EmailService();
        }
        return this.instance;
    }
    /**
     * @method sendVerifyAccountMail
     * @async
     * @param {string} toEmail
     * @param {string} name
     * @param {string} verifyAccountUrl
     */
    async sendVerifyAccountMail(toEmail, name, verifyAccountUrl) {
        const SUBJECT = "HOUSE OF SOUNDS - ACCOUNT VERIFICATION 🎉🎉🎉 ";
        const MESSAGE = `
        Hi ${name},
        Welcome to House of sounds.
        Kindly verify account using ${verifyAccountUrl}.
        Thanks.
        `;
        this.emailSender?.send(toEmail, SUBJECT, MESSAGE);
    }
    /**
     * @method sendResetPasswordMail
     * @async
     * @param {string} toEmail
     * @param {string} name
     * @param {string} resetPasswordUrl
     */
    async sendResetPasswordMail(toEmail, name, resetPasswordUrl) {
        const SUBJECT = "HOUSE OF SOUNDS - ACCOUNT PASSWORD RESET 🎉🎉🎉 ";
        const MESSAGE = `
        Hi ${name},
        Welcome to House of sounds.
        Kindly reset account password using ${resetPasswordUrl}.
        Thanks.
        `;
        this.emailSender?.send(toEmail, SUBJECT, MESSAGE);
    }
}
export default EmailService;
