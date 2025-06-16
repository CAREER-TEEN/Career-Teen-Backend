import { Module } from '@nestjs/common';
import { StudyGroupController } from './StudyGroup.controller';
import { StudyGroupService } from './StudyGroup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyGroup } from './StudyGroup.entity';
import { UserModule } from '../User/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudyGroup]), UserModule],
  controllers: [StudyGroupController],
  providers: [StudyGroupService],
})
export class StudyGroupModule {}
