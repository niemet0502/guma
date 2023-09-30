import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { MembersModule } from 'src/members/members.module';
import { StatusModule } from 'src/status/status.module';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  imports: [HttpModule, forwardRef(() => MembersModule), StatusModule],
  providers: [TeamsResolver, TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
