import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SettingsService } from './services/settings.services';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, ConfigModule, CacheModule.register()],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
