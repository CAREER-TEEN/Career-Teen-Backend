import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create.comment.input';
import { CommentResponseDto } from './dto/response.comment';
import { User } from '../../tempUser/user.entity';
import { BulletinBoard } from '../BulletinBoard/BulletinBoard.entity';
export declare class CommentService {
    private readonly commentRepo;
    private readonly userRepo;
    private readonly boardRepo;
    constructor(commentRepo: Repository<Comment>, userRepo: Repository<User>, boardRepo: Repository<BulletinBoard>);
    createComment(dto: CreateCommentDto): Promise<CommentResponseDto>;
    getCommentsByBoard(boardId: number): Promise<CommentResponseDto[]>;
}
