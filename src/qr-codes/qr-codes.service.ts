import { Injectable, NotFoundException } from '@nestjs/common';
import { VenuesService } from '../venues/venues.service';
import * as QRCode from 'qrcode';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrCodeService {
    constructor(
        private venuesService: VenuesService,
        private config: ConfigService
    ) { }

    async generateForSlug(slug: string): Promise<string> {
        const venue = await this.venuesService.findBySlug(slug);
        if (!venue) throw new NotFoundException('Venue not found');

        const baseUrl = this.config.get<string>('APP_BASE_URL') || 'http://localhost:3000';
        const url = `${baseUrl}/menu/${slug}`;

        return QRCode.toDataURL(url);
    }
}