import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user_entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '', //나중에 git 설정 후 비밀번호 설정
      database: 'career_teen',
      entities: [User],
      synchronize: true, //자동 생성 수정
    }),
    TypeOrmModule.forFeature([User]), //user entity
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
