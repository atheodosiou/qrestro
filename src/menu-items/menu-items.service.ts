import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';
import { MenuItem, MenuItemDocument } from './menu-items.schema';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectModel(MenuItem.name) private itemModel: Model<MenuItemDocument>,
  ) {}

  async create(dto: CreateMenuItemDto) {
    return this.itemModel.create(dto);
  }

  async findBySection(sectionId: string, lang: string = 'en') {
    const items = await this.itemModel.find({ section: sectionId });
    if (!items || items.length === 0) {
      throw new NotFoundException('No items found for this section');
    }
    return items;
  }

  async findAll() {
    return this.itemModel.find();
  }

  async findById(id: string) {
    const item = await this.itemModel.findById(id);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string, dto: UpdateMenuItemDto) {
    const updated = await this.itemModel.findOneAndUpdate(
      { _id: id },
      { $set: dto },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Item not found or unauthorized');
    }

    return updated;
  }

  async delete(id: string) {
    const deleted = await this.itemModel.findOneAndDelete({
      _id: id,
    });
    if (!deleted) throw new NotFoundException('Item not found or unauthorized');
  }
}
