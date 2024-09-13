import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
const mqUrls = [process.env.MQURL || 'amqp://localhost:5672'];
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
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule]
})
export class NotificationsModule {}
