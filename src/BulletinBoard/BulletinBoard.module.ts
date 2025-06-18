import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BulletinBoard } from './BulletinBoard.entity';
import { BulletinService } from './BulletinBoard.service';
import { BulletinController } from './BulletinBoard.controller';
import { UserModule } from '../../tempUser/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BulletinBoard]), UserModule],
  providers: [BulletinService],
  controllers: [BulletinController],
})
export class BulletinModule {}
