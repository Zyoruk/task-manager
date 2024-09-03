import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt'; // For password hashing
import { BlacklistedToken, BlacklistedTokenDocument } from '../schemas/blacklisted-token.schema'; // Import the schema
import { UserService } from './user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(BlacklistedToken.name) private blacklistedTokenModel: Model<BlacklistedTokenDocument>,
        private userService: UserService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findBy({ email });
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
    
        // Store the refresh token
        user.refreshTokens.push(refreshToken);
        await user.save();
    
        return {
          access_token: accessToken,
          refresh_token: refreshToken,
        };
    }

    async register(user: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        const createdUser = this.userService.create({ ...user, password: hashedPassword });
        return createdUser;
    }

    async logout(token: string): Promise<void> {
        const blacklistedToken = new this.blacklistedTokenModel({ token, exp: new Date(Date.now() + 1000 * 60 * 60) });
        await blacklistedToken.save();
    }

    async validateToken(token: string): Promise<boolean> {
        const isBlacklisted = await this.blacklistedTokenModel.exists({ token });
        return !isBlacklisted;
    }

    generateAccessToken(user: any): string {
        const payload = { email: user.email, sub: user._id };
        return this.jwtService.sign(payload, { expiresIn: '1h' }); // Short-lived access token
      }
    
    private generateRefreshToken(user: any): string {
        const payload = { email: user.email, sub: user._id };
        return this.jwtService.sign(payload, { expiresIn: '6h'}); // Long-lived refresh token
      }
}
