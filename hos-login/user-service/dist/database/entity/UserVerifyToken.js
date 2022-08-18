var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
let UserVerifyToken = class UserVerifyToken extends BaseEntity {
    id;
    token;
    userId;
    expiresAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserVerifyToken.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserVerifyToken.prototype, "token", void 0);
__decorate([
    Column({
        type: "uuid"
    }),
    __metadata("design:type", String)
], UserVerifyToken.prototype, "userId", void 0);
__decorate([
    UpdateDateColumn({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], UserVerifyToken.prototype, "expiresAt", void 0);
UserVerifyToken = __decorate([
    Entity("tbl_user_verify_token"),
    Unique(["userId"])
], UserVerifyToken);
export default UserVerifyToken;
