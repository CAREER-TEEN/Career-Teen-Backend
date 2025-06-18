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
exports.BulletinBoard = exports.Category = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../tempUser/user.entity");
const comment_entity_1 = require("../comment/comment.entity");
var Category;
(function (Category) {
    Category["study"] = "\uC2DC\uD5D8\u00B7\uC790\uACA9\uC99D";
    Category["benefit"] = "\uD61C\uD0DD";
    Category["Company"] = "\uCDE8\uC5C5";
    Category["career"] = "\uC9C4\uB85C\u00B7\uBBF8\uB798";
    Category["Youth"] = "\uCCAD\uB144";
})(Category || (exports.Category = Category = {}));
let BulletinBoard = class BulletinBoard {
    id;
    category;
    title;
    text;
    img;
    createdAt;
    view;
    user;
    comments;
};
exports.BulletinBoard = BulletinBoard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BulletinBoard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Category,
    }),
    __metadata("design:type", String)
], BulletinBoard.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], BulletinBoard.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], BulletinBoard.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1000, nullable: true }),
    __metadata("design:type", String)
], BulletinBoard.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BulletinBoard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BulletinBoard.prototype, "view", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.boards, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], BulletinBoard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.board),
    __metadata("design:type", Array)
], BulletinBoard.prototype, "comments", void 0);
exports.BulletinBoard = BulletinBoard = __decorate([
    (0, typeorm_1.Entity)()
], BulletinBoard);
//# sourceMappingURL=BulletinBoard.entity.js.map