import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
    constructor(private prisma: PrismaService) { }

    async subscribe(email: string) {
        // Check if already subscribed
        const existing = await this.prisma.subscription.findUnique({
            where: { email },
        });

        if (existing) {
            return { message: 'Already subscribed' };
        }

        return this.prisma.subscription.create({
            data: { email },
        });
    }
}
