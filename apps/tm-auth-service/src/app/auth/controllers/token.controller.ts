import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpCode,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service'; // Adjust the path if needed
import { ClientCredentialsDto } from '../dto/client-credentials.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('oauth')
export class TokenController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK) // Explicitly set status code to 200
  async issueToken(
    @Res() res: Response,
    @Body() credentials: ClientCredentialsDto
  ): Promise<Response<{ access_token: string; token_type: string } | { error: string }>> {
    const token = this.authService.generateClientToken(credentials);

    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'Invalid client credentials' });
    }

    return res.json({ access_token: token, token_type: 'Bearer' });
  }

  @Get('validate_token')
  @ApiBearerAuth()
  async validateToken(
    @Req() req: Request,
    @Query('token') tokenParam: string
  ): Promise<boolean> {
    const token = req.headers.authorization?.split(' ')[1] || tokenParam; // Get token from header
    return this.authService.validateClientToken(token);
  }
}
