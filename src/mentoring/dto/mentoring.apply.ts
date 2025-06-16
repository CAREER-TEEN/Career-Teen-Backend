import { IsInt } from 'class-validator';

export class MentoringApply {
  @IsInt()
  menteeId: number;

  @IsInt()
  mentorId: number;
}
