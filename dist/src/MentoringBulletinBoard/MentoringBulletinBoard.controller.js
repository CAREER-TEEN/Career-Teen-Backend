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
exports.MentoringBulletinBoardController = void 0;
const common_1 = require("@nestjs/common");
const MentoringBulletinBoard_service_1 = require("./MentoringBulletinBoard.service");
const MentoringBulletinBoard_entity_1 = require("./MentoringBulletinBoard.entity");
let MentoringBulletinBoardController = class MentoringBulletinBoardController {
    boardService;
    constructor(boardService) {
        this.boardService = boardService;
    }
    async getAll() {
        return this.boardService.findAll();
    }
    async getByCategory(type) {
        return this.boardService.findByCategory(type);
    }
};
exports.MentoringBulletinBoardController = MentoringBulletinBoardController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MentoringBulletinBoardController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('category'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MentoringBulletinBoardController.prototype, "getByCategory", null);
exports.MentoringBulletinBoardController = MentoringBulletinBoardController = __decorate([
    (0, common_1.Controller)('mentoring-board'),
    __metadata("design:paramtypes", [MentoringBulletinBoard_service_1.MentoringBulletinBoardService])
], MentoringBulletinBoardController);
//# sourceMappingURL=MentoringBulletinBoard.controller.js.map