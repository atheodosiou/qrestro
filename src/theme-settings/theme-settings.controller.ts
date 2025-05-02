import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateThemeSettingsDto } from './dtos/update-theme-settings.dto';
import { ThemeSettingsService } from './theme-settings.service';

@ApiTags('Theme Settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venues/:venueId/theme-settings')
export class ThemeSettingsController {
    constructor(private readonly themeSettingsService: ThemeSettingsService) { }

    @Get()
    @ApiOperation({ summary: 'Get theme settings for a venue' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiResponse({ status: 200, description: 'Theme settings retrieved successfully' })
    findByVenue(@Param('venueId') venueId: string) {
        return this.themeSettingsService.findByVenue(new Types.ObjectId(venueId));
    }

    @Patch()
    @ApiOperation({ summary: 'Update or create theme settings for a venue' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiBody({ type: UpdateThemeSettingsDto })
    @ApiResponse({ status: 200, description: 'Theme settings updated or created' })
    updateOrCreate(
        @Param('venueId') venueId: string,
        @Body() dto: UpdateThemeSettingsDto
    ) {
        return this.themeSettingsService.updateOrCreate(new Types.ObjectId(venueId), dto);
    }

    @Delete()
    @ApiOperation({ summary: 'Delete theme settings for a venue' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiResponse({ status: 200, description: 'Theme settings deleted successfully' })
    delete(@Param('venueId') venueId: string) {
        return this.themeSettingsService.deleteByVenue(new Types.ObjectId(venueId));
    }
}
