import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInquiryDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsBoolean()
    isPrivate?: boolean;
}

export class AnswerInquiryDto {
    @IsNotEmpty()
    answer: string;
}
