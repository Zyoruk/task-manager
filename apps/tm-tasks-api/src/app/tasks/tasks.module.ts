import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksController } from './controllers/tasks.controller';
import { AuthModule } from '../auth/auth.module';
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
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    AuthModule,
  ],
  controllers: [ TasksController],
  providers: [TasksService],
  exports: [TasksService, MongooseModule],
})
export class TasksModule {}
