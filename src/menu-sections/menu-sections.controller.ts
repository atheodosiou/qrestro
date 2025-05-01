import { Controller, Post, Body, Param, Patch, Delete, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MenuSectionsService } from './menu-sections.service';
import { CreateMenuSectionDto } from './dtos/create-menu-section.dto';
import { UpdateMenuSectionDto } from './dtos/update-menu-section.dto';
import { Types } from 'mongoose';

@Controller('venues/:venueId/sections')
@UseGuards(JwtAuthGuard)
export class MenuSectionsController {
    constructor(private readonly sectionsService: MenuSectionsService) { }

    @Post()
    create(
        @Param('venueId') venueId: string,
        @Request() req,
        @Body() dto: CreateMenuSectionDto
    ) {
        return this.sectionsService.create(dto, new Types.ObjectId(venueId));
    }

    @Get()
    findAll(@Param('venueId') venueId: string) {
        return this.sectionsService.findByVenue(new Types.ObjectId(venueId));
    }

    @Get(':id')
    getById(
        @Param('venueId') venueId: string,
        @Param('id') id: string
    ) {
        return this.sectionsService.findOne(id, new Types.ObjectId(venueId));
    }

    @Patch(':id')
    update(
        @Param('venueId') venueId: string,
        @Param('id') id: string,
        @Body() dto: UpdateMenuSectionDto,
        @Request() req
    ) {
        return this.sectionsService.update(id, dto, new Types.ObjectId(venueId));
    }

    @Delete(':id')
    remove(
        @Param('venueId') venueId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.sectionsService.delete(id, new Types.ObjectId(venueId));
    }
}