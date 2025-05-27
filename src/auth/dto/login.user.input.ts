import { IsString, IsNotEmpty } from 'class-validator';
export class LoginUserInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
