import { Controller, Get, Query } from '@nestjs/common';
import { MentoringBulletinBoardService } from './MentoringBulletinBoard.service';
import { Category } from './MentoringBulletinBoard.entity';

@Controller('mentoring-board')
export class MentoringBulletinBoardController {
  constructor(private readonly boardService: MentoringBulletinBoardService) {}

  @Get()
  async getAll() {
    return this.boardService.findAll();
  }

  @Get('category')
  async getByCategory(@Query('type') type: Category) {
    return this.boardService.findByCategory(type);
  }
}
