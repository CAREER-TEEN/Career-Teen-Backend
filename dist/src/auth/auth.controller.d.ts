import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(username: string, password: string): Promise<{
        accessToken: string;
    }>;
}
