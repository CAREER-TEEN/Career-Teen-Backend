import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { User } from '../../tempUser/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, User])],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
