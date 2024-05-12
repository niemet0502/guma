import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesModule } from 'src/activities/activities.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { SprintsModule } from '../sprints/sprints.module';
import { StatusModule } from '../status/status.module';
import { TeamsModule } from '../teams/teams.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { Task } from './entities/task.entity';
import { TaskLabel } from './entities/tasklabel.entity';
import { TaskLabelController } from './tasklabel.controller';
import { TaskLabelService } from './tasklabel.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Comment, TaskLabel]),
    forwardRef(() => ActivitiesModule),
    TeamsModule,
    OrganizationsModule,
    forwardRef(() => SprintsModule),
    StatusModule,
    UsersModule,
  ],
  controllers: [TasksController, CommentsController, TaskLabelController],
  providers: [TasksService, CommentsService, TaskLabelService],
  exports: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TasksController, CommentsController, TaskLabelController);
  }
}
