import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create.user.input';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

// JWT payload 타입 (sub, username, role 기준)
interface JwtPayload {
  sub: number; // user.id
  username: string; // user.username
  role: string; // user.role
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  // 전체 사용자 조회 (JWT 인증 필요)
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllUsers(): Promise<User[]> {
    console.log('전체 사용자 조회 요청 들어옴');
    return this.userService.findAllUsers();
  }

  // 로그인 사용자 프로필 조회 (마이페이지용)
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request & { user: JwtPayload }): Promise<{
    id: number;
    username: string;
    name: string;
    age: number;
    job: string;
    resolution: string;
    role: string;
  }> {
    const id = req.user.sub;
    const user = await this.userService.findById(id);

    // 민감 정보 제외, 필요한 필드만 반환
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      age: user.age,
      job: user.job,
      resolution: user.resolution,
      role: user.role,
    };
  }
}
