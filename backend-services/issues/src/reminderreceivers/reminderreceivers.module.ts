import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReminderreceiversResolver } from './reminderreceivers.resolver';
import { ReminderreceiversService } from './reminderreceivers.service';

@Module({
  imports: [HttpModule],
  providers: [ReminderreceiversResolver, ReminderreceiversService],
  exports: [ReminderreceiversService],
})
export class ReminderreceiversModule {}
