import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClickLogService } from './click-log.service';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateClickLogDto {
    @IsNotEmpty()
    keyword: string;

    @IsNotEmpty()
    @IsUrl()
    url: string;
}

@Controller('click-log')
export class ClickLogController {
    constructor(private readonly clickLogService: ClickLogService) { }

    @Post()
    async create(@Body() createClickLogDto: CreateClickLogDto) {
        await this.clickLogService.create(createClickLogDto.keyword, createClickLogDto.url);
        return { success: true };
    }

    @Get('hot-topics')
    async getHotTopics() {
        const topics = await this.clickLogService.getHotTopics();
        return { topics };
    }
    @Get('top')
    async top(@Query('limit') limit: string) {
        const n = Number(limit) || 5;
        const topics = await this.clickLogService.getTopKeywords(n);
        return { topics };
    }
}
