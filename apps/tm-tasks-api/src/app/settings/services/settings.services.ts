import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);
  private get url(): string {
    return this.configService.get<string>('SETTINGS_SERVICE');
  }

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getSetting(id: string, token: string) {
    const cacheKey = `setting:${id}`;
    const cachedSetting = await this.cacheManager.get<string[]>(cacheKey);

    if (cachedSetting) {
      this.logger.log(`Retrieved setting from cache: ${id}`);
      return cachedSetting;
    }

    this.logger.log('Attempting to retrieve setting from server: ' + id);
    try {
      this.logger.log('Retrieving setting from server: ' + this.url + `/raw/${id}`);
      const setting = await lastValueFrom(
        this.httpService.get<{ enabledForUsers: string[]}>(this.url + `/raw/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      this.logger.log('Retrieved setting from server: ' + setting.data);
      if (setting?.data?.enabledForUsers) {
        await this.cacheManager.set(cacheKey, setting.data.enabledForUsers);
        return setting.data.enabledForUsers;
      }
      return [];
    } catch (error) {
      this.logger.error('Error retrieving setting:', error.message);
      return [];
    }
  }
}
