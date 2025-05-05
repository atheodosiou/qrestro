import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsObject, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiPropertyOptional({
    example: { en: 'To menu tou pasxali' },
    description: 'Update or remove name translations'
  })
  @IsOptional()
  @IsObject()
  name?: Record<string, string>;

  @ApiPropertyOptional({
    example: { fr: 'Olo mlks o pasxalis' },
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
    example: [{ sectionId: null, items: [{ itemId: null }] }],
    description: 'Update or remove name translations'
  })
  @IsOptional()
  @IsArray()
  sections?: any[];
}
