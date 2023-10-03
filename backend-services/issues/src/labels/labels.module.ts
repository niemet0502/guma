import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LabelsResolver } from './labels.resolver';
import { LabelsService } from './labels.service';

@Module({
  imports: [HttpModule],
  providers: [LabelsResolver, LabelsService],
  exports: [LabelsService],
})
export class TaskLabelsModule {}
