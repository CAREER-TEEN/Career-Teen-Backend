import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulletinBoard } from './BulletinBoard.entity';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';

@Injectable()
export class BulletinService {
  constructor(
    @InjectRepository(BulletinBoard)
    private readonly bulletinRepository: Repository<BulletinBoard>,
  ) {}

  async create(input: CreateBulletinInput): Promise<BulletinBoard> {
    try {
      const bulletin = this.bulletinRepository.create(input);
      return await this.bulletinRepository.save(bulletin);
    } catch (error) {
      console.error('게시글 생성 오류:', error);
      throw new InternalServerErrorException('게시글 등록 중 오류 발생');
    }
  }
}
