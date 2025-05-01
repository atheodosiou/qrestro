import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateThemeSettingsDto {
    @IsOptional()
    @IsString()
    primaryColor?: string;

    @IsOptional()
    @IsString()
    font?: string;

    @IsOptional()
    @IsIn(['classic', 'modern', 'compact'])
    layoutStyle?: 'classic' | 'modern' | 'compact';
}
