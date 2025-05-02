import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';
import { MenuItemsService } from './menu-items.service';

@ApiTags('Menu Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venues/:venueId/sections/:sectionId/items')
export class MenuItemsController {
    constructor(private readonly menuItemsService: MenuItemsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new menu item' })
    @ApiParam({ name: 'venueId', description: 'Venue ID' })
    @ApiParam({ name: 'sectionId', description: 'Menu Section ID' })
    @ApiResponse({ status: 201, description: 'Menu item created' })
    create(@Param('sectionId') sectionId: string, @Body() dto: CreateMenuItemDto) {
        return this.menuItemsService.create(dto, new Types.ObjectId(sectionId));
    }

    @Get()
    @ApiOperation({ summary: 'Get all items in a section' })
    @ApiParam({ name: 'venueId', description: 'Venue ID' })
    @ApiParam({ name: 'sectionId', description: 'Menu Section ID' })
    @ApiQuery({ name: 'lang', required: false, description: 'Language code for translation' })
    @ApiResponse({ status: 200, description: 'List of items returned' })
    findAll(@Param('sectionId') sectionId: string, @Query('lang') lang?: string) {
        return this.menuItemsService.findBySection(new Types.ObjectId(sectionId), lang);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one menu item by ID' })
    @ApiParam({ name: 'venueId', description: 'Venue ID' })
    @ApiParam({ name: 'sectionId', description: 'Menu Section ID' })
    @ApiParam({ name: 'id', description: 'Menu Item ID' })
    @ApiQuery({ name: 'lang', required: false, description: 'Language code for translation' })
    @ApiResponse({ status: 200, description: 'Menu item found' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    findOne(@Param('sectionId') sectionId: string, @Param('id') id: string, @Query('lang') lang?: string) {
        return this.menuItemsService.findOne(id, new Types.ObjectId(sectionId), lang);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a menu item' })
    @ApiParam({ name: 'venueId', description: 'Venue ID' })
    @ApiParam({ name: 'sectionId', description: 'Menu Section ID' })
    @ApiParam({ name: 'id', description: 'Menu Item ID' })
    @ApiResponse({ status: 200, description: 'Menu item updated' })
    update(
        @Param('sectionId') sectionId: string,
        @Param('id') id: string,
        @Body() dto: UpdateMenuItemDto
    ) {
        return this.menuItemsService.update(id, dto, new Types.ObjectId(sectionId));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a menu item' })
    @ApiParam({ name: 'venueId', description: 'Venue ID' })
    @ApiParam({ name: 'sectionId', description: 'Menu Section ID' })
    @ApiParam({ name: 'id', description: 'Menu Item ID' })
    @ApiResponse({ status: 200, description: 'Menu item deleted' })
    @ApiResponse({ status: 404, description: 'Item not found or unauthorized' })
    remove(@Param('sectionId') sectionId: string, @Param('id') id: string) {
        return this.menuItemsService.delete(id, new Types.ObjectId(sectionId));
    }
}
