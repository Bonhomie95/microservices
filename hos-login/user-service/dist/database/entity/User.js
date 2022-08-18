var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserType } from "../../constants/index.js";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
let User = class User extends BaseEntity {
    id;
    email;
    password;
    firstName;
    lastName;
    phoneNumber;
    userType = UserType.USER;
    role;
    dateOfBirth;
    imageUrl;
    isActive = true;
    isVerified;
    lastLoginAt;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    Column({ enum: UserType }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    Column({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    Column({
        type: "uuid",
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "createdBy", void 0);
__decorate([
    CreateDateColumn({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    Column({
        type: "uuid",
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "updatedBy", void 0);
__decorate([
    UpdateDateColumn({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    Entity("tbl_user"),
    Unique(["email", "phoneNumber"])
], User);
export default User;
