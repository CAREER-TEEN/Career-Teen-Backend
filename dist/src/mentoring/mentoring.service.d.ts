import { User } from '../../tempUser/user.entity';
import { Repository } from 'typeorm';
import { mentoringSummary } from './dto/mentoring.summary';
import { mentoringDetail } from './dto/mentoring.detail';
import { MentoringApply } from './dto/mentoring.apply';
export declare class MentoringService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findMentorList(): Promise<mentoringSummary[]>;
    findMentorDetail(id: number): Promise<mentoringDetail>;
    applyMentoring(dto: MentoringApply): Promise<string>;
}
