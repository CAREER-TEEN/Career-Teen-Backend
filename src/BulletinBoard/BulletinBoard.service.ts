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
      throw new NotFoundException(`게시글 ID ${id} 를 찾을 수 없습니다`);
    }

    Object.assign(bulletin, updateDto);
    return this.bulletinRepository.save(bulletin);
  }

  // 게시판 게시글 삭제
  async remove(id: number): Promise<void> {
    const result = await this.bulletinRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글 ID ${id} 를 찾을 수 없습니다`);
    }
  }

  // 인기 게시글 조회
  async getRecommendedPosts(): Promise<BulletinBoard[]> {
    return this.bulletinRepository.find({
      order: { view: 'DESC' },
    });
  }

  // 최신 게시글 조회
  async getLatestPosts(): Promise<BulletinBoard[]> {
    return this.bulletinRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  // 조건 게시글 조회
  async getPostsByCategory(category: string): Promise<BulletinBoard[]> {
    return this.bulletinRepository
      .createQueryBuilder('board')
      .where(':category = ANY(board.category)', { category })
      .orderBy('board.createdAt', 'DESC')
      .getMany();
  }
}
