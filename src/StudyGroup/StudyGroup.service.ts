import { Injectable, NotFoundException } from '@nestjs/common';
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

  // 전체 스터디 그룹 조회
  async findAll(): Promise<StudyGroup[]> {
    return this.studyGroupRepository.find();
  }

  // 특정 스터디 그룹 조회
  async findOne(id: number): Promise<StudyGroup | null> {
    const group = await this.studyGroupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(
        `스터디그룹 특정 ID ${id} 를 찾을 수 없습니다`,
      );
    }
    return group;
  }

  async update(
    id: number,
    updateData: Partial<StudyGroup>,
  ): Promise<StudyGroup> {
    const group = await this.studyGroupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`스터디그룹 ${id} 를 찾을 수 없습니다`);
    }

    const updated = this.studyGroupRepository.merge(group, updateData);
    return await this.studyGroupRepository.save(updated);
  }
}
