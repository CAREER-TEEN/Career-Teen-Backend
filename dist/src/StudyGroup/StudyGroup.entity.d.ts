import { User } from '../../tempUser/user.entity';
export declare class StudyGroup {
    id: number;
    groupname: string;
    host: string;
    place: string;
    personnel: number;
    members: User[];
    grouptext: string;
    img: string;
    createAt: Date;
}
