import { Repository } from 'typeorm';
import { MentoringBulletinBoard, Category } from './MentoringBulletinBoard.entity';
export declare class MentoringBulletinBoardService {
    private boardRepository;
    constructor(boardRepository: Repository<MentoringBulletinBoard>);
    findByCategory(category: Category): Promise<MentoringBulletinBoard[]>;
    findAll(): Promise<MentoringBulletinBoard[]>;
}
