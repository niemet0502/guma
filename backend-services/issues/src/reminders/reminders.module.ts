import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { RemindersResolver } from './reminders.resolver';
import { RemindersService } from './reminders.service';

@Module({
  imports: [HttpModule, forwardRef(() => TasksModule)],
  providers: [RemindersResolver, RemindersService],
  exports: [RemindersService],
})
export class RemindersModule {}
