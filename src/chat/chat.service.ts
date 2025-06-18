// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Chat } from './chat.entity';

// @Injectable()
// export class ChatService {
//   constructor(
//     @InjectRepository(Chat)
//     private readonly chatRepository: Repository<Chat>,
//   ) {}

//   async saveMessage(
//     menteeId: number,
//     mentorId: number,
//     content: string,
//   ): Promise<Chat> {
//     const message = this.chatRepository.create({
//       menteeId,
//       mentorId,
//       content,
//       timestamp: new Date(),
//     });
//     return await this.chatRepository.save(message);
//   }

//   async getMessages(menteeId: number, mentorId: number): Promise<Chat[]> {
//     return await this.chatRepository.find({
//       where: [
//         { menteeId, mentorId },
//         { menteeId: mentorId, mentorId: menteeId }, // 양방향 채팅 기록 조회
//       ],
//       order: { timestamp: 'ASC' },
//     });
//   }
// }
