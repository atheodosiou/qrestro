import { Controller, Get, Param, Header, Res } from '@nestjs/common';
import { QrCodeService } from './qr-codes.service';
import { Response } from 'express';

@Controller('qrcode')
export class QrCodeController {
    constructor(private readonly qrCodeService: QrCodeService) { }

    @Get(':slug')
    async getQrCode(@Param('slug') slug: string, @Res() res: Response) {
        const base64 = await this.qrCodeService.generateForSlug(slug);
        const imageBuffer = Buffer.from(base64.split(',')[1], 'base64');

        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    }
}
