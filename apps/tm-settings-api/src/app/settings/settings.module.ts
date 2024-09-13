import { Module } from '@nestjs/common';
import { DBModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureFlagSchema } from './schemas/feature-flag.schema';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    DBModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: 'FeatureFlag', schema: FeatureFlagSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
