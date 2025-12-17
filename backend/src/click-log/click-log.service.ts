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

        // Fetch raw logs instead of grouping by title
        const logs = await this.prisma.clickLog.findMany({
            where: {
                createdAt: {
                    gte: yesterday,
                },
            },
            select: {
                keyword: true, // This is actually the title
            },
        });

        // Keyword extraction logic
        const wordCounts = new Map<string, number>();
        const stopWords = new Set([
            'the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'is', 'are', 'with', 'by',
            '이', '가', '은', '는', '을', '를', '의', '에', '로', '으로', '과', '와', '도', '다', '등', '수', '것', '들', '및', '해', '한', '하는', '할', '된', '됨'
        ]);

        logs.forEach(log => {
            // Remove special chars and split
            const words = log.keyword.replace(/[^\w\s가-힣]/g, '').split(/\s+/);
            words.forEach(word => {
                const cleanWord = word.trim();
                if (cleanWord.length > 1 && !stopWords.has(cleanWord.toLowerCase())) {
                    wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
                }
            });
        });

        // Sort by count
        const sortedKeywords = Array.from(wordCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map((entry, index) => ({
                rank: index + 1,
                keyword: entry[0],
                count: entry[1],
            }));

        if (sortedKeywords.length === 0) {
            return [
                { rank: 1, keyword: 'AI', count: 0 },
                { rank: 2, keyword: 'LLM', count: 0 },
                { rank: 3, keyword: '개발', count: 0 },
                { rank: 4, keyword: 'Tech', count: 0 },
                { rank: 5, keyword: 'Trend', count: 0 },
            ];
        }

        return sortedKeywords;
    }

    // Reuse the same logic for getTopKeywords but with limit
    async getTopKeywords(limit = 5): Promise<{ keyword: string; count: number }[]> {
        // For simplicity, using the same logic as getHotTopics but maybe over all time?
        // Let's keep it consistent with getHotTopics for now or just call it.
        const hotTopics = await this.getHotTopics();
        return hotTopics.slice(0, limit).map(t => ({ keyword: t.keyword, count: t.count }));
    }
}
