"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const User_1 = __importDefault(require("./User"));
const Package_1 = __importDefault(require("./Package"));
class Transaction extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "package_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "upi_address", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "payment_method", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "user_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "status", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "package_name", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "name", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Object)
], Transaction.prototype, "amount", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Transaction.prototype, "updatedAt", void 0);
__decorate([
    Orm_1.hasMany(() => User_1.default),
    __metadata("design:type", Object)
], Transaction.prototype, "transactions", void 0);
__decorate([
    Orm_1.hasMany(() => Package_1.default),
    __metadata("design:type", Object)
], Transaction.prototype, "packages", void 0);
exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map