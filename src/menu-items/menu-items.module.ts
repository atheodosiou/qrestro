import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import { MenuItem, MenuItemSchema } from './menu-items.schema';
import { MenuItems2Controller } from './menu-items-2.controller';
import { MenuItems2Service } from './menu-items-2.service';
import { MenuItem2, MenuItem2Schema } from './menu-items-2.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
      { name: MenuItem2.name, schema: MenuItem2Schema },
    ]),
  ],
  controllers: [MenuItemsController, MenuItems2Controller],
  providers: [MenuItemsService, MenuItems2Service],
  exports: [MenuItemsService, MenuItems2Service],
})
export class MenuItemsModule {}
