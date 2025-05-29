import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

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
