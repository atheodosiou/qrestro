import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty({
    example: { en: 'Cheeseburger', el: 'Τσίζμπεργκερ' },
    description: 'Localized names for the item',
  })
  @IsObject()
  @IsNotEmpty()
  name: Record<string, string>;

  @ApiProperty({
    example: true,
    description: 'If the product is global or not',
  })
  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  @ApiPropertyOptional({
    example: { en: 'Grilled beef with cheese', el: 'Μπιφτέκι σχάρας με τυρί' },
    description: 'Localized descriptions for the item',
  })
  @IsOptional()
  @IsObject()
  description?: Record<string, string>;

  @ApiPropertyOptional({
    example: 9.99,
    description: 'Item price in euros',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Image URL for this menu item',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the item is available',
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'Status of the item',
  })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional({
    example: 2,
    description:
      'Populairity of the item, like how many times it has been ordered',
  })
  @IsOptional()
  @IsNumber()
  popularity?: number;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Default language for this item',
  })
  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}

export class CreateMenuItem2Dto {
  @ApiPropertyOptional({
    example: 'menuitem name',
    description: 'The name for the menu item',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'If the product is global or not',
  })
  @IsBoolean()
  @IsNotEmpty()
  isGlobal: boolean;

  @ApiPropertyOptional({
    example: 'menuitem description',
    description: 'The description for the menu item',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 9.99,
    description: 'Item price in euros',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Image URL for this menu item',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates if the item is available',
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'Status of the item',
  })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional({
    example: 2,
    description:
      'Populairity of the item, like how many times it has been ordered',
  })
  @IsOptional()
  @IsNumber()
  popularity?: number;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Default language for this item',
  })
  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}
