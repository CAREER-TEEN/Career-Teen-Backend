import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../User/user.service';

type AuthUserPayload = {
  id: number;
  username: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthUserPayload> {
    console.log('(2번째 로그) validateUser : ', { username, password });
    const user = await this.userService.findUsername(username);
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    const match = await bcrypt.compare(password, user.password);
    console.log('(4번째 로그) bcrypt 비교 결과 : ', match);
    if (!match) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  login(user: AuthUserPayload): { accessToken: string } {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
