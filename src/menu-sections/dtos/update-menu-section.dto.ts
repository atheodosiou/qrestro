import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class UpdateMenuSectionDto {
    @IsOptional()
    @IsObject()
    title?: Record<string, string>;

    @IsOptional()
    @IsNumber()
    order?: number;
}