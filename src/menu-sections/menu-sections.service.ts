import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuSection, MenuSectionDocument } from './menu-sections.schema';
import { CreateMenuSectionDto } from './dtos/create-menu-section.dto';
import { UpdateMenuSectionDto } from './dtos/update-menu-section.dto';

@Injectable()
export class MenuSectionsService {

    constructor(@InjectModel(MenuSection.name) private sectionModel: Model<MenuSectionDocument>) { }

    private getTranslated(map: Map<string, string> | undefined, lang: string, fallback: string): string {
        return map?.get(lang) || map?.get(fallback) || '';
    }

    private applyTranslations(map: Map<string, string>, updates: Record<string, string | null>): Map<string, string> {
        for (const [lang, value] of Object.entries(updates)) {
            if (value === null) map.delete(lang);
            else map.set(lang, value);
        }
        return map;
    }

    async create(dto: CreateMenuSectionDto, venueId: Types.ObjectId) {
        return this.sectionModel.create({
            venueId,
            order: 0,
            title: dto.title,
            defaultLanguage: dto.defaultLanguage || 'en',
        });
    }

    async findByVenue(venueId: Types.ObjectId, lang?: string) {
        const sections = await this.sectionModel.find({ venueId }).sort({ order: 1 });
        return lang
            ? sections.map((s) => ({
                _id: s._id,
                order: s.order,
                title: this.getTranslated(s.title ?? new Map(), lang, s.defaultLanguage),
            }))
            : sections;
    }

    async findOne(id: string, venueId: Types.ObjectId, lang?: string) {
        const section = await this.sectionModel.findOne({ _id: id, venueId });
        if (!section) throw new NotFoundException('Section not found');

        if (!lang) return section;
        return {
            _id: section._id,
            order: section.order,
            title: this.getTranslated(section.title ?? new Map(), lang, section.defaultLanguage),
        };
    }

    async update(id: string, dto: UpdateMenuSectionDto, venueId: Types.ObjectId) {
        const section = await this.sectionModel.findOne({ _id: id, venueId });
        if (!section) throw new NotFoundException('Section not found or unauthorized');

        if (dto.title) section.title = this.applyTranslations(section.title || new Map(), dto.title);
        if (typeof dto.order === 'number') section.order = dto.order;

        return section.save();
    }

    async delete(id: string, venueId: Types.ObjectId) {
        const deleted = await this.sectionModel.findOneAndDelete({ _id: id, venueId });
        if (!deleted) throw new NotFoundException('Section not found or unauthorized');
    }
}