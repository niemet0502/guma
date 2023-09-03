import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [HttpModule],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
