import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';
import { Types } from 'mongoose';

@Controller('venues/:venueId/sections/:sectionId/items')
@UseGuards(JwtAuthGuard)
export class MenuItemsController {
    constructor(private readonly menuItemsService: MenuItemsService) { }

    @Post()
    create(@Param('sectionId') sectionId: string, @Body() dto: CreateMenuItemDto) {
        return this.menuItemsService.create(dto, new Types.ObjectId(sectionId));
    }

    @Get()
    findAll(@Param('sectionId') sectionId: string) {
        return this.menuItemsService.findBySection(new Types.ObjectId(sectionId));
    }

    @Get(':id')
    findOne(@Param('sectionId') sectionId: string, @Param('id') id: string) {
        return this.menuItemsService.findOne(id, new Types.ObjectId(sectionId));
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
    remove(
        @Param('sectionId') sectionId: string,
        @Param('id') id: string
    ) {
        return this.menuItemsService.delete(id, new Types.ObjectId(sectionId));
    }
}