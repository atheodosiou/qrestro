import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';
import { MenuItemsService } from './menu-items.service';

@Controller('venues/:venueId/sections/:sectionId/items')
@UseGuards(JwtAuthGuard)
export class MenuItemsController {
    constructor(private readonly menuItemsService: MenuItemsService) { }

    @Post()
    create(@Param('sectionId') sectionId: string, @Body() dto: CreateMenuItemDto) {
        return this.menuItemsService.create(dto, new Types.ObjectId(sectionId));
    }

    @Get()
    findAll(@Param('sectionId') sectionId: string, @Query('lang') lang?: string) {
        return this.menuItemsService.findBySection(new Types.ObjectId(sectionId), lang);
    }

    @Get(':id')
    findOne(@Param('sectionId') sectionId: string, @Param('id') id: string, @Query('lang') lang?: string) {
        return this.menuItemsService.findOne(id, new Types.ObjectId(sectionId), lang);
    }

    @Patch(':id')
    update(
        @Param('sectionId') sectionId: string,
        @Param('id') id: string,
        @Body() dto: UpdateMenuItemDto
    ) {
        return this.menuItemsService.update(id, dto, new Types.ObjectId(sectionId));
    }

    @Delete(':id')
    remove(@Param('sectionId') sectionId: string, @Param('id') id: string) {
        return this.menuItemsService.delete(id, new Types.ObjectId(sectionId));
    }
}