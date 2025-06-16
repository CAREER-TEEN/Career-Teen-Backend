import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  userId: number;

  @IsInt()
  boardId: number;

  @IsString()
  text: string;
}
