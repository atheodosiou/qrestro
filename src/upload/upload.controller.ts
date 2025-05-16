import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Request,
  Delete,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload and compress an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      example: {
        message: 'Image uploaded successfully',
        url: '/uploads/compressed-1715860012123.jpg',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req) {
    if (!file || !file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Invalid file type');
    }

    const imageUrl = await this.uploadService.compressAndSave(
      file,
      req.user.userId,
    );

    return {
      message: 'Image uploaded successfully',
      url: imageUrl,
    };
  }

  @Delete('image')
  @ApiOperation({ summary: 'Delete an uploaded image by filename' })
  @ApiQuery({ name: 'filename', required: true, example: 'compressed-123.jpg' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @ApiResponse({ status: 500, description: 'Image could not be deleted' })
  async deleteImage(@Query('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }

    const deleted = await this.uploadService.deleteImage(filename);

    if (!deleted) {
      throw new InternalServerErrorException('Image could not be deleted');
    }

    return {
      message: 'Image deleted successfully',
      filename,
    };
  }
}
