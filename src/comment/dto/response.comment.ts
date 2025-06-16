export class CommentResponseDto {
  id: number;
  text: string;
  createdAt: Date;
  user: {
    name: string;
    img: string;
  };
}
