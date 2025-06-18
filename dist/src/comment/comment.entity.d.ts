import { User } from '../../tempUser/user.entity';
import { BulletinBoard } from '../BulletinBoard/BulletinBoard.entity';
export declare class Comment {
    id: number;
    text: string;
    user: User;
    board: BulletinBoard;
    createdAt: Date;
}
