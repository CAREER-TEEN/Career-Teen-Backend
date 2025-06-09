import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StudyGroupService } from './StudyGroup.service';
import { CreateStudyGroupDto } from './dto/create.StudyGroup.input';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from '../auth/jwt.interface';
import { StudyGroup } from './StudyGroup.entiy';
@Controller('study_groups')
export class StudyGroupController {
  constructor(private readonly studyGroupService: StudyGroupService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDto: CreateStudyGroupDto,
    @Request() req: ExpressRequest,
  ) {
    const user = req.user as JwtPayload; //JWT를 이용해 user정보를 가져와 host에
    const userId = user.userId;
    return this.studyGroupService.create(createDto, userId);
  }

  @Get()
  async getAll(): Promise<StudyGroup[]> {
    return this.studyGroupService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StudyGroup | null> {
    return this.studyGroupService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<StudyGroup>,
  ): Promise<StudyGroup> {
    return await this.studyGroupService.update(id, updateData);
  }
}
