import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuSectionDto {
  @ApiProperty({
    example: { en: 'Main Dishes', el: 'Κυρίως Πιάτα' },
    description: 'Section title translations per language'
  })
  @IsNotEmpty()
  @IsObject()
  title: Record<string, string>;

  @ApiPropertyOptional({
    example: 'en',
    description: 'Default language for this section'
  })
  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}
