import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '../User/user.entity';
import { Request as ExpressRequest } from 'express';

interface RequestWithUser extends ExpressRequest {
  user?: User;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user as User;
  },
);
