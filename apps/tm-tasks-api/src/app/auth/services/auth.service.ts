import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private get url(): string {
    return this.configService.get<string>('AUTH_SERVICE_HOST');
  }

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async validateToken(token: string): Promise<boolean> {
    Logger.debug(token);
    Logger.debug(this.url + '/validate_token');
    Logger.log('Attempting to validate token')
    try {
      const isValid = await lastValueFrom(
        this.httpService.get<boolean>(this.url + '/validate_token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      Logger.log('Token is valid:' + isValid.data);
      if (isValid.data) {
        return true;
      }
      return false;
    } catch (error) {
      Logger.error('Error validating token:', error.message);
      return false;
    }
  }

  async getLoggerInUser(token: string): Promise<any> {
    try {
      const userData = await lastValueFrom(
        this.httpService.get<boolean>(this.url + '/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      Logger.log('User:' + userData.data);
      return userData.data;
    } catch (error) {
      Logger.error('Error while retrieving user data:', error);
      return false;
    }
  }
}
