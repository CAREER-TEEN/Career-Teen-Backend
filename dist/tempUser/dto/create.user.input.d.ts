import { User } from '../user.entity';
export declare class CreateUserInput {
    username: string;
    password: string;
    name: string;
    age: number;
    job: string;
    resolution: string;
    role: (typeof User.Role)[keyof typeof User.Role];
}
