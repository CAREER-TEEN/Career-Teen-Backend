import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
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

    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');

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

  async update(
    id: number,
    updateDto: UpdateBulletinDto,
  ): Promise<BulletinBoard> {
    try {
      const bulletin = await this.bulletinRepository.findOneBy({ id });

      if (!bulletin) {
        throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
      }

      Object.assign(bulletin, updateDto);
      return await this.bulletinRepository.save(bulletin);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`게시글 수정 오류 (ID: ${id}):`, error.message);
      } else {
        console.error(`게시글 수정 중 알 수 없는 오류 (ID: ${id}):`, error);
      }
      throw new InternalServerErrorException('게시글 수정 중 오류 발생');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.bulletinRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`게시글 삭제 오류 (ID: ${id}):`, error.message);
      } else {
        console.error(`게시글 삭제 중 알 수 없는 오류 (ID: ${id}):`, error);
      }
      throw new InternalServerErrorException('게시글 삭제 중 오류 발생');
    }
  }

  async getRecommendedPosts(): Promise<BulletinBoard[]> {
    try {
      return await this.bulletinRepository.find({
        order: { view: 'DESC' },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('인기 게시글 조회 오류:', error.message);
      } else {
        console.error('인기 게시글 조회 알 수 없는 오류:', error);
      }
      throw new InternalServerErrorException('인기 게시글 조회 실패');
    }
  }

  async getLatestPosts(): Promise<BulletinBoard[]> {
    try {
      return await this.bulletinRepository.find({
        order: { createdAt: 'DESC' },
        take: 10,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('최신 게시글 조회 오류:', error.message);
      } else {
        console.error('최신 게시글 조회 알 수 없는 오류:', error);
      }
      throw new InternalServerErrorException('최신 게시글 조회 실패');
    }
  }

  async getPostWithAuthor(id: number): Promise<BulletinBoard> {
    try {
      const post = await this.bulletinRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!post) {
        throw new NotFoundException('게시글을 찾을 수 없습니다.');
      }

      return post;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`게시글 상세 조회 오류 (ID: ${id}):`, error.message);
      } else {
        console.error(`게시글 상세 조회 알 수 없는 오류 (ID: ${id}):`, error);
      }
      throw new InternalServerErrorException('게시글 상세 조회 실패');
    }
  }

  async getById(id: number): Promise<BulletinBoard> {
    const bulletin = await this.bulletinRepository.findOne({ where: { id } });

    if (!bulletin) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }

    return bulletin;
  }

  async getPostsByCategory(category: string): Promise<BulletinBoard[]> {
    if (!category) {
      throw new BadRequestException('카테고리를 지정해주세요.');
    }

    try {
      const posts = await this.bulletinRepository
        .createQueryBuilder('board')
        .where('board.category = :category', { category })
        .orderBy('board.createdAt', 'DESC')
        .getMany();

      if (posts.length === 0) {
        throw new NotFoundException(
          `카테고리 "${category}"에 해당하는 게시글이 없습니다.`,
        );
      }

      return posts;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `카테고리 게시글 조회 오류 (category: ${category}):`,
          error.message,
        );
      } else {
        console.error(
          `카테고리 게시글 조회 알 수 없는 오류 (category: ${category}):`,
          error,
        );
      }
      throw new InternalServerErrorException('카테고리별 게시글 조회 실패');
    }
  }
}
