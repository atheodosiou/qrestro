import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuItem, MenuItemDocument } from './menu-items.schema';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(@InjectModel(MenuItem.name) private itemModel: Model<MenuItemDocument>) { }

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

  async create(dto: CreateMenuItemDto, sectionId: Types.ObjectId) {
    return this.itemModel.create({
      ...dto,
      sectionId
    });
  }

  async findBySection(sectionId: Types.ObjectId, lang?: string) {
    const items = await this.itemModel.find({ sectionId }).sort({ order: 1 });
    return lang
      ? items.map((i) => ({
        _id: i._id,
        price: i.price,
        imageUrl: i.imageUrl,
        isAvailable: i.isAvailable,
        popularity: i.popularity,
        name: this.getTranslated(i.name ?? new Map(), lang, i.defaultLanguage),
        description: this.getTranslated(i.description ?? new Map(), lang, i.defaultLanguage),
      }))
      : items;
  }

  async findOne(id: string, sectionId: Types.ObjectId, lang?: string) {
    const item = await this.itemModel.findOne({ _id: id, sectionId });
    if (!item) throw new NotFoundException('Item not found');

    if (!lang) return item;
    return {
      _id: item._id,
      price: item.price,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
      popularity: item.popularity,
      name: this.getTranslated(item.name ?? new Map(), lang, item.defaultLanguage),
      description: this.getTranslated(item.description ?? new Map(), lang, item.defaultLanguage),
    };
  }

  async update(id: string, dto: UpdateMenuItemDto, sectionId: Types.ObjectId) {
    const item = await this.itemModel.findOne({ _id: id, sectionId });
    if (!item) throw new NotFoundException('Item not found or unauthorized');

    if (dto.name) item.name = this.applyTranslations(item.name || new Map(), dto.name);
    if (dto.description) item.description = this.applyTranslations(item.description || new Map(), dto.description);
    if (typeof dto.price === 'number') item.price = dto.price;
    if (dto.imageUrl) item.imageUrl = dto.imageUrl;
    if (typeof dto.isAvailable === 'boolean') item.isAvailable = dto.isAvailable;
    if (!Number.isNaN(dto.status)) item.status = Number(dto.status) || 0;
    if (typeof dto.popularity === 'number') item.popularity = dto.popularity;
    if (dto.defaultLanguage) item.defaultLanguage = dto.defaultLanguage;

    return item.save();
  }

  async delete(id: string, sectionId: Types.ObjectId) {
    const deleted = await this.itemModel.findOneAndDelete({ _id: id, sectionId });
    if (!deleted) throw new NotFoundException('Item not found or unauthorized');
  }
}