import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../User/user.service';
import { CreateUserInput } from './dto/create.user.input';
import { User } from '../User/user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UpdateUserInput } from './dto/update.user.input';

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
  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req: Request & { user: { sub: number } },
    @Body() input: UpdateUserInput,
  ): Promise<User> {
    const id = req.user.sub;
    return await this.userService.updateUser(id, input);
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(
    @Req() req: Request & { user: { sub: number } },
  ): Promise<{ message: string }> {
    const id = req.user.sub;

    try {
      await this.userService.deleteUser(id);
      return { message: '회원 탈퇴가 완료되었습니다.' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('회원 탈퇴 중 오류:', error.message);
      } else {
        console.error('회원 탈퇴 중 오류:', error);
      }
      throw new Error('회원 탈퇴 중 오류가 발생했습니다.');
    }
  }
}
