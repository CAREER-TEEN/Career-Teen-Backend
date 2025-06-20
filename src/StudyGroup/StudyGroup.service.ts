import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyGroup } from './StudyGroup.entity';
import { User } from '../../tempUser/user.entity';
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
    try {
      const newGroup = this.studyGroupRepository.create({
        ...createDto,
        host: userId,
        personnel: 1,
        members: [],
      });

      return await this.studyGroupRepository.save(newGroup);
    } catch (error) {
      console.error('스터디 그룹 생성 중 오류:', error);
      throw new InternalServerErrorException('스터디 그룹 생성 중 오류 발생');
    }
  }

  async findAll(): Promise<StudyGroup[]> {
    return this.studyGroupRepository.find();
  }

  async findOne(id: number): Promise<StudyGroup | null> {
    const group = await this.studyGroupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`스터디그룹 ID ${id} 를 찾을 수 없습니다`);
    }
    return group;
  }

  async update(
    id: number,
    updateData: Partial<StudyGroup>,
  ): Promise<StudyGroup> {
    const group = await this.studyGroupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`스터디그룹 ID ${id} 를 찾을 수 없습니다`);
    }

    const updated = this.studyGroupRepository.merge(group, updateData);
    return await this.studyGroupRepository.save(updated);
  }

  async joinStudyGroup(groupId: number, userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const group = await this.studyGroupRepository.findOne({
        where: { id: groupId },
      });

      if (!user || !group) {
        throw new NotFoundException(
          '사용자 또는 스터디그룹을 찾을 수 없습니다',
        );
      }

      if (!group.groupname || group.groupname.length > 50) {
        throw new InternalServerErrorException('유효하지 않은 그룹명입니다');
      }

      user.studyGroup = group.groupname;

      group.personnel = (group.personnel ?? 0) + 1;

      await this.studyGroupRepository.save(group);
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('스터디 그룹 참여 중 오류:', error);
      throw new InternalServerErrorException('스터디 그룹 참여 중 오류 발생');
    }
  }
}
