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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const BulletinBoard_entity_1 = require("../src/BulletinBoard/BulletinBoard.entity");
const StudyGroup_entity_1 = require("../src/StudyGroup/StudyGroup.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../src/comment/comment.entity");
let User = class User {
    static { User_1 = this; }
    static Role = {
        Mentor: 'mentor',
        Mentee: 'mentee',
    };
    id;
    username;
    password;
    name;
    age;
    job;
    resolution;
    role;
    introduce;
    career;
    createdAt;
    updatedAt;
    studyGroup;
    bulletinBoard;
    boards;
    joinedGroups;
    person;
    comments;
    img;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: User.Role }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "introduce", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "career", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'studygroup', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "studyGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'bulletinboard',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "bulletinBoard", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BulletinBoard_entity_1.BulletinBoard, (board) => board.user),
    __metadata("design:type", Array)
], User.prototype, "boards", void 0);
__decorate([
    (0, typeorm_2.ManyToMany)(() => StudyGroup_entity_1.StudyGroup, (group) => group.members),
    (0, typeorm_2.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "joinedGroups", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "img", void 0);
exports.User = User = User_1 = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map