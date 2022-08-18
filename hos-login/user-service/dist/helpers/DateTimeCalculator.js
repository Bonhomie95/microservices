import moment from "moment";
/**
 * @class DateTimeCalculator
 */
class DateTimeCalculator {
    /**
     * @name getDateTimeInNext
     * @static
     * @param hours
     * @param minutes
     * @returns
     */
    static getDateTimeInNext(hours, minutes = 0) {
        this.checkThatHourAndMinutesAreValid(hours, minutes);
        const calculatedDate = moment().add(hours, "hours");
        calculatedDate.add(minutes, "minutes");
        return calculatedDate.toDate();
    }
    /**
     * @name isLessThanCurrentTime
     * @static
     * @param givenDateTime
     * @returns
     */
    static isLessThanCurrentTime(givenDateTime) {
        return (givenDateTime.getTime() < Date.now());
    }
    /**
     * @name checkThatHourAndMinutesAreValid
     * @static
     * @param hours
     * @param minutes
     * @returns
     */
    static checkThatHourAndMinutesAreValid(hours, minutes) {
        if (hours < 0) {
            throw new Error("Hours cannot be negative");
        }
        if (minutes < 0) {
            throw new Error("Minutes cannot be negative");
        }
    }
}
export default DateTimeCalculator;
