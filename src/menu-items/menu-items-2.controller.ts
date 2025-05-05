import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
    CreateMenuItem2Dto
} from './dtos/create-menu-item.dto';
import {
    UpdateMenuItem2Dto
} from './dtos/update-menu-item.dto';
import { MenuItems2Service } from './menu-items-2.service';

@ApiTags('Menu Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('menu-items')
export class MenuItems2Controller {
  constructor(private readonly menuItemsService: MenuItems2Service) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({ status: 201, description: 'Menu item created' })
  create(@Body() dto: CreateMenuItem2Dto) {
    return this.menuItemsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items in a section' })
  @ApiResponse({ status: 200, description: 'List of items returned' })
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one menu item by ID' })
  @ApiParam({ name: 'id', description: 'Menu Item ID' })
  @ApiResponse({ status: 200, description: 'Menu item found' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu item' })
  @ApiParam({ name: 'id', description: 'Menu Item ID' })
  @ApiResponse({ status: 200, description: 'Menu item updated' })
  update(@Param('id') id: string, @Body() dto: UpdateMenuItem2Dto) {
    return this.menuItemsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item' })
  @ApiParam({ name: 'id', description: 'Menu Item ID' })
  @ApiResponse({ status: 200, description: 'Menu item deleted' })
  @ApiResponse({ status: 404, description: 'Item not found or unauthorized' })
  remove(@Param('id') id: string) {
    return this.menuItemsService.delete(id);
  }
}
