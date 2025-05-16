import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VenuesModule } from './venues/venues.module';
import { MenuSectionsModule } from './menu-sections/menu-sections.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { ThemeSettingsModule } from './theme-settings/theme-settings.module';
import { PublicMenuModule } from './public-menu/public-menu.module';
import { QrCodeModule } from './qr-codes/qr-codes.module';
import { MenuModule } from './menu/menu.module';
import { UploadModule } from './upload/upload.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UsersModule,
    VenuesModule,
    MenuModule,
    MenuSectionsModule,
    MenuItemsModule,
    ThemeSettingsModule,
    PublicMenuModule,
    QrCodeModule,
    UploadModule,
  ],
})
export class AppModule {}
