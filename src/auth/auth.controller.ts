import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    console.log('(1번째 로그) 로그인 요청 수신 : ', { username, password });
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('로그인 정보가 올바르지 않습니다.');
    }
    return this.authService.login(user);
  }
}
