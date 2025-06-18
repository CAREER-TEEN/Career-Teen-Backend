import { StudyGroupService } from './StudyGroup.service';
import { CreateStudyGroupDto } from './dto/create.StudyGroup.input';
import { Request as ExpressRequest } from 'express';
import { StudyGroup } from './StudyGroup.entity';
export declare class StudyGroupController {
    private readonly studyGroupService;
    constructor(studyGroupService: StudyGroupService);
    create(createDto: CreateStudyGroupDto, req: ExpressRequest): Promise<StudyGroup>;
    getAll(): Promise<StudyGroup[]>;
    getById(id: number): Promise<StudyGroup | null>;
    update(id: number, updateData: Partial<StudyGroup>): Promise<StudyGroup>;
    joinGroup(groupId: number, req: ExpressRequest): Promise<import("../../tempUser/user.entity").User>;
}
