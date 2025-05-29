import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest<Request>();

    const { url, method } = request;

    if (
      (url === '/auth/login' && method === 'POST') ||
      (url === '/users' && method === 'POST')
    ) {
      return true;
    }

    return super.canActivate(context);
  }
}
