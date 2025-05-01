import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Venue, VenueDocument } from './venues.schema';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';


@Injectable()
export class VenuesService {
    constructor(@InjectModel(Venue.name) private venueModel: Model<VenueDocument>) { }

    async create(data: CreateVenueDto & { ownerId: Types.ObjectId }): Promise<Venue> {
        const exists = await this.venueModel.findOne({ slug: data.slug });
        if (exists) throw new ConflictException('Slug already in use');

        return this.venueModel.create(data);
    }

    async findAllByOwner(ownerId: Types.ObjectId): Promise<Venue[]> {
        return this.venueModel.find({ ownerId }).exec();
    }

    async findBySlug(slug: string): Promise<Venue> {
        const venue = await this.venueModel.findOne({ slug });
        if (!venue) throw new NotFoundException('Venue not found');
        return venue;
    }

    async findById(id: string): Promise<Venue> {
        const venue = await this.venueModel.findById(id);
        if (!venue) throw new NotFoundException('Venue not found');
        return venue;
    }

    async update(id: string, data: UpdateVenueDto, ownerId: Types.ObjectId): Promise<Venue> {
        const venue = await this.venueModel.findOneAndUpdate(
            { _id: id, ownerId },
            { $set: data },
            { new: true }
        );

        if (!venue) throw new NotFoundException('Venue not found or unauthorized');
        return venue;
    }

    async delete(id: string, ownerId: Types.ObjectId): Promise<void> {
        const res = await this.venueModel.findOneAndDelete({ _id: id, ownerId });
        if (!res) throw new NotFoundException('Venue not found or unauthorized');
    }
}
