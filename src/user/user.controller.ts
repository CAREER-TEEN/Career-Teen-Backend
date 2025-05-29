import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create.user.input';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  //모든 사용자 조회
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  //특정 사용자 조회
  @Get(':id')
  async findUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return this.userService.findUserById(id);
  }
}
