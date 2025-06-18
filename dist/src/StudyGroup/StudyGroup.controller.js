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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyGroupController = void 0;
const common_1 = require("@nestjs/common");
const StudyGroup_service_1 = require("./StudyGroup.service");
const create_StudyGroup_input_1 = require("./dto/create.StudyGroup.input");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
let StudyGroupController = class StudyGroupController {
    studyGroupService;
    constructor(studyGroupService) {
        this.studyGroupService = studyGroupService;
    }
    create(createDto, req) {
        const user = req.user;
        const userId = user.userId;
        return this.studyGroupService.create(createDto, userId);
    }
    async getAll() {
        return this.studyGroupService.findAll();
    }
    async getById(id) {
        return this.studyGroupService.findOne(id);
    }
    async update(id, updateData) {
        return await this.studyGroupService.update(id, updateData);
    }
    async joinGroup(groupId, req) {
        const userId = Number(req.user.userId);
        return this.studyGroupService.joinStudyGroup(groupId, userId);
    }
};
exports.StudyGroupController = StudyGroupController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_StudyGroup_input_1.CreateStudyGroupDto, Object]),
    __metadata("design:returntype", void 0)
], StudyGroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudyGroupController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudyGroupController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudyGroupController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('join/:groupId'),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudyGroupController.prototype, "joinGroup", null);
exports.StudyGroupController = StudyGroupController = __decorate([
    (0, common_1.Controller)('study_groups'),
    __metadata("design:paramtypes", [StudyGroup_service_1.StudyGroupService])
], StudyGroupController);
//# sourceMappingURL=StudyGroup.controller.js.map