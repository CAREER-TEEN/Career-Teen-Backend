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
      (url === '/users' && method === 'POST') ||
      (url === '/bulletins' && method === 'POST') ||
      (url.startsWith('/bulletins/') && method === 'PATCH') ||
      (url.startsWith('/bulletins/') && method === 'DELETE') ||
      (url === '/bulletins/recommended' && method === 'GET') ||
      (url === '/bulletins/latest' && method === 'GET') ||
      (url.startsWith('/bulletins/category') && method === 'GET') ||
      (url === '/' && method === 'GET')
    ) {
      console.log('[JwtAuthGuard] 인증 접근 허용됨');
      return true;
    }

    console.log('[JwtAuthGuard] 인증 토큰 확인 중...');
    return super.canActivate(context);
  }
}
