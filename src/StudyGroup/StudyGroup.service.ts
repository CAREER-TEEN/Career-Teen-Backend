import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyGroup } from './StudyGroup.entiy';
import { CreateStudyGroupDto } from './dto/create.StudyGroup.input';

@Injectable()
export class StudyGroupService {
  constructor(
    @InjectRepository(StudyGroup)
    private studyGroupRepository: Repository<StudyGroup>,
  ) {}

  async create(
    createDto: CreateStudyGroupDto,
    userId: string,
  ): Promise<StudyGroup> {
    const newGroup = this.studyGroupRepository.create({
      ...createDto,
      host: userId,
    });
    return this.studyGroupRepository.save(newGroup);
  }
}
