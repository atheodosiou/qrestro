import { Module } from '@nestjs/common';
import { VenuesModule } from '../venues/venues.module';
import { QrCodeController } from './qr-codes.controller';
import { QrCodeService } from './qr-codes.service';

@Module({
  imports: [VenuesModule],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule { }
