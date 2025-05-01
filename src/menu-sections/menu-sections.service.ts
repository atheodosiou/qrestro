import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuSection, MenuSectionDocument } from './menu-sections.schema';
import { CreateMenuSectionDto } from './dtos/create-menu-section.dto';
import { UpdateMenuSectionDto } from './dtos/update-menu-section.dto';

@Injectable()
export class MenuSectionsService {
    constructor(
        @InjectModel(MenuSection.name) private sectionModel: Model<MenuSectionDocument>
    ) { }

    create(dto: CreateMenuSectionDto, venueId: Types.ObjectId) {
        return this.sectionModel.create({ ...dto, venueId: new Types.ObjectId(venueId) });
    }

    findByVenue(venueId: Types.ObjectId) {
        return this.sectionModel.find({ venueId: new Types.ObjectId(venueId) }).sort({ order: 1 }).exec();
    }

    async findOne(id: string, venueId: Types.ObjectId) {
        const section = await this.sectionModel.findOne({ _id: id, venueId });
        if (!section) throw new NotFoundException('Section not found');
        return section;
    }

    async update(id: string, dto: UpdateMenuSectionDto, venueId: Types.ObjectId) {
        const section = await this.sectionModel.findOneAndUpdate(
            { _id: id, venueId: new Types.ObjectId(venueId) },
            { $set: dto },
            { new: true }
        );
        if (!section) throw new NotFoundException('Section not found or unauthorized');
        return section;
    }

    async delete(id: string, venueId: Types.ObjectId) {
        const deleted = await this.sectionModel.findOneAndDelete({ _id: id, venueId: new Types.ObjectId(venueId) });
        if (!deleted) throw new NotFoundException('Section not found or unauthorized');
    }
}