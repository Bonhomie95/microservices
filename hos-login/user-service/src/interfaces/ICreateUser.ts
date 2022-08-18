import { RoleType } from "../types/RoleType";

/**
 * @interface ICreateUser
 */
export interface ICreateUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: RoleType;
    subscriptionPlan: string;
}