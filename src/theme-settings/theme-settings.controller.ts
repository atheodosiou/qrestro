import { Controller, Get, Patch, Param, Body, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ThemeSettingsService } from './theme-settings.service';
import { Types } from 'mongoose';
import { UpdateThemeSettingsDto } from './dtos/update-theme-settings.dto';

@Controller('venues/:venueId/theme-settings')
@UseGuards(JwtAuthGuard)
export class ThemeSettingsController {
    constructor(private readonly themeSettingsService: ThemeSettingsService) { }

    @Get()
    findByVenue(@Param('venueId') venueId: string) {
        return this.themeSettingsService.findByVenue(new Types.ObjectId(venueId));
    }

    @Patch()
    updateOrCreate(
        @Param('venueId') venueId: string,
        @Body() dto: UpdateThemeSettingsDto
    ) {
        return this.themeSettingsService.updateOrCreate(new Types.ObjectId(venueId), dto);
    }

    @Delete()
    delete(@Param('venueId') venueId: string) {
        return this.themeSettingsService.deleteByVenue(new Types.ObjectId(venueId));
    }
}