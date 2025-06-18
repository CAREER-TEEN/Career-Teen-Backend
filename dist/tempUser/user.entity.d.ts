import { BulletinBoard } from '../src/BulletinBoard/BulletinBoard.entity';
import { StudyGroup } from '../src/StudyGroup/StudyGroup.entity';
import { Comment } from '../src/comment/comment.entity';
export declare class User {
    static readonly Role: {
        readonly Mentor: "mentor";
        readonly Mentee: "mentee";
    };
    id: number;
    username: string;
    password: string;
    name: string;
    age: number;
    job: string;
    resolution: string;
    role: (typeof User.Role)[keyof typeof User.Role];
    introduce: string;
    career: {
        date: string;
        description: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    studyGroup: string;
    bulletinBoard: string;
    boards: BulletinBoard[];
    joinedGroups: StudyGroup[];
    person: number;
    comments: Comment[];
    img: string;
}
