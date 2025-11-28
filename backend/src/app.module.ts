import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { NewsModule } from './news/news.module';
import { ClickLogModule } from './click-log/click-log.module';
import { InquiryModule } from './inquiry/inquiry.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, NewsModule, ClickLogModule, InquiryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
