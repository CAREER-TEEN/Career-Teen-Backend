import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create.comment.input';
import { CommentResponseDto } from './dto/response.comment';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(dto: CreateCommentDto): Promise<CommentResponseDto>;
    getByBoard(boardId: number): Promise<CommentResponseDto[]>;
}
