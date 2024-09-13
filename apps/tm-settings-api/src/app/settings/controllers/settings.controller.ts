import { Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserContextInterceptor } from '../../auth/interceptors/user-context.interceptor';
import { UserContext } from '../../auth/decorators/user-context.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { IUser } from '../../types/user';
import { SettingsService } from '../services/settings.service';
@ApiTags('settings')
@Controller()
@UseInterceptors(UserContextInterceptor)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'setting id' })
  @Get(':id')
  async getSetting(@Param('id') id: string, @UserContext() userContext: IUser) {
    return this.settingsService.getSetting(id, userContext);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true, description: 'setting id' })
  @Post(':id')
  async setSetting(@Param('id') id: string, @UserContext() userContext: IUser) {
    return this.settingsService.setSetting(id, userContext);
  }
}
