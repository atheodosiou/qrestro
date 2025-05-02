import { IsNotEmpty, IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class CreateVenueDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9-]+$/, {
        message: 'Slug can only contain lowercase letters, numbers, and dashes',
    })
    slug: string;

    @IsObject()
    @IsNotEmpty()
    name: Record<string, string>;

    @IsOptional()
    @IsObject()
    description?: Record<string, string>;

    @IsOptional()
    @IsString()
    logoUrl?: string;

    @IsOptional()
    @IsString()
    defaultLanguage?: string;
}
