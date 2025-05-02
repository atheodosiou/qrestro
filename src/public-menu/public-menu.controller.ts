import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { MenuItemsService } from '../menu-items/menu-items.service';
import { MenuSectionsService } from '../menu-sections/menu-sections.service';
import { ThemeSettingsService } from '../theme-settings/theme-settings.service';
import { VenuesService } from '../venues/venues.service';

@ApiTags('Public Menu')
@Controller('menu')
export class PublicMenuController {
    constructor(
        private readonly venuesService: VenuesService,
        private readonly sectionsService: MenuSectionsService,
        private readonly itemsService: MenuItemsService,
        private readonly themeService: ThemeSettingsService
    ) { }

    @Get(':slug')
    @ApiOperation({ summary: 'Get full public menu by venue slug' })
    @ApiParam({ name: 'slug', description: 'The unique slug for the venue' })
    @ApiQuery({
        name: 'lang',
        required: false,
        description: 'Optional language code for translated venue, sections, and items'
    })
    @ApiResponse({
        status: 200,
        description: 'Returns the full public menu including venue, theme, sections, and items'
    })
    @ApiResponse({ status: 404, description: 'Venue not found' })
    async getMenuBySlug(
        @Param('slug') slug: string,
        @Query('lang') lang?: string
    ) {
        const venueDoc = await this.venuesService.findBySlug(slug, lang);
        if (!venueDoc) throw new NotFoundException('Venue not found');

        const venueId = new Types.ObjectId((venueDoc as any)._id.toString());
        const theme = await this.themeService.findByVenue(venueId);
        const sections = await this.sectionsService.findByVenue(venueId, lang);

        const sectionsWithItems = await Promise.all(
            sections.map(async (section: any) => {
                const items = await this.itemsService.findBySection(section._id, lang);
                return {
                    ...section,
                    items,
                };
            })
        );

        return {
            venue: {
                name: venueDoc.name,
                description: venueDoc.description,
                logoUrl: venueDoc.logoUrl,
                slug: venueDoc.slug,
            },
            theme: theme || {},
            sections: sectionsWithItems,
        };
    }
}
