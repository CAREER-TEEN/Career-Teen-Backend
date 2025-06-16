import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create.comment.input';
import { CommentResponseDto } from './dto/response.comment';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() dto: CreateCommentDto): Promise<CommentResponseDto> {
    return this.commentService.createComment(dto);
  }

  @Get(':boardId')
  async getByBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<CommentResponseDto[]> {
    return this.commentService.getCommentsByBoard(boardId);
  }
}
