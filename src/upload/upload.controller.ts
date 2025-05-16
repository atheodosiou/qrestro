import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
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
}
