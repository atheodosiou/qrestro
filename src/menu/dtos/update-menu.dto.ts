import { IsOptional, IsString, IsNumber, IsBoolean, IsObject, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
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
    example: 'https://example.com/new-image.jpg',
    description: 'Updated image URL'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Toggle menu availability'
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 0,
    description: 'Updated menu popularity'
  })
  @IsOptional()
  @IsNumber()
  popularity?: number;

  @ApiPropertyOptional({
    example: { sections: [] },
    description: 'Update or remove name translations'
  })
  @IsOptional()
  @IsArray()
  sections?: any[];
}
