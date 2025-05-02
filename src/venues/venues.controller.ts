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

@Controller('venues')
@UseGuards(JwtAuthGuard)
export class VenuesController {
    constructor(private readonly venuesService: VenuesService) { }

    @Post()
    create(@Request() req, @Body() dto: CreateVenueDto) {
        return this.venuesService.create({ ...dto, ownerId: req.user.userId });
    }

    @Get()
    getMyVenues(@Request() req, @Query('lang') lang?: string) {
        return this.venuesService.findAllByOwner(req.user.userId, lang);
    }

    @Get(':id')
    getById(@Param('id') id: string, @Query('lang') lang?: string) {
        return this.venuesService.findById(id, lang);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateVenueDto, @Request() req) {
        return this.venuesService.update(id, dto, req.user.userId);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Request() req) {
        return this.venuesService.delete(id, req.user.userId);
    }
}
