import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from '../organizations/organizations.module';
import { SprintsModule } from '../sprints/sprints.module';
import { StatusModule } from '../status/status.module';
import { TeamsModule } from '../teams/teams.module';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Activity } from './entities/activity.entity';
import { Comment } from './entities/comment.entity';
import { Task } from './entities/task.entity';
import { TaskLabel } from './entities/tasklabel.entity';
import { TaskLabelController } from './tasklabel.controller';
import { TaskLabelService } from './tasklabel.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Comment, TaskLabel, Activity]),
    TeamsModule,
    OrganizationsModule,
    forwardRef(() => SprintsModule),
    StatusModule,
  ],
  controllers: [
    TasksController,
    CommentsController,
    TaskLabelController,
    ActivitiesController,
  ],
  providers: [
    TasksService,
    CommentsService,
    TaskLabelService,
    ActivitiesService,
  ],
  exports: [TasksService],
})
export class TasksModule {}
