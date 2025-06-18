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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentoringBulletinBoard = exports.Category = void 0;
const typeorm_1 = require("typeorm");
var Category;
(function (Category) {
    Category["study"] = "\uC0AC\uBB34\uC9C1";
    Category["benefit"] = "IT";
    Category["Company"] = "\uB514\uC790\uC778";
    Category["career"] = "\uC694\uC2DD";
    Category["Youth"] = "\uB9C8\uCF00\uD305";
})(Category || (exports.Category = Category = {}));
let MentoringBulletinBoard = class MentoringBulletinBoard {
    id;
    category;
    title;
    text;
    img;
    createdAt;
    view;
};
exports.MentoringBulletinBoard = MentoringBulletinBoard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MentoringBulletinBoard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Category,
    }),
    __metadata("design:type", String)
], MentoringBulletinBoard.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], MentoringBulletinBoard.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], MentoringBulletinBoard.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1000, nullable: true }),
    __metadata("design:type", String)
], MentoringBulletinBoard.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MentoringBulletinBoard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], MentoringBulletinBoard.prototype, "view", void 0);
exports.MentoringBulletinBoard = MentoringBulletinBoard = __decorate([
    (0, typeorm_1.Entity)()
], MentoringBulletinBoard);
//# sourceMappingURL=MentoringBulletinBoard.entity.js.map