import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { AdminInquiryController } from './admin-inquiry.controller';

@Module({
  controllers: [InquiryController, AdminInquiryController],
  providers: [InquiryService]
})
export class InquiryModule { }
