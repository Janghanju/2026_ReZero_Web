import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InquiryService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: { title: string; content: string; isPrivate: boolean }) {
        return this.prisma.inquiry.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async findAllByUser(userId: string) {
        return this.prisma.inquiry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAll() {
        return this.prisma.inquiry.findMany({
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async answer(id: string, answer: string) {
        const inquiry = await this.prisma.inquiry.findUnique({ where: { id } });
        if (!inquiry) throw new NotFoundException('Inquiry not found');

        const updated = await this.prisma.inquiry.update({
            where: { id },
            data: { answer },
            include: { user: true },
        });

        // Simulate email sending
        console.log(`[Email Simulation] Sending email to ${updated.user.email}: Your inquiry "${updated.title}" has been answered.`);

        return updated;
    }
}
