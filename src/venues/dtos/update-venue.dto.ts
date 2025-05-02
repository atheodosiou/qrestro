import { IsOptional, IsString, IsBoolean, Matches, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVenueDto {
    @ApiPropertyOptional({
        example: { fr: 'Maison du Burger' },
        description: 'Localized names to update or add (null to remove a translation)'
    })
    @IsOptional()
    @IsObject()
    name?: Record<string, string>;

    @ApiPropertyOptional({
        example: { fr: 'Un délicieux endroit pour les burgers.' },
        description: 'Localized descriptions to update or add (null to remove a translation)'
    })
    @IsOptional()
    @IsObject()
    description?: Record<string, string>;

    @ApiPropertyOptional({
        example: 'burger-house-fr',
        description: 'Updated slug for the venue'
    })
    @IsOptional()
    @IsString()
    @Matches(/^[a-z0-9-]+$/, {
        message: 'Slug can only contain lowercase letters, numbers, and dashes',
    })
    slug?: string;

    @ApiPropertyOptional({
        example: 'https://example.com/new-logo.png',
        description: 'New logo image URL'
    })
    @IsOptional()
    @IsString()
    logoUrl?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Whether the venue is active or not'
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({
        example: 'fr',
        description: 'Change the default fallback language for translations'
    })
    @IsOptional()
    @IsString()
    defaultLanguage?: string;
}
