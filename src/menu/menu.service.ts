import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Menu, MenuDocument } from './menu.schema';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private itemModel: Model<MenuDocument>) { }

  private applyTranslations(map: Map<string, string>, updates: Record<string, string | null>): Map<string, string> {
    for (const [lang, value] of Object.entries(updates)) {
      if (value === null) map.delete(lang);
      else map.set(lang, value);
    }
    return map;
  }

  async create(dto: CreateMenuDto) {
    return this.itemModel.create({
      ...dto,
    });
  }

  async findAll() {
    return this.itemModel.find({}).sort({ order: 1 });
  }

  async findOne(id: string) {
    console.log(id);
    const item = await this.itemModel.findOne({ _id: id });
    if (!item) throw new NotFoundException('Item not found');

    return item;
  }

  async update(id: string, dto: UpdateMenuDto) {
    const item = await this.itemModel.findOne({ _id: id });
    if (!item) throw new NotFoundException('Item not found or unauthorized');

    if (dto.name) item.name = this.applyTranslations(item.name || new Map(), dto.name);
    if (dto.description) item.description = this.applyTranslations(item.description || new Map(), dto.description);
    if (dto.imageUrl) item.imageUrl = dto.imageUrl;
    if (typeof dto.isActive === 'boolean') item.isActive = dto.isActive;
    if (typeof dto.popularity === 'number') item.popularity = dto.popularity;
    if (Array.isArray(dto.sections)) item.sections = dto.sections;


    return item.save();
  }

  async delete(id: Types.ObjectId | string) {
    const deleted = await this.itemModel.findOneAndDelete({ _id: id });
    if (!deleted) throw new NotFoundException('Item not found or unauthorized');
    return deleted;
  }
}