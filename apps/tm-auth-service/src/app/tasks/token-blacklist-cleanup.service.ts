// src/app/tasks/token-cleanup.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlacklistedToken, BlacklistedTokenDocument } from '../auth/schemas/blacklisted-token.schema';

@Injectable()
export class TokenCleanupService {
  private readonly logger = new Logger(TokenCleanupService.name);

  constructor(
    @InjectModel(BlacklistedToken.name) private blacklistedTokenModel: Model<BlacklistedTokenDocument>,
  ) {}

  // every hour
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Starting blacklisted token cleanup...');

    const deletedCount = await this.blacklistedTokenModel.deleteMany({
      // delete any expired token
      exp: { $lte: new Date() },
    });

    this.logger.debug(`Deleted ${deletedCount.deletedCount} blacklisted tokens.`);
  }
}
