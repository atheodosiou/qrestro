import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMenuSectionDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNumber()
    order?: number;
}