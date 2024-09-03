import { Controller, Post, Body, UnauthorizedException, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/schemas/user.schema";
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @Post('login')
    async login(@Body() userDto: CreateUserDto) {
        const user = await this.authService.validateUser(userDto.email, userDto.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.register(createUserDto);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt')) // Protect the logout route
    async logout(@Req() req: any, @Res() res: any) {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from header
        await this.authService.logout(token);
        return res.status(200).json({ message: 'Logout successful' });
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@Req() req: any) {
        const user = await this.userService.findUserById(req.user.userId); // Assuming you have a findUserById method
        const accessToken = this.authService.generateAccessToken(user);
        const refreshToken = req.headers.authorization?.split(' ')[1];
        await this.authService.logout(refreshToken);
        return { access_token: accessToken };
    }
}
