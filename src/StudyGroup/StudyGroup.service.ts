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
    userId: number,
  ): Promise<StudyGroup> {
    try {
      const hostUser = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!hostUser) {
        throw new NotFoundException('호스트 유저를 찾을 수 없습니다');
      }

      const newGroup = this.studyGroupRepository.create({
        ...createDto,
        host: hostUser,
        personnel: 1,
        members: [hostUser],
      });

      return await this.studyGroupRepository.save(newGroup);
    } catch (error) {
      console.error('스터디 그룹 생성 중 오류:', error);
      throw new InternalServerErrorException('스터디 그룹 생성 중 오류 발생');
    }
  }

  async findAll(): Promise<StudyGroup[]> {
    return this.studyGroupRepository.find({
      relations: ['members'], // host는 relation 아님
    });
  }

  async findOne(id: number): Promise<StudyGroup | null> {
    const group = await this.studyGroupRepository.findOne({
      where: { id },
      relations: ['members'], // host는 relation 아님
    });
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

  async joinStudyGroup(groupId: number, userId: number): Promise<StudyGroup> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['joinedGroups'],
      });
      const group = await this.studyGroupRepository.findOne({
        where: { id: groupId },
        relations: ['members'],
      });

      if (!user || !group) {
        throw new NotFoundException(
          '사용자 또는 스터디그룹을 찾을 수 없습니다',
        );
      }

      if (!group.members) {
        group.members = [];
      }

      // 중복 가입 방지
      if (group.members.some((member) => member.id === user.id)) {
        throw new InternalServerErrorException('이미 가입한 그룹입니다');
      }

      group.members.push(user);
      group.personnel = (group.personnel ?? 0) + 1;

      await this.studyGroupRepository.save(group);
      return group;
    } catch (error) {
      console.error('스터디 그룹 참여 중 오류:', error);
      throw new InternalServerErrorException('스터디 그룹 참여 중 오류 발생');
    }
  }
}
