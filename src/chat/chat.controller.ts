import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getChatHistory(
    @Query('userA') userA: number,
    @Query('userB') userB: number,
  ) {
    return this.chatService.getMessagesBetweenUsers(userA, userB);
  }
}
