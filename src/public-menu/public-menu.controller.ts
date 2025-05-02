import { Controller, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { VenuesService } from '../venues/venues.service';
import { MenuSectionsService } from '../menu-sections/menu-sections.service';
import { MenuItemsService } from '../menu-items/menu-items.service';
import { ThemeSettingsService } from '../theme-settings/theme-settings.service';
import { Types } from 'mongoose';

@Controller('menu')
export class PublicMenuController {
    constructor(
        private readonly venuesService: VenuesService,
        private readonly sectionsService: MenuSectionsService,
        private readonly itemsService: MenuItemsService,
        private readonly themeService: ThemeSettingsService
    ) { }

    @Get(':slug')
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