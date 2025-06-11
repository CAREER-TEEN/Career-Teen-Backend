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
} from '@nestjs/common';
import { BulletinService } from './BulletinBoard.service';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { UpdateBulletinDto } from './dto/update.BulletinBoard';
import { BulletinBoard } from './BulletinBoard.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('bulletins')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}

  // 게시글 생성
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBulletin(
    @Body() input: CreateBulletinInput,
  ): Promise<BulletinBoard> {
    return this.bulletinService.create(input);
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

  // 인기 게시글 조회 (조회수 순으로로 정렬)
  @Get('recommended')
  getRecommendedPosts(): Promise<BulletinBoard[]> {
    return this.bulletinService.getRecommendedPosts();
  }

  // 최신 게시글 조회 (게시글 생성 순으로 정렬)
  @Get('latest')
  getLatestPosts(): Promise<BulletinBoard[]> {
    return this.bulletinService.getLatestPosts();
  }

  // 조건별 게시글 조회 (카테고리 조건)
  @Get('category')
  getPostsByCategory(
    @Query('category') category: string,
  ): Promise<BulletinBoard[]> {
    return this.bulletinService.getPostsByCategory(category);
  }
}
