import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  imports: [HttpModule],
  providers: [TeamsResolver, TeamsService],
})
export class TeamsModule {}
