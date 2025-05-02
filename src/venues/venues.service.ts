import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Venue, VenueDocument } from './venues.schema';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';


@Injectable()
export class VenuesService {
    constructor(@InjectModel(Venue.name) private venueModel: Model<VenueDocument>) { }

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

    async create(data: CreateVenueDto & { ownerId: Types.ObjectId }): Promise<Venue> {
        const exists = await this.venueModel.findOne({ slug: data.slug });
        if (exists) throw new ConflictException('Slug already in use');
        return this.venueModel.create({
            ...data,
            defaultLanguage: data.defaultLanguage || 'en',
        });
    }

    async findAllByOwner(ownerId: Types.ObjectId, lang?: string): Promise<any[]> {
        const venues = await this.venueModel.find({ ownerId });
        return venues.map((v) =>
            lang
                ? {
                    _id: v._id,
                    slug: v.slug,
                    logoUrl: v.logoUrl,
                    name: this.getTranslated(v.name, lang, v.defaultLanguage),
                    description: this.getTranslated(v.description, lang, v.defaultLanguage),
                }
                : v
        );
    }

    async findBySlug(slug: string, lang?: string): Promise<any> {
        const venue = await this.venueModel.findOne({ slug });
        if (!venue) throw new NotFoundException('Venue not found');

        if (!lang) return venue;

        return {
            _id: venue._id,
            slug: venue.slug,
            logoUrl: venue.logoUrl,
            name: this.getTranslated(venue.name, lang, venue.defaultLanguage),
            description: this.getTranslated(venue.description, lang, venue.defaultLanguage),
        };
    }

    async findById(id: string, lang?: string): Promise<any> {
        const venue = await this.venueModel.findById(id);
        if (!venue) throw new NotFoundException('Venue not found');
        if (!lang) return venue;
        return {
            _id: venue._id,
            slug: venue.slug,
            logoUrl: venue.logoUrl,
            name: this.getTranslated(venue.name, lang, venue.defaultLanguage),
            description: this.getTranslated(venue.description, lang, venue.defaultLanguage),
        };
    }

    // findOneAndUpdate?
    // It doesn’t play well with Map<string, string>. findOne() + mutation + save() is safer and more flexible for translation logic.

    async update(id: string, data: UpdateVenueDto, ownerId: Types.ObjectId): Promise<Venue> {
        const venue = await this.venueModel.findOne({ _id: id, ownerId });
        if (!venue) throw new NotFoundException('Venue not found or unauthorized');

        if (data.name) venue.name = this.applyTranslations(venue.name || new Map(), data.name);
        if (data.description) venue.description = this.applyTranslations(venue.description || new Map(), data.description);
        if (data.slug) venue.slug = data.slug;
        if (data.logoUrl) venue.logoUrl = data.logoUrl;
        if (typeof data.isActive === 'boolean') venue.isActive = data.isActive;
        if (data.defaultLanguage) venue.defaultLanguage = data.defaultLanguage;

        return venue.save();
    }

    async delete(id: string, ownerId: Types.ObjectId): Promise<void> {
        const res = await this.venueModel.findOneAndDelete({ _id: id, ownerId });
        if (!res) throw new NotFoundException('Venue not found or unauthorized');
    }
}
