import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulletinBoard } from './BulletinBoard.entity';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { UpdateBulletinDto } from './dto/update.BulletinBoard';
import { NotFoundException } from '@nestjs/common';

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

  // 게시판 게시글 수정
  async update(
    id: number,
    updateDto: UpdateBulletinDto,
  ): Promise<BulletinBoard> {
    const bulletin = await this.bulletinRepository.findOneBy({ id });
    if (!bulletin) {
      throw new NotFoundException(
        `게시글을 찾을 수 없습니다 (id ${id} 찾을 수 없음)`,
      );
    }

    Object.assign(bulletin, updateDto);
    return this.bulletinRepository.save(bulletin);
  }
}
