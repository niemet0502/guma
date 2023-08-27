import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { TeamsModule } from 'src/teams/teams.module';
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
    TeamsModule,
    OrganizationsModule,
  ],
  controllers: [TasksController, CommentsController, TaskLabelController],
  providers: [TasksService, CommentsService, TaskLabelService],
})
export class TasksModule {}
