import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get()
    async findAll(@Query('page') page: string) {
        const pageNum = parseInt(page || '1', 10);
        const news = await this.newsService.findAll(pageNum);
        return { news };
    }
}
