import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UsersModule } from 'src/users/users.module';
import { Reminder } from './entities/reminder.entity';
import { ReminderReceiversIds } from './entities/reminderusers.entity';
import { ReminderReceiversController } from './reminderreceivers.controller';
import { ReminderReceiversService } from './reminderreceivers.service';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reminder, ReminderReceiversIds]),
    UsersModule,
  ],
  controllers: [RemindersController, ReminderReceiversController],
  providers: [RemindersService, ReminderReceiversService],
})
export class RemindersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ReminderReceiversController, RemindersController);
  }
}
