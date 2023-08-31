import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StatusResolver } from './status.resolver';
import { StatusService } from './status.service';

@Module({
  imports: [HttpModule],
  providers: [StatusResolver, StatusService],
})
export class StatusModule {}
