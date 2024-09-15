import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import * as bcrypt from 'bcrypt'; // For password hashing
import {
  BlacklistedToken,
  BlacklistedTokenDocument,
} from '../schemas/blacklisted-token.schema';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { ClientCredentialsDto } from '../dto/client-credentials.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private get clientSecret() {
    return this.configService.get<string>('CLIENT_SECRET');
  }

  private get supportedClients() {
    return this.configService.get<string>('VALID_CLIENT_IDS').split(',');
  }

  constructor(
    private jwtService: JwtService,
    @InjectModel(BlacklistedToken.name)
    private blacklistedTokenModel: Model<BlacklistedTokenDocument>,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.userService.findBy({ email });
    this.logger.log(`User found: ${user}`);
    if (user && (await bcrypt.compare(pass, user.password))) {
      this.logger.log('User validated');
      return user;
    }
    this.logger.log('User not validated');
    return null;
  }

  async login(user: LoginUserDto) {
    this.logger.log(`Logging in user: ${user.email}`);
    const accessToken = this.generateAccessToken(user);
    this.logger.log(`Access token generated for user: ${user.email}`);
    return {
      access_token: accessToken,
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    this.logger.log(`Registering user: ${user.email}`);
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
    const createdUser = this.userService.create({
      ...user,
      password: hashedPassword,
    });
    this.logger.log(`User registered: ${user.email}`);
    return createdUser;
  }

  async logout(token: string, userEmail: string): Promise<void> {
    this.logger.log(`Logging out user: ${userEmail}`);
    const blacklistedToken = new this.blacklistedTokenModel({
      token,
      exp: new Date(Date.now() + 1000 * 60 * 60),
    });
    try {
      await blacklistedToken.save();
      this.logger.log(`User logged out: ${userEmail}`);
    } catch (error) {
      if (error.code === 11000) {
        // do nothing; token is blacklisted and this scenario is likely an edge case in dev
      } else {
        throw new Error('Failed to blacklist token');
      }
    }
  }

  async validateToken(token: string): Promise<boolean> {
    const isBlacklisted = await this.blacklistedTokenModel.exists({ token });
    return !isBlacklisted;
  }

  generateAccessToken(user: any): string {
    this.logger.log(`Generating access token for user: ${user.email}`);
    const payload = { email: user.email, sub: user._id, userId: user.userId };
    return this.jwtService.sign(payload, { expiresIn: '1h' }); // Short-lived access token
  }

  generateClientToken(user: ClientCredentialsDto) {
    const payload = { sub: user.client_id };
    if (user.client_secret !== this.clientSecret || !this.supportedClients.includes(user.client_id)) {
      this.logger.log('Invalid client secret');
      return false;
    }
    this.logger.log(`Generating client token for client: ${user.client_id}`);
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.clientSecret,
    }); // Short-lived access token
  }

  validateClientToken(token: string) {
    return this.jwtService.verify(token, { secret: this.clientSecret });
  }
}
