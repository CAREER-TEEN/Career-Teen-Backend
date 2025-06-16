// src/mentoring/mentoring.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MentoringService } from './mentoring.service';
import { mentoringSummary } from './dto/mentoring.summary';
import { mentoringDetail } from './dto/mentoring.detail';
@Controller('mentoring')
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  @Get()
  async getMentorList(): Promise<mentoringSummary[]> {
    return this.mentoringService.findMentorList();
  }

  @Get(':id')
  async getMentorDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<mentoringDetail> {
    return this.mentoringService.findMentorDetail(id);
  }
}
