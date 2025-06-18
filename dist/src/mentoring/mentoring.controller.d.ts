import { MentoringService } from './mentoring.service';
import { mentoringSummary } from './dto/mentoring.summary';
import { mentoringDetail } from './dto/mentoring.detail';
import { MentoringApply } from './dto/mentoring.apply';
export declare class MentoringController {
    private readonly mentoringService;
    constructor(mentoringService: MentoringService);
    getMentorList(): Promise<mentoringSummary[]>;
    getMentorDetail(id: number): Promise<mentoringDetail>;
    applyMentoring(dto: MentoringApply): Promise<string>;
}
