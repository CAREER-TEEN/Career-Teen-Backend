import { Module } from '@nestjs/common';
import { StudyGroupController } from './StudyGroup.controller';
import { StudyGroupService } from './StudyGroup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyGroup } from './StudyGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyGroup])],
  controllers: [StudyGroupController],
  providers: [StudyGroupService],
})
export class StudyGroupModule {}
