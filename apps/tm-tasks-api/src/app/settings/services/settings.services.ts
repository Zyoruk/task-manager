import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SettingsService {
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
      Logger.log(`Retrieved setting from cache: ${id}`);
      return cachedSetting;
    }

    Logger.log('Attempting to retrieve setting from server: ' + id);
    try {
      const setting = await lastValueFrom(
        this.httpService.get<{ enabledForUsers: string[]}>(this.url + `/raw/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      Logger.log('Retrieved setting from server: ' + setting.data);
      if (setting?.data?.enabledForUsers) {
        await this.cacheManager.set(cacheKey, setting.data.enabledForUsers);
        return setting.data.enabledForUsers;
      }
      return [];
    } catch (error) {
      Logger.error('Error retrieving setting:', error.message);
      return [];
    }
  }
}
