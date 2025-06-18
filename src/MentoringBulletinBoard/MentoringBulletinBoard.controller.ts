import { Controller, Get, Query } from '@nestjs/common';
import { MentoringBulletinBoardService } from './MentoringBulletinBoard.service';
import { MentoringCategory } from './MentoringBulletinBoard.entity';

@Controller('mentoring-board')
export class MentoringBulletinBoardController {
  constructor(private readonly boardService: MentoringBulletinBoardService) {}

  @Get()
  async getAll() {
    return this.boardService.findAll();
  }

  @Get('category')
  async getByCategory(@Query('type') type: MentoringCategory) {
    return this.boardService.findByCategory(type);
  }
}
