import { IsOptional, IsString, IsBoolean, Matches, IsObject } from 'class-validator';

export class UpdateVenueDto {
    @IsOptional()
    @IsObject()
    name?: Record<string, string>;

    @IsOptional()
    @IsObject()
    description?: Record<string, string>;

    @IsOptional()
    @IsString()
    @Matches(/^[a-z0-9-]+$/, {
        message: 'Slug can only contain lowercase letters, numbers, and dashes',
    })
    slug?: string;

    @IsOptional()
    @IsString()
    logoUrl?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    defaultLanguage?: string;
}
