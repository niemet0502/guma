import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { LabelsResolver } from './labels.resolver';
import { LabelsService } from './labels.service';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [LabelsResolver, LabelsService],
  exports: [LabelsService],
})
export class LabelsModule {}
