// import { Controller, Get, Query, UseGuards } from '@nestjs/common';
// import { ChatService } from './chat.service';
// import { JwtAuthGuard } from '../auth/jwt.auth.guard';
// import { GetUser } from '../auth/getUser';
// import { User } from '../tempUser/user.entity';

// @Controller('chat')
// export class ChatController {
//   constructor(private readonly chatService: ChatService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get('messages')
//   async getMessages(
//     @GetUser() user: User,
//     @Query('otherUserId') otherUserId: number,
//   ) {
//     const userId = user.id;
//     return this.chatService.getMessages(userId, otherUserId);
//   }
// }
