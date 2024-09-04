import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import * as bcrypt from 'bcrypt'; // For password hashing
import { BlacklistedToken, BlacklistedTokenDocument } from '../schemas/blacklisted-token.schema';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { LoginUserDto } from '../../user/dto/login-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(BlacklistedToken.name) private blacklistedTokenModel: Model<BlacklistedTokenDocument>,
        private userService: UserService,
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findBy({ email });
        if (user && (await bcrypt.compare(pass, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: LoginUserDto) {
        const accessToken = this.generateAccessToken(user);
        return {
          access_token: accessToken,
        };
    }

    async register(user: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        const createdUser = this.userService.create({ ...user, password: hashedPassword });
        return createdUser;
    }

    async logout(token: string, userEmail: string): Promise<void> {
        const blacklistedToken = new this.blacklistedTokenModel({ token, exp: new Date(Date.now() + 1000 * 60 * 60) });
        try { 
            await blacklistedToken.save();
        } catch (error) {
             if(error.code === 11000) {
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
        const payload = { email: user.email, sub: user._id };
        return this.jwtService.sign(payload, { expiresIn: '1h' }); // Short-lived access token
      }
}
