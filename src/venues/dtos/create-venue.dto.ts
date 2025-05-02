import { IsNotEmpty, IsObject, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty({
    example: 'burger-house',
    description: 'Unique slug for the venue URL',
    pattern: '^[a-z0-9-]+$'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug can only contain lowercase letters, numbers, and dashes',
  })
  slug: string;

  @ApiProperty({
    example: { en: 'Burger House', el: 'Μπέργκερ Χάουζ' },
    description: 'Localized names per language code'
  })
  @IsObject()
  @IsNotEmpty()
  name: Record<string, string>;

  @ApiPropertyOptional({
    example: { en: 'A delicious burger spot.', el: 'Νόστιμα μπέργκερ στην πόλη.' },
    description: 'Localized descriptions per language code'
  })
  @IsOptional()
  @IsObject()
  description?: Record<string, string>;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.png',
    description: 'Optional logo image URL for the venue'
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({
    example: 'en',
    description: 'The default language to fallback when translation is missing'
  })
  @IsOptional()
  @IsString()
  defaultLanguage?: string;
}
