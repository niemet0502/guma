import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SprintsModule } from 'src/sprints/sprints.module';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [HttpModule, SprintsModule],
  providers: [ActivitiesResolver, ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
