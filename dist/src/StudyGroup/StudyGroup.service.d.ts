import { Repository } from 'typeorm';
import { StudyGroup } from './StudyGroup.entity';
import { User } from '../../tempUser/user.entity';
import { CreateStudyGroupDto } from './dto/create.StudyGroup.input';
export declare class StudyGroupService {
    private studyGroupRepository;
    private userRepository;
    constructor(studyGroupRepository: Repository<StudyGroup>, userRepository: Repository<User>);
    create(createDto: CreateStudyGroupDto, userId: string): Promise<StudyGroup>;
    findAll(): Promise<StudyGroup[]>;
    findOne(id: number): Promise<StudyGroup | null>;
    update(id: number, updateData: Partial<StudyGroup>): Promise<StudyGroup>;
    joinStudyGroup(userId: number, groupId: number): Promise<User>;
}
