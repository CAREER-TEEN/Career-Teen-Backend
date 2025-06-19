import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Category } from '../BulletinBoard.entity';

export class CreateBulletinInput {
  @IsEnum(Category, { message: '카테고리는 enum 값이어야 합니다.' })
  category: Category;

  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(2000)
  text: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  img?: string;
}
