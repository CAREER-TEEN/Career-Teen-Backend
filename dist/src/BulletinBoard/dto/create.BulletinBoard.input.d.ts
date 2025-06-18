import { Category } from '../BulletinBoard.entity';
export declare class CreateBulletinInput {
    category: Category;
    title: string;
    text: string;
    img?: string;
}
