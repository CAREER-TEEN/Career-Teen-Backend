import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { BulletinService } from './BulletinBoard.service';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { UpdateBulletinDto } from './dto/update.BulletinBoard';
import { BulletinBoard } from './BulletinBoard.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('bulletins')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}

  // 게시글 생성
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createBulletin(
    @Body() input: CreateBulletinInput,
    @Req() req: Request & { user?: { userId: number } },
  ): Promise<BulletinBoard> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new BadRequestException('userId가 요청에서 확인되지 않습니다.');
    }

    return this.bulletinService.create(input, userId);
  }

  // 게시글 상세 조회
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getBulletinById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BulletinBoard> {
    return this.bulletinService.getById(id);
  }

  // 게시글 수정
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBulletin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBulletinDto,
  ): Promise<BulletinBoard> {
    return this.bulletinService.update(id, updateDto);
  }

  // 게시글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBulletin(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bulletinService.remove(id);
  }

  // 인기 게시글 조회 (조회수 순으로 정렬)
  @Get('recommended')
  getRecommendedPosts(): Promise<BulletinBoard[]> {
    return this.bulletinService.getRecommendedPosts();
  }

  // 최신 게시글 조회 (작성일 순 정렬)
  @Get('latest')
  getLatestPosts(): Promise<BulletinBoard[]> {
    return this.bulletinService.getLatestPosts();
  }

  // 조건별 게시글 조회 (카테고리 기준)
  @Get('category')
  getPostsByCategory(
    @Query('category') category: string,
  ): Promise<BulletinBoard[]> {
    if (!category) {
      throw new BadRequestException('category 쿼리 파라미터가 필요합니다.');
    }
    return this.bulletinService.getPostsByCategory(category);
  }
}
