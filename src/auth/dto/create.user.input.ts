import { IsString, IsNotEmpty, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  Mentor = 'mentor',
  Mentee = 'mentee',
}

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  passwd: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number) //19 이렇게 숫자로 입력
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsString()
  @IsNotEmpty()
  resolution: string;

  @IsEnum({ type: 'enum', enum: UserRole })
  role: UserRole;
}
