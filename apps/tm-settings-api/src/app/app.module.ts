import { Module } from '@nestjs/common';

import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [DBModule, AuthModule, SettingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
