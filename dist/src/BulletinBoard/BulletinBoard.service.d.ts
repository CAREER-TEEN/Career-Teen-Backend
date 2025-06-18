import { Repository } from 'typeorm';
import { BulletinBoard } from './BulletinBoard.entity';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { UpdateBulletinDto } from './dto/update.BulletinBoard';
import { User } from '../../tempUser/user.entity';
export declare class BulletinService {
    private readonly bulletinRepository;
    private readonly userRepository;
    constructor(bulletinRepository: Repository<BulletinBoard>, userRepository: Repository<User>);
    create(input: CreateBulletinInput, userId: number): Promise<BulletinBoard>;
    update(id: number, updateDto: UpdateBulletinDto): Promise<BulletinBoard>;
    remove(id: number): Promise<void>;
    getRecommendedPosts(): Promise<BulletinBoard[]>;
    getLatestPosts(): Promise<BulletinBoard[]>;
    getPostWithAuthor(id: number): Promise<BulletinBoard>;
    getPostsByCategory(category: string): Promise<BulletinBoard[]>;
}
