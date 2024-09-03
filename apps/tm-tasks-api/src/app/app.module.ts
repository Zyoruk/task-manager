import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemasModule } from './schemas/schemas.module';

const mqUrls = [process.env.MQURL || 'amqp://localhost:5672']

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: mqUrls,
          queue: 'tm-notifications',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://newuser:newpassword@localhost:27017/taskmanagerdb'), // Connect to MongoDB
    SchemasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
