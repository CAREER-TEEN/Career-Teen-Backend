import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MentoringBulletinBoard,
  MentoringCategory,
} from './MentoringBulletinBoard.entity';

@Injectable()
export class MentoringBulletinBoardService {
  constructor(
    @InjectRepository(MentoringBulletinBoard)
    private boardRepository: Repository<MentoringBulletinBoard>,
  ) {}

  async findByCategory(
    category: MentoringCategory,
  ): Promise<MentoringBulletinBoard[]> {
    return this.boardRepository.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<MentoringBulletinBoard[]> {
    return this.boardRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
