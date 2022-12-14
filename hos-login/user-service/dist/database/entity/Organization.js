var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
let Organization = class Organization extends BaseEntity {
    id;
    name;
    countryCode;
    owner;
    createdAt;
    updatedBy;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Organization.prototype, "countryCode", void 0);
__decorate([
    Column({ type: "uuid" }),
    __metadata("design:type", String)
], Organization.prototype, "owner", void 0);
__decorate([
    CreateDateColumn({ type: "timestamp" }),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    Column({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "updatedBy", void 0);
__decorate([
    UpdateDateColumn({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
Organization = __decorate([
    Entity("tbl_organization"),
    Unique(["name", "countryCode"])
], Organization);
export default Organization;
