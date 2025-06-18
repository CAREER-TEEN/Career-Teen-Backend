import { Request as ExpressRequest } from 'express';
interface JwtUser {
    username: string;
    role: string;
}
export declare class ProfileController {
    getProfile(req: ExpressRequest & {
        user: JwtUser;
    }): JwtUser;
}
export {};
