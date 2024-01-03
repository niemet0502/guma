import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { ActivitiesModule } from '../activities/activities.module';
import { CommentsModule } from '../comments/comments.module';
import { TaskLabelsModule } from '../labels/labels.module';
import { SprintsModule } from '../sprints/sprints.module';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    forwardRef(() => ActivitiesModule),
    forwardRef(() => SprintsModule),
    HttpModule,
    CommentsModule,
    TaskLabelsModule,
  ],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
