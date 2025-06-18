import { Request, Response, NextFunction } from 'express';
interface JwtPayload {
    userId: number;
}
interface AuthRequest extends Request {
    user?: JwtPayload;
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export {};
