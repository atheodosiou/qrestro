import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class CreateMenuItemDto {
    @IsObject()
    @IsNotEmpty()
    name: Record<string, string>;

    @IsOptional()
    @IsObject()
    description?: Record<string, string>;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @IsOptional()
    @IsNumber()
    order?: number;

    @IsOptional()
    @IsString()
    defaultLanguage?: string;
}
