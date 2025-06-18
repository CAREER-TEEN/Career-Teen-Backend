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
exports.BulletinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const BulletinBoard_entity_1 = require("./BulletinBoard.entity");
const user_entity_1 = require("../../tempUser/user.entity");
let BulletinService = class BulletinService {
    bulletinRepository;
    userRepository;
    constructor(bulletinRepository, userRepository) {
        this.bulletinRepository = bulletinRepository;
        this.userRepository = userRepository;
    }
    async create(input, userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('사용자 찾을 수 없음');
        try {
            const bulletin = this.bulletinRepository.create({
                ...input,
                user,
            });
            return await this.bulletinRepository.save(bulletin);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('게시글 생성 오류:', error.message);
            }
            else {
                console.error('알 수 없는 오류 발생:', error);
            }
            throw new common_1.InternalServerErrorException('게시글 등록 중 오류 발생');
        }
    }
    async update(id, updateDto) {
        const bulletin = await this.bulletinRepository.findOneBy({ id });
        if (!bulletin) {
            throw new common_1.NotFoundException(`게시글 ID ${id} 를 찾을 수 없습니다`);
        }
        Object.assign(bulletin, updateDto);
        return this.bulletinRepository.save(bulletin);
    }
    async remove(id) {
        const result = await this.bulletinRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`게시글 ID ${id} 를 찾을 수 없습니다`);
        }
    }
    async getRecommendedPosts() {
        return this.bulletinRepository.find({
            order: { view: 'DESC' },
        });
    }
    async getLatestPosts() {
        return this.bulletinRepository.find({
            order: { createdAt: 'DESC' },
            take: 10,
        });
    }
    async getPostWithAuthor(id) {
        const post = await this.bulletinRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!post)
            throw new common_1.NotFoundException('게시글을 찾을 수 없습니다');
        return post;
    }
    async getPostsByCategory(category) {
        return this.bulletinRepository
            .createQueryBuilder('board')
            .where(':category = ANY(board.category)', { category })
            .orderBy('board.createdAt', 'DESC')
            .getMany();
    }
};
exports.BulletinService = BulletinService;
exports.BulletinService = BulletinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BulletinBoard_entity_1.BulletinBoard)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BulletinService);
//# sourceMappingURL=BulletinBoard.service.js.map