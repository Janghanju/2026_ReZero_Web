import { Module } from '@nestjs/common';
import { ClickLogController } from './click-log.controller';
import { ClickLogService } from './click-log.service';

@Module({
  controllers: [ClickLogController],
  providers: [ClickLogService]
})
export class ClickLogModule {}
