import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { QrCodeService } from './qr-codes.service';

@ApiTags('QR Codes')
@Controller('qrcode')
export class QrCodeController {
    constructor(private readonly qrCodeService: QrCodeService) { }

    @Get(':slug')
    @ApiOperation({ summary: 'Generate a QR code for a venue slug' })
    @ApiParam({ name: 'slug', description: 'The unique venue slug to encode in the QR code' })
    @ApiResponse({
        status: 200,
        description: 'Returns a PNG image of the QR code',
        content: { 'image/png': {} }
    })
    async getQrCode(@Param('slug') slug: string, @Res() res: Response) {
        const base64 = await this.qrCodeService.generateForSlug(slug);
        const imageBuffer = Buffer.from(base64.split(',')[1], 'base64');

        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    }
}
