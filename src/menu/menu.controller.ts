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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';

@ApiTags('Menu')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('menus/')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 201, description: 'Menu created' })
  create(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'List of menus returned' })
  findAll(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'Menu found' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  findOne() {
    return this.menuService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'Menu updated' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto
  ) {
    return this.menuService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'Menu deleted' })
  @ApiResponse({ status: 404, description: 'Menu not found or unauthorized' })
  remove(@Param('id') id: string) {
    return this.menuService.delete(new Types.ObjectId(id));
  }
}
