import { MentoringBulletinBoardService } from './MentoringBulletinBoard.service';
import { Category } from './MentoringBulletinBoard.entity';
export declare class MentoringBulletinBoardController {
    private readonly boardService;
    constructor(boardService: MentoringBulletinBoardService);
    getAll(): Promise<import("./MentoringBulletinBoard.entity").MentoringBulletinBoard[]>;
    getByCategory(type: Category): Promise<import("./MentoringBulletinBoard.entity").MentoringBulletinBoard[]>;
}
