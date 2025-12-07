import { Controller, Get, Post, Query } from '@nestjs/common';
import { GeekNewsService } from './geek-news.service';

@Controller('geek-news')
export class GeekNewsController {
    constructor(private readonly service: GeekNewsService) { }

    @Get()
    async findAll(@Query('page') page: string) {
        const pageNum = Number(page) || 1;
        return this.service.findAll(pageNum);
    }

    @Post('crawl')
    async crawl() {
        await this.service.crawlAndSave();
        return { message: 'Crawling started' };
    }
}
