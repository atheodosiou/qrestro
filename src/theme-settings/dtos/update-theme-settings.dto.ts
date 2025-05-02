import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateThemeSettingsDto {
    @ApiPropertyOptional({
        example: '#FF5733',
        description: 'Primary color for the venue theme'
    })
    @IsOptional()
    @IsString()
    primaryColor?: string;

    @ApiPropertyOptional({
        example: 'Inter',
        description: 'Font name to be used in the venue'
    })
    @IsOptional()
    @IsString()
    font?: string;

    @ApiPropertyOptional({
        example: 'modern',
        enum: ['classic', 'modern', 'compact'],
        description: 'Layout style preset for the venue'
    })
    @IsOptional()
    @IsIn(['classic', 'modern', 'compact'])
    layoutStyle?: 'classic' | 'modern' | 'compact';
}
