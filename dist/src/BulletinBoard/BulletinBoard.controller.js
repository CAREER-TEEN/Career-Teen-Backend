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
exports.BulletinController = void 0;
const common_1 = require("@nestjs/common");
const BulletinBoard_service_1 = require("./BulletinBoard.service");
const create_BulletinBoard_input_1 = require("./dto/create.BulletinBoard.input");
const update_BulletinBoard_1 = require("./dto/update.BulletinBoard");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
let BulletinController = class BulletinController {
    bulletinService;
    constructor(bulletinService) {
        this.bulletinService = bulletinService;
    }
    async createBulletin(input, req) {
        const userId = req.user.userId;
        return this.bulletinService.create(input, userId);
    }
    async updateBulletin(id, updateDto) {
        return this.bulletinService.update(id, updateDto);
    }
    async removeBulletin(id) {
        return this.bulletinService.remove(id);
    }
    getRecommendedPosts() {
        return this.bulletinService.getRecommendedPosts();
    }
    getLatestPosts() {
        return this.bulletinService.getLatestPosts();
    }
    getPostsByCategory(category) {
        return this.bulletinService.getPostsByCategory(category);
    }
};
exports.BulletinController = BulletinController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_BulletinBoard_input_1.CreateBulletinInput, Object]),
    __metadata("design:returntype", Promise)
], BulletinController.prototype, "createBulletin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_BulletinBoard_1.UpdateBulletinDto]),
    __metadata("design:returntype", Promise)
], BulletinController.prototype, "updateBulletin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BulletinController.prototype, "removeBulletin", null);
__decorate([
    (0, common_1.Get)('recommended'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BulletinController.prototype, "getRecommendedPosts", null);
__decorate([
    (0, common_1.Get)('latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BulletinController.prototype, "getLatestPosts", null);
__decorate([
    (0, common_1.Get)('category'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BulletinController.prototype, "getPostsByCategory", null);
exports.BulletinController = BulletinController = __decorate([
    (0, common_1.Controller)('bulletins'),
    __metadata("design:paramtypes", [BulletinBoard_service_1.BulletinService])
], BulletinController);
//# sourceMappingURL=BulletinBoard.controller.js.map