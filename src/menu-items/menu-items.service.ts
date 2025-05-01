import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuItem, MenuItemDocument } from './menu-items.schema';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
    constructor(
        @InjectModel(MenuItem.name) private itemModel: Model<MenuItemDocument>
    ) { }

    create(dto: CreateMenuItemDto, sectionId: Types.ObjectId) {
        return this.itemModel.create({ ...dto, sectionId: new Types.ObjectId(sectionId) });
    }

    findBySection(sectionId: Types.ObjectId) {
        return this.itemModel.find({ sectionId: new Types.ObjectId(sectionId) }).sort({ order: 1 }).exec();
    }

    async findOne(id: string, sectionId: Types.ObjectId) {
        const item = await this.itemModel.findOne({ _id: id, sectionId: new Types.ObjectId(sectionId) });
        if (!item) throw new NotFoundException('Item not found');
        return item;
    }

    async update(id: string, dto: UpdateMenuItemDto, sectionId: Types.ObjectId) {
        const item = await this.itemModel.findOneAndUpdate(
            { _id: id, sectionId: new Types.ObjectId(sectionId) },
            { $set: dto },
            { new: true }
        );
        if (!item) throw new NotFoundException('Item not found or unauthorized');
        return item;
    }

    async delete(id: string, sectionId: Types.ObjectId) {
        const deleted = await this.itemModel.findOneAndDelete({ _id: id, sectionId: new Types.ObjectId(sectionId) });
        if (!deleted) throw new NotFoundException('Item not found or unauthorized');
    }
}