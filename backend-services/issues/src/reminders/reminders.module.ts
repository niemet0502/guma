import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { ReminderreceiversModule } from 'src/reminderreceivers/reminderreceivers.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { RemindersResolver } from './reminders.resolver';
import { RemindersService } from './reminders.service';

@Module({
  imports: [HttpModule, forwardRef(() => TasksModule), ReminderreceiversModule],
  providers: [RemindersResolver, RemindersService],
  exports: [RemindersService],
})
export class RemindersModule {}
