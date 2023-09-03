import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CommentsModule } from 'src/comments/comments.module';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [HttpModule, CommentsModule],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
