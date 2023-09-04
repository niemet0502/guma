import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [HttpModule],
  providers: [ActivitiesResolver, ActivitiesService],
})
export class ActivitiesModule {}
