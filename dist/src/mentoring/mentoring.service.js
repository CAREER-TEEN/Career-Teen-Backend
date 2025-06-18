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
exports.MentoringService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../tempUser/user.entity");
const typeorm_2 = require("typeorm");
const mentoring_detail_1 = require("./dto/mentoring.detail");
let MentoringService = class MentoringService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findMentorList() {
        return this.userRepository
            .createQueryBuilder('user')
            .select(['user.name', 'user.career'])
            .where('user.role = :role', { role: user_entity_1.User.Role.Mentor })
            .getMany();
    }
    async findMentorDetail(id) {
        const user = await this.userRepository.findOne({
            where: { id, role: user_entity_1.User.Role.Mentor },
            relations: ['boards', 'joinedGroups'],
        });
        if (!user)
            throw new common_1.NotFoundException('Mentor not found');
        return new mentoring_detail_1.mentoringDetail(user);
    }
    async applyMentoring(dto) {
        const { menteeId, mentorId } = dto;
        const mentee = await this.userRepository.findOne({
            where: { id: menteeId },
        });
        const mentor = await this.userRepository.findOne({
            where: { id: mentorId },
        });
        if (!mentee || !mentor)
            throw new common_1.NotFoundException('멘티 또는 멘토를 찾을 수 없습니다.');
        if (mentee.role !== user_entity_1.User.Role.Mentee)
            throw new common_1.BadRequestException('신청자는 멘티여야 합니다.');
        if (mentor.role !== user_entity_1.User.Role.Mentor)
            throw new common_1.BadRequestException('수신자는 멘토여야 합니다.');
        if (mentee.person || mentor.person) {
            throw new common_1.BadRequestException('이미 매칭된 사용자입니다.');
        }
        mentee.person = mentor.id;
        mentor.person = mentee.id;
        await this.userRepository.save([mentee, mentor]);
        return '멘토링 신청 및 매칭 완료';
    }
};
exports.MentoringService = MentoringService;
exports.MentoringService = MentoringService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MentoringService);
//# sourceMappingURL=mentoring.service.js.map