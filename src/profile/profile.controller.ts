import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

interface JwtUser {
  username: string;
  role: string;
}

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req: ExpressRequest & { user: JwtUser }): JwtUser {
    return req.user;
  }
}
