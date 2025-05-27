import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<string> {
    const user: User | null = await this.userService.findUsername(username); //유저 찾기
    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.'); //예외처리리
    }

    const match: boolean = await bcrypt.compare(password, user.password); //비밀번호 비교
    if (!match) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return this.jwtService.sign({ sub: user.id, role: user.role }); //JWT 토큰 발급
  }
}