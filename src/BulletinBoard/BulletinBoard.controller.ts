import {
  Body,
  Controller,
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
}
