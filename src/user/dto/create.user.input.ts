import { IsString, IsInt, IsEnum, IsNotEmpty } from 'class-validator';
import { User } from '../user/user_entity.ts';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  resolution: string;

  @IsEnum(User.Role)
  @IsNotEmpty()
  role: (typeof User.Role)[keyof typeof User.Role];
}