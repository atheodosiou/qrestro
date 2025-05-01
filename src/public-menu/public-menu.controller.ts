import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
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
    async getMenuBySlug(@Param('slug') slug: string) {
        const venueDoc = await this.venuesService.findBySlug(slug);
        if (!venueDoc) throw new NotFoundException('Venue not found');

        const venueId = new Types.ObjectId((venueDoc as any)._id.toString());

        const theme = await this.themeService.findByVenue(venueId);
        const sections = await this.sectionsService.findByVenue(venueId);

        const sectionsWithItems = await Promise.all(
            sections.map(async (section) => {
                const items = await this.itemsService.findBySection((section as any)._id);
                return {
                    ...section.toObject(),
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