import { Request } from 'express';
import { BulletinService } from './BulletinBoard.service';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { UpdateBulletinDto } from './dto/update.BulletinBoard';
import { BulletinBoard } from './BulletinBoard.entity';
export declare class BulletinController {
    private readonly bulletinService;
    constructor(bulletinService: BulletinService);
    createBulletin(input: CreateBulletinInput, req: Request & {
        user: {
            userId: number;
        };
    }): Promise<BulletinBoard>;
    updateBulletin(id: number, updateDto: UpdateBulletinDto): Promise<BulletinBoard>;
    removeBulletin(id: number): Promise<void>;
    getRecommendedPosts(): Promise<BulletinBoard[]>;
    getLatestPosts(): Promise<BulletinBoard[]>;
    getPostsByCategory(category: string): Promise<BulletinBoard[]>;
}
