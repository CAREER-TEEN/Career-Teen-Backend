import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create.user.input';
import { User } from './user.entity';
import { UpdateUserInput } from './dto/update.user.input';
interface JwtPayload {
    sub: number;
    username: string;
    role: string;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(input: CreateUserInput): Promise<User>;
    findAllUsers(): Promise<User[]>;
    getProfile(req: Request & {
        user: JwtPayload;
    }): Promise<{
        id: number;
        username: string;
        name: string;
        age: number;
        job: string;
        resolution: string;
        role: string;
    }>;
    updateProfile(req: Request & {
        user: {
            sub: number;
        };
    }, input: UpdateUserInput): Promise<User>;
    deleteProfile(req: Request & {
        user: {
            sub: number;
        };
    }): Promise<{
        message: string;
    }>;
}
export {};
