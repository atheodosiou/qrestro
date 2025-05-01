import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSectionsService } from './menu-sections.service';
import { MenuSectionsController } from './menu-sections.controller';
import { MenuSection, MenuSectionSchema } from './menu-sections.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MenuSection.name, schema: MenuSectionSchema }]),
  ],
  controllers: [MenuSectionsController],
  providers: [MenuSectionsService],
  exports: [MenuSectionsService],
})
export class MenuSectionsModule { }