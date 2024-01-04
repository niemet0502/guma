import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StatusModule } from '../status/status.module';
import { WorkflowsResolver } from './workflows.resolver';
import { WorkflowsService } from './workflows.service';

@Module({
  imports: [HttpModule, StatusModule],
  providers: [WorkflowsResolver, WorkflowsService],
})
export class WorkflowsModule {}
