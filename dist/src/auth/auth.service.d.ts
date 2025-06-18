import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../tempUser/user.service';
type AuthUserPayload = {
    id: number;
    username: string;
    role: string;
};
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<AuthUserPayload>;
    login(user: AuthUserPayload): {
        accessToken: string;
    };
}
export {};
