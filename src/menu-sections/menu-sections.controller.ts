import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMenuSectionDto } from './dtos/create-menu-section.dto';
import { UpdateMenuSectionDto } from './dtos/update-menu-section.dto';
import { MenuSectionsService } from './menu-sections.service';

@ApiTags('Menu Sections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venues/:venueId/sections')
export class MenuSectionsController {
    constructor(private readonly sectionsService: MenuSectionsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new menu section' })
    @ApiParam({ name: 'venueId', description: 'The ID of the parent venue' })
    @ApiResponse({ status: 201, description: 'Section created successfully' })
    create(
        @Param('venueId') venueId: string,
        @Request() req,
        @Body() dto: CreateMenuSectionDto
    ) {
        return this.sectionsService.create(dto, new Types.ObjectId(venueId));
    }

    @Get()
    @ApiOperation({ summary: 'Get all sections for a venue' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiQuery({ name: 'lang', required: false, description: 'Language code for translated titles' })
    @ApiResponse({ status: 200, description: 'List of sections' })
    findAll(@Param('venueId') venueId: string, @Query('lang') lang?: string) {
        return this.sectionsService.findByVenue(new Types.ObjectId(venueId), lang);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one section by ID' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiParam({ name: 'id', description: 'Section ID' })
    @ApiQuery({ name: 'lang', required: false, description: 'Language code for translated title' })
    @ApiResponse({ status: 200, description: 'Section retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Section not found' })
    getById(
        @Param('venueId') venueId: string,
        @Param('id') id: string,
        @Query('lang') lang?: string
    ) {
        return this.sectionsService.findOne(id, new Types.ObjectId(venueId), lang);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a menu section' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiParam({ name: 'id', description: 'Section ID' })
    @ApiResponse({ status: 200, description: 'Section updated successfully' })
    update(
        @Param('venueId') venueId: string,
        @Param('id') id: string,
        @Body() dto: UpdateMenuSectionDto,
        @Request() req
    ) {
        return this.sectionsService.update(id, dto, new Types.ObjectId(venueId));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a menu section' })
    @ApiParam({ name: 'venueId', description: 'The ID of the venue' })
    @ApiParam({ name: 'id', description: 'Section ID' })
    @ApiResponse({ status: 200, description: 'Section deleted successfully' })
    @ApiResponse({ status: 404, description: 'Section not found or unauthorized' })
    remove(
        @Param('venueId') venueId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.sectionsService.delete(id, new Types.ObjectId(venueId));
    }
}
