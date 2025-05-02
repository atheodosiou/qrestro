import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    Request,
    Query,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Venues')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venues')
export class VenuesController {
    constructor(private readonly venuesService: VenuesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new venue' })
    @ApiResponse({ status: 201, description: 'Venue created successfully' })
    create(@Request() req, @Body() dto: CreateVenueDto) {
        return this.venuesService.create({ ...dto, ownerId: req.user.userId });
    }

    @Get()
    @ApiOperation({ summary: 'Get all venues for the authenticated user' })
    @ApiQuery({ name: 'lang', required: false, description: 'Language code for translated fields' })
    @ApiResponse({ status: 200, description: 'List of venues' })
    getMyVenues(@Request() req, @Query('lang') lang?: string) {
        return this.venuesService.findAllByOwner(req.user.userId, lang);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single venue by ID' })
    @ApiParam({ name: 'id', description: 'Venue ID' })
    @ApiQuery({ name: 'lang', required: false, description: 'Language code for translated fields' })
    @ApiResponse({ status: 200, description: 'Venue found' })
    @ApiResponse({ status: 404, description: 'Venue not found' })
    getById(@Param('id') id: string, @Query('lang') lang?: string) {
        return this.venuesService.findById(id, lang);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a venue' })
    @ApiParam({ name: 'id', description: 'Venue ID' })
    @ApiResponse({ status: 200, description: 'Venue updated successfully' })
    @ApiResponse({ status: 404, description: 'Venue not found or unauthorized' })
    update(@Param('id') id: string, @Body() dto: UpdateVenueDto, @Request() req) {
        return this.venuesService.update(id, dto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a venue' })
    @ApiParam({ name: 'id', description: 'Venue ID' })
    @ApiResponse({ status: 200, description: 'Venue deleted successfully' })
    @ApiResponse({ status: 404, description: 'Venue not found or unauthorized' })
    delete(@Param('id') id: string, @Request() req) {
        return this.venuesService.delete(id, req.user.userId);
    }
}
