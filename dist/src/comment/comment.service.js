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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./comment.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../tempUser/user.entity");
const BulletinBoard_entity_1 = require("../BulletinBoard/BulletinBoard.entity");
let CommentService = class CommentService {
    commentRepo;
    userRepo;
    boardRepo;
    constructor(commentRepo, userRepo, boardRepo) {
        this.commentRepo = commentRepo;
        this.userRepo = userRepo;
        this.boardRepo = boardRepo;
    }
    async createComment(dto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        const board = await this.boardRepo.findOne({ where: { id: dto.boardId } });
        if (!user || !board)
            throw new common_1.NotFoundException('User 또는 Board를 찾을 수 없습니다.');
        const comment = this.commentRepo.create({
            text: dto.text,
            user,
            board,
        });
        const saved = await this.commentRepo.save(comment);
        return {
            id: saved.id,
            text: saved.text,
            createdAt: saved.createdAt,
            user: {
                name: user.name,
                img: user.img,
            },
        };
    }
    async getCommentsByBoard(boardId) {
        const comments = await this.commentRepo.find({
            where: { board: { id: boardId } },
            relations: ['user'],
            order: { createdAt: 'ASC' },
        });
        return comments.map((comment) => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            user: {
                name: comment.user.name,
                img: comment.user.img,
            },
        }));
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(BulletinBoard_entity_1.BulletinBoard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map