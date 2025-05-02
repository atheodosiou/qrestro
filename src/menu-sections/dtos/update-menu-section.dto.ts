import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuSectionDto {
    @ApiPropertyOptional({
        example: { fr: 'Plats Principaux' },
        description: 'Updated section titles (null to remove)'
    })
    @IsOptional()
    @IsObject()
    title?: Record<string, string>;

    @ApiPropertyOptional({
        example: 1,
        description: 'Order of appearance in the menu'
    })
    @IsOptional()
    @IsNumber()
    order?: number;
}
