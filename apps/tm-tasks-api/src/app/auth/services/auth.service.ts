import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private get url(): string {
    return this.configService.get<string>('AUTH_SERVICE_HOST');
  }

  private get clientSecret(): string {
    return this.configService.get<string>('CLIENT_SECRET');
  }

  private get clientId(): string {
    return this.configService.get<string>('CLIENT_ID');
  }

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async validateClientToken(token: string): Promise<boolean> {
    this.logger.log('Attempting to validate client token');
    try {
      const isValid = await lastValueFrom(
        this.httpService.get<boolean>(this.url + '/oauth/validate_token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      this.logger.log('Token is valid:' + isValid.data);
      if (isValid.data) {
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error('Error validating token:', error.message);
      return false;
    }
  }

  async generateClientToken(): Promise<string | undefined> {
    this.logger.log('Attempting to validate client token');
    try {
      const token = await lastValueFrom(
        this.httpService.post(this.url + '/oauth/token', {
          client_id: this.clientId,
          client_secret: this.clientSecret,
        })
      );
      this.logger.log('Token is valid:' + token.data);
      if (token.data.access_token) {
        return token.data.access_token;
      }
      throw new Error('Token not found in the response');
    } catch (error) {
      this.logger.error('Error generating token:', error.message);
      return undefined;
    }
  }


  async validateToken(token: string): Promise<boolean> {
    this.logger.debug(token);
    this.logger.debug(this.url + '/validate_token');
    this.logger.log('Attempting to validate token');
    try {
      const isValid = await lastValueFrom(
        this.httpService.get<boolean>(this.url + '/validate_token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      this.logger.log('Token is valid:' + isValid.data);
      if (isValid.data) {
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error('Error validating token:', error.message);
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

      this.logger.log('User:' + userData.data);
      return userData.data;
    } catch (error) {
      this.logger.error('Error while retrieving user data:', error);
      return false;
    }
  }
}
