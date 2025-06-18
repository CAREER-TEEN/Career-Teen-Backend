import { User } from '../../tempUser/user.entity';
import { Comment } from '../comment/comment.entity';
export declare enum Category {
    study = "\uC2DC\uD5D8\u00B7\uC790\uACA9\uC99D",
    benefit = "\uD61C\uD0DD",
    Company = "\uCDE8\uC5C5",
    career = "\uC9C4\uB85C\u00B7\uBBF8\uB798",
    Youth = "\uCCAD\uB144"
}
export declare class BulletinBoard {
    id: number;
    category: Category;
    title: string;
    text: string;
    img: string;
    createdAt: Date;
    view: number;
    user: User;
    comments: Comment[];
}
