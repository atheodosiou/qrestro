import { Module } from '@nestjs/common';
import { PublicMenuController } from './public-menu.controller';
import { VenuesModule } from '../venues/venues.module';
import { MenuSectionsModule } from '../menu-sections/menu-sections.module';
import { MenuItemsModule } from '../menu-items/menu-items.module';
import { ThemeSettingsModule } from '../theme-settings/theme-settings.module';

@Module({
  imports: [
    VenuesModule,
    MenuSectionsModule,
    MenuItemsModule,
    ThemeSettingsModule
  ],
  controllers: [PublicMenuController]
})
export class PublicMenuModule { }
