import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/me")
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getData(@Req() req: Request) {
    Logger.log({msg: 'getDataController', user: req.user})
    return req.user;
  }
}
