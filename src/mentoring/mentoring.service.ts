import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../User/user.entity';
import { Repository } from 'typeorm';
import { mentoringSummary } from './dto/mentoring.summary';
import { mentoringDetail } from './dto/mentoring.detail';

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
}
