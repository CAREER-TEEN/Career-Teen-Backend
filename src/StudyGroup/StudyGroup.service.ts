import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyGroup } from './StudyGroup.entity';
import { User } from '../User/user.entity';
import { CreateStudyGroupDto } from './dto/create.StudyGroup.input';

@Injectable()
export class StudyGroupService {
  constructor(
    @InjectRepository(StudyGroup)
    private studyGroupRepository: Repository<StudyGroup>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createDto: CreateStudyGroupDto,
    userId: string,
  ): Promise<StudyGroup> {
    const newGroup = this.studyGroupRepository.create({
      ...createDto,
      host: userId,
      personnel: 1, // 생성 시 호스트 포함 1명으로 초기화 권장
      members: [], // 초기 members 빈 배열
    });
    return this.studyGroupRepository.save(newGroup);
  }

  async findAll(): Promise<StudyGroup[]> {
    return this.studyGroupRepository.find();
  }

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
    return this.studyGroupRepository.save(updated);
  }

  async joinStudyGroup(userId: number, groupId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const group = await this.studyGroupRepository.findOne({
      where: { id: groupId },
    });

    if (!user || !group)
      throw new NotFoundException('사용자 또는 스터디그룹을 찾을 수 없습니다');

    user.studyGroup = group.groupname;
    group.personnel += 1;

    await this.studyGroupRepository.save(group);
    return await this.userRepository.save(user);
  }
}
