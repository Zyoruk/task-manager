import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
  Res,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../user/services/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    required: true,
    description: 'User credentials',
    schema: {
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          format: 'password',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() userDto: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.validateUser(
      userDto.email,
      userDto.password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const tokens = await this.authService.login(user);
    return res.status(200).send(tokens);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiBody({
    required: true,
    description: 'User details',
    schema: {
        properties: { 
            email: {
                type: "string",
                format: "email"
            },
            // 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
            password: {
                type: "string",
                format: "password",
                minLength: 8,
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            },
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            }
        }
    }
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response ) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return res.status(200).send(newUser);
    } catch (error) { 
      Logger.log('Failed to create user');
      return res.status(400).send({ message: 'Failed to create user', error });
    }
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Protect the logout route
  async logout(@Req() req: any, @Res() res: any) {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    await this.authService.logout(token, req.user.email);
    return res.status(200).json({ message: 'Logout successful' });
  }

  @Get('validate_token')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Protect the validate_token route
  async validateToken(@Req() req: any)  { 
    Logger.log('Validating token:')
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    Logger.log('Token:' + token)
    return this.authService.validateToken(token);
  }
}
