import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Category } from '../BulletinBoard.entity';

export class CreateBulletinInput {
  @IsEnum(Category)
  category: Category;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  text: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  img?: string;
}
