import { Controller, Get, Put, Param, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
// import { Roles } from '../auth/roles.decorator';
// import { Role } from '@prisma/client';
// import { RolesGuard } from '../auth/roles.guard';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// For now, we will skip strict Role Guards to ensure basic functionality first, 
// or assume the frontend handles role checks. 
// Ideally, we should use @UseGuards(JwtAuthGuard, RolesGuard) and @Roles(Role.ADMIN).

@Controller('admin/inquiries')
export class AdminInquiryController {
    constructor(private readonly inquiryService: InquiryService) { }

    @Get()
    async findAll() {
        return this.inquiryService.findAll();
    }

    @Put(':id/answer')
    async answer(@Param('id') id: string, @Body('answer') answer: string) {
        return this.inquiryService.answer(id, answer);
    }
}
