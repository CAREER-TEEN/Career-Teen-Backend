import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateStudyGroupDto {
  @IsString()
  @IsNotEmpty()
  groupname: string;

  @IsString()
  @IsNotEmpty()
  place: string;

  @IsNumber()
  @IsNotEmpty()
  personnel: number;

  @IsString()
  @IsNotEmpty()
  grouptext: string;

  @IsString()
  @IsOptional()
  img?: string;
}
