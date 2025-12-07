import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { NewsModule } from './news/news.module';
import { ClickLogModule } from './click-log/click-log.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { GeekNewsController } from './geek-news/geek-news.controller';
import { GeekNewsService } from './geek-news/geek-news.service';
import { SubscriptionController } from './subscription/subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule, AuthModule, PrismaModule, NewsModule, ClickLogModule, InquiryModule
  ],
  controllers: [AppController, GeekNewsController, SubscriptionController],
  providers: [AppService, GeekNewsService, SubscriptionService],
})
export class AppModule { }
