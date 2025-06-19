import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulletinBoard } from './BulletinBoard.entity';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { UpdateBulletinDto } from './dto/update.BulletinBoard';
import { User } from '../../tempUser/user.entity';

@Injectable()
export class BulletinService {
  constructor(
    @InjectRepository(BulletinBoard)
    private readonly bulletinRepository: Repository<BulletinBoard>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    input: CreateBulletinInput,
    userId: number,
  ): Promise<BulletinBoard> {
    console.log('create() 호출됨, userId:', userId);
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log('찾은 유저:', user);
    if (!user) throw new NotFoundException('사용자 찾을 수 없음');

    console.log('create input:', input);
    try {
      const bulletin = this.bulletinRepository.create({
        ...input,
        user,
      });
      return await this.bulletinRepository.save(bulletin);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('게시글 생성 오류:', error.message);
      } else {
        console.error('알 수 없는 오류 발생:', error);
      }
      throw new InternalServerErrorException('게시글 등록 중 오류 발생');
    }
  }

  // 이하 기존 코드 유지

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

  async remove(id: number): Promise<void> {
    const result = await this.bulletinRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글 ID ${id} 를 찾을 수 없습니다`);
    }
  }

  async getRecommendedPosts(): Promise<BulletinBoard[]> {
    return this.bulletinRepository.find({
      order: { view: 'DESC' },
    });
  }

  async getLatestPosts(): Promise<BulletinBoard[]> {
    return this.bulletinRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  async getPostWithAuthor(id: number): Promise<BulletinBoard> {
    const post = await this.bulletinRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('게시글을 찾을 수 없습니다');

    return post;
  }

  async getPostsByCategory(category: string): Promise<BulletinBoard[]> {
    return this.bulletinRepository
      .createQueryBuilder('board')
      .where(':category = ANY(board.category)', { category })
      .orderBy('board.createdAt', 'DESC')
      .getMany();
  }
}
