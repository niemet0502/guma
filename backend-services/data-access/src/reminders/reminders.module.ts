import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { ReminderReceiversIds } from './entities/reminderusers.entity';
import { ReminderReceiversController } from './reminderreceivers.controller';
import { ReminderReceiversService } from './reminderreceivers.service';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder, ReminderReceiversIds])],
  controllers: [RemindersController, ReminderReceiversController],
  providers: [RemindersService, ReminderReceiversService],
})
export class RemindersModule {}
