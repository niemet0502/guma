import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { SprintsResolver } from './sprints.resolver';
import { SprintsService } from './sprints.service';

@Module({
  imports: [HttpModule, forwardRef(() => TasksModule)],
  providers: [SprintsResolver, SprintsService],
  exports: [SprintsService],
})
export class SprintsModule {}
