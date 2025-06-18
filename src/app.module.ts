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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, BulletinBoard, StudyGroup],
      synchronize: false,
      logging: true,
      retryAttempts: 3,
      retryDelay: 30000,
    }),
    UserModule,
    AuthModule,
    BulletinModule,
    StudyGroupModule,
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
