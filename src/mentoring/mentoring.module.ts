import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../tempUser/user.entity';
import { MentoringService } from './mentoring.service';
import { MentoringController } from './mentoring.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [MentoringService],
  controllers: [MentoringController],
})
export class MentoringModule {}
