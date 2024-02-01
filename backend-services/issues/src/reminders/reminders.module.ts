import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { RemindersResolver } from './reminders.resolver';
import { RemindersService } from './reminders.service';

@Module({
  imports: [HttpModule, TasksModule],
  providers: [RemindersResolver, RemindersService],
})
export class RemindersModule {}
