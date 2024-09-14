import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Server } from 'socket.io';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Server,
      useFactory: () => {
        const server = new Server({
          cors: {
            origin: 'localhost',
          },
        });
        return server;
      },
    },
  ],
})
export class AppModule {}
