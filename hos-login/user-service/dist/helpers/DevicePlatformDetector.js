import { DeviceMobileCategory } from "../constants/index.js";
/**
 * @class DevicePlatformDetector
 */
class DevicePlatformDetector {
    /**
     * @method getMobileCategory
     * @static
     * @param {string} userAgent
     * @returns {DeviceMobileCategory}
     */
    static getMobileCategory(userAgent) {
        const MOBILE_DEVICE_INDICATORS = [
            "mobile",
            "android",
            "iphone",
            "tablet",
            "ipad",
            "ipod"
        ];
        return MOBILE_DEVICE_INDICATORS.some((mobileIndicator) => userAgent.toLowerCase().includes(mobileIndicator))
            ? DeviceMobileCategory.MOBILE
            : DeviceMobileCategory.NON_MOBILE;
    }
}
export default DevicePlatformDetector;
