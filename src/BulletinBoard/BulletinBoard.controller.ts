import { Body, Controller, Post } from '@nestjs/common';
import { BulletinService } from './BulletinBoard.service';
import { CreateBulletinInput } from './dto/create.BulletinBoard.input';
import { BulletinBoard } from './BulletinBoard.entity';

@Controller('bulletins')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}

  @Post()
  async createBulletin(
    @Body() input: CreateBulletinInput,
  ): Promise<BulletinBoard> {
    return this.bulletinService.create(input);
  }
}
