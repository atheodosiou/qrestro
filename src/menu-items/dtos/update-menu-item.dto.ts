import { IsOptional, IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuItemDto {
    @ApiPropertyOptional({
        example: { fr: 'Hamburger au fromage' },
        description: 'Update or remove name translations'
    })
    @IsOptional()
    @IsObject()
    name?: Record<string, string>;

    @ApiPropertyOptional({
        example: { fr: 'Boeuf grillé avec du fromage' },
        description: 'Update or remove description translations'
    })
    @IsOptional()
    @IsObject()
    description?: Record<string, string>;

    @ApiPropertyOptional({
        example: 10.5,
        description: 'Updated item price'
    })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiPropertyOptional({
        example: 'https://example.com/new-image.jpg',
        description: 'Updated image URL'
    })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional({
        example: false,
        description: 'Toggle item availability'
    })
    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @ApiPropertyOptional({
        example: 3,
        description: 'Updated item order in section'
    })
    @IsOptional()
    @IsNumber()
    order?: number;

    @ApiPropertyOptional({
        example: 'fr',
        description: 'Change default language for the item'
    })
    @IsOptional()
    @IsString()
    defaultLanguage?: string;
}
