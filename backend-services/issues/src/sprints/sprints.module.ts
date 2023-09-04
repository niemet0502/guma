import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { SprintsResolver } from './sprints.resolver';
import { SprintsService } from './sprints.service';

@Module({
  imports: [HttpModule, TasksModule],
  providers: [SprintsResolver, SprintsService],
})
export class SprintsModule {}
