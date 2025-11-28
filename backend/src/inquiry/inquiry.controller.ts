import { Controller, Get, Post, Body, UseGuards, Req, Put, Param, ForbiddenException } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto, AnswerInquiryDto } from './dto/inquiry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inquiry')
export class InquiryController {
    constructor(private readonly inquiryService: InquiryService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createInquiryDto: CreateInquiryDto) {
        return this.inquiryService.create(req.user.userId, {
            ...createInquiryDto,
            isPrivate: createInquiryDto.isPrivate ?? true,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllByUser(@Req() req) {
        return this.inquiryService.findAllByUser(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('admin')
    async findAllAdmin(@Req() req) {
        if (req.user.role !== 'ADMIN') throw new ForbiddenException('Admin only');
        return this.inquiryService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put('admin/:id')
    async answer(@Req() req, @Param('id') id: string, @Body() answerDto: AnswerInquiryDto) {
        if (req.user.role !== 'ADMIN') throw new ForbiddenException('Admin only');
        return this.inquiryService.answer(id, answerDto.answer);
    }
}
