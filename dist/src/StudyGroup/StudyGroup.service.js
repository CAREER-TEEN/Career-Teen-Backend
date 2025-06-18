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
exports.StudyGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const StudyGroup_entity_1 = require("./StudyGroup.entity");
const user_entity_1 = require("../../tempUser/user.entity");
let StudyGroupService = class StudyGroupService {
    studyGroupRepository;
    userRepository;
    constructor(studyGroupRepository, userRepository) {
        this.studyGroupRepository = studyGroupRepository;
        this.userRepository = userRepository;
    }
    async create(createDto, userId) {
        const newGroup = this.studyGroupRepository.create({
            ...createDto,
            host: userId,
            personnel: 1,
            members: [],
        });
        return this.studyGroupRepository.save(newGroup);
    }
    async findAll() {
        return this.studyGroupRepository.find();
    }
    async findOne(id) {
        const group = await this.studyGroupRepository.findOne({ where: { id } });
        if (!group) {
            throw new common_1.NotFoundException(`스터디그룹 특정 ID ${id} 를 찾을 수 없습니다`);
        }
        return group;
    }
    async update(id, updateData) {
        const group = await this.studyGroupRepository.findOne({ where: { id } });
        if (!group) {
            throw new common_1.NotFoundException(`스터디그룹 ${id} 를 찾을 수 없습니다`);
        }
        const updated = this.studyGroupRepository.merge(group, updateData);
        return this.studyGroupRepository.save(updated);
    }
    async joinStudyGroup(userId, groupId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const group = await this.studyGroupRepository.findOne({
            where: { id: groupId },
        });
        if (!user || !group)
            throw new common_1.NotFoundException('사용자 또는 스터디그룹을 찾을 수 없습니다');
        user.studyGroup = group.groupname;
        group.personnel += 1;
        await this.studyGroupRepository.save(group);
        return await this.userRepository.save(user);
    }
};
exports.StudyGroupService = StudyGroupService;
exports.StudyGroupService = StudyGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(StudyGroup_entity_1.StudyGroup)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudyGroupService);
//# sourceMappingURL=StudyGroup.service.js.map