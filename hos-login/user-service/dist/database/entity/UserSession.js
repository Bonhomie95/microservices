var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
let UserSession = class UserSession extends BaseEntity {
    id;
    token;
    userId;
    ipAddress;
    platform;
    expiresAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserSession.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserSession.prototype, "token", void 0);
__decorate([
    Column({
        type: "uuid"
    }),
    __metadata("design:type", String)
], UserSession.prototype, "userId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserSession.prototype, "ipAddress", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserSession.prototype, "platform", void 0);
__decorate([
    UpdateDateColumn({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], UserSession.prototype, "expiresAt", void 0);
UserSession = __decorate([
    Entity("tbl_user_session")
], UserSession);
export default UserSession;
