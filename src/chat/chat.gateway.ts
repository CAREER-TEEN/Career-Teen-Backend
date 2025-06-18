// import {
//   WebSocketGateway,
//   WebSocketGatewayOptions,
//   SubscribeMessage,
//   MessageBody,
//   ConnectedSocket,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server as SocketIOServer, Socket } from 'socket.io';
// import { ChatService } from './chat.service';
// import * as jwt from 'jsonwebtoken';
// import { ConfigService } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../../tempUser/user.entity';

// interface ChatPayload {
//   otherUserId: number;
//   content: string;
// }

// const gatewayOptions: WebSocketGatewayOptions = {
//   namespace: '/chat',
//   cors: true,
// };

// @WebSocketGateway(gatewayOptions)
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: SocketIOServer;

//   constructor(
//     private readonly chatService: ChatService,
//     private readonly configService: ConfigService,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   handleConnection(client: unknown) {
//     if (!this.isSocket(client)) {
//       console.warn('[WebSocket] 연결 거부: 클라이언트가 Socket이 아님');
//       return;
//     }

//     const token = this.extractToken(client);
//     if (!token) {
//       console.warn('[WebSocket] 연결 거부: 토큰 없음');
//       client.disconnect();
//       return;
//     }

//     const jwtSecret = this.configService.get<string>('JWT_SECRET');
//     if (!jwtSecret) {
//       console.error('[WebSocket] 연결 거부: JWT_SECRET 미설정');
//       client.disconnect();
//       return;
//     }

//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       if (typeof decoded === 'object' && decoded !== null && 'sub' in decoded) {
//         const sub = decoded.sub;
//         const userId = typeof sub === 'string' ? Number(sub) : undefined;
//         if (!userId || isNaN(userId)) {
//           throw new Error('Invalid token sub claim');
//         }
//         client.data.userId = userId;
//         console.log(`[WebSocket] 연결됨: User ${userId}`);
//       } else {
//         throw new Error('Invalid token payload');
//       }
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         console.error('[WebSocket] JWT 검증 실패:', err.message);
//       } else {
//         console.error('[WebSocket] JWT 검증 실패: 알 수 없는 오류');
//       }
//       client.disconnect();
//       return;
//     }
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`[WebSocket] 연결 해제: Client ${client.id}`);
//   }

//   @SubscribeMessage('sendMessage')
//   async handleMessage(
//     @MessageBody() data: ChatPayload,
//     @ConnectedSocket() client: Socket,
//   ) {
//     const senderId = client.data.userId;
//     if (!senderId) {
//       console.warn('[WebSocket] 메시지 전송 실패: 인증된 사용자 아님');
//       return;
//     }

//     const { otherUserId, content } = data;

//     const sender = await this.userRepository.findOneBy({ id: senderId });
//     const receiver = await this.userRepository.findOneBy({ id: otherUserId });

//     if (!sender || !receiver) {
//       console.warn('[WebSocket] 메시지 전송 실패: 존재하지 않는 사용자');
//       return;
//     }

//     let menteeId: number;
//     let mentorId: number;

//     if (sender.role === 'mentor' && receiver.role === 'mentee') {
//       mentorId = senderId;
//       menteeId = otherUserId;
//     } else if (sender.role === 'mentee' && receiver.role === 'mentor') {
//       mentorId = otherUserId;
//       menteeId = senderId;
//     } else {
//       console.warn('[WebSocket] 메시지 전송 실패: 멘토-멘티 관계 아님');
//       return;
//     }

//     const timestamp = new Date();

//     await this.chatService.saveMessage(menteeId, mentorId, content);

//     this.server.emit('receiveMessage', {
//       menteeId,
//       mentorId,
//       senderId,
//       content,
//       timestamp,
//     });
//   }

//   private isSocket(client: unknown): client is Socket {
//     return (
//       typeof client === 'object' &&
//       client !== null &&
//       'handshake' in client &&
//       typeof (client as any).disconnect === 'function'
//     );
//   }

//   private extractToken(client: Socket): string | undefined {
//     const headers = client.handshake.headers as Record<
//       string,
//       string | string[] | undefined
//     >;
//     const authHeader = headers.authorization;
//     if (typeof authHeader === 'string') {
//       return authHeader.split(' ')[1];
//     }
//     return undefined;
//   }
// }
