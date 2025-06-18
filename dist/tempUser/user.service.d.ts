import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserInput } from './dto/update.user.input';
interface CreateUserInput {
    username: string;
    password: string;
    name: string;
    age: number;
    job: string;
    resolution: string;
    role: 'mentor' | 'mentee';
}
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(input: CreateUserInput): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findUsername(username: string): Promise<User | null>;
    findUserById(id: number): Promise<User | null>;
    updateUser(id: number, input: UpdateUserInput): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
export {};
