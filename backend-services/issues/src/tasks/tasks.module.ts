import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActivitiesModule } from 'src/activities/activities.module';
import { CommentsModule } from 'src/comments/comments.module';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [HttpModule, CommentsModule, ActivitiesModule],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
