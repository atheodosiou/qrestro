import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuItem2Dto } from './dtos/create-menu-item.dto';
import { UpdateMenuItem2Dto } from './dtos/update-menu-item.dto';
import { MenuItem2, MenuItem2Document } from './menu-items-2.schema';

@Injectable()
export class MenuItems2Service {
  constructor(
    @InjectModel(MenuItem2.name) private itemModel: Model<MenuItem2Document>,
  ) {}

  async create(dto: CreateMenuItem2Dto) {
    return this.itemModel.create(dto);
  }

  async findAll() {
    return this.itemModel.find();
  }

  async findById(id: string) {
    const item = await this.itemModel.findById(id);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string, dto: UpdateMenuItem2Dto) {
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
