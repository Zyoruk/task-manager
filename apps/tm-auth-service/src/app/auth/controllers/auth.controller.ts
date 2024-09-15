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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../../user/dto/login-user.dto';
import { Request, Response } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
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
  @UseGuards(ThrottlerGuard)
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
  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response ) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return res.status(200).send(newUser);
    } catch (error) {
      this.logger.log('Failed to register user');
      return res.status(400).send({ message: 'Failed to create user', error });
    }
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Protect the logout route
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    await this.authService.logout(token, req.userContext.email);
    return res.status(200).json({ message: 'Logout successful' });
  }

  @Get('validate_token')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Protect the validate_token route
  async validateToken(@Req() req: Request)  {
    this.logger.log('Validating token:')
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    this.logger.log('Token found. Validating...')
    return this.authService.validateToken(token);
  }
}
