import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SubscribeDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Post()
    async subscribe(@Body() dto: SubscribeDto) {
        if (!dto.email) {
            throw new BadRequestException('Email is required');
        }
        return this.subscriptionService.subscribe(dto.email);
    }
}
