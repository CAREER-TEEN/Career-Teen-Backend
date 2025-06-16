// src/comment/comment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { User } from '../User/user.entity';
import { BulletinBoard } from '../BulletinBoard/BulletinBoard.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, BulletinBoard])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
