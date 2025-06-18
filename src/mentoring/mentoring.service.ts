import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../tempUser/user.entity';
import { Repository } from 'typeorm';
import { mentoringSummary } from './dto/mentoring.summary';
import { mentoringDetail } from './dto/mentoring.detail';
import { MentoringApply } from './dto/mentoring.apply';

@Injectable()
export class MentoringService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findMentorList(): Promise<mentoringSummary[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.career'])
      .where('user.role = :role', { role: User.Role.Mentor })
      .getMany();
  }

  async findMentorDetail(id: number): Promise<mentoringDetail> {
    const user = await this.userRepository.findOne({
      where: { id, role: User.Role.Mentor },
      relations: ['boards', 'joinedGroups'],
    });
    if (!user) throw new NotFoundException('Mentor not found');
    return new mentoringDetail(user);
  }

  async applyMentoring(dto: MentoringApply): Promise<string> {
    const { menteeId, mentorId } = dto;

    const mentee = await this.userRepository.findOne({
      where: { id: menteeId },
    });
    const mentor = await this.userRepository.findOne({
      where: { id: mentorId },
    });

    if (!mentee || !mentor)
      throw new NotFoundException('멘티 또는 멘토를 찾을 수 없습니다.');
    if (mentee.role !== User.Role.Mentee)
      throw new BadRequestException('신청자는 멘티여야 합니다.');
    if (mentor.role !== User.Role.Mentor)
      throw new BadRequestException('수신자는 멘토여야 합니다.');

    // 이미 person에 값이 있는 경우 중복 매칭 방지
    if (mentee.person || mentor.person) {
      throw new BadRequestException('이미 매칭된 사용자입니다.');
    }

    mentee.person = mentor.id;
    mentor.person = mentee.id;

    await this.userRepository.save([mentee, mentor]);

    return '멘토링 신청 및 매칭 완료';
  }
}
