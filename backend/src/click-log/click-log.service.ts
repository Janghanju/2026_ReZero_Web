import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClickLogService {
    constructor(private prisma: PrismaService) { }

    async create(keyword: string, url: string) {
        return this.prisma.clickLog.create({
            data: {
                keyword,
                url,
            },
        });
    }

    async getHotTopics() {
        const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

        const logs = await this.prisma.clickLog.groupBy({
            by: ['keyword'],
            where: {
                createdAt: {
                    gte: yesterday,
                },
            },
            _count: {
                keyword: true,
            },
            orderBy: {
                _count: {
                    keyword: 'desc',
                },
            },
            take: 5,
        });

        const hotTopics = logs.map((log, index) => ({
            rank: index + 1,
            keyword: log.keyword,
            count: log._count.keyword,
        }));

        if (hotTopics.length === 0) {
            return [
                { rank: 1, keyword: 'AI', count: 0 },
                { rank: 2, keyword: 'Next.js', count: 0 },
                { rank: 3, keyword: 'React', count: 0 },
                { rank: 4, keyword: 'TypeScript', count: 0 },
                { rank: 5, keyword: 'Web', count: 0 },
            ];
        }

        return hotTopics;
    }
}
