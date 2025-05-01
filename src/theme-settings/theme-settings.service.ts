import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ThemeSettings, ThemeSettingsDocument } from './theme-settings.schema';
import { UpdateThemeSettingsDto } from './dtos/update-theme-settings.dto';

@Injectable()
export class ThemeSettingsService {
    constructor(
        @InjectModel(ThemeSettings.name) private settingsModel: Model<ThemeSettingsDocument>
    ) { }

    async findByVenue(venueId: Types.ObjectId) {
        return this.settingsModel.findOne({ venueId: new Types.ObjectId(venueId) }).exec();
    }

    async updateOrCreate(venueId: Types.ObjectId, dto: UpdateThemeSettingsDto) {
        return this.settingsModel.findOneAndUpdate(
            { venueId: new Types.ObjectId(venueId) },
            { $set: dto },
            { upsert: true, new: true }
        );
    }

    async deleteByVenue(venueId: Types.ObjectId) {
        const deleted = await this.settingsModel.findOneAndDelete({ venueId });
        if (!deleted) throw new NotFoundException('Section not found or unauthorized');
    }
}
