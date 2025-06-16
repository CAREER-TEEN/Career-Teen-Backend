import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './User/user.entity';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { BulletinModule } from './BulletinBoard/BulletinBoard.module';
import { BulletinBoard } from './BulletinBoard/BulletinBoard.entity';
import { StudyGroup } from './StudyGroup/StudyGroup.entity';
import { StudyGroupModule } from './StudyGroup/StudyGroup.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '071122', // 나중에 변경
      database: 'career_teen',
      entities: [User, BulletinBoard, StudyGroup],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BulletinModule,
    StudyGroupModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
