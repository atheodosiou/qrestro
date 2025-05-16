import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly uploadDir = join(__dirname, '..', '..', 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async compressAndSave(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    const fname = `${file.filename || 'image-' + userId + '-' + Date.now()}.jpg`;
    const outputPath = join(this.uploadDir, fname);

    try {
      await sharp(file.buffer).jpeg({ quality: 70 }).toFile(outputPath);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to process image');
    }

    return `/uploads/${fname}`;
  }

  async deleteImage(filename: string): Promise<boolean> {
    const fullPath = join(this.uploadDir, filename);

    if (!fs.existsSync(fullPath)) {
      throw new NotFoundException('Image not found');
    }

    try {
      fs.unlinkSync(fullPath);
      return !fs.existsSync(fullPath);
    } catch (error) {
      console.error('Failed to delete image:', error);
      return false;
    }
  }
}
