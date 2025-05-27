import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login.user.input';

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() input: LoginUserInput): Promise<{ accessToken: string}> {
    const accessToken = await this.authService.validateUser(input.username, input.password);
    return { accessToken };
  }
}