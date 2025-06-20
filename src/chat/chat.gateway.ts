import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { User } from '../../tempUser/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface ChatPayload {
  senderId: number;
  receiverId: number;
  content: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private users: Map<number, Socket> = new Map(); // userId -> socket

  constructor(
    private readonly chatService: ChatService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  handleConnection(socket: Socket) {
    const userId = parseInt(socket.handshake.query.userId as string, 10);
    if (!isNaN(userId)) {
      this.users.set(userId, socket);
    }
  }

  handleDisconnect(socket: Socket) {
    for (const [userId, sock] of this.users.entries()) {
      if (sock === socket) {
        this.users.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('chat:send')
  async handleMessage(
    @MessageBody() data: ChatPayload,
    @ConnectedSocket() client: Socket,
  ) {
    const sender = await this.userRepository.findOne({
      where: { id: data.senderId },
    });
    const receiver = await this.userRepository.findOne({
      where: { id: data.receiverId },
    });

    if (!sender || !receiver) return;

    const savedMessage = await this.chatService.saveMessage(
      sender,
      receiver,
      data.content,
    );

    const payload = {
      id: savedMessage.id,
      senderId: sender.id,
      receiverId: receiver.id,
      content: savedMessage.content,
      createdAt: savedMessage.createdAt,
    };

    client.emit('chat:receive', payload); // Echo to sender

    const receiverSocket = this.users.get(receiver.id);
    if (receiverSocket) {
      receiverSocket.emit('chat:receive', payload); // Send to receiver
    }
  }
}
