import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { SprintsModule } from 'src/sprints/sprints.module';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [HttpModule, forwardRef(() => SprintsModule)],
  providers: [ActivitiesResolver, ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
