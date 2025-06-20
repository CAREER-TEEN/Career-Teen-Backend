import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './chat.entity';
import { Repository } from 'typeorm';
import { User } from '../../tempUser/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
  ) {}

  async saveMessage(
    sender: User,
    receiver: User,
    content: string,
  ): Promise<ChatMessage> {
    const message = this.chatRepository.create({ sender, receiver, content });
    return await this.chatRepository.save(message);
  }

  async getMessagesBetweenUsers(userAId: number, userBId: number) {
    return this.chatRepository.find({
      where: [
        { sender: { id: userAId }, receiver: { id: userBId } },
        { sender: { id: userBId }, receiver: { id: userAId } },
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
