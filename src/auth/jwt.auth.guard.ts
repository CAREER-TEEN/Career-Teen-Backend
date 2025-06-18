import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const { url, method, headers } = request;

    console.log('[JwtAuthGuard] 요청 URL:', url);
    console.log('[JwtAuthGuard] 요청 METHOD:', method);
    console.log(
      '[JwtAuthGuard] 요청 Authorization 헤더:',
      headers.authorization,
    );

    if (
      (url === '/auth/login' && method === 'POST') ||
      (url === '/users' && method === 'POST')
    ) {
      console.log('[JwtAuthGuard] 인증 접근 허용됨');
      return true;
    }

    console.log('[JwtAuthGuard] 인증 토큰 확인 중...');
    return super.canActivate(context);
  }
}
