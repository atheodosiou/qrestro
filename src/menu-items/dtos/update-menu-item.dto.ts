import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuItemDto {
  @ApiPropertyOptional({
    example: { fr: 'Hamburger au fromage' },
    description: 'Update or remove name translations',
  })
  @IsOptional()
  @IsObject()
  name?: Record<string, string>;

  @ApiPropertyOptional({
    example: { fr: 'Boeuf grillé avec du fromage' },
    description: 'Update or remove description translations',
  })
  @IsOptional()
  @IsObject()
  description?: Record<string, string>;

  @ApiPropertyOptional({
    example: 10.5,
    description: 'Updated item price',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Global item',
  })
  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @ApiPropertyOptional({
    example: 'https://example.com/new-image.jpg',
    description: 'Updated image URL',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Toggle item availability',
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    example: 'Updated item status',
    description: 'Updated item status',
  })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Updated item popularity in section',
  })
  @IsOptional()
  @IsNumber()
  popularity?: number;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Change default language for the item',
  })
  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}

export class UpdateMenuItem2Dto {
  @ApiPropertyOptional({
    example: 'menuitem name',
    description: 'The name for the menu item',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'menuitem description',
    description: 'The description for the menu item',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 10.5,
    description: 'Updated item price',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Global item',
  })
  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @ApiPropertyOptional({
    example: 'https://example.com/new-image.jpg',
    description: 'Updated image URL',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Toggle item availability',
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    example: 'Updated item status',
    description: 'Updated item status',
  })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Updated item popularity in section',
  })
  @IsOptional()
  @IsNumber()
  popularity?: number;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Change default language for the item',
  })
  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}
