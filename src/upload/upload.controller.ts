// upload.controller.ts
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

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
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
