import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeSettingsService } from './theme-settings.service';
import { ThemeSettingsController } from './theme-settings.controller';
import { ThemeSettings, ThemeSettingsSchema } from './theme-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ThemeSettings.name, schema: ThemeSettingsSchema }]),
  ],
  controllers: [ThemeSettingsController],
  providers: [ThemeSettingsService],
  exports: [ThemeSettingsService],
})
export class ThemeSettingsModule { }