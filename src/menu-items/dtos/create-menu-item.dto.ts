import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuItemDto {
    @ApiProperty({
        example: { en: 'Cheeseburger', el: 'Τσίζμπεργκερ' },
        description: 'Localized names for the item'
    })
    @IsObject()
    @IsNotEmpty()
    name: Record<string, string>;

    @ApiPropertyOptional({
        example: { en: 'Grilled beef with cheese', el: 'Μπιφτέκι σχάρας με τυρί' },
        description: 'Localized descriptions for the item'
    })
    @IsOptional()
    @IsObject()
    description?: Record<string, string>;

    @ApiPropertyOptional({
        example: 9.99,
        description: 'Item price in euros'
    })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiPropertyOptional({
        example: 'https://example.com/image.jpg',
        description: 'Image URL for this menu item'
    })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Indicates if the item is available'
    })
    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @ApiPropertyOptional({
        example: 2,
        description: 'Ordering position in the section'
    })
    @IsOptional()
    @IsNumber()
    order?: number;

    @ApiPropertyOptional({
        example: 'en',
        description: 'Default language for this item'
    })
    @IsOptional()
    @IsString()
    defaultLanguage?: string;
}
