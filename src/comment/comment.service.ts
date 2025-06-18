import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create.comment.input';
import { CommentResponseDto } from './dto/response.comment';
import { User } from '../../tempUser/user.entity';
import { BulletinBoard } from '../BulletinBoard/BulletinBoard.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(BulletinBoard)
    private readonly boardRepo: Repository<BulletinBoard>,
  ) {}

  async createComment(dto: CreateCommentDto): Promise<CommentResponseDto> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const board = await this.boardRepo.findOne({ where: { id: dto.boardId } });

    if (!user || !board)
      throw new NotFoundException('User 또는 Board를 찾을 수 없습니다.');

    const comment = this.commentRepo.create({
      text: dto.text,
      user,
      board,
    });

    const saved = await this.commentRepo.save(comment);

    return {
      id: saved.id,
      text: saved.text,
      createdAt: saved.createdAt,
      user: {
        name: user.name,
        img: user.img,
      },
    };
  }

  async getCommentsByBoard(boardId: number): Promise<CommentResponseDto[]> {
    const comments = await this.commentRepo.find({
      where: { board: { id: boardId } },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      user: {
        name: comment.user.name,
        img: comment.user.img,
      },
    }));
  }
}
